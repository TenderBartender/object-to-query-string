/**
* @Method: Turns the provided object into a query string.
* @Param {any}
* @Return {string}
*/
export function ObjectToQueryString(value: any): string {
    return "?" + _ObjectToQueryString(value)
}

function _ObjectToQueryString(value: any, parameterPath: string = ""): string {
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
        let parameterList: string[] = [];

        for (let i = 0, length = value.length; i < length; i++) {
            parameterList.push(_ObjectToQueryString(value[i], parameterPath + "[" + i + "]"));
        }
        
        return parameterList.join("&");
    }
    
    //If the value is an object, loop through all its properties
    if (typeof value === "object") {
        let parameterList: string[] = [];

        for (let property in value) {
            if (value.hasOwnProperty(property) === false) {
                continue;
            }

            //If we're at the root level, don't add square brackets to the property name
            if (parameterPath.length == 0) {
                parameterList.push(_ObjectToQueryString(value[property], parameterPath + encodeURIComponent(property)))
            }
            else {
                parameterList.push(_ObjectToQueryString(value[property], parameterPath + "[" + encodeURIComponent(property) + "]"))
            }
        }

        return parameterList
            .join("&");
    }

    return "";
}