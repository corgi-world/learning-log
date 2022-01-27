import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <Container>
      <Title>Hello~</Title>
    </Container>
  );
}

export default App;

// function App() {
//   const [userName, setUserName] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setUserName(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={userName} type="text" placeholder="userName" />
//         <button>Log in</button>
//       </form>
//     </div>
//   );
// }

// export default App;

// // <Circle bgColor="teal" borderColor="black" />
// // <Circle bgColor="tomato" />
