import axios from "axios";
export const LOADING_STATE="LOADING_STATE";
export const FETCHED_DATA="FETCHED_DATA";

export const toggleLoading=(payload)=>({type:LOADING_STATE,payload});
export const setAPIdata=(payload)=>({type:FETCHED_DATA,payload})


export const getAPIData=(type="",payload="")=>(dispatch)=>{
   dispatch(toggleLoading(true));
    axios.get("https://citylist-country.herokuapp.com/cities").then(({data})=>{
        if(type!==""){
            if(type=="pop"&&payload==1){
                data= data.sort(function(a,b) {return a.population-b.population});
            }else if(type=="pop"&&payload==-1){
                data= data.sort(function(a,b) {return b.population-a.population});
            }
            else if(type=="con"&&payload==1){
                data.sort(function (a,b) {return a.country.localeCompare(b.country)});
            }
        }
        dispatch(toggleLoading(false));
         dispatch(setAPIdata(data));
    }).catch((err)=>{
        dispatch(toggleLoading(false));
        console.log("error")
    })
}