import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { tasks, error } = useSelector((state) => state.tasks);

  return (
    <>
      <h1 className="text-center my-4 text-primary ">Project Management</h1>
      <p className="text-center lead">{`Currently ${tasks.length} tasks pending`}</p>
      {error !== "" ? (
        <p className="text-center lead text-danger">{error}</p>
      ) : null}
    </>
  );
};

export default Navbar;
