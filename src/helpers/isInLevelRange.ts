import type { Scaffold } from '../types';

// All given level ranges are in the form [min, max], but this is not guaranteed
export function isInLevelRange(level: number, scaffold: Scaffold): boolean {
  const scaffoldLevelMin = Math.min(...scaffold.level_range);
  const scaffoldLevelMax = Math.max(...scaffold.level_range);
  return level >= scaffoldLevelMin && level <= scaffoldLevelMax;
}
