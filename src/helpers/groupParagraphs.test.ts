import { describe, expect, it } from 'vitest';
import { groupParagraphs } from './groupParagraphs';

describe('groupParagraphs', () => {
  it('returns a single paragraph when there are no breaks', () => {
    const segments = [{ text: 'One ' }, { text: 'two', annotation: '2' }];
    expect(groupParagraphs(segments)).toEqual([segments]);
  });

  it('splits plain segments at blank lines', () => {
    expect(groupParagraphs([{ text: 'First.\n\nSecond.' }])).toEqual([
      [{ text: 'First.' }],
      [{ text: 'Second.' }],
    ]);
  });

  it('keeps annotated segments in the paragraph around them', () => {
    expect(
      groupParagraphs([
        { text: 'First.\n\nThe ' },
        { text: 'cycle', annotation: 'ciclo' },
        { text: ' ends.\n\nThird.' },
      ]),
    ).toEqual([
      [{ text: 'First.' }],
      [{ text: 'The ' }, { text: 'cycle', annotation: 'ciclo' }, { text: ' ends.' }],
      [{ text: 'Third.' }],
    ]);
  });

  it('starts a new paragraph when a break directly follows an annotation', () => {
    expect(
      groupParagraphs([
        { text: 'cycle', annotation: 'ciclo' },
        { text: '\n\nNext.' },
      ]),
    ).toEqual([[{ text: 'cycle', annotation: 'ciclo' }], [{ text: 'Next.' }]]);
  });

  it('does not split an annotated segment that spans a break', () => {
    const spanning = { text: 'end.\n\nStart', annotation: 'x' };
    expect(groupParagraphs([spanning])).toEqual([[spanning]]);
  });

  it('treats single newlines as part of the paragraph', () => {
    expect(groupParagraphs([{ text: 'Line one\nline two' }])).toEqual([
      [{ text: 'Line one\nline two' }],
    ]);
  });

  it('ignores leading and trailing breaks', () => {
    expect(groupParagraphs([{ text: '\n\nOnly.\n\n' }])).toEqual([
      [{ text: 'Only.' }],
    ]);
  });
});
