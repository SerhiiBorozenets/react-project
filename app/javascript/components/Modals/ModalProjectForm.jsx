import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {checkProjectTitle, createProject} from "../helpers/helpers";

const ModalProjectForm = ({ projects, setProjects, onChangeProject, handleShow, project, show }) => {
  const [disable, setDisable] = useState(true)

  const onClickSave = () => {
    createProject(project, projects, setProjects).then(handleShow())
  }
  useEffect(()=> {
    setDisable(!checkProjectTitle(project, projects))
  }, [project.title])

  return <Modal show={show} onHide={handleShow} animation={false}>
    <Modal.Header closeButton className="back-ground-header">
      <Modal.Title>Create new project</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" onChange={onChangeProject} value={project.title}>
          <Form.Label>Project title</Form.Label>
          <Form.Control type="text" name="title" placeholder="Enter project title" autoFocus />
        </Form.Group>
      </Form>
    </Modal.Body>

    <Modal.Footer className="back-ground-header">
      <Button variant="primary" disabled={disable} onClick={onClickSave}>
        Create project
      </Button>
    </Modal.Footer>
  </Modal>
}

export default ModalProjectForm