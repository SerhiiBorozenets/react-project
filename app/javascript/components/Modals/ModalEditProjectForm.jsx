import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {checkProjectTitle} from "../helpers/helpers";
import {useUpdateProjectMutation} from "../../api/apiProjects";

const ModalEditProjectForm = ({ projects, onChangeEditProject, handleShowEdit, editProject, showEdit }) => {
  const [disable, setDisable] = useState(true)
  const [updateProject] = useUpdateProjectMutation()

  const onClickSave = () => {
    updateProject(editProject).then(handleShowEdit())
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