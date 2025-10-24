import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const { signup } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setStatus("Creating account...");

        const result = await signup(email, password);
        if (result.success) {
            setStatus(" Signup successful");
            navigate("/"); // go to home page
        } else {
            setStatus(` ${result.message}`);
        }
    };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>

      <p>{status}</p>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
    
  );
}

export default Signup