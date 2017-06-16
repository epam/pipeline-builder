const assert = require('assert'),
  test = require('selenium-webdriver/testing'),
  webdriver = require('selenium-webdriver'),
  pixelmatch = require('pixelmatch'),
  until = require('selenium-webdriver/lib/until'),
  SauceLabs = require('saucelabs'),
  fs = require('fs'),
  svg2png = require('svg2png'),
  path = require('path'),
  username = process.env.SAUCE_USERNAME,
  accessKey = process.env.SAUCE_ACCESS_KEY,
  saucelabs = new SauceLabs({
    username: username,
    password: accessKey
  });

test.describe('Pipelin Builder JS functional test', function () {
  this.timeout(600000);

  var driver;

  test.beforeEach(function () {
    var browser = 'chrome',
      version = '43.0',
      platform = 'Windows 7',
      screenResolution = '1920x1080',
      server = "http://" + username + ":" + accessKey +
        "@ondemand.saucelabs.com:80/wd/hub";


    driver = new webdriver.Builder().withCapabilities({
      'browserName': browser,
      'screenResolution': screenResolution,
      'platform': platform,
      'version': version,
      'username': username,
      'accessKey': accessKey
    }).usingServer(server).build();
    driver.getSession().then(function (sessionid) {
      driver.sessionID = sessionid.id_;
    });

  });

  test.afterEach(function (done) {
    var title = this.currentTest.title,
      passed = (this.currentTest.state === 'passed') ? true : false;
    driver.quit();
    saucelabs.updateJob(driver.sessionID, {
      name: title,
      passed: passed,
      build: 'Build #' + process.env.TRAVIS_BUILD_NUMBER + ', ' + process.env.TRAVIS_COMMIT_MESSAGE
    }, done);
  });

  function doneReading(golden, screenshot) {
    var diff = pixelmatch(golden, screenshot, diff, 1920, 899);
    return diff;
  }

  const PB_APP_URL = 'http://pb.opensource.epam.com:10000/';
  const REFERENCE_TMP_PNG = 'buffer.png';
  const REFERENCE_TMP_SVG = 'buffer.svg';
  const CASES_PATH = './integration_tests/cases/';
  var contents = fs.readFileSync(path.resolve(path.join(CASES_PATH + 'test-cases.json')));
  var test_cases = JSON.parse(contents);

  test_cases.cases.forEach(function(test_case) {

    test.it(test_case.name, function () {
      driver.get(PB_APP_URL + '?url=' + test_case.wdl_url);
      driver.wait(until.elementLocated(webdriver.By.xpath('//*[@id="wdl"]')), 10000, 'Page wasn\'t loaded in time');
      driver.wait(until.elementLocated(webdriver.By.xpath('//*[@class="build-ok"]')), 10000, 'Build failure');
      driver.executeScript('var svg = document.querySelector("svg").parentNode.innerHTML; return svg;').then(function (return_value) {
        fs.writeFileSync(REFERENCE_TMP_SVG, return_value);
        var f = svg2png.sync(fs.readFileSync(REFERENCE_TMP_SVG));
        fs.writeFileSync(REFERENCE_TMP_PNG, f);
        fs.unlinkSync(REFERENCE_TMP_SVG);
        var golden = fs.readFileSync(REFERENCE_TMP_PNG);
        var screenshot = fs.readFileSync(path.join(CASES_PATH, test_case.reference_img));
        var d = doneReading(golden, screenshot);
        fs.unlinkSync(REFERENCE_TMP_PNG);
        assert.equal(d <= 10, true, 'image is the same ' + d);
      });
    });
  });
});
