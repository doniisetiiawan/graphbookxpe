module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER,
  }, {});
  Message.associate = function (models) {
    Message.belongsTo(models.User);
    Message.belongsTo(models.Chat);
  };
  return Message;
};
