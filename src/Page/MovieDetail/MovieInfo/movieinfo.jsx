import React, { useEffect, useState } from "react";
import "./movieinfo.css";
import ModalTrailer from "../../HomePage/ModalTrailer/ModalTrailer";
import axios from "axios";
export default function MovieInfo() {
  const [openT, setOpenT] = React.useState(false);
  const handleToggleTrailer = () => setOpenT(!openT);
  const [phimDetail, setPhimDetail] = useState(null);
  const getUrlPhim = window.location.href.split("/");
  const phimID = getUrlPhim[getUrlPhim.length - 1];

  useEffect(() => {
    const getPhimDetail = () => {
      axios.get("/phim/detail/" + phimID).then((res) => {
        setPhimDetail(res.data);
      });
    };
    getPhimDetail();
  }, [phimID]);
  
  
  const renderStar = (rating) => {
    if (rating > 5) rating = 5;
    var content = [];
    for (let i = 0; i < rating; i++) {
      let star = [];
      star.push(<i className="fa fa-star" key={i}></i>);
      content.push(star);
    }
    for (let i = 0; i < 5 - rating; i++) {
      let star = [];
      star.push(<i className="fa fa-star-half-alt" key={i}></i>);
      content.push(star);
    }
    return content;
  };
  const countRatingMark = (rating) => {
    return rating * 0.5 + 10 * 0.5;
  };
  if (phimDetail) {
    return (
      <section className="movieInfo">
        <div className="full__background">
          <img
            src={phimDetail.result[0].poster}
            alt={phimDetail.result[0].poster}
            style={{ height: "450px" }}
          />
          <div className="overlay__gradient" />
          <div className="play__mobile">
            <i className="fa fa-play" />
          </div>
          <div className="rating__point">
            <p className="film__point">10</p>
            <div className="rating__stars">10</div>
          </div>
        </div>
        <div className="form__info container">
          <div className="row">
            <div className="movie__poster text-left col-3">
              <div
                style={{ width: 220, height: 300 }}
                className="poster__img d-flex justify-content-center align-items-center"
              >
                <img
                  className="poster__movie"
                  src={phimDetail.result[0].poster}
                  alt={phimDetail.result[0].poster}
                />
                <div className="play__btn" onClick={handleToggleTrailer}>
                  <i className="fa fa-play" />
                </div>
              </div>
            </div>
            <div className="movie__info col-6">
              <div>
                <div className="showtime"></div>
                <div className="mb-3 d-flex justify-content-start align-items-center">
                  <span className="age--C">Meta</span>
                  <span className="name">{phimDetail.result[0].ten_phim}</span>
                </div>

                <p className="during">{phimDetail.result[0].thoi_luong}</p>
                <a href={"#movieTheater"}>
                  <button className="bookTicket-btn">Mua Vé</button>
                </a>
              </div>
            </div>
            <div className="movie__rating d-flex justify-content-end col-3">
              <div>
                <div className="rating__point">
                  {countRatingMark(phimDetail.result[0].so_sao)}
                  <div className="vongtronxanh"></div>
                </div>
                <div className="rating__stars">
                  {renderStar(phimDetail.result[0].so_sao)}
                </div>
                <div className="rating__text">
                  {phimDetail.result[0].so_sao} người đánh giá
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="film__infoMobile">
          <div className="days">
            {/* {moment(phimItem.ngayKhoiChieu).format("DD-MM-yy")} */}
          </div>
          {/* <div className="name">{phimItem.tenPhim}</div> */}
          <div className="during">120 phút</div>
        </div>
        <ModalTrailer
          trailer={phimDetail.result[0].trailer}
          idPhim={phimDetail.result[0].id_phim}
          openT={openT}
          handleToggleTrailer={handleToggleTrailer}
        />
      </section>
    );
  }
}
