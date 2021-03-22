
// npm install mocha chai

var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('chai').assert

describe('#indexOf()', function() {
  it('should return -1 when not present', function() {
    assert.equal([1,2,3].indexOf(4), -1)
  })
})
