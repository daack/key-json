const crypto = require('crypto')

function KeyJson(opts = {}) {
    if (!(this instanceof KeyJson)) {
        return new KeyJson(opts)
    }

    this.keyGenerator = opts.keyGenerator || function() {
        return crypto.randomBytes(48).toString('hex')
    }

    this.manager = opts.manager || KeyJson.managers.memory()
}

KeyJson.prototype.use = function(manager) {
    this.manager = manager
    return this
}

KeyJson.prototype.set = function(key, json, cb) {
    if (typeof key == 'object') {
        cb = json
        json = key
        key = this.keyGenerator()
    }

    this.manager.add(key, json, (err) => {
        if (cb) cb.call(this, err, key)
    })
}

KeyJson.prototype.get = function(key, cb) {
    this.manager.find(key, (err, data) => {
        cb.call(this, err, data)
    })
}

KeyJson.prototype.has = function(key, cb) {
    this.manager.exists(key, (err, check) => {
        cb.call(this, err, check)
    })
}

KeyJson.prototype.remove = function(key, cb) {
    this.manager.delete(key, (err) => {
        if (cb) cb.call(this, err, key)
    })
}

KeyJson.managers = {
    memory: require('./managers/memory'),
    redis: require('./managers/redis')
}

module.exports = KeyJson
