function Heap() {
  this.items = [];
}

Heap.prototype.swap = function (index1, index2) {
  const temp = this.items[index1];
  this.items[index1] = this.items[index2];
  this.items[index2] = temp;
};
Heap.prototype.parentIndex = function (index) {
  return Math.floor((index - 1) / 2);
};
Heap.prototype.leftChildIndex = function (index) {
  return Math.floor(index * 1 + 1);
};
Heap.prototype.rightChildIndex = function (index) {
  return Math.floor(index * 1 + 2);
};
Heap.prototype.parent = function (index) {
  return this.items[this.parentIndex(index)];
};
Heap.prototype.leftChild = function (index) {
  return this.items[this.leftChildIndex(index)];
};
Heap.prototype.rightChild = function (index) {
  return this.items[this.rightChildIndex(index)];
};
Heap.prototype.peek = function () {
  return this.items[0];
};

function MinHeap() {
  this.items = [];
}
MinHeap.prototype = Object.create(Heap.prototype);

/*
  책에는 bubbleup, down 조건문 앞에
  this.leftChild(index) &&
  this.rightChild(index) &&
  이런식의 예외처리가 있는데
  어차피 undefiend < number는 false라 없어도 될 듯?
*/

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

MinHeap.prototype.sort = function () {
  const length = this.items.length;
  const sortedArr = [];
  for (let i = 0; i < length; i++) {
    sortedArr.push(this.poll());
  }
  return sortedArr;
};

const m_heap = new MinHeap();
m_heap.add(100);
m_heap.add(19);
m_heap.add(36);
m_heap.add(17);
m_heap.add(3);
m_heap.add(25);
m_heap.add(1);
m_heap.add(2);
m_heap.add(7);

console.log(m_heap.sort());

// console.log(m_heap.poll());
// console.log(m_heap.poll());
// console.log(m_heap.poll());
// console.log(m_heap.poll());
// console.log(m_heap.poll());
