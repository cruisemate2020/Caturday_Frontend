import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class CarouselComponent extends Component {
  render() {
    return (
      <div className="carousel-wrapper">
        <div className="centerCarousel">
          <Carousel
            infiniteLoop
            autoPlay
            showThumbs={false}
            showStatus={false}
            width="600px"
          >
            <div className="carouselImgs">
              <img src="../images/cat1.jpeg" alt="Cat" />
            </div>
            <div className="carouselImgs">
              <img src="../images/cat7.jpg" alt="Cat" />
            </div>
            <div className="carouselImgs">
              <img src="../images/cat2.jpeg" alt="Cat" />
            </div>
            <div className="carouselImgs">
              <img src="../images/cat3.jpeg" alt="Cat" />
            </div>
            <div className="carouselImgs">
              <img src="../images/cat4.jpeg" alt="Cat" />
            </div>
            <div className="carouselImgs">
              <img src="../images/cat5.jpeg" alt="Cat" />
            </div>
            <div className="carouselImgs">
              <img src="../images/cat6a.jpeg" alt="Cat" />
            </div>
            <div className="carouselImgs">
              <img src="../images/cat8.jpeg" alt="Cat" />
            </div>
            <div className="carouselImgs">
              <img src="../images/cat9.jpeg" alt="Cat" />
            </div>
          </Carousel>
        </div>
      </div>
    );
  }
}
