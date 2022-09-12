//creates node obj
const NodeFactory = (data) => {
  return {
    data: data,
    left: null,
    right: null,
  };
};
//takes in array, builds a binary tree
const Tree = (arr) => {
  const buildTree = (arr) => {
    if (arr.length === 0) return null;
    const removeDuplicate = (arr) => {
      return arr.filter((item, index) => arr.indexOf(item) === index);
    };
    let duplicateFreeArr = removeDuplicate(arr);
    //gives tree a "clean" array sorted, and free of duplicates
    const cleanArr = duplicateFreeArr.sort(function (a, b) {
      return a - b;
    });
    //creates a new node object for middle index
    const mid = Math.floor(cleanArr.length / 2);
    const newNode = NodeFactory(cleanArr[mid]);
    //splits new node into 2 parts
    newNode.left = buildTree(cleanArr.slice(0, mid));
    newNode.right = buildTree(cleanArr.slice(mid + 1));
    return newNode;
  };
  //will node at the appropriate position on the tree based on its value
  function insertNode(data, current = root) {
    if (current === null) return NodeFactory(data);
    if (current.data == data) return;
    if (data < current.data) {
      current.left = insertNode(data, current.left);
    } else if (data > current.data) {
      current.right = insertNode(data, current.right);
    }
    return current;
  }
  //calls sels if k is greater or less than root.data
  function deleteNode(root, k) {
    if (root.data == null) return root;
    if (root.data > k) {
      root.left = deleteNode(root.left, k);
      return root;
    } else if (root.data < k) {
      root.right = deleteNode(root.right, k);
      return root;
    }

    if (root.left == null) {
      let temp = root.right;
      return temp;
    } else if (root.right == null) {
      let temp = root.left;
      return temp;
    } else {
      let succParent = root;

      let succ = root.right;

      while (succ.left != null) {
        succParent = succ;
        succ = succ.left;
      }
      if (succParent != root) succParent.left = succ.right;
      else succParent.right = succ.right;
      root.data = succ.data;
      return root;
    }
  }
  function find(root, value) {
    if (root.data === null) {
      console.log('Not found');
    }
    if (root.data === value) {
      return root;
    }
    if (root.data < value) {
      root = find(root.right, value);
      return root;
    } else if (root.data > value) {
      root = find(root.left, value);
      return root;
    }
    return root;
  }

  function height(root) {
    if (root == null) return 0;
    else {
      let lheight = height(root.left);
      let rheight = height(root.right);
      if (lheight > rheight) return lheight + 1;
      else return rheight + 1;
    }
  }

  let levelArray = [];
  const createlevelArray = (num) => {
    levelArray.push(num);
  };

  function printCurrentLevel(root = BT.root, level) {
    if (root == null) return levelArray;
    if (level == 1) createlevelArray(root.data);
    else if (level > 1) {
      printCurrentLevel(root.left, level - 1);
      printCurrentLevel(root.right, level - 1);
    }
  }

  function printLevelOrder(root) {
    let h = height(root);
    let i;
    for (i = 1; i <= h; i++) printCurrentLevel(root, i);
  }

  let inOrderArr = [];
  function inOrder(root) {
    if (root != null) {
      inOrder(root.left);
      inOrderArr.push(root.data);
      inOrder(root.right);
    }
    return inOrderArr;
  }

  let preOrderArr = [];
  function preOrder(root) {
    if (root != null) {
      preOrderArr.push(root.data);
      preOrder(root.left);
      preOrder(root.right);
    }
    return preOrderArr;
  }
  let postOrderArr = [];
  function postOrder(root) {
    if (root != null) {
      postOrder(root.left);
      postOrder(root.right);
      postOrderArr.push(root.data);
    }
    return postOrderArr;
  }
  function findDepth(root, x) {
    if (root == null) return -1;

    let dist = -1;

    if (
      root.data == x ||
      (dist = findDepth(root.left, x)) >= 0 ||
      (dist = findDepth(root.right, x)) >= 0
    )
      return dist + 1;

    return dist;
  }
  const isBalanced = (root = BT.root) => {
    if (root === null) return true;
    if (
      Math.abs(height(root.left) - height(root.right)) <= 1 &&
      isBalanced(root.left) === true &&
      isBalanced(root.right) === true
    ) {
      return true;
    }
    return false;
  };

  const rebalance = (root = BT.root) => {
    BT.root = buildTree(inOrder(root));
  };

  let root = null || buildTree(arr);

  return {
    levelArray,
    root,
    insertNode,
    deleteNode,
    find,
    height,
    printCurrentLevel,
    printLevelOrder,
    isBalanced,
    findDepth,
    inOrder,
    preOrder,
    postOrder,
    rebalance,
  };
};

let BT = Tree([1, 7, 4, 23, 8, 9, 4, 3, 22, 5, 7, 9, 67, 6345, 324]);

console.log(BT.isBalanced());

BT.printLevelOrder(BT.root);
console.log(BT.levelArray);

BT.insertNode(43, BT.root);
BT.insertNode(41, BT.root);
BT.insertNode(90, BT.root);
console.log(BT.isBalanced());
BT.rebalance(BT.root);
console.log(BT.isBalanced());

console.log(BT.preOrder(BT.root));
console.log(BT.postOrder(BT.root));
console.log(BT.inOrder(BT.root));
