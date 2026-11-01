import type { Scaffold, Student } from '../types';
import { parseStudentLevel } from './parseStudentLevel';
import { matchStudentLanguage } from './matchStudentLanguage';
import { isInLevelRange } from './isInLevelRange';

export function getStudentScaffolds(
  student: Student,
  scaffolds: Scaffold[],
): Scaffold[] {
  const effectiveStudentLevel = parseStudentLevel(student.level);

  const scaffoldsWithCorrectLanguage = scaffolds.filter((scaffold) =>
    matchStudentLanguage(student.home_language, scaffold),
  );

  const scaffoldsAtCorrectLevel = scaffoldsWithCorrectLanguage.filter(
    (scaffold) => isInLevelRange(effectiveStudentLevel, scaffold),
  );

  return scaffoldsAtCorrectLevel;
}
