/* eslint-disable react/prop-types */
import React from 'react';

export default ({ post }) => (
  <div className="header">
    <img src={post.user.avatar} alt="avatar" />
    <div>
      <h2>{post.user.username}</h2>
    </div>
  </div>
);
