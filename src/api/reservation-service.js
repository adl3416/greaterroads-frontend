import axios from "axios" ;
import settings from "../utils/settings";
import authHeader from "./auth-header";


const API_URL =settings.apiURL;



  const isVehicleAvailable = (dto) => { //https://carrental-v3-backend.herokuapp.com/swagger-ui/index.html#/reservation-controller/checkCarIsAvailable
    const { carId, pickUpDateTime, dropOffDateTime } = dto; // dto obje olark gelecek burada aciyoruz. Yani isVehicleAvailable dto objesi göndercez burada ayircaz. 

    //bu get methodu  ? isareti ile göndercecegiz
    return axios.get(
        `${API_URL}/reservations/auth?carId=${carId}&pickUpDateTime=${pickUpDateTime}&dropOffDateTime=${dropOffDateTime}`,
        { headers: authHeader() });  //auth-header dan geliyo
        //bunu backende gönderiyoruz arac musait mi degilmi
  };

export {isVehicleAvailable} 