const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;


describe("Item", () => {

  beforeEach((done) => {

    this.list;
    this.item;
    sequelize.sync({force: true}).then((res) => {


      List.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((list) => {
        this.list = list;

        Item.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",

          listId: this.list.id
        })
        .then((list) => {
          this.list = list;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    describe("#create()", () => {

     it("should create a item object with a title, body, and assigned list", (done) => {

       Item.create({
         title: "Pros of Cryosleep during the long journey",
         body: "1. Not having to answer the 'are we there yet?' question.",
         listId: this.list.id
       })
       .then((item) => {

         expect(item.title).toBe("Pros of Cryosleep during the long journey");
         expect(item.body).toBe("1. Not having to answer the 'are we there yet?' question.");
         done();

       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

     it("should not create a item with missing title, body, or assigned List", (done) => {
     Item.create({
       title: "Pros of Cryosleep during the long journey"
     })
     .then((post) => {

      // the code in this block will not be evaluated since the validation error
      // will skip it. Instead, we'll catch the error in the catch block below
      // and set the expectations there

       done();

     })
     .catch((err) => {

       expect(err.message).toContain("Item.body cannot be null");
       expect(err.message).toContain("Item.listId cannot be null");
       done();

     })
   });

   });

   describe("#setList()", () => {

     it("should associate a item and a list together", (done) => {

       List.create({
         title: "Challenges of interstellar travel",
         description: "1. The Wi-Fi is terrible"
       })
       .then((newList) => {

         expect(this.item.listId).toBe(this.list.id);

         this.item.setList(newList)
         .then((post) => {

           expect(item.ListId).toBe(newList.id);
           done();

         });
       })
     });

   });

   describe("#getList()", () => {

     it("should return the associated list", (done) => {

       this.item.getList()
       .then((associatedList) => {
         expect(associatedList.title).toBe("Expeditions to Alpha Centauri");
         done();
       });

     });

   });


  });
});
