"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(model) {
        this._id = model._id;
        this.login = model.login;
        this.password_storage = model.password_storage;
    }
}
exports.default = UserDto;
