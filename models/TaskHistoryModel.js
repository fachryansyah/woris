const { Model } = require("objection");
const knex = require("../database/Connection");

Model.knex(knex)

class TaskHistoryModel extends Model {
  static get tableName() {
    return "task_history";
  }
}

module.exports = TaskHistoryModel;
    