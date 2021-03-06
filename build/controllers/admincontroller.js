"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const md5_1 = __importDefault(require("md5"));
class AdminController {
    /*Falta obtener uno*/
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('select *  from tblusuario inner join tblrol on tblusuario.introl=tblrol.introl where strdescription="Abogado"', function (err, result, fields) {
                    res.json(result);
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, introl } = req.body;
            const passen = md5_1.default(md5_1.default(password));
            try {
                yield database_1.default.query(`insert into tblusuario (username, password, introl) values (?,?,?)`, [username, passen, introl]);
                res.json({ message: "Se inserto correctamente" });
            }
            catch (err) {
                throw err;
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('update tblusuario set ? where username=?', [req.body, req.params.id], function (err) {
                if (err) {
                    throw err;
                }
                else {
                    res.json({ message: "Se actualizo correctamente" });
                }
            });
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                yield database_1.default.query('select introl from tblusuario where username=? and PASSWORD=?', [username, md5_1.default(md5_1.default(md5_1.default(password)))], function (err, result, fields) {
                    res.json(result);
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.admincontroller = new AdminController();
