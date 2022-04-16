import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const AddCity=()=>{
    const [city,setCity]=useState({
        country:"",
        city:"",
        population:""
    })
    let navigate=useNavigate()
    function handleCity(e){
       const {id,value}=e.target
       console.log(id,value)
       setCity({...city,[id]:value})
    }
    function handlePost(){
         axios.post("http://localhost:8080/cities",city).then((res)=>{
             alert("data sucessfully added")
             setCity({
                country:"",
                city:"",
                population:"" 
             })
           navigate("/")
         })
    }

    return(
        <>
        <h1>ADD CITY</h1>
       <input type="text" value={city.country} id="country" required placeholder="enter Country" onChange={(e)=>{handleCity(e)}}/>
       <br />
       <input type="text" value={city.city} id="city" required placeholder="enter city" onChange={(e)=>{handleCity(e)}}/>
       <br />
       <input type="number" value={city.population} id="population" placeholder="enter population" onChange={(e)=>{handleCity(e)}} />
       <br />
        <button onClick={handlePost} >Submit</button>
        </>
    )
}