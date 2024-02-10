import cross from "../../../assets/icon-cross.svg";

function TaskInfoModal({ taskInfos, setEditTask }) {
  const handleTask = () => {
    setEditTask(false);
  };

  // count how many tasks are completed
  const completed = taskInfos.subtasks.reduce((acc, curr) => {
    return acc + curr.isCompleted;
  }, 0);

  // this function modify the status of the task , but the status is taken from db so is not able to change direclty , it has to be updated in db , then is displayed in GUI
  const handleSubtask = (e) => {
    console.log(e);
  };

  return (
    <form className="bg-[#2c2c38] text-white absolute top-0 bottom-0 left-0 right-0 flex flex-col gap-3">
      {/* top container */}
      <div className="flex items-center justify-between">
        {/* task title */}
        <p className="font-bold text-xl">{taskInfos.title}</p>
        <img
          className="h-[15px] w-[15px]"
          onClick={handleTask}
          src={cross}
        ></img>
      </div>

      {/* task description */}
      <p className="text-[#808189] font-semibold">{taskInfos.description}</p>

      {/* subtask array */}
      <ul className="flex flex-col gap-3">
        <p className="font-semibold">
          {" "}
          Subtasks ({completed} of {taskInfos.subtasks.length})
        </p>
        {taskInfos.subtasks.map((subtask) => {
          return (
            <li className="flex gap-4 bg-[#21212d] px-4 py-3 text-white rounded">
              <input
                onChange={handleSubtask}
                type="checkbox"
                checked={subtask.isCompleted}
              ></input>
              <p
                className={`${
                  subtask.isCompleted ? "line-through text-[#808189]" : ""
                }`}
              >
                {subtask.title}
              </p>
            </li>
          );
        })}
      </ul>
      {/* status */}
      <label htmlFor="status">Status</label>
      <select
        name="status"
        className="bg-[#2c2c38] border border-[#45455e] rounded focus:outline-none"
      >
        <option value="Todo" selected={taskInfos.status === "Todo"}>
          Todo
        </option>
        <option value="Doing" selected={taskInfos.status === "Doing"}>
          Doing
        </option>
        <option value="Done" selected={taskInfos.status === "Done"}>
          Done
        </option>
      </select>
    </form>
  );
}

export default TaskInfoModal;
