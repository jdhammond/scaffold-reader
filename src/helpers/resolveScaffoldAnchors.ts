import type { Scaffold } from '../types';

// Converts quote anchors into start/end indices within the passage.
// Scaffolds whose quote isn't found keep their quote anchor.
export function resolveScaffoldAnchors(
  scaffolds: Scaffold[],
  passageText: string,
): Scaffold[] {
  return scaffolds.map((scaffold) => {
    if (!('quote' in scaffold.anchor)) return scaffold;

    const { quote } = scaffold.anchor;
    // Annotate the first instance.
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
}
