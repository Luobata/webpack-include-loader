/**
 *  @desc loader entry
 */

/* eslint-disable */

const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

const getOptions = loaderUtils.getOptions;

function isReg(val) {
    return Object.prototype.toString.call(val) === '[object RegExp]';
}
function findOne(load, p) {
    return new Promise((resolve, reject) => {
        load(p, (err, source) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(source);
        });
    });
}

function find(load, keys) {
    const all = [];
    for (const i of keys) {
        const p = loaderUtils.urlToRequest(i);
        console.log(i, i.replace(/['"]/g, ''), p);
        all.push(findOne(load, p));
    }

    return Promise.all(all);
}

function replace(load, source, token) {
    return new Promise((resolve, reject) => {
        const p = loaderUtils.urlToRequest(token[1].replace(/['"]/g, ''));
        console.log(p);
        load(p, function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            console.log(result);

            source = source.replace(token[0], result);
            resolve(source);
        });
    });
}

function resolveInclude(filePath, source, token) {
    return new Promise((resolve, reject) => {
        const match = token.exec(source);
        if (match) {
            replace(this.loadModule, source, match)
                .then(data => {
                    resolve(data);
                })
                .catch(msg => {
                    reject(msg);
                });
        } else {
            resolve(source);
        }
    });
}

module.exports = function loader(source) {
    return new Promise((resolve, reject) => {
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
        source = resolveInclude
            .call(this, this.context, source, token)
            .then(data => {
                console.log(data);
                resolve(data);
            })
            .catch(msg => {
                reject(msg);
            });

        // return `${JSON.stringify(source)}`;
    });
};
