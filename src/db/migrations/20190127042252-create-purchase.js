'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Purchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     itemId: {
       type: Sequelize.INTEGER,
       onDelete: "CASCADE",
       allowNull: false,
       references: {
         model: "Items",
         key: "id",
         as: "itemId"
       }
     },
     userId: {
       type: Sequelize.INTEGER,
       onDelete: "CASCADE",
       allowNull: false,
       references: {
         model: "Users",
         key: "id",
         as: "userId"
       }
     },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Purchases');
  }
};
