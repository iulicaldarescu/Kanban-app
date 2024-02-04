import { useState } from "react";
import cross from "../../assets/icon-cross.svg";
import { v4 as uuidv4 } from "uuid";
import arrowUp from "../../assets/icon-chevron-up.svg";
import arrowDown from "../../assets/icon-chevron-down.svg";

function AddTask() {
  const [numberOfSubTasksInputs, setNumberOfSubTasksInputs] = useState([
    { id: uuidv4(), taskName: "Make coffe" },
    { id: uuidv4(), taskName: "Smile" },
  ]);
  const [isStatusOpen, setIsStatusOpen] = useState(true);

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

  const showStatusValues = () => {
    setIsStatusOpen(!setIsStatusOpen);
  };

  return (
    <form className="text-white bg-blue-950 px-6 h-screen">
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
          className="w-full bg-blue-950 border border-gray-300 px-3 resize-none h-28"
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
        <div className="flex items-center gap-1">
          <p>Status</p>
          <div onClick={() => setIsStatusOpen((prev) => !prev)}>
            {isStatusOpen ? (
              <img src={arrowDown}></img>
            ) : (
              <img src={arrowUp}></img>
            )}
          </div>
        </div>

        {isStatusOpen && (
          <ul
            id="status"
            className={`text-gray-100 bg-blue-950 border border-gray-300 p-1 outline-none`}
          >
            <li value="todo" className="hover:bg-red-600">
              Todo
            </li>
            <li value="doing" className="hover:bg-red-600">
              Doing
            </li>
            <li value="done" className="hover:bg-red-600">
              Done
            </li>
          </ul>
        )}
      </div>
      <div>
        <button className="bg-white text-blue-800 w-full rounded-xl py-1">
          Create Task
        </button>
      </div>
    </form>
  );
}

export default AddTask;
