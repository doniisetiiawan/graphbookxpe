/* eslint-disable no-unused-vars,no-undef */
import logger from '../../helper/logger';

export default function resolver() {
  const { db } = this;
  const {
    Post, User, Chat, Message,
  } = db.models;

  const resolvers = {
    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
    Message: {
      user(message, args, context) {
        return message.getUser();
      },
      chat(message, args, context) {
        return message.getChat();
      },
    },
    Chat: {
      messages(chat, args, context) {
        return chat.getMessages({ order: [['id', 'ASC']] });
      },
      users(chat, args, context) {
        return chat.getUsers();
      },
    },
    RootQuery: {
      posts(root, args, context) {
        return Post.findAll({ order: [['createdAt', 'DESC']] });
      },
      chat(root, { chatId }, context) {
        return Chat.findByPk(chatId, {
          include: [{
            model: User,
            required: true,
          },
          {
            model: Message,
          }],
        });
      },
      chats(root, args, context) {
        return User.findAll().then((users) => {
          if (!users.length) {
            return [];
          }

          const usersRow = users[0];

          return Chat.findAll({
            include: [{
              model: User,
              required: true,
              through: { where: { userId: usersRow.di } },
            },
            {
              model: Message,
            }],
          });
        });
      },
    },
    RootMutation: {
      addPost(root, { post }, context) {
        console.log({
          level: 'info',
          message: 'Post was created...',
        });

        return User.findAll().then((users) => {
          const usersRow = users[0];

          return Post.create({
            ...post,
          }).then(newPost => Promise.all([
            newPost.setUser(usersRow.id),
          ]).then(() => newPost));
        });
      },
      addMessage(root, { message }, context) {
        console.log({
          level: 'info',
          message: 'Message was created...',
        });

        return User.findAll().then((users) => {
          const usersRow = users[0];

          return Message.create({
            ...message,
          }).then(newMessage => Promise.all([
            newMessage.setUser(usersRow.id),
            newMessage.setChat(message.chatId),
          ]).then(() => newMessage));
        });
      },
    },
  };

  return resolvers;
}
