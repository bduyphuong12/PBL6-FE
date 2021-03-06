import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QRCode from 'qrcode.react';
import './donebook.css'
import axios from 'axios';
function DoneBook() {
  var moment = require("moment");
  const getUrlPhim= window.location.href.split("/");
  const phimID = getUrlPhim[getUrlPhim.length - 3]
  const roomID = getUrlPhim[getUrlPhim.length - 2]
  const id = getUrlPhim[getUrlPhim.length-1]
  const [phimDetail,setPhimDetail] = useState(null);
  const user = useSelector((state) => state.auth.login.currentUser);
  const iduser = user.ID_User
  const soGhe = localStorage.getItem('soGhe')
  const [DetailGD, setDetailGD] = useState(null);
  const [lcbyid,setlcbyid] = useState(null);
  const [lcByRoomPhimID,setlcByRoomPhimID] = useState(null);
    useEffect(() => {
      const getLCID = () => {
        axios.get('/lc/detail/' + id ).then(res => {
          setlcbyid(res.data.result[0]);
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
  
  useEffect(() => {
    const getPhimDetail = () => {
      axios.get('/phim/detail/' + phimID).then(res => {
        setPhimDetail(res.data.result[0]);
      })
    }
    getPhimDetail();
  },[phimID]);
  
  useEffect(() => {
    const getDetailGD = () => {
      axios.get('/dg/getByIdUser/' + iduser ).then(res => {
        setDetailGD(res.data.result);
      })
    }
    getDetailGD();
  },[iduser]);  
  
  var id_gd;
  if (DetailGD){
     id_gd = DetailGD[DetailGD.length-1].id
  }
  
  // const idGd = localStorage.getItem('idgd')
  // console.log(idGd)
  const [gd,setGd] = useState(null)
  useEffect(() => {
    const getgd = () => {
      axios.get('/dg/detail/' + id_gd).then(res => {
        setGd(res.data.result[0]);
      })
    }
    getgd();
  },[id_gd]);
  function xuliDate(val){
    var hour = val.substring(11,13);
    var minute = val.substring(14,16);

    var daytime = hour+':'+ minute;
    return(daytime);
  }

  function xuliDay(val){
    var year = val.substring(0,4);
    var month = val.substring(5,7);
    var dt = val.substring(8,10);

    var day = year+'-' + month + '-'+dt;
    return(day);
  }
  if(phimDetail && lcbyid && gd){
    return (
      <div>
        <header className='doneBook'>
            <h3>Ch??c m???ng b???n ???? ?????t v?? th??nh c??ng</h3>
            <h4>L??u ??: H??y ch???p m?? QR Code n??y r???i ????a m?? cho nh??n vi??n b??n v?? ????? ki???m tra th??ng tin!</h4>
          <div>
            <QRCode
              id='qrcode'
              value={ 'idGD: '+ id_gd + '.   ' +'idUser: ' + user.ID_User +'.    ' + 'Time: ' + xuliDay(lcbyid.thoi_gian_chieu) + ' '+ xuliDate(lcbyid.thoi_gian_chieu)+ '.    ' +  'Room: ' + lcByRoomPhimID.room_id + '.    ' +   'Seat: ' + soGhe + '.   '+'Total: ' + gd.so_tien +'000' 
               
            
            }
              size={290}
              level={'H'}
              includeMargin={true}
            />
          </div>
        </header>
        <div className='detail-user'>
          
              <h4>Th??ng tin v?? ???????c g???i v???</h4>
              <p>Email: {user.Email}  </p>
              <p>T??n phim: {phimDetail.ten_phim}</p>
              <p>Ng??y ?????t: {moment(Date().toLocaleString()).format("DD/MM/yyyy  hh:mm A") }</p>
              <p>Su???t chi???u: {xuliDay(lcbyid.thoi_gian_chieu)}  {xuliDate(lcbyid.thoi_gian_chieu)}</p>
              <p>R???p s???: {lcByRoomPhimID.room_id}</p>
              <p>S??? gh???: {soGhe}</p>
        </div>
      </div>
    );
  }

  }
  

export default DoneBook;