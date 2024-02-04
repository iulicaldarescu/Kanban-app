import { useState } from "react";
import Tasks from "./Tasks";

// This is a component which represents the list with all columns per Board project
function ColumnList({ listsArray }) {
  const [showList, setShowList] = useState<boolean>(false);

  // LIST COLOR SETTER
  const getRandomValueInRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;

  const red = getRandomValueInRange(50, 255) + Math.floor(Math.random() * 50);
  const green = getRandomValueInRange(50, 255) + Math.floor(Math.random() * 50);
  const blue = getRandomValueInRange(50, 255) + Math.floor(Math.random() * 50);

  return (
    // Main list container
    <div className="flex flex-col w-full">
      {/* First container */}
      <div className="flex items-center gap-2">
        {/* BULLET POINT */}
        <div
          className={`h-[15px] w-[15px] rounded-full`}
          style={{
            backgroundColor: `rgb(${red},${green},${blue} )`,
          }}
        ></div>

        {/* LIST TITLE */}
        <h1
          onClick={() => setShowList(!showList)}
          className="text-gray-400 text-lg font-semibold"
        >
          {listsArray.name.toUpperCase()}
        </h1>
      </div>
      {/* List to be displayed */}
      {showList && <Tasks tasks={listsArray.tasks} />}
    </div>
  );
}

export default ColumnList;
