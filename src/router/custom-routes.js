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
import ProfilePage from '../pages/user/profile-page'
import ProtectedRoute from './protected-route'
import ReservationDetailsPage from '../pages/user/reservation-details-page'
import ReservationsPage from '../pages/user/reservation-page'
import ScrollToTop from '../components/common/scroll-to-top/scroll-to-top'
import AdminTemplate from '../templates/admin-template'
import AdminDashboardPage from '../pages/admins/admin-dasboard-page'
import AdminVehicleNewPage from '../pages/admins/admin-vehicle-new-page'
import AdminUsersPage from '../pages/admins/admin-user-page'
import AdminUserEditPage from '../pages/admins/admin-user-edit-page'
import AdminVehiclesPage from '../pages/admins/admin-vehicles-page'
import AdminVehicleEditPage from '../pages/admins/admin-vehicle-edit-page'

const CustomRoutes = () => {
  return (
   <BrowserRouter>
      <ScrollToTop/>  {/* icinde bulundugumuz path in locasyonunu veriyor */}
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
                    <Route path="privacy-policy" element={<UserTemplate><PrivacyPolicyPage/></UserTemplate>}/>

                    <Route path="deneme" element={<UserTemplate><AdminVehicleNewPage/></UserTemplate>}/>
                   
                   <Route path='user'>
                         <Route index element={ <ProtectedRoute> <UserTemplate><ProfilePage/></UserTemplate> </ProtectedRoute> }/>  {/* Guvenlik icin kullanici giris yapmadan guncellemeyapmsini engellemek icin ProtectedRoute ile sarmalladik  */}
                           {/*   eger kullanici giris yapmissa childreni return edecek yani profilepage,ama giris yapmadiysa  Navigate ile giris sayfasina yönlendircek.ProtectedRoute bunu sagliyor */}
                           
                           <Route path="reservations">
                              <Route index  element={ <ProtectedRoute> <UserTemplate><ReservationsPage/></UserTemplate> </ProtectedRoute> }/>
                              <Route path=':reservationId'  element={ <ProtectedRoute> <UserTemplate><ReservationDetailsPage/></UserTemplate> </ProtectedRoute> }/>
                           </Route>
                    </Route> 


                    <Route path="admin">
                         <Route index element={<ProtectedRoute admin={true}> <AdminTemplate ><AdminDashboardPage/></AdminTemplate> </ProtectedRoute>}/>

                         <Route path="users">
                           <Route index element={<ProtectedRoute admin={true}><AdminTemplate><AdminUsersPage/></AdminTemplate></ProtectedRoute>}/>
                            <Route path=":userId" element={<ProtectedRoute admin={true}><AdminTemplate><AdminUserEditPage/></AdminTemplate></ProtectedRoute>}/>
                        </Route>

                        <Route path="vehicles">
                    <Route index element={<ProtectedRoute admin={true}><AdminTemplate><AdminVehiclesPage/></AdminTemplate></ProtectedRoute>}/>
                    <Route path=":vehicleId" element={<ProtectedRoute admin={true}><AdminTemplate><AdminVehicleEditPage/></AdminTemplate></ProtectedRoute>}/>
                    <Route path="new" element={<ProtectedRoute admin={true}><AdminTemplate><AdminVehicleNewPage/></AdminTemplate></ProtectedRoute>}/>
                  </Route>

                 </Route>





                    <Route path="*" element={<UserTemplate> <NotFoundPage/> </UserTemplate>} />
               </Route> 
          </Routes>
   </BrowserRouter> 


  )
}

export default CustomRoutes


