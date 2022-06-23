import React, {useEffect,useState} from "react";
import './allmovie.scss'
import axios from 'axios';
import LazyLoad from "react-lazyload";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {AiOutlineReload} from 'react-icons/ai'
export default function AllMovie({props}) {
  var moment = require("moment");
  const [listFilm,setListFilm] = useState(null);
  const [filmData, setFilmData] = useState(null);
  const [loadData, setLoadData] = useState(false);
  useEffect(() => {
    const getListFilm = async () => {
      axios.get('/phim/list').then(res => {
        setListFilm(res.data.result);
        setFilmData(res.data);
      })
    }
    getListFilm();
  },[]);
  
  // const filteredData = useState(null);
  
  //  var  filteredData  = listFilm.result.filter((el) => {
  //     if(props.input === ''){
  //       return el;
  //     }
  //     else {
  //       return el.ten_phim.toLowerCase().includes(props.input)
  //     }
  // })
  const _handlerClickEnter =(e) => {
    var input, Filter;
    if(e.key === 'Enter'){
      input = document.getElementById("search");
      if(input.value==="") {setListFilm(filmData.result); }
      else{
        setListFilm(filmData.result);
        Filter=input.value.toUpperCase();
        var newArray = filmData.result.filter(function (el) {
          return  el.ten_phim.toUpperCase().indexOf(Filter) > -1;
        });
        
        setListFilm(newArray);
      }
      
      document.getElementById("search").value = "";
    }
  }
  
  
  // console.log(filteredData);
  
  if(listFilm ){
    
    return (
        <div className="pageallfilm">
          <div className="navbar-search">
                      <input type="text" class="navbar-search-input" name="search" id='search' placeholder="Search film..."  
                      // value={searchTerm}
                      // onChange={inputHandler}
                      onKeyDown={_handlerClickEnter}
                      />
                      <button class="navbar-search-btn"  >
                          <i class="fas fa-search navbar-search-btn-icon" id='navbar-search-btn-icon' alt="search"   />
                      </button>
                      
             </div>
        {
              React.Children.toArray(
                listFilm.map(d => (
        <div className="movie-card col-md-6 col-sm-4" key={d.id_phim}>
            <NavLink className="card-link" to={'/film-detail/'+ d.id_phim}>
            <div className="card-content">
              <div className="content-left">
                <div className="left-header-movie">
                  <h2 className="movie-name">{d.ten_phim}</h2>
                  <p className="during-time">{d.thoi_luong}</p>
                  
                </div>
                <div className="below-header">
                  <p className="description">{d.noi_dung}</p>
                </div>
              </div>
              <LazyLoad throttle={200}>
                <CSSTransition
                  key="1"
                  transitionName="fade"
                  transitionAppear
                  transitionAppearTimeout={1000}
                  transitionEnter={false}
                  transitionLeave={false}
                >
                  <div
                    className="content-right"
                    style={{ backgroundImage: `url(${d.poster})` }}
                  ></div>
                </CSSTransition>
              </LazyLoad>
            </div>
          </NavLink> 
        </div>
         )))
        }
        </div>
        
      );
  }
 
}
