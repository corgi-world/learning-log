function BinaryTreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function BinaryTree() {
  this._root = null;
}
function BinaryTree(nodes) {
  this._root = nodes[0];
  for (let i = 1; i < nodes.length; i++) {
    const level = Math.floor(i / 2);
    if (i % 2 === 0) {
      nodes[level].left = nodes[i];
    } else {
      nodes[level].right = nodes[i];
    }
  }
}

BinaryTree.prototype.traversePreOrder = function () {
  traversePreOrderHelper(this._root);

  function traversePreOrderHelper(node) {
    if (!node) return;
    console.log(node.value);
    traversePreOrderHelper(node.left);
    traversePreOrderHelper(node.right);
  }
};

BinaryTree.prototype.traverseInOrder = function () {
  traverseInOrderHelper(this._root);

  function traverseInOrderHelper(node) {
    if (!node) return;
    traverseInOrderHelper(node.left);
    console.log(node.value);
    traverseInOrderHelper(node.right);
  }
};

BinaryTree.prototype.traversePostOrder = function () {
  traversePostOrderHelper(this._root);

  function traversePostOrderHelper(node) {
    // if (node.left) traversePostOrderHelper(node.left);
    // if (node.right) traversePostOrderHelper(node.right);
    if (!node) return;
    traversePostOrderHelper(node.left);
    traversePostOrderHelper(node.right);
    console.log(node.value);
  }
};

BinaryTree.prototype.traverseLevelOrder = function () {
  const queue = [];
  queue.push(this._root);

  while (queue.length !== 0) {
    const node = queue.shift();
    console.log(node.value);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
};

// const node42 = new BinaryTreeNode(42);
// const node41 = new BinaryTreeNode(41);
// const node50 = new BinaryTreeNode(50);
// const node10 = new BinaryTreeNode(10);
// const node40 = new BinaryTreeNode(40);
// const node45 = new BinaryTreeNode(45);
// const node75 = new BinaryTreeNode(75);

// const tree = new BinaryTree(node42);
// tree._root = node42;
// tree._root.left = node41;
// tree._root.right = node50;
// tree._root.left.left = node10;
// tree._root.left.right = node40;
// tree._root.right.left = node45;
// tree._root.right.right = node75;

// tree.traverseLevelOrder();

const nodes = [];
nodes.push(new BinaryTreeNode(42));
nodes.push(new BinaryTreeNode(41));
nodes.push(new BinaryTreeNode(50));
nodes.push(new BinaryTreeNode(10));
nodes.push(new BinaryTreeNode(40));
nodes.push(new BinaryTreeNode(45));
nodes.push(new BinaryTreeNode(75));

const tree = new BinaryTree(nodes);
tree.traverseLevelOrder();
