'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.BlogPost);
    }
  }
  Comments.init({
    contents: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Conetnets are required.',
        },
        }
    },
    postDate: {
      type:DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Post date is required.',
        },
        }  
    },
    UserId:{
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'UserId is required.',
        },
    }
  },
  BlogPostId:{
    type:DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'BlogPostId is required.',
      },
  }
}
  }, {
    sequelize,
    modelName: 'Comments',
    tableName: 'comments',
  });
  return Comments;
};