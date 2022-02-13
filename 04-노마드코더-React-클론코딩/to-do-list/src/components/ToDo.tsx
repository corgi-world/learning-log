import { Categories, iTodo, todoState } from "../atoms";
import { useSetRecoilState } from "recoil";

// ToDo({ text }: iTodo)
function ToDo(todo: iTodo) {
  const setTodos = useSetRecoilState<iTodo[]>(todoState);

  const onClick = (newCategory: iTodo["category"]) => {
    setTodos((prev) => {
      const targetIndex = prev.findIndex((obj) => obj.id === todo.id);
      const newTodo = { text: todo.text, id: todo.id, category: newCategory };

      const front = prev.slice(0, targetIndex);
      const back = prev.slice(targetIndex + 1);

      return [...front, newTodo, ...back];
    });
  };

  const textArr = ["Todo", "Doing", "Done"];
  return (
    <li>
      <span>{todo.text}</span>
      {textArr.map((text, index) => {
        if (todo.category != index) {
          return (
            <button key={index} onClick={() => onClick(index as Categories)}>
              {text}
            </button>
          );
        }
      })}
    </li>
  );
}

export default ToDo;
