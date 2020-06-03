"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class indexcontroller {
    index(req, res) {
        res.json({ text: 'API is /api/...' });
    }
}
exports.indexcontrolle = new indexcontroller();
