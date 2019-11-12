"use strict";
/* eslint max-classes-per-file: ["error", 2] */
var TrieNode = /** @class */ (function () {
    function TrieNode() {
        this.children = new Map();
        this.end = false;
    }
    TrieNode.prototype.setEnd = function (status) {
        if (status === void 0) { status = true; }
        this.end = status;
    };
    TrieNode.prototype.isEnd = function () {
        return this.end;
    };
    return TrieNode;
}());
var Trie = /** @class */ (function () {
    function Trie() {
        this.root = new TrieNode();
    }
    /**
     * Add a new word to the Trie
     *
     * @param word
     * @param node
     * @returns void
     */
    Trie.prototype.add = function (word, node) {
        if (node === void 0) { node = this.root; }
        if (word.length === 0) {
            node.setEnd();
            return;
        }
        if (!node.children.has(word[0])) {
            node.children.set(word[0], new TrieNode());
        }
        this.add(word.substr(1), node.children.get(word[0]));
    };
    //   delete(word: string, node: TrieNode = this.root): boolean {
    //     return this.remove(word, node, 0);
    //   }
    //   remove(word: string, node: TrieNode, index: number): boolean {
    //     if (!node) {
    //       return false;
    //     }
    //     if (index === word.length) {
    //       if (!node.isEnd()) {
    //         return false;
    //       }
    //       node.setEnd(false);
    //       return node.children.size === 0;
    //     }
    //     let _node: TrieNode | null | undefined = null;
    //     if (!node.children.get(word[index])) {
    //       return false;
    //     }
    //     _node = node.children.get(word[index]);
    //     const shouldRemove = this.remove(word, _node, index + 1);
    //     if (shouldRemove) {
    //       console.log('fooo');
    //       node.children.delete(word[index]);
    //       return node.children.size === 0;
    //     }
    //     return false;
    //   }
    /**
     * Does this prefix exist in this Trie?
     *
     * @param prefix
     * @returns boolean
     */
    Trie.prototype.findPrefix = function (prefix) {
        var _a, _b, _c;
        var node = this.root;
        if (node === undefined) {
            return false;
        }
        var currentPrefix = prefix;
        while (currentPrefix.length > 1) {
            if (!((_a = node) === null || _a === void 0 ? void 0 : _a.children.has(prefix[0]))) {
                return false;
            }
            node = (_b = node) === null || _b === void 0 ? void 0 : _b.children.get(currentPrefix[0]);
            currentPrefix = prefix.substr(1);
        }
        return !!((_c = node) === null || _c === void 0 ? void 0 : _c.children.has(prefix));
    };
    Trie.prototype.find = function (word) {
        var _a, _b, _c, _d, _e;
        var node = this.root;
        if (!node) {
            return -1;
        }
        var currentWord = word;
        var d = 0;
        while (currentWord.length > 1) {
            if (!((_a = node) === null || _a === void 0 ? void 0 : _a.children.has(currentWord[0]))) {
                return -1;
            }
            node = (_b = node) === null || _b === void 0 ? void 0 : _b.children.get(currentWord[0]);
            currentWord = currentWord.substr(1);
            d += 1;
        }
        if (((_c = node) === null || _c === void 0 ? void 0 : _c.children.has(currentWord)) && ((_e = (_d = node) === null || _d === void 0 ? void 0 : _d.children.get(currentWord)) === null || _e === void 0 ? void 0 : _e.isEnd())) {
            return d;
        }
        return -1;
    };
    Trie.prototype.findAll = function (node, string, words) {
        var _this = this;
        if (node === void 0) { node = this.root; }
        if (string === void 0) { string = ''; }
        if (words === void 0) { words = []; }
        if (node.children.size !== 0) {
            /*
            for (const letter of node.children.keys()) {
              this.findAll(node.children.get(letter), string.concat(letter), words);
            } */
            node.children.forEach(function (value, key) {
                _this.findAll(node.children.get(key), string.concat(key), words);
            });
            if (node.isEnd()) {
                words.push(string);
            }
        }
        else {
            if (string.length > 0) {
                words.push(string);
            }
            return words;
        }
        return words;
    };
    Trie.prototype.findWordsFor = function (prefix, node) {
        if (node === void 0) { node = this.root; }
        var _a, _b, _c;
        var originalPrefix = prefix;
        var currentNode = node;
        var currentPrefix = prefix;
        while (prefix.length > 1) {
            if ((_a = currentNode) === null || _a === void 0 ? void 0 : _a.children.has(prefix[0])) {
                currentNode = (_b = currentNode) === null || _b === void 0 ? void 0 : _b.children.get(prefix[0]);
                currentPrefix = currentPrefix.substr(1);
            }
        }
        return this.findAll((_c = node) === null || _c === void 0 ? void 0 : _c.children.get(currentPrefix[0]), originalPrefix);
    };
    return Trie;
}());
var trie = new Trie();
trie.add('fun');
trie.add('fan');
trie.add('fad');
trie.add('fans');
trie.add('fantastic');
console.log(trie.findAll());
// trie.delete('fun');
// trie.delete('fantastic');
console.log(trie.findAll());
console.log(trie);
// process.stdout.write(trie.findWordsFor("fans"));
