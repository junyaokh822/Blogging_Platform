'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    static associate(models) {
      // define association here
    }
  }
  BlogPost.init({
    title: {
      type:DataTypes.STRING, 
      allowNull:false,
    },
    contents: {
      type:DataTypes.TEXT,
      allowNull:false,
    },
    postDate: {
      type:DataTypes.DATE,
       allowNull:false
    },
  }, {
    sequelize,
    modelName: 'BlogPost',
    tableName: 'blog_posts',
    underscored: true 
  });
  return BlogPost;
};