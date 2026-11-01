import { afterEach, describe, expect, it, vi } from 'vitest';
import { resolveScaffoldAnchors } from './resolveScaffoldAnchors';
import { makeScaffold } from '../test/makeScaffold';

const passage = 'The cat sat. The cat slept.';

describe('resolveScaffoldAnchors', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('converts a quote anchor to the indices of its first occurrence', () => {
    const [resolved] = resolveScaffoldAnchors(
      [makeScaffold({ anchor: { quote: 'cat' } })],
      passage,
    );
    expect(resolved.anchor).toEqual({ start: 4, end: 7 });
  });

  it('matches case-sensitively, since capitalization can change meaning', () => {
    const [resolved] = resolveScaffoldAnchors(
      [makeScaffold({ anchor: { quote: 'mercury' } })],
      'Mercury orbits the sun. Old thermometers held mercury.',
    );
    expect(resolved.anchor).toEqual({ start: 46, end: 53 });
  });

  it('leaves index anchors untouched', () => {
    const scaffold = makeScaffold({ anchor: { start: 13, end: 16 } });
    expect(resolveScaffoldAnchors([scaffold], passage)).toEqual([scaffold]);
  });

  it('keeps the quote anchor and warns when the quote is missing', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const scaffold = makeScaffold({ anchor: { quote: 'dog' } });
    expect(resolveScaffoldAnchors([scaffold], passage)).toEqual([scaffold]);
    expect(warn).toHaveBeenCalledOnce();
  });
});
