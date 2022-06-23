import React, { useState, useEffect } from "react";
import "./movie.scss";
import AllMovie from "./AllMovie/allmovie";
import axios from 'axios';

export default function Movie() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  
   
      return (
        <>
        <div className="container all-movie">
          <div className="navbar-search">
                      <input type="text" class="navbar-search-input" name="search" id='search' placeholder="Search film..."  
                      // value={searchTerm}
                      onChange={inputHandler}
                      />
                      <button class="navbar-search-btn"  >
                          <i class="fas fa-search navbar-search-btn-icon" id='navbar-search-btn-icon' alt="search" />
                      </button>
             </div>
          {/* <div className="row movielist-content">{renderDanhSachPhim()}</div> */}
          
        </div>
       <AllMovie input = {inputText}/>
        </>
        
      );
    
    
}
