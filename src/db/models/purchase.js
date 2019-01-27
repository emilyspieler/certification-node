'use strict';
module.exports = (sequelize, DataTypes) => {
  var Purchase = sequelize.define('Purchase', {
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Purchase.associate = function(models) {
    // associations can be defined here
    Purchase.belongsTo(models.Item, {
      foreignKey: "itemId",
      onDelete: "CASCADE"
    });

    Purchase.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Purchase;
};
