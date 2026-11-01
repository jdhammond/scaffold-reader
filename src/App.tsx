import './App.css';
import { useState } from 'react';

import data from '../data-source/scaffold-reader-data.json';
import StudentSelector from './StudentSelector';
import type { Student } from './types';

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
      <div>{passage.text}</div>
    </>
  );
}

export default App;
