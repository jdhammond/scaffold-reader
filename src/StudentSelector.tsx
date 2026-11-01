import type { Student } from './types';

type StudentSelectorProps = {
  students: Student[];
  activeStudent: Student;
  onStudentChange: (student: Student) => void;
};

export function StudentSelector({
  students,
  activeStudent,
  onStudentChange,
}: StudentSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const student = students.find((s) => s.id === e.target.value);
    if (student) onStudentChange(student);
  };

  return (
    <>
      <label htmlFor='student-select'>Student: </label>
      <select
        id='student-select'
        value={activeStudent.id}
        onChange={handleChange}
      >
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>
    </>
  );
}
