'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function(queryInterface, Sequelize) {
      return queryInterface.renameColumn('comments', 'PostId', 'BlogPostId');
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.renameColumn('comments', 'BlogPostId', 'PostId');
  }
};
