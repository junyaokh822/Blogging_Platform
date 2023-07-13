'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("blog_posts", "UserId", { //foreign key
      type: Sequelize.INTEGER,
      references: {
        model: "users",  //table name
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("blog_posts", "UserId");
  }
};
