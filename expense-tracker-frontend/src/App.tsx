import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Expense from './pages/Expense';
import Home from './pages/Home';


function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={< Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};
