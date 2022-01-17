function HashTable(size) {
  this.size = size;
  this.keys = this.initArray(size);
  this.values = this.initArray(size);
  this.limit = 0;
}

HashTable.prototype.put = function (key, value) {
  if (this.limit >= this.size) throw "is full";

  var hashedIndex = this.hash(key);

  // 선형 탐사
  while (this.keys[hashedIndex] != null) {
    hashedIndex++;

    // 이걸 왜 또하나 했는데ㅋㅋㅋ 마지막 인덱스에서 +1 하면 사이즈가 넘는구나
    hashedIndex = hashedIndex % this.size;
  }

  this.keys[hashedIndex] = key;
  this.values[hashedIndex] = value;
  this.limit++;
};

HashTable.prototype.hash = function (key) {
  return key % this.size;
};

HashTable.prototype.initArray = function (size) {
  var array = [];
  for (var i = 0; i < size; i++) {
    array.push(null);
  }
  return array;
};

var h = new HashTable(11);
h.put(7, "hi");
h.put(24, "hello");
h.put(42, "sunny");
h.put(34, "weather");
h.put(18, "wow");
h.put(10, "msw");
h.put(21, "corgi");

console.log(h.keys);
console.log(h.values);
