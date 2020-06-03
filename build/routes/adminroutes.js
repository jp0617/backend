"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admincontroller_1 = require("../controllers/admincontroller");
class AdminRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // this.router.get('/',admincontroller.list);
        this.router.post('/', admincontroller_1.admincontroller.create);
        this.router.put('/:id', admincontroller_1.admincontroller.update);
        this.router.get('/', admincontroller_1.admincontroller.signin);
    }
}
const admin = new AdminRoutes();
exports.default = admin.router;
