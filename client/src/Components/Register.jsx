import { useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confirmpass, setConfirmpass] = useState("")
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/signup", {
            username,
            password,
            email,
            confirmpass
        }).then(response => {
            if(response.data.status) {
                alert("You are registered successfully")
                navigate('/login')
            }
        }).catch ((err) => {
            alert(err.response.data.message);
            console.log("error occured",err)
        }) 
    }
  return (
    <div className="secondbody1">
        <div className="formbox1">
      <form action="" onSubmit={handleSubmit}>
        <center>
        <h2>SignUp with us.</h2></center>
        <div className="inputdiv">
            <label htmlFor="text">
                Username :
            </label>
            <input type="text" className="text" required onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="inputdiv">
            <label htmlFor="email">Email :</label>
            <input type="email" required onChange={(e) => setEmail(e.target.value)} />
        </div>
       
        <div className="inputdiv">
            <label htmlFor="password">Password :</label>
            <input type="password" className="text" required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="inputdiv">
            <label htmlFor="password">Confirm password :</label>
            <input type="password" className="text" required onChange={(e) => setConfirmpass(e.target.value)} />
        </div>
        <center>
        <div className="btnsdiv1">    
        <button type="submit">Signup</button></div></center>
      </form></div>
    </div>
  )
}

export default Register
