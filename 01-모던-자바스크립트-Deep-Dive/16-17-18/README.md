# 프로퍼티 어트리뷰트

- 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 사용하는 의사 프로퍼티와 의사 메서드다. 직접적으로 접근하거나 호출할 수 있는 방법은 없지만, 일부는 간접적으로 접근할 수 있다.

- 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다. 프로퍼티의 상태란 값(value), 값의 갱신 가능 여부(writable), 열거 가능 여부(enumerable), 재정의, 삭제 가능 여부(configurable)이다.

- 프로퍼티 어트리뷰트에 직접 접근할 수 없지만 Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인할 수 있다.

  ```javascript
  const person = {
    name: "Lee",
  };

  console.log(Object.getOwnPropertyDescriptor(person, "name"));
  // { value: 'Lee', writable: true, enumerable: true, configurable: true }
  console.log(Object.getOwnPropertyDescriptors(person));
  ```

- 데이터 프로퍼티와 접근자 프로퍼티

  - 데이터 프로퍼티 : 키와 값으로 구성된 일반적인 프로퍼티

    - value, writable, enumerable, configurable

  - 접근자 프로퍼티 : 자체적으로는 값을 갖지 않고 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티

    - get, set, enumerable, configurable

    <br/>

  ```javascript
  const person = {
    // 데이터 프로퍼티
    firstName: "sw",
    lastName: "moon",

    // 접근자 프로퍼티
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    set fullName(name) {
      [this.firstName, this.lastName] = name.split(" ");
    },
  };

  // setter 함수 호출
  person.fullName = "sw moon";
  // getter 함수 호출
  console.log(person.fullName);
  ```

- 프로퍼티 정의 : 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것을 말한다.

  ```javascript
  const person = {};

  Object.defineProperty(person, 'firstName', {
      value: 'sw',
      // writable: true,
      // enumerable: true,
      // configurable: true
      // 생략 시 기본값은 undefined, false 이다.
  });

  Object.defineProperty(person, 'fullName', {
      get() {
          return '';
      }
      set() {

      }
  });
  ```

- 객체 변경 방지

  - | 구분      | 메서드                   | 추가 | 삭제 | 읽기 | 쓰기 | 어트리뷰트 재정의 |
    | :-------- | :----------------------- | :--: | :--: | :--: | :--: | :---------------: |
    | 확장 금지 | Object.preventExtensions |  X   |  O   |  O   |  O   |         O         |
    | 밀봉      | Object.seal              |  X   |  X   |  O   |  O   |         X         |
    | 동결      | Object.freeze            |  X   |  X   |  O   |  X   |         X         |

    ```javascript
    const person = { name: "msw" };

    Object.preventExtensions(person);
    console.log(Object.isExtensible(person)); // true

    Object.seal(person);
    console.log(Object.isSealed(person)); // true

    Object.freeze(person);
    console.log(Object.isFrozen(person)); // true
    ```

  - 불변 객체 : 위의 메서드들은 얕은 변경 방지로 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지 못한다. 따라서 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 메서드를 호출해야 한다.

    ```javascript
    function deepFreeze(target) {
      if (target && typeof target === "object" && !Object.isFrozen(target)) {
        Object.freeze(target);

        Object.keys(target).forEach((key) => deepFreeze(target[key]));
      }

      return target;
    }

    const person = {
      name: "msw",
      address: { city: "Seoul" },
    };

    deepFreeze(person);
    ```

# 생성자 함수에 의한 객체 생성

- 객체 리터럴에 의한 객체 생성 방식의 문제점 : 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 하기 때문에 비효율적이다.

  ```javascript
  const circle1 = {
    radius: 5,
    getDiameter() {
      return 2 * this.radius;
    },
  };
  const circle2 = {
    radius: 5,
    getDiameter() {
      return 2 * this.radius;
    },
  };
  ```

- 생성자 함수란 new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말한다.

- 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체를 여러 개 간편하게 생성할 수 있다.

  ```javascript
  function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function () {
      return 2 * this.radius;
    };
  }

  const circle1 = new Circle(5);
  const circle2 = new Circle(10);
  ```

- new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다. 만약 new 연산자와 함께 호출하지 않으면 일반 함수로 동작한다.

- 자바스크립트 엔진은 new 연산자와 함께 생성자 함수를 호출하면 **암묵적**으로 인스턴스를 생성하고 필요에 따라 인스턴스를 초기화한 후 암묵적으로 인스턴스를 반환한다.

  1. 런타임 이전에 암묵적으로 빈 객체가 생성되고 이 객체는 this에 바인딩된다. 생성자 함수 내부의 this가 생성자 함수가 생성한 인스턴스를 가르킬 수 있는 이유이다.
  2. 개발자는 this에 바인딩되어 있는 인스턴스에 프로퍼티나 메서드를 추가하고 초기화한다.
  3. 생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

     ```javascript
     function Circle(radius) {
       // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
       console.log(this); // Circle { }

       // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
       this.radius = radius;

       // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
     }

     const circle = new Circle(1);
     ```

- 함수는 객체이지만 일반 객체와는 다르다. 일반 객체는 호출할 수 없지만 함수는 호출할 수 있다. 따라서 함수는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드는 물론, 함수로서 동작하기 위해 함수 객체만을 위한 내부 슬롯과 내부 메서드를 추가로 가지고 있다.

  - 내부 슬롯 : [[Environment]], [[FormalParameters]]
  - 내부 메서드 : [[Call]], [[Construct]]

- 내부 메서드 [[Call]]을 갖는 함수 객체를 callable이라 하며, 내부 메서드 [[Construct]]를 갖는 함수 객체를 constructor, 갖지 않는 함수를 non-constructor라고 부른다. 함수 객체는 반드시 callable이어야 한다. 하지만 모든 함수 객체가 [[Construct]]를 갖는 것은 아니다.

- 함수를 일반 함수로서 호출하면 함수 객체의 내부 메서드 [[Call]]이 호출되고 new 연산자와 함께 생성자 함수로서 호출하면 내부 메서드 [[Construct]]가 호출된다. non-constructor인 함수 객체를 생성자 함수로서 호출하면 에러가 발생한다.

- 자바스크립트 엔진은 함수 객체를 생성할 때 함수 정의 방식에 따라 함수를 constructor와 non-constructor로 구분한다.

  - constructor : 함수 선언문, 함수 표현식, 클래스
  - non-constructor : 메서드(ES6 메서드 축약 표현), 화살표 함수

    ```javascript
    // 일반 함수 정의 : 함수 선언문, 함수 표현식
    function foo() {}
    const bar = function () {};

    // 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다.
    // 이는 메서드로 인정하지 않는다.
    const baz = {
      x: function () {},
    };

    new foo(); // foo { }
    new bar(); // bar { }
    new baz.x(); // x { }
    ```

    ```javascript
    // 화살표 함수 정의
    const arrow = () => {};

    // 메서드 정의 : ES6의 메서드 축약 표현만 메서드로 인정한다.
    const obj = {
      x() {},
    };

    new arrow(); // TypeError: arrow is not a constructor
    new obj.x(); // TypeError: obj.x is not a constructor
    ```

- 생성자 함수를 new 연산자 없이 호출하면 함수 내부의 this는 전역 객체 window를 가리킨다.

- new 연산자와 함께 생성자 함수로서 호출되면 함수 내부의 new.target은 함수 자신을 가리킨다. new 연산자 없이 일반 함수로서 호출된 함수 내부의 new.target은 undefined다.

  ```javascript
  function Circle(radius) {
    console.log(new.target);
    // undefined
    // [Function: Circle]

    if (!new.target) {
      return new Circle(radius);
    }

    this.radius = radius;
    this.getDiameter = function () {
      return 2 * this.radius;
    };
  }

  Circle(10);
  ```

- 스코프 세이프 생성자 패턴 : new.target은 ES6에서 도입된 최신 문법으로 IE에서는 지원하지 않는다. new.target을 사용할 수 없을 때 스코프 세이프 생성자 패턴을 사용할 수 있다.

  ```javascript
  function Circle(radius) {
    // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈 객체를 생성하고
    // this에 바인딩 한다. 이 때 this와 Circle은 프로토타입에 의해 연결된다.

    // 이 함수가 new 연산자와 함께 호출되지 않았다면 이 시점의 this는 전역 객체 window를 가리킨다.
    // 즉, this와 Circle은 연결되지 않는다.
    if (!(this instanceof Circle)) {
      return new Circle(radius);
    }

    /*
  
      */
  }
  ```

- Object와 Function 생성자 함수는 new 연산자 없이 호출해도 new 연산자와 함께 호출했을 때와 동일하게 동작한다. 하지만 String, Number, Boolean 생성자 함수는 new 연산자 없이 호출하면 문자열, 숫자, 불리언 값을 반환한다. 이를 통해 데이터 타입을 변환하기도 한다.

  ```javascript
  let obj = new Object();
  console.log(obj); // { }

  obj = Object();
  console.log(obj); // { }
  ```

  ```javascript
  const str1 = new String(123);
  const str2 = String(123);
  console.log(str1, typeof str1); // [String: '123'] object
  console.log(str2, typeof str2); // 123 string

  const num1 = new Number("123");
  const num2 = Number("123");
  console.log(num1, typeof num1); // [Number: 123] object
  console.log(num2, typeof num2); // 123 number

  const bool1 = new Boolean("true");
  const bool2 = Boolean("true");
  console.log(bool1, typeof bool1); // [Boolean: true] object
  console.log(bool2, typeof bool2); // true boolean

  console.log(bool1.valueOf()); // true
  ```

# 함수와 일급 객체

- 다음 조건을 만족하는 객체를 일급 객체라 한다.

  1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
  2. 변수나 자료구조(객체, 배열)에 저장할 수 있다.
  3. 함수의 매개변수에 전달할 수 있다.
  4. 함수의 반환값으로 사용할 수 있다.

- 자바스크립트의 함수는 위의 조건을 모두 만족하므로 일급 객체다. 함수가 일급 객체라는 것은 함수를 객체와 동일하게 사용할 수 있다는 의미다. 객체는 값이므로 함수는 값과 동일하게 취급할 수 있다.

- 함수 객체는 일반 객체에는 없는 함수 고유의 프로퍼티를 소유한다.

  ```javascript
  function square(number) {
    return number * number;
  }
  console.log(Object.getOwnPropertyDescriptors(square));

  /*
  {
      length: { value: 1, writable: false, enumerable: false, configurable: true },
      name: { value: 'square', writable: false, enumerable: false, configurable: true },
      arguments: { value: null, writable: false, enumerable: false, configurable: false },
      caller: { value: null, writable: false, enumerable: false, configurable: false },
      prototype: { value: {}, writable: true, enumerable: false, configurable: false }
  
      length, name, arguments, caller, prototype 는
      모두 일반 객체에는 없는 함수 객체 고유의 데이터 프로퍼티다.
  }
  */
  ```

- arguments : 함수 객체 arguments 프로퍼티의 값은 arguments 객체다. arguments 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용된다. Function.arguments와 같은 사용법은 권장되지 않으며 함수 내부에서 지역 변수 처럼 사용할 수 있는 arguemnts 객체를 참조하도록 한다. 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.

  ```javascript
  function sum() {
    let res = 0;

    // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체
    for (let i = 0; i < arguments.length; i++) {
      res += arguments[i];
    }

    return res;
  }

  console.log(sum()); // 0
  console.log(sum(1, 2)); // 3
  console.log(sum(1, 2, 3)); // 6
  ```

- length : 함수 객체의 length 프로퍼티는 함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.

  ```javascript
  function foo() {}
  console.log(foo.length); // 0
  ```

- name : 함수 객체의 name 프로퍼티는 함수 이름을 나타낸다. ES5와 ES6에서 동작을 달리하므로 주의한다.

  ```javascript
  // 기명 함수 표현식
  var namedFunc = function foo() {};
  console.log(nameFunc.name); // foo

  // 익명 함수 표현식
  var anonymousFunc = function () {};
  // ES5 : 빈 문자열을 값으로 갖는다.
  // ES6 : 함수 객체를 가리키는 변수(식별자) 이름을 값으로 갖는다.
  console.log(anonymousFunc.name); // anonymousFunc

  function bar() {}
  console.log(bar.name); // bar
  ```

- `__proto__` : 프로퍼티는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티다.

- prototype : prototpye 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다. 생성자 함수로 호출할 수 있는 함수 객체, 즉 constructor만이 소유하는 프로퍼티다.
