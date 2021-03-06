# 배열

- 자바스크립트의 배열은 일반적인 배열의 동작을 흉내 낸 특수한 객체다.

  - 밀집 배열 : 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 배열.
  - 희소 배열 : 각 메모리 공간이 동일하지 않을 수 있으며, 연속적으로 이어져 있지 않는 배열. 자바스크립트는 문법적으로 희소 배열을 허용한다.

- 자바스크립트 배열은 인덱스를 나타내는 문자열을 프로퍼티 키로 가지며, length 프로퍼티를 갖는 특수한 객체다. 배열의 요소는 프로퍼티 값이며, 자바스크립트에서 사용할 수 있는 모든 값은 객체의 프로퍼티 값이 될 수 있으므로 어떤 타입의 값이라도 배열의 요소가 될 수 있다.

  ```javascript
  console.log(Object.getOwnPropertyDescriptors([1, 2, 3]));
  /*
  {
    '0': { value: 1, writable: true, enumerable: true, configurable: true },    
    '1': { value: 2, writable: true, enumerable: true, configurable: true },    
    '2': { value: 3, writable: true, enumerable: true, configurable: true },    
    length: { value: 3, writable: true, enumerable: false, configurable: false }
  }
  */
  ```

  ```javascript
  const arr = [
    "string",
    10,
    true,
    null,
    undefined,
    NaN,
    Infinity,
    [],
    {},
    function () {},
  ];
  ```

- 자바스크립트 배열은 해시 테이블로 구현된 객체이다.

  - 일반적인 배열에 비해 인덱스로 요소에 접근하는 경우 상대적으로 느리다.
  - 일반적인 배열에 비해 특정 요소를 검색하거나 삽입 또는 삭제하는 경우 상대적으로 빠르다.
    - 왜? 해시니까!

- length 프로퍼티

  - 현재 값보다 작은 값을 할당하면 배열의 길이가 줄어든다.

    ```javascript
    const arr = [1, 2, 3, 4, 5];
    arr.length = 3;
    console.log(arr); // [1, 2, 3]
    ```

  - 현재 값보다 큰 값을 할당하면 length 프로퍼티의 값은 변경되지만 실제 배열의 길이가 늘어나지는 않는다.

    ```javascript
    const arr = [1, 2, 3, 4, 5];
    arr.length = 10;
    console.log(arr); // [ 1, 2, 3, 4, 5, <5 empty items> ]
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      // 1 2 3 4 5 undefined undefined undefined undefined undefined
    }
    ```

- 배열 생성

  - Array 생성자 함수

    - 전달된 인수가 1개이고 숫자인 경우 length 프로퍼티 값이 인수인 배열을 생성한다.

      ```javascript
      const arr = new Array(10);
      console.log(arr); // [ <10 empty items> ]
      console.log(arr.length); // 10
      ```

    - 인수가 2개 이상이거나 숫자가 아닌 경우 인수를 요소로 갖는 배열을 생성한다.

      ```javascript
      const arr = new Array(1, 2, 3);
      console.log(arr); // [1, 2, 3]
      console.log(arr.length); // 3
      ```

  - `Array.of`

    - 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.

      ```javascript
      Array.of(1); // [1]
      Array.of(1, 2, 3); // [1, 2, 3]
      Array.of("string"); // ['string']
      ```

  - `Array.from`

    - length가 존재하는 객체를 전달하면 undefined를 요소로 length개 갖는 배열을 생성한다.

      ```javascript
      Array.from({ length: 3 }); // [undefined, undefined, undefined]
      ```

    - 두 번째 인수로 전달한 콜백 함수의 반환값으로 구성된 배열을 생성한다.

      ```javascript
      Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]
      Array.from({ length: 3 }, (_, i) => _); // [undefined, undefined, undefined]
      Array.from({ length: 3 }, () => 0); // [0, 0, 0]
      ```

- 배열은 사실 객체이기 때문에 배열의 특정 요소를 삭제하기 위해 delete 연산자를 사용할 수 있다. 이때 배열은 희소 배열이 되며, length 프로퍼티의 값은 변하지 않기 때문에 delete 연산자는 사용하지 않는 것이 좋다. 따라서 배열의 특정 요소를 삭제하려면 .splice 메서드를 사용해야 한다.

  ```javascript
  const arr = [1, 2, 3];

  delete arr[1];
  console.log(arr); // [ 1, <1 empty item>, 3 ]
  console.log(arr.length); // 3
  ```

## 배열 메서드

- `Array.isArray`

  - 전달된 인수가 배열이면 true, 배열이 아니면 false를 반환한다.

    ```javascript
    // true
    Array.isArray([]);
    Array.isArray([1, 2]);
    Array.isArray(new Array());

    // false
    Array.isArray({});
    Array.isArray(null);
    Array.isArray(10);
    ```

- `Array.prototype.indexOf`

  - 원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환한다.
  - 전달된 요소와 중복되는 요소가 여러 개 있다면 첫 번째로 검색된 요소의 인덱스를 반환한다.
  - 전달된 요소가 존재하지 않으면 -1을 반환한다.

    ```javascript
    const arr = [1, 2, 2, 3];

    arr.indexOf(1); // 0
    arr.indexOf(2); // 1
    arr.indexOf(4); // -1
    // 두 번째 인수는 검색을 시작할 인덱스다.
    arr.indexOf(2, 2); // 2
    ```

- `Array.prototype.includes`

  - 원본 배열에 인수로 전달된 요소가 존재하면 true, 존재하지 않으면 false를 반환한다.

    ```javascript
    const foods = ["apple", "banana", "orange"];
    if (!foods.includes("orange")) {
      foods.push("orange");
    }

    console.log(foods);
    ```

- `Array.prototype.push`

  - 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다. _원본 배열을 직접 변경한다._

    ```javascript
    const arr = [1, 2];

    let result = arr.push(3);
    console.log(result, arr); // 3 [ 1, 2, 3 ]

    result = arr.push(4, 5);
    console.log(result, arr); // 5 [ 1, 2, 3, 4, 5 ]
    ```

  - 배열의 마지막 요소를 추가하는 다양한 방법들

    ```javascript
    const arr = [1, 2];

    arr[arr.length] = 3;
    console.log(arr); // [ 1, 2, 3 ]
    ```

    ```javascript
    const arr = [1, 2];

    const newArr = [...arr, 3];
    console.log(newArr); // [ 1, 2, 3 ]
    ```

- `Array.prototype.pop`

  - 배열의 마지막 요소를 제거하고 제거한 요소를 반환한다. 원본 배열이 빈 배열이면 undefined를 반환한다. _원본 배열을 직접 변경한다._

    ```javascript
    const arr = [1, 2];

    const result = arr.pop();
    console.log(result, arr); // 2 [ 1 ]
    ```

- `Array.prototype.unshift`

  - 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다. _원본 배열을 직접 변경한다._

    ```javascript
    const arr = [4, 5];

    let result = arr.unshift(3);
    console.log(result, arr); // 3 [ 3, 4, 5 ]

    result = arr.unshift(1, 2);
    console.log(result, arr); // 5 [ 1, 2, 3, 4, 5 ]
    ```

  - 스프레드 문법 사용

    ```javascript
    const arr = [4, 5];

    const newArr = [1, 2, 3, ...arr];
    console.log(newArr); // [ 1, 2, 3, 4, 5 ]
    ```

- `Array.prototype.shift`

  - 첫 번째 요소를 제거하고 제거한 요소를 반환한다. 원본 배열이 빈 배열이면 undefined를 반환한다. _원본 배열을 직접 변경한다._

    ```javascript
    const arr = [1, 2];

    const result = arr.shift();
    console.log(result); // 1
    console.log(arr); // [ 2 ]
    ```

- `Array.prototype.concat`

  - 인수로 전달된 값들을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다. 인수가 배열일 경우 해체하여 새로운 배열의 요소로 추가한다. _원본 배열을 변경하지 않는다._

    ```javascript
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    ```

- `Array.prototype.splice`
- `Array.prototype.slice`
- `Array.prototype.join`
- `Array.prototype.reverse`
- `Array.prototype.fill`
- `Array.prototype.flat`

## 배열 고차 함수

- `Array.prototype.sort`
- `Array.prototype.forEach`
- `Array.prototype.map`
- `Array.prototype.filter`
- `Array.prototype.reduce`

  ```javascript
  const obj = [1, 2, 3, 4];
  const r = obj.reduce((prev, curr) => {
    // 초기값이 없으면
    // 맨 처음에 첫번째 값(1), 두번째 값(2) 들어옴
    console.log(prev, curr);
    return prev + curr;
  });
  ```

  ```javascript
  const obj = [1, 2, 3, 4];
  const r = obj.reduce((prev, curr) => {
    // 초기값이 있으면
    // 맨 처음에 초기값(0), 첫번째 값(1) 들어옴
    console.log(prev, curr);
    return prev + curr;
  }, 0);
  ```

- `Array.prototype.some`
- `Array.prototype.every`
- `Array.prototype.find`
- `Array.prototype.findIndex`
- `Array.prototype.flatMap`
