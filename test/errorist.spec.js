'use strict';

var errorist = require('../lib');

describe('errorist', function() {
  it('should be a function', function() {
    expect(errorist).to.be.a('function');
  });

  it('should return an Error', function() {
    expect(errorist()).to.be.instanceof(Error);
  });

  describe('when passed no value (undefined)', function() {
    it('should return an error with empty message', function() {
      expect(errorist().message).to.equal('');
    });
  });

  describe('when passed a string', function() {
    it('should return an Error with the string for the message', function() {
      expect(errorist('foo').message).to.equal('foo');
    });
  });

  describe('when passed an object with no "message" property', function() {
    it('should stringify the object', function() {
      expect(errorist({}).message).to.equal(JSON.stringify({}));
    });

    describe('and the object is not stringify-able', function() {
      it('should return an error with empty message', function() {
        var obj = {};
        obj.foo = obj;
        expect(errorist(obj).message).to.equal('');
      });
    });
  });

  describe('when passed an object with a "message" property', function() {
    it('should use the "message" property for the message', function() {
      var obj = {
        message: 'foo'
      };
      expect(errorist(obj).message).to.equal('foo');
    });
  });

  describe('when passed a primitive', function() {
    it('should return an error with the primitive as the message', function() {
      expect(errorist(1).message).to.equal(String(1));
    });
  });

  describe('when passed an Error', function() {
    it('should return the same Error', function() {
      var err = new Error();
      expect(errorist(err)).to.equal(err);
    });
  });
});
