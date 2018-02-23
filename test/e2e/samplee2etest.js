var assert = require('assert');

module.exports = {
  /*desiredCapabilities : {
    name : 'test-Name'
  },*/
  
  demoTest : function (client) {
    //assert.equal(client.options.desiredCapabilities.name, 'test-Name');
	console.log("URL: " + client.launchUrl);
	
	client
	.url(client.launchUrl)
	.waitForElementVisible('body', 1000)
	//.waitForElementVisible('body > h1', 1000)
	.pause(1000);
	client.assert.title("Express")
	client.assert.visible("body > h1")
	client.assert.visible("body > p")
	client.assert.containsText("body > h1", "Express");
	client.assert.containsText("body > p", "Welcome to Express");
  },

  after : function(client) {
    client.end(function() {

    });
  }
};