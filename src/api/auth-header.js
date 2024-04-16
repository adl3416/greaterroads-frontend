import secureLocalStorage from "react-secure-storage";

const authHeader = () => {
  const token = secureLocalStorage.getItem("token"); // header objesini olusturmak icin:  getItem ile  ecureLocalStorage den tokene get ile aldim.

  let header = {};
  if (token) { //eger token doluysa ozaman header i  return ediyoruz.Bos sa bos döner.
    header = { Authorization: `Bearer ${token}` }; //bu obje  busekilde olusturulur
  }

  return header;
};

export default authHeader;