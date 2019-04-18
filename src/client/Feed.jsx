import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';

import Loading from './components/loading';
import Error from './components/error';
import Post from './components/post';
import FeedList from './components/post/feedlist';
import PostsFeedQuery from './components/queries/postsFeed';

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
            update={(store, { data: { addPost } }) => {
              const variables = { page: 0, limit: 10 };
              const data = store.readQuery(
                { query: GET_POSTS, variables },
              );
              data.postsFeed.posts.unshift(addPost);
              store.writeQuery(
                { query: GET_POSTS, variables, data },
              );
            }}
            optimisticResponse={{
              __typename: 'mutation',
              addPost: {
                __typename: 'Post',
                text: postContent,
                id: -1,
                user: {
                  __typename: 'User',
                  username: 'Loading...',
                  avatar: '/public/loading.gif',
                },
              },
            }}
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
        <PostsFeedQuery>
          <FeedList />
        </PostsFeedQuery>
      </div>
    );
  }
}
