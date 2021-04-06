const { Model } = require("objection");
const knex = require("../database/Connection");

Model.knex(knex);

class TaskModel extends Model {
  static get tableName() {
    return "task";
  }
}

module.exports = TaskModel;
    