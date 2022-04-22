import {createStore} from "redux";
import { loginReducer } from "../loginDetails/reducer";

export const store = createStore(loginReducer);