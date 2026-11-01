import './TextSegment.css';
import type { TextSegmentProps } from './types';

export function TextSegment({ text, annotation }: TextSegmentProps) {
  if (!annotation) return <span>{text}</span>;

  return (
    <span className='segment segment--annotated' tabIndex={0}>
      {text}
      <span className='segment__tooltip' role='tooltip'>
        {annotation}
      </span>
    </span>
  );
}
