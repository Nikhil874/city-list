import axios from "axios"
import { useState } from "react"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useNavigate} from "react-router-dom";
export const AddCountry=()=>{
    let [country,setCountry]=useState({
        country:""
    })
  function handleAdd(){
      axios.post("https://citylist-country.herokuapp.com/countries",country).then((res)=>{
          alert("data added")
          setCountry({country:""})
      })
  }
  let navigate=useNavigate()
  function handleNavigate(value){
   if(value==1){
       navigate("/add-city")
   }else{
       navigate("/")
   }
  }
  function handleChange(e){
      let {id,value}=e.target;
      console.log(id,value)
      setCountry({[id]:value})
  }
    return(
        <>
        <Stack spacing={2} direction="row" style={{"margin-left":"40%"}}>
      
        
         
      <Button variant="text" onClick={()=>handleNavigate(1)}>Add City</Button>
      <Button variant="text" onClick={()=>handleNavigate(2)}>List of Cities</Button>
   
    </Stack>
    <h1>Add Country</h1>
        <input type="text" id="country" placeholder="Enter Country"  onChange={(e)=>handleChange(e)}/>
        <button onClick={handleAdd}>Submit</button>
        </>
    )
}