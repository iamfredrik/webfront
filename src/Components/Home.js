import React, { Component } from 'react';
import Slider from './Slider';
import Articles from './Articles';
import {Helmet} from "react-helmet";

class Header extends Component {
  render() {
    return (
      <div className="content">
        <Slider />
        <br />
        <Articles />
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Simple decoupled Drupal React app" />
        </Helmet>
      </div>
    );
  }
}

export default Header;
