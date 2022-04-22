
import { LOADING_STATE } from "./action";
const initState={loading:false};

export const loginReducer=(store=initState,{type,payload})=>{
    console.log(store);
    switch(type){
        
                case LOADING_STATE:
                    return {...store,loading:payload}
        default:
            return store;
    }
}