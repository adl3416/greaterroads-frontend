import axios from "axios";
const {settings} = require("../utils/settings")

const API_URL = settings.apiURL;

const getVehicles=()=>{
     return axios.get(`${API_URL}/car/visitors/all`);
}
export{getVehicles}; 