import type { Scaffold, Student } from '../types';
import data from '../../data-source/scaffold-reader-data.json';

// 'Expanding' in the source data suggests qualitative rubric language.
// This would presumably correspond to a numerical value, but with only one data point, it's hard to infer with confidence.
const qualitativeLevelMap: Record<string, number> = {
  // exploring: 3
  expanding: 4,
  // achieving: 5
  // excelling: 6
};

function parseStudentLevel(level: string | number) {
  if (typeof level === 'number') {
    return level;
  } else {
    if (level.toLowerCase() in qualitativeLevelMap) {
      return qualitativeLevelMap[level.toLowerCase()];
    }
  }
  // Ideally, our logging utility would notify the teacher such that they could confirm the learner's actual level and avoid the problem in the future.
  console.warn(
    'Could not parse student level. Returning maximum number of supports.',
  );
  return 1;
}

export function getStudentScaffolds(student: Student): Scaffold[] {
  const effectiveStudentLevel = parseStudentLevel(student.level);

  const scaffoldsAtCorrectLevel = data.scaffolds.filter(
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
