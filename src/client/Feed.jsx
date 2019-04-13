import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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
  mutation addPost($post : PostInput!) {
    addPost(post : $post) {
      id
      text
      user {
        username
        avatar
      }
    }
  }`;

export default class Feed extends Component {
  state = {
    postContent: '',
  };

  handlePostContentChange = (event) => {
    this.setState({ postContent: event.target.value });
  };

  render() {
    const self = this;
    const { postContent } = this.state;

    return (
      <div className="container">
        <div className="postForm">

          <Mutation
            mutation={ADD_POST}
            refetchQueries={[{ query: GET_POSTS }]}
          >
            {addPost => (
              <form onSubmit={(e) => {
                e.preventDefault();
                addPost({
                  variables: { post: { text: postContent } },
                }).then(() => {
                  self.setState(() => ({
                    postContent: '',
                  }));
                });
              }}
              >
                <textarea
                  value={postContent}
                  onChange={self.handlePostContentChange}
                  placeholder="Write your custom post!"
                />
                <input type="submit" value="Submit" />
              </form>
            )}
          </Mutation>

        </div>
        <div className="feed">
          <Query
            query={GET_POSTS}
          >
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return error.message;

              const { posts } = data;

              return posts.map(post => (
                <div key={post.id} className="post">
                  <div className="header">
                    <img src={post.user.avatar} alt="avatar" />
                    <h2>{post.user.username}</h2>
                  </div>
                  <p className="content">
                    {post.text}
                  </p>
                </div>
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}
