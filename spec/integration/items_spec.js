const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/items/";
const sequelize = require("../../src/db/models/index").sequelize;
const Item = require("../../src/db/models").Item;

describe("routes : items", () => {

  describe("GET /items", () => {

    beforeEach((done) => {
      this.item;
      sequelize.sync({force: true}).then((res) => {

       Item.create({
         title: "JS Frameworks",
         description: "There is a lot of them"
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

    it("should return a status code 200 and all items", () => {

       request.get(base, (err, res, body) => {
         expect(res.statusCode).toBe(200);
         expect(err).toBeNull();
         expect(body).toContain("Items");
         expect(body).toContain("JS Frameworks");
         done();
       });
     });

     describe("GET /items/new", () => {

    it("should render a new item form", () => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Item");
        done();
      });
    });

  });

  describe("POST /items/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }
      };

      it("should create a new item and redirect", () => {

        request.post(options,

          (err, res, body) => {
            Item.findOne({where: {title: "blink-182 songs"}})
            .then((item) => {
              expect(res.statusCode).toBe(303);
              expect(item.title).toBe("blink-182 songs");
              expect(item.description).toBe("What's your favorite blink-182 song?");
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

    describe("GET /items /:id", () => {

     it("should render a view with the selected item", () => {
       request.get(`${base}${this.item.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("JS Frameworks");
         done();
       });
     });

   });

   describe("POST /items/:id/destroy", () => {

     it("should delete the topic with the associated ID", () => {

       Item.all()
       .then((items) => {

         const itemCountBeforeDelete = items.length;

         expect(itemCountBeforeDelete).toBe(1);

         request.post(`${base}${this.item.id}/destroy`, (err, res, body) => {
           Item.all()
           .then((items) => {
             expect(err).toBeNull();
             expect(items.length).toBe(itemCountBeforeDelete - 1);
             done();
           })

         });
       });

     });

   });

   describe("GET /items/:id/edit", () => {

     it("should render a view with an edit item form", () => {
       request.get(`${base}${this.item.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Item");
         expect(body).toContain("JS Frameworks");
         done();
       });
     });

   });

   describe("POST /items/:id/update", () => {

     it("should update the item with the given values", () => {
        const options = {
           url: `${base}${this.item.id}/update`,
           form: {
             title: "JavaScript Frameworks",
             description: "There are a lot of them"
           }
         };
//#1
         request.post(options,
           (err, res, body) => {

           expect(err).toBeNull();
//#2
           Item.findOne({
             where: { id: this.item.id }
           })
           .then((item) => {
             expect(item.title).toBe("JavaScript Frameworks");
             done();
           });
         });
     });

   });

   });

  });
