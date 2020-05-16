const routes = require('express').Router();
const Equipments = require('./app/controllers/Equipments');

routes.get('/equipments', Equipments.read);
routes.post('/equipments', Equipments.create);
routes.put('/equipments', Equipments.update);
routes.delete('/equipments/:id', Equipments.delete);

module.exports = routes;