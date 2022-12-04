import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Tasks from "./Tasks";
import {createCsrfToken} from "../helpers/helpers";
import { Fragment } from 'react';

const Project = () => {
  const [project, setProject] = useState({})
  const [loaded, setLoaded] = useState(false)
  const params = useParams();
  const [task, setTask] = useState({})

  const onChangeTask = (e) => {
    setTask(Object.assign({}, task, {[e.target.name]: e.target.value}))
  }

  useEffect(()=> {
    const url = `/api/v1/projects/${params.slug}`
    axios.get(url)
      .then(resp => {
        setProject(resp.data)
        setLoaded(true)
      })
      .catch(resp => console.log(resp))
  }, [])

  return(
    <Fragment>
      { loaded &&
        <Fragment>
          <Tasks project={project}
                 setProject={setProject}
                 tasks={project.included}
                 task={task}
                 setTask={setTask}
                 onChangeTask={onChangeTask}
          />
        </Fragment>
      }
    </Fragment>
  )
}

export default Project