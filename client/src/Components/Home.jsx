import axios from 'axios';
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3001/logout");
      onLogout(); // Call the onLogout function passed from the parent component
      window.location.href = "/login"; // Redirect to the login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <h4 className='option' onClick={handleLogout}>Logout</h4>
  );
};

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getdata")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteitem/${id}`)
      .then(res => {
        setData(prevData => prevData.filter(item => item._id !== id));
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const handleLogout = () => {
    setLoggedIn(false); // Update login status to false when logout is clicked
  };

  return (
    <div className="container">
      <nav>
        <div className='lol'>
          <div className='navdiv'>
            <div>
              <img src={logo} alt="" className='logo' />
            </div>
            <div className='nav-options'>
              <div>
                <Link to="/form" className='h4'>
                  <h4 className='option'>Create a type</h4>
                </Link>
              </div>
              <div>
                <Link to="/filter" className='h4'>
                  <h4 className='option filteroption'>Filter</h4>
                </Link>
              </div>
              <div>
                {!loggedIn && (
                  <Link to="/login">
                    <h4 className='option'>Login</h4>
                  </Link>
                )}
              </div>
              <div>
                {loggedIn && <Logout onLogout={handleLogout} />}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <center><h2 className='heading'>Enjoy our content</h2></center>
      {error ? (
        <p>Error: {error}</p>
      ) : Array.isArray(data) && data.length > 0 ? (
        data.map((item) => (
          <div className='container' key={item._id}>
            <div className='container1'>
              <h3>Type of driver : {item.type}</h3>
              <h4>Type of conversation with them :</h4>
              <p>{item.about}</p>
              <h5>Written by : <i>{item.username}</i></h5>
              <div className='btnsdiv'>
                <Link to={`/update/${item._id}`}>
                  <button>Update</button>
                </Link>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Please wait we are trying to give the best experience
        </p>
      )}
    </div>
  );
};

export default Home;
