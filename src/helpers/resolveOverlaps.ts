import type { AnchorIndices, AnchoredScaffold } from '../types';

function overlaps(a: AnchorIndices, b: AnchorIndices): boolean {
  return a.start < b.end && b.start < a.end;
}

// Keeps the highest-confidence scaffold wherever scaffolds overlap,
// Ties go to the earlier scaffold. Returns kept scaffolds in passage order.
export function resolveOverlaps(
  scaffolds: AnchoredScaffold[],
): AnchoredScaffold[] {
  const byConfidence = [...scaffolds].sort(
    (a, b) => b.confidence - a.confidence || a.anchor.start - b.anchor.start,
  );

  const kept: AnchoredScaffold[] = [];
  for (const scaffold of byConfidence) {
    if (!kept.some((k) => overlaps(k.anchor, scaffold.anchor))) {
      kept.push(scaffold);
    }
  }

  return kept.sort((a, b) => a.anchor.start - b.anchor.start);
}
