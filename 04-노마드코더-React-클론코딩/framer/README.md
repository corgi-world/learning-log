## framer-motion

- https://www.framer.com/motion/

- Setting

  ```typescript
  import { createGlobalStyle } from "styled-components";
  import { motion } from "framer-motion";
  import styled from "styled-components";

  const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `;

  const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  `;

  function App() {
    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <Box
            initial={{ scale: 0 }}
            transition={{ duration: 1, type: "spring" }}
            animate={{ scale: 1, rotateZ: 360 }}
          />
        </Wrapper>
      </>
    );
  }
  /* 
  transition={{
      default: { duration: 1 },
      scale: { duration: 2, delay: 3 },
      rotateZ: { duration: 2, delay: 1 },
  }}
  */
  ```

- Variants

  ```typescript
  const vars = {
    start: {
      scale: 0,
    },
    end: {
      scale: 1,
      rotateZ: 360,
      transition: { duration: 1, type: "spring" },
    },
  };

  function App() {
    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <Box variants={vars} initial="start" animate="end" />
        </Wrapper>
      </>
    );
  }
  ```

  ```typescript
  const boxVars = {
    start: {
      opacity: 0,
      scale: 0.5,
    },
    end: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 5,
        delayChildren: 0.5,
        staggerChildren: 0.5, // 자식 컴포넌트에 0.5 [*1, *2, *3...]
      },
    },
  };
  const cirVars = {
    start: { opacity: 0, y: 10 },
    end: { opacity: 1, y: 0 },
  };

  function App() {
    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <Box variants={boxVars} initial="start" animate="end">
            <Circle variants={cirVars} />
            <Circle variants={cirVars} />
            <Circle variants={cirVars} />
            <Circle variants={cirVars} />
          </Box>
        </Wrapper>
      </>
    );
  }
  ```

- Gestures

  ```typescript
  const boxVars = {
    hover: { scale: 1.5, rotateZ: 45 },
    click: { scale: 1, borderRadius: "100%" },
  };

  function App() {
    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <Box
            variants={boxVars}
            whileHover={true ? "hover" : "hover"}
            whileTap={"click"}
          />
        </Wrapper>
      </>
    );
  }
  ```

- Drag

  ```typescript
  const boxVars = {
    drag: {
      backgroundColor: "rgb(46, 204, 113)",
      transition: { duration: 5 },
    },
  };

  function App() {
    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <Box variants={boxVars} drag whileDrag={"drag"} />
        </Wrapper>
      </>
    );
  }
  ```

  ```typescript
  function App() {
    const biggerBoxRef = useRef<HTMLDivElement>(null);
    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <BiggerBox ref={biggerBoxRef}>
            <Box
              drag
              variants={boxVars}
              dragConstraints={biggerBoxRef}
              dragSnapToOrigin
            />
          </BiggerBox>
        </Wrapper>
      </>
    );
  }
  ```

- MotionValue

  ```typescript
  function App() {
    // 변경 되어도 rerender되지 않는다.
    const x = useMotionValue(0);
    useEffect(() => {
      x.onChange(() => console.log(x.get()));
    }, []);
    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <Box style={{ x }} drag="x" dragSnapToOrigin />
        </Wrapper>
      </>
    );
  }
  ```

  ```typescript
  function App() {
    const x = useMotionValue(0);
    const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
    useEffect(() => {
      scale.onChange(() => console.log(scale.get()));
    }, []);
    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <Box style={{ x, scale }} drag="x" dragSnapToOrigin />
        </Wrapper>
      </>
    );
  }
  ```

- useViewportScroll

  ```typescript
  function App() {
    const { scrollY, scrollYProgress } = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [0, 3]);
    useEffect(() => {
      scrollY.onChange(() => {
        console.log(scrollY.get(), scrollYProgress.get());
      });
    }, []);
    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <Box style={{ scale }} />
        </Wrapper>
      </>
    );
  }
  ```

- AnimatePresence

  ```typescript
  const boxVars = {
    start: {
      opacity: 0,
      scale: 0,
    },
    visible: { opacity: 1, scale: 1, rotateZ: 360 },
    leaving: {
      opacity: 0,
      y: 20,
    },
  };

  function App() {
    const [showing, setShowing] = useState(false);
    const toggle = () => setShowing((prev) => !prev);
    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <AnimatePresence>
            {/* 내부 컴포넌트가 사라지고 나타날 때 애니메이션 */}
            {showing ? (
              <Box variants={boxVars} initial="start" animate="visible" exit="leaving" />
            ) : null}
          </AnimatePresence>
          <button onClick={toggle}>Click</button>
        </Wrapper>
      </>
    );
  }
  ```

- Custom

  ```typescript
  const boxVars = {
    start: (isBack: boolean) => {
      return { opacity: 0, scale: 0, x: isBack ? -500 : 500 };
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    leaving: (isBack: boolean) => {
      return {
        opacity: 0,
        scale: 0,
        x: isBack ? 500 : -500,
        transition: { duration: 0.5 },
      };
    },
  };
  ```

  ```typescript
  <AnimatePresence custom={isBack}>
    <Box
      custom={isBack}
      key={visibleIndex}
      variants={boxVars}
      initial="start"
      animate="visible"
      exit="leaving"
    >
      {visibleIndex}
    </Box>
  </AnimatePresence>
  ```

- Layout

  ```typescript
  function App() {
    const [clicked, setClicked] = useState(false);
    const toggle = () => setClicked((prev) => !prev);
    return (
      <>
        <GlobalStyle />
        <Wrapper onClick={toggle}>
          <Box
            style={{
              justifyContent: clicked ? "center" : "flex-start",
              alignItems: clicked ? "center" : "flex-start",
            }}
          >
            <Circle layout />
          </Box>
        </Wrapper>
      </>
    );
  }
  ```

  ```typescript
  function App() {
    const [clicked, setClicked] = useState(false);
    const toggle = () => setClicked((prev) => !prev);
    return (
      <>
        <GlobalStyle />
        <Wrapper onClick={toggle}>
          <Box>{clicked ? <Circle layoutId="hello" /> : null}</Box>
          <Box>
            {clicked ? null : (
              <Circle
                layoutId="hello"
                style={{ scale: 2 }}
                transition={{ duration: 5 }}
              />
            )}
          </Box>
        </Wrapper>
      </>
    );
  }
  ```

## 컴포넌트와 key

- react는 key가 다르면 다른 컴포넌트라고 인식하기 때문에 아래 두 코드는 동일하게 동작한다.

  ```typescript
  {
    [1, 2, 3, 4, 5, 6, 7, 8].map((i) =>
      i === visibleIndex ? (
        <Box key={i} variants={boxVars} initial="start" animate="visible" exit="leaving">
          {i}
        </Box>
      ) : null
    );
  }
  ```

  ```typescript
  <Box
    key={visibleIndex}
    variants={boxVars}
    initial="start"
    animate="visible"
    exit="leaving"
  >
    {visibleIndex}
  </Box>
  ```
