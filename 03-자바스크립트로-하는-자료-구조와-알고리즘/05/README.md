# 배열

- 삽입

  - `.push(element)` 새로운 항목을 배열 끝에 추가한다.

    ```javascript
    var arr = [1, 2, 3, 4];
    arr.push(5); // [1, 2, 3, 4, 5]
    arr.push(7); // [1, 2, 3, 4, 5, 7]
    arr.push(2); // [1, 2, 3, 4, 5, 7, 2]
    ```

- 삭제

  - `.pop()` 마지막 항목을 제거하고 반환한다.
  - `.shift()` 첫 번째 항목을 제거하고 반환한다.

    ```javascript
    var arr = [1, 2, 3, 4];
    var v1 = arr.pop(); // 4, [1, 2, 3]
    var v2 = arr.pop(); // 3, [1, 2]
    var v3 = arr.shift(); // 1, [2]
    var v4 = arr.shift(); // 2, []
    ```

- 반복

  - `for (in)` 배열의 인덱스를 하나씩 호출한다.
  - `for (of)` 배열의 항목을 하나씩 호출한다.

    ```javascript
    var arr = ["a", "b", "c", "d"];
    for (var index in arr) {
      console.log(index); // 0 1 2 3
    }
    for (var index in arr) {
      console.log(arr[index]); // a b c d
    }
    for (var element of arr) {
      console.log(element); // a b c d
    }
    ```

  - `.forEach(function)` 배열의 인덱스와 항목을 하나씩 호출하여 특정 작업을 수행할 수 있다.

    ```javascript
    var arr = ["a", "b", "c", "d"];
    arr.forEach((element, index, org_arr) => {
      console.log(element, index, org_arr);
    });
    ```

- 도움 함수

  - `.slice(begin, end)` 기존의 배열을 수정하지 않고 해당 배열의 일부를 반환한다. 배열의 시작 인덱스와 끝 인덱스를 매개변수로 받으며, 끝 인덱스를 생략하면 해당 배열의 인덱스 최댓값으로 적용된다.

    ```javascript
    var arr = ["a", "b", "c", "d"];
    var v1 = arr.slice(0, 1); // [a]
    var v2 = arr.slice(1, 2); // [b]
    var v3 = arr.slice(2, 4); // [c, d]
    var v4 = arr.slice(1, 4); // [b, c, d]
    var v5 = arr.slice(1); // [b, c, d]
    var new_arr = arr.slice(); // deep copy
    ```

  - `.splice(begin, size, ele1, ele2, ...)` 기존 배열의 항목을 제거한 다음 반환하고 신규 항목을 추가할 수 있다. 세 개의 매개변수 중 첫 번째는 제거 또는 추가할 인덱스를, 두 번째는 제거할 개수를, 세 번째는 추가할 항목이다.

    ```javascript
    var arr1 = ["a", "b", "c", "d"];
    var arr2 = ["a", "b", "c", "d"];
    var arr3 = ["a", "b", "c", "d"];
    var arr4 = ["a", "b", "c", "d"];
    var v1 = arr1.splice(0, 2); // [a, b] , [c, d]
    var v2 = arr2.splice(0, 4); // [a, b, c, d] , []
    var v3 = arr3.splice(1, 0, "B"); // [] , [a, B, b, c, d]
    var v4 = arr4.splice(1, 0, "B", "BB", "BBB"); // [] , [a, B, BB, BBB b, c, d]
    ```

  - `.concat(ele1, ele2, ...)` 기존 배열을 수정하지 않고 매개변수로 받은 항목을 맨 뒤에 추가한 다음, 해당 배열을 반환한다.

    ```javascript
    var arr = ["a", "b"];
    var v = arr.concat("c", "d"); // [a, b, c, d] , [a, b]
    ```

  - `.length 속성` 배열의 크기를 반환한다. 해당 속성을 더 작은 크기로 변경하면 배열에서 항목들이 제거된다.

    ```javascript
    var arr = ["a", "b", "c", "d"];
    arr.length = 2;
    // [a, b]
    ```

  - `... 전개 연산자` 배열의 항목을 모두 푼다.

    ```javascript
    var arr = [1, 2, 3, 4];
    console.log(...arr); // 1 2 3 4
    console.log(arr); // [1, 2, 3, 4]
    Math.max(...arr); // 4
    Math.max(1, 2, 3, 4); // 4
    Math.min(...arr); // 1
    Math.min(1, 2, 3, 4); // 1
    ```

- 함수형 배열 메소드

  - `.map(function)` 기존 배열을 수정하지 않고 매개변수로 전달된 함수 변환을 배열의 모든 항목에 적용한 다음 변환이 적용된 항목들을 포함하는 신규 배열을 반환한다.

    ```javascript
    var arr = [1, 2, 3, 4];
    var new_arr = arr.map((element) => {
      return element * 10;
    });
    console.log(new_arr, arr); // [10, 20, 30, 40] , [1, 2, 3, 4]
    ```

  - `.filter(function)` 기존 배열을 수정하지 않고 매개변수로 전달된 조건을 충족시키는 항목들만 반환한다.

    ```javascript
    var arr = [100, 200, 300, 400, 500];
    var new_arr = arr.filter((element) => {
      return 200 <= element;
    });
    console.log(new_arr, arr); // [200, 300, 400, 500] , [100, 200, 300, 400, 500]
    ```

  - `.reduce(function)` 기존 배열을 수정하지 않고 매개변수로 전달된 변환 함수를 사용해 배열의 모든 항목을 하나의 값으로 결합한다.

    ```javascript
    var arr = [10, 20, 30, 40, 50];
    arr.reduce((prev, current, index, arr) => {
      console.log(prev, current, index);
      // 10 20 1
      // 20 30 2
      // 30 40 3
      // 40 50 4
      return current;
    });

    var sum = arr.reduce((prev, current, index, arr) => {
      return prev + current;
    });
    console.log(sum); // 150
    ```
