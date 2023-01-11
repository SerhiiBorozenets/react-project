import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const sweetAlertRemoveTask = (task, action) => {
  const MySwal = withReactContent(Swal)
  MySwal.fire({
    title: `Are you sure you want to remove ${task.attributes.title}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Remove'
  }).then((result) => {
    if (result.isConfirmed) {
      action(task.id)
    }
  })
}

export const sweetAlertRemoveProject = (project, action) => {
  const MySwal = withReactContent(Swal)
  MySwal.fire({
    title: `Are you sure you want to remove ${project.attributes.title}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Remove'
  }).then((result) => {
    if (result.isConfirmed) {
      action(project.attributes.slug)
    }
  })
}