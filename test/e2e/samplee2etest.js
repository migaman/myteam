'use strict';
const {Builder, By, until, promise} = require('selenium-webdriver');
var assert = require('assert');
const firefox = require('selenium-webdriver/firefox');
const SauceLabs  = require("saucelabs");

describe('samplee2etest', function(){
	var driver;
	var saucelabs;
	beforeEach(async function() {
		if (process.env.SAUCE_USERNAME != undefined) {
			 saucelabs = new SauceLabs({
					username: process.env.SAUCE_USERNAME,
					password: process.env.SAUCE_ACCESS_KEY
			});
		
			 driver = new Builder()
				.usingServer('http://' + process.env.SAUCE_USERNAME + ':' + process.env.SAUCE_ACCESS_KEY + '@ondemand.saucelabs.com:80/wd/hub')
				.withCapabilities({
					'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
					build: process.env.TRAVIS_BUILD_NUMBER,
					username: process.env.SAUCE_USERNAME,
					accessKey: process.env.SAUCE_ACCESS_KEY,
					browserName: "chrome",
					name: this.currentTest.title
			}).build();
			
			driver.getSession().then(function(sessionid) {
					driver.sessionID = sessionid.id_;
			});
			
		}
		else {
			driver = await new Builder()
				.forBrowser('firefox')
				.setFirefoxOptions(new firefox.Options().headless())
				.build();
		}
	  });
	  
	  /*afterEach(async function() {
		var passed = (this.currentTest.state === 'passed') ? true : false;
		console.log("passed " + passed);
		
		
		saucelabs.updateJob(driver.sessionID, {
			  passed: passed
		}, done);
		saucelabs.updateJob(driver.sessionID, {
			  passed: passed
			});
		console.log("SauceOnDemandSessionID=" + driver.sessionID +" job-name=" + this.currentTest.title);
		
		await driver.quit();
	});*/
	
	afterEach(function(done) {
		var currentTest = this.currentTest;
		var sauceLabsActive = process.env.SAUCE_USERNAME != undefined;
        driver.quit().then (function (){
			if (sauceLabsActive) {
				var passed = (currentTest.state === 'passed') ? true : false;
				saucelabs.updateJob(driver.sessionID, { name: currentTest.title, passed: passed }, done);
			}
			else {
				done();
			}
            
        });
    });
	
	it('bodytest', async function() {
		var application_host = 'http://localhost:3000';
				
		await driver.get(application_host);
		await driver.wait(until.titleIs('Home - Hackathon Starter'), 1000);
		await driver.findElement(By.css('body'));
		await driver.findElement(By.css('body > div > h1'));
		
		await driver.get("http://localhost:3000");
		var url = await driver.getCurrentUrl();
		assert.equal(url, "http://localhost:3000/");
		  
		var title = await driver.getTitle();
		assert.equal(title, "Home - Hackathon Starter");
		
		var titleH1 = await driver.findElement(By.css('body > div > h1')).getText();
		assert.equal(titleH1, "Hackathon Starter");
		
		var welcome = await driver.findElement(By.css('body > div > p')).getText();
		assert.equal(welcome, "A boilerplate for Node.js web applications.");
		
	
	});
	
});


