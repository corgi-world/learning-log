import { atom, selector } from "recoil";

export interface iTodo {
  id: number;
  text: string;
}

interface iTodoState {
  [key: string]: iTodo[];
}

export const todoState = atom<iTodoState>({
  key: "todo",
  default: {
    todo: [{ id: 1, text: "hello" }],
    doing: [{ id: 2, text: "bye" }],
    done: [],
  },
});
