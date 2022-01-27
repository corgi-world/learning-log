import styled from "styled-components";

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

export default Circle;
