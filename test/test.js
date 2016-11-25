const mockery = require('mockery')
const redis = require('./mocks/redis_mock')

mockery.registerMock('redis', redis)
mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
})

const chai = require('chai')
const Kj = require('./../keyjson')

function redisInstance() {
    const kj = Kj()

    return kj.use(Kj.managers.redis())
}

describe('KeyJson', function() {
    describe('new istance', function() {
        it('should instanciate a new KeyJson instance', function() {
            chai.expect(Kj()).to.be.an.instanceof(Kj)
        })

        it('should response to methods: use, set, get, has, delete', function() {
            const kj = Kj()

            chai.expect(kj).to.respondTo('use')
            chai.expect(kj).to.respondTo('set')
            chai.expect(kj).to.respondTo('get')
            chai.expect(kj).to.respondTo('has')
            chai.expect(kj).to.respondTo('delete')
        })
    })
})

describe('KeyJson Redis Store', function() {
    describe('set', function() {
        it('should set a new json object', function(done) {
            redisInstance()
            .set('foo', {foo: 'bar'})
            .has('foo', (err, exists) => {
                chai.assert.isOk(exists)
                done()
            })
        })

        it('should get a stored object', function(done) {
            redisInstance()
            .set('foo', {foo: 'bar'})
            .get('foo', (err, json) => {
                chai.expect(json).to.be.an('object');
                chai.expect(json).to.include.keys('foo');
                done()
            })
        })

        it('should delete a key', function(done) {
            const kj = redisInstance()

            kj
            .set('foo', {foo: 'bar'})
            .delete('foo', (err, result) => {
                chai.assert.isOk(result)

                kj
                .get('foo', (err, json) => {
                    chai.assert.isNotOk(json)
                    done()
                })
            })
        })
    })
})