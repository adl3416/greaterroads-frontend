import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {

    const {pathname}=useLocation(); //
         //console.log(pathname);

         useEffect(() => { //sadece pathname degistiginde calismasini istedigimiz kodlari buraya yaziyoruz
            document.documentElement.scrollTo({ //yeni sayfaya basinca en ustden baslicak
                top:0, 
                left:0,    
                behavior: "instant"
            });
         }, [pathname])
         

  return null
  
  
}

export default ScrollToTop;