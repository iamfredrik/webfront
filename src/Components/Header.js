import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {

  renderUserLinks(){
    var loggedIn = localStorage.getItem('auth');
    if (loggedIn){
      return (
        <li><NavLink className="nav-link" activeClassName="active" to="/user/logout">Logout</NavLink></li>
      );
    } else {
      return (
        <li><NavLink className="nav-link" activeClassName="active" to="/user/login">Login</NavLink></li>
      );
    }
  }


  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <NavLink className="navbar-brand" to="/">Drupal</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/articles">Articles</NavLink></li>
            {this.renderUserLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
