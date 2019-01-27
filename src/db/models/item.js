'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    title: {
       type: DataTypes.STRING,
       allowNull: false
     },
     description: {
       type: DataTypes.STRING,
       allowNull: false
     },
     listId: {
       type: DataTypes.INTEGER,
       allowNull: false
     },
   userId: {
     type: DataTypes.INTEGER,
     allowNull: false
   }
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.List, {
       foreignKey: "listId",
       onDelete: "CASCADE"
     });

     Item.belongsTo(models.User, {
     foreignKey: "userId",
     onDelete: "CASCADE"
   });

    Item.hasMany(models.Purchase, {
     foreignKey: "itemId",
     as: "purchases"
   });

   Item.prototype.getPurchaseFor = function(userId){
    return this.purchases.find((purchase) => { return purchase.userId == userId });
  };

  };
  return Item;
};
