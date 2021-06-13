"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IsDulpicateInArray = (array) => {
    const set = new Set(array);
    if (set.size !== array.length) {
        return true;
    }
    else {
        return false;
    }
};
exports.default = IsDulpicateInArray;
