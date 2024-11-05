import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = ({ students, deleteStudent }) => {
  const navigate = useNavigate();

  const computeAverage = (studentId) => {
    const studentGrades = students
      .filter(s => s.studentId === studentId)
      .map(s => s.grade);
    return studentGrades.length
      ? (studentGrades.reduce((a, b) => a + b) / studentGrades.length).toFixed(2)
      : 'N/A';
  };

  const uniqueStudents = [...new Set(students.map(s => s.studentId))].map(id => {
    const student = students.find(s => s.studentId === id);
    return {
      studentId: id,
      fullName: student.fullName,
      average: computeAverage(id)
    };
  });

  const handleDelete = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student and all their records?')) {
      deleteStudent(studentId);
    }
  };

  const handleView = (studentId) => {
    navigate(`/record?id=${studentId}`);
  };

  return (
    <div className="list-container">
      <h2>Student List</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Full Name</th>
              <th>Average</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {uniqueStudents.map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.fullName}</td>
                <td>{student.average}</td>
                <td className="action-buttons">
                  <button
                    onClick={() => handleView(student.studentId)}
                    className="view-btn"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(student.studentId)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;