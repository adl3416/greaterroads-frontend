import React from 'react'
import Header from '../components/user/common/header/header'
import Footer from '../components/user/common/footer/footer'

const UserTemplate = (props) => {
     const { children } = props;
  return (
    <>
    <Header/>
          {children}
    <Footer/>
     </>
  )
}

export default UserTemplate