// import MSW from "./MSW";
import { createGlobalStyle } from "styled-components";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { todoState } from "./atoms";
import styled from "styled-components";
import DraggableBoard from "./Components/DraggableBoard";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    if (source.droppableId === destination?.droppableId) {
      setTodos((prev) => {
        const prevArr = prev[source.droppableId];
        const copy = [...prevArr];
        const taskObj = copy[source.index];

        copy.splice(source.index, 1);
        copy.splice(destination?.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: copy,
        };
      });
    } else {
      setTodos((prev) => {
        const sourceArr = [...prev[source.droppableId]];
        const destinArr = [...prev[destination.droppableId]];
        const taskObj = sourceArr[source.index];

        sourceArr.splice(source.index, 1);
        destinArr.splice(destination?.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: sourceArr,
          [destination.droppableId]: destinArr,
        };
      });
    }
  };
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(todos).map((category) => (
              <DraggableBoard boardID={category} key={category} todos={todos[category]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    font-family: 'Source Sans Pro', sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
