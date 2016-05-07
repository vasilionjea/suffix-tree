# suffix-tree

A JavaScript implementation of the suffix tree data structure that's compressed with labels. Currently supports only adding to the tree. More info on suffix trees here: https://en.wikipedia.org/wiki/Suffix_tree

### Example
```javascript
// Create instance
var stree = new SuffixTree('bananas');

// JSON tree
JSON.stringify(stree.root);
{
  "label": "",
  "children": {
    "a": {
      "label": "a",
      "children": {
        "s": {"label": "s$", "children": {}},
        "n": {
          "label": "na",
          "children": {
            "s": {"label": "s$", "children": {}},
            "n": {"label": "nas$", "children": {}}
          }
        }
      }
    },
    "s": {"label": "s$", "children": {}},
    "b": {"label": "bananas$", "children": {}},
    "$": {"label": "$", "children": {}},
    "n": {
      "label": "na",
      "children": {
        "s": {"label": "s$", "children": {}},
        "n": {"label": "nas$", "children": {}}
      }
    }
  }
}
```
### Visual tree
<img src="https://github.com/vasilionjea/suffix-tree/blob/master/bananas-suffix-tree.png">
