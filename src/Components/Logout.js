import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Logout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  logoutUser(){
    let config = {
      headers: {
        'Content-Type': 'text/html'
      }
    }
    axios.get(process.env.REACT_APP_BASE_URL+'/drupal/user/logout',config)
    .then((success) => {
      localStorage.clear();
      this.setState({redirect: true});
    }).catch((error) => {
      localStorage.clear();
      console.log(error);
    });
  }

  componentDidMount() {
    this.logoutUser();
  }

  render(){
    if (this.state.redirect) {
      return (
        <Redirect to="/user/login" />
      );
    }
    return (
        <div></div>
    )


  }
}

export default Logout
