var assert = require('assert');

module.exports = {
  desiredCapabilities : {
    name : 'test-Name'
  },
  
  demoTest : function (client) {
    assert.equal(client.options.desiredCapabilities.name, 'test-Name');
	console.log("URL: " + client.launchUrl);
	client
	.url(client.launchUrl)
	.waitForElementVisible('body', 1000)
	  .setValue('input[type=text]', 'nightwatch')
	  .waitForElementVisible('input[name=btnK]', 1000)
	  .pause(1000)
	  .assert.elementPresent("input[name=btnK]")
	

  },

  after : function(client) {
    client.end(function() {

    });
  }
};

 
