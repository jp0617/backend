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
class Usercontroller {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stremail, strPassword } = req.body;
            const passen = md5_1.default(strPassword);
            try {
                yield database_1.default.query('call sp_login(?,?)', [stremail, passen], function (err, result, fields) {
                    res.json(result[0][0]);
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    sign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { strDNI, strName, strSurname, strPhone, strEmail, strPassword, intRol } = req.body;
            const passen = md5_1.default(strPassword);
            yield database_1.default.query(`call sp_RegisterA(?,?,?,?,?,?,?)`, [strDNI, strName, strSurname, strPhone, strEmail, passen, intRol], function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    res.json(result[0][0]);
                }
            });
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { strDNI, strName, strSurname, strPhone, strEmail, strPassword } = req.body;
            const passen = md5_1.default(strPassword);
            yield database_1.default.query(`call sp_Register(?,?,?,?,?,?)`, [strDNI, strName, strSurname, strPhone, strEmail, passen], function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    res.json(result[0][0]);
                }
            });
        });
    }
    updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const strDNI = req.params.id;
            const { strName, strSurname, strPhone, strEmail, strPassword, intRol } = req.body;
            const passen = md5_1.default(md5_1.default(strPassword));
            yield database_1.default.query('update tbluser set strName=?,strSurname=?,strPhone=?,strEmail=?,strPassword=?,introl=? where strDNI=?', [strName, strSurname, strPhone, strEmail, passen, intRol, strDNI], function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.json("Se actualizo correctamente");
                }
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stroldpassword, strNpassword, strPassword } = req.body;
            const oldpassen = md5_1.default(stroldpassword);
            const Npassen = md5_1.default(strNpassword);
            yield database_1.default.query('call sp_UpdateP(?,?,?)', [oldpassen, Npassen, strPassword], function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.json(result[0][0]);
                }
            });
        });
    }
}
exports.usercontroller = new Usercontroller();
