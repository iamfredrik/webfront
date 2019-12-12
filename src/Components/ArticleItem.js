import React, { Component } from 'react';
import ContentEditable from 'react-simple-contenteditable';

class ArticleItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      article: props.article,
      text_value:'',
      changed:false
    }
  }

  handleChange(event, value) {
    this.setState({
      text_value: value,
      changed:true
    })
  }

  handleBlur(article, e){
    if(this.state.text_value.length > 4 && this.state.changed === true){
      this.props.onEditState(article, e.target.getAttribute("data-type"), this.state.text_value);
      this.setState({
        changed:false
      })
    }
  }

  handleDelete(article, e){
    e.preventDefault();
    this.props.onDelete(article);
  }

  render() {
    let auth = localStorage.getItem('auth');
    let editable = "false";
    if(auth) {
      editable = "plaintext-only"
    }
    let heading_id = "heading-" + this.state.article.nid;
    let collapse_id = "collapse-" + this.state.article.nid;
    let collapse_href = "#" + collapse_id;
    return (
      <div className="card">
        <div className="card-header" role="tab" id={heading_id}>
          <h5 className="mb-0">
            <ContentEditable
              html={this.state.article.title}
              className="card-title"
              tagName="a"
              data-type="title"
              data-toggle="collapse"
              href={collapse_href}
              aria-expanded="false"
              aria-controls={collapse_id}
              onChange={ this.handleChange.bind(this) }
              onBlur={ this.handleBlur.bind(this, this.state.article) }
              contentEditable={editable}
            />
          </h5>
        </div>
        <div id={collapse_id} className={this.props.collapseClass} role="tabpanel" aria-labelledby={heading_id} data-parent="#accordion">
          <ContentEditable
            html={this.state.article.body}
            className="card-body"
            tagName="div"
            data-type="body"
            onChange={ this.handleChange.bind(this) }
            onBlur={ this.handleBlur.bind(this, this.state.article) }
            contentEditable={editable}
          />
          <div className="text-right">
            {auth ? <button className="btn btn-danger btn-margin" onClick={ this.handleDelete.bind(this, this.state.article) }>Delete</button> : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleItem;
