const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists";

const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;


describe("routes : items", () => {

  beforeEach((done) => {
    this.list;
    this.item;

    sequelize.sync({force: true}).then((res) => {

      List.create({
        title: "Winter Games",
        description: "Post your Winter Games stories."
      })
      .then((list) => {
        this.list = list;

        Item.create({
          title: "Snowball Fighting",
          description: "So much snow!",
          listId: this.list.id
        })
        .then((item) => {
          this.item = item;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

    });

    describe("GET /lists/:listId/items/new", () => {

    it("should render a new list form", () => {
      request.get(`${base}/${List.id}/items/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Item");
        done();
      });
    });

  });

  describe("POST /lists/:listId/items/create", () => {

   it("should create a new post and redirect", () => {
      const options = {
        url: `${base}/${this.list.id}/items/create`,
        form: {
          title: "Watching snow melt",
          body: "Without a doubt my favoriting things to do besides watching paint dry!"
        }
      };
      request.post(options,
        (err, res, body) => {

          Item.findOne({where: {title: "Watching snow melt"}})
          .then((item) => {
            expect(item).not.toBeNull();
            expect(item.title).toBe("Watching snow melt");
            expect(item.description).toBe("Without a doubt my favoriting things to do besides watching paint dry!");
            expect(item.listId).not.toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });

 });

 describe("GET /lists/:listId/items/:id", () => {

     it("should render a view with the selected item", () => {
       request.get(`${base}/${this.list.id}/items/${this.item.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Snowball Fighting");
         done();
       });
     });

   });

   describe("POST /lists/:listId/items/:id/destroy", () => {

    it("should delete the item with the associated ID", () => {

      expect(this.item.id).toBe(1);

      request.post(`${base}/${this.list.id}/items/${this.item.id}/destroy`, (err, res, body) => {

        Item.findById(1)
        .then((item) => {
          expect(err).toBeNull();
          expect(item).toBeNull();
          done();
        })
      });

    });

  });

  describe("GET /lists/:listId/items/:id/edit", () => {

     it("should render a view with an edit item form", () => {
       request.get(`${base}/${this.list.id}/items/${this.item.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Item");
         expect(body).toContain("Snowball Fighting");
         done();
       });
     });

   });

   describe("POST /lists/:listId/items/:id/update", () => {

     it("should return a status code 302", () => {
       request.post({
         url: `${base}/${this.list.id}/items/${this.item.id}/update`,
         form: {
           title: "Snowman Building Competition",
           description: "I love watching them melt slowly."
         }
       }, (err, res, body) => {
         expect(res.statusCode).toBe(302);
         done();
       });
     });

   });

});
