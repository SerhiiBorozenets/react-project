import axios from "axios";

export const createCsrfToken = () => {
  const csrfToken = document.querySelector('[name=csrf-token]').content
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
}

export const sortTask = (tasks) => {
  return tasks.sort((a, b) => Number(a.attributes.completed) - Number(b.attributes.completed))
}
