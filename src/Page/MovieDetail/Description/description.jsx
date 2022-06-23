import React, {useEffect,useState} from "react";

import "./description.css";
import axios from 'axios';
export default function Description() {
  const [phimDetail,setPhimDetail] = useState(null);
  const getUrlPhim= window.location.href.split("/");
  const phimID = getUrlPhim[getUrlPhim.length - 1]
  const [actor,setActor] = useState(null);
  useEffect(() => {
    const getActorByPhim = () => {
      axios.get("/dv/getByIdPhim/" + phimID).then((res) => {
        setActor(res.data);
      });
    };
    getActorByPhim();
  }, [phimID]);
  
  useEffect(() => {
    const getPhimDetail = () => {
      axios.get('/phim/detail/' + phimID).then(res => {
        setPhimDetail(res.data);
      })
    }
    getPhimDetail();
  },[phimID]);
  if(phimDetail && actor){
    return (
      <div className="row__above row">
        <div className="info__category col-md-6 col-sm-12">
          <div className="category__item">
            <p className="category__name">Ngày phát hành</p>
            <p className="category__content">05/05/2022</p>
          </div>
          <div className="category__item">
            <p className="category__name">Nhà sản xuất</p>
            <p className="category__content">{phimDetail.result[0].nha_san_xuat}</p>
          </div>
          <div className="category__item">
            <p className="category__name">Đạo diễn</p>
            <p className="category__content">{phimDetail.result[0].dao_dien}</p>
          </div>
          <div className="category__item">
            <p className="category__name">Thể Loại</p>
            <p className="category__content">{phimDetail.result[0].the_loai}</p>
          </div>
          <div className="category__item">
            <p className="category__name">Định dạng</p>
            <p className="category__content">2D/Digital</p>
          </div>
          <div className="category__item">
          <p className="category__name">Diễn viên</p>
            {
              React.Children.toArray(
                actor.result.map(e =>(
                  <p className="category__content">{e.ten_dien_vien},</p>
                ))
              )
            }
            
          </div>
        </div>
        <div className="info__content col-md-6 col-sm-12">
          <div className="info__title">Nội dung</div>
          <p className="info__text">
          {phimDetail.result[0].noi_dung}
          </p>
        </div>
      </div>
    );
  }
  
}
