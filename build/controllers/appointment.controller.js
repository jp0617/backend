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
class appointments {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('select *  from tblappointment inner join tbluser on tbluser.strDNI=tblappointment.strDNI inner join tblstatus on tblstatus.intstatus=tblappointment.intstatus where tblappointment.intstatus=1', function (err, result, fields) {
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
            const { id } = req.params;
            yield database_1.default.query('select * from tblappointment inner join tbluser on tbluser.strDNI=tblappointment.strDNI where intappointment=?', [id], function (err, result, field) {
                if (err) {
                }
                else {
                    res.json(result[0]);
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dtdate, strdescription, strDNI } = req.body;
            yield database_1.default.query('call sp_date(?,?,?)', [dtdate, strdescription, strDNI], function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    res.json(result[0][0]);
                }
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { intappointment, dtdate, strdescription, strDNI } = req.body;
            yield database_1.default.query('update tblappointment set dtdate=?,strdescription=?,strDNI=? where intappointment=?', [dtdate, strdescription, strDNI, intappointment], function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    res.json("Se ha actualizado");
                }
            });
        });
    }
    desactivate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { intappointment } = req.body;
            yield database_1.default.query('update tblappointment set intstatus=0 where intappointment=?', [intappointment], function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    console.log(result);
                    res.json("Se ha desactivado");
                }
            });
        });
    }
}
exports.date = new appointments();
