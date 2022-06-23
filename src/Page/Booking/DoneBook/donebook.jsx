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
  
  if(phimDetail && lcbyid && gd){
    return (
      <div>
        <header className='doneBook'>
            <h3>Chúc mừng bạn đã đặt vé thành công</h3>
            <h4>Lưu ý: Hãy chụp mã QR Code này rồi đưa mã cho nhân viên bán vé để kiểm tra thông tin!</h4>
          <div>
            <QRCode
              id='qrcode'
              value={ 'idGD: '+ id_gd + '.   ' +'idUser: ' + user.ID_User +'.    ' + 'Time: ' + moment(lcbyid.thoi_gian_chieu).format("DD/MM/yyyy hh:mm A") + '.    ' +  'Room: ' + lcByRoomPhimID.room_id + '.    ' +   'Seat: ' + soGhe + '.   '+'Total: ' + gd.so_tien +'000' 
               
            
            }
              size={290}
              level={'H'}
              includeMargin={true}
            />
          </div>
        </header>
        <div className='detail-user'>
          
              <h4>Thông tin vé được gửi về</h4>
              <p>Email: {user.Email}  </p>
              <p>Tên phim: {phimDetail.ten_phim}</p>
              <p>Ngày đặt: {moment(Date().toLocaleString()).format("DD/MM/yyyy  hh:mm A") }</p>
              <p>Suất chiếu: {moment(lcbyid.thoi_gian_chieu).format("DD/MM/yyyy")}  {moment(lcbyid.thoi_gian_chieu).format("hh:mm A")}</p>
              <p>Rạp số: {lcByRoomPhimID.room_id}</p>
              <p>Số ghế: {soGhe}</p>
        </div>
      </div>
    );
  }

  }
  

export default DoneBook;