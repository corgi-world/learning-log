import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, iTodo, todoState } from "../atoms";

interface iForm {
  todo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<iForm>();
  const category = useRecoilValue(categoryState);
  const setTodos = useSetRecoilState<iTodo[]>(todoState);
  const onSubmit = (data: iForm) => {
    setTodos((prev) => [{ text: data.todo, id: Date.now(), category }, ...prev]);
    setValue("todo", "");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("todo", { required: true })} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </>
  );
}

export default CreateToDo;
