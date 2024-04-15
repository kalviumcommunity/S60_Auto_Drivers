import { useState } from "react"
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/login", {
      username,
      password
    }).then(res => {
      if(res.data.status) {
        alert(res.data.message)
        navigate("/")
      }
    }).catch(err => {
      alert(err.response.data.message)
      console.log("Error vachindhi mowa", err)
    })
  }
  return (
    <div className="secondbody1">
      <div className="formbox1">
        <center><h2>Login here!</h2></center>
      <form action="" onSubmit={handleSubmit}>
        <div className="inputdiv">
          <label htmlFor="text">Username :</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="inputdiv">
          <label htmlFor="password">Password :</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="btnsdiv1">
          <button type="submit">Login</button>
        </div>
        <div className="div"> 
          <p>Dont have an account ? <Link to={"/register"}><strong>Click here</strong></Link></p>
        </div>
      </form></div>
    </div>
  )
}

export default Login
