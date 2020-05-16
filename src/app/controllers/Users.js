const connection = require('../../db/connection');
const crypto = require('crypto');


module.exports = {

  async read(req, res) {

    try {
      const users = await connection('users').select('*');
      
      if(users.length <1){
        return res.status(404).json({error: 'No users found.'});
      }
      res.status(200).json({users});
    } catch (err) {
      console.error('ERROR TO LIST USERS',err);
      return res.status(404).json({error: 'No users found.'});
    }
    
  },

  async create(req, res) {
    const { name, email } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    try {
      await connection('users').insert({
        id,
        name,
        email
      });
      return res.status(201).json({ id });
    } catch (err) {
        if(err.errno ==19){
          return res.status(401).json({message: 'A user already exists with this email.'});
        }
        console.error('ERRO TO CREATE NEW USER',err);
        return res.status(400).json({message: 'Fail to register the user.'});
    }
  }
};