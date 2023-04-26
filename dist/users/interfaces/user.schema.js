"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    first_name: String,
    last_name: String,
    email: { type: String, unique: false },
    avatar: { type: String, unique: false },
}, { timestamps: true, collection: 'Users' });
//# sourceMappingURL=user.schema.js.map