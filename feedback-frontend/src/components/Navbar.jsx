import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom';

function Navbar() {
    const { logout} = useContext(AuthContext);

    const user = localStorage.getItem("user");


  return (
    <nav>
        <div>
            <Link to="/">Home</Link>
        </div>

        <div>
            {user 
            ? <div>
                <Link to="/my">My feedback</Link>    
                <button onClick={logout}>Logout</button>
            </div>
            :<div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>

        }
        </div>
    </nav>
  )
}

export default Navbar