## 컴포넌트의 역할

```
컴포넌트는 컴포넌트만 똑 떼서 어느 곳에서도 재사용 가능해야 한다.

따라서 모든 컴포넌트는 최소한의 역할만을 맡아야 하고
컴포넌트 간의 데이터 교류 및 컴포넌트 내에서 데이터 수정은 절대 금지!

데이터 수정은 각 컴포넌트를 관리하는 상위 컴포넌트에서 일괄적으로 수행한다.
```

- 처음 짠 코드

  - App에서 관리하는 data의 참조를 TodoList에서 받아 이를 수정하였다.
  - 컴포넌트가 많아지면 data를 수정하는 곳이 늘어나 변화를 추적하는 것이 매우 어려워진다.

    ```javascript
    export default function App() {
      this.data = [];
      new TodoList(data);
    }
    ```

    ```javascript
    export default function TodoList(data) {
      this.buttonAdd.addEventListener("click", function (event) {
        const todoText = this.$input.value;
        data.push({ todoText });
      });
    }
    ```

- 코드 리뷰 후 수정한 코드

  - TodoList는 동작을 전달받아 이를 실행한다.
  - data 수정은 상위 컴포넌트인 App에서 일괄적으로 수행한다.

    ```javascript
    export default function App() {
      this.data = [];
      new TodoList({
        onAddClicked: ({ todoText }) => {
          this.data.push({ todoText });
        },
      });
    }
    ```

    ```javascript
    export default function TodoList({ onAddClicked }) {
      this.buttonAdd.addEventListener("click", function (event) {
        const todoText = this.$input.value;
        onAddClicked({ todoText });
      });
    }
    ```

## localStorage와 JSON.parse

```
악의적인 목적으로 브라우저를 임의로 조작하여 localStorage값을 변경할 수 있다.

따라서 localStorage와 JSON.parse을 사용할 땐 에러 처리를 필수로!
```

```javascript
/* storage.js */

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    alert("");
  }
};

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  } catch (e) {
    alert("");
    setItem(key, defaultValue);
    return defaultValue;
  }
};
```

## 이벤트의 흐름과 버블링 그리고 위임

```html
<ul>
  <li>할 일 1 <button>완료</button><button>삭제</button></li>
  <li>할 일 2 <button>완료</button><button>삭제</button></li>
  <li>할 일 3 <button>완료</button><button>삭제</button></li>
  <!-- 동적 추가 -->
</ul>
```

```
처음에는 동적으로 추가되는 li의 하위 button 2개 씩을 모두 불러와 클릭 이벤트를 걸어주었다.
이렇게 할 경우 코드가 길어지고 복잡해지게 되는데, 부모 요소인 ul에 이벤트를 위임함으로써 해결할 수 있다.

계층적 구조의 HTML 요소는
자식 요소에서 발생한 이벤트가 부모 요소로 전파되며, 이것을 '이벤트 버블링'이라고 한다.

즉, '이벤트 버블링'에 의해 자식 요소인 li에서 발생한 이벤트는 부모 요소인 ul로 전파되기 때문에
부모 요소인 ul에만 이벤트를 거는 것으로도 동일한 결과를 낼 수 있다.
```

```javascript
this.$ul.addEventListener("click", function (event) {
  const { nodeName } = event.target;
  if (nodeName === "BUTTON") {
    const [type, id] = event.target.id.split("_");
    if (type === "status") {
      onStatusChange(+id);
    } else if (type === "delete") {
      onDelete(+id);
    }
  }
});
```

_참고 : https://poiemaweb.com/js-event_

## 이벤트 속 element 찾기

- event.target vs event.currentTarget

  - .target : 실제로 이벤트가 발생한 요소
  - .currentTarget : 이벤트를 등록한 요소

    ```html
    <ul>
      <li></li>
      <li></li>
    </ul>
    ```

    ```javascript
    $ul.addEventListener("click", function (event) {
      /* li 클릭 시 */
      console.log(event.target); // li
      console.log(event.currentTarget); // ul

      /* ul 클릭 시 */
      console.log(event.target); // ul
      console.log(event.currentTarget); // ul
    });
    ```

- event.closest(selectors) : 자신부터 부모 요소로 출발하여 선택자의 조건에 만족한 요소 중 가장 가까운 요소를 반환한다.

  - ul과 li사이를 교묘하게 잘 클릭해보면 ul을 직접 클릭할 수 있다.

    ```html
    <ul>
      <li></li>
      <li></li>
    </ul>
    ```

    ```javascript
    $ul.addEventListener("click", function (event) {
      const target = event.target;
      /* li 클릭 시 */
      console.log(target); // li
      console.log(target.closest("li")); // li

      /* ul 클릭 시 */
      console.log(target); // ul
      console.log(target.textContent); // 의도치 않은 결과
      console.log(target.closest("li")); // null

      // null 체크 가능!!
      if (target.closest("li")) {
        console.log(target.closest("li").textContent);
      }
    });
    ```

- data-\*, dataset

```html
<ul>
  <li data-name="msw" data-hellomsw="abcd">msw</li>
  <li data-name="hello" data-hellomsw="1234">hello</li>
  <li data-name="world" data-hellomsw="5678">world</li>
  <li data-name="html" data-hellomsw="qwer">html</li>
</ul>
```

```javascript
$ul.addEventListener("click", function (event) {
  const ds = event.target.dataset;
  console.log(ds.name);
  console.log(ds.hellomsw);
});
```

## debounce

- 어떠한 처리도 없이 호출되는 keyup 이벤트를 모두 찍어보면 아래와 같다.

  ```javascript
  $input.addEventListener("keyup", (e) => {
    const text = e.target.value;
    console.log(text);
    /*
    ㅁ
    무
    문
    문서
    문성
    문성우
    문성운
    */
  });
  ```

- 만약 keyup 이벤트에서 유저의 입력을 key로 사용하여 api를 호출해야 한다면, 위의 예시처럼 불필요한 호출이 발생한다.

- 일정 시간동안 타이머를 설정하여 해당 시간내에 입력이 발생하면 타이머를 취소하고 새로 타이머를 설정하고, 입력이 발생하지 않으면 타이머가 실행되게 한다.

- 이러한 방법으로 위의 문제를 해결할 수 있는데, 이것을 _debounce_ 이라고 한다.

  ```javascript
  let timer = null;
  $input.addEventListener("keyup", (e) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      const text = e.target.value;
      console.log(text);
    }, 300);
  });
  ```

- 정리

  ```javascript
  const debounceHandler = debounce(function (event) {
    const text = event.target.value;
    console.log(text);
  }, 300);

  $input.addEventListener("keyup", debounceHandler);

  function debounce(action, delay = 300) {
    let timer = null;
    return function (event) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        action(event);
      }, delay);
    };
  }
  ```

## 실수 되짚기

- 이벤트가 중복 호출됩니다!

  - li 개수가 늘어날 수록 ul에 걸어둔 이벤트가 중복 호출되는 문제가 발생했다.
  - 도대체 원인을 알 수가 없어서 `event.stopImmediatePropagation();` 로 이벤트 전파를 막아 해결한 뒤 제출하였다.
  - pull request에 위의 내용을 상세히 작성했는데, 다른 분께서 render에서 중복 등록되는 것 같다고 지적해 주셨다. ~~정말 감사하면서도 부끄러웠음ㅜㅜ~~
  - 사실 이런 실수는 할 수도 있는데, 이걸 왜 스스로 못 찾았는지...

    ```javascript
    this.render = () => {
      const htmlString = `${this.state.map((history) => `<li>${history}</li>`).join("")}`;

      document.querySelector($target).innerHTML = htmlString;
      document.querySelector($target).addEventListener("click", function (event) {
        // event.stopImmediatePropagation();
        console.log(event.target.textContent);
      });
    };
    ```

- 직관적인 변수명 짓기

  - 스코프가 좁은 지역변수 명은 대충 짓는 습관이 있었다.

  - 전혀 의식하지 못하고 있었는데, 많은 분들께서 아래와 같은 변수명 때문에 코드 읽기가 힘들다고 말씀해 주셨다.

    ```javascript
    const r = fetch("/getUsers");
    onDataLoad(r);

    /* 이렇게 해보자! */
    const userList = fetch("/getUsers");
    onDataLoad(userList);
    ```

  - 함수에 변수로 숫자 값 넣을 때, 숫자만 넣는 것보다는~

    ```javascript
    function delayFunction(delay) {
      /* ... */
    }

    delayFunction(300); // 이렇게 하지 말고

    const delay = 300;
    delayFunction(delay); // 이렇게 하거나

    delayFunction({ delay: 300 }); // 이렇게 하는게 좋다고 해주셨다!
    ```

- HTML 태그는 아무거나 쓰지 마라.

  - Loader 컴포넌트를 만들 때 아무 생각 없이 굵은 글씨면 좋겠다는 생각이 들어서...

    ```javascript
    return "<h1>불러오는 중...</h1>";
    ```

  - 웹 접근성과 SEO를 위해 태그의 의미를 항상 생각하며 사용하자!
