import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Home, Users, FileText } from 'lucide-react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import StudentRecord from './components/StudentRecord';
import './styles/styles.css';

// Temporary data storage (will be replaced with proper database later)
export const useStudentStore = () => {
  const [students, setStudents] = React.useState([]);

  const addStudent = (studentData) => {
    setStudents([...students, studentData]);
  };

  const deleteStudent = (studentId) => {
    setStudents(students.filter(student => student.studentId !== studentId));
  };

  return { students, addStudent, deleteStudent };
};

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="nav-title">
      Student Report Card
    </Link>
    <div className="nav-links">
      <Link to="/students" className="nav-link">
        <Users size={18} /> Student List
      </Link>
      <Link to="/record" className="nav-link">
        <FileText size={18} /> Student Record
      </Link>
    </div>
  </nav>
);

const App = () => {
  const { students, addStudent, deleteStudent } = useStudentStore();

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<StudentForm addStudent={addStudent} />} />
          <Route 
            path="/students" 
            element={<StudentList 
              students={students} 
              deleteStudent={deleteStudent} 
            />} 
          />
          <Route 
            path="/record" 
            element={<StudentRecord 
              students={students}
            />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;