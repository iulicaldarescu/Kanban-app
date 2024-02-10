import ColumnList from "./ColumnList";
import fetchMainBoard from "../../FetchFunctions/fetchMainBoard";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useBoardStore from "../../store/board.ts";

// This is a component which represents the one project board
function MainBoardComp() {
  const { boardID } = useBoardStore();

  const { data, isLoading } = useQuery({
    queryKey: [`main-boards ${boardID}`],
    queryFn: () => fetchMainBoard(boardID),
  });

  useEffect(() => {
    if (data) {
      // console.log(data[0]);
    }
  }, [data]);

  if (isLoading) {
    return <p>LOADING ...</p>;
  }

  // const firstTestBoard = boards.boards[0];
  return (
    <div className="h-screen flex flex-col gap-4 items-center bg-[#21212d]">
      {data[0]?.columns?.map((list) => {
        return <ColumnList listsArray={list} />;
      })}
    </div>
  );
}

export default MainBoardComp;
