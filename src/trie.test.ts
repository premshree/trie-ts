import Trie from './trie';

const trie = new Trie();
trie.add('fun');
trie.add('fan');
trie.add('fad');
trie.add('fans');
trie.add('fantastic');
trie.add('types');

describe('Given a Trie with words added to it', () => {
  test('find() returns true if the word exists', () => {
    expect(trie.find('fun')).toBe(true);
    expect(trie.find('fans')).toBe(true);
  });

  test("find() returns false if the word doesn't exist", () => {
    expect(trie.find('cat')).toBe(false);
  });

  describe('findWordsForPrefix', () => {
    test('returns the correct set of words if the prefix exists', () => {
      expect(trie.findWordsForPrefix('fa').sort()).toEqual(['fan', 'fad', 'fans', 'fantastic'].sort());
      expect(trie.findWordsForPrefix('fan').sort()).toEqual(['fan', 'fans', 'fantastic'].sort());
      expect(trie.findWordsForPrefix('types').sort()).toEqual(['types'].sort());
    });
    test('returns an empty array if the prefix is not found', () => {
      expect(trie.findWordsForPrefix('ca').sort()).toEqual([]);
      expect(trie.findWordsForPrefix('fansd').sort()).toEqual([]);
    });
  });

  test('findAll returns all words of the Trie', () => {
    expect(trie.findAll().sort()).toEqual(
      ['fun', 'fan', 'fad', 'fans', 'fantastic', 'types'].sort(),
    );
  });
});


// test('find');
