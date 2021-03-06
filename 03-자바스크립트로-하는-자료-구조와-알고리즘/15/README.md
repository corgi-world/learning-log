# 트리

- 첫 번째이자 가장 상위 노드인 루트 노드부터 자식 노드를 지닌 노드들로 구성된 자료 구조이다.

- 이진 트리 순회 : https://m.blog.naver.com/yms9713/220493653743

  - 전위 순회 (pre-order) (V-L-R)

    ```javascript
    BinaryTree.prototype.traversePreOrder = function () {
      traversePreOrderHelper(this._root);

      function traversePreOrderHelper(node) {
        if (!node) return;
        console.log(node.value);
        traversePreOrderHelper(node.left);
        traversePreOrderHelper(node.right);
      }
    };
    ```

  - 중위 순회 (in-order) (L-V-R)

    ```javascript
    BinaryTree.prototype.traverseInOrder = function () {
      traverseInOrderHelper(this._root);

      function traverseInOrderHelper(node) {
        if (!node) return;
        traverseInOrderHelper(node.left);
        console.log(node.value);
        traverseInOrderHelper(node.right);
      }
    };
    ```

  - 후위 순회 (post-order) (L-R-V)

    ```javascript
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
    ```

  - 단계순위 순회 (breadth first search)

    ```javascript
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
    ```

  - 이진 검색 트리 : 왼쪽 자식이 부모보다 작고 오른쪽 자식이 부모보다 큰 이진 트리

    - 삽입 : 루트 노드와 새 노드의 값을 비교하여 방향(L, R)을 정한 후 순회하여 적절한 위치를 찾은 후 삽입한다.

      ```javascript
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
      ```

    - 삭제 : 삭제할 노드의 자식 개수에 따라 삭제 후 해당 노드를, 해당 노드의 자식으로 대체한다.

      ```javascript
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
      ```

    - 검색 : 왼쪽 자식은 부모보다 항상 작고 오른쪽 자식은 부모보다 항상 크다는 특성을 이용해 검색을 수행한다.

      ```javascript
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
      ```
