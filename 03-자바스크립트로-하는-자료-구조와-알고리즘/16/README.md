# 힙

- 트리와 비슷한 자료 구조이다.
- 최대 힙은 루트 노드가 가장 큰 값을 갖고 각 노드의 값이 자식 노드의 값보다 크다.
- 최소 힙은 루트 노드가 가장 작은 값을 갖고 각 노드의 값이 자식 노드의 값보다 작다.
- O(1) 시간에 가장 큰 값이나 가장 작은 값을 반환할 수 있다.
- 이진 힙 배열 인덱스 구조

  |    노드     |   인덱스   |
  | :---------: | :--------: |
  |    자신     |     N      |
  |    부모     | (N-1) / 2  |
  |  왼쪽 자식  | (N\*2) + 1 |
  | 오른쪽 자식 | (N\*2) + 2 |

- add

  ```javascript
  MinHeap.prototype.add = function (item) {
    this.items[this.items.length] = item;
    this.bubbleUp();
  };
  MinHeap.prototype.bubbleUp = function () {
    let index = this.items.length - 1;
    while (this.parent(index) > this.items[index]) {
      this.swap(this.parentIndex(index), index);
      index = this.parentIndex(index);
    }
  };
  ```

- poll

  ```javascript
  MinHeap.prototype.poll = function () {
    const item = this.items[0];
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.bubbleDown();
    return item;
  };
  MinHeap.prototype.bubbleDown = function () {
    let index = 0;
    while (
      this.leftChild(index) < this.items[index] ||
      this.rightChild(index) < this.items[index]
    ) {
      // 최소 힙 기준으로 왼쪽, 오른쪽 자식 중에 작은 값을 그냥 위로 올려!
      let smallerIndex = this.leftChildIndex(index);
      if (this.rightChild(index) < this.items[smallerIndex]) {
        smallerIndex = this.rightChildIndex(index);
      }
      this.swap(smallerIndex, index);
      index = smallerIndex;
    }
  };
  ```

- 힙 정렬 : 힙이 빈 상태가 될 때까지 힙에 대해 .poll()을 호출하면서 꺼낸 객체를 저장하기만 하면 된다.
  - 오름차순 정렬 (최소 힙)
  - 내림차순 정렬 (최대 힙)
