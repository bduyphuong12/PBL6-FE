import React, { Fragment, useState, useEffect } from "react";
import CornAndWater from "./CornAWater/cornandwater";
import axios from 'axios';


export default function TableCornAndWater() {
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
          setlcByRoomPhimID(res.data);
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
    <div>
      <div className="container-fluid bg-light" style={{ paddingTop: 20 }}>
        <div className="bookCorn__content row mt-5">
          <CornAndWater 
            lcByRoomPhimID={lcByRoomPhimID}
            phimDetail={phimDetail}
            lcbyid={lcbyid}
          />
        </div>
      </div>
    </div>
  );
}
