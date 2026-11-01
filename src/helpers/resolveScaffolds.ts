import type { Scaffold, TextSegmentProps } from '../types';
import data from '../../data-source/scaffold-reader-data.json';
import { segmentPassage } from './segmentPassage';

export function resolveScaffolds(scaffolds: Scaffold[]): TextSegmentProps[] {
  const passageText = data.passage.text;

  const indexedScaffolds = scaffolds.map((scaffold) => {
    if (!('quote' in scaffold.anchor)) return scaffold;

    const { quote } = scaffold.anchor;
    // Annotate the first instance.
    // TODO: Address case sensitivity in notes, and why case insensitive is right
    const start = passageText.indexOf(quote);
    if (start === -1) {
      // TODO: stub a logging utility if time permits
      console.warn(
        `Scaffold ${scaffold.id}: quote "${quote}" not found in passage`,
      );
      return scaffold;
    }

    return { ...scaffold, anchor: { start, end: start + quote.length } };
  });

  return segmentPassage(indexedScaffolds);
}
