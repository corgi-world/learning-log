# trello

## React.memo

```typescript
// export default DraggableCard;

export default React.memo(DraggableCard);
```

- React는 부모의 state가 변경되면 모든 자식 컴포넌트를 rerender한다.
- React.memo로 컴포넌트를 감싸면 해당 컴포넌트는 props가 변경되었을 때만 rerender된다.
- 그럼 세상 모든 컴포넌트를 React.memo로 감싸면?
  - props가 변경되었는지 확인하기 위하여 prev와 current를 얕은 비교한다.
  - props가 거의 매번 변경되는 경우 비교하는 시간이 오히려 낭비가 될 수 있다.

## 객체 set state

- 배열 앞에 추가하기

  ```typescript
  setTodos((prev) => [{ text: data.todo, id: Date.now(), category }, ...prev]);
  ```

- 배열 중간에 삽입하기

  ```typescript
  setTodos((prev) => {
    const targetIndex = prev.findIndex((obj) => obj.id === todo.id);
    const newTodo = { text: todo.text, id: todo.id, category: newCategory };

    const front = prev.slice(0, targetIndex);
    const back = prev.slice(targetIndex + 1);

    return [...front, newTodo, ...back];
  });
  ```

- 배열 요소 순서 변경하기

  ```typescript
  setTodos((prev) => {
    const copy = [...prev];
    copy.splice(source.index, 1);
    copy.splice(destination?.index, 0, draggableId);
    return copy;
  });
  ```

- 객체 요소 교체하기

  ```typescript
  return {
    ...prev,
    [source.droppableId]: copy,
  };
  ```

## useRef

- HTML Element를 가져와 제어할 수 있다.

  ```typescript
  function App() {
    const inputRef = useRef<HTMLInputElement>(null);
    const onClick = () => {
      inputRef.current?.focus();
    };
    return (
      <div>
        <input ref={inputRef} />
        <button onClick={onClick}>click</button>
      </div>
    );
  }
  ```
