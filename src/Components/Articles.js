import React, { Component } from 'react';
import axios from 'axios';
import ArticleItems from './ArticleItems';
import { NavLink } from 'react-router-dom';
import {Helmet} from "react-helmet";

class Articles extends Component {
  constructor(){
    super();
    this.state = {
      articles:[],
      success: '',
      alert: '',
      loading: false
    }
  }
  componentWillMount(){
    this.setState({
      loading: true
    })
  }

  componentDidMount(){
    this.getArticles();
  }

  getArticles(){ 
    axios({
      method:'get',
      url: process.env.REACT_APP_BASE_URL+'/drupal/api/v1/articles/list'
    }).then((response) => {
      this.setState({articles: response.data, loading: false}, () => {
        console.log("success");
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  editState(article, type, value){
    let nid = article.nid;
    let auth = localStorage.getItem('auth');
    let token = localStorage.getItem('csrf_token');
    let node = [];
    if(type === "body") {
      node = {
        "type":[{"target_id":"article","target_type":"node_type"}],
        "body":[{"value": value}]
      }
    } else if (type === "title") {
      let title = value.replace(/(<([^>]+)>)/ig,"");
      node = {
        "type":[{"target_id":"article","target_type":"node_type"}],
        "title":[{"value": title}]
      }
    }
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
        'Authorization':'Basic ' + auth
      }
    }

    axios.patch(process.env.REACT_APP_BASE_URL+'/drupal/node/' + nid + '?_format=json',node,config)
    .then((success) => {
      console.log(success);
      let articles = this.state.articles;
      for(let i = 0;i<articles.length;i++){
        if(Number(articles[i].nid) === success.data.nid[0].value){
          articles[i].title = success.data.title[0].value;
          articles[i].body = success.data.body[0].value;
        }
      }
      this.setState({
        article: articles,
        success: 'article updated',
        alert: 'alert alert-success'
      });
      setTimeout(function(){
        this.setState({
          success: '',
          alert: ''
        });
      }.bind(this),2000);
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  deleteArticle(article){
    let nid = article.nid;
    let auth = localStorage.getItem('auth');
    let token = localStorage.getItem('csrf_token');
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
        'Authorization':'Basic ' + auth
      }
    }
    axios.delete(process.env.REACT_APP_BASE_URL+'/drupal/node/' + nid + '?_format=json',config)
    .then((success) => {
      console.log(success);
      let articles = this.state.articles;
      let i = articles.length;
      while(i--){
        if(articles[i].nid === nid){
          articles.splice(i,1);
        }
      }
      this.setState({
        article: articles,
        success: 'article deleted',
        alert: 'alert alert-success'
      });
      setTimeout(function(){
        this.setState({
          success: '',
          alert: ''
        });
      }.bind(this),2000);
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  renderEditLink(){
    var loggedIn = localStorage.getItem('auth');
    if (loggedIn){
      return (
        <NavLink className="nav-link" to="/node/add/article">Add article</NavLink>
      );
    }
  }

  loadingAnimation(){
    if(this.state.loading){
      return (
        <div className="text-center">
          <img src="/ajax-loader.gif" alt="loading"/>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container top-margin-30">
      <Helmet>
        <title>Articles</title>
        <meta name="description" content="List of articles" />
      </Helmet>
      <div className={this.state.alert} role="alert">{this.state.success}</div>
        <div className="row">
          <div className="col-12">
            <ArticleItems onEditState={this.editState.bind(this)} onDelete={this.deleteArticle.bind(this)} articles={this.state.articles} />
            {this.loadingAnimation()}
          </div>
        </div>
        {this.renderEditLink()}
      </div>
    );
  }
}

export default Articles;
