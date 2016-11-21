function Memory() {
    if (!(this instanceof Memory)) {
        return new Memory()
    }

    this.db = {}
}

Memory.prototype.add = function(key, json, cb) {
    try {
        this.db[key] = json
        cb(null)
    } catch(err) {
        cb(err)
    }
}

Memory.prototype.find = function(key, cb) {
    try {
        cb(null, this.db[key] || null)
    } catch(err) {
        cb(err, null)
    }
}

Memory.prototype.exists = function(key, cb) {
    try {
        cb(null, this.db.hasOwnProperty(key))
    } catch(err) {
        cb(err)
    }
}

Memory.prototype.delete = function(key, cb) {
    try {
        delete this.db[key]
        cb(null)
    } catch(err) {
        cb(err)
    }
}

module.exports = Memory
