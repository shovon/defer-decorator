import expect from 'expect.js';
import assert from 'assert';
import { defer } from './src';
import deferred from './src';
import { EventEmitter } from 'events';

describe('defer', () =>{
  it('should decorate an arbitrary function so that calls are done async', (done) => {
    const obj = {};
    const emitter = new EventEmitter();

    function toDefer(value) {
      obj.foo = 'bar';
      expect(value).to.be('baz');
      emitter.emit('done');
      done();
    }

    emitter.on('done', () => {
      expect(obj).to.eql({foo: 'bar'});
    });

    const deferred = defer(toDefer);
    deferred('baz');
    expect(obj).to.eql({});
  });

  it('should decorate an arbitrary function, yet also be bound to whichever object it is a property of', (done) => {
    const obj = {
      method: defer(function () {
        expect(this).to.be(obj);
        done();
      })
    };

    obj.method();
  });

  it('should decorate an arbitrary function, and when attached to an object, it inherits the binding', (done) => {
    const obj = {};

    function toDefer() {
      expect(this).to.be(obj);
      done();
    }

    const deferred = defer(toDefer);
    obj.method = deferred;
    obj.method();
  });

  it('should be able to decorate ES5 prototypal class methods', (done) => {

    function MyClass() {}
    MyClass.prototype.method = defer(function () {
      assert(this instanceof MyClass);
      done();
    });

    new MyClass().method();

  });
});

describe('decorator', () => {
  it('should decorate an ES6/ES7 class method', (done) => {

    const globalObj = {};
    const emitter = new EventEmitter();

    class MyClass {
      @deferred
      method() {
        assert(this instanceof MyClass);
        globalObj.foo = 'bar';
        emitter.emit('done');
      }
    }

    emitter.on('done', function () {
      expect(globalObj).to.eql({foo: 'bar'});
      done();
    });

    new MyClass().method();
    expect(globalObj).to.eql({});

  });
});
