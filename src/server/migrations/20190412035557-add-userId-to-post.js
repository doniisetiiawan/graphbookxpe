module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Posts',
      'userId',
      {
        type: Sequelize.INTEGER,
      }),
    queryInterface.addConstraint('Posts', ['userId'], {
      type: 'foreign key',
      name: 'fk_user_id',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('Posts', 'userId'),
  ]),
};
