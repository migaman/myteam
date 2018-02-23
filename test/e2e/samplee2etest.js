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
	//.waitForElementVisible('body > h1', 1000)
	.pause(1000);
	client.assert.title("Express")
	client.assert.visible("body > h1")
  },

  after : function(client) {
    client.end(function() {

    });
  }
};