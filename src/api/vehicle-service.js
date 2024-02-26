import axios from "axios";
const {settings} = require("../utils/settings")  // bu setting in importu 



const API_URL = settings.apiURL;

const getVehicles=()=>{
     return axios.get(`${API_URL}/car/visitors/all`);
};





const getVehiclesByPage=(page = 0, size= 10, sort= "model", direction="ASC")=>{ // page gömdermessem eger 0 olsun, size gönndermessem 10 olsun...1sayfada 10 arac olacak sonra2. sayfaya gececek
     return axios.get(
          `${API_URL}/car/visitors/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`
     );

};


export{getVehicles, getVehiclesByPage}; 

 