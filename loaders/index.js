/**
 *  @desc loader entry
 */

const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

const getOptions = loaderUtils.getOptions;

function isReg(val) {
    return Object.prototype.toString.call(val) === '[object RegExp]';
}

function resolve(filePath, source, token) {
    source = source.replace(token, (full, key) => {
        const p = path.resolve(filePath, key.replace(/['"]/g, ''));
        const file = fs.readFileSync(p, 'utf-8');

        return resolve(path.dirname(p), file, token);
    });

    return source;
}

module.exports = function loader(source) {
    const options = getOptions(this);
    const defaultToken = /\$\$\((.*)\)/g;
    let token;

    if (options && options.token) {
        if (!isReg(options.token)) {
            throw new Error(`${options.token} is not a RegExp!`);
        }
        token = new RegExp(token.source, 'g');
    } else {
        token = defaultToken;
    }
    source = resolve(this.context, source, token);

    return `${JSON.stringify(source)}`;
};
