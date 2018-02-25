'use strict';
const {Builder, By, until, promise} = require('selenium-webdriver');
var assert = require('assert');
const firefox = require('selenium-webdriver/firefox');

describe('samplee2etest', function(){
	this.timeout(10000);
	let driver;
	
	beforeEach(async function() {
		/*
		driver = await new Builder()
			.withCapabilities({
			browserName: "firefox"
			
		}).build();
		*/
		if (process.env.SAUCE_USERNAME != undefined) {
			
			 driver = new Builder()
				.usingServer('http://'+ process.env.SAUCE_USERNAME+':'+process.env.SAUCE_ACCESS_KEY+'@ondemand.saucelabs.com:80/wd/hub')
				.withCapabilities({
				'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
				build: process.env.TRAVIS_BUILD_NUMBER,
				username: process.env.SAUCE_USERNAME,
				accessKey: process.env.SAUCE_ACCESS_KEY,
				browserName: "chrome"
			}).build();
			
		}
		else {
			driver = await new Builder()
				.forBrowser('firefox')
				.setFirefoxOptions(new firefox.Options().headless())
				.build();
		}
	  });
	  
	  afterEach(async function() {
		await driver.quit();
	});
	
	it('demo', async function() {
		var application_host = 'http://localhost:3000';
				
		await driver.get(application_host);
		await driver.wait(until.titleIs('Express'), 1000);
		await driver.findElement(By.css('body'));
		await driver.findElement(By.css('body > h1'));
		
		await driver.get("http://localhost:3000");
		let url = await driver.getCurrentUrl();
		assert.equal(url, "http://localhost:3000/");
		  
		  
		let title = await driver.getTitle();
		assert.equal(title, "Express");
		
		let titleH1 = await driver.findElement(By.css('body > h1')).getText();
		assert.equal(titleH1, "Express");
		
		let welcome = await driver.findElement(By.css('body > p')).getText();
		assert.equal(welcome, "Welcome to Express");
		
	
	});
	
});


