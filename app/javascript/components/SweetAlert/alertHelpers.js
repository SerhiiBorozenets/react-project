import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const sweetAlertRemoveTask = (objects, action) => {
  const MySwal = withReactContent(Swal)
  const {task, project, setProject} = objects
  MySwal.fire({
    title: `Are you sure you want to remove ${task.attributes.title}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Remove'
  }).then((result) => {
    if (result.isConfirmed) {
      action(task.id, project, setProject)
    }
  })
}

export const sweetAlertRemoveProject = (objects, action) => {
  const MySwal = withReactContent(Swal)
  const {project, projects, setProjects} = objects
  MySwal.fire({
    title: `Are you sure you want to remove ${project.attributes.title}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Remove'
  }).then((result) => {
    if (result.isConfirmed) {
      action(project.attributes.slug, projects, setProjects)
    }
  })
}