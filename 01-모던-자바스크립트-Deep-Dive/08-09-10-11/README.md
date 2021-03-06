# 제어문

- if
- switch
- for
- while

# 타입 변환과 단축 평가

- 명시적 타입 변환(타입 캐스팅)

  - 문자열 타입으로 변환

    ```javascript
    String(1);
    (1).toString();
    ```

  - 숫자 타입으로 변환

    ```javascript
    Number("1");
    parseInt("0");
    parseFloat("10.53");
    ```

  - 불리언 타입으로 변환

    ```javascript
    Boolean("false"); // true
    Boolean(""); // false
    ```

- 암묵적 타입 변환(타입 강제 변환)

  - 문자열 타입으로 변환

    ```javascript
    1 + "";
    `${1 + 1}`;
    ```

  - 숫자 타입으로 변환

    ```javascript
    +"1";
    ```

  - 불리언 타입으로 변환

    ```javascript
    !0; // true
    !1; // false
    ```

- 명시적, 암묵적 타입 변환은 기존 원시 값을 직접 변경하는 것이 아니라 기존 원시 값을 사용해 다른 타입의 새로운 원시 값을 생성하는 것이다.

- 논리곱(&&) 연산자와 논리합(||) 연산자는 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환하는데, 이를 **단축 평가**라 한다. 단축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말한다.

  - |  단축 평가 표현식   |   결과   |
    | :-----------------: | :------: |
    | true \|\| anything  |   true   |
    | false \|\| anything | anything |
    |  true && anything   | anything |
    |  false && anything  |  false   |

  - 객체가 null 또는 undefined 인지 확인

    ```javascript
    var elem = null; // null
    // var elem = {}; // undefined

    var value = elem && elem.value;
    console.log(value); // null
    ```

  - 함수 매개변수에 기본값을 설정

    ```javascript
    function getStringLength(str) {
      str = str || "";
      return str.length;
    }
    ```

- 옵셔널 체이닝 연산자 : 연산자 **?.** 는 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

  ```javascript
  var elem = null;
  var value = elem?.value;
  console.log(value); // undefined
  ```

  - 논리 연산자와 다른 점 : ""는 false이지만 null 혹은 undefined가 아님!

    ```javascript
    var str = "";
    var length = str && str.length;
    // str이 false로 평가되기 때문에 length는 ""임!
    ```

    ```javascript
    var str = "";
    var length = str?.length;
    // str이 null 또는 undefined가 아니기 때문에 length는 0임!
    ```

- null 병합 연산자 : 연산자 **??** 는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.

  ```javascript
  var foo = null ?? "default string";
  console.log(foo); // default string
  ```

  - 논리 연산자와 다른 점 : ""는 false이지만 null 혹은 undefined가 아님!

    ```javascript
    var foo = "" || "default string";
    console.log(foo); // default string
    ```

    ```javascript
    var foo = "" ?? "default string";
    console.log(foo); // ""
    ```

# 객체 리터럴

- 프로퍼티 키 동적 생성

  - ES5

    ```javascript
    var prefix = "prop";
    var i = 0;
    var obj = {};

    obj[prefix + "-" + ++i] = i;
    obj[prefix + "-" + ++i] = i;
    obj[prefix + "-" + ++i] = i;
    ```

  - ES6

    ```javascript
    var prefix = "prop";
    var i = 0;
    var obj = {
      [`${prefix}-${++i}`]: i,
      [`${prefix}-${++i}`]: i,
      [`${prefix}-${++i}`]: i,
    };
    ```

# 원시 값과 객체의 비교

- 원시 값은 변경 불가능한 값 : 원시 값을 할당한 변수에 새로운 원시 값을 재할당하면 메모리 공간에 저장되어 있는 재할당 이전의 **원시 값을 변경하는 것이 아니라** 새로운 메모리 공간을 확보하고 재할당한 원시 값을 저장한 후, **변수는 새롭게 재할당한 원시 값을 가리킨다.** 이 때 변수가 참조하던 메모리 공간의 주소가 바뀐다. 값의 이러한 특성을 불변성이라 한다.

- 자바스크립트의 문자열은 원시 타입이다.

  ```javascript
  var str = "string";
  str[0] = "S";
  console.log(str); // string
  ```

- 값에 의한 전달 : 변수에 원시 값을 갖는 변수를 할당하면 할당받는 변수에는 할당되는 변수의 원시 값이 복사되어 전달된다.

  ```javascript
  var score = 80;
  var copy = score;

  console.log(score, copy); // 80 80
  console.log(score === copy); // true

  copy = 100;

  console.log(score, copy); // 80 100
  console.log(score === copy); // false

  // score와 copy는 다른 메모리 공간에 저장된 별개의 값이다.
  ```

- 참조에 의한 전달 : 객체를 가리키는 변수를 다른 변수에 할당하면 **원본의 참조 값이 복사되어 전달**된다.

- 값에 의한 전달과 참조에 의한 전달은 식별자가 기억하는 메모리 공간에 저장되어 있는 값을 복사해서 전달한다는 면에서 동일하다. 다만 식별자가 기억하는 메모리 공간, 즉 변수에 저장되어 있는 값이 원시 값이냐 참조 값이냐의 차이만 있을 뿐이다.

  - 원시 값의 식별자(변수)는 값을 가르키고 객체의 식별자는 객체를 가르키는 주소를 가르킨다!
  - 객체는 원시 값에 비해 크고 일정하지 않기 때문에 복사의 비용이 크다. 이 때문에 객체는 참조를 복사하는 것이다!
  - 객체를 참조하는 주소 또한 결국 식별자의 값이기 때문에 엄밀히 말하면 원시 값과 객체 모두 값에 의한 전달이다. 객체는 편의상 참조에 의한 전달이라 부를 뿐이다!
