# TypeScript

- interface : 객체의 모양을 정의

  ```typescript
  interface ContainerProps {
    bgColor: string;
    borderColor: string;
  }
  const Container = styled.div<ContainerProps>`
    background-color: ${(props) => props.bgColor};
    border: 3px solid ${(props) => props.borderColor};
    width: 100px;
    height: 100px;
    border-radius: 50px;
  `;

  interface CircleProps {
    bgColor: string;
    borderColor?: string; // string | undefined
    text?: string;
  }
  function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
    return (
      <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
        {text}
      </Container>
    );
  }
  ```

- event

  ```typescript
  function App() {
    const [userName, setUserName] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = event;
      setUserName(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    };
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            value={userName}
            type="text"
            placeholder="userName"
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
  ```
