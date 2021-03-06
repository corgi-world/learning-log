# 스택과 큐

- 스택

  - 마지막에 삽입된 항목만을 제거하고 접근할 수 있다.
  - 후입선출 (Last In First Out)
  - 삽입과 삭제의 시간 복잡도는 상수 시간 O(1)
  - 맨 앞에 추가된 항목을 접근 하기 위해서는 이후에 추가된 항목들을 제거해야 한다.

- 스택 구현

  - 뼈대

    ```javascript
    function Stack(array) {
      this.array = [];
      if (array) this.array = array;
    }

    Stack.prototype.getBuffer = function () {
      return this.array.slice();
    };
    Stack.prototype.isEmpty = function () {
      return this.array.length == 0;
    };

    var stack = new Stack();
    ```

  - push

    ```javascript
    Stack.prototype.push = function (value) {
      this.array.push(value);
    };

    stack.push(1); // [1]
    stack.push(2); // [1, 2]
    stack.push(3); // [1, 2, 3]
    ```

  - peek : 마지막에 추가된 항목을 제거하지 않고 반환한다.

    ```javascript
    Stack.prototype.peek = function () {
      /*
      배열 자료구조 사용해서 인덱스 접근해도 되나?
      뒤에 접근, 검색 부분은 배열 활용하지 않고
      원본 복사해서 두고 복사본 pop 여러번 하던데...
      return copiedStack.pop(); // 이렇게 해야 되나?
      */
      return this.array[this.array.length - 1];
    };

    stack.peek(); // return 3 [1, 2, 3]
    stack.peek(); // return 3 [1, 2, 3]
    stack.peek(); // return 3 [1, 2, 3]
    ```

  - pop

    ```javascript
    Stack.prototype.pop = function () {
      return this.array.pop();
    };

    stack.pop(); // return 3 [1, 2]
    stack.pop(); // return 2 [1]
    stack.pop(); // return 1 []
    ```

  - 접근 : n번째 노드에 접근하기 위해서는 pop을 n번 호출해야 한다. O(n)

    ```javascript
    // n은 뒤에서부터
    Stack.prototype.accessNthTopNode = function (stack, n) {
      var buffer = stack.getBuffer();
      var bufferStack = new Stack(buffer);
      while (--n !== 0) {
        bufferStack.pop();
      }
      return bufferStack.pop();
    };

    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.accessNthTopNode(stack, 1); // return 3 [1, 2, 3]
    ```

  - 검색 : 매개변수로 받은 value와 같은 값을 가진 value가 pop될 때 까지 pop한다. O(n)

    ```javascript
    Stack.prototype.includes = function (stack, value) {
      var buffer = stack.getBuffer();
      var bufferStack = new Stack(buffer);
      while (!bufferStack.isEmpty()) {
        if (bufferStack.pop() == value) {
          return true;
        }
      }
      return false;
    };

    stack.includes(stack, 2); // true
    stack.includes(stack, 5); // false
    ```

- 큐

  - 첫 번째로 추가된 항목만을 제거할 수 있다.
  - 선입선출 (First In First Out)
  - 마지막에 추가된 항목에 접근하기 위해서는 이전에 추가된 항목들을 제거해야 한다.

- 큐 구현

  - 뼈대

    ```javascript
    function Queue(array) {
      this.array = [];
      if (array) this.array = array;
    }

    Queue.prototype.getBuffer = function () {
      return this.array.slice();
    };
    Queue.prototype.isEmpty = function () {
      return this.array.length == 0;
    };

    var queue = new Queue();
    ```

  - enqueue : O(1)

    ```javascript
    Queue.prototype.enqueue = function (value) {
      this.array.push(value);
    };
    ```

  - dequeue : shift 메소드는 배열의 첫 번째 항목을 제거한 뒤 이후 인덱스를 앞으로 당겨오는 과정에서 n번의 작업이 발생한다. 이로 인해 시간 복잡도는 O(n)이지만, 배열이 아닌 연결 리스트로 구현할 경우 O(1)로 줄일 수 있다.

    ```javascript
    Queue.prototype.dequeue = function () {
      return this.array.shift();
    };

    queue.enqueue(1); // [1]
    queue.enqueue(2); // [1, 2]
    queue.enqueue(3); // [1, 2, 3]

    queue.dequeue(); // return 1 [2, 3]
    queue.dequeue(); // return 2 [3]
    queue.dequeue(); // return 3 []
    ```

  - 접근 : n번째 노드에 접근하기 위해서는 dequeue를 n번 호출해야 한다. O(n)

    ```javascript
    // n은 앞에서부터
    Queue.prototype.accessNthTopNode = function (queue, n) {
      var buffer = queue.getBuffer();
      var bufferQueue = new Queue(buffer);
      while (--n !== 0) {
        bufferQueue.dequeue();
      }
      return bufferQueue.dequeue();
    };

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    queue.accessNthTopNode(queue, 1); // return 1 [1, 2, 3]
    ```

  - 검색 : 매개변수로 받은 value와 같은 값을 가진 value가 dequeue될 때 까지 dequeue한다. O(n)

    ```javascript
    Queue.prototype.includes = function (queue, value) {
      var buffer = queue.getBuffer();
      var bufferQueue = new Queue(buffer);
      while (!bufferQueue.isEmpty()) {
        if (bufferQueue.dequeue() == value) {
          return true;
        }
      }
      return false;
    };

    queue.includes(queue, 1); // true
    queue.includes(queue, 5); // false
    ```
