
import { FETCHED_DATA, LOADING_STATE } from "./action";
const initState={loading:false,data:[]};

export const loginReducer=(store=initState,{type,payload})=>{
    console.log(store);
    switch(type){
        
                case LOADING_STATE:
                    return {...store,loading:payload};
                    case FETCHED_DATA:
                        return {...store,data:payload};
        default:
            return store;
    }
}