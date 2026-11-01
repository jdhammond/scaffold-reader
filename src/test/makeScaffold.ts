import type { AnchoredScaffold, Scaffold } from '../types';

export function makeScaffold(overrides: Partial<Scaffold> = {}): Scaffold {
  return {
    id: 's-test',
    type: 'glossary',
    anchor: { start: 0, end: 1 },
    content: { term: 'term', definition: 'definition' },
    level_range: [1, 4],
    confidence: 0.5,
    ...overrides,
  };
}

export function makeAnchored(
  start: number,
  end: number,
  overrides: Partial<Scaffold> = {},
): AnchoredScaffold {
  return makeScaffold({ ...overrides, anchor: { start, end } }) as AnchoredScaffold;
}
