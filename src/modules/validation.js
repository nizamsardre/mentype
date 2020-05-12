"use strict";
exports.__esModule = true;
var Joi = require("joi");
var mongoose_1 = require("mongoose");
/**
 * @export
 * @class Validation
 */
var Validation = /** @class */ (function () {
    /**
     * Creates an instance of Schema.
     * @memberof JoiSchema
     */
    function Validation() {
        /**
         * @static
         * @type {string}
         * @memberof JoiSchema
         */
        this.messageObjectId = 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';
        this.customJoi = Joi.extend({
            name: 'objectId',
            language: {
                base: this.messageObjectId
            },
            pre: function (value, state, options) {
                if (!mongoose_1.Types.ObjectId.isValid(value)) {
                    return this.createError('objectId.base', {
                        value: value
                    }, state, options);
                }
                return value; // Keep the value as it was
            }
        });
    }
    return Validation;
}());
exports["default"] = Validation;
