import moment from "moment";


export const combineDateAndTime = (date, time) => {  //backende date vetime birlesik ama bizim ekranimizda ayri, bu nedenle birlestirerek backende gönderiyoruz

  return moment(`${date} ${time}`).format("MM/DD/YYYY HH:mm:ss");
};
 