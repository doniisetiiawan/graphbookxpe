/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

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

const ADD_POST = gql`
  mutation addPost($post: PostInput!) {
    addPost(post: $post) {
      id
      text
      user {
        avatar
        username
      }
    }
  }
`;

class Feed extends Component {
  state = {
    postContent: '',
  };

  handlePostContentChange = (event) => {
    this.setState({ postContent: event.target.value });
  };

  handleSubmit = (event) => {
    const self = this;
    const { postContent } = this.state;
    const { addPost } = this.props;
    event.preventDefault();

    const newPost = {
      text: postContent,
    };
    addPost({ variables: { post: newPost } }).then(() => {
      self.setState(() => ({
        postContent: '',
      }));
    });
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
          {posts.map(post => (
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

const ADD_POST_MUTATION = graphql(ADD_POST, {
  name: 'addPost',
});

const GET_POSTS_QUERY = graphql(GET_POSTS, {
  props: ({ data: { loading, error, posts } }) => ({
    loading,
    posts,
    error,
  }),
});

export default compose(GET_POSTS_QUERY, ADD_POST_MUTATION)(Feed);
