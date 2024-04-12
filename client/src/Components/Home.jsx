import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

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
  }

  return (
    <div className="container">
      <nav>
        <div className='lol'>
          <div className='navdiv'>
            <div><h4>Logo here!</h4></div>
            <Link to="/form" className='h4'>
              <div><h4>Create a type</h4></div>
            </Link>
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
        <p>No data available</p>
      )}
    </div>
  );
};

export default Home;
