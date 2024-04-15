import { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
const Form = () => {
    const [type, setType] = useState("")
    const [about, setAbout] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post("http://localhost:3001/data", {
            type,
            about
        }).then((res) => {
            if (res.data.status) {
                console.log("Data stored")
            }
        }).catch((err) => {
            console.log(err)
        })
        navigate('/')
        window.location.reload();
    }
  return (
    <div className="secondbody">
        <div className="formbox">
      <form action="" onSubmit={handleSubmit}>
        <center><h2>Fill your feel</h2></center>
        <div className="typediv">
            <label htmlFor="text">Enter the type of Driver:</label><br />
            <input type="text" required onChange={(e) => setType(e.target.value)} className="text" />
        </div>
        <div className="aboutdiv">
            <label htmlFor="textbox">Enter about the convo :</label><br />
            <textarea name="About" id="" cols="30" rows="10" required onChange={(e) => setAbout(e.target.value)}></textarea>
        </div>
        <div className="btnsdiv">
            <div><Link to='/'><button>Back</button></Link></div>
            <div><button type="submit">Submit</button></div>
        </div>
      </form></div>
    </div>
  )
}

export default Form
