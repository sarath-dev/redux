import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import UpdateTask from "./UpdateTask";
import {
  setSelectedTask,
  deleteTaskList,
  getTasksFromServer,
  deleteTasksFromServer,
} from "../store/slices/taskSlice";

const TasksList = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const updateTask = (task) => {
    console.log("Update Task");
    dispatch(setSelectedTask(task));
    setModalShow(true);
  };
  useEffect(() => {
    dispatch(getTasksFromServer());
  }, [dispatch]);
  const deleteTask = (task) => {
    console.log("Delete Task");
    dispatch(deleteTasksFromServer(task))
      .unwrap()
      .then(() => {
        dispatch(deleteTaskList(task));
      });
  };
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task, index) => {
              return (
                <tr className="text-center" key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="mx-2"
                      onClick={() => updateTask(task)}
                    >
                      <i className="bi bi-pen"></i>
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => deleteTask(task.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <UpdateTask show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default TasksList;
