"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Joi = require("joi");
var validation_1 = require("../validation");
/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
var AuthValidation = /** @class */ (function (_super) {
    __extends(AuthValidation, _super);
    /**
    * Creates an instance of AuthValidation.
    * @memberof AuthValidation
    */
    function AuthValidation() {
        return _super.call(this) || this;
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    AuthValidation.prototype.createUser = function (params) {
        var schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });
        return Joi.validate(params, schema);
    };
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    AuthValidation.prototype.getUser = function (params) {
        var schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });
        return Joi.validate(params, schema);
    };
    return AuthValidation;
}(validation_1["default"]));
exports["default"] = new AuthValidation();
