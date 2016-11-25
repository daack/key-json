const crypto = require('crypto')
const logger = require('./lib/logger')

function KeyJson(opts) {
    if (!(this instanceof KeyJson)) {
        return new KeyJson(opts)
    }

    this.options = opts || {}

    logger.setLevel(this.options.loggerLevel)
}

KeyJson.prototype.use = function(manager) {
    this.manager = manager

    return this
}

KeyJson.prototype.set = function(key, json, cb) {
    this
    .manager
    .set(key, json, (err) => {
        if (cb) cb.call(this, err)
    })

    return this
}

KeyJson.prototype.get = function(key, cb) {
    this
    .manager
    .get(key, (err, json) => {
        if (cb) cb.call(this, err, json)
    })

    return this
}

KeyJson.prototype.has = function(key, cb) {
    this
    .manager
    .has(key, (err, check) => {
        if (cb) cb.call(this, err, check)
    })

    return this
}

KeyJson.prototype.delete = function(key, cb) {
    this
    .manager
    .delete(key, (err, done) => {
        if (cb) cb.call(this, err, done)
    })

    return this
}

KeyJson.managers = {
    redis: require('./managers/redis')
}

module.exports = KeyJson
