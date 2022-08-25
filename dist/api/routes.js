"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClassesController_1 = __importDefault(require("./controllers/ClassesController"));
const ConnectionsController_1 = __importDefault(require("./controllers/ConnectionsController"));
const routes = express_1.default.Router();
const classesController = new ClassesController_1.default();
const connectionControler = new ConnectionsController_1.default();
routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);
routes.post('/connections', connectionControler.create);
routes.get('/connections', connectionControler.index);
exports.default = routes;
//# sourceMappingURL=routes.js.map