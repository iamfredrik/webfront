import React, { Component } from 'react';

class Slider extends Component {
  render() {
    return (
      <div className="top-buffer">
        <div>
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            </ol>
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img className="d-block img-fluid" src="https://placehold.it/1920x500?text=Single+Page+Application" alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block img-fluid" src="https://placehold.it/1920x500?text=Drupal+8+back-end" alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block img-fluid" src="https://placehold.it/1920x500?text=React+front-end" alt="Second slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block img-fluid" src="https://placehold.it/1920x500?text=Bootstrap+4+bootswatch+theme" alt="Third slide" />
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;
