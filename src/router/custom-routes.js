import React from 'react'  
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/user/home-page'
import UserTemplate from '../templates/user-template'
import AboutPage from '../pages/user/about-page'
import ContactPage from '../pages/user/contact-page'
import PrivacyPolicyPage from '../pages/user/privacy-policy-page'
import VehiclePages from '../pages/user/vehicle--page'
import VehicleDetailsPage from '../pages/user/vehicle-details-page'
import NotFoundPage from '../pages/common/not-found-page'
import UnauthorizedPage from '../pages/common/unauthorized-page'
import AuthPage from '../pages/user/auth-page'

const CustomRoutes = () => {
  return (
   <BrowserRouter>
          <Routes>
               <Route path="/">
                    <Route index element={<UserTemplate> <HomePage/> </UserTemplate>    }/>
                    <Route path="about" element={<UserTemplate> <AboutPage/> </UserTemplate>    }/>
                    <Route path="contact" element={<UserTemplate> <ContactPage/> </UserTemplate> }/>
                    <Route path="privacy-policy" element={<UserTemplate> <PrivacyPolicyPage/> </UserTemplate> }/>
                    <Route path="vehicles" >
                         <Route index element={<UserTemplate> <VehiclePages/> </UserTemplate>}/>
                         <Route path=":vehicleId" element={<UserTemplate> <VehicleDetailsPage/> </UserTemplate>} />
                    </Route>

                    <Route path="auth" element={<UserTemplate> <AuthPage/> </UserTemplate> }/>
                    <Route path="unauthorized" element={<UserTemplate> <UnauthorizedPage/> </UserTemplate>} />
                    <Route path="*" element={<UserTemplate> <NotFoundPage/> </UserTemplate>} />

               </Route> 
          </Routes>
   </BrowserRouter> 


  )
}

export default CustomRoutes