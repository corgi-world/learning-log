# 클래스

- 클래스는 새로운 객체 생성 메커니즘이다.

  - 생성자 함수와 매우 유사하게 동작하지만 다음과 같이 몇 가지 차이가 있다.

    1. 클래스는 new 연산자 없이 호출하면 에러가 발생한다. 생성자 함수는 new 연산자 없이 호출하면 일반 함수로서 호출된다.
    2. 클래스는 상속을 지원하는 extends와 super 키워드를 제공한다.
    3. 클래스는 호이스팅이 발생하지 않는 것 처럼 동작한다. 함수 선언문으로 정의된 생성자 함수는 함수 호이스팅이, 함수 표현식으로 정의한 생성자 함수는 변수 호이스팅이 발생한다.
    4. 클래스 내의 모든 코드는 암묵적으로 strict mode가 지정되어 실행되며 strict mode를 해제할 수 없다.
    5. 클래스의 constructor, 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false다. 따라서 열거되지 않는다.

- 클래스 선언문

  ```javascript
  class Person {}
  ```

- 클래스 표현식

  ```javascript
  const Person = class {};
  const Person = class MyClass {};
  ```

  - 클래스를 표현식으로 정의할 수 있다는 것은 클래스가 값으로 사용할 수 있는 일급 객체라는 것을 의미한다. 따라서 다음과 같은 특징을 갖는다.

    - 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
    - 변수나 자료구조에 저장할 수 있다.
    - 함수의 매개변수로 전달할 수 있다.
    - 함수의 반환값으로 사용할 수 있다.

- 메서드 정의 방식

  ```javascript
  class Person {
    constructor(name) {
      this.name = name;
    }

    // 프로토타입 메서드
    sayHello() {
      console.log(`Hello~ ${this.name}`);
    }

    // 정적 메서드
    static sayBye() {
      console.log("Bye~");
    }
  }
  const msw = new Person("moon");

  msw.sayHello();
  Person.sayBye();
  ```

- 클래스 선언문으로 정의한 클래스는 함수 선언문과 같이 런타임 이전에 평가되어 함수 객체를 생성한다. 이때 클래스가 평가되어 생성된 함수 객체는 생성자 함수로서 호출할 수 있는 함수, 즉 constructor다.

  ```javascript
  class Person {}
  console.log(typeof Person); // function
  ```

- 클래스는 정의 이전에 참조할 수 없다.

  ```javascript
  console.log(Person);
  // ReferenceError: Cannot access 'Person' before initialization
  class Person {}
  ```

  - 클래스 선언문은 마치 호이스팅이 발생하지 않는 것처럼 보이나 그렇지 않다. 클래스는 let, const 키워드로 선언한 변수처럼 호이스팅된다. 따라서 클래스 선언문 이전에 일시적 사각지대에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.

    - var, let, const, function, class 키워드를 사용하여 선언된 모든 식별자는 호이스팅된다. 모든 선언문은 런타임 이전에 먼저 실행되기 때문이다.

- 클래스는 생성자 함수이며 new 연산자와 함께 호출되어 인스턴스를 생성한다.

  - 함수는 new 연산자의 사용 여부에 따라 일반 함수로 호출되거나 인스턴스 생성을 위한 생성자 함수로 호출되지만 클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 new 연산자와 함께 호출해야 한다.

    ```javascript
    class Person {}
    const msw = new Person();
    console.log(msw); // Person {}
    ```

    ```javascript
    class Person {}
    const msw = Person();
    // TypeError: Class constructor Person cannot be invoked without 'new'
    ```

- constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드다.

  - constructor는 메서드로 해석되는 것이 아니라 클래스가 평가되어 생성한 함수 객체 코드의 일부가 된다. 즉, 클래스 정의가 평가되면 constructor의 기술된 동작을 하는 함수 객체가 생성된다.

    ```javascript
    class Person {
      constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name;
        // 암묵적으로 this 반환
      }
    }

    function Person(name) {
      // 인스턴스 생성 및 초기화
      this.name = name;
      // 암묵적으로 this 반환
    }
    ```

- 정적 메서드

  ```javascript
  class Person {
    static sayHello() {
      console.log("Hello");
    }
  }
  ```

  - 클래스는 클래스 정의가 평가되는 시점에 함수 객체가 되는데, 함수 객체는 자신의 프로퍼티나 메서드를 소유할 수 있다. 따라서 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.

    ```javascript
    Person.sayHello(); // Hello
    ```

  - 정적 메서드는 클래스에 바인딩 된 것이지 인스턴스의 프로토타입에 바인딩 된 것이 아니기 때문에 인스턴스로 호출할 수 없다.

    ```javascript
    const msw = new Person();
    msw.sayHello();
    // TypeError: msw.sayHello is not a function
    ```

  - 정적 메서드는 클래스로 호출해야 하므로 정적 메서드 내부의 this는 인스턴스가 아닌 클래스를 가리킨다. 즉, 프로토타입 메서드와 정적 메서드 내부의 this 바인딩이 다르다. 따라서 메서드 내부에서 인스턴스 프로퍼티를 참조할 필요가 있다면, 프로토타입 메서드를 정의하여 사용해야 한다.

  - 클래스 또는 생성자 함수를 하나의 네임스페이스로 사용하여 정적 메서드를 모아 놓으면 이름 충돌 가능성을 줄여 주고 관련 함수들을 구조화할 수 있는 효과가 있다.

    ```javascript
    Math.max(1, 2, 3);
    Number.isNaN(NaN);
    JSON.stringify({ a: 1 });
    ```

- 클래스에서 정의한 메서드의 특징

  1. function 키워드를 생략한 메서드 축약 표현을 사용한다.
  2. 객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마가 필요 없다.
  3. 암묵적으로 strict mode로 실행된다.
  4. 프로퍼티의 열거 가능 여부를 나타내며, 불리언 값을 갖는 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false다. 따라서 for... in 문이나 Object.keys 메서드 등으로 열거할 수 없다.
  5. 내부 메서드 [[Construct]]를 갖지 않는 non-constructor다. 따라서 new 연산자와 함께 호출할 수 없다.

- 클래스의 인스턴스 생성 과정

  ```javascript
  class Person {
    constructor(name) {
      // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
      console.log(this); // Person {}

      // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
      this.name = name;

      // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
    }
  }
  ```

- 접근자 프로퍼티

  ```javascript
  class Person {
    constructor(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }

    // getter
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
    // setter
    set fullName(name) {
      [this.firstName, this.lastName] = name.split(" ");
    }
  }
  const me = new Person("Sungwoon", "Moon");
  me.fullName = "Sungwoon Moon";
  console.log(me);
  // Person { firstName: 'Sungwoon', lastName: 'Moon' }
  console.log(me.fullName);
  // Sungwoon Moon
  ```

- private 필드

  ```javascript
  class Person {
    // private 필드 정의
    #name = "";
    constructor(name) {
      this.#name = name;
    }
  }

  const me = new Person("msw");
  console.log(me.#name);
  // SyntaxError: Private field '#name' must be declared in an enclosing class
  ```

  ```javascript
  class Person {
    // private 필드 정의
    #name = "";
    constructor(name) {
      this.#name = name;
    }

    get name() {
      return this.#name;
    }
  }

  const me = new Person("msw");
  console.log(me.name); // msw
  ```

- static 필드

  ```javascript
  class MyMath {
    static PI = 3.14;
    static #num = 10;
    static increment() {
      return ++MyMath.#num;
    }
  }
  console.log(MyMath.PI); // 3.14
  console.log(MyMath.increment()); // 11
  ```

- 클래스 상속과 생성자 함수 상속

  - 프로토타입 기반 상속은 프로토타입 체인을 통해 다른 객체의 자산을 상속받는 개념이지만 상속에 의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의하는 것이다.

  <br/>

  ```javascript
  class Animal {
    constructor(age, weight) {
      this.age = age;
      this.weight = weight;
    }
    eat() {
      return "eat";
    }
    move() {
      return "move";
    }
  }

  class Bird extends Animal {
    fly() {
      return "fly";
    }
  }

  const bird = new Bird(1, 5);

  console.log(bird); // Bird { age: 1, weight: 5 }
  console.log(bird instanceof Bird); // true
  console.log(bird instanceof Animal); // true

  console.log(bird.eat()); // eat
  console.log(bird.move()); // move
  console.log(bird.fly()); // fly
  ```

- 상속을 통해 확장된 클래스를 서브클래스라 부르고, 서브클래스에게 상속된 클래스를 수퍼클래스라 부른다. 수퍼클래스와 서브클래스는 인스턴스의 프로토타입 체인뿐 아니라 클래스 간의 프로토타입 체인도 생성한다. 이를 통해 프로토타입 메서드, 정적 메서드 모두 상속 가능하다.

  ```javascript
  // 수퍼클래스
  class Base {}

  // 서브 클래스
  class Derived extends Base {}
  ```

- extends 키워드는 클래스뿐만 아니라 [[Construct]] 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있다. 이를 통해 동적으로 상속받을 대상을 결정할 수 있다.

  ```javascript
  function Base1() {
    this.a = 1;
  }
  class Base2 {
    constructor() {
      this.b = 2;
    }
  }
  const condition = true;

  class Derived extends (condition ? Base1 : Base2) {}
  const derived = new Derived();

  console.log(derived); // Derived { a: 1 }
  console.log(derived instanceof Base1); // true
  console.log(derived instanceof Base2); // false
  ```

- 클래스에서 constructor를 생략하면 다음과 같이 비어있는 constructor가 암묵적으로 정의된다.

  ```javascript
  class Base {}

  class Derived extends Base {}
  ```

  ```javascript
  class Base {
    constructor() {}
  }

  class Derived extends Base {
    constructor(...args) {
      super(...args);
    }
  }
  ```

- super를 호출하면 수퍼클래스의 constructor를 호출한다.

  ```javascript
  class Base {
    constructor(a, b) {
      this.a = a;
      this.b = b;
    }
  }

  class Derived extends Base {
    constructor(a, b, c) {
      super(a, b);
      this.c = c;
    }
  }

  const derived = new Derived(1, 2, 3);
  console.log(derived); // Derived { a: 1, b: 2, c: 3 }
  ```

- super를 호출할 때 주의할 점

  1. 서브클래스의 constructor에서 super를 호출하지 않을 경우 에러가 발생한다.
  2. 서브클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없다.
  3. 서브클래스의 constructor가 아닌 다른 곳에서 super를 호출하면 에러가 발생한다.

- super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

  1. super는 자신을 참조하고 있는 메서드가 바인딩되어 있는 객체의 **프로토타입**을 가리킨다.
  2. super 참조가 동작하기 위해서는 super를 참조하고 있는 메서드가 바인딩되어 있는 객체의 프로토타입을 찾을 수 있어야 한다. 이를 위해 메서드는 내부 슬롯 [[HomeObject]]를 가지며, 자신을 바인딩하고 있는 객체를 가리킨다.

     1. Derived의 메서드는 Derived.prototype에 바인딩 된다.
     2. Derived.prototype의 프로토타입은 Base.prototype 이다.
     3. Derived의 메서드의 내부 슬롯 [[HomeObject]]는 Derived.prototype을 가리킨다.
     4. 3을 통해 Base.prototype을 찾을 수 있다!
     5. 메서드가 아닌 함수는 super 키워드를 사용할 수 없다. 왜? [[HomeObject]]가 없기 때문에!!

- 서브클래스는 자신이 직접 인스턴스를 생성하지 않고 수퍼클래스에게 인스턴스 생성을 위임한다. 이것이 바로 서브클래스의 constructor에서 반드시 super를 호출해야 하는 이유다.

  ```javascript
  class Rectangle {
    constructor(w, h) {
      // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
      // 이때 인스턴스는 서브클래스가 생성한 것으로 처리된다.
      console.log(this); // ColorRectangle {}
      console.log(new.target); // [class ColorRectangle extends Rectangle]
      this.w = w;
      this.h = h;
      // 암묵적 this 반환
    }
  }

  class ColorRectangle extends Rectangle {
    constructor(w, h, c) {
      super(w, h);
      // 별도의 인스턴스를 생성하지 않고
      // super가 반환한 인스턴스를 this에 바인딩한다.
      this.c = c;
      // 암묵적 this 반환
    }
  }
  ```
