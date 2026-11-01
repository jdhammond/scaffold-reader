// Presumable WIDA proficiency
const qualitativeLevelMap: Record<string, number> = {
  entering: 1,
  emerging: 2,
  developing: 3,
  expanding: 4,
  bridging: 5,
  reaching: 6,
};

export function parseStudentLevel(level: string | number) {
  if (typeof level === 'number') {
    return level;
  }

  const numericLevel = Number(level);
  if (level.trim() !== '' && Number.isFinite(numericLevel)) {
    return numericLevel;
  }

  if (level.toLowerCase() in qualitativeLevelMap) {
    return qualitativeLevelMap[level.toLowerCase()];
  }

  // Ideally, our logging utility would notify the teacher such that they could confirm the learner's actual level and avoid the problem in the future.
  console.warn(
    'Could not parse student level. Returning maximum number of supports.',
  );
  return 1;
}
