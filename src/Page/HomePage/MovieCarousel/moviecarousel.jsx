import React, { useEffect, useState } from "react";
import "./moviecarousel.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { NavLink } from "react-router-dom";


function MovieCarousel({ listFilm }) {
  const [openT, setOpenT] = useState(false);
  const handleToggleTrailer = () => setOpenT(!openT);

  if (listFilm) {
    return (
      <div className="hotMovie">
        <div className="hotMovie__content">
          <OwlCarousel
            loop
            nav
            autoplay
            items={3}
            className="myHotMovieCarousel owl-carousel owl-theme"
          >
            {React.Children.toArray(
              listFilm.result.map((d) => (
                <div className="item__movie">
                  <div className="item__link">
                    <div className="item__img">
                      <img src={d.poster} alt={d.poster} />
                      <div className="overlay"></div>
                    </div>
                    <div className="item__info">
                      <p className="film__name">{d.ten_phim}</p>
                      <span className="film__during">
                        {/* {moment(phimItem.ngayKhoiChieu).format("yy")} */}
                      </span>
                      <div className="item__button">
                        <NavLink
                          className="btn buyTicket__button"
                          to={"/film-detail/" + d.id_phim}
                        >
                          ĐẶT VÉ
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </OwlCarousel>
          
        </div>
      </div>
    );
  }
}
export default MovieCarousel;
