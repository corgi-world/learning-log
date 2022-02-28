function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this._root = null;
}

BinarySearchTree.prototype.traverseLevelOrder = function () {
  if (!this._root) {
    console.log("비어있음");
    return;
  }

  const queue = [];
  queue.push(this._root);

  while (queue.length !== 0) {
    const node = queue.shift();
    console.log(node.value);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
};

BinarySearchTree.prototype.insert = function (value) {
  const newNode = new Node(value);

  if (this._root === null) {
    this._root = newNode;
  } else {
    let current = this._root;
    while (true) {
      if (current.value < value) {
        // value가 더 크면 오른쪽으로!
        if (current.right === null) {
          // 오른쪽 자식이 비어있으면 여기에 삽입하면 됨
          current.right = newNode;
          break;
        } else {
          current = current.right;
        }
      } else if (current.value > value) {
        // value가 더 작으면 왼쪽으로
        if (current.left === null) {
          // 왼쪽 자식이 비어있으면 여기에 삽입하면 됨
          current.left = newNode;
          break;
        } else {
          current = current.left;
        }
      } else {
        break;
      }
    }
  }
};

BinarySearchTree.prototype.remove = function (value) {
  this._root = _remove(this._root, value);

  function _remove(root, value) {
    if (!root) {
      return null;
    }

    if (root.value < value) {
      // 오른쪽으로 순회
      root.right = _remove(root.right, value);
      return root;
    } else if (root.value > value) {
      // 왼쪽으로 순회
      root.left = _remove(root.left, value);
      return root;
    } else {
      // 삭제할 값을 찾았을 때!
      if (!root.left && !root.right) {
        // 자식이 없는 노드를 삭제할 때
        return null;
      } else if (!root.left) {
        // 오른쪽 자식만 있는 노드를 삭제할 때
        return root.right;
      } else if (!root.right) {
        // 왼쪽 자식만 있는 노드를 삭제할 때
        return root.left;
      } else {
        // 왼쪽, 오른쪽 모두 자식이 있는 노드를 삭제할 때

        // 왼쪽 하위 트리의 최대값이나
        // 오른쪽 하위 트리의 최소값을 찾아
        // 삭제할 노드를 대체해야 한다.
        const temp = findMin(root.right);
        root.value = temp.value;

        // 그 후 대체에 사용한 노드는 중복되니 지워준다.
        root.right = _remove(root.right, temp.value);
        return root;
      }
    }
  }

  function findMin(root) {
    while (root.left) {
      root = root.left;
    }
    return root;
  }
};

BinarySearchTree.prototype.find = function (value) {
  const current = this._root;
  while (current) {
    if (current.value < value) {
      current = current.right;
    } else if (current.value > value) {
      current = current.left;
    } else {
      return true;
    }
  }
  return false;
};

const tree = new BinarySearchTree();
tree.insert(2);
tree.traverseLevelOrder();
console.log(tree.find(2));

tree.remove(2);
tree.traverseLevelOrder();
console.log(tree.find(2));
