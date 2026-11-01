export type Student = {
  id: string;
  name: string;
  home_language: string;
  level: string | number;
};

export type TextSegmentProps = {
  text: string;
  annotation?: string;
  // BCP 47 tag for translated annotations, so screen readers use the right voice
  lang?: string;
  scaffoldType?: string;
};

export type AnchorIndices = { start: number; end: number };
export type AnchorQuote = { quote: string };
export type DefinitionContent = { term: string; definition: string };
export type TextContent = { text: string };

export type Scaffold = {
  id: string;
  type: string;
  anchor: AnchorIndices | AnchorQuote;
  content: DefinitionContent | TextContent;
  language?: string;
  level_range: number[];
  confidence: number;
};

export type AnchoredScaffold = Scaffold & { anchor: AnchorIndices };
