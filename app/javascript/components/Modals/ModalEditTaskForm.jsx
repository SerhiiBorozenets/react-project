import React, {useEffect, useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const ModalTaskForm = ({ handleShow, editTask, show, onChangeEditTask, updateTask}) => {
  const [disable, setDisable] = useState(true)
  const OPTIONS = ['--Choose an option--', 'Low', "Middle", "High"];
  const statusOptions = OPTIONS.map( (status, index) => {
    return <option key={index} value={status}>{status}</option>
  })

  const onHandleSave = () => {
    handleShow()
    updateTask(editTask)
  }

  useEffect(()=> {
    if(editTask.title) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [editTask.title])

  return <Modal show={show} onHide={handleShow} animation={false}>
    <Modal.Header className="back-ground-header">
      <Modal.Title>Edit task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Task title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter task title"
            value={editTask.title}
            onChange={onChangeEditTask}
            autoFocus
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter due date</Form.Label>
          <Form.Control
            type="date"
            name="due_date"
            placeholder="Due date"
            value={editTask.due_date}
            onChange={onChangeEditTask}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select priority</Form.Label>
          <Form.Select onChange={onChangeEditTask} defaultValue={editTask.status} name="status">
            {statusOptions}
          </Form.Select>
        </Form.Group>

      </Form>
    </Modal.Body>

    <Modal.Footer className="back-ground-header">
      <Button variant="primary" disabled={disable} onClick={onHandleSave}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
}

export default ModalTaskForm