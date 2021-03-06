const List = require("./models").List;
const Item = require("./models").Item;
const Authorizer = require("../policies/list");
const User = require("./models").User;

module.exports = {

  getAllLists(callback){
    return List.all()

    .then((lists) => {
      callback(null, lists);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getList(id, callback){
     return List.findById(id, {

      include: [{
        model: Item,
        as: "items"
      }]
    })

     .then((list) => {
       callback(null, list);
     })
     .catch((err) => {
       callback(err);
     })
   },

  addList(newList, callback){
      return List.create({
        title: newList.title,
        description: newList.description
      })
      .then((list) => {
        callback(null, list);
      })
      .catch((err) => {
        callback(err);
      })
    },


      deleteList(id, callback){
       return List.destroy({
         where: {id}
       })
       .then((list) => {
         callback(null, list);
       })
       .catch((err) => {
         callback(err);
       })
     },


   updateList(req, updatedList, callback){

    return List.findById(req.params.id)
    .then((list) => {

      if(!list){
        return callback("List not found");
      }

      const authorized = new Authorizer(req.user, list).update();

      if(authorized) {

        list.update(updatedList, {
          fields: Object.keys(updatedList)
        })
        .then(() => {
          callback(null, list);
        })
        .catch((err) => {
          callback(err);
        });
      } else {

        req.flash("notice", "You are not authorized to do that.");
        callback("Forbidden");
      }
    });
  }


}
