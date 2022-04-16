import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const AddCity=()=>{
    const [city,setCity]=useState({
        country:"",
        city:"",
        population:""
    })
    const [countries,setCountries]=useState([])
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
// let countryArray=[{name:"India"},{name:"Russia"}]
function getCountries(){
axios.get("http://localhost:8080/countries").then((res)=>{
    console.log(res.data)
    setCountries([...res.data])
})
}
useEffect(()=>{
getCountries()
},[])
function handleNavigate(value){
    if(value==1){
        navigate("/add-country")
    }else{
        navigate("/")
    }
   }
    return(
        <>
         <Stack spacing={2} direction="row" style={{"margin-left":"40%"}}>
      
        
         
      <Button variant="text" onClick={()=>handleNavigate(1)}>Add Country</Button>
      <Button variant="text" onClick={()=>handleNavigate(2)}>List of Cities</Button>
   
    </Stack>
        <h1>ADD CITY</h1>
        <label>Country: </label>
          <select name="" id="country" onChange={handleCity}>
            <option>Select Country</option>
            {countries.map((e) => {
              return (
                <>
                  <option value={e.country}>{e.country}</option>
                </>
              );
            })}
          </select>
      
       <br />
       <input type="text" value={city.city} id="city" required placeholder="enter city" onChange={(e)=>{handleCity(e)}}/>
       <br />
       <input type="number" value={city.population} id="population" placeholder="enter population" onChange={(e)=>{handleCity(e)}} />
       <br />
        <button onClick={handlePost} >Submit</button>
        </>
    )
}