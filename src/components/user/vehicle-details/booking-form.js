import React from 'react'
import SectionHeader from "../common/section-header/section-header"
import { Form } from 'react-bootstrap'

const BookingForm = () => {
  return (


    <>
            <SectionHeader title="Booking Form"/>
            <Form noValidate> {/* noValidate: react bootstrap özelliklerini devre disi birakmak icin  */}

            </Form>
    </>
  )
}

export default BookingForm