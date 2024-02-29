import secureLocalStorage from "react-secure-storage";

const authHeader = () => {
  const token = secureLocalStorage.getItem("token"); // header objesini olusturmak icin:  getItem ile  ecureLocalStorage den tokene get ile aldim.

  let header = {};
  if (token) {
    header = { Authorization: `Bearer ${token}` };
  }

  return header;
};

export default authHeader;