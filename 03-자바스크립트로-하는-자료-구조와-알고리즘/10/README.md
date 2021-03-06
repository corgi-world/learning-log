# 검색과 정렬

- 이진 검색

  - 정렬된 배열에 사용할 수 있는 검색 알고리즘이다. 검색을 원하는 값이 배열의 중간 값과 비교하여 중간 값보다 크면 중간 값 이후의 배열을, 작다면 중간 값 이전의 배열만을 검색한다. 이 과정을 검색이 완료될 때 까지 반복한다.

  - O(log<sub>2</sub>n)

  ```javascript
  function binarySearch(arr, n, l, r) {
    if (r < l) {
      return -1;
    }
    const mid = Math.floor((l + r) / 2);
    if (n == arr[mid]) return mid;
    else if (n < arr[mid]) {
      return binarySearch(arr, n, l, mid - 1);
    } else {
      return binarySearch(arr, n, mid + 1, r);
    }
  }
  ```

- 거품 정렬

  - 배열의 맨 앞 부터 두 인덱스 씩 비교하여 더 큰 값을 뒤로 보낸다. 이 과정을 각 반복문 당 배열의 길이만큼, 이중 반복문으로 반복한다.

  - O(n<sup>2</sup>)

    ```javascript
    function bubbleSort(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
          if (arr[j + 1] < arr[j]) {
            var swap = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = swap;
          }
        }
      }
      return arr;
    }
    ```

- 선택 정렬

  - 배열 중 가장 작은 값을 찾아 정렬 되지 않은 맨 앞 인덱스와 교환환다. 이 과정을 각 반복문 당 배열의 길이만큼, 이중 반복문으로 반복한다.

  - O(n<sup>2</sup>)

    ```javascript
    function selectionSort(arr) {
      for (var i = 0; i < arr.length - 1; i++) {
        min = i;
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[j] < arr[min]) {
            min = j;
          }
        }
        var swap = arr[min];
        arr[min] = arr[i];
        arr[i] = swap;
      }
      return arr;
    }
    ```

- 삽입 정렬

  - 배열의 1번 인덱스부터 앞 인덱스와 비교해서 작으면 순서를 변경한다.

  - O(n<sup>2</sup>)

    ```javascript
    function insertionSort(arr) {
      for (var i = 1; i < arr.length; i++) {
        var j = i;
        while (0 <= j) {
          if (arr[j] < arr[j - 1]) {
            var swap = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = swap;
          } else {
            break;
          }
          j -= 1;
        }
      }
      return arr;
    }
    ```

- 빠른 정렬

  - 가장 오른쪽 원소를 피봇으로 정한 후 가장 왼쪽에서 오른쪽 인덱스로, 피봇 이전부터 가장 왼쪽 인덱스로 이동하며 각 인덱스의 값이 피봇의 값보다 크거나(왼→오) 작으면(오→왼) 각 인덱스의 값을 서로 변경한다. 이 방법을 서로 교차할 때까지 반복한다. 교차하면 (왼→오)의 값과 피봇의 값을 서로 변경한다. 그 후 피봇 인덱스를 기준으로 배열을 둘로 나눠 각각의 배열을 다시 빠른 정렬한다.

  - O(nlog<sub>2</sub>n)

    ```javascript
    function quick(arr, l, r) {
      if (l < r) {
        var pivot = arr[r];
        var i = l;
        var j = r;
        while (true) {
          while (arr[l] < pivot && l < j) l += 1;
          while (arr[r] > pivot && 0 < r) r -= 1;
          if (r <= l) {
            break;
          }
          var swap = arr[l];
          arr[l] = arr[r];
          arr[r] = swap;
        }
        var swap = arr[l];
        arr[l] = arr[r];
        arr[r] = swap;

        quick(arr, i, l - 1);
        quick(arr, l + 1, j);

        return arr;
      }
    }
    ```

- 합병 정렬

  - 배열의 길이가 1이 될 때 까지 둘로 나누고 가장 마지막으로 나눠진 배열을 합치면서 정렬한다.

  - O(nlog<sub>2</sub>n)

    ```javascript
    function merge(left, right) {
      const result = [];
      if (left !== undefined && right !== undefined) {
        while (0 < left.length && 0 < right.length) {
          left[0] < right[0] ? result.push(left.shift()) : result.push(right.shift());
        }
      }
      if (0 < left?.length) {
        result.push(...left);
      }
      if (0 < right?.length) {
        result.push(...right);
      }
      return result;
    }
    function partition(arr) {
      if (arr.length === 1) return arr;
      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);

      return merge(partition(left), partition(right));
    }
    ```

- 자바스크립트 내장 정렬

  ```javascript
  var arr = [12, 3, 4, 2, 1, 34, 23];

  // 기본값은 알파벳 정렬
  arr.sort(); // [ 1, 12, 2, 23, 3, 34, 4 ]

  arr.sort((a, b) => a - b); // [ 1, 2, 3, 4, 12, 23, 34 ]
  arr.sort((a, b) => b - a); // [ 34, 23, 12, 4, 3, 2, 1 ]
  ```
