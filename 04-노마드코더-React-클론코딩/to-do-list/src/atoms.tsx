import { atom, selector } from "recoil";

export enum Categories {
  "TODO",
  "DOING",
  "DONE",
}

export interface iTodo {
  text: string;
  id: number;
  category: Categories;
}

export const todoState = atom<iTodo[]>({
  key: "todo",
  default: [],
});

export const categoryState = atom<iTodo["category"]>({
  key: "category",
  default: Categories.TODO,
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category == category);
  },
});
