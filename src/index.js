import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

class SearchInput extends React.Component {
  state = { text: "", posts: [] };

  getData = () => {
    axios
      .get("https://www.reddit.com/r/reactjs.json")
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      })
      .catch(err => console.error(err));
  };

  clearData = () => {
    this.setState({ posts: [] });
    setTimeout(
      () => this.setState({ posts: [{ id: 23, url: "asdf", title: "test" }] }),
      5000
    );
  };

  render() {
    return (
      <>
        <input
          type="text"
          placeholder="Search..."
          onChange={event => {
            this.setState({ text: event.target.value });
          }}
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.setState({ search: true });
            }
          }}
        />
        <button onClick={this.getData}>Search</button>
        <button onClick={this.clearData}>Clear</button>
        <div>{this.state.text !== "" ? this.state.text : ""}</div>
        <br />
        <br />
        <ul>
          {this.state.posts.map(post => {
            return (
              <li key={post.id}>
                <a href={post.url}>{post.title}</a>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<SearchInput />, rootElement);
