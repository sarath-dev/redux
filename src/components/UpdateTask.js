import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTaskList,
  updateTasksFromServer,
} from "./../store/slices/taskSlice";

const UpdateTask = (props) => {
  const dispatch = useDispatch();
  const { selectedTasks } = useSelector((state) => state.tasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);
  const updateTask = (e) => {
    e.preventDefault();
    props.onHide();
    dispatch(updateTasksFromServer({ title, description, id }));
  };
  useEffect(() => {
    setTitle(selectedTasks.title);
    setDescription(selectedTasks.description);
    setId(selectedTasks.id);
  }, [selectedTasks]);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Task title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Task title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="mb-3 text-end">
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => updateTask(e)}
            >
              Update Task
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateTask;
