import { IUser } from "../types";

class UserDto {
    _id;
    login;
    password_storage;

    constructor(model: IUser) {
        this._id = model._id;
        this.login = model.login;
        this.password_storage = model.password_storage;
    }
}

export default UserDto;