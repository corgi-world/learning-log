# ES6 함수의 추가 기능

- 함수의 구분

  ```javascript
  var foo = function () {
    return 1;
  };

  // 일반적인 함수로서 호출
  foo();

  // 생성자 함수로서 호출
  new foo();

  // 메서드로서 호출
  var obj = { foo };
  obj.foo();
  ```

- ES6 이전의 모든 함수는 일반 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있다. 즉, ES6 이전의 모든 함수는 callable이면서 constructor이다.

  - 함수가 constructor라는 것은 prototype 프로퍼티를 가지며, 프로토타입 객체를 생성한다는 것을 의미한다.
  - 이는 혼란스러우며 실수를 유발할 가능성이 있고 성능에도 좋지 않다.

- ES6 메서드

  - 메서드 축약 표현으로 정의된 함수만을 의미한다.

    ```javascript
    const obj = {
      x: 1,
      // foo는 메서드다.
      foo() {
        return this.x;
      },
      // bar에 바인딩된 함수는 메서드가 아닌 일반 함수다.
      bar: function () {
        return this.x;
      },
    };
    ```

  - 인스턴스를 생성할 수 없는 non-constructor다.
  - prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.
  - 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 갖는다.

- 화살표 함수

  - 함수 선언문으로 정의할 수 없고 함수 표현식으로 정의해야 한다.

    ```javascript
    const multiply = (x, y) => x * y;
    ```

  - 인스턴스를 생성할 수 없는 non-constructor다.
  - prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.
  - 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않고 스코프 체인을 통해 상위 스코프를 참조한다.

- 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다. 이를 lexical this라 한다.

  ```javascript
  class Prefixer {
    constructor(prefix) {
      this.prefix = prefix;
    }

    add(arr) {
      console.log(this); // Prefixer { prefix: '-webkit-' }

      // map메서드가 콜백 함수를 일반 함수로서 호출한다.
      return arr.map(function (item) {
        console.log(this); // undefined
        return this.prefix + item;
      });
    }
  }
  const prefixer = new Prefixer("-webkit-");
  prefixer.add(["transition", "user-select"]);
  ```

  ```javascript
  class Prefixer {
    constructor(prefix) {
      this.prefix = prefix;
    }

    add(arr) {
      console.log(this); // Prefixer { prefix: '-webkit-' }

      // 화살표 함수 사용
      return arr.map((item) => {
        console.log(this); // Prefixer { prefix: '-webkit-' }
        return this.prefix + item;
      });
    }
  }
  const prefixer = new Prefixer("-webkit-");
  prefixer.add(["transition", "user-select"]);
  ```

  - 화살표 함수가 중첩되어 있다면 스코프 체인상 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this를 참조한다.
  - 자체의 this 바인딩을 갖지 않기 때문에 call, apply, bind 메서드를 사용해도 화살표 함수 내부의 this를 교체할 수 없다.

- 화살표 함수는 함수 자체의 super 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 super를 참조하면 this와 마찬가지로 상위 스코프의 super를 참조한다.

  ```javascript
  class Base {
    constructor(name) {
      this.name = name;
    }
    sayHi() {
      return `Hi! ${this.name}`;
    }
  }
  class Derived extends Base {
    sayHi = () => `${super.sayHi()} how are you doing?`;
  }

  const derived = new Derived("msw");
  console.log(derived.sayHi());
  ```

- 화살표 함수는 함수 자체의 arguments 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 arguments를 참조하면 this와 마찬가지로 상위 스코프의 arguments를 참조한다.

  - 자체 arguments 객체를 갖지 않기 대문에 가변 인자 함수를 구현하려면 Rest 파라미터를 사용해야 한다.

- Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.

  ```javascript
  function foo(...rest) {
    console.log(rest); // [ 1, 2, 3, 4, 5 ]
  }
  foo(1, 2, 3, 4, 5);
  ```

  ```javascript
  function foo(param1, param2, ...rest) {
    console.log(param1); // 1
    console.log(param2); // 2
    console.log(rest); // [3, 4, 5]
  }
  foo(1, 2, 3, 4, 5);
  ```

  - 먼저 선언된 매개변수에 할당된 인수를 제외한 나머지 인수들로 구성된 배열이 할당되기 때문에 Rest 파라미터는 반드시 마지막 파라미터이어야 한다.

- 매개변수에 인수를 전달하지 않은 경우와 undefined를 전달한 경우 기본값을 할당받아 사용할 수 있다.

  ```javascript
  function sum(x = 0, y = 0) {
    console.log(x, y);
    return x + y;
  }
  sum(1, 2); // 1 2
  sum(1); // 1 0
  sum(); // 0 0
  sum(undefined, undefined); // 0 0
  ```
