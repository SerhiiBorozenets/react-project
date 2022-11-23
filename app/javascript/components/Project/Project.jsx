import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Tasks from "./Tasks";

const Project = () => {
  const [project, setProject] = useState({})
  const [loaded, setLoaded] = useState(false)
  const params = useParams();
  const [task, setTask] = useState({})

  const handleChange = (e) => {
    setTask(Object.assign({}, task, {[e.target.name]: e.target.value}))
  }
  const handleSubmit = async () => {
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const project_id = project.data.id
    await axios.post('/api/v1/tasks', {task, project_id})
      .then(resp => {
        const included = [...project.included, resp.data.data]
        setProject({...project, included})
        setTask({name: '', deadline: '', status: '', completed: false})
      })
      .catch(resp => {})
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
    <>
      { loaded &&
        <>
          <Tasks project={project}
                 handleChange={handleChange}
                 handleSubmit={handleSubmit}
                 tasks={project.included}
                 task={task}
          />
        </>
      }
    </>
  )
}

export default Project