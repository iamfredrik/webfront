import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class NewNodeForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: '',
      type: '',
      success: '',
      error: '',
      redirect: false
    }
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({
      [key]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault(); // to prevent the refresh of the page.
    var self = this;
    // create the object of the data. At the moment this is hard coded to make a content type of article
    let node = {
      "type":[{"target_id":"article","target_type":"node_type"}],
      "title":[{"value": self.state.title}],
      "body":[{"value": self.state.body}]
    }

    //get authentication
    let auth = localStorage.getItem('auth');
    let token = localStorage.getItem('csrf_token');
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
        'Authorization':'Basic ' + auth
      }
    }

    axios.post(process.env.REACT_APP_BASE_URL+'/drupal/entity/node?_format=json',node,config)
      .then(function(success){
        console.log(success);
        self.setState({
          'success': 'Node add successful',
          'error': ''
        });
        self.setState({redirect: true});
      })
      .catch(function(error){
        console.log(error)
        var errorResponse = error.response.data.message;
        errorResponse = errorResponse.replace(/(?:\r\n|\r|\n)/g, '<br />');
        self.setState({
          'success': '',
          'error': errorResponse
        });
      });
  }

  renderNodeForm(){
    var loggedIn = localStorage.getItem('auth');
    if (loggedIn){
      return (
        <form className="col-md-6 col-md-offset-3" onSubmit={this.handleSubmit.bind(this)}>
         <div className="form-group">
           <label htmlFor="title">Title: </label>
           <input name="title" onChange={this.handleChange.bind(this)} required type="text" className="form-control" placeholder="Enter title" />
         </div>
         <div className="form-group">
           <label htmlFor="body">Body: </label>
           <textarea name="body" onChange={this.handleChange.bind(this)} required type="textarea" className="form-control text-area" placeholder="Enter body" />
         </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <div className="form-group messages">
          <p className="success">{this.state.success}</p>
          <p className="error" dangerouslySetInnerHTML={{__html: this.state.error}} />
        </div>
       </form>
      );
    } else return (
      <Redirect to="/" />
    )
  }

  render() {

    if (this.state.redirect) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div className="container top-margin-100">
        {this.renderNodeForm()}
      </div>
    );
  }
}

export default NewNodeForm;
