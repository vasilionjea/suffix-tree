/**
 * Creates a suffix tree, without suffix links, from a string in 
 * quadratic time and linear space.
 *
 * Online course: https://www.youtube.com/watch?v=hLsrPsFHPcQ
 */
(function(global) {
  /**
   * Utils
   */
  function _normalizeWord(word) {
    return word.toLowerCase();
  }

  function _getSuffixes(word) {
    var suffixes = [],
      i = 0,
      normalizedWord = _normalizeWord(word);

    for(i; i < normalizedWord.length; i += 1) {
      suffixes.push(normalizedWord.slice(i));
    }

    return suffixes;
  }

  function _createNode(label) {
    return {
      label: (label || ''), // label on path leading to this node
      children: {}  // outgoing edges; maps characters to nodes    
    };
  }

  /**
   * SuffixTree
   */
  function SuffixTree(str) {
    str += '$'; // completes suffix

    this._addRoot(str);
    this._addSuffixes(str);
  }

  SuffixTree.prototype = {
    constructor: SuffixTree,

    // Create root node
    _addRoot: function(str) {
      this.root = _createNode();
      this.root.children[str[0]] = _createNode(str);
    },

    // Add all suffixes from longest to shortest
    _addSuffixes: function(str) {
      var self = this;

      _getSuffixes(str.slice(1)).forEach(function(suffix, idx) {
        self._add(suffix, idx);
      });
    },

    _add: function(suffix, idx) {
      // For each suffix start at root
      var currentNode = this.root;
      var i = 0;

      // Label related
      var child, label, k;

      // Adding related
      var cExist, cNew, mid;

      // Add each suffix's char to tree
      while(i < suffix.length) {
        if(currentNode.children[suffix[i]]) {
          child = currentNode.children[suffix[i]];
          label = child.label;

          // Move one char over.
          k = i + 1;

          // Walk along the branch until we exhaust its label or until we mismatch.
          // First `k-i` starts on the `label[1]` and then increases when we match.
          // 
          // Check if the rest of the word matches this child's label.
          while(k-i < label.length && suffix[k] == label[k-i]) {
            k += 1
          }

          // If rest or some of the word matches all of the label,
          // we set the current node to the existing child and we 
          // continue down the rest of the word or complete it.
          if(k-i === label.length) {
            currentNode = child;
            i = k; // continues down the rest of the word or starts new suffix
          } else {
            // We fell off in middle of edge.
            cExist = label[k-i];
            cNew = suffix[k];

            // Create "mid": a new node bisecting edge.
            mid = _createNode(label.slice(0, k-i));
            mid.children[cNew] = _createNode(suffix.slice(k));

            // Original child becomes mid’s child.
            mid.children[cExist] = child;

            // Original child’s label is shortened.
            child.label = label.slice(k-i);

            // mid becomes new child of original parent
            currentNode.children[suffix[i]] = mid;
          }
        } else {
          // Fell off tree at a node: make new edge hanging off it.
          currentNode.children[suffix[i]] = _createNode(suffix);
        }
      }
    }
  };

  global.SuffixTree = SuffixTree;
}(this));
