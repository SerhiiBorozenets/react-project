import axios from "axios";

export const createCsrfToken = () => {
  const csrfToken = document.querySelector('[name=csrf-token]').content
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
}

export const sortTask = (tasks) => {
  return tasks.sort((a, b) => Number(a.attributes.completed) - Number(b.attributes.completed))
}

export const handleSorting = (sortField, sortOrder, project, setProject) => {
  if (sortField) {
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