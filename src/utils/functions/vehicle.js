import settings from "../settings"





export const getVehicleImage = (id) => {  // gönderdigim id dizi olarak gelmisse o burda kontrol edilcek eger dizi ise true olur ve iceri girer ilk elemani alir.

    if(Array.isArray(id)) id=id[0];
    return `${settings.apiURL}/files/display/${id}`
 }