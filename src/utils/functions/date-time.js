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