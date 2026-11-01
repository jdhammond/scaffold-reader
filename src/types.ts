export type Student = {
  id: string;
  name: string;
  home_language: string;
  level: string | number;
};

export type TextSegmentProps = {
  text: string;
  annotation?: string;
};

export type AnchorIndices = { start: number; end: number };
export type AnchorQuote = { quote: string };
export type DefinitionContent = { term: string; definition: string };
export type TextContent = { text: string };

export type Scaffold = {
  id: string;
  type: string; // TODO: tighten up types here if possible
  anchor: AnchorIndices | AnchorQuote;
  content: DefinitionContent | TextContent;
  level_range: number[];
  confidence: number;
};

export type AnchoredScaffold = Scaffold & { anchor: AnchorIndices };
