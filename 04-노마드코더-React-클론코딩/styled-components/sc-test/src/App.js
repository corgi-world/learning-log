import styled, { keyframes } from "styled-components";

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Text = styled.span`
  font-size: 30px;
`;

const Box = styled.div`
  background-color: tomato;
  width: 200px;
  height: 200px;
  div {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${Text} {
      color: white;
      &:hover {
        color: black;
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;
const Title = styled.span`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <Wrapper>
      <Title>Hello~</Title>
    </Wrapper>
  );
}

export default App;
