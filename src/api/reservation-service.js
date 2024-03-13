import axios from "axios" ;
import settings from "../utils/settings";
import authHeader from "./auth-header";


const API_URL =settings.apiURL;



export const isVehicleAvailable = (dto) => { //https://carrental-v3-backend.herokuapp.com/swagger-ui/index.html#/reservation-controller/checkCarIsAvailable
    const { carId, pickUpDateTime, dropOffDateTime } = dto; // dto obje olark gelecek burada aciyoruz. Yani isVehicleAvailable dto objesi göndercez burada ayircaz. 

    //bu get methodu  ? isareti ile göndercecegiz
    return axios.get(
        `${API_URL}/reservations/auth?carId=${carId}&pickUpDateTime=${pickUpDateTime}&dropOffDateTime=${dropOffDateTime}`,
        { headers: authHeader() });  //auth-header dan geliyo
        //bunu backende gönderiyoruz arac musait mi degilmi
  };


  
  export const createReservation = (carId, reservation) => {
    return axios.post(`${API_URL}/reservations/add?carId=${carId}`, reservation, {
      headers: authHeader(),
    });
  };
  
  export const getReservations = (
    page = 0,
    size = 20,
    sort = "pickUpTime",
    direction = "ASC"
    ) => {
    return axios.get(`${API_URL}/reservations/auth/all?page=${page}&size=${size}&sort=${sort}&direction=${direction}`, {
      headers: authHeader(),
    });
  };
  
  export const getReservation = (id) => {
    return axios.get(`${API_URL}/reservations/${id}/auth`, {
      headers: authHeader(),
    });
  };
  
  /* ADMIN SERVICES */
  
  export const getReservationsAdmin = (
    page = 0,
    size = 20,
    sort = "pickUpTime",
    direction = "ASC"
  ) => {
    return axios.get(`${API_URL}/reservations/admin/all/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`, {
      headers: authHeader(),
    });
  };
  
  export const getReservationByIdAdmin = (id) => {
    return axios.get(`${API_URL}/reservations/${id}/admin`, {
      headers: authHeader(),
    });
  };
  
  export const updateReservationByIdAdmin = (
    carId,
    reservationId,
    reservation
  ) => {
    return axios.put(
      `${API_URL}/reservations/admin/auth?carId=${carId}&reservationId=${reservationId}`,
      reservation,
      {
        headers: authHeader(),
      }
    );
  };
  
  export const deleteReservationByIdAdmin = (id) => {
    return axios.delete(`${API_URL}/reservations/admin/${id}/auth`, {
      headers: authHeader(),
    });
  };
  
  export const downloadReservations = () => {
    return axios.get(`${API_URL}/excel/download/reservations`, {
      headers: {
        ...authHeader(),
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "blob",
    });
  };

