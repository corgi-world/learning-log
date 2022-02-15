import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useSetRecoilState } from "recoil";
import { iTodo, todoState } from "../atoms";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface iArea {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<iArea>`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  flex-grow: 1;
  background-color: ${(props) =>
    props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "black" : "gray"};
  transition: background-color 0.3s ease-in-out;
`;

interface iBoard {
  todos: iTodo[];
  boardID: string;
}

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface iForm {
  todo: string;
}

function DraggableBoard({ todos, boardID }: iBoard) {
  const { register, setValue, handleSubmit } = useForm<iForm>();
  const setter = useSetRecoilState(todoState);
  const onValid = (data: iForm) => {
    const newTodo = { id: Date.now(), text: data.todo };
    setter((prev) => {
      return { ...prev, [boardID]: [...prev[boardID], newTodo] };
    });
    setValue("todo", "");
  };
  return (
    <Wrapper>
      <Title>{boardID}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardID}`}
        />
      </Form>
      <Droppable droppableId={boardID}>
        {(dropProps, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={dropProps.innerRef}
            {...dropProps.droppableProps}
          >
            {todos.map((todo, index) => (
              <DraggableCard
                key={todo.id}
                index={index}
                todoID={todo.id}
                todoText={todo.text}
              />
            ))}
            {dropProps.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DraggableBoard;
