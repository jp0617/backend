"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logincontroller_1 = require("../controllers/logincontroller");
class loginroutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', logincontroller_1.login.login);
        this.router.post('/', logincontroller_1.login.signup);
        // this.router.put('/:id',admincontroller.update);
    }
}
const Login = new loginroutes();
exports.default = Login.router;
