import React, { Component } from 'react';
import ArticleItem from './ArticleItem';
import ArticleItemGrid from './ArticleItemGrid';

class ArticleItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view_mode: 'list',
      collapse_class: 'collapse'
    };
  }

  showList(){
    this.setState({
        view_mode: 'list',
        collapse_class: 'collapse'
    });
  }
  showGrid(){
    this.setState({
        view_mode: 'grid',
        collapse_class: 'open'
    });
  }

  handleEditState(article, text_type, text_value){
    this.props.onEditState(article, text_type, text_value);
  }

  handleDelete(article){
    this.props.onDelete(article);
  }

  renderArticles(){
    let articleItems;
    if(this.props.articles && this.state.view_mode === 'list'){
      articleItems = this.props.articles.map(article => {
        return (
          <ArticleItem onEditState={this.handleEditState.bind(this)} onDelete={this.handleDelete.bind(this)} key={article.nid} collapseClass={this.state.collapse_class} article={article} />
        )
      });
    } else if(this.props.articles && this.state.view_mode === 'grid'){
      articleItems = this.props.articles.map(article => {
        return (
          <ArticleItemGrid onEditState={this.handleEditState.bind(this)} onDelete={this.handleDelete.bind(this)} key={article.nid} collapseClass={this.state.collapse_class} article={article} />
        )
      });
    }

    if(this.state.view_mode === 'list'){
      return (
        <div id="accordion" role="tablist">
          {articleItems}
        </div>
      );
    } else if(this.state.view_mode === 'grid') {
      return (
        <div className="card-columns">
            {articleItems}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="text-right">
          <span className={this.state.view_mode === 'list' ? 'list active' : 'list'} onClick={this.showList.bind(this)}>List</span> |
          <span className={this.state.view_mode === 'grid' ? 'grid active' : 'grid'} onClick={this.showGrid.bind(this)}> Grid</span>
        </div>
        {this.renderArticles()}
      </div>
    );
  }
}

export default ArticleItems;
