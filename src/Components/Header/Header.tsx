import logo from "../../assets/logo-mobile.svg";
import arrowUp from "../../assets/icon-chevron-up.svg";
import arrowDown from "../../assets/icon-chevron-down.svg";
import addTask from "../../assets/icon-add-task-mobile.svg";
import elipsis from "../../assets/icon-vertical-ellipsis.svg";
import { useEffect, useState } from "react";
import fetchData from "../../FetchFunctions/FetchData.js";
import { useQuery } from "@tanstack/react-query";
import AddTask from "../AddTask/AddTask.js";
import useBoardStore from "../../store/board.js";

type BoardType = {
  id: string;
  name: string;
  columns: [];
};

function Header() {
  // Global states zustand
  const { boardID, setBoardID, boardName, setBoardName } = useBoardStore();

  // Local states useState
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: fetchData,
  });

  useEffect(() => {
    if (data) {
      // console.log(data);
    }
  }, []);

  const handleSelectedBoard = (board) => {
    setBoardID(board.id);
    setBoardName(board.name);

    // Close the modal after select a BOARD
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    // console.log(board);
  }, [boardID]);

  if (isLoading) {
    return <p>LOADING ...</p>;
  }

  return (
    <>
      <nav className="bg-[#21212d]">
        <div className="flex bg-[#2c2c38] items-center justify-between py-2 px-4">
          <div className="flex gap-2">
            <div>
              <img src={logo} />
            </div>
            <div className="flex text-lg text-white font-semibold items-center gap-1">
              <p>{boardName}</p>
              <div onClick={() => setIsModalOpen(!isModalOpen)}>
                {isModalOpen ? <img src={arrowUp} /> : <img src={arrowDown} />}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img
              onClick={() => {
                setIsAddTaskOpen(true);
              }}
              src={addTask}
              className="bg-[#645fc6] px-5 py-3 rounded-3xl"
            />
            <img src={elipsis} />
          </div>
        </div>

        {isModalOpen && (
          <div className="p-2">
            <ul className="flex flex-col gap-4 w-full">
              {data.map((board: BoardType) => {
                return (
                  <li
                    className="text-white bg-[#2c2c38] rounded w-1/2 m-auto text-center"
                    onClick={() => handleSelectedBoard(board)}
                  >
                    {board.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>

      {isAddTaskOpen && <AddTask setIsAddTaskOpen={setIsAddTaskOpen} />}
    </>
  );
}

export default Header;
