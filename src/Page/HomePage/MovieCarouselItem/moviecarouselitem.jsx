import React from "react";

import { NavLink } from "react-router-dom";
import "./moviecarouselitem.css";
import Skeleton from "react-loading-skeleton";
import ModalTrailer from "../ModalTrailer/modaltrailer";

export default function MovieCarouselItem({ phimItem }) {
//   var moment = require("moment");
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => setOpen(!open);
  return (
    <div className="item__movie">
      <div className="item__link">
        <div className="item__img">
          <img src='http://movie0706.cybersoft.edu.vn/hinhanh/morbius_gp09.jpg' alt="" />
          <div className="overlay">
            <div
              className="play__button"
              style={{ cursor: "pointer" }}
              // onClick={handleToggle}
            >
              <i className="fa fa-play play__icon" />
            </div>
          </div>
        </div>
        <div className="item__info">
          <p className="film__name">{abc || <Skeleton />}</p>
          <span className="film__during">
            {/* {moment(phimItem.ngayKhoiChieu).format("yy")} */}
          </span>
          <div className="item__button">
            <NavLink
              className="btn buyTicket__button"
              to={`/movie-detail/`}
            >
              ĐẶT VÉ
            </NavLink>
          </div>
        </div>
      </div>
      {/* <ModalTrailer
        trailer={phimItem.trailer}
        maPhim={phimItem.maPhim}
        open={open}
        handleToggle={handleToggle}
      /> */}
    </div>
  );
}
