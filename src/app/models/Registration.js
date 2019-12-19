import Sequelize, { Model } from 'sequelize';
import { addMonths, startOfDay } from 'date-fns';
import Plan from './Plan';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT,
        plan_id: Sequelize.INTEGER,
        student_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async registration => {
      const { duration, price } = await Plan.findByPk(registration.plan_id);

      console.log(`data: ${registration.start_date} Duration: ${duration}`);

      registration.end_date = startOfDay(
        addMonths(registration.start_date, duration)
      );
      registration.price = duration * price;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default Registration;
