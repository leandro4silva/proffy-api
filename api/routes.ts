import express from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionController from './controllers/ConnectionsController';

const routes = express.Router()
const classesController = new ClassesController();
const connectionControler = new ConnectionController();

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)
routes.post('/connections', connectionControler.create )
routes.get('/connections', connectionControler.index )


export default routes