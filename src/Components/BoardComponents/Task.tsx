import { useState } from "react";
import TaskInfoModal from "./TaskInfo/TaskInfoModal";

// This is a component which represents only the task the li task
function Task({ taskItem }) {
  const [editTask, setEditTask] = useState<boolean>(false);
  const handleTask = () => {
    setEditTask(!editTask);
  };
  return (
    <>
      {" "}
      <li
        className="bg-[#2c2c38] py-6 px-5 rounded-lg w-full text-white font-semibold"
        onClick={handleTask}
      >
        {taskItem.title}
      </li>
      {editTask && (
        <TaskInfoModal taskInfos={taskItem} setEditTask={setEditTask} />
      )}
    </>
  );
}

export default Task;
