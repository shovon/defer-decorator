# Decorate functions to have their calls deferred

Although not always, but there are some times that you want to defer your function calls until a later time. So, let's say you had some function that asynchronously fires off an event, but doesn't need to listen in on it, then you will probably define the function like so:

```javascript
function firesEvent() {
  setImmediate(function () {
    // Fires some event.
  });
}
```

The act of wrapping your function logic inside a `setImmediate` becomes a boilerplate for all functions that you want to have called.

But, it would be concise to apply a decorator to that function:

```javascript
var firesEvent = defer(function () {
  // Fires some event.
});
```

## Usage

Install `defer-decorator` using npm:

```
npm install defer-decorator
```

Then use it in your code like so:

```
var defer = require('defer-decorator');

var firesEvent = defer(function () {
    // Fires some event.
});
```

## Use with ES7 decorators

This library becomes especially useful with ES7 decorators and classes:

```javascript
import deferred from './src';

class MyClass {
  @deferred
  someMethod() {
    console.log('Hello, World!');
  }
}

const obj = new MyClass();
obj.someMethod();
console.log('Should be called before');
```

## License

`defer-decorator` is [MIT-Licensed](https://github.com/shovon/defer-decorator/blob/master/LICENSE)