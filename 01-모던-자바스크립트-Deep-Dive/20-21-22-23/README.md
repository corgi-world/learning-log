# strict mode

- 암묵적 전역

  ```javascript
  // 2. 함수의 상위인 전역 스코프에서 x 변수의 선언을 검색
  function foo() {
    // 1. 함수 스코프에서 x 변수의 선언을 검색

    // 3. x 변수가 선언되지 않았으므로 ReferenceError가 발생할 것 같지만
    // 4. 자바스크립트 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성한다.
    x = 10;
  }
  foo();

  console.log(x); // 10
  ```

- strict mode(엄격 모드) : 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 **명시적인 에러를 발생**시킨다.

- strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

  - 전역에 적용했을 시 문제점 : 사용중인 외부 서드파티 라이브러리가 non-strict mode일 경우 문제가 발생할 수 있다.

  - 함수 단위로 적용했을 시 문제점 : 일관성 없게 일부 함수에만 적용하는 것은 바람직하지 않으며 모든 함수에 적용하는 것은 번거로운 일이다. 또 함수가 참조할 함수 외부 컨텍스트에 strict mode를 적용하지 않는다면 문제가 발생할 수 있다.

  ```javascript
  (function () {
    "use strict";

    // Do something;
  })();
  ```

- strict mode가 발생시키는 에러

  - 암묵적 전역

    ```javascript
    (function () {
      "use strict";

      x = 1;
      console.log(x); // ReferenceError
    })();
    ```

  - 변수, 함수, 매개변수 삭제

    ```javascript
    (function () {
      "use strict";

      var x = 1;
      delete x; // SyntaxError

      function foo(a) {
        delete a; // SyntaxError
      }

      delete foo; // SyntaxError
    })();
    ```

  - 매개변수 이름의 중복

    ```javascript
    (function () {
      "use strict";

      // SyntaxError
      function foo(x, x) {}
    })();
    ```

- strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다. 이때 에러는 발생하지 않는다.

  ```javascript
  (function () {
    "use strict";

    function foo() {
      console.log(this);
    }
    foo(); // undefined
    new foo(); // foo { }
  })();
  ```

- strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.

  ```javascript
  (function (a) {
    "use strict";

    a = 2;

    console.log(arguments); // [Arguments] { '0': 1 }
    console.log(a); // 2
  })(1);
  ```

# 빌트인 객체

- 자바스크립트 객체는 다음과 같이 3개의 객체로 분류할 수 있다.

  - 표준 빌트인 객체 : ECMAScript 사양에 정의된 객체이므로 자바스크립트 실행 환경(브라우저, Node.js)과 관계없이 언제나 사용할 수 있다. 표준 빌트인 객체는 전역 객체의 프로퍼티로서 제공되므로 별도의 선언 없이 전역 변수처럼 언제나 참조할 수 있다.
  - 호스트 객체 : ECMAScript 사양에 정의되어 있지 않지만 자바스크립트 실행 환경에서 추가로 제공되는 객체를 말한다.
  - 사용자 정의 객체 : 표준 빌트인 객체와 호스트 객체처럼 기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체를 말한다.

- 표준 빌트인 객체

  - 자바스크립트는 Object, String, Number, Boolean, Symbol, Date, Math, RegExp, Array, Map/Set, WeakMap/WeakSet, Function, Promise, Reflect, Proxy, JSON, Error 등 40여개의 표준 빌트인 객체를 제공한다.

  - 생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체다.

    ```javascript
    // String 생성자 함수에 의한 String 객체 생성
    const strObj = new String("Lee");

    // String 생성자 함수를 통해 생성한 strObj 객체의 프로토타입은 String.Prototype이다.
    console.log(Object.getPrototypeOf(strObj) === String.prototype); // true
    ```

  - 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체는 다양한 기능의 빌트인 프로토타입 메서드를 제공한다. 그리고 표준 빌트인 객체는 인스턴스 없이도 호출 가능한 빌트인 정적 메서드를 제공한다.

    ```javascript
    const numObj = new Number(1.5);

    // toFixed는 Number.prototype의 프로토타입 메서드다.
    console.log(numObj.toFixed());

    // isInteger는 Number의 정적 메서드다.
    console.log(Number.isInteger(0.5));
    ```

- 원시값과 래퍼 객체

  - 원시값인 문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 자바스크립트 엔진은 암묵적으로 연관된 객체를 생성하여 객체 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌린다. 이 때 생성되는 임시 객체를 래퍼 객체라 한다.

  - 문자열에 대해 마침표 표기법으로 접근하면 그 순간 래퍼 객체인 String 생성자 함수의 인스턴스가 생성되고 문자열은 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다. 이 때 문자열 래퍼 객체인 String 생성자 함수의 인스턴스는 String.prototype의 메서드를 상속받아 사용할 수 있다.

    ```javascript
    const str = "hi";

    // 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환된다.
    console.log(str.length); // 2
    console.log(str.toUpperCase()); // HI

    // 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시값으로 되돌린다.
    console.log(typeof str); // string
    ```

    ```javascript
    // 1. 식별자 str은 문자열을 값으로 가지고 있다.
    const str = "hello";

    // 2. 식별자 str은 암묵적으로 생성된 래퍼 객체를 가리킨다.
    // 식별자 str의 값 'hello'는 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다.
    // 래퍼 객체에 name 프로퍼티가 동적 추가된다.
    str.name = "Lee";

    // 3. 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
    // 이 때 2. 에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.

    // 4. 식별자 str은 새롭게 암묵적으로 생성된 래퍼 객체를 가리킨다.
    // 새롭게 생성된 래퍼 객체에는 name 프로퍼티가 존재하지 않는다.
    console.log(str.name); // undefined

    // 5. 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
    // 이 때 4. 에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.
    console.log(typeof str, str); // string hello
    ```

  - null과 undefined는 래퍼 객체를 생성하지 않는다.

- 전역 객체

  - 전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체이며, 어떤 객체에도 속하지 않는 최상위 객체다.

  - 전역 객체는 표준 빌트인 객체와 호스트 객체, 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다.

  - 전역 객체가 최상위 객체라는 것은 프로토타입 상속 관계상에서 최상위 객체라는 의미가 아니다. 전역 객체 자신은 어떤 객체의 프로퍼티도 아니며 객체의 계층적 구조상 표준 빌트인 객체와 호스트 객체를 프로퍼티로 소요한다는 것을 말한다.

  - 빌트인 전역 프로퍼티는 전역 객체의 프로퍼티를 의미한다. 주로 애플리케이션 전역에서 사용하는 값을 제공한다.

    - Infinity : 무한대를 나타내는 숫자값 Infinity를 갖는다.

      ```javascript
      console.log(3 / 0); // Infinity
      console.log(-3 / 0); // -Infinity

      // Infinity는 숫자값이다.
      console.log(typeof Infinity); // number
      ```

    - NaN : 숫자가 아님을 나타내는 숫자값 NaN을 갖는다. Number.NaN 프로퍼티와 같다.

      ```javascript
      console.log(Number("xyz")); // NaN
      console.log(1 * "string"); // NaN

      // NaN은 숫자값이다.
      console.log(typeof NaN); // number
      ```

    - undefined : 원시 타입 undefined를 값으로 갖는다.

      ```javascript
      var foo;
      console.log(foo); // undefined
      console.log(typeof undefined); // undefined
      ```

  - 빌트인 전역 함수는 애플리케이션 전역에서 호출할 수 있는 빌트인 함수로서 전역 객체의 메서드다.

    - isFinite : 전달받은 인수가 정상적인 유한수인지 검사하여 유한수이면 true를 반환하고, 무한수이면 false를 반환한다. 전달받은 인수의 타입이 숫자가 아닌 경우, 숫자로 타입을 변환한 후 검사를 수행한다. 이때 인수가 NaN으로 평가되는 값이라면 false를 반환한다.
    - isNaN : 전달받은 인수가 NaN인지 검사하여 그 결과를 불리언 타입으로 반환한다. 전달받은 인수의 타입이 숫자가 아닌 경우 숫자로 타입을 변환한 후 검사를 수행한다.
    - parseFloat : 전달받은 문자열 인수를 부동 소수점 숫자, 즉 실수로 해석하여 반환한다.
    - parseInt : 전달받은 문자열 인수를 정수로 해석하여 반환한다. 두 번째 인수로 진법을 나타내는 기수(2 ~ 36)를 전달할 수 있다. 기수를 지정하면 첫 번째 인수로 전달된 문자열을 해당 기수의 숫자로 해석하여 반환한다. 이때 반환값은 언제나 10진수다.
    - encodeURI : 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다. 이스케이프 처리는 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하는 것이다. 예를 들어, 특수 문자인 공백 문자는 %20, 한글 '가'는 %EC%9E%90 으로 인코딩된다.
    - decodeURI : 인코딩된 URI를 인수로 전달받아 이스케이프 처리 이전으로 디코딩한다.
    - encodeURIComponent : 인수로 전달된 문자열을 URI의 구성요소인 쿼리 스트링의 일부로 간주한다. 따라서 쿼리 스트링 구분자로 사용되는 =, ?, & 까지 인코딩한다.

      ```javascript
      const name = "co&ding";
      const uri = "http://msw.com?name=" + encodeURIComponent(name);
      ```

  - 암묵적 전역

    ```javascript
    // 전역 변수 x는 호이스팅이 발생한다.
    console.log(x); // undefined
    // 전역 변수가 아니라 단지 전역 객체의 프로퍼티인 y는 호이스팅이 발생하지 않는다.
    console.log(y); // ReferenceError: y is not defined

    var x = 10;

    function foo() {
      // 선언하지 않은 식별자에 값을 할당
      y = 20; // window.y = 20;
    }

    foo();

    // 선언하지 않은 식별자 y를 전역에서 참조할 수 있다.
    console.log(y);
    ```

# this

- 생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 이전이므로 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없다. 따러서 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자가 필요하다.

  ```javascript
  function Circle(radius) {
      // 이 시점에서는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
      ???.radius = radius;
  }
  Circle.prototype.getDiameter = function() {
      // 이 시점에서는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
      return 2 * ????.radius;
  }

  // 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의해야 한다.
  const circle = new Circle(5);
  ```

- this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다. this는 자바스크립트 엔진에 의해 암묵적으로 생성되며, 함수를 호출하면 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다.

  ```javascript
  function Circle(radius) {
    // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    this.radius = radius;
  }
  Circle.prototype.getDiameter = function () {
    // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    return 2 * this.radius;
  };
  ```

- this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.

  ```javascript
  console.log(this); // window

  function square(number) {
    // 일반 함수 내부에서 this는 전역 객체를 가리킨다.
    // 어떠한 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩된다.
    // strcit mode가 적용되면 undefined가 바인딩된다.
    console.log(this); // window
  }

  const person = {
    name: "msw",
    getName() {
      // 메서드 내부에서 this는 메서드를 호출한 객체를 가리킨다.
      console.log(this); // {name: 'msw', getName: f}
    },
  };

  function Person(name) {
    this.name = name;
    // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    console.log(this); // Person {name: 'msw'}
  }
  const me = new Person("msw");
  ```

- 렉시컬 스코프와 this 바인딩은 결정 시기가 다르다. 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다. 하지만 this 바인딩은 함수 호출 시점에 결정된다.

- this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.

  ```javascript
  const foo = function () {
    console.log(this);
  };

  // foo 함수를 일반적인 방식으로 호출할 때
  // foo 함수 내부의 this는 전역 객체 window를 가리킨다.
  foo(); // window

  // foo 함수를 프로퍼티 값으로 할당하여 메서드를 호출할 때
  // foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킨다.
  const obj = { foo };
  obj.foo(); // obj

  // foo 함수를 new 연산자와 함께 생성자 함수로 호출
  // foo 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가리킨다.
  new foo(); // foo {}

  // apply / call / bind 메서드에 의한 간접 호출
  // foo 함수 내부의 this는 인수에 의해 결정된다.
  const bar = { name: bar };
  foo.call(bar); // bar
  foo.apply(bar); // bar
  foo.bind(bar)(); // bar
  ```

- this를 명시적으로 바인딩하는 방법

  ```javascript
  var value = 1;

  const obj = {
    value: 100,
    foo1() {
      const that = this;
      setTimeout(function () {
        console.log(that.value); // 100
        console.log(this.value); // 1
      }, 100);
    },
    foo2() {
      setTimeout(
        function () {
          console.log(this.value); // 100
        }.bind(this),
        100
      );
    },
    foo3() {
      // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
      setTimeout(() => console.log(this.value), 100); // 100
    },
  };

  obj.foo1();
  obj.foo2();
  obj.foo3();
  ```

- 메서드 내부의 this는 프로퍼티로 메서드를 가리키고 있는 객체와는 관계가 없고 메서드를 호출한 객체에 바인딩된다.

  ```javascript
  const person = {
    name: "Lee",
    getName() {
      // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
      return this.name;
    },
  };

  const anotherPerson = {
    name: "msw",
  };
  anotherPerson.getName = person.getName;
  // getName 메서드를 호출한 객체는 anotherPerson이다.
  console.log(anotherPerson.getName()); // msw

  const getName = person.getName;
  console.log(getName()); // undefined
  ```

- 생성자 함수 내부의 this에는 생성자 함수가 (미래에)생성할 인스턴스가 바인딩된다.

  ```javascript
  function Circle(radius) {
    this.radius = radius;
  }
  ```

- Function.prototype.apply/call/bind

  ```javascript
  function getThisBinding() {
    console.log(this, arguments);
  }
  const thisArg = { a: 1 };

  // this에 바인딩할 객체, arguments(apply는 배열, call은 쉼표로 구분한 리스트 형식)
  getThisBinding.apply(thisArg, [1, 2, 3]); // { a: 1 } [Arguments] { '0': 1, '1': 2, '2': 3 }
  getThisBinding.call(thisArg, 1, 2, 3); // { a: 1 } [Arguments] { '0': 1, '1': 2, '2': 3 }
  ```

  ```javascript
  const person = {
    name: "msw",
    foo(callback) {
      // bind 메서드로 callback 함수 내부의 this 바인딩을 전달
      setTimeout(callback.bind(this), 100);
    },
  };

  person.foo(function () {
    console.log(`hello~ ${this.name}`); // hello~ msw
  });
  ```

- |         함수 호출 방식          |              this 바인딩              |
  | :-----------------------------: | :-----------------------------------: |
  |         일반 함수 호출          |               전역 객체               |
  |           메서드 호출           |         메서드를 호출한 객체          |
  |        생성자 함수 호출         | 생성자 함수가 (미래에)생성할 인스턴스 |
  | apply/call/bind에 의한 간접호출 |       첫번째 인수로 전달한 객체       |

# 실행 컨텍스트

- 소스코드의 타입 : ECMAScript 사양은 소스코드를 4가지 타입으로 구분한다. 4가지 타입의 소스코드는 실행 컨텍스트를 생성한다.

  - 전역 코드 : 전역 코드는 전역 변수를 관리하기 위해 최상위 스코프인 전역 스코프를 생성해야 한다. 그리고 var 키워드로 선언된 전역 변수와 함수 선언문으로 정의된 전역 함수를 전역 객체의 프로퍼티와 메서드로 바인딩하고 참조하기 위해 전역 객체와 연결되어야 한다. 이를 위해 전역 코드가 평가되면 전역 실행 컨텍스트가 생성된다.

  - 함수 코드 : 함수 코드는 지역 스코프를 생성해고 지역 변수, 매개 변수, arguments 객체를 관리해야 한다. 그리고 생성한 지역 스코프를 전역 스코프에서 시작하는 스코프 체인의 일원으로 연결해야 한다. 이를 위해 함수 코드가 평가되면 함수 실행 컨텍스트가 생성된다.

  - eval 코드 : eval 코드는 strict mode에서 자신만의 독자적인 스코프를 생성한다. 이를 위해 eval 코드가 평가되면 eval 실행 컨텍스트가 생성된다.

  - 모듈 코드 : 모듈 코드는 모듈별로 독립적인 모듈 스코프를 생성한다. 이를 위해 모듈 코드가 평가되면 모듈 실행 컨텍스트가 생성된다.

- 자바스크립트는 소스코드를 2개의 과정, **소스코드의 평가**와 **소스코드의 실행** 과정으로 나누어 처리한다.

  - 소스코드의 평가 과정에서는 실행 컨텍스트를 생성하고 변수, 함수 등의 선언문만 먼저 실행하여 생성된 변수나 함수 식별자를 키로 실행 컨텍스트가 관리하는 스코프(렉시컬 환경의 환경 레코드)에 등록한다.

  - 소스코드의 실행 과정(런타임)에서는 변수나 함수의 참조를 실행 컨텍스트가 관리하는 스코프에서 검색해서 취득한다. 그리고 값의 변경 등의 실행 결과는 다시 실행 컨텍스트가 관리하는 스코프에 등록된다.

- 코드가 실행되려면 다음과 같이 스코프, 식별자, 코드 실행 순서 등의 관리가 필요하다. 이 모든 것을 관리하는 것이 **실행 컨텍스트**다.

  1. 선언에 의해 생성된 모든 식별자(변수, 함수, 클래스 등)를 스코프를 구분하여 등록하고 상태 변화(식별자에 바인딩된 값의 변화)를 지속적으로 관리할 수 있어야 한다.
  2. 스코프는 중첩 관계에 의해 스코프 체인을 형성해야 한다. 즉, 스코프 체인을 통해 상위 스코프로 이동하며 식별자를 검색할 수 있어야 한다.
  3. 현재 실행 중인 코드의 실행 순서를 변경(예를 들어, 함수 호출에 의한 실행 순서 변경)할 수 있어야 하며 다시 되돌아갈 수도 있어야 한다.

- 식별자와 스코프는 실행 컨텍스트의 **렉시컬 환경**으로 관리하고 코드 실행 순서는 **실행 컨텍스트 스택**으로 관리한다.

- 자바스크립트 엔진은 먼저 전역 코드를 **평가**하여 **전역 실행 컨텍스트**를 생성한다. 그리고 함수가 호출되면 함수 코드를 **평가**하여 **함수 실행 컨텍스트**를 생성한다. 이때 생성된 실행 컨텍스트들은 스택 자료구조로 관리되는데, 이를 **실행 컨텍스트 스택**이라고 부른다.

  - 실행 컨텍스트 스택은 **코드의 실행 순서를 관리**한다.
  - 스택의 최상위에 존재하는 실행 컨텍스트는 언제나 현재 실행중인 코드의 실행 컨텍스트다.

- **렉시컬 환경**은 **식별자**와 식별자에 **바인딩된 값**, 그리고 **상위 스코프에 대한 참조**를 관리한다.

  - 렉시컬 환경은 두 개의 컴포넌트 **환경 레코드**와 **외부 렉시컬 환경에 대한 참조**로 구성된다.

    - 환경 레코드 : 스코프에 포함된 식별자를 등록하고 등록된 식별자에 바인딩 된 값을 관리하는 저장소다.
    - 외부 렉시컬 환경에 대한 참조 : 상위 스코프를 가르켜서 단방향 링크드 리스트인 **스코프 체인을 구현**한다.

- 실행 컨텍스트의 생성

  1. 전역 객체 생성
  2. 전역 코드 평가
     1. 전역 실행 컨텍스트 생성
     2. 전역 렉시컬 환경 생성
        1. 전역 환경 레코드 생성
        2. this 바인딩
        3. 외부 렉시컬 환경에 대한 참조 결정
  3. 전역 코드 실행

- 식별자 결정 과정

  1. 코드 실행
  2. 변수 할당문 또는 함수 호출문 실행
     1. 현재 스코프(현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 환경 레코드) 내에서 식별자 검색
     2. 있으면? 해당 식별자 참조. 끝
     3. 없으면? 상위 스코프(렉시컬 환경의 외부 렉시컬 환경에 대한 참조)로 올라가서 식별자 검색
     4. 있으면? 해당 식별자 참조. 끝
     5. 없으면? 스코프 체인의 종점까지 올라가기 반복.
     6. 있으면? 해당 식별자 참조. 끝
     7. 없으면? 참조 에러 발생. 끝

- 정리

  ```javascript
  const x = 10;
  function foo() {
    const y = 20;
    function bar() {
      console.log(x, y);
    }
    bar();
  }
  foo();
  ```

  1. 전역 객체 생성
  2. 전역 소스코드 평가
  3. 전역 실행 컨텍스트 생성
  4. 전역 실행 컨텍스트의 렉시컬 환경 생성
  5. 식별자 x와 foo는 전역 실행 컨텍스트의 렉시컬 환경의 환경 레코드에 등록
  6. foo 함수 객체는 이때 생성되어 식별자 foo에 할당
  7. 전역 소스코드 실행
  8. 전역 렉시컬 환경에서 x 찾아서 값 할당
  9. 할당 결과 전역 렉시컬 환경에 반영
  10. foo 함수 호출
  11. foo 함수 소스코드 평가 시작
  12. foo 함수 실행 컨텍스트 생성
  13. 실행 컨텍스트 스택에 foo가 맨 위에 쌓임
  14. 식별자 y와 bar를 foo 함수 실행 컨텍스트의 렉시컬 환경에 등록
  15. bar 함수 객체는 이때 생성되어 식별자 bar에 할당
  16. foo 함수 소스코드 실행
  17. foo 함수 렉시컬 환경에서 y 찾아서 값 할당
  18. 할당 결과 foo 함수 렉시컬 환경에 반영
  19. bar 함수 호출
  20. foo 함수와 동일한 과정을 거치며 bar 함수 평가
  21. `console.log` 실행
  22. bar 스코프 내에서 console 식별자 검색 시작
  23. 상위 스코프로 올라가 console 식별자 검색 (스코프 체인)
  24. console 객체에서 log 메서드 검색 (프로토타입 체인)
  25. bar 스코프 내에서 x, y 식별자 검색 시작
  26. y는 foo 스코프에 x는 전역 스코프에 존재한다.
  27. x, y 값 출력
  28. 실행 컨텍스트 스택에서 bar 실행 컨텍스트 제거
  29. 실행 컨텍스트 스택에서 foo 실행 컨텍스트 제거
