import axios from "axios";
import {BsReception0, BsReception1, BsReception2, BsReception3, BsReception4} from "react-icons/bs";
import React, {useState} from "react";

export const createCsrfToken = () => {
  const csrfToken = document.querySelector('[name=csrf-token]').content
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
}

export const sortTask = (tasks) => {
  return tasks.sort((a, b) => Number(a.attributes.completed) - Number(b.attributes.completed))
}

export const handleSorting = (sortField, sortOrder, project, setProject) => {
 if(!sortField) return null

  const ind = {
    'complexity': ['None', 'Elementary', 'Intermediate', 'Advanced', 'Master'],
    'status': ['No', 'Low', 'Middle', 'High']
  }
  if ( ['complexity', 'status'].includes(sortField) ) {
    const included = [...project.included].sort((a, b) => {
      return (ind[sortField].indexOf(a.attributes[sortField]) - ind[sortField].indexOf(b.attributes[sortField])) * (sortOrder === "asc" ? 1 : -1)
    })
    return setProject({...project, included})
  } else {
    const included = [...project.included].sort((a, b) => {
      if (a.attributes[sortField] === null) return 1;
      if (b.attributes[sortField] === null) return -1;
      if (a.attributes[sortField] === null && b.attributes[sortField] === null) return 0;
      return (
        a.attributes[sortField].toString().localeCompare(b.attributes[sortField].toString(), "en", {
          numeric: true,
        }) * (sortOrder === "asc" ? 1 : -1)
      );
    });
    return setProject({...project, included})
  }
};

export const updateTask = async (task, project, setProject) => {
  createCsrfToken()
  await axios.patch(`/api/v1/tasks/${task.id}`, {task})
    .then(resp => {
      const filteredTask = project.included.filter(item => item.id !== String(task.id))
      const included = [...filteredTask, resp.data.data]
      setProject({...project, included})
    })
    .catch(resp => {console.log(resp)})
}

export const removeTask = async (id, project, setProject) => {
  createCsrfToken()
  await axios.delete(`/api/v1/tasks/${id}`)
    .then(() => {
      const included = [...project.included.filter(item => item.id !== String(id))]
      setProject({...project, included})
    })
    .catch(resp => {console.log(resp)})
}

export const removeProject = async (slug, projects, setProjects) => {
  createCsrfToken()
  await axios.delete(`/api/v1/projects/${slug}`)
    .then( () => {
      const newProjects = projects.filter(item => item.attributes.slug !== String(slug))
      setProjects( [...newProjects]);
    })
    .catch(resp => {console.log(resp)})
}

export const updateProject = async (project, projects, setProjects) => {
  createCsrfToken()
  await axios.patch(`/api/v1/projects/${project.slug}`, {project})
    .then( resp => {
      const newProjects = projects.filter(item => item.attributes.slug !== String(project.slug))
      setProjects([...newProjects, resp.data.data]);
    })
    .catch(resp => {console.log(resp)})
}

export const createProject = async (project, projects, setProjects) => {
  createCsrfToken()
  await axios.post('/api/v1/projects', project)
    .then(resp => {
      setProjects(projects => [...projects, resp.data.data]);
    })
    .catch(resp => {console.log(resp)})
}

export const createTask = async (project, setProject, task, setTask) => {
  createCsrfToken()
  const project_id = project.data.id
  await axios.post('/api/v1/tasks', {task, project_id})
    .then(resp => {
      const included = [...project.included, resp.data.data]
      setProject({...project, included})
      setTask({title: '', due_date: '', status: '', completed: false, complexity: ''})
    })
    .catch(resp => {console.log(resp)})
}

export const searchFunc = (obj, query) => {
  return obj.filter((item) => {
    return (
      item.attributes.title.toLowerCase().includes(query.toLowerCase())
    );
  });
}