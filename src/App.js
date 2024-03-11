
import React, { useEffect } from 'react'
import CustomRoutes from './router/custom-routes'
import secureLocalStorage from 'react-secure-storage'
import { getUser } from './api/user-service'
import { useDispatch } from 'react-redux'
import { loginFailed, loginSuccess } from './store/slices/auth-slice'

const App = () => {
  const dispatch=useDispatch();


  const loadData = async () =>  {  //kullanici giris yaptiktan sonra guncelleye basarsa eger tekrar giris yapmak zorunda kalmadan kendisi otomatik tekrar login olacak
    try {
      const token =secureLocalStorage.getItem("token")
      //console.log(token);
      if(token){ //eger önceden tokeni varsa buraya girer
        const resp =await getUser();  //token var, getuser yapiyorum kullanici bilgileri geliyo, merkezi state doldurmak icin dispatch yapiyoruz
        dispatch(loginSuccess(resp.data));// resp.data yi gönderiyoruz
      }

    } catch (err) {
      console.log(err)
      dispatch(loginFailed());
      
    }
   }


   useEffect(() => {
    loadData();     //1kere ilk giriste caliscak
     
   }, [])
   

  return (

    <>  
      <CustomRoutes/>
    </>
  )
}

export default App 