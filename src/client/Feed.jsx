import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const GET_POSTS = gql`{
  posts {
    id
    text
    user {
      avatar
      username
    }
  }
}`;

class Feed extends Component {
  state = {
    postContent: '',
  };

  handlePostContentChange = (event) => {
    this.setState({ postContent: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { posts, loading, error } = this.props;
    const { postContent } = this.state;

    if (loading) {
      return 'Loading...';
    }
    if (error) {
      return error.message;
    }

    return (
      <div className="container">
        <div className="postForm">
          <form onSubmit={this.handleSubmit}>
            <textarea value={postContent} onChange={this.handlePostContentChange} placeholder="Write your custom post!" />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="feed">
          {/* eslint-disable-next-line no-unused-vars */}
          {posts.map((post, i) => (
            <div key={post.id} className="post">
              <div className="header">
                <img src={post.user.avatar} alt="avatar" />
                <h2>{post.user.username}</h2>
              </div>
              <p className="content">
                {post.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default graphql(GET_POSTS, {
  props: ({ data: { loading, error, posts } }) => ({
    loading,
    posts,
    error,
  }),
})(Feed);
