import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {checkTaskTitle, updateTask} from "../helpers/helpers";

const ModalTaskForm = ({ handleShow, editTask, show, onChangeEditTask, project, setProject}) => {
  const [disable, setDisable] = useState(true)
  const STATUS_OPTIONS = ['No', 'Low', "Middle", "High"];
  const COMPLEXITY_OPTIONS = ['None', 'Elementary', "Intermediate", "Advanced", "Master"];
  const statusOptions = STATUS_OPTIONS.map( (status, index) => {
    return <option key={index} value={status}>{status}</option>
  })
  const complexityOptions = COMPLEXITY_OPTIONS.map( (complexity, index) => {
    return <option key={index} value={complexity}>{complexity}</option>
  })

  const onHandleSave = () => {
    updateTask(editTask, project, setProject).then(handleShow())
  }

  useEffect(()=> {
    setDisable(!checkTaskTitle(editTask, project, { isEdit: true }))
  }, [editTask.title])

  return <Modal show={show} onHide={handleShow} animation={false}>
    <Modal.Header closeButton className="back-ground-header">
      <Modal.Title>Edit task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Task title</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows="3"
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

        <Form.Group className="mb-3">
          <Form.Label>Select complexity</Form.Label>
          <Form.Select onChange={onChangeEditTask} defaultValue={editTask.complexity} name="complexity">
            {complexityOptions}
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