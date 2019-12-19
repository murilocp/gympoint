import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { duration, price } = req.body;

    if (duration < 1) {
      return res
        .status(400)
        .json({ error: 'Duration must be greater or equal to 1.' });
    }

    if (price <= 0) {
      return res.status(400).json({ error: 'Price must be greater than 0.' });
    }

    const { id, title } = await Plan.create(req.body);

    return res.json({ id, title });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    await plan.delete();

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { duration, price } = req.body;

    if (duration < 1) {
      return res
        .status(400)
        .json({ error: 'Duration must be greater or equal to 1.' });
    }

    if (price <= 0) {
      return res.status(400).json({ error: 'Price must be greater than 0.' });
    }

    const { id, title } = await Plan.update(req.body);

    return res.json({ id, title });
  }
}

export default new PlanController();
