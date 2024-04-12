import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"

const Update = () => {
  const [type, setType] = useState("")
  const [about, setAbout] = useState("")
  const navigate = useNavigate()
  const {id}  = useParams();

  useEffect(() => {
    axios
    .get(`http://localhost:3001/update/${id}`)
    .then((res) => {
      const useData = res.data
      if (useData) {
        setType(useData.type)
        setAbout(useData.about)
      }
    })
    .catch((err) => console.log(err))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
    .put(`http://localhost:3001/update/${id}`, {type, about})
    .then(result => {
      console.log(result)
      navigate('/')
    })
    .catch(err => {
      console.log(err)
    }) 
  }
  return (
    <div className="secondbody">
        <div className="formbox">
      <form action="" onSubmit={handleSubmit}>
        <center><h2>Update your feel</h2></center>
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

export default Update
