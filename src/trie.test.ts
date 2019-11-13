import util from 'util';
import Trie from './trie';


describe('Given a Trie with words in it', () => {
  const trie = new Trie();
  trie.add('fun');
  trie.add('fan');
  trie.add('fad');
  trie.add('fans');
  trie.add('fantastic');
  trie.add('types');

  describe('find()', () => {
    test('returns true if the word exists', () => {
      expect(trie.find('fun')).toBe(true);
      expect(trie.find('fans')).toBe(true);
    });

    test("returns false if the word doesn't exist", () => {
      expect(trie.find('cat')).toBe(false);
      expect(trie.find('fand')).toBe(false);
      expect(trie.find('fantasticd')).toBe(false);
    });
  });

  describe('findPrefix()', () => {
    test('returns true if the prefix has words in the trie', () => {
      expect(trie.findPrefix('fu')).toBe(true);
      expect(trie.findPrefix('ty')).toBe(true);
    });

    test('returns false if the prefix has words in the trie', () => {
      expect(trie.findPrefix('ca')).toBe(false);
      expect(trie.findPrefix('fand')).toBe(false);
    });
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
      expect(trie.findWordsForPrefix('typesd').sort()).toEqual([]);
    });
  });

  test('findAll returns all words of the Trie', () => {
    expect(trie.findAll().sort()).toEqual(
      ['fun', 'fan', 'fad', 'fans', 'fantastic', 'types'].sort(),
    );
  });

  test('delete', () => {
    trie.delete('fooo');
    expect(trie.findAll().sort()).toEqual(
      ['fun', 'fan', 'fad', 'fans', 'fantastic', 'types'].sort(),
    );

    trie.delete('types');
    expect(trie.findAll().sort()).toEqual(
      ['fun', 'fan', 'fad', 'fans', 'fantastic'].sort(),
    );

    trie.delete('fan');
    expect(trie.findAll().sort()).toEqual(
      ['fun', 'fad', 'fans', 'fantastic'].sort(),
    );
  });
});
