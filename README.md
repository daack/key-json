# key-json :honeybee:

Key/Json Store with multiple interfaces

* [Install](#install)
* [Example](#example)

<a name="install"></a>
## Install

To install key-json, simply use npm:

```
npm install key-json --save
```

<a name="example"></a>
## Example

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