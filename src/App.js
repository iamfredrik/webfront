import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Articles from './Components/Articles';
import NewNodeForm from './Components/NewNodeForm';
import About from './Components/About';
import Login from './Components/Login';
import Logout from './Components/Logout';
//import SearchInput from './Components/SearchInput';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About} />
          <Route path="/articles" component={Articles} />
          <Route path="/node/add/article" component={NewNodeForm} />
          <Route path="/user/login" component={Login} />
          <Route path="/user/logout" component={Logout} />
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
