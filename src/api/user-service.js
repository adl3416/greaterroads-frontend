import axios from "axios" ;
import settings from "../utils/settings";
import authHeader from "./auth-header";


const API_URL =settings.apiURL;

export const register = (user)=>{
    return axios.post(`${API_URL}/register`,user);
};

export const login = (credentials) => {    //backenden bakiyoruz nasil olduguna  "https://carrental-v3-backend.herokuapp.com/swagger-ui/index.html#/user-jwt-controller/authenticate"
    return axios.post(`${API_URL}/login`, credentials); // backende datalar obje  seklinde oldugu icin  credentials yaptik
  };


  export const getUser = () => {
    return axios.get(`${API_URL}/user`, { headers: authHeader() });  //auth-header dan geliyo
  };

  export  const updateUser = (user) => { // kullanici kendi bilgilerini guncelleyecek
    return axios.put(`${API_URL}/user`, user, { headers: authHeader() });
  };


  export  const updatePassword = (passwords) => { //kullanici pasaportu guncelleyecek
    return axios.patch(`${API_URL}/user/auth`, passwords, {
      headers: authHeader(),
    });
  };





  /* ADMIN SERVICES */
export const getUsers = () => {
  return axios.get(`${API_URL}/user/auth/all`, { headers: authHeader() });
};

export const getUsersByPage = (
  page = 0,
  size = 20,
  sort = "firstName",
  direction = "ASC"    //a dan z ye gelsin
) => {
  return axios.get(
    `${API_URL}/user/auth/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    { headers: authHeader() }
  );
};

export const downloadUsers = () => {
  return axios.get(`${API_URL}/excel/download/users`, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: "blob",
  });
};


export const getUserById = (id) => {
  return axios.get(`${API_URL}/user/${id}/auth`, { headers: authHeader() });
};

export const updateUserById = (id, user) => {
  return axios.put(`${API_URL}/user/${id}/auth`, user, { headers: authHeader() });
}

export const deleteUserById = (id) => {
  return axios.delete(`${API_URL}/user/${id}/auth`, { headers: authHeader() });
}

