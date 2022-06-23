import React, { Fragment, useState, useEffect } from "react";
import ChooseSlot from "./ChooseSlot/chooseslot";

import axios from 'axios';

export default function BookingTicket(props) {
  
  const getUrlPhim= window.location.href.split("/");
  const phimID = getUrlPhim[getUrlPhim.length - 3]
  const roomID = getUrlPhim[getUrlPhim.length - 2]
  const id = getUrlPhim[getUrlPhim.length-1]
  
  const [lcByRoomPhimID,setlcByRoomPhimID] = useState(null);
  const [lcbyid,setlcbyid] = useState(null);
  useEffect(() => {
    const getLCID = () => {
      axios.get('/lc/detail/' + id ).then(res => {
        setlcbyid(res.data);
      })
    }
    getLCID();
  },[id]);
  
  useEffect(() => {
    const getLCByRoomPhimID = () => {
      axios.get('/lc/getlc/' + phimID + '/'+ roomID ).then(res => {
        setlcByRoomPhimID(res.data.result[0]);
      })
    }
    getLCByRoomPhimID();
  },[phimID,roomID]);
  
  const [phimDetail,setPhimDetail] = useState(null);
  useEffect(() => {
    const getPhimDetail = () => {
      axios.get('/phim/detail/' + phimID).then(res => {
        setPhimDetail(res.data.result[0]);
      })
    }
    getPhimDetail();
  },[phimID]);
 
 
  return (
    <Fragment>
      <div className="container-fluid bg-light" style={{ paddingTop: 30 }}>
        <div className="bookTicket__content row mt-5">
          <ChooseSlot lcByRoomPhimID = {lcByRoomPhimID}
                      phimDetail={phimDetail}
                      lcbyid = {lcbyid}
                     
                      
          />
          {/* <Checkout lcByRoomPhimID = {lcByRoomPhimID}
                      phimDetail={phimDetail}
                      total={props}
                      
                      
            
          /> */}
          
        </div>
        
      </div>
    </Fragment>
  );
}
