import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => { // children :<UserTemplate><ProfilePage/></UserTemplate>
   
     const isUserLogin= useSelector(state=> state.auth.isUserLogin);    //once kullanicinin giris yapip yapmadigini ögrenmemiz gerekiyor. Burdan bize true yada false gelir
        //console.log(isUserLogin);
     if(!isUserLogin) return <Navigate to="/auth"/>                  // eger kullanici giris yapmadiysa Navigate to="/auth"   kullaniyi giris sayfasina yonlendircek
           //giris yapmadan return a gecemicek
     return children;
   
 
}

export default ProtectedRoute