const connection = require('../../db/connection');

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const user = await connection('users')
      .where('id', id)
      .select('name', 'email')
      .first();

      if (!user) {
        res.status(400).json({ error: 'No user found with this ID' });
      }

      return res.json(user);
  }
}