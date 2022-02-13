import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Categories, categoryState, iTodo, todoSelector, todoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

export default function ToDoList() {
  // const todos = useRecoilValue<iTodo[]>(todoState);
  const todos = useRecoilValue(todoSelector);
  const orgTodos = useRecoilValue(todoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
    // 여기서 value가 string으로 들어간다;
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TODO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {todos?.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </div>
  );
}
