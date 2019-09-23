import React, { Component } from "react";

class Form extends Component {
  state = {
    searchTerm: "",
    articles: []
  };

  handleInput = e => this.State({ searchTerm: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
    fetch(`http://hn.algolia.com/api/v1/search?query=${this.state.serachTerm}`)
      .then(res => res.json())
      .then(news => {
        this.setState({ serachTerm: "", articles: news.hits });
      });
  };

  render() {
    return (
      <div>
        <h1>New Articles</h1>
        <form onSubmit={this.handleSubmit}>
          <label for="searchTerm">Search</label>
          <input
            placeholder="Enter a search term..."
            onChange={this.handleInput}
            value={this.state.searchTerm}
            name="searchTerm"
          />
          <button type="submit">Search</button>
        </form>

        <div className="article-list">
          {this.state.articles.map((a, i) => {
            return (
              <div key={i} classname="article">
                <p>{a.title}</p>
                <a target="_blank" href={a.url}>
                  Read More
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Form;
