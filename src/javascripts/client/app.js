'use strict';

window.appRoot = {};

window.module = {
    set exports(value) {
        if (!value.path) {
            throw 'path must be present.';
        }

        window.appRoot[value.path] = value;
    }
}

/**
 * cb is optional.
 */
window.require = function(name, cb) {
    if (cb) {
        return cb(window.appRoot[name]);
    }

    return window.appRoot[name];
};