import axios from "axios" ;
import settings from "../utils/settings";

const API_URL =settings.apiURL;

const register = (user)=>{
    return axios.post(`${API_URL}/register`,user);
};

export {register}