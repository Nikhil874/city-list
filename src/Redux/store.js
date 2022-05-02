import {createStore,applyMiddleware} from "redux";
import { loginReducer } from "../loginDetails/reducer";

const thunk=(store)=>(next)=>(action)=>{
if(typeof action === "function") return action(store.dispatch)
next(action)
}

export const store = createStore(loginReducer,applyMiddleware(thunk));