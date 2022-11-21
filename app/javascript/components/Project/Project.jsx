import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Tasks from "./Tasks";

const Project = () => {
  const [project, setProject] = useState({})
  const [loaded, setLoaded] = useState(false)
  const params = useParams();

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
        <Tasks attributes={project.data.attributes}
               tasks={project.included}
        />
      }
    </>
  )
}

export default Project