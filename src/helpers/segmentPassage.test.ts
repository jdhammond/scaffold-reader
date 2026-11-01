import { describe, expect, it } from 'vitest';
import { segmentPassage } from './segmentPassage';
import { makeAnchored, makeScaffold } from '../test/makeScaffold';

const passage = 'The quick brown fox.';

describe('segmentPassage', () => {
  it('returns the whole passage as one segment when there are no scaffolds', () => {
    expect(segmentPassage([], passage)).toEqual([{ text: passage }]);
  });

  it('splits the passage around annotated spans', () => {
    const scaffold = makeAnchored(4, 9, {
      content: { term: 'quick', definition: 'fast' },
    });
    expect(segmentPassage([scaffold], passage)).toEqual([
      { text: 'The ' },
      { text: 'quick', annotation: 'fast' },
      { text: ' brown fox.' },
    ]);
  });

  it('uses the text of non-definition content as the annotation', () => {
    const scaffold = makeAnchored(10, 15, { content: { text: 'marrón' } });
    expect(segmentPassage([scaffold], passage)).toContainEqual({
      text: 'brown',
      annotation: 'marrón',
    });
  });

  it('passes a translation\'s language through as lang', () => {
    const scaffold = makeAnchored(10, 15, {
      type: 'translation',
      language: 'es',
      content: { text: 'marrón' },
    });
    expect(segmentPassage([scaffold], passage)).toContainEqual({
      text: 'brown',
      annotation: 'marrón',
      lang: 'es',
    });
  });

  it('adds no empty segments for spans at the start and end', () => {
    const segments = segmentPassage(
      [makeAnchored(0, 3), makeAnchored(16, 20)],
      passage,
    );
    expect(segments.map((s) => s.text)).toEqual(['The', ' quick brown ', 'fox.']);
  });

  it('skips scaffolds that still have a quote anchor', () => {
    const unresolved = makeScaffold({ anchor: { quote: 'missing' } });
    expect(segmentPassage([unresolved], passage)).toEqual([{ text: passage }]);
  });

  it('only annotates the winner of overlapping scaffolds', () => {
    const segments = segmentPassage(
      [
        makeAnchored(4, 15, { confidence: 0.3, content: { text: 'loser' } }),
        makeAnchored(10, 19, { confidence: 0.9, content: { text: 'winner' } }),
      ],
      passage,
    );
    expect(segments.filter((s) => s.annotation)).toEqual([
      { text: 'brown fox', annotation: 'winner' },
    ]);
  });
});
