import axios from "axios" ;
import settings from "../utils/settings";
import authHeader from "./auth-header";


const API_URL =settings.apiURL;

const register = (user)=>{
    return axios.post(`${API_URL}/register`,user);
};

 const login = (credentials) => {    //backenden bakiyoruz nasil olduguna  "https://carrental-v3-backend.herokuapp.com/swagger-ui/index.html#/user-jwt-controller/authenticate"
    return axios.post(`${API_URL}/login`, credentials); // backende datalar obje  seklinde oldugu icin  credentials yaptik
  };


  const getUser = () => {
    return axios.get(`${API_URL}/user`, { headers: authHeader() });  //auth-header dan geliyo
  };

export {register,login,getUser}