import type { Scaffold } from '../types';

const languageToAbbreviationsMap: Record<string, string[]> = {
  spanish: ['es', 'es-MX'],
  español: ['es', 'es-MX'],
  vietnamese: ['vi'],
  // Etc.
};

export function matchStudentLanguage(
  language: string,
  scaffold: Scaffold,
): boolean {
  // Non-translation scaffolds shouldn't rejected on the basis of language
  if (!scaffold.language) return true;

  if (language.toLowerCase() in languageToAbbreviationsMap) {
    const targetAbbreviations =
      languageToAbbreviationsMap[language.toLowerCase()];
    return targetAbbreviations.includes(scaffold.language);
  }
  return false;
}
