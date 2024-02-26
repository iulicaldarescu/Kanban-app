import { useEffect, useState } from "react";
import cross from "../../../assets/icon-cross.svg";
import SubtaskType from "../TaskInfo/types";
import useBoardStore from "../../../store/board";
import supabase from "../../../config/supabaseClient";
import { useForm } from "react-hook-form";

function TaskInfoModal({ taskInfos, setEditTask }: any) {
  const { boardID } = useBoardStore();
  const [boardListsArr, setBoardListsArr] = useState<any>([]);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [editStatus, setEditStatus] = useState<string>("Todo");
  const [isChecked, setIsChecked] = useState(false);
  const [inputSubtask, setInputSubtask] = useState(false);

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
    // console.log(name, value);
    const newSubtasksArr = taskInfos.subtasks.map((subtask: SubtaskType) => {
      if (subtask.title === name) {
        subtask.isCompleted = value;
      }
      return subtask;
    });
    // Further we have to update in supabse this belowArr
    return newSubtasksArr;
  };

  // this function modify the status of the task , but the status is taken from db so is not able to change direclty , it has to be updated in db , then is displayed in GUI
  const handleSubtask = async (e: any, title: string) => {
    changeStatus(e.target.checked, e.target.name);
    setIsChecked((prev) => !prev);
    setInputSubtask(e.target.checked);
  };

  const confirm = async (title) => {
    const boardListItem = boardListsArr.filter((board) => {
      return board.name === taskInfos.status;
    });

    const boardListTasks = boardListItem[0].tasks.map((item) => {
      return item.title === taskInfos.title
        ? { ...item, subtasks: changeStatus(isChecked, taskInfos.title) }
        : item;
    });

    const columns = boardListsArr.map((listItem) => {
      return listItem.name === taskInfos.status
        ? { ...listItem, tasks: boardListTasks }
        : listItem;
    });

    const { error } = await supabase
      .from("KanbanApp-Boards")
      .update({ columns: columns })
      .eq("id", boardID);
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

  // INPUT FORM DATA COLLECTION
  const { register, handleSubmit } = useForm();

  // this is database update logics
  const onSubmit = async (data: any) => {
    // Building the object
    const updatedTaskInfo = {
      title: data.title,
      status: editStatus,

      subtasks: data.subtask.map((itemSubtask: any) => {
        return { title: itemSubtask, isCompleted: false };
      }),
      description: data.description,
    };

    // First fetch phase
    const { data: supaInfo } = await supabase
      .from("KanbanApp-Boards")
      .select()
      .eq("id", boardID);

    let newArr = supaInfo[0].columns.map((item: any) => {
      return item.name === "Todo" ||
        item.name === "Doing" ||
        item.name === "Done"
        ? {
            ...item,
            tasks: item.tasks.filter((item: any) => {
              return item.title !== updatedTaskInfo.title;
            }),
          }
        : item;
    });

    newArr = newArr.map((list: any) => {
      return list.name === updatedTaskInfo.status
        ? { ...list, tasks: [...list.tasks, updatedTaskInfo] }
        : list;
    });

    // further step is to update in supabase the columns property of row object wit newArr whihc has format as columns array
    const { error } = await supabase
      .from("KanbanApp-Boards")
      .update({ columns: newArr })
      .eq("id", boardID);
  };

  const changeEditMode = () => {
    setIsEditable(true);
  };

  const changeEditModeFalse = () => {
    setIsEditable(false);
  };

  // there were no id from fronendmentor for tasks so we do it by title name
  const deleteTask = async (titleName: string) => {
    //fetch

    const { data, error } = await supabase
      .from("KanbanApp-Boards")
      .select("columns")
      .eq("id", boardID);

    const listName = data[0].columns.filter((item: any) => {
      return item.name === taskInfos.status;
    });

    const deletingTask = listName.filter((task: any) => {
      return task.title !== taskInfos.title;
    });

    console.log(deletingTask[0].tasks);
    const newArr = deletingTask[0].tasks.filter((item: any) => {
      return item.title !== titleName;
    });

    const finalArray = data[0].columns.map((list: any) => {
      if (list.name === taskInfos.status) {
        list.tasks = [...newArr];
      }
      return list;
    });

    const { error: err } = await supabase
      .from("KanbanApp-Boards")
      .update({ columns: finalArray })
      .eq("id", boardID);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#2c2c38] text-white absolute top-0 bottom-0 left-0 right-0 flex flex-col gap-3"
    >
      {/* top container */}
      <div className="flex items-center justify-between">
        {/* task title */}
        {isEditable ? (
          <input
            className="bg-transparent w-full font-bold text-xl focus:outline-none"
            type="text"
            defaultValue={taskInfos.title}
            {...register("title")}
          ></input>
        ) : (
          <p className="font-bold text-xl">{taskInfos.title}</p>
        )}

        <img
          className="h-[15px] w-[15px]"
          onClick={handleTask}
          src={cross}
        ></img>
      </div>
      {/* task description */}
      {!isEditable ? (
        <p className="text-[#808189] font-semibold">{taskInfos.description}</p>
      ) : (
        <textarea
          className="bg-transparent focus:outline-none"
          defaultValue={taskInfos.description}
          {...register("description")}
        ></textarea>
      )}

      {/* subtask array */}
      <ul className="flex flex-col gap-3">
        <p className="font-semibold">
          {" "}
          Subtasks ({completed} of {taskInfos.subtasks.length})
        </p>
        {taskInfos.subtasks.map((subtask: SubtaskType, index: number) => {
          return !isEditable ? (
            <li className="flex gap-4 bg-[#21212d] px-4 py-3 text-white rounded">
              <input
                onChange={(e) => handleSubtask(e, subtask.title)}
                type="checkbox"
                defaultChecked={subtask.isCompleted}
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
          ) : (
            <li className="flex gap-4 bg-[#21212d] px-4 py-3 text-white rounded">
              {/* <input
                onChange={handleSubtask}
                type="checkbox"
                checked={subtask.isCompleted}
                name={subtask.title}
              ></input> */}

              <div className="flex gap-3">
                <input
                  type="text"
                  className="bg-transparent focus:outline-none"
                  defaultValue={subtask.title}
                  {...register(`subtask.${index}`)}
                ></input>
              </div>
            </li>
          );
        })}
        {taskInfos.subtasks.length > 0 && (
          <button
            type="button"
            className="bg-green-300 flex justify-start px-5"
            onClick={() => confirm(taskInfos.title)}
          >
            Confirm
          </button>
        )}
      </ul>
      {/* status */}
      <label htmlFor="status">Status</label>
      <select
        onChange={(e) => {
          setEditStatus(e.target.value);
        }}
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
      <div className="w-full flex justify-around mt-10">
        {!isEditable ? (
          <button
            className="bg-rose-500 font-semibold py-1 w-24 rounded-full"
            onClick={() => deleteTask(taskInfos.title)}
          >
            Delete
          </button>
        ) : (
          <button className="bg-green-500 font-semibold py-1 w-24 rounded-full">
            Confirm
          </button>
        )}
        {!isEditable && (
          <button
            onClick={changeEditMode}
            className="bg-green-500 font-semibold py-1 w-24 rounded-full"
          >
            Edit
          </button>
        )}
        {isEditable && (
          <button
            onClick={changeEditModeFalse}
            className="bg-rose-500 font-semibold py-1 w-24 rounded-full"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskInfoModal;
