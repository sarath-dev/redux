import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addTasksToServer, addTasktoList } from "./../store/slices/taskSlice";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dipatch = useDispatch();

  const addTask = (e) => {
    e.preventDefault();
    console.log(title, description);
    dipatch(addTasksToServer({ title, description }));
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <section className="text-center my-4">
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
          <div className="mb-3 text-end">
            <Button variant="primary" type="submit" onClick={(e) => addTask(e)}>
              Add Task
            </Button>
          </div>
        </Form>
      </section>
    </>
  );
};

export default AddTask;
