'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      listId: {
         type: Sequelize.INTEGER,
         onDelete: "CASCADE",
         allowNull: false,
         references: {
           model: "Lists",
           key: "id",
           as: "listId"
         },
       }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Items');
  }
};
