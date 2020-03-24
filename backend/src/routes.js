const express = require('express');
const routes = express.Router();

const SessionController = require('./controller/SessionController');
const OngController = require('./controller/OngController');
const ProfileCOntroller = require('./controller/ProfileController');
const IncidentsController = require('./controller/IncidentsController');

routes.post('/session', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs',OngController.create);

routes.get('/profile',ProfileCOntroller.index);

routes.get('/incidents',IncidentsController.index);
routes.post('/incidents',IncidentsController.create);
routes.get('/incidents/:id',IncidentsController.delete);

module.exports = routes;