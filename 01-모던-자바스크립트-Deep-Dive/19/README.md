# 프로토타입

- 생성자 함수 내에서 메서드를 정의하면 인스턴스를 생성할 때 마다 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.

  ```javascript
  function Circle(radius) {
    this.radius = radius;
    this.getArea = function () {
      return Math.PI * this.radius ** 2;
    };
  }

  const circle1 = new Circle(1);
  const circle2 = new Circle(2);

  console.log(circle1.getArea === circle2.getArea); // false
  ```

- 프로토타입은 어떤 객체의 상위 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티를 제공한다. 자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거할 수 있다.

  ```javascript
  function Circle(radius) {
    this.radius = radius;
  }

  Circle.prototype.getArea = function () {
    return Math.PI * this.radius ** 2;
  };

  const circle1 = new Circle(1);
  const circle2 = new Circle(2);

  console.log(circle1.getArea === circle2.getArea); // true
  ```

- 모든 객체는 프로토타입을 갖는다. 객체 리터럴에 의해 생성된 객체의 프로토타입은 Object.prototype이고 생성자 함수에 의해 생성된 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체다.

- 함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다. prototype 프로퍼티는 생성자 함수가 생성할 객체의 프로토타입을 가리킨다. 따라서 생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.

- 모든 프로토타입은 constructor 프로퍼티를 갖는다. 이 constructor 프로퍼티는 prototype의 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다. 이 연결은 생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이뤄진다.

- |            구분             |    소유     |        값         |  사용 주체  |                                  사용 목적                                   |
  | :-------------------------: | :---------: | :---------------: | :---------: | :--------------------------------------------------------------------------: |
  | `__proto__` 접근자 프로퍼티 |  모든 객체  | 프로토타입의 참조 |  모든 객체  |           객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용            |
  |     prototype 프로퍼티      | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |

- 프로토타입과 prototype 프로퍼티와 \_\_proto\_\_와 constructor

  - 프로토타입 객체 : 모든 객체가 가지고 있다.
  - prototype 프로퍼티 : 생성자 함수만 가지고 있다. 프로토타입 객체를 참조할 때 사용한다.
  - \_\_proto\_\_ : 모든 객체가 가지고 있다. 프로토타입 객체를 참조할 때 사용한다.
  - constructor : 프로토타입 객체가 가지고 있다. 생성자 함수를 참조할 때 사용한다.

    ```javascript
    function Person() {}
    const msw = new Person();

    console.log(msw.__proto__ === Person.prototype); // true

    console.log(Person === Person.prototype.constructor); // true

    console.log(Person === msw.constructor); // true
    ```

- 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다. 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.

- 자바스크립트는 객체의 프로퍼티에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이를 **프로토타입 체인**이라 한다. 프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘이다.

- <s>강해져서 돌아오겠다... 너무 어려워...</s>
