import React, { Fragment, useEffect, useState } from "react";
import "./chooseslot.scss";
import axios from 'axios';
import swal from "sweetalert";
import Seat from "./seat";
import { Link } from "react-router-dom";
import CreditModal from "../CornAndWater/CreditModal/CreditModal";
export default function ChooseSlot({lcByRoomPhimID,phimDetail,lcbyid}) {
  var moment = require("moment");
  const [dataSeatRow, setDataRow] = useState(null);
  const [listSeatCol, setListSeatCol] = useState(null);
  const getUrlPhim= window.location.href.split("/");
  const roomID = getUrlPhim[getUrlPhim.length - 2]
  const [load,setLoad] = useState(false)
  useEffect(() => {
    const getSeatRow =  () => {
         axios.get('/seat/getByRoomId/'+roomID).then(res => {
            setDataRow(res.data);
        })
      }
      const getListSeatCol =  () => {
         axios.get('/seatNo/list').then(res => {
            setListSeatCol(res.data);
        })
      }
      getListSeatCol();
      getSeatRow();
      
 },[])
       const compare =( a, b ) => {
          if ( a.Row_No < b.Row_No ){
            return -1;
      }
       if ( a.Row_No > b.Row_No ){
          return 1;
         }
            return 0;
        }
  
  const [counter, setCounter] = useState(60 * 5);
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      swal("Bạn đã chọn vé quá lâu!", {
        icon: "error",
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [counter]);
  const[detailSeat,setDetailSeat] = useState([]);
  const [listChoose, setListChoose] = useState([]);
  const updateListChoose = async (id_Seat) => {     
    // var b = axios.get('/seat/info/' + id_Seat)
    
    if(!listChoose.includes(id_Seat)) {
      setListChoose(arr => [...arr,id_Seat] ) 
      setLoad(!load)
    }   
    else {                                       
      let newArr = [...listChoose];              
      newArr.splice(listChoose.indexOf(id_Seat),1);   
      setListChoose(newArr); 

      var a = detailSeat.filter(e => {
        return e.id.toString() !== id_Seat.toString()
      })
      let b = [...a];
      setDetailSeat([])
      setDetailSeat(b)
      
    }                                   
  }    
  
  useEffect(() => {
    const getSeatDetail = async () => {
      if(listChoose.length!==0){
        var elemet = listChoose[listChoose.length-1]
      
      await axios.get('/seat/info/' + elemet).then(res => {
        setDetailSeat([...detailSeat,res.data.result[0]]);

      })
      }
      
    }
    getSeatDetail();
  },[load]);
  
  
  const datVe = (subMoney,seatNumber,seatID) =>{
    localStorage.setItem('gia',subMoney)
    localStorage.setItem('soGhe',seatNumber)
    localStorage.setItem('IDGhe',seatID)
  }
  
  const money = listChoose.length*50000
  const seatNumber = detailSeat.map(e =>{
    return e.Row_No + ''+e.Seat_No
  })
  const seatID = detailSeat.map(e =>{
    return e.id
  })

 

  if(phimDetail && lcbyid && lcByRoomPhimID){
    return (
      <>
      <div className="checkOut__left col-md-9 col-sm-12 p-0">
        <div className="bookSlot">
          <div className="bookSlot__content">
            <div className="theater__info d-flex justify-content-between">
              <div className="theater__img d-flex bg-light">
                <img src={phimDetail.poster} alt="hinhanh" />
                <div className="theater__name">
                  <span className="name">
                    <span className="subname">
                      Rạp {roomID}
                    </span>
                  </span>
                  <p className="showtime">
                    Giờ chiếu: {moment(lcbyid.thoi_gian_chieu).format("hh:mm A")}
                  </p>
                </div>
              </div>
              <div className="timeKeepSlot">
                <p className="title__text">thời gian giữ ghế</p>
                <span className="time">{counter + "s"}</span>
              </div>
            </div>
            <div className="chooseSlot">
              <div className="screen__img">
                <img src="https://i.ibb.co/zWgWjtg/screen.png" alt="screen" />
              </div>
              <div className="picking ">
                <div className="slot__picking col-11">
                  
                    <div >
                    
                    {React.Children.toArray(
                    dataSeatRow.result.sort(compare).map(d=>(
                     <Seat seatId={d.Seat_Id} seatName={d.Row_No} clickFunc={updateListChoose}/>
                    )))}
                  </div>
                </div>
              </div>
              <div className="slot__detail row">
                <div className="col-md-3 col-sm-6 col-xs-6">
                  <span className="seat" />  <span className="slot__text">N/A</span>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-6">
                  <span className="seat selected" /> <span className="slot__text">Selected</span> 
                </div>
                <div className="col-md-3 col-sm-6 col-xs-6">
                  <span className="seat occupied" /> <span className="slot__text">Occupied</span> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="checkOut__right col-md-3 col-sm-12">
        <div className="checkout__form">
          <div className="total__price">
            <span className="price">{listChoose.length * 50000}VND</span>
          </div>
          <div className="film__info">
            <span className="film__age--C">
              Rạp {roomID}
            </span>
            <span className="film__name">
              {phimDetail.ten_phim}
            </span>
            <p className="film__detail">
            {moment(lcbyid.thoi_gian_chieu).format("DD/MM/yyyy")}  {moment(lcbyid.result[0].thoi_gian_chieu).format("hh:mm A")}
            
            </p>
           
          </div>
          <div className="count__slot">
          <div>Số ghế chọn:  </div>
            {
              React.Children.toArray(
                detailSeat.map(d =>(
                  <span className="slot">{d.Row_No}{d.Seat_No} </span>
                ))
              )
            }
          </div>
          <div className="discountForm d-flex justify-content-between">
            <div className="discountForm__content">
              <label className="label__name">Mã giảm giá</label>
              <input
                type="text"
                name="code"
                id="txtDiscountCode"
                className="form-control d-inline"
                
              />
            </div>
            <button id="btnCheckCode" className="btn mb-2">
              Áp dụng
            </button>
          </div>
          <div className="payForm">
            <a className="pay__link" href="/#">
              <span className="title__text">Hình thức thanh toán</span>
              <p className="text__notification">
                Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp.
              </p>
            </a>
          </div>
        </div>
        <div className="textNotification text-center">
          <i className="fa fa-info-circle text-danger mr-1" />
          <span className="noti__text">
            Vé đã mua không thể đổi hoặc hoàn tiền Mã vé sẽ được gửi qua tin nhắn{" "}
            <span className="noti__link">ZMS</span> (tin nhắn Zalo) và{" "}
            <span className="noti__link">Email</span> đã nhập.{" "}
          </span>
        </div>
        <div>
        <Link
          className="btnContinue"
          to={'/cornAwater/'+ lcByRoomPhimID.id_phim + '/'+ lcByRoomPhimID.room_id + '/'+lcbyid.result[0].id
            
          }
          
          onClick={money >0 ?datVe(money,seatNumber,seatID):function(e){alert('Vui lòng chọn ghế!') 
            window.location.reload()}}
          
          
        >
          Tiếp theo
        </Link>
        </div>
        
        
      </div>
      </>
      
    );
  }
}




