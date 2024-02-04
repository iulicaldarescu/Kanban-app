import logo from "../../assets/logo-mobile.svg";
import arrowUp from "../../assets/icon-chevron-up.svg";
import arrowDown from "../../assets/icon-chevron-down.svg";
import addTask from "../../assets/icon-add-task-mobile.svg";
import elipsis from "../../assets/icon-vertical-ellipsis.svg";
import { useEffect, useState } from "react";
import fetchData from "../../FetchFunctions/FetchData.js";
import { useQuery } from "@tanstack/react-query";
import AddTask from "../../AddTask.js";

type BoardType = {
  id: string;
  name: string;
  columns: [];
};

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: fetchData,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, []);

  if (isLoading) {
    return <p>LOADING ...</p>;
  }

  return (
    <>
      <nav>
        <div className="flex bg-red-300 items-center justify-between py-2 px-4">
          <div className="flex gap-2">
            <div>
              <img src={logo} />
            </div>
            <div className="flex text-lg text-white font-semibold items-center gap-1">
              <p>Platform Launch</p>
              <div onClick={() => setIsModalOpen(!isModalOpen)}>
                {isModalOpen ? <img src={arrowUp} /> : <img src={arrowDown} />}
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-4"
            onClick={() => {
              setIsAddTaskOpen(true);
            }}
          >
            <img src={addTask} className="bg-blue-700 px-5 py-3 rounded-3xl" />
            <img src={elipsis} />
          </div>
        </div>

        {isModalOpen && (
          <div className="bg-blue-300  w-1/2 m-2 p-2">
            <ul>
              {data.map((board: BoardType) => {
                return <li className="text-white border-b-2">{board.name}</li>;
              })}
            </ul>
          </div>
        )}
      </nav>

      {isAddTaskOpen && <AddTask />}
    </>
  );
}

export default Header;
