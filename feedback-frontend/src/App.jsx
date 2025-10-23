
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import FeedbackBoard from './pages/FeedbackBoard';
import { useContext } from "react";



function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <nav>
        <Link to="/">Feedback Board</Link> | {" "}
        <Link to="/login">Login</Link> | {" "}
        <Link to="/signup">Signup</Link> | {" "}
        {user && (
          <button onClick={logout} style={{ marginLeft: "10px"}}>
              Logout
          </button>
        )}
      </nav>

      {user && <p>Logged in as: <strong>{user.email}</strong></p>}

      <Routes>
        <Route path="/" element={<FeedbackBoard />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
