'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.hasMany(models.comment, {
        foreignKey: 'comment_user_id'
      })
      post.hasMany(models.post_user, {
        foreignKey: 'userId'
      })
    }
  };
  post.init({
    user_id: DataTypes.STRING,
    post_tile: DataTypes.STRING,
    post_content: DataTypes.STRING,
    post_img: DataTypes.STRING,
    animalcategory: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};