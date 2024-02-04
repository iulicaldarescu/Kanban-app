// This is a component which represents only the task the li task
function Task({ taskItem }) {
  return (
    <li className="bg-[#2c2c38] py-6 px-5 rounded-lg w-full">
      {taskItem.title}
    </li>
  );
}

export default Task;
