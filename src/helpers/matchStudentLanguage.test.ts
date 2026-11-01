import { describe, expect, it } from 'vitest';
import { matchStudentLanguage } from './matchStudentLanguage';
import { makeScaffold } from '../test/makeScaffold';

describe('matchStudentLanguage', () => {
  it('accepts scaffolds without a language for any student', () => {
    expect(matchStudentLanguage('English', makeScaffold())).toBe(true);
    expect(matchStudentLanguage('Spanish', makeScaffold())).toBe(true);
  });

  it('matches every abbreviation for a language, case-insensitively', () => {
    expect(matchStudentLanguage('Spanish', makeScaffold({ language: 'es' }))).toBe(true);
    expect(matchStudentLanguage('Español', makeScaffold({ language: 'es-MX' }))).toBe(true);
    expect(matchStudentLanguage('VIETNAMESE', makeScaffold({ language: 'vi' }))).toBe(true);
  });

  it('rejects translations in a different language', () => {
    expect(matchStudentLanguage('Spanish', makeScaffold({ language: 'vi' }))).toBe(false);
  });

  it('rejects translations for languages not in the map', () => {
    expect(matchStudentLanguage('English', makeScaffold({ language: 'es' }))).toBe(false);
  });
});
