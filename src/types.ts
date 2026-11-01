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
