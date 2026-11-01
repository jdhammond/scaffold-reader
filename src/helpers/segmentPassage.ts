import type { AnchoredScaffold, Scaffold, TextSegmentProps } from '../types';
import { resolveOverlaps } from './resolveOverlaps';

function toAnnotation(content: Scaffold['content']): string {
  return 'definition' in content ? content.definition : content.text;
}

// Expects scaffolds already run through resolveScaffoldAnchors; any that still
// have a quote anchor (not found in the passage) are skipped.
export function segmentPassage(
  scaffolds: Scaffold[],
  passageText: string,
): TextSegmentProps[] {
  const anchored = scaffolds.filter(
    (s): s is AnchoredScaffold => 'start' in s.anchor,
  );

  const segments: TextSegmentProps[] = [];
  let cursor = 0;

  for (const { anchor, content } of resolveOverlaps(anchored)) {
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
