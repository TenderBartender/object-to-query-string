"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @Method: Turns the provided object into a query string.
* @Param {any}
* @Return {string}
*/
function ObjectToQueryString(value) {
    return "?" + _ObjectToQueryString(value);
}
exports.ObjectToQueryString = ObjectToQueryString;
function _ObjectToQueryString(value, parameterPath) {
    if (parameterPath === void 0) { parameterPath = ""; }
    //If the value is null, return the parameter path with null as a value
    if (value == null) {
        return parameterPath + "=" + "null";
    }
    //If the value is a scalar type, return the parameter path plus the parameter value
    if (typeof value === "number" || typeof value === "string" || typeof value === "boolean") {
        return parameterPath + "=" + encodeURIComponent(value.toString());
    }
    //If the value is an empty object, return just the parameter path followed by an = symbol
    if (Object.keys(value).length === 0 && value.constructor === Object) {
        return parameterPath + "=";
    }
    //If the value is an array, loop through all its values
    if (Array.isArray(value)) {
        var parameterList = [];
        for (var i = 0, length_1 = value.length; i < length_1; i++) {
            parameterList.push(_ObjectToQueryString(value[i], parameterPath + "[" + i + "]"));
        }
        return parameterList.join("&");
    }
    //If the value is an object, loop through all its properties
    if (typeof value === "object") {
        var parameterList = [];
        for (var property in value) {
            if (value.hasOwnProperty(property) === false) {
                continue;
            }
            //If we're at the root level, don't add square brackets to the property name
            if (parameterPath.length == 0) {
                parameterList.push(_ObjectToQueryString(value[property], parameterPath + encodeURIComponent(property)));
            }
            else {
                parameterList.push(_ObjectToQueryString(value[property], parameterPath + "[" + encodeURIComponent(property) + "]"));
            }
        }
        return parameterList
            .join("&");
    }
    return "";
}
