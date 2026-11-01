import { describe, expect, it } from 'vitest';
import { isInLevelRange } from './isInLevelRange';
import { makeScaffold } from '../test/makeScaffold';

describe('isInLevelRange', () => {
  const scaffold = makeScaffold({ level_range: [2, 4] });

  it('includes both ends of the range', () => {
    expect(isInLevelRange(2, scaffold)).toBe(true);
    expect(isInLevelRange(4, scaffold)).toBe(true);
  });

  it('excludes levels outside the range', () => {
    expect(isInLevelRange(1, scaffold)).toBe(false);
    expect(isInLevelRange(5, scaffold)).toBe(false);
  });

  it('handles a reversed range', () => {
    expect(isInLevelRange(3, makeScaffold({ level_range: [4, 2] }))).toBe(true);
  });
});
