const net = require('net')
const fifo = require('fifo')

function Redis(opts) {
    if (!(this instanceof Redis)) {
        return new Redis(opts)
    }

    this.queue = fifo()
    this.client = this.connect(opts)
    this.startUp(this.client)
}

Redis.prototype.connect = function(opts) {
    return net.createConnection(opts.port, opts.host || 'localhost', () => {
        //Connesso
    });
}

Redis.prototype.startUp = function(client) {
    client.setEncoding('utf8')

    client.on('data', (data) => {
        let cb = null

        if (cb = this.queue.shift()) {
            cb.call(this, data)
        }
    })

    client.on('close', (had_error) => {

    })

    client.on('connect', () => {

    })

    client.on('drain', () => {

    })

    client.on('end', () => {

    })

    client.on('error', () => {

    })

    client.on('timeout', () => {

    })
}

Redis.prototype.add = function(key, json, cb) {
    this.exec(['SET', key, JSON.stringify(json)], (data) => {
        console.log(data)
    })
}

Redis.prototype.find = function(key, cb) {
    this.exec(['GET', key], (data) => {
        console.log(data)
    })
}

Redis.prototype.exists = function(key, cb) {
    this.exec(['EXISTS', key], (data) => {
        console.log(data)
    })
}

Redis.prototype.delete = function(key, cb) {
    this.exec(['DEL', key], (data) => {
        console.log(data)
    })
}

Redis.prototype.exec = function(command, cb) {
    this.queue.push(cb)
    this.client.write(this.makeCommand(command))
}

Redis.prototype.makeCommand = function(cmds) {
    command = '*' + cmds.length + '\r\n'

    cmds.forEach((cmd) => {
        command += '$' + cmd.length + '\r\n' + cmd + '\r\n'
    })

    return command
}

Redis.prototype.parseResponse = function(data) {
}

module.exports = Redis
