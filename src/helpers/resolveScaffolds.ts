import type { TextSegmentProps } from '../types';
import data from '../../data-source/scaffold-reader-data.json';

type AnchorIndices = { start: number; end: number };
type AnchorQuote = { quote: string };
type DefinitionContent = { term: string; definition: string };
type TextContent = { text: string };

type Scaffold = {
  id: string;
  type: string; // TODO: tighten up types here if possible
  anchor: AnchorIndices | AnchorQuote;
  content: DefinitionContent | TextContent;
  level_range: number[];
  confidence: number;
};

export function resolveScaffolds(scaffolds: Scaffold[]): TextSegmentProps[] {
  const passageText = data.passage.text;

  // TODO: resolve conflicts
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

function toAnnotation(content: Scaffold['content']): string {
  return 'definition' in content ? content.definition : content.text;
}

// Expects scaffolds already run through resolveScaffolds; any that still have a
// quote anchor (not found in the passage) are skipped.
export function segmentPassage(scaffolds: Scaffold[]): TextSegmentProps[] {
  const passageText = data.passage.text;

  const anchored = scaffolds
    .filter(
      (s): s is Scaffold & { anchor: AnchorIndices } => 'start' in s.anchor,
    )
    .sort((a, b) => a.anchor.start - b.anchor.start);

  const segments: TextSegmentProps[] = [];
  let cursor = 0;

  for (const { anchor, content } of anchored) {
    // TODO: resolve conflicts; for now, skip scaffolds overlapping an earlier one
    if (anchor.start < cursor) continue;

    if (anchor.start > cursor) {
      segments.push({ text: passageText.slice(cursor, anchor.start) });
    }
    segments.push({
      text: passageText.slice(anchor.start, anchor.end),
      annotation: toAnnotation(content),
    });
    cursor = anchor.end;
  }

  if (cursor < passageText.length) {
    segments.push({ text: passageText.slice(cursor) });
  }

  return segments;
}
