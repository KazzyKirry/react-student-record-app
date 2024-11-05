import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const StudentRecord = ({ students }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  // Handle automatic search when navigating from student list
  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setSearchId(idFromUrl);
      searchStudent(idFromUrl);
    }
  }, [searchParams, students]);

  const searchStudent = (id) => {
    const studentRecords = students.filter(s => s.studentId === id);
    
    if (studentRecords.length > 0) {
      const average = (studentRecords.reduce((acc, curr) => acc + curr.grade, 0) / studentRecords.length).toFixed(2);
      setSearchResult({ records: studentRecords, average });
      setError('');
    } else {
      setSearchResult(null);
      setError('No existing record/student. ');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchStudent(searchId);
  };

  return (
    <div className="record-container">
      <h2>Student Record</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Student ID"
          required
        />
        <button type="submit" className="submit-btn">Search</button>
      </form>

      {error && (
        <p className="error-message">
          {error}
          <button
            onClick={() => navigate('/')}
            className="add-record-link"
          >
            Add a student record
          </button>
        </p>
      )}

      {searchResult && (
        <div className="search-results">
          <h3>{searchResult.records[0].fullName}'s Records</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.records.map((record, index) => (
                  <tr key={index}>
                    <td>{record.subject}</td>
                    <td>{record.grade}</td>
                  </tr>
                ))}
                <tr className="average-row">
                  <td>Average</td>
                  <td>{searchResult.average}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRecord;