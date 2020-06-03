"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = require("../controllers/appointment.controller");
class appointmentroutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', appointment_controller_1.date.list);
        this.router.post('/', appointment_controller_1.date.create);
        this.router.get('/:id', appointment_controller_1.date.getone);
        this.router.put('/', appointment_controller_1.date.update);
        this.router.put('/p', appointment_controller_1.date.desactivate);
    }
}
const Date = new appointmentroutes();
exports.default = Date.router;
