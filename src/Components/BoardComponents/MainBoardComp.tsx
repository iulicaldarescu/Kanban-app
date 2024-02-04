import boards from "../../../data.json";
import ColumnList from "./ColumnList";

// This is a component which represents the one project board
function MainBoardComp() {
  const firstTestBoard = boards.boards[0];
  return (
    <div className="h-screen flex flex-col gap-4 items-center">
      {firstTestBoard.columns.map((list) => {
        return <ColumnList listsArray={list} />;
      })}
    </div>
  );
}

export default MainBoardComp;
