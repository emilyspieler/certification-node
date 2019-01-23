'use strict';

const faker = require("faker");

//#2
 let lists = [];

 for(let i = 1 ; i <= 15 ; i++){
   lists.push({
     title: faker.hacker.noun(),
     description: faker.hacker.phrase(),
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Lists", lists, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Lists", null, {});
  }
};
