module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'updated_at', Sequelize.DATE);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'updated_at');
  },
};
