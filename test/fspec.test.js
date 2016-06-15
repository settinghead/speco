'use strict';

var s = require('../src');
var expect = require('chai').expect;
var Problem = require('../src/_Problem');

describe('specky', function() {
  describe('fspec', function() {
    it('should return a function that checks the spec of a given function as its input', function() {
      var FspecSpec = s.fspec({args: s.cat(s.isObj), ret: s.isFn});
      var specedFspec = FspecSpec(s.fspec);
      expect(function() { specedFspec('fn should not be a string'); }).to.throw(Problem);

      expect(function() { specedFspec({some: 'obj'}) }).not.to.throw();
      expect(function() { specedFspec({some: 'obj'}, {extra: 'param'}) }).to.throw(Problem);
      expect(function() { specedFspec() }).to.throw(Problem);
    });
  });
});
