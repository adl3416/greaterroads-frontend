


import React from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../../store/slices/auth-slice';
import { question } from '../../../../utils/functions/swal';
import "./user-menu.scss";

const UserMenu = () => {
     const {isUserLogin,user}= useSelector((state) => state.auth);
     const dispatch = useDispatch();
     const navigate = useNavigate(); // anasayfaya yönlendiriyoruz 

     const handleLogout = () => {
          question("Sind Sie sicher?").then((result)=>{

               if(result.isConfirmed){
                dispatch(logout());
                   // localSTOREGE bosaltilcak;
                navigate("/");  // ana sayfaya gitcek
               }
          }); 

      };
      
  return (
    <div className= "user-menu">

     {isUserLogin ? (             //align="end"  menuyu sag tarafa sifirlar
      <Dropdown align="end"> 
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {user.firstName}{user.lasstName}
      </Dropdown.Toggle>

      <Dropdown.Menu> 

          {user.roles.includes("Administrator") &&(             /* userin rolleri icersinde,Administrator iceriyorsa eger true ise alt satiri yani admin paneli goster yoksa gösterme*/
               <>
                <Dropdown.Item as={Link} to="/admin">Admin Panel </Dropdown.Item> 
                <Dropdown.Divider /> 
               </>
          )  }


       
        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
        <Dropdown.Item as={Link} to="/reservation">Reservation</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout} >Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> 
  ):   ( 
     <div> 
          <Button variant="white" as={Link} to="/auth"> Sigin</Button>
          <Button as={Link} to="/auth">Register</Button>
     </div>    
     )}


      
    </div>
  );
};

export default UserMenu