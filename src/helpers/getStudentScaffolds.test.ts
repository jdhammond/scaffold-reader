import { describe, expect, it } from 'vitest';
import { getStudentScaffolds, MIN_CONFIDENCE } from './getStudentScaffolds';
import { makeScaffold } from '../test/makeScaffold';
import type { Student } from '../types';

const scaffolds = [
  makeScaffold({ id: 'glossary', level_range: [1, 4] }),
  makeScaffold({ id: 'spanish', type: 'translation', language: 'es', level_range: [1, 2] }),
  makeScaffold({ id: 'vietnamese', type: 'translation', language: 'vi', level_range: [1, 3] }),
  makeScaffold({ id: 'advanced', level_range: [5, 6] }),
];

function student(overrides: Partial<Student>): Student {
  return { id: 'st', name: 'Test', home_language: 'English', level: 1, ...overrides };
}

function idsFor(s: Student) {
  return getStudentScaffolds(s, scaffolds).map((scaffold) => scaffold.id);
}

describe('getStudentScaffolds', () => {
  it('filters by both language and level', () => {
    expect(idsFor(student({ home_language: 'Spanish', level: 2 }))).toEqual([
      'glossary',
      'spanish',
    ]);
  });

  it('gives English speakers no translations', () => {
    expect(idsFor(student({ home_language: 'English', level: 1 }))).toEqual(['glossary']);
  });

  it('applies qualitative levels', () => {
    // 'Expanding' maps to 4, above the Spanish translation's range
    expect(idsFor(student({ home_language: 'Español', level: 'Expanding' }))).toEqual([
      'glossary',
    ]);
  });

  it('returns nothing when no scaffold covers the level', () => {
    expect(idsFor(student({ level: 7 }))).toEqual([]);
  });

  it('drops scaffolds below the minimum confidence', () => {
    const lowConfidence = [
      makeScaffold({ id: 'below', confidence: MIN_CONFIDENCE - 0.01 }),
      makeScaffold({ id: 'at', confidence: MIN_CONFIDENCE }),
    ];
    const ids = getStudentScaffolds(student({}), lowConfidence).map((s) => s.id);
    expect(ids).toEqual(['at']);
  });
});
