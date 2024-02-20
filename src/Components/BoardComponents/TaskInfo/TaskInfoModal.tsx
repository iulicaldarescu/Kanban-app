import { useEffect, useState } from "react";
import cross from "../../../assets/icon-cross.svg";
import SubtaskType from "../TaskInfo/types";
import useBoardStore from "../../../store/board";
import supabase from "../../../config/supabaseClient";

function TaskInfoModal({ taskInfos, setEditTask }: any) {
  const { boardID } = useBoardStore();
  const [boardListsArr, setBoardListsArr] = useState<any>([]);

  const handleTask = () => {
    setEditTask(false);
  };

  // count how many tasks are completed
  const completed = taskInfos.subtasks.reduce(
    (acc: number, curr: SubtaskType) => {
      return acc + curr.isCompleted;
    },
    0
  );

  const changeStatus = (value: boolean, name: string) => {
    console.log(name, value);
    const newSubtasksArr = taskInfos.subtasks.map((subtask: SubtaskType) => {
      if (subtask.title === name) {
        subtask.isCompleted = value;
      }
      return subtask;
    });
    // Further we have to update in supabse this belowArr
    console.log(newSubtasksArr);
  };

  // this function modify the status of the task , but the status is taken from db so is not able to change direclty , it has to be updated in db , then is displayed in GUI
  const handleSubtask = (e: any) => {
    changeStatus(e.target.checked, e.target.name);
  };

  const fetchSelectedBoard = async () => {
    const { data: allData, error: err } = await supabase
      .from("KanbanApp-Boards")
      .select("columns")
      .eq("id", boardID);
    setBoardListsArr(allData[0].columns);
  };

  useEffect(() => {
    fetchSelectedBoard();
  }, [boardID]);

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
        {taskInfos.subtasks.map((subtask: SubtaskType) => {
          return (
            <li className="flex gap-4 bg-[#21212d] px-4 py-3 text-white rounded">
              <input
                onChange={handleSubtask}
                type="checkbox"
                checked={subtask.isCompleted}
                name={subtask.title}
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
        {boardListsArr.map((item: any) => {
          return (
            <option
              className=""
              value={item.name}
              selected={taskInfos.status === item.name}
            >
              {item.name}
            </option>
          );
        })}
      </select>
    </form>
  );
}

export default TaskInfoModal;
