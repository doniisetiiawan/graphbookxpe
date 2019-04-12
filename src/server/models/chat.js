/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {}, {});
  Chat.associate = function (models) {
    Chat.belongsToMany(models.User, { through: 'users_chats' });
    Chat.hasMany(models.Message);
  };
  return Chat;
};
