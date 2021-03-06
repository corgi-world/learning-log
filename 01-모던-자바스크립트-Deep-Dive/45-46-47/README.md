# 프로미스

- 콜백 함수의 단점

  - 콜백 함수를 통해 비동기 처리 결과에 대한 후속 처리를 수행하는 비동기 함수가 비동기 처리 결과를 가지고 또다시 비동기 함수를 호출해야 한다면 콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상이 발생하는데, 이를 **콜백 헬**이라 한다.

    ```javascript
    get("step1", (a) => {
      get(`step2/${a}`, (b) => {
        get(`step2/${b}`, (c) => {
          get(`step2/${c}`, (d) => {
            console.log(d);
          });
        });
      });
    });
    ```

  - 아래의 setTimeout 함수는 비동기 함수이므로 콜백 함수가 호출되는 것을 기다리지 않고 즉시 종료되어 콜 스택에서 제거된다. 이후 타이머가 만료되면 콜백 함수는 태스크 큐로 푸시되고 콜백 스택이 비어졌을 때 이벤트 루프에 의해 콜 스택으로 푸시되어 실행된다. 즉, 콜백 함수를 호출한 것은 setTimeout 함수가 아니다. 따라서 콜백 함수가 발생시킨 에러는 catch 블록에서 캐치되지 않는다.

    ```javascript
    try {
      setTimeout(() => {
        throw new Error("Error");
      }, 1000);
    } catch (e) {
      // 에러를 캐치하지 못한다.
      console.error("캐치한 에러", e);
    }
    ```

- 프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체다. 프로미스는 전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현할 수 있다는 장점이 있다.

  ```javascript
  new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("Hello~");
      // reject("Hello~");
    }, 1000);
  })
    .then(function (result) {
      console.log("resolve", result);
    })
    .catch(function (error) {
      console.log("reject", error);
    });
  ```

  ```javascript
  function job1() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve("job1 OK");
        // reject("job1 ERROR");
      }, 1000);
    });
  }

  function job2() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve("job2 OK");
        // reject("job2 ERROR");
      }, 3000);
    });
  }

  job1()
    .then(function (result) {
      console.log(result);
      return job2();
    })
    .then(function (result) {
      console.log(result);
    })
    .catch(function (error) {
      console.log(error);
    });
  ```

- 프로미스의 후속 처리 메서드의 콜백 함수가 일시 저장되는 **마이크로태스크 큐**는 태스크 큐보다 우선순위가 높다. 따라서 이벤트 루프는 콜 스택이 비면 먼저 마이크로태스크 큐를 확인하고 이후 태스크 큐를 확인한다.

- fetch 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환한다.

  ```javascript
  fetch(url)
    .then((response) => response.json())
    .then((todos) => console.log(todos))
    .catch((error) => console.error(err));
  ```

# 제너레이터와 async/await

- 제너레이터는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수다.

  1. 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
  2. 함수 호출자와 함수의 상태를 주고받을 수 있다.
  3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.

  - 제너레이터 객체의 next 메서드를 호출하면 yield 표현식까지 실행되고 일시 중지된다. 이때 함수의 제어권이 호출자로 양도된다.

    ```javascript
    function* getFunc() {
      console.log("Hello 1");
      yield 1;

      console.log("Hello 2");
      yield 2;

      console.log("Hello 3");
      yield 3;

      console.log("Hello 4");
    }

    const g = getFunc();
    console.log(g.next());
    console.log(g.next());
    console.log(g.next());
    console.log(g.next());

    /*
    Hello 1
    { value: 1, done: false }
    Hello 2
    { value: 2, done: false }
    Hello 3
    { value: 3, done: false }
    Hello 4
    { value: undefined, done: true }
    */
    ```

- async/await

  ```javascript
  async function foo() {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  foo();
  ```

# 에러 처리

- 에러는 호출자 방향으로 전파된다. 즉, 콜 스택의 아래 방향으로 전파된다.
