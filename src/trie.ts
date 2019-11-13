/* eslint max-classes-per-file: ["error", 2] */

class TrieNode {
  end: boolean;

  children: Map<string, TrieNode> = new Map();

  setEnd(status = true): void {
    this.end = status;
  }

  isEnd(): boolean {
    return this.end;
  }

  constructor() {
    this.end = false;
  }
}

class Trie {
  root: TrieNode = new TrieNode();

  /**
   * Add a new word to the Trie
   *
   * @param word
   * @param node
   * @returns void
   */
  add(word: string, node: TrieNode = this.root): void {
    if (word.length === 0) {
      node.setEnd();
      return;
    }

    if (!node.children.has(word[0])) {
      node.children.set(word[0], new TrieNode());
    }

    this.add(word.substr(1), node.children.get(word[0]));
  }

  /**
   * Remove a word from a Trie
   *
   * @param word
   * @param node
   * @param index
   * @returns boolean
   */
  delete(word: string, node: TrieNode = this.root, index = 0): boolean {
    const currentNode: TrieNode | undefined = node;
    const nextNode: TrieNode | undefined = currentNode.children.get(word[index]);

    if (currentNode === undefined) {
      return false;
    }

    if (index === word.length) {
      if (!currentNode.isEnd()) {
        return false;
      }
      currentNode.setEnd(false);
      return currentNode.children.size === 0;
    }

    if (!nextNode) {
      return false;
    }

    const shouldDelete = this.delete(word, nextNode, index + 1);
    if (shouldDelete) {
      currentNode.children.delete(word[index]);
      return currentNode.children.size === 0;
    }

    return false;
  }

  /**
   * Does this prefix exist in this Trie?
   *
   * @param prefix
   * @returns boolean
   */
  findPrefix(prefix: string): boolean {
    let node: TrieNode | undefined = this.root;
    if (node === undefined) {
      return false;
    }

    let currentPrefix: string = prefix;
    while (currentPrefix.length > 1) {
      if (!node?.children.has(currentPrefix[0])) {
        return false;
      }
      node = node?.children.get(currentPrefix[0]);
      currentPrefix = currentPrefix.substr(1);
    }

    return !!node?.children.has(currentPrefix);
  }

  /**
   * Is this word in the Trie?
   *
   * @param word
   * @returns boolean
   */
  find(word: string): boolean {
    let node: TrieNode | undefined = this.root;
    if (!node) {
      return false;
    }

    let currentWord: string = word;
    while (currentWord.length > 1) {
      if (!node?.children.has(currentWord[0])) {
        return false;
      }
      node = node?.children.get(currentWord[0]);
      currentWord = currentWord.substr(1);
    }

    return !!node?.children.has(currentWord) && !!node?.children.get(currentWord)?.isEnd();
  }

  /**
   * Returns all words in this Trie
   *
   * @param node
   * @param string
   * @param words
   * @returns Array<string>
   */
  findAll(node: TrieNode = this.root, string = '', words: Array<string> = []): Array<string> {
    if (node.children.size !== 0) {
      node.children.forEach((value: TrieNode, key: string) => {
        this.findAll(node.children.get(key), string.concat(key), words);
      });
      if (node.isEnd()) {
        words.push(string);
      }
    } else {
      words.push(string);
    }

    return words;
  }

  /**
   * Given a string prefix, returns all words with that prefix in this Trie
   *
   * @param prefix
   * @param node
   * @returns Array<string>
   */
  findWordsForPrefix(prefix: string, node: TrieNode = this.root): Array<string> {
    const originalPrefix = prefix;
    let currentNode: TrieNode | undefined = node;
    let currentPrefix: string = prefix;
    while (currentPrefix.length >= 1) {
      if (currentNode?.children.has(currentPrefix[0])) {
        currentNode = currentNode?.children.get(currentPrefix[0]);
        currentPrefix = currentPrefix.substr(1);
      } else {
        // if this char doesn't exist, then there are no words with
        // this prefix in the trie, so return immediately
        return [];
      }
    }

    return this.findAll(currentNode, originalPrefix);
  }
}

export default Trie;
