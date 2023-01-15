import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {checkProjectTitle, isEmpty} from "../helpers/helpers";
import {useUpdateProjectMutation} from "../../api/apiProjects";

const ModalEditProjectForm = ({ projects, onChangeEditProject, handleShowEdit, editProject, showEdit, handleEditFileChange, editImage }) => {
  const [disable, setDisable] = useState(true)
  const [updateProject] = useUpdateProjectMutation()

  const onClickSave = () => {
    const formData = new FormData()
    const slug = editProject.slug
    formData.append('project[title]', editProject.title)
    formData.append('project[slug]', slug)
    if (!isEmpty(editImage)) {
      formData.append('project[image]', editImage)
    }
    updateProject(formData, slug).then(handleShowEdit())
  }

  useEffect(()=> {
    setDisable(!checkProjectTitle(editProject, projects, { isEdit: true }))
  }, [editProject.title])

  return <Modal show={showEdit} onHide={handleShowEdit} animation={false}>
    <Modal.Header closeButton className="back-ground-header">
      <Modal.Title>Edit project</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Task title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter project title"
            value={editProject.title}
            onChange={onChangeEditProject}
            autoFocus
          />
        </Form.Group>
        <Form.Group controlId="formFile" onChange={handleEditFileChange} className="mb-3">
          <Form.Label>Image <i><img src={editProject.image_url} /></i> </Form.Label>
          <Form.Control type="file" />
        </Form.Group>
      </Form>
    </Modal.Body>

    <Modal.Footer className="back-ground-header">
      <Button variant="primary" disabled={disable} onClick={onClickSave}>
        Update project
      </Button>
    </Modal.Footer>
  </Modal>
}

export default ModalEditProjectForm