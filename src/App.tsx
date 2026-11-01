import { useState, useMemo } from 'react';
import { resolveScaffolds } from './helpers/resolveScaffolds';

import data from '../data-source/scaffold-reader-data.json';
import { StudentSelector } from './StudentSelector';
import type { Student } from './types';
import { TextSegment } from './TextSegment';
import { getStudentScaffolds } from './helpers/getStudentScaffolds';
import { segmentPassage } from './helpers/segmentPassage';

function App() {
  const { passage, students, scaffolds } = data;

  const [activeStudent, setActiveStudent] = useState<Student>(students[0]);

  const segments = useMemo(() => {
    const studentScaffolds = getStudentScaffolds(activeStudent, scaffolds);
    const resolvedScaffolds = resolveScaffolds(studentScaffolds, passage.text);
    return segmentPassage(resolvedScaffolds, passage.text);
  }, [activeStudent, scaffolds, passage.text]);

  return (
    <>
      <header className='passage-header'>
        <h1>{passage.title}</h1>
        <StudentSelector
          students={students}
          activeStudent={activeStudent}
          onStudentChange={setActiveStudent}
        />
      </header>
      <p className='passage'>
        {segments.map((segment, i) => (
          <TextSegment key={i} {...segment} />
        ))}
      </p>
    </>
  );
}

export default App;
