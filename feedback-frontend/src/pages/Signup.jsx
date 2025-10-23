import React, { useState } from 'react'

const API_BASE = "http://localhost:5000";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_BASE}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus(" Account Created!")
            } else {
                setStatus(` ${data.message}`);
            }
        } catch (err) {
            console.error(err);
            setStatus(" Server Error.");
        }
    };

  return (
    <div>
        <form onSubmit={handleSignup}>
        <h2>Signup</h2>
        <input 
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input 
             type='password'
             placeholder='Password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Signup</button>
        <p>{status}</p>
    </form>
    </div>
    
  );
}

export default Signup