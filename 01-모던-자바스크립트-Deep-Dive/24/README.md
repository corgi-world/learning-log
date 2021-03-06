# 클로저

- 자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를 결정한다. 이를 **렉시컬(정적) 스코프**라 한다.

  ```javascript
  const x = 1;
  function outerFunc() {
    const x = 10;
    function innerFunc() {
      console.log(x); // 10
    }
    innerFunc();
  }
  outerFunc();
  ```

  ```javascript
  const x = 1;
  function outerFunc() {
    const x = 10;
    innerFunc();
  }
  function innerFunc() {
    console.log(x); // 1
  }
  outerFunc();
  ```

- 렉시컬 스코프가 가능하려면 함수는 호출되는 환경과 상관없이 정의된 환경을 기억할 수 있어야 한다. 따라서 함수는 자신의 내부 슬롯 [[Environment]]에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다.

  - 상위 스코프의 참조는 현재 실행 중인 실행 컨텍스트의 렉시컬 환경을 가리킨다. 왜냐하면 함수 정의가 평가되어 함수 객체를 생성하는 시점은 함수가 정의된 환경, 즉 상위 함수가 평가 또는 실행되고 있는 시점이며, 이때 현재 실행 중인 실행 컨텍스트는 상위 함수의 실행 컨텍스트이기 때문이다.

- 클로저와 렉시컬 환경

  ```javascript
  const x = 1;
  function outerFunc() {
    const x = 10;
    function innerFunc() {
      console.log(x); // 10
    }
    return innerFunc;
  }

  const innerFunc = outerFunc();
  innerFunc();
  ```

  - outer 함수의 실행이 종료되면 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거된다. 따라서 outer 함수와 지역 변수 x는 생명 주기를 마감한다. 그러나 실행 결과는 outer 함수의 지역 변수 x의 값인 10이다.

  - inner 함수는 자신이 평가될 때 자신이 정의된 위치에 의해 결정된 상위 스코프를 [[Environment]] 내부 슬롯에 저장한다.

  - outer 함수의 생명 주기가 종료될 때 실행 컨텍스트는 스택에서 제거되지만 outer 함수의 렉시컬 환경은 inner 함수의 내부 슬롯에 의해 참조되고 있기 때문에 inner 함수가 존재하는 한 유지된다.

  - 이처럼 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 **클로저**라고 부른다.

- 클로저는 상태를 안전하게 변경하고 유지하기 위해 사용한다.

  ```javascript
  let num = 0;
  // 카운트의 상태는 전역 변수를 통해 관리되고 있기 때문에
  // 누구나 언제든지 접근하여 변경할 수 있다.

  const increase = function () {
    return ++num;
  };
  ```

  - 클로저를 만드는 다양한 방법들

    ```javascript
    const increase = (function () {
      let num = 0;
      return function () {
        return ++num;
      };
    })();
    ```

    ```javascript
    const counter = (function () {
      let num = 0;
      return {
        increase() {
          return ++num;
        },
        decrease() {
          return --num;
        },
      };
    })();
    console.log(counter.increase());
    console.log(counter.decrease());
    ```

    ```javascript
    const Counter = (function () {
      let num = 0;
      function Counter() {}
      Counter.prototype.increase = function () {
        return ++num;
      };
      Counter.prototype.decrease = function () {
        return --num;
      };
      return Counter;
    })();
    const counter = new Counter();
    console.log(counter.increase());
    console.log(counter.decrease());
    ```

    ```javascript
    function increase(n) {
      return ++n;
    }
    function decrease(n) {
      return --n;
    }
    function makeCounter(predicate) {
      let counter = 0;
      return function () {
        counter = predicate(counter);
        return counter;
      };
    }
    const increaser = makeCounter(increase);
    // makeCounter의 실행 컨텍스트는 여기서 생성되었다가 소멸된다.
    const decreaser = makeCounter(decrease);
    // makeCounter의 새로운 실행 컨텍스트가 생성되었다가 소멸된다.

    // 따라서 increaser와 decreaser는
    // 각각의 내부 슬롯으로 서로 다른 상위 스코프를 참조하고 있다.

    // 이렇게 두 함수는 자신만의 독립된 렉시컬 환경을 갖기 때문에
    // 카운트를 유지하기 위한 자유 변수인 counter를 공유하지 못하는 것이다.

    console.log(increaser()); // 1
    console.log(decreaser()); // -1
    ```

    ```javascript
    function increase(n) {
      return ++n;
    }
    function decrease(n) {
      return --n;
    }
    const counter = (function () {
      let counter = 0;
      return function (predicate) {
        counter = predicate(counter);
        return counter;
      };
    })();
    console.log(counter(increase)); // 1
    console.log(counter(decrease)); // 0
    ```

- **캡슐화**는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다. 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 **정보 은닉**이라 한다.

  - js는 private한 변수를 만들 수 있을까?

    ```javascript
    function Person(name, age) {
      this.name = name;
      let _age = age;
      this.sayHello = function () {
        console.log(`I am ${this.name}. ${_age}.`);
      };
    }
    const me = new Person("msw", "20");
    me.sayHello();
    ```

    - \_age 변수는 Person 생성자 함수 외부에서 참조하거나 변경할 수 없다. 즉, private하다.

    - 하지만 sayHello 메서드는 Person 객체가 생성될 때마다 중복 생성된다.

    ```javascript
    function Person(name, age) {
      this.name = name;
      let _age = age;
    }
    Person.prototype.sayHello = function () {
      console.log(`I am ${this.name}. ${_age}.`);
      // _age를 참조할 수 없다.
    };
    ```

    - sayHello를 프로토타입 메서드로 변경하면 메서드 중복 생성 문제를 해결할 수 있다.

    - 하지만 프로토타입 메서드에서는 \_age를 참조할 수 없게 된다.

    ```javascript
    const Person = (function () {
      let _age = 0;
      function Person(name, age) {
        this.name = name;
        _age = age;
      }
      Person.prototype.sayHello = function () {
        console.log(`I am ${this.name}. ${_age}.`);
      };
      return Person;
    })();

    const mee = new Person("mee", "20");
    mee.sayHello(); // 20
    const you = new Person("you", "30");
    you.sayHello(); // 30
    mee.sayHello(); // 30
    ```

    - `Person.prototype.sayHello`는 즉시 실행 함수가 호출될 때 단 한 번만 생성된다.

    - 이때 메서드는 자신의 상위 스코프인 즉시 실행 함수의 실행 컨텍스트의 렉시컬 환경의 참조를 내부 슬롯 [[Environment]]에 저장한다.

    - 따라서 메서드를 각기 다른 인스턴스로 호출하더라도 하나의 동일한 상위 스코프를 사용하게 된다.

    - 이처럼 js는 정보 은닉을 완전하게 지원하지 않는다. 하지만 21년 1월에 클래스에 private 필드를 정의할 수 있는 새로운 표준 사양이 제안되었다. (다음장 클래스를 공부합시다?!)
