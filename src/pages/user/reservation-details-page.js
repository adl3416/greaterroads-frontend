import React from 'react'
import Spacer from '../../components/common/spacer/spacer'
import PageHeader from '../../components/user/common/page-header/page-header'
import ReservationDetails from '../../components/user/reservations/reservation-details'

const ReservationDetailsPage = () => {
  return (
    <>
      <PageHeader title="Reservation Details" />
      <Spacer/>
      <ReservationDetails/>
      <Spacer/>
    </>
  )
}

export default ReservationDetailsPage