import React from 'react'
import SeatNum from './seatNum'

const Seat = ({seatId,seatName,clickFunc,closeRoom}) => {
 
  return (
    <div className='row-seat'>
        <SeatNum seatId={seatId} seatName={seatName} clickFunc={clickFunc} closeRoom={closeRoom}/>    
    </div>
  )
}

export default Seat