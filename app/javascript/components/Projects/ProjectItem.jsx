import React, {useState} from "react";
import {Link} from "react-router-dom";
import {PencilSquare, Trash} from "react-bootstrap-icons";
import moment from "moment";
import {sweetAlertRemove} from "../SweetAlert/alertHelpers";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ModalEditProjectForm from "../Modals/ModalEditProjectForm";

const ProjectItem = ({ project, removeProject, updateProject }) => {
  const {due_date, slug, title, progress} = project.attributes
  const dueDateFormat = due_date ? moment(due_date).format('DD.MM.YYYY') : ""
  const [editProject, setEditProject] = useState(project.attributes)
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(p => !p);
  const onChangeEditProject = (e) => {
    setEditProject(Object.assign({}, editProject, {[e.target.name]: e.target.value}))
  }

  const removeProjectConfirm = () => {
    sweetAlertRemove(project.attributes, removeProject)
  }

  return<tr className="fw-normal">
    <td className="align-middle">
      <Link to={`/projects/${slug}`}>
        <span> {title}</span>
      </Link>
    </td>
    <td className="align-middle">
      <div style={{ width: 50, height: 50 }}>
        <CircularProgressbar value={progress} text={`${progress}%`} />
      </div>
    </td>
    <td className="align-middle">
      <span>{dueDateFormat}</span>
    </td>
    <td className="align-middle mx-2">
      <Link to="#" onClick={removeProjectConfirm} >
        <Trash className="mx-2" color="red" size={20} />
      </Link>
      <Link onClick={handleShowEdit}>
        <PencilSquare className="ml-2" color="royalblue" size={20} />
      </Link>
      <ModalEditProjectForm
        editProject={editProject}
        updateProject={updateProject}
        onChangeEditProject={onChangeEditProject}
        showEdit={showEdit}
        handleShowEdit={handleShowEdit}
      />
    </td>
  </tr>
}

export default ProjectItem