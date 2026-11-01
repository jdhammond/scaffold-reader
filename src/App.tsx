import './App.css';
import { useState, useMemo } from 'react';
import { resolveScaffolds } from './helpers/resolveScaffolds';

import data from '../data-source/scaffold-reader-data.json';
import { StudentSelector } from './StudentSelector';
import type { Student } from './types';
import { TextSegment } from './TextSegment';

function App() {
  const { passage, students, scaffolds } = data;

  const [activeStudent, setActiveStudent] = useState<Student>(students[0]);

  const segments = useMemo(() => resolveScaffolds(scaffolds), [activeStudent]);

  return (
    <>
      <StudentSelector
        students={students}
        activeStudent={activeStudent}
        onStudentChange={setActiveStudent}
      />
      <h1>{passage.title}</h1>
      <p className='passage'>
        {segments.map((segment, i) => (
          <TextSegment key={i} {...segment} />
        ))}
      </p>
    </>
  );
}

export default App;
