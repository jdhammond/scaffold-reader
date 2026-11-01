import { useEffect, useId, useState } from 'react';
import './TextSegment.css';
import type { TextSegmentProps } from './types';

export function TextSegment({ text, annotation, lang }: TextSegmentProps) {
  if (!annotation) return <span>{text}</span>;

  return <AnnotatedSegment text={text} annotation={annotation} lang={lang} />;
}

function AnnotatedSegment({
  text,
  annotation,
  lang,
}: TextSegmentProps & { annotation: string }) {
  const tooltipId = useId();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const isOpen = (isHovered || isFocused) && !isDismissed;

  // Escape dismisses the tooltip whether it was opened by hover or focus (WCAG 1.4.13).
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDismissed(true);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // A dismissed tooltip stays closed until the reader hovers or focuses again.
  const open = (setter: (value: boolean) => void) => () => {
    setter(true);
    setIsDismissed(false);
  };

  return (
    <span
      className='segment'
      onMouseEnter={open(setIsHovered)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className='segment__trigger'
        tabIndex={0}
        aria-describedby={tooltipId}
        onFocus={open(setIsFocused)}
        onBlur={() => setIsFocused(false)}
      >
        {text}
      </span>
      <span
        id={tooltipId}
        className='segment__tooltip'
        role='tooltip'
        lang={lang}
        hidden={!isOpen}
      >
        {annotation}
      </span>
    </span>
  );
}
