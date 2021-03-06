# styled-components

- 변수

  ```javascript
  const Box = styled.div`
    background-color: ${(props) => props.bgColor};
    width: 100px;
    height: 100px;
  `;

  function App() {
    return (
      <>
        <Box bgColor="teal" />
        <Box bgColor="tomato" />
      </>
    );
  }
  ```

- 확장

  ```javascript
  const Circle = styled(Box)`
    border-radius: 50px;
  `;
  ```

- 태그 변경

  ```javascript
  const Btn = styled.button`
    background-color: tomato;
    border-radius: 15px;
    border: 0;
  `;

  function App() {
    return (
      <>
        <Btn>Hello</Btn>
        <Btn as="a" href="/">
          Hello
        </Btn>
      </>
    );
  }
  ```

- 속성

  ```javascript
  const Input = styled.input.attrs({ required: true, maxLength: 5 })`
    background-color: tomato;
  `;
  ```

- 애니메이션

  ```javascript
  const rotation = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

  const Box = styled.div`
    background-color: tomato;
    width: 200px;
    height: 200px;
    animation: ${rotation} 1s linear infinite;
  `;
  ```

- 선택자

  ```javascript
  const Box = styled.div`
    background-color: tomato;
    width: 200px;
    height: 200px;
    div {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 30px;
        color: white;
        &:hover {
          color: black;
        }
      }
    }
  `;

  function App() {
    return (
      <Box>
        <div>
          <span>Hello~</span>
        </div>
      </Box>
    );
  }
  ```

  ```javascript
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
  ```

- theme

  1. styled.d.ts : theme interface 정의

     ```typescript
     import "styled-components";

     declare module "styled-components" {
       export interface DefaultTheme {
         textColor: string;
         bgColor: string;
         accentColor: string;
       }
     }
     ```

  2. theme.ts : 여러 theme 정의

     ```typescript
     import { DefaultTheme } from "styled-components";

     export const theme: DefaultTheme = {
       bgColor: "#2f3640",
       textColor: "#f5f6fa",
       accentColor: "#44bd32",
     };
     ```

  3. index.ts : theme 적용

     ```typescript
     import React from "react";
     import ReactDOM from "react-dom";
     import { ThemeProvider } from "styled-components";
     import App from "./App";
     import { theme } from "./theme";

     ReactDOM.render(
       <React.StrictMode>
         <ThemeProvider theme={theme}>
           <App />
         </ThemeProvider>
       </React.StrictMode>,
       document.getElementById("root")
     );
     ```

- reset css : https://github.com/zacanger/styled-reset/blob/master/src/index.ts

  ```typescript
  import { createGlobalStyle } from "styled-components";
  import Router from "./Router";

  function App() {
    return (
      <>
        <GlobalStyle />
        <Router />
      </>
    );
  }

  export default App;

  const GlobalStyle = createGlobalStyle`
    /* google font */
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
    /* google font */
  
    /* google font, theme */
    body {
      background-color: ${(props) => props.theme.bgColor};
      color: ${(props) => props.theme.textColor};
      font-family: 'Source Sans Pro', sans-serif;
    }
    /* google font, theme */
  
    /* reset css */
    /* ~~~~~~~~~ */
    /* ~~~~~~~~~ */
    /* ~~~~~~~~~ */
    /* reset css */
  `;
  ```
