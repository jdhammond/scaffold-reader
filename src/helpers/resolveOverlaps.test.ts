import { describe, expect, it } from 'vitest';
import { resolveOverlaps } from './resolveOverlaps';
import { makeAnchored } from '../test/makeScaffold';

function ids(scaffolds: { id: string }[]) {
  return scaffolds.map((s) => s.id);
}

describe('resolveOverlaps', () => {
  it('keeps non-overlapping scaffolds and returns them in passage order', () => {
    const result = resolveOverlaps([
      makeAnchored(10, 15, { id: 'b', confidence: 0.9 }),
      makeAnchored(0, 5, { id: 'a', confidence: 0.1 }),
    ]);
    expect(ids(result)).toEqual(['a', 'b']);
  });

  it('treats touching ranges as non-overlapping', () => {
    const result = resolveOverlaps([
      makeAnchored(0, 5, { id: 'a' }),
      makeAnchored(5, 10, { id: 'b' }),
    ]);
    expect(ids(result)).toEqual(['a', 'b']);
  });

  it('keeps the higher-confidence scaffold when two overlap', () => {
    const result = resolveOverlaps([
      makeAnchored(0, 10, { id: 'low', confidence: 0.4 }),
      makeAnchored(5, 15, { id: 'high', confidence: 0.8 }),
    ]);
    expect(ids(result)).toEqual(['high']);
  });

  it('breaks confidence ties in favor of the earlier scaffold', () => {
    const result = resolveOverlaps([
      makeAnchored(5, 15, { id: 'later', confidence: 0.5 }),
      makeAnchored(0, 10, { id: 'earlier', confidence: 0.5 }),
    ]);
    expect(ids(result)).toEqual(['earlier']);
  });

  it('can keep both outer scaffolds when a dropped one bridged them', () => {
    const result = resolveOverlaps([
      makeAnchored(0, 6, { id: 'left', confidence: 0.9 }),
      makeAnchored(4, 12, { id: 'bridge', confidence: 0.5 }),
      makeAnchored(10, 16, { id: 'right', confidence: 0.8 }),
    ]);
    expect(ids(result)).toEqual(['left', 'right']);
  });
});
