# 연결 리스트

- 단일 연결 리스트

  - 각 노드가 다음 노드에 대한 참조를 가지고 있는 자료구조이다.
  - 노드는 data와 next라는 속성이 있다.
  - data는 노드의 값을 저장하고 next는 다음 노드에 대한 포인터를 저장한다.

- 단일 연결 리스트 (Singly Linked List) 구현

  - 뼈대

    ```javascript
    function Node(data) {
      this.data = data;
      this.next = null;
    }
    function SLL() {
      this.head = null;
      this.size = 0;
    }
    SLL.prototype.isEmpty = function () {
      return this.size == 0;
    };
    ```

  - 삽입 : 단일 연결 리스트 맨 앞에 삽입한다. 이 때 새로 삽입된 노드가 head가 되며, 기존의 헤드는 삽입된 노드의 next가 된다. O(1)

    ```javascript
    SLL.prototype.insert = function (data) {
      if (this.head === null) {
        this.head = new Node(data);
      } else {
        var temp = this.head;
        this.head = new Node(data);
        this.head.next = temp;
      }
      this.size++;
    };
    ```

  - 순회 : head부터 next가 null일 때 까지 반복한다. O(n)

    ```javascript
    SLL.prototype.print = function () {
      var current = this.head;
      while (current) {
        console.log(current.data);
        current = current.next;
      }
      console.log(current);
    };

    var sll = new SLL();
    sll.insert(1); // 1 >> null
    sll.insert(3); // 3 >> 1 >> null
    sll.insert(2); // 2 >> 3 >> 1 >> null
    sll.insert(9); // 9 >> 2 >> 3 >> 1 >> null
    sll.print(); // 9 2 3 1 null
    ```

  - 값에 의한 삭제 : 가장 먼저 삭제하려는 데이터가 위치한 노드를 찾는다. 해당 노드가 head인지, 중간에 있는지, 가장 뒤에 있는지에 따라 다른 동작을 수행한다. O(n)

    ```javascript
    SLL.prototype.remove = function (data) {
      if (this.head.data === data) {
        // head를 두 번째에 위치한 노드로 변경해준다.
        this.head = this.head.next;
        this.size--;
        return;
      }
      var prev = this.head;
      var current = prev.next;
      while (current) {
        if (current.data === data) {
          const isTail = current.next === null;
          if (isTail) {
            // 맨 마지막에 위치한 노드일 경우
            // 삭제할 노드를 가르키는 노드가 없게 한다.
            prev.next = null;
          } else {
            // 이전 노드를 바로 다음 노드에 연결하여
            // 삭제할 노드를 가르키는 노드가 없게 한다.
            prev.next = current.next;
          }
          this.size--;
          break;
        }
        prev = prev.next;
        current = current.next;
      }
    };
    ```

  - 헤드 항목 삭제 : O(1)

    ```javascript
    SLL.prototype.deleteHead = function () {
      var data = null;
      if (this.head !== null) {
        data = this.head.data;
        this.head = this.head.next;
        this.size--;
      }
      return data;
    };
    ```

- 이중 연결 리스트

  - 노드의 prev라는 속성으로 이전 노드를 참조할 수 있다.
  - 저장공간이 단일에 비해 2배가 필요하지만, 양방향 탐색이 가능하다.

- 이중 연결 리스트 (Doubly Linked List) 구현

  - 뼈대

    ```javascript
    function Node(data) {
      this.data = data;
      this.prev = null;
      this.next = null;
    }
    function DLL() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }
    DLL.prototype.isEmpty = function () {
      return this.size == 0;
    };
    ```

  - 헤드에 삽입 : 단일 연결 리스트 삽입과 유사하지만, prev 포인터를 갱신해야 한다. O(1)

    ```javascript
    DLL.prototype.insertHead = function (data) {
      if (this.head === null) {
        this.head = new Node(data);
        this.tail = this.head;
      } else {
        var temp = new Node(data);
        this.head.prev = temp;
        temp.next = this.head;
        this.head = temp;
      }
      this.size++;
    };
    ```

  - 테일에 삽입 : O(1)

    ```javascript
    DLL.prototype.insertTail = function (data) {
      if (this.tail === null) {
        this.tail = new Node(data);
        this.head = this.tail;
      } else {
        var temp = new Node(data);
        temp.prev = this.tail;
        this.tail.next = temp;
        this.tail = temp;
      }
      this.size++;
    };
    ```

  - 순회 : head부터 next가 null일 때 까지 혹은 tail에서 prev가 null일 때 까지 반복한다. O(n)

    ```javascript
    DLL.prototype.printStartingHead = function () {
      var current = this.head;
      while (current) {
        console.log(current.data);
        current = current.next;
      }
      console.log(current);
    };
    DLL.prototype.printStartingTail = function () {
      var current = this.tail;
      while (current) {
        console.log(current.data);
        current = current.prev;
      }
      console.log(current);
    };

    var dll = new DLL();
    dll.insertHead(1); // 1 >> null
    dll.insertHead(2); // 2 >> 1 >> null
    dll.insertHead(3); // 3 >> 2 >> 1 >> null
    dll.printStartingHead(); // 3 2 1 null
    dll.insertTail(4); // 3 >> 2 >> 1 >> 4 >> null
    dll.insertTail(5); // 3 >> 2 >> 1 >> 4 >> 5 >> null
    dll.insertTail(6); // 3 >> 2 >> 1 >> 4 >> 5 >> 6 >> null
    dll.printStartingHead(); // 3 2 1 4 5 6 null
    dll.printStartingTail(); // 6 5 4 1 2 3 null
    ```

  - 값에 의한 삭제 : 가장 먼저 삭제하려는 데이터가 위치한 노드를 찾는다. 해당 노드가 head인지, 중간에 있는지, tail인지에 따라 다른 동작을 수행한다. O(n)

    ```javascript
    DLL.prototype.remove = function (data) {
      if (this.head.data === data) {
        // head일 경우
        if (this.size === 1) {
          this.head = null;
          this.tail = null;
        } else {
          this.head = this.head.next;
          this.head.prev = null;
        }
        this.size--;
        return;
      }
      var prev = this.head;
      var current = this.head.next;
      while (current) {
        if (current.data === data) {
          const isTail = current.next === null;
          if (isTail) {
            // tail일 경우
            this.tail = prev;
            this.tail.next = null;
          } else {
            var next = current.next;
            prev.next = next;
            next.prev = prev;
          }
          this.size--;
          break;
        }
        prev = prev.next;
        current = current.next;
      }
    };
    ```
