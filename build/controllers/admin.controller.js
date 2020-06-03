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
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('select *  from tbluser inner join tblrol on tbluser.introl=tblrol.introl where intStatus=1', function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    res.json(result);
                }
            });
        });
    }
    getone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('select *  from tbluser inner join tblrol on tbluser.introl=tblrol.introl where strDNI=?', [id], function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    res.json(result[0]);
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { strDNI, strName, strSurname, strPhone, strEmail, strPassword } = req.body;
            const passen = md5_1.default(strPassword);
            yield database_1.default.query(`insert into tbluser(strDNI, strName, strSurname, strPhone, strEmail, strPassword) values (?,?,?,?,?,?)`, [strDNI, strName, strSurname, strPhone, strEmail, passen], function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    res.json({ message: "Se guardo correctamente" });
                }
            });
        });
    }
    status(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { strDNI } = req.body;
            yield database_1.default.query('update tbluser set intstatus=0 where strDNI=?', [strDNI], function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    console.log(result);
                    res.json("Se desactivo correctamente");
                }
            });
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { strDNI } = req.body;
            const passen = md5_1.default(md5_1.default(md5_1.default('12345678')));
            yield database_1.default.query('update tbluser set strpassword=? where strDNI=?', [passen, strDNI], function (err) {
                if (err) {
                    throw err;
                }
                else {
                    res.json("Contraseña reseteada");
                }
            });
        });
    }
}
exports.admincontroller = new AdminController();
