'use strict';
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    secret: jwtSecret,
    tokenExpirePeriod
} = config.get('jwt');

async function generateToken(payLoad, expiry) {
    const expiresIn = expiry || tokenExpirePeriod;
    const isObject = (typeof payLoad === 'object');

    if (!payLoad) {
        const error = new TypeError('Token Payload Should Not Be Empty');
        throw error;
    }

    if (!isObject) {
        const error = new TypeError('Token Payload Must Be An Object');
        throw error;
    }

    return new Promise((resolve, reject) => {
        jwt.sign(payLoad, jwtSecret, { expiresIn }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
    })

}

async function verifyToken(token) {
    if (!token) {
        const error = new TypeError('Token Should Not Be Empty');
        throw error;
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (error, decodedToken) => {
            if (error) {
                reject(error);
            } else {
                resolve(decodedToken);
            }
        });
    })

}

module.exports = {
    generate: generateToken,
    verify: verifyToken
};