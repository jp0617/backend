"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admincontroller_1 = require("../controllers/admincontroller");
class inicio {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', admincontroller_1.iniciocontrolle.list);
    }
}
const inici = new inicio();
exports.default = inici.router;
