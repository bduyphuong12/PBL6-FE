import React from "react";
import Carousel from "./Carousel/carousel";
import ListMovie from "./ListMovie/listmovie";
import News from './News/News'

function HomePage(){
    return(
        <div>
            <Carousel />
            <ListMovie />
            <News />
            
           
        </div>
    );

}
export default HomePage;