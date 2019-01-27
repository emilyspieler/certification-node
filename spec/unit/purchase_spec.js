const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;
const User = require("../../src/db/models").User;
const Purchase = require("../../src/db/models").Purchase;

describe("Purchase", () => {

  beforeEach((done) => {
   this.purchase;
   this.list;
   this.item;
   this.user;

   sequelize.sync({force: true}).then((res) => {

     User.create({
       email: "starman@tesla.com",
       password: "Trekkie4lyfe"
     })
     .then((user) => {
       this.user = user; //store the user

       List.create({
         title: "Expeditions to Alpha Centauri",
         description: "A compilation of reports from recent visits to the star system.",

         items: [{
           title: "My first visit to Proxima Centauri b",
           description: "I saw some rocks.",
           userId: this.user.id
         }]
       }, {

         include: {
           model: Item,
           as: "items"
         }
       })
       .then((list) => {
         this.list = list; //store the topic
         this.item = list.items[0];
         done();
       })
     })
   });
 });

describe("#create()", () => {

  it("should create a favorite for a item on a user", (done) => {

    Purchase.create({
      itemId: this.item.id,
      userId: this.user.id
    })
    .then((purchase) => {

      expect(purchase.itemId).toBe(this.item.id);
      expect(purchase.userId).toBe(this.user.id);
      done();

    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  it("should not create a favorite without assigned post or user", (done) => {
    Purchase.create({
      userId: null
    })
    .then((purchase) => {

     // the code in this block will not be evaluated since the validation error
     // will skip it. Instead, we'll catch the error in the catch block below
     // and set the expectations there

      done();

    })
    .catch((err) => {

      expect(err.message).toContain("Purchase.userId cannot be null");
      expect(err.message).toContain("Purchase.itemId cannot be null");
      done();

    })
  });

});


describe("#setUser()", () => {

     it("should associate a purchase and a user together", (done) => {

       Purchase.create({           // create a favorite on behalf of this.user
         itemId: this.item.id,
         userId: this.user.id
       })
       .then((purchase) => {
         this.purchase = purchase;     // store it
         expect(purchase.userId).toBe(this.user.id); //confirm it was created for this.user

         User.create({                 // create a new user
           email: "bob@example.com",
           password: "password"
         })
         .then((newUser) => {

           this.purchase.setUser(newUser)  // change the favorite's user reference for newUser
           .then((purchase) => {

             expect(purchase.userId).toBe(newUser.id); //confirm it was updated
             done();

           });
         })
         .catch((err) => {
           console.log(err);
           done();
         });
       })
     });

   });

   describe("#getUser()", () => {

     it("should return the associated user", (done) => {
       Purchase.create({
         userId: this.user.id,
         itemId: this.item.id
       })
       .then((purchase) => {
         purchase.getUser()
         .then((user) => {
           expect(user.id).toBe(this.user.id); // ensure the right user is returned
           done();
         })
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

   });

});
