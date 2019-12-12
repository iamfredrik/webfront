import React, { Component } from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";

class About extends Component {

  constructor() {
    super();
    this.state = {
      article_title: '',
      article_body: '',
      article_summary: ''
    };
  }

  componentDidMount() {
    var self = this;
    this.serverRequest = axios.get(process.env.REACT_APP_BASE_URL+'/drupal/node/6?_format=json')
    .then(function(result){
      self.setState({
        article_title: result.data.title["0"].value,
        article_body: result.data.body["0"].value,
        article_summary: result.data.body["0"].summary
      });
    })
  }

  render(){
    return (
      <div>
        <Helmet>
          <title>{this.state.article_title}</title>
          <meta name="description" content={this.state.article_summary} />
        </Helmet>
        <div className="container top-margin-30">
          <h1 className="page-header">
            {this.state.article_title}
          </h1>
          <div className="card-block" dangerouslySetInnerHTML={{__html: this.state.article_body}} />
        </div>
      </div>
    );
  }
}

export default About
