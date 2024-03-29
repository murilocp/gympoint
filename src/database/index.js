import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';

import databasseConfig from '../config/database';

const models = [User, Student, Plan, Registration];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databasseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
