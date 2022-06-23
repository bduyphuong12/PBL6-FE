import React, { useState } from 'react'
import "./carousel.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ModalTrailer1 from './ModalTrailer/modaltrailer1';
import ModalTrailer2 from './ModalTrailer/modaltrailer2';
import ModalTrailer3 from './ModalTrailer/modaltrailer3';
function Carousel(){
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);
  const [open1, setOpen1] = useState(false);
  const handleToggle1 = () => setOpen1(!open1);
  const [open2, setOpen2] = useState(false);
  const handleToggle2 = () => setOpen2(!open2);
    return (
        <div className="hotMovie">
      <div className="hotMovie__content">
        <OwlCarousel
          loop
          nav
          autoplay
          items={1}
          className="myHotMovieCarousel owl-carousel owl-theme"
        >
          <div className="item">
            <div className="item__img">
              <img
                className="img-fluid"
                src="https://i.ytimg.com/vi/UfjMQBQP-LY/maxresdefault.jpg"
                alt="phim soi"
              />
              
              <div
              className="background__overlay"
              style={{ cursor: "pointer" }}
              onClick={handleToggle}
              >
              <i className="fa fa-play play__icon" />
            </div>
            
            </div>
            
          </div>
          <div className="item">
            <div className="item__img">
              <img
                className="img-fluid"
                src="http://genk.mediacdn.vn/2019/5/21/john-wick-4-15584159376191490532151.jpg"
                alt="hinh anh phim"
              />
              <div
              className="background__overlay"
              style={{ cursor: "pointer" }}
              onClick={handleToggle1}
              >
              <i className="fa fa-play play__icon" />
            </div>
            </div>
          </div>
          <div className="item">
            <div className="item__img">
              <img
                className="img-fluid"
                src="https://i.ytimg.com/vi/tWPC7OTOulg/maxresdefault.jpg"
                alt="va phim cua hinh anh"
              />
              <div
              className="background__overlay"
              style={{ cursor: "pointer" }}
              onClick={handleToggle2}
              >
              <i className="fa fa-play play__icon" />
            </div>
            </div>
          </div>
        </OwlCarousel>
        <ModalTrailer1
            open={open}
            handleToggle={handleToggle}
            />
            <ModalTrailer2
            open1={open1}
            handleToggle1={handleToggle1}
            />
            <ModalTrailer3
            open2={open2}
            handleToggle2={handleToggle2}
            />
      </div>
            
    </div>
    );
}
export default Carousel;