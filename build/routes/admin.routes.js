"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
class AdminRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', admin_controller_1.admincontroller.list);
        this.router.post('/', admin_controller_1.admincontroller.create);
        this.router.put('/', admin_controller_1.admincontroller.status);
        this.router.get('/:id', admin_controller_1.admincontroller.getone);
        this.router.put('/p', admin_controller_1.admincontroller.updatePassword);
    }
}
const admin = new AdminRoutes();
exports.default = admin.router;
