import type { Scaffold, Student } from '../types';
import { parseStudentLevel } from './parseStudentLevel';
import { matchStudentLanguage } from './matchStudentLanguage';
import { isInLevelRange } from './isInLevelRange';

// Scaffolds below this confidence are too unreliable to show a student.
export const MIN_CONFIDENCE = 0.5;

export function getStudentScaffolds(
  student: Student,
  scaffolds: Scaffold[],
): Scaffold[] {
  const effectiveStudentLevel = parseStudentLevel(student.level);

  const confidentScaffolds = scaffolds.filter((scaffold) => {
    if (scaffold.confidence >= MIN_CONFIDENCE) return true;
    console.warn(
      `Scaffold ${scaffold.id}: confidence ${scaffold.confidence} is below minimum ${MIN_CONFIDENCE}`,
    );
    return false;
  });

  const scaffoldsWithCorrectLanguage = confidentScaffolds.filter((scaffold) =>
    matchStudentLanguage(student.home_language, scaffold),
  );

  const scaffoldsAtCorrectLevel = scaffoldsWithCorrectLanguage.filter(
    (scaffold) => isInLevelRange(effectiveStudentLevel, scaffold),
  );

  return scaffoldsAtCorrectLevel;
}
