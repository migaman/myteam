var assert = require('assert');
module.exports = {
  
  exampleArrayTest : function () {
	assert.equal([1,2,3].indexOf(4), -1);
  },
  
  exampleNumberTest : function () {
	assert.equal(1, 1);
  }

};
