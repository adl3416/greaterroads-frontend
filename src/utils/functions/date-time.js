import moment from "moment";


export const combineDateAndTime = (date, time) => {  //backende date vetime birlesik ama bizim ekranimizda ayri, bu nedenle birlestirerek backende gönderiyoruz

  return moment(`${date} ${time}`).format("MM/DD/YYYY HH:mm:ss");
};
 

export const checkExpireDate = (expireDate) => {  //tarih kontrolu yapiliyor
  if (!expireDate) return false; //expireDate tamamen bos ise true gönder,
  if (expireDate.includes("_")) return false;
  const date = moment(`28/${expireDate}`, "DD/MM/YY"); // momen´t e burdaki sartlara göre tarih üret diyoruz
  if (!date.isValid()) return false; //eger tarih uygun degilse mesela 15. ay sa hemen return false yap
  if (date < new Date()) return false; //eger tarih suanki raihten geri ise return false yap
  return true;
};

export const getCurrentDate = () => {
  return moment().format("YYYY-MM-DD"); //mevcut tarihi bu formatta veriyo
};


export const getDate = (dateTime) => { // benim gönderdigim tarihi bu formatta veriyo
  return moment(dateTime).format("YYYY-MM-DD");
};

export const getTime = (dateTime) => {
  return moment(dateTime).format("HH:mm");
};

export const checkDates = (dates) => { //tarihleri karsilastircak
  const { pickUpDate, pickUpTime, dropOffDate, dropOffTime } = dates;

  const date1 = moment(`${pickUpDate} ${pickUpTime}`);
  const date2 = moment(`${dropOffDate} ${dropOffTime}`);

  return date2 >= date1.add(1, "h");   //date2 date1den buyuk olucak yani rezervsyn baslagic tarihginden önceki bir tarih secemicek
};

export const formatDateTimeToLLL = (dateTime) => {
  return moment(dateTime).format("lll");
};