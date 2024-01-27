import { DateTime } from "luxon";

const defaultRandomAlphabet = "abcdefghijklmnopqrstuvwxyz0123456789";

export default class utils {
    /**
     * Checks whether value is plain object.
     *
     * @param  {Mixed} value
     * @return {Boolean}
     */
    static isObject(value) {
        return value !== null && typeof value === "object" && value.constructor === Object;
    }

    /**
     * Checks whether a value is empty. The following values are considered as empty:
     * - null
     * - undefined
     * - empty string
     * - empty array
     * - empty object
     * - zero uuid, time and dates
     *
     * @param  {Mixed} value
     * @return {Boolean}
     */
    static isEmpty(value) {
        return (
            typeof value === "undefined" ||
            value === null ||
            value === "" ||
            value === "00000000-0000-0000-0000-000000000000" || // zero uuid
            value === "0001-01-01 00:00:00.000Z" || // zero datetime
            value === "0001-01-01" || // zero date
            (Array.isArray(value) && value.length === 0) ||
            (utils.isObject(value) && Object.keys(value).length === 0)
        );
    }

    /**
     * Checks whether the provided dom element is a form field (input, textarea, select).
     *
     * @param  {Node} element
     * @return {Boolean}
     */
    static isInput(element) {
        let tagName = element && element.tagName ? element.tagName.toLowerCase() : "";

        return (
            tagName === "input" || tagName === "select" || tagName === "textarea" || element.isContentEditable
        );
    }

    /**
     * Checks if an element is a common focusable one.
     *
     * @param  {Node} element
     * @return {Boolean}
     */
    static isFocusable(element) {
        let tagName = element && element.tagName ? element.tagName.toLowerCase() : "";

        return (
            utils.isInput(element) ||
            tagName === "button" ||
            tagName === "a" ||
            tagName === "details" ||
            element.tabIndex >= 0
        );
    }

    /**
     * Normalizes and returns arr as a new array instance.
     *
     * @param  {Array}   arr
     * @param  {Boolean} [allowEmpty]
     * @return {Array}
     */
    static toArray(arr, allowEmpty = false) {
        if (Array.isArray(arr)) {
            return arr.slice();
        }

        return (allowEmpty || !utils.isEmpty(arr)) && typeof arr !== "undefined" ? [arr] : [];
    }

    /**
     * Loosely checks if value exists in an array.
     *
     * @param  {Array}  arr
     * @param  {String} value
     * @return {Boolean}
     */
    static inArray(arr, value) {
        arr = Array.isArray(arr) ? arr : [];

        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == value) {
                return true;
            }
        }

        return false;
    }

    /**
     * Removes single element from array by loosely comparying values.
     *
     * @param {Array} arr
     * @param {Mixed} value
     */
    static removeByValue(arr, value) {
        arr = Array.isArray(arr) ? arr : [];

        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == value) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Adds `value` in `arr` only if it's not added already.
     *
     * @param {Array} arr
     * @param {Mixed} value
     */
    static pushUnique(arr, value) {
        if (!utils.inArray(arr, value)) {
            arr.push(value);
        }
    }

    /**
     * Returns single element from objects array by matching its key value.
     *
     * @param  {Array} objectsArr
     * @param  {Mixed} key
     * @param  {Mixed} value
     * @return {Object}
     */
    static findByKey(objectsArr, key, value) {
        objectsArr = Array.isArray(objectsArr) ? objectsArr : [];

        for (let i in objectsArr) {
            if (objectsArr[i][key] == value) {
                return objectsArr[i];
            }
        }

        return null;
    }

    /**
     * Removes all elements from an objects array by matching a property value.
     *
     * @param {Array}  objectsArr
     * @param {String} key
     * @param {Mixed}  value
     */
    static removeByKey(objectsArr, key, value) {
        for (let i in objectsArr) {
            if (objectsArr[i][key] == value) {
                objectsArr.splice(i, 1);
            }
        }
    }

    /**
     * Adds or replace an object array element by comparing its key value.
     *
     * @param {Array}  objectsArr
     * @param {Object} item
     * @param {String} [key]
     */
    static pushOrReplaceObject(objectsArr, item, key = "id") {
        for (let i = objectsArr.length - 1; i >= 0; i--) {
            if (objectsArr[i][key] == item[key]) {
                objectsArr[i] = item; // replace
                return;
            }
        }

        objectsArr.push(item);
    }

    /**
     * Filters and returns a new objects array with duplicated elements removed.
     *
     * @param  {Array} objectsArr
     * @param  {String} key
     * @return {Array}
     */
    static filterDuplicatesByKey(objectsArr, key = "id") {
        objectsArr = Array.isArray(objectsArr) ? objectsArr : [];

        const uniqueMap = {};

        for (const item of objectsArr) {
            uniqueMap[item[key]] = item;
        }

        return Object.values(uniqueMap);
    }

    /**
     * Safely access nested object/array key with dot-notation.
     *
     * @example
     * ```javascript
     * let myObj = {a: {b: {c: 3}}}
     * this.getNestedVal(myObj, "a.b.c");       // returns 3
     * this.getNestedVal(myObj, "a.b.c.d");     // returns null
     * this.getNestedVal(myObj, "a.b.c.d", -1); // returns -1
     * ```
     *
     * @param  {Object|Array} data
     * @param  {string}       path
     * @param  {Mixed}        [defaultVal]
     * @param  {String}       [delimiter]
     * @return {Mixed}
     */
    static getNestedVal(data, path, defaultVal = null, delimiter = ".") {
        let result = data || {};
        let parts = (path || "").split(delimiter);

        for (const part of parts) {
            if ((!utils.isObject(result) && !Array.isArray(result)) || typeof result[part] === "undefined") {
                return defaultVal;
            }

            result = result[part];
        }

        return result;
    }

    /**
     * Sets a new value to an object (or array) by its key path.
     *
     * @example
     * ```javascript
     * this.setByPath({}, "a.b.c", 1);             // results in {a: b: {c: 1}}
     * this.setByPath({a: {b: {c: 3}}}, "a.b", 4); // results in {a: {b: 4}}
     * ```
     *
     * @param  {Array|Object} data
     * @param  {string}       path
     * @param  {String}       delimiter
     */
    static setByPath(data, path, newValue, delimiter = ".") {
        if (data === null || typeof data !== "object") {
            console.warn("setByPath: data not an object or array.");
            return;
        }

        let result = data;
        let parts = path.split(delimiter);
        let lastPart = parts.pop();

        for (const part of parts) {
            if (
                (!utils.isObject(result) && !Array.isArray(result)) ||
                (!utils.isObject(result[part]) && !Array.isArray(result[part]))
            ) {
                result[part] = {};
            }

            result = result[part];
        }

        result[lastPart] = newValue;
    }

    /**
     * Recursively delete element from an object (or array) by its key path.
     * Empty array or object elements from the parents chain will be also removed.
     *
     * @example
     * ```javascript
     * this.deleteByPath({a: {b: {c: 3}}}, "a.b.c");       // results in {}
     * this.deleteByPath({a: {b: {c: 3, d: 4}}}, "a.b.c"); // results in {a: {b: {d: 4}}}
     * ```
     *
     * @param  {Array|Object} data
     * @param  {string}       path
     * @param  {String}       delimiter
     */
    static deleteByPath(data, path, delimiter = ".") {
        let result = data || {};
        let parts = (path || "").split(delimiter);
        let lastPart = parts.pop();

        for (const part of parts) {
            if (
                (!utils.isObject(result) && !Array.isArray(result)) ||
                (!utils.isObject(result[part]) && !Array.isArray(result[part]))
            ) {
                result[part] = {};
            }

            result = result[part];
        }

        if (Array.isArray(result)) {
            result.splice(lastPart, 1);
        } else if (utils.isObject(result)) {
            delete result[lastPart];
        }

        // cleanup the parents chain
        if (
            parts.length > 0 &&
            ((Array.isArray(result) && !result.length) ||
                (utils.isObject(result) && !Object.keys(result).length)) &&
            ((Array.isArray(data) && data.length > 0) ||
                (utils.isObject(data) && Object.keys(data).length > 0))
        ) {
            utils.deleteByPath(data, parts.join(delimiter), delimiter);
        }
    }

    /**
     * Generates pseudo-random string (suitable for ids and keys).
     *
     * @param  {Number} [length] Results string length (default 8)
     * @return {String}
     */
    static randomString(length = 8, alphabet = defaultRandomAlphabet) {
        let result = "";

        for (let i = 0; i < length; i++) {
            result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }

        return result;
    }

    /**
     * Converts and normalizes string into a sentence.
     *
     * @param  {String}  str
     * @param  {Boolean} [stopCheck]
     * @return {String}
     */
    static sentenize(str, stopCheck = true) {
        if (typeof str !== "string") {
            return "";
        }

        str = str.trim().split("_").join(" ");
        if (str === "") {
            return str;
        }

        str = str[0].toUpperCase() + str.substring(1);

        if (stopCheck) {
            let lastChar = str[str.length - 1];
            if (lastChar !== "." && lastChar !== "?" && lastChar !== "!") {
                str += ".";
            }
        }

        return str;
    }

    /**
     * Splits `str` and returns its non empty parts as an array.
     *
     * @param  {String} str
     * @param  {String} [separator]
     * @return {Array}
     */
    static splitNonEmpty(str, separator = ",") {
        const items = (str || "").split(separator);
        const result = [];

        for (let item of items) {
            item = item.trim();
            if (!utils.isEmpty(item)) {
                result.push(item);
            }
        }

        return result;
    }

    /**
     * Returns a concatenated `items` string.
     *
     * @param  {String} items
     * @param  {String} [separator]
     * @return {Array}
     */
    static joinNonEmpty(items, separator = ", ") {
        const result = [];

        for (let item of items) {
            item = typeof item === "string" ? item.trim() : "";
            if (!utils.isEmpty(item)) {
                result.push(item);
            }
        }

        return result.join(separator);
    }

    /**
     * Returns a DateTime instance from a date object/string.
     *
     * @param  {String|Date} date
     * @return {DateTime}
     */
    static getDateTime(date) {
        if (typeof date === "string") {
            const formats = {
                19: "yyyy-MM-dd HH:mm:ss",
                23: "yyyy-MM-dd HH:mm:ss.SSS",
                20: "yyyy-MM-dd HH:mm:ss'Z'",
                24: "yyyy-MM-dd HH:mm:ss.SSS'Z'",
            };
            const format = formats[date.length] || formats[19];
            return DateTime.fromFormat(date, format, { zone: "UTC" });
        }

        return DateTime.fromJSDate(date);
    }

    /**
     * Returns formatted datetime string in the UTC timezone.
     *
     * @param  {String|Date} date
     * @param  {String}      [format] The result format (see https://moment.github.io/luxon/#/parsing?id=table-of-tokens)
     * @return {String}
     */
    static formatToUTCDate(date, format = "yyyy-MM-dd HH:mm:ss") {
        return utils.getDateTime(date).toUTC().toFormat(format);
    }

    /**
     * Returns formatted datetime string in the local timezone.
     *
     * @param  {String|Date} date
     * @param  {String}      [format] The result format (see https://moment.github.io/luxon/#/parsing?id=table-of-tokens)
     * @return {String}
     */
    static formatToLocalDate(date, format = "yyyy-MM-dd HH:mm:ss") {
        return utils.getDateTime(date).toLocal().toFormat(format);
    }

    /**
     * Returns a string representation of a this time relative to now, such as "in two days".
     *
     * @param  {String|Date} date
     * @param  {String}      [format] The result format (see https://moment.github.io/luxon/#/parsing?id=table-of-tokens)
     * @return {String}
     */
    static relativeDate(date) {
        return utils.getDateTime(date).toRelative();
    }

    /**
     * Copies text to the user clipboard.
     *
     * @param  {String} text
     * @return {Promise}
     */
    static async copyToClipboard(text) {
        text = "" + text; // ensure that text is string

        if (!text.length || !window?.navigator?.clipboard) {
            return;
        }

        return window.navigator.clipboard.writeText(text).catch((err) => {
            console.warn("Failed to copy.", err);
        });
    }

    /**
     * "Yield" to the main thread to break long runing task into smaller ones.
     *
     * (see https://web.dev/optimize-long-tasks/)
     */
    static yieldToMain() {
        return new Promise((resolve) => {
            setTimeout(resolve, 0);
        });
    }

    /**
     * Triggers a window event.
     *
     * @param {String} eventName The event name to trigger.
     */
    static triggerEvent(eventName) {
        window.dispatchEvent(new Event(eventName));
    }
}
