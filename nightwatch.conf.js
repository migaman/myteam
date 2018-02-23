require('env2')('.env'); // optionally store your environment variables in .env
const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const PKG = require('./package.json'); // so we can get the version of the project
const SCREENSHOT_PATH = "./node_modules/nightwatch/screenshots/" + PKG.version + "/";

const config = { // we use a nightwatch.conf.js file so we can include comments and helper functions
  "src_folders": [
    "./test/e2e", "./test/unit"     // we use '/test' as the name of our test directory by default. So 'test/e2e' for 'e2e'.
  ],
  "output_folder": "./node_modules/nightwatch/reports", // reports (test outcome) output by Nightwatch
  "selenium": {
    "start_process": true,
    "server_path": seleniumServer.path,
    "log_path": "",
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver" : chromedriver.path
    }
  },
  "test_workers" : {"enabled" : true, "workers" : "auto"}, // perform tests in parallel where possible
  
  "test_settings": {
    "e2e_saucelabs": {
      //"launch_url": "http://ondemand.saucelabs.com:80", // we're testing a local site on Saucelabs
	  //"launch_url": process.env.SAUCE_USERNAME + ":" + process.env.SAUCE_ACCESS_KEY + "@localhost:4445",
	  "launch_url": "https://ondemand.saucelabs.com:443/wd/hub",
      "selenium_port": 80,
      "selenium_host": "ondemand.saucelabs.com",
      "silent": true,
      "screenshots": {
        "enabled": true, // save screenshots to this directory (excluded by .gitignore)
        "path": SCREENSHOT_PATH
      },
      "username" : process.env.SAUCE_USERNAME,     // if you want to use Saucelabs remember to
      "access_key" : process.env.SAUCE_ACCESS_KEY, // export your environment variables (see readme)
      "globals": {
        "waitForConditionTimeout": 10000    // wait for content on the page before continuing
      },
      "desiredCapabilities": {
				"tunnel-identifier": process.env.TRAVIS_JOB_NUMBER, // needed for sauce-connect, i.e for testing localhost on saucelabs
			  build: `build-${process.env.TRAVIS_JOB_NUMBER}` // needed for sauce-connect
			},
	  "filter" : "./test/e2e/*",
      "exclude" : "./test/unit/*"
    },
    "e2e_local": {
      "launch_url": "http://localhost:3000",
      "selenium_port": 4444,
      "selenium_host": "127.0.0.1",
      "silent": true,
      "screenshots": {
        "enabled": true, // save screenshots taken here
        "path": SCREENSHOT_PATH
      }, // this allows us to control the
      "globals": {
        "waitForConditionTimeout": 15000 // on localhost sometimes internet is slow so wait...
      },
	  "filter" : "./test/e2e/*",
      "exclude" : "./test/unit/*"
      
    },
	
	"unit" : {
      "selenium" : {
        "start_process" : false,
        "start_session" : false
      },
      "filter" : "./test/unit/*",
      "exclude" : ""
	  
    },
    
	"chrome": { // your local Chrome browser (chromedriver)
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    "chromemac": { // browsers used on saucelabs:
      "desiredCapabilities": {
        "browserName": "chrome",
        "platform": "OS X 10.11",
        "version": "47"
      }
    },
    "ie11": {
      "desiredCapabilities": {
        "browserName": "internet explorer",
        "platform": "Windows 10",
        "version": "11.0"
      }
    },
    "firefox" : {
      "desiredCapabilities": {
        "platform": "XP",
        "browserName": "firefox",
        "version": "33"
      }
    },
    "internet_explorer_10" : {
      "desiredCapabilities": {
        "platform": "Windows 7",
        "browserName": "internet explorer",
        "version": "10"
      }
    },
    "android_s4_emulator": {
      "desiredCapabilities": {
        "browserName": "android",
        "deviceOrientation": "portrait",
        "deviceName": "Samsung Galaxy S4 Emulator",
        "version": "4.4"
      }
    },
    "iphone_6_simulator": {
      "desiredCapabilities": {
        "browserName": "iPhone",
        "deviceOrientation": "portrait",
        "deviceName": "iPhone 6",
        "platform": "OSX 10.10",
        "version": "8.4"
      }
    }
  }
}
module.exports = config;

function padLeft (count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? '0' + count : count.toString();
}

var FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath (browser) {
  var a = browser.options.desiredCapabilities;
  var meta = [a.platform];
  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  meta.push(a.name); // this is the test filename so always exists.
  var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
