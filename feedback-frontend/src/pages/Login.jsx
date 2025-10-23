import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";



const API_BASE = "http://localhost:5000";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                login(data.user, data.token);
                setStatus(" Login successful!");
            } else {
                setStatus(`${data.message}`);
            }
        } catch (err) {
            console.error(err);
            setStatus(" Server error.");
        }
    }

    return (
        <div>
                <form onSubmit={handleLogin}>
            <h2>Login</h2>
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
            <button type="submit">Login</button>
            <p>{status}</p>
        </form>
        </div>
        
    )
}