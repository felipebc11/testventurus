const connection = require('../../db/connection');
const crypto = require('crypto');
module.exports = {
  async create (req, res){
    const email = req.headers.authorization;
    const {model, category, ppm, wifi, consumption} = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    if(email == ''){
      return res.status(404).json({ error: 'Please enter an email in the authorization header.'});
    } 
    const user = await connection('users')
      .where('email', email)
      .select('email')
      .first();

    if (!user) {
      return res.status(401).json({ error: 'Operation not permitted'});
    }


    try {
      await connection('equipments').insert({
        id,
        model,
        category,
        ppm,
        wifi,
        consumption
      });
      return res.status(201).json({ id });
    } catch (err) {
        console.error('ERRO TO CREATE NEW EQUIPMENT',err);
        return res.status(400).json({err});
    }
  },

  async read(req, res){
    const email = req.headers.authorization;

    if(email == ''){
      return res.status(404).json({ error: 'Please enter an email in the authorization header.'});
    } 
    const user = await connection('users')
      .where('email', email)
      .select('email')
      .first();

    if (!user) {
      return res.status(401).json({ error: 'Operation not permitted'});
    }

    try {
      const equipments = await connection('equipments').select('*');
      res.status(200).json({equipments});
    } catch (err) {
      console.error('ERROR TO LIST EQUIPMENTS',err);
      return res.status(401).json({error: 'No equipments found.'});
    }
    
  },
  
  async update(req, res){
    const email = req.headers.authorization;
    const {equipmentid, attribute, newvalue} = req.body;

    if(email == ''){
      return res.status(404).json({ error: 'Please enter an email in the authorization header.'});
    } 
    
    const user = await connection('users')
      .where('email', email)
      .select('email')
      .first();

    if (!user) {
      return res.status(401).json({ error: 'Operation not permitted'});
    }

    
    if(attribute=='id'){
      return res.status(401).json({error: 'Not is possible to update the id.'});
    }
    try {
      const result = await connection('equipments')
      .where('id', equipmentid)
      .update({[attribute]:`${newvalue}`}, ['id', `${attribute}`]);
      if(result ===0){
        return res.status(404).json({error: 'No equipment found to update.'});
      }
      res.status(200).json({message: 'Equipment has been updated.'});
    } catch (err) {
      console.error('ERROR TO DELETE EQUIPMENT',err);
      return res.status(401).json({error: 'Not is possible to delete the equipment.'});
    }
  },

  async delete(req, res){
    const { id } = req.params;
    const email = req.headers.authorization;
    
    if(email == ''){
      return res.status(404).json({ error: 'Please enter an email in the authorization header.'});
    } 

    const user = await connection('users')
      .where('email', email)
      .select('email')
      .first();

    if (!user) {
      return res.status(401).json({ error: 'Operation not permitted'});
    }


    try {
      const result = await connection('equipments')
        .where('id',id)
        .delete();
        if(result ===0){
          return res.status(404).json({error: 'No equipment found to delete.'});
        }
        res.status(200).json({message: 'Equipment has been deleted.'});
    } catch (err) {
      console.error('ERROR TO DELETE EQUIPMENT',err);
      return res.status(401).json({error: 'Not is possible to delete the equipment.'});
    }    
  }
}
