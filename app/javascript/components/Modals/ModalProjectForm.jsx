import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {checkProjectTitle, isEmpty} from "../helpers/helpers";
import {useAddProjectMutation} from "../../api/apiProjects";

const ModalProjectForm = ({ projects, onChangeProject, handleShow, project, show, handleFileChange, image }) => {
  const [disable, setDisable] = useState(true)
  const [addProject] = useAddProjectMutation()

  const onClickSave = () => {
    const formData = new FormData()
    formData.append('project[title]', project.title)
    formData.append('project[image]', image)
    addProject(isEmpty(image) ? project :  formData).then(handleShow())
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
        <Form.Group controlId="formFile" onChange={handleFileChange} className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" />
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