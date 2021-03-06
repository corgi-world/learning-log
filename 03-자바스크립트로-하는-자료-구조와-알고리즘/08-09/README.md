# 재귀

- 피보나치 수열

  ```javascript
  function getNthFibo(n) {
    if (n <= 1) return n;
    else {
      return getNthFibo(n - 1) + getNthFibo(n - 2);
    }
  }
  ```

- 파스칼의 삼각형

  ```javascript
  function pascalTriangle(row, col) {
    if (col == 0) {
      return 1;
    } else if (row == 0) {
      return 0;
    } else {
      return pascalTriangle(row - 1, col - 1) + pascalTriangle(row - 1, col);
    }
  }
  ```

- 재귀 호출 스택 메모리

  - 각 재귀 호출은 콜 스택으로 인해 기저 경우가 해결될 때 까지 메모리에 저장된다. 이 때문에 기저 경우가 잘못 구현된 경우에는 허용된 메모리를 넘어 스택 오버플로 오류가 발생할 수 있다.

# 집합

- 집합은 항목이 유일한지 확인하는 데 있어 강력한 자료구조

- 집합의 구현은 해시 테이블의 구현을 기초로 하기 때문에 항목을 확인, 추가, 삭제 하는데 O(1) 상수 시간밖에 소요되지 않는다.

- 삽입

  - `.add(element)` 이미 존재하는 항목은 추가되지 않는다.

    ```javascript
    var example = new Set();
    example.add(1);
    example.add(1);
    example.add(2);
    console.log(example); // Set { 1, 2 }
    ```

- 삭제

  - `.delete(element)` 항목을 삭제한 뒤 삭제됐다면 true, 해당 항목이 존재하지 않으면 false를 반환한다.

    ```javascript
    var example = new Set();
    example.add(1);
    example.delete(1); // true
    example.add(2);
    console.log(example); // Set { 2 }
    ```

- 포함

  - `.has(element)` 해당 항목이 집합 내에 존재하는지 확인한다.

    ```javascript
    var example = new Set();
    example.add(1);
    example.has(1); // true
    example.delete(1);
    example.has(1); // false
    ```

- 유틸리티 함수

  - 교집합

    ```javascript
    function intersectSets(setA, setB) {
      var intersection = new Set();
      for (elem of setA) {
        if (setB.has(elem)) {
          intersection.add(elem);
        }
      }
      return intersection;
    }
    ```

  - 합집합

    ```javascript
    function unionSet(setA, setB) {
      var union = new Set(setA);
      for (var elem of setB) {
        union.add(elem);
      }
      return union;
    }
    ```

  - 차집합

    ```javascript
    function differenceSet(setA, setB) {
      var difference = new Set(setA);
      for (var elem of setB) {
        difference.delete(elem);
      }
      return difference;
    }
    ```

  - 상위 집합 여부 확인

    ```javascript
    function isSuperSet(setA, subset) {
      for (var elem of subset) {
        if (!setA.has(elem)) {
          return false;
        }
      }
      return true;
    }
    ```
