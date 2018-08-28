/**
 *  @desc loader entry
 */

import { getOptions } from 'loader-utils';
import path from 'path';
import fs from 'fs';

function isReg(val) {
    return Object.prototype.toString.call(val) === '[object RegExp]';
}

function resolve(filePath, source, token) {
    source = source.replace(token, (full, key) => {
        const p = path.resolve(filePath, key);
        const file = fs.readFileSync(p, 'utf-8');

        return resolve(path.dirname(p), file, token);
    });

    return source;
}

export default function loader(source) {
    const options = getOptions(this);
    const defaultToken = /\$\$\('(.*)'\)/g;
    let token;

    if (options.token) {
        if (!isReg(options.token)) {
            throw new Error(`${options.token} is not a RegExp!`);
        }
        token = new RegExp(token.source, 'g');
    } else {
        token = defaultToken;
    }
    source = resolve(this.context, source, token);
    console.log(source);

    return `${JSON.stringify(source)}`;
}
