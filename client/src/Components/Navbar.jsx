import {useState} from 'react'
import Link from "react-router-dom"
import axios from "axios"


const Logout = ({ onLogout }) => {
    const [loggedIn, setLoggedIn] = useState(true); 
    const handleLogout = async () => {
      try {
        await axios.get("http://localhost:3001/logout");
        onLogout(); 
        window.location.href = "/login";
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
  
    return (
      <h4 className='option' onClick={handleLogout}>Logout</h4>
    );
  };

  const handleLogout = () => {
    setLoggedIn(false); // Update login status to false when logout is clicked
  };
const Navbar = () => {
  return (
    <div>
      <nav>
        <div className='lol'>
          <div className='navdiv'>
            <div><h4>Logo here!</h4></div>
              <div className='nav-options'>
                <div>
                  <Link to="/form" className='h4'>
                    <h4 className='option'>Create a type</h4>
                  </Link>
                </div>
                <div>
                  <Link to="/register">
                    <h4 className='option'>Register</h4>
                  </Link>
                </div>
                <div>
                  <Link to="login">
                    <h4 className='option'>Login</h4>
                  </Link>
                </div>
                <div>
                  {loggedIn && <Logout onLogout={handleLogout} />}
                </div>
              </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
