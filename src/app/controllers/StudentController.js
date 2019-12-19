import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { age, height, weight } = req.body;
    if (age <= 0) {
      return res.status(401).json({ error: 'Idade deve ser maior que zero!' });
    }

    if (height <= 0) {
      return res.status(401).json({ error: 'Altura deve ser maior que zero!' });
    }

    if (weight <= 0) {
      return res.status(401).json({ error: 'Peso deve ser maior que zero!' });
    }

    const { id, name, email } = await Student.create(req.body);

    return res.json({ id, name, email });
  }

  /* async delete(req, res) {
    const student = await Student.findByPk(req.params.id);

    await student.delete();

    return res.json(student);
  } */

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { age, height, weight } = req.body;
    if (age <= 0) {
      return res.status(401).json({ error: 'Idade deve ser maior que zero!' });
    }

    if (height <= 0) {
      return res.status(401).json({ error: 'Altura deve ser maior que zero!' });
    }

    if (weight <= 0) {
      return res.status(401).json({ error: 'Peso deve ser maior que zero!' });
    }

    const { id, name, email } = await Student.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new StudentController();
