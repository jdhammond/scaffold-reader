import { afterEach, describe, expect, it, vi } from 'vitest';
import { parseStudentLevel } from './parseStudentLevel';

describe('parseStudentLevel', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns numeric levels unchanged', () => {
    expect(parseStudentLevel(3)).toBe(3);
  });

  it('parses numeric strings, ignoring surrounding whitespace', () => {
    expect(parseStudentLevel('3')).toBe(3);
    expect(parseStudentLevel(' 3 ')).toBe(3);
  });

  it.each(['', '   ', '3rd'])(
    'falls back to level 1 for the non-numeric string %j',
    (level) => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      expect(parseStudentLevel(level)).toBe(1);
    },
  );

  it('maps qualitative levels case-insensitively', () => {
    expect(parseStudentLevel('Expanding')).toBe(4);
    expect(parseStudentLevel('EXPANDING')).toBe(4);
  });

  it('falls back to level 1 with a warning for unknown levels', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(parseStudentLevel('Mystery')).toBe(1);
    expect(warn).toHaveBeenCalledOnce();
  });
});
