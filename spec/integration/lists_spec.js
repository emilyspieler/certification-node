const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;

describe("routes : lists", () => {

  describe("GET /lists", () => {

    beforeEach((done) => {
      this.list;
      sequelize.sync({force: true}).then((res) => {

       List.create({
         title: "JS Frameworks",
         description: "There is a lot of them"
       })
        .then((list) => {
          this.list = list;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

      });

    });

    it("should return a status code 200 and all lists", () => {

       request.get(base, (err, res, body) => {
         expect(res.statusCode).toBe(200);
         expect(err).toBeNull();
         expect(body).toContain("Lists");
         expect(body).toContain("JS Frameworks");
         done();
       });
     });

     describe("GET /lists/new", () => {

    it("should render a new item form", () => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New List");
        done();
      });
    });

  });

  describe("POST /lists/create", () => {
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
            List.findOne({where: {title: "blink-182 songs"}})
            .then((list) => {
              expect(res.statusCode).toBe(303);
              expect(list.title).toBe("blink-182 songs");
              expect(list.description).toBe("What's your favorite blink-182 song?");
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

    describe("GET /lists /:id", () => {

     it("should render a view with the selected list", () => {
       request.get(`${base}${this.list.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("JS Frameworks");
         done();
       });
     });

   });

   describe("POST /lists/:id/destroy", () => {

     it("should delete the list with the associated ID", () => {

       List.all()
       .then((lists) => {

         const listCountBeforeDelete = lists.length;

         expect(listCountBeforeDelete).toBe(1);

         request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
           List.all()
           .then((lists) => {
             expect(err).toBeNull();
             expect(lists.length).toBe(listCountBeforeDelete - 1);
             done();
           })

         });
       });

     });

   });

   describe("GET /lists/:id/edit", () => {

     it("should render a view with an edit item form", () => {
       request.get(`${base}${this.list.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Item");
         expect(body).toContain("JS Frameworks");
         done();
       });
     });

   });

   describe("POST /lists/:id/update", () => {

     it("should update the item with the given values", () => {
        const options = {
           url: `${base}${this.list.id}/update`,
           form: {
             title: "JavaScript Frameworks",
             description: "There are a lot of them"
           }
         };
         request.post(options,
           (err, res, body) => {

           expect(err).toBeNull();
           List.findOne({
             where: { id: this.list.id }
           })
           .then((list) => {
             expect(list.title).toBe("JavaScript Frameworks");
             done();
           });
         });
     });

   });

   });

   });
