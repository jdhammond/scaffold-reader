import type { Scaffold, Student } from '../types';
import data from '../../data-source/scaffold-reader-data.json';
import { parseStudentLevel } from './parseStudentLevel';
import { matchStudentLanguage } from './matchStudentLanguage';

export function getStudentScaffolds(student: Student): Scaffold[] {
  const effectiveStudentLevel = parseStudentLevel(student.level);

  const scaffoldsWithCorrectLanguage =
    student.home_language.toLowerCase() === 'english'
      ? data.scaffolds
      : data.scaffolds.filter((scaffold: Scaffold) =>
          matchStudentLanguage(student.home_language, scaffold),
        );

  const scaffoldsAtCorrectLevel = scaffoldsWithCorrectLanguage.filter(
    (scaffold: Scaffold) => {
      const scaffoldLevelMin = Math.min(...scaffold.level_range);
      const scaffoldLevelMax = Math.max(...scaffold.level_range);
      return (
        effectiveStudentLevel >= scaffoldLevelMin &&
        effectiveStudentLevel <= scaffoldLevelMax
      );
    },
  );

  return scaffoldsAtCorrectLevel;
}
