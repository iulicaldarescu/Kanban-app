import { useState } from "react";
import cross from "./assets/icon-cross.svg";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles/AddTask.module.css";

function AddTask() {
  const [numberOfSubTasksInputs, setNumberOfSubTasksInputs] = useState([
    { id: uuidv4(), taskName: "Make coffe" },
    { id: uuidv4(), taskName: "Smile" },
  ]);

  const addAnotherSubTask = () => {
    setNumberOfSubTasksInputs([
      ...numberOfSubTasksInputs,
      { id: uuidv4(), taskName: "Add new task" },
    ]);
  };

  const deleteInput = (param: string) => {
    const updatedInputs = numberOfSubTasksInputs.filter((item) => {
      console.log(param);

      return item.id !== param;
    });

    setNumberOfSubTasksInputs(updatedInputs);
  };

  return (
    <div className="text-white bg-blue-950 px-6 h-screen">
      {/* tasks */}
      <h1>Add New Task</h1>

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          placeholder="Take coffe break"
          className="w-full bg-blue-950 border border-gray-300 px-3"
        ></input>
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="It's always good to take a break. This 15 minutes break will recharge the batteries a little."
          className="w-full bg-blue-950 border border-gray-300 px-3"
        ></textarea>
      </div>

      {/* subtasks */}
      <div>
        <p>Subtasks</p>

        {numberOfSubTasksInputs.map((subTaskInput, index) => {
          return (
            <div className="flex gap-3" key={subTaskInput.id}>
              <input
                className="w-full bg-blue-950 border border-gray-300 px-3"
                placeholder={subTaskInput.taskName}
              ></input>
              <button className="cursor-pointer">
                <img
                  src={cross}
                  onClick={() => deleteInput(subTaskInput.id)}
                ></img>
              </button>
            </div>
          );
        })}

        <div>
          <button
            className="bg-white text-blue-800 w-full rounded-xl py-1"
            onClick={addAnotherSubTask}
          >
            + Add new subtask
          </button>
        </div>
      </div>

      {/* status */}
      <div className="flex flex-col">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          className={`text-gray-100 bg-blue-950 border border-gray-300 p-1 outline-none ${styles["custom-select"]}`}
        >
          <option value={"todo"} className="">
            Todo
          </option>
          <option value={"doing"}>Doing</option>
          <option value={"done"}>Done</option>
        </select>
      </div>
    </div>
  );
}

export default AddTask;
