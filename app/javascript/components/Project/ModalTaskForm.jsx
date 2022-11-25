import React, {useEffect, useRef, useState} from "react";
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
    if(task.title) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [task.title])

  return <Modal show={show} onHide={handleShow} animation={false}>
    <Modal.Header closeButton style={{backgroundColor: "#eee"}}>
      <Modal.Title>Create new task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" onChange={handleChange} value={task.title}>
          <Form.Label>Task title</Form.Label>
          <Form.Control type="text" name="title" placeholder="Enter task title" autoFocus />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter due date</Form.Label>
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