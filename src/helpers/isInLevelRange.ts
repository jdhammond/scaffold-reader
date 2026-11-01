import type { Scaffold } from '../types';

export function isInLevelRange(level: number, scaffold: Scaffold): boolean {
  const scaffoldLevelMin = Math.min(...scaffold.level_range);
  const scaffoldLevelMax = Math.max(...scaffold.level_range);
  return level >= scaffoldLevelMin && level <= scaffoldLevelMax;
}
