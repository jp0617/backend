"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = require("../controllers/usercontroller");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usercontroller_1.usercontroller.list);
        this.router.post('/', usercontroller_1.usercontroller.create);
        this.router.put('/:id', usercontroller_1.usercontroller.update);
    }
}
const user = new UserRoutes();
exports.default = user.router;
