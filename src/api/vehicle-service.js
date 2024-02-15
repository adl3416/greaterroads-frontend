import axios from "axios";
const {settings} = require("../utils/settings")  // bu setting in importu 



const API_URL = settings.apiURL;

const getVehicles=()=>{
     return axios.get(`${API_URL}/car/visitors/all`);
};

const getVehiclesByPage=(page = 0, size= 10, sort= "model", direction="ASC")=>{
     return axios.get(
          `${API_URL}/car/visitors/page?page=${page}&size=${size}&sort=${sort}&direction=${direction}`
     );

};


export{getVehicles, getVehiclesByPage}; 