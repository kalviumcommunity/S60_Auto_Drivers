import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Filter = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);

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

  const handleClick = (username) => {
    axios
      .get(`http://localhost:3001/userdata/${username}`)
      .then((res) => {
        setSelectedUserData(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="body">
    <div className="authors-box-main">
      <div className="authors-box">
        <center>
          <h2 className="heading-author">Our Authors</h2>
        </center>
        <div className="authors-box1">
          {error ? (
            <p>Error : {error}</p>
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <div key={index}>
                <div className="author">
                  <h3 className="author-name">
                    <Link onClick={() => handleClick(item.username)} to="#">
                      Author name : <i>{item.username}</i>
                    </Link>
                  </h3>
                </div>
              </div>
              
            ))
          ) : (
            <center>
              <p>No authors are there why cant you be our author</p>
            </center>
          )}
        </div>
      </div>
      <div className="user-about">
      {selectedUserData && (
        <div className="selected-user-data">
          <h3>{selectedUserData[0].type}</h3>
          <p>{selectedUserData[0].about}</p>
          <Link to="/">
          <button>Go back</button></Link>
        </div>
      )}</div>
    </div></div>
  );
};

export default Filter;
