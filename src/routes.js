const routes = require('express').Router();
const Equipments = require('./app/controllers/Equipments');
const Users = require('./app/controllers/Users');
const SessionController = require('./app/controllers/SessionController');

routes.post('/login', SessionController.create)


routes.get('/equipments', Equipments.read);
routes.post('/equipments', Equipments.create);
routes.put('/equipments', Equipments.update);
routes.delete('/equipments/:id', Equipments.delete);

routes.get('/users', Users.read);
routes.post('/users', Users.create);

module.exports = routes;