import React, {useEffect, useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const ModalTaskForm = ({ handleShow, createTask, task, show, onChangeTask }) => {
  const [disable, setDisable] = useState(true)
  const STATUS_OPTIONS = ['Choose an option', 'Low', "Middle", "High"];
  const COMPLEXITY_OPTIONS = ['None', 'Elementary', "Intermediate", "Advanced", "Master"];
  const statusOptions = STATUS_OPTIONS.map( (status, index) => {
    return <option key={index} value={status}>{status}</option>
  })
  const complexityOptions = COMPLEXITY_OPTIONS.map( (complexity, index) => {
    return <option key={index} value={complexity}>{complexity}</option>
  })

  const onProjectSave = () => {
    handleShow()
    createTask()
  }

  useEffect(()=> {
    if(task.title) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [task.title])

  return <Modal show={show} onHide={handleShow} animation={false}>
    <Modal.Header closeButton className="back-ground-header">
      <Modal.Title>Create new task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" onChange={onChangeTask} value={task.title}>
          <Form.Label>Task title</Form.Label>
          <Form.Control type="text" as="textarea" rows="3" name="title" placeholder="Enter task title" autoFocus />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter due date</Form.Label>
          <Form.Control
            type="date"
            name="due_date"
            placeholder="Due date"
            value={task.due_date || ''}
            onChange={onChangeTask}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select priority</Form.Label>
          <Form.Select onChange={onChangeTask} name="status">
            {statusOptions}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select complexity</Form.Label>
          <Form.Select onChange={onChangeTask} defaultValue={task.complexity} name="complexity">
            {complexityOptions}
          </Form.Select>

        </Form.Group>
      </Form>
    </Modal.Body>

    <Modal.Footer className="back-ground-header">
      <Button variant="primary" disabled={disable} onClick={onProjectSave}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
}

export default ModalTaskForm