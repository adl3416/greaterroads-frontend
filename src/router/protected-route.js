import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children ,admin}) => { // children :<UserTemplate><ProfilePage/></UserTemplate>
   
     const {isUserLogin, user}= useSelector(state=> state.auth);    //once kullanicinin giris yapip yapmadigini ögrenmemiz gerekiyor. Burdan bize true yada false gelir
        //console.log(isUserLogin);
    // if(!isUserLogin) return <Navigate to="/auth"/>                  // eger kullanici giris yapmadiysa Navigate to="/auth"   kullaniyi giris sayfasina yonlendircek.  //giris yapmadan return a gecemicek
     // if(admin && !user.roles.includes("Administrator")) //yetkisizgiris=admin true geliyorsa ve rol Administrator degilse unauthorized bu sayfaya gitcek. admin yetkisi gerektiriyorsa ve admin rolu yoksa unauthorized  e gider
     // return <Navigate to ="unauthorized"/>;         
 
    
    
           return children;
   
 
}

export default ProtectedRoute 