import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const sweetAlertRemove = (object, action) => {
  {console.log(object)}
  const MySwal = withReactContent(Swal)
  MySwal.fire({
    title: `Are you sure you want to remove ${object.title}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Remove'
  }).then((result) => {
    if (result.isConfirmed) {
      action(object.slug || object.id)
    }
  })
}