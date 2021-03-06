# 객체

- 프로토타입 활용 상속

  - 클래스에 함수를 추가하는 방법

    ```javascript
    function example() {
      this.name = "msw";
      this.age = 28;
      this.sayName = function () {
        console.log(this.name);
      };
    }

    var obj1 = new example();
    var obj2 = new example();

    example.prototype.sayAge = function () {
      console.log(this.age);
    };

    obj1.sayAge(); // 28
    ```

- 생성자와 변수

  - getter setter

    ```javascript
    function example() {
      var privateName = "";

      this.getName = function () {
        return privateName;
      };
      this.setName = function (name) {
        privateName = name;
      };
    }
    ```

# 메모리 관리

- 객체에 대한 참조

  - 객체의 특정 속성 하나만 참조하더라도 해당 객체 전체가 로드된다.

    ```javascript
    var foo = {
      bar1: mem(), // 5kb
      bar2: mem(), // 5kb
    };
    function clickEvent() {
      console.log(foo.bar1[0]);
      // 함수 범위에 foo 전체가 로드된다.
    }
    ```

- DOM 메모리 누수

  - DOM을 remove하여 HTML에서 사라지더라도 해당 DOM을 가리키는 변수가 이벤트 콜백 외부에 선언된 경우 해당 항목은 여전히 메모리에 남게된다.

    ```javascript
    var one = document.getElementById("one");
    var two = document.getElementById("two"); // 누수
    one.addEventListener("click", function () {
      two.remove();
    });

    var one = document.getElementById("one");
    one.addEventListener("click", function () {
      var two = document.getElementById("two"); // 누수 안됨
      two.remove();
    });
    ```

- window 전역 객체

  - window의 속성으로 선언된 추가적인 객체는 모두 제거할 수 없다.

    ```javascript
    var a = "a";
    b = "b";

    console.log(window.a); // a
    console.log(window.b); // b
    ```

- delete 연산자

  - 객체 속성은 제거할 수 있다.

    ```javascript
    var test = {
      name: "msw",
    };
    delete test.name;
    ```
