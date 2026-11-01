import './App.css';
import { useState } from 'react';

import data from '../data-source/scaffold-reader-data.json';
import { StudentSelector } from './StudentSelector';
import type { Student } from './types';
import { TextSegment } from './Segment';

function App() {
  const { passage, students } = data;

  const [activeStudent, setActiveStudent] = useState<Student>(students[0]);

  return (
    <>
      <StudentSelector
        students={students}
        activeStudent={activeStudent}
        onStudentChange={setActiveStudent}
      />
      <h1>{passage.title}</h1>
      <TextSegment text={passage.text} annotation='test tooltip for now' />
    </>
  );
}

export default App;
