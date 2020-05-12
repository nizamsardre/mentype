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
var http = require("http");
/**
 * @export
 * @class HttpError
 * @extends {Error}
 */
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    /**
     * Creates an instance of HttpError.
     * @param {number} [status]
     * @param {string} [message]
     * @memberof HttpError
     */
    function HttpError(status, message) {
        var _this = _super.call(this, message) || this;
        Error.captureStackTrace(_this, _this.constructor);
        _this.status = status || 500;
        _this.name = _this.name;
        _this.message = message || http.STATUS_CODES[_this.status] || 'Error';
        return _this;
    }
    return HttpError;
}(Error));
exports.HttpError = HttpError;
exports["default"] = HttpError;
