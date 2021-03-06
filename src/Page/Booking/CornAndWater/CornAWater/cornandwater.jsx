import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import './cornandwater.scss'
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import swal from "sweetalert";
import CreditModal from '../CreditModal/CreditModal'
function CornAndWater({lcByRoomPhimID,phimDetail,lcbyid}) {
  const getUrlPhim= window.location.href.split("/");
  const phimID = getUrlPhim[getUrlPhim.length - 3]
  const roomID = getUrlPhim[getUrlPhim.length - 2]
  const idlc = getUrlPhim[getUrlPhim.length-1]

  const [item, setItem] =  useState(null);
  var subTotal = localStorage.getItem('gia')
  
  const soGhe = localStorage.getItem('soGhe')
  const seatID = localStorage.getItem('IDGhe')

  
  var seatIdArray = seatID.split(',').map(Number);
  
  const [countN, setCountN] = useState(0)
  const [countB, setCountB] = useState(0)
  const [countCB1, setCountCB1] = useState(0)
  const [countCB2, setCountCB2] = useState(0)
  const sbTotal = Number(subTotal)
  const totalAll = sbTotal + countN*25000 + countB*20000 + countCB1*60000 + countCB2*80000
  const total = () =>{
    return totalAll
  }
  
  useEffect(() => {
    const getItem = () => {
      axios.get('/mh/list' ).then(res => {
        setItem(res.data.result);
      })
    }
    getItem();
  },[]);
  const user = useSelector((state) => state.auth.login.currentUser);
  
  var moment = require("moment");
  const data = {
    id: null,
    ngay: moment(Date().toLocaleString()).format("yyyy/MM/DD hh:mm:ss"),
    id_user: user.ID_User,
    so_tien: totalAll/1000
  }
  
  const [DetailGD, setDetailGD] = useState(null);
  
    

   
  // const getDetailGD = () => {
  //   axios.get('/dg/getByIdUser/' + iduser ).then(res => {
  //     setDetailGD(res.data.result);
  //   })
  // }
  
  
  
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
    
    
    
  const datVe = async () => {
    
      swal({
      
        title: "B???n ch???c ch????",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then( async (willDelete) => {
        if (willDelete) {
          swal("Thanh to??n th??nh c??ng! Ch??c b???n xem phim vui v???", {
            icon: "success",
          });
          await axios.post('/dg/add',data)
           var getIDGD = null;
            getIDGD = await axios.get('/dg/getByIdUser/' + user.ID_User )
           
           var id_gd;
           if (getIDGD.data){
             id_gd = getIDGD.data.result[getIDGD.data.result.length-1].id
          } 
          
          const dataDetailGDVe = {
            id: null,
            id_giao_dich: id_gd,
            id_hang: '1',
            so_luong:sbTotal/50000
          }
          
        const dataDetailGDN = {
          id: null,
          id_giao_dich: id_gd,
          id_hang: '2',
          so_luong:countN
        }
        const dataDetailGDB = {
          id: null,
          id_giao_dich: id_gd,
          id_hang: '3',
          so_luong:countB
        }
        const dataDetailGDCB1 = {
          id: null,
          id_giao_dich: id_gd,
          id_hang: '4',
          so_luong:countCB1
        }
        const dataDetailGDCB2 = {
          id: null,
          id_giao_dich: id_gd,
          id_hang: '5',
          so_luong:countCB2
        }
           axios.post('/ctdg/add',dataDetailGDVe)
           if(countN>0){
            axios.post('/ctdg/add',dataDetailGDN)
           }
           if(countB>0){
            axios.post('/ctdg/add',dataDetailGDB)
           }
           if(countCB1>0){
            axios.post('/ctdg/add',dataDetailGDCB1)
           }
           if(countCB2>0){
            axios.post('/ctdg/add',dataDetailGDCB2)
           }
           const updateSove =  {
            id_phim:phimDetail.id_phim,
            so_ve: phimDetail? phimDetail.so_ve + sbTotal/50000:0
          }
            axios.put(`/phim/updatesove/${updateSove.id_phim}/${updateSove.so_ve}`);
           seatIdArray.forEach(id => {
            axios.put(`/seat/updatePo/${id}`)
          });

          setTimeout(() => {
            window.location.assign('/donebook/'+phimID+'/'+roomID+'/'+idlc);
          }, 2000);
        } else {
          swal("Ch???n l???i n??o!");
        }
      });
    
    
};
  
  if(phimDetail && item && lcbyid){
    return (
      <>
        <div className="content">
            <Col md="9">
              <Card className="card-plain">
                <CardHeader>
                 <h1>????? u???ng</h1>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        {/* <th>S??? th??? t???</th> */}
                        <th>S???n ph???m</th>
                        <th>Gi?? ti???n</th>
                        <th>S??? l?????ng</th>
                         
                      </tr>
                    </thead>
                    <tbody>
                      {
                        React.Children.toArray(
                          item.map(e =>(
                          <tr>
                        
                        <td>{e.ten}</td>
                        <td>{e.gia}.000</td>
                        
                        
                      </tr>
                          )))
                      }
                      
                    </tbody>
                   
                  </Table>
                  <div className="quantity-N">
                        <input className="minus is-form" type="button" value="-" onClick = { countN >=1?function(){setCountN(countN-1)}:"" }/>
                        <input aria-label="quantity" class="input-qty-n" max="10" min="0" name="" type="number" value={countN}/>                        
                        <input className="plus is-form" type="button" value="+" onClick = {() => setCountN(countN+1)}/>
                    </div>
                    <div className="quantity-B">
                    <input className="minus is-form" type="button" value="-" onClick = {countB >=1?function(){setCountB(countB-1)}:""}/>
                        <input aria-label="quantity" class="input-qty-b" max="10" min="0" name="" type="number" value={countB}/>                        
                        <input className="plus is-form" type="button" value="+" onClick = {() => setCountB(countB+1)}/>
                    </div>
                    <div className="quantity-CB1">
                    <input className="minus is-form" type="button" value="-" onClick = {countCB1 >=1?function(){setCountCB1(countCB1-1)}:""}/>
                        <input aria-label="quantity" class="input-qty-cb1" max="10" min="0" name="" type="number" value={countCB1}/>                        
                        <input className="plus is-form" type="button" value="+" onClick = {() => setCountCB1(countCB1+1)}/>
                    </div>
                    <div className="quantity-CB2">
                    <input className="minus is-form" type="button" value="-" onClick = {countCB2 >=1?function(){setCountCB2(countCB2-1)}:""}/>
                        <input aria-label="quantity" class="input-qty-cb2" max="10" min="0" name="" type="number" value={countCB2}/>                        
                        <input className="plus is-form" type="button" value="+" onClick = {() => setCountCB2(countCB2+1)}/>
                    </div>
                    
                </CardBody>
              </Card>
            </Col>
          
        </div>
        <div className="checkOut__right col-md-3 col-sm-12">
        <div className="checkout__form">
          <div className="total__price">
            <span className="price">{total()} VND</span>
          </div>
          <div className="film__info">
            <span className="film__age--C">
              R???p {roomID}
            </span>
            <span className="film__name">
            {phimDetail.ten_phim}
            </span>
            <p className="film__detail">
            {xuliDay(lcbyid.result[0].thoi_gian_chieu)}  {xuliDate(lcbyid.result[0].thoi_gian_chieu)}

            </p>
            
          </div>
          <div className="count__slot">
            <div >S??? gh??? ???? ch???n: </div>
            <div className="slot">{soGhe}</div>
            
          </div>
          <div className="discountForm d-flex justify-content-between">
            <div className="discountForm__content">
              <label className="label__name">M?? gi???m gi??</label>
              <input
                type="text"
                name="code"
                id="txtDiscountCode"
                className="form-control d-inline"
                
              />
            </div>
            <button id="btnCheckCode" className="btn mb-2">
              ??p d???ng
            </button>
          </div>
          <div className="payForm">
            <a className="pay__link" href="/#">
              <span className="title__text">H??nh th???c thanh to??n</span>
              <p className="text__notification">
                Vui l??ng ch???n gh??? ????? hi???n th??? ph????ng th???c thanh to??n ph?? h???p.
              </p>
            </a>
          </div>
        </div>
        <div className="textNotification text-center">
          <i className="fa fa-info-circle text-danger mr-1" />
          <span className="noti__text">
            V?? ???? mua kh??ng th??? ?????i ho???c ho??n ti???n M?? v?? s??? ???????c g???i qua tin nh???n{" "}
            <span className="noti__link">ZMS</span> (tin nh???n Zalo) v??{" "}
            <span className="noti__link">Email</span> ???? nh???p.{" "}
          </span>
        </div>
        <div
          id="btnBook"
          className="btnBook"
          data-toggle="modal"
          data-target="#CreditModal"
          
        >
          ?????t v??
        </div>
        <CreditModal 
        datVe={datVe} 
        />
      </div>
        </>
    );
  }
  }
    


export default CornAndWater;