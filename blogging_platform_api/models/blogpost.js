'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    static associate(models) {
      this.belongsTo(models.User)
    }
  }
  BlogPost.init({
    title: {
      type:DataTypes.STRING, 
      allowNull:false,
      validate: {
        notEmpty: {
          msg: 'Title is required.',
        },
        }
    },
    contents: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: 'Contents are required.',
        },
        }
    },
    postDate: {
      type:DataTypes.DATE,
       allowNull:false,
       validate: {
        notEmpty: {
          msg: 'Post date is required.',
        },
        }
    },
  }, 
  {
    sequelize,
    modelName: 'BlogPost',
    tableName: 'blog_posts',
  });
  return BlogPost;
};