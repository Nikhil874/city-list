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
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from "react";
import Box from '@mui/material/Box';
import { AddCity } from "./AddCity";
import { getStepContentUtilityClass } from "@mui/material";
import {useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { getAPIData, toggleLoading } from "../loginDetails/action";
import CircularProgress from '@mui/material/CircularProgress';
const style = {
   
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export const HomePage=()=>{
  let {loading,data} =useSelector((store)=>store);
  let dispatch=useDispatch();

    let navigate=useNavigate()
   
 
  useEffect(()=>{

dispatch(getAPIData())
  },[])

 
  function handleAdd(){
      return navigate("/add-city")
  }
  function handleDelete(id){
    axios.delete(`https://citylist-country.herokuapp.com/cities/${id}`).then(()=>{
      dispatch(getAPIData())
   
    })

  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    return(
        <>
        {loading?<CircularProgress color="secondary"/>:
        <>
        <h1>List of cities </h1>
        <Button variant="contained" onClick={handleAdd}>ADD CITY</Button>
        <Stack spacing={2} direction="row">
       <h3>Filter By:</h3>     
      <Button variant="text" onClick={()=>{dispatch(getAPIData("con",1))}}>Country</Button>
      <Button variant="text" onClick={()=>{dispatch(getAPIData("pop",1))}}>Population asc</Button>
      <Button variant="text" onClick={()=>{dispatch(getAPIData("pop",-1))}}>Population desc</Button>
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
                      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
                      <TableCell align="right" onClick={()=>{handleDelete(item.id)}}>Delete </TableCell>
                   </TableRow>
               })
           }
        </TableBody>
        </Table>
        </TableContainer>
        </>}
        </>
    )
}