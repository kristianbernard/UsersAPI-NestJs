"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarSchema = void 0;
const mongoose = require("mongoose");
exports.AvatarSchema = new mongoose.Schema({
    userId: { type: Number },
    avatar: { type: String },
    base64: { type: String },
}, { timestamps: true, collection: 'Avatar' });
//# sourceMappingURL=avatar.schema.js.map