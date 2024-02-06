import { useState } from "react";
import cross from "../../assets/icon-cross.svg";
import { v4 as uuidv4 } from "uuid";
import arrowUp from "../../assets/icon-chevron-up.svg";
import arrowDown from "../../assets/icon-chevron-down.svg";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type SetIsAddTaskOpen = (isOpen: boolean) => void;

type SetIsAddTaskOpenType = {
  setIsAddTaskOpen: SetIsAddTaskOpen;
};
function AddTask({ setIsAddTaskOpen }: SetIsAddTaskOpenType) {
  const [numberOfSubTasksInputs, setNumberOfSubTasksInputs] = useState([
    { id: uuidv4(), taskName: "Make coffe" },
    { id: uuidv4(), taskName: "Smile" },
  ]);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [getStatusValue, setGetStatusValue] = useState("Todo");

  const addAnotherSubTask = () => {
    setNumberOfSubTasksInputs([
      ...numberOfSubTasksInputs,
      { id: uuidv4(), taskName: "Add new task" },
    ]);
  };

  const deleteInput = (param: string) => {
    const updatedInputs = numberOfSubTasksInputs.filter((item) => {
      return item.id !== param;
    });

    setNumberOfSubTasksInputs(updatedInputs);
  };

  const schema = yup.object().shape({
    title: yup.string().required("title is required"),
    description: yup.string(),
    subtasks: yup.array().of(yup.string()),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    const newTask = {
      name: getStatusValue,
      tasks: [
        {
          title: data.title,
          description: data.description,
          status: getStatusValue,
          subtasks: data.subtasks.map((subtask: any) => ({
            title: subtask,
            isCompleted: false,
          })),
        },
      ],
    };

    console.log(data);
    console.log(newTask);
  };

  return (
    <form
      className="absolute top-0 right-0 left-0 text-white bg-[#2c2c38] px-6 h-screen flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* tasks */}
      <div className="flex justify-between pt-4 items-center">
        <h1>Add New Task</h1>
        <img src={cross} onClick={() => setIsAddTaskOpen(false)}></img>
      </div>

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Take coffe break"
          className="w-full border-2 bg-[#2c2c38] border-[#45455e] px-3 focus:outline-none rounded"
          {...register("title")}
        ></input>
        <p className="text-red-500 px-2">{errors.title?.message}</p>
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="It's always good to take a break. This 15 minutes break will recharge the batteries a little."
          className="w-full border-2 bg-[#2c2c38] border-[#45455e] px-3 focus:outline-none rounded h-28"
          {...register("description")}
        ></textarea>
      </div>

      {/* subtasks */}
      <div>
        <p>Subtasks</p>

        <div className="flex flex-col gap-3">
          {numberOfSubTasksInputs.map((subTaskInput, index) => {
            return (
              <div className="flex gap-3" key={subTaskInput.id}>
                <input
                  type="text"
                  className="w-full border-2 bg-[#2c2c38] border-[#45455e] px-3 focus:outline-none rounded"
                  placeholder={subTaskInput.taskName}
                  {...register(`subtasks.${index}`)}
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
        </div>

        <div>
          <button
            className="bg-white text-[#645fc6] font-semibold w-full rounded-xl py-1 mt-6"
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
            className="w-full border-2 bg-[#2c2c38] border-[#45455e] px-3 focus:outline-none rounded"
          >
            <li
              value="todo"
              className="hover:bg-red-600"
              onClick={() => setGetStatusValue("Todo")}
            >
              Todo
            </li>
            <li
              value="doing"
              className="hover:bg-red-600"
              onClick={() => setGetStatusValue("Doing")}
            >
              Doing
            </li>
            <li
              value="done"
              className="hover:bg-red-600"
              onClick={() => setGetStatusValue("Done")}
            >
              Done
            </li>
          </ul>
        )}
      </div>
      <div>
        <button className="bg-[#645fc6] text-white w-full rounded-xl py-1">
          Create Task
        </button>
      </div>
    </form>
  );
}

export default AddTask;
