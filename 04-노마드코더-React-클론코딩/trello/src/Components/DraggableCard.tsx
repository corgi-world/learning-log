import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${(props) => (props.isDragging ? "#74b9ff" : props.theme.cardColor)};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;

interface iCard {
  todoID: number;
  todoText: string;
  index: number;
}

function DraggableCard({ todoID, todoText, index }: iCard) {
  return (
    // key와 draggableId는 무조건 같아야 됨.
    <Draggable key={todoID + ""} draggableId={todoID + ""} index={index}>
      {(dragProps, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={dragProps.innerRef}
          {...dragProps.draggableProps}
          {...dragProps.dragHandleProps}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
}

// prop이 변하지 않았다면 다시 렌더링하지 말아 주세용
export default React.memo(DraggableCard);
// export default DraggableCard;
