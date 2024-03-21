import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;
                                              // https://carrental-v3-backend.herokuapp.com/swagger-ui/index.html#/contact-message-controller/createMessage
export const sendMessage = (message) => {  //user tarafindan mesaj göndercek, bunlari post üzerinden backende göndercez
  return axios.post(`${API_URL}/contactmessage/visitors`, message);
};

export const getMessages = () => {
  return axios.get(`${API_URL}/contactmessage`, {
    headers: authHeader(),
  });
};

export const getMessage = (id) => {
  return axios.get(`${API_URL}/contactmessage/${id}`, {
    headers: authHeader(),
  });
};

export const getMessagesByPage = (
  page = 0,
  size = 20,
  sort = "subject",
  direction = "ASC"
) => {
  return axios.get(
    `${API_URL}/contactmessage/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    {
      headers: authHeader(),
    }
  );
};

export const deleteMessage = (id) => {
  return axios.delete(`${API_URL}/contactmessage/${id}`, {
    headers: authHeader(),
  });
};
