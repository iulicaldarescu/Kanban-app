import { create } from "zustand";

type boardType = {
  board: string;
  setBoard: (newBoard: string) => void;
};
const useBoardStore = create<boardType>((set) => ({
  board: "5252b839-08e1-4c40-9a76-064b1865bc0d",
  setBoard: (newBoard) => set({ board: newBoard }),
}));

export default useBoardStore;
