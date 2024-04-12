import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getdata")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <center><h2 className='heading'>Enjoy our content</h2></center>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item) => (
          <div className='container' key={item.id}>
            <div className='container1'>
              <h3>Type of driver : {item.type}</h3>
              <h4>Type of conversation with them :</h4>
              <p>{item.about}</p>
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
