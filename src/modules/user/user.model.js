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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var bcrypt = require("bcrypt");
var connections = require("../../config/connection/connection");
var crypto = require("crypto");
var mongoose_1 = require("mongoose");
/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *        - name
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        passwordResetToken:
 *          type: string
 *        passwordResetExpires:
 *          type: string
 *          format: date
 *        tokens:
 *          type: array
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    tokens: Array
}, {
    collection: 'usermodel',
    versionKey: false
}).pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, salt, hash, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = this;
                    if (!user.isModified('password')) {
                        return [2 /*return*/, next()];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, bcrypt.genSalt(10)];
                case 2:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt.hash(user.password, salt)];
                case 3:
                    hash = _a.sent();
                    user.password = hash;
                    next();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, next(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
});
/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function () {
        var match, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bcrypt.compare(candidatePassword, this.password)];
                case 1:
                    match = _a.sent();
                    return [2 /*return*/, match];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, error_2];
                case 3: return [2 /*return*/];
            }
        });
    });
};
/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function (size) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return "https://gravatar.com/avatar/?s=" + size + "&d=retro";
    }
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return "https://gravatar.com/avatar/" + md5 + "?s=" + size + "&d=retro";
};
exports["default"] = connections.db.model('UserModel', UserSchema);
