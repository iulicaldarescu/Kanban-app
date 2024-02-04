import Task from "./Task";

// This is a component which represents only the List area of tasks within the each List component
function Tasks({ tasks }) {
  return (
    <ul className="flex flex-col gap-6 w-full">
      {tasks.map((item) => {
        return <Task taskItem={item} />;
      })}
    </ul>
  );
}

export default Tasks;
