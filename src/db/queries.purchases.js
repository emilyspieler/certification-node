const Item = require("./models").Item;
const User = require("./models").User;
const Purchase = require("./models").Purchase;
const Authorizer = require("../policies/purchase");

module.exports = {

  createPurchase(req, callback){
    return Purchase.create({
      itemId: req.params.itemId,
      userId: req.user.id
    })
    .then((purchase) => {
      callback(null, purchase);
    })
    .catch((err) => {
      callback(err);
    });
  },


  deletePurchase(req, callback){
    const id = req.params.id;

    return Purchase.findById(id)
    .then((purchase) => {

      if(!purchase){
        return callback("Purchase not found");
      }

      const authorized = new Authorizer(req.user, purchase).destroy();

      if(authorized){
        Purchase.destroy({ where: { id }})
        .then((deletedRecordsCount) => {
          callback(null, deletedRecordsCount);
        })
        .catch((err) => {
          callback(err);
        });
      } else {
        req.flash("notice", "You are not authorized to do that.")
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  }
}
