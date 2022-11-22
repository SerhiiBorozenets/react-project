import React from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";

const TaskForm = (props) => {
  {console.log("props", props)}
  const statusOptions = ['Low', "Middle", "High"].map( (status, index) => {
    return(
      <option key={index} value={index}>{status}</option>
    )
  })
  // const {show, toggleShow} = props

  return <Form onSubmit={props.handleSubmit}>
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

      <div className="text-end">
        <Button className="text-end" variant="primary" type="submit">
          Submit
        </Button>
      </div>

    </Form>
}

export default TaskForm