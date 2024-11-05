import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentForm = ({ addStudent }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    subject: 'Filipino',
    grade: ''
  });

  const subjects = [
    'Filipino',
    'English',
    'Math',
    'MAPEH',
    'Science',
    'Araling Panlipunan'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent({
      ...formData,
      id: Date.now(),
      grade: parseFloat(formData.grade)
    });
    setFormData({
      studentId: '',
      fullName: '',
      subject: 'Filipino',
      grade: ''
    });
    // Navigate to student list after adding
    navigate('/students');
  };

  return (
    <div className="form-container">
      <h2>Add Student Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID</label>
          <input
            type="text"
            value={formData.studentId}
            onChange={(e) => setFormData({...formData, studentId: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Grade</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.grade}
            onChange={(e) => setFormData({...formData, grade: e.target.value})}
            required
          />
        </div>
        <button type="submit" class="submit-btn">
          Add Record
        </button>
      </form>
    </div>
  );
};

export default StudentForm;