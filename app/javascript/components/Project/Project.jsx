import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Tasks from "./Tasks";

const Project = () => {
  const [project, setProject] = useState({})
  const [loaded, setLoaded] = useState(false)
  const params = useParams();
  const [task, setTask] = useState({})

  const onChangeTask = (e) => {
    setTask(Object.assign({}, task, {[e.target.name]: e.target.value}))
  }
  const createTask = async () => {
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const project_id = project.data.id
    await axios.post('/api/v1/tasks', {task, project_id})
      .then(resp => {
        const included = [...project.included, resp.data.data]
        setProject({...project, included})
        setTask({title: '', due_date: '', status: '', completed: false})
      })
      .catch(resp => {console.log(resp)})
  }

  const removeTask = async (id) => {
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    await axios.delete(`/api/v1/tasks/${id}`)
      .then(() => {
        const included = [...project.included.filter(item => item.id !== String(id))]
        setProject({...project, included})
    })
    .catch(resp => {console.log(resp)})
  }

  const updateTask = async (task) => {
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    await axios.patch(`/api/v1/tasks/${task.id}`, {task})
      .then(resp => {
        const filteredTask = project.included.filter(item => item.id !== String(task.id))
        const included = [...filteredTask, resp.data.data]
        setProject({...project, included})
      })
      .catch(resp => {console.log(resp)})
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
                 createTask={createTask}
                 removeTask={removeTask}
                 tasks={project.included}
                 task={task}
                 updateTask={updateTask}
                 onChangeTask={onChangeTask}
          />
        </>
      }
    </>
  )
}

export default Project