import React from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../../store/slices/auth-slice';
import { question } from '../../../../utils/functions/swal';

const UserMenu= () => {

     const {isUserLogin,user }=useSelector(state=> state.auth); // merkezi staten den false yada true  durumunu aldik
     const dispatch = useDispatch(); //logout calistirmak icin dispatch kullanilir
     const navigate=useNavigate();

     const handleLogout = () => { 

      //mesajverecegiz bu fonksiyonu utilsde functionun icinde swalda olusturtuk
      question("Are you sure to logout").then(result=> {
        console.log(result)
        if(result.isConfirmed) { // logout a basdigimizda isConfirmed true oluyo vi dispatch calisiyor

          dispatch(logout());
          //localISROREGE bosaltilcak
          navigate("/") // logout dan sonra ana sayfaya yönlendiriyoz

        }
      })



    

      };

  return (
    <div className='user-menu'>
          {isUserLogin ? 
          
          <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
           {user.firstName} {user.lastName}
          </Dropdown.Toggle>
    
          <Dropdown.Menu>
            {user.roles.includes("Administrator") && (
              <>
                 <Dropdown.Item as={Link}  to ="/admin" >Admin Panel</Dropdown.Item>
              </>
            )}
           
            <Dropdown.Divider />   {/*  // duz cizgi cekiyo */}
            <Dropdown.Item as={Link}  to ="/profile">Profile</Dropdown.Item>
            <Dropdown.Item as={Link}  to ="/reservation">Reservation</Dropdown.Item>
            <Dropdown.Item  onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

           :
          
           <div>
               <Button variant='white'> Signin</Button>
               <Button variant='primary'>Register</Button>
           </div>
          }
    </div>
  )
}

export default UserMenu 