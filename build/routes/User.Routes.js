"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/login', user_controller_1.usercontroller.login);
        this.router.post('/register', user_controller_1.usercontroller.signup);
        this.router.put('/update', user_controller_1.usercontroller.update);
        this.router.put('/updateA/:id', user_controller_1.usercontroller.updateOne);
        this.router.post('/registerA', user_controller_1.usercontroller.sign);
    }
}
const user = new UserRoutes();
exports.default = user.router;
