# key-json :honeybee:

```javascript
const Kj = require('key-json')

const kj = Kj({
	loggerLevel: 'info'
})

kj
.use(Kj.managers.redis({
	//redis createClient() configuration
	host: '127.0.0.1',
	port: 6379
}))
.set('foo', { foo: 'foo' }, (err) => {
})
.get('foo', (err, json) => {
})
.has('foo', (err, exists) => {
})
.delete('foo', (err, done) => {
})
```