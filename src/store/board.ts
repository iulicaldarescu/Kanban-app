import { create } from "zustand";

type boardType = {
  boardID: string;
  boardName: string;

  setBoardID: (newBoardID: string) => void;
  setBoardName: (newBoardName: string) => void;
};
const useBoardStore = create<boardType>((set) => ({
  boardID: "5252b839-08e1-4c40-9a76-064b1865bc0d",
  boardName: "Platform Launch",

  setBoardID: (newBoardID) => set({ boardID: newBoardID }),
  setBoardName: (newBoardName) => set({ boardName: newBoardName }),
}));

export default useBoardStore;
