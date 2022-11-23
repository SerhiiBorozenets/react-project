import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const ModalTaskForm = ({ handleShow, handleSubmit, task, show, handleChange }) => {
const [disable, setDisable] = useState(true)
  const OPTIONS = ['--Choose an option--', 'Low', "Middle", "High"];
  const statusOptions = OPTIONS.map( (status, index) => {
    return <option key={index} value={status.toLowerCase()}>{status}</option>
  })

  const onHandleSave = () => {
    handleShow()
    handleSubmit()
  }

  useEffect(()=> {
    if(task.name) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [task.name])

  return <Modal show={show} onHide={handleShow} animation={false}>
    <Modal.Header closeButton style={{backgroundColor: "#eee"}}>
      <Modal.Title>Create new task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" onChange={handleChange} value={task.name}>
          <Form.Label>Task title</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter task title" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter deadline</Form.Label>
          <Form.Control
            type="date"
            name="deadline"
            placeholder="Due date"
            value={task.deadline || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select priority</Form.Label>
          <Form.Select onChange={handleChange} name="status">
            {statusOptions}
          </Form.Select>
        </Form.Group>
      </Form>
    </Modal.Body>

    <Modal.Footer style={{backgroundColor: "#eee"}}>
      <Button variant="primary" disabled={disable} onClick={onHandleSave}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
}

export default ModalTaskForm