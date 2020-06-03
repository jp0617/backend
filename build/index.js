"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const User_Routes_1 = __importDefault(require("./routes/User.Routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.port || 3001);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use('/api/admin', admin_routes_1.default);
        this.app.use('/api/user', User_Routes_1.default);
        this.app.use('/api/dates', appointment_routes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        });
        this.app.all('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, "../public/index.html")));
    }
}
const serve = new Server();
serve.start();
