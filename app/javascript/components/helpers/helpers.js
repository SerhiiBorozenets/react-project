import axios from "axios";
import React from "react";

export const csrfToken = document.querySelector('[name=csrf-token]').content

export const createCsrfToken = () => {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
}

export const sortTask = (...tasks) => {
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

export const exportProject = async () => {
  createCsrfToken()
  await axios.get('/api/v1/projects.zip')
}

export const searchFunc = (obj, query) => {
  return obj.filter((item) => {
    return (
      item.attributes.title.toLowerCase().includes(query.toLowerCase())
    );
  });
}

export const checkTaskTitle = (task, project, isEdit = false) => {
  if (!task.title) return false

  const filteredTasks = project.included.filter(item => item.attributes.id !== task.id)
  const tasks = isEdit ? filteredTasks : project.included

  const isSameTitles = tasks.filter(incl => {
    return incl.attributes.title.toLowerCase() === task.title.toLowerCase().trim()
  })
  return task.title && (isSameTitles.length === 0)
}

export const checkProjectTitle = (project, projects, isEdit = false) => {
  if (!project.title) return null

  const filteredProjects = projects.filter(item => item.attributes.id !== project.id)
  const newProjects = isEdit ? filteredProjects : projects

  const isSameTitles = newProjects.filter(prj => {
    return prj.attributes.title.toLowerCase() === project.title.toLowerCase().trim()
  })
  return project.title && (isSameTitles.length === 0)
}