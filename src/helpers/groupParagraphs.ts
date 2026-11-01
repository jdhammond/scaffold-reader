import type { TextSegmentProps } from '../types';

const PARAGRAPH_BREAK = /\n\s*\n/;

// Splits segments into paragraphs at blank lines in the plain-text segments.
// Annotated segments are never split, so one that spans a paragraph break stays
// whole in the paragraph where it starts.
export function groupParagraphs(
  segments: TextSegmentProps[],
): TextSegmentProps[][] {
  let current: TextSegmentProps[] = [];
  const paragraphs = [current];

  for (const segment of segments) {
    if (segment.annotation) {
      current.push(segment);
      continue;
    }

    segment.text.split(PARAGRAPH_BREAK).forEach((part, i) => {
      if (i > 0) {
        current = [];
        paragraphs.push(current);
      }
      if (part) current.push({ text: part });
    });
  }

  return paragraphs.filter((paragraph) => paragraph.length > 0);
}
