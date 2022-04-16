import axios from "axios"
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AddCity } from "./AddCity";
import { getStepContentUtilityClass } from "@mui/material";
import {useNavigate} from "react-router-dom"
export const HomePage=()=>{
    let [data,setData]=useState([]);
    let navigate=useNavigate()
    function getData(){
        axios.get(" http://localhost:8080/cities").then((res)=>{
            console.log(res.data)
            setData([...res.data]);
        })
    }
 
  useEffect(()=>{
getData()
  },[])
  function handleCountry(){
  data.sort(function (a,b) {return a.country.localeCompare(b.country)})
  console.log(data);
 setData([...data])
  }
  function handlePopulation(value){
      if(value==1){
          data.sort(function(a,b) {return a.population-b.population})
      }else{
        data.sort(function(a,b) {return b.population-a.population})
      }
      setData([...data])
  }
  function handleAdd(){
      return navigate("/add-city")
  }
  function handleDelete(id){
    axios.delete(`http://localhost:8080/cities/${id}`).then(()=>{
        
        getData();
    })

  }
    return(
        <>
        <h1>List of cities </h1>
        <Button variant="contained" onClick={handleAdd}>ADD CITY</Button>
        <Stack spacing={2} direction="row">
       <h3>Filter By:</h3>     
      <Button variant="text" onClick={handleCountry}>Country</Button>
      <Button variant="text" onClick={()=>{handlePopulation(1)}}>Population asc</Button>
      <Button variant="text" onClick={()=>{handlePopulation(-1)}}>Population desc</Button>
    </Stack>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Population</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {
               data.map((item)=>{
                   return <TableRow key={item.id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="right">{item.id}</TableCell>
                      <TableCell align="right">{item.country}</TableCell>
                      <TableCell align="right">{item.city}</TableCell>
                      <TableCell align="right">{item.population}</TableCell>
                      <TableCell align="right">Edit</TableCell>
                      <TableCell align="right" onClick={()=>{handleDelete(item.id)}}>Delete </TableCell>
                   </TableRow>
               })
           }
        </TableBody>
        </Table>
        </TableContainer>
        </>
    )
}