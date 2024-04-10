import dummydata from './dummydata.json'
const Home = () => {
  return (
    <div className="container">
      <center><h2 className='heading'>Enjoy our content</h2></center>
          {dummydata.map((data) => {
            return (
              <div className='container' key={data.id}>
                <div className='container1'>
                <h3>Type of driver : {data.type}</h3>
                <h4>Type of conversation with them :</h4>
                <p>{data.about}</p></div>
              </div>
            )
          })}
    </div>
  )
}

export default Home
