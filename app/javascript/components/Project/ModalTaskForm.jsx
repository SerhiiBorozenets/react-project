import React from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const ModalTaskForm = (props) => {

  const OPTIONS = ['Low', "Middle", "High"];
  const statusOptions = OPTIONS.map( (status, index) => {
    return <option key={index} value={status.toLowerCase()}>{status}</option>
  })

  const onHandleSave = () => {
    props.handleShow()
    props.handleSubmit()
    window.location.reload();
  }

  return <Modal show={props.show} onHide={props.handleShow} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>Create new task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" onChange={props.handleChange} value={props.task.name}>
          <Form.Label>Task title</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter task title" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter deadline</Form.Label>
          <Form.Control
            type="date"
            name="deadline"
            placeholder="Due date"
            value={props.task.deadline}
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select onChange={props.handleChange} name="status">
            {statusOptions}
          </Form.Select>
        </Form.Group>
      </Form>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="primary" onClick={onHandleSave}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
}

export default ModalTaskForm