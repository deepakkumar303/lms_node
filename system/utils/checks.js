
const isArray = (a) => (!!a) && (a.constructor === Array);

const isEmptyArray = (a) => (a.length === 0);

const arrayLength = (a) => (isArray(a) ? a.length : 0);

const isNull = (a) => (a === null);

const isBoolean = (a) => (typeof a === 'boolean');

const isBoolTrue = (a) => (typeof a === 'boolean' && a === true);

const isEmptyString = (a) => (a === '');

const isObject = (a) => (!!a) && (a.constructor === Object);

const isEmptyObject = (a) => (Object.keys(a).length === 0);

function checkUserRole(name) {
    const userRoleArray = [
        {
            long_name: 'Gaius Admin',
            short_name: 'GA',
        },
        {
            long_name: 'Corporate User',
            short_name: 'CU',
        },
        {
            long_name: 'Legal Services User',
            short_name: 'LS',
        },
    ];
    const filetArr = userRoleArray.filter((val) => val.short_name === name);
    if (!isArray(filetArr) || isEmptyArray(filetArr)) {
        return false;
    }
    return true;
}

module.exports = {
    isArray,
    isEmptyArray,
    arrayLength,
    isNull,
    isBoolean,
    isBoolTrue,
    isEmptyString,
    checkUserRole,
    isObject,
    isEmptyObject,
};