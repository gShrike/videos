const devServer = browser.globals.devServerURL;

module.exports = {
  'header': function test(browser) {
    browser
      .url(devServer)
      .waitForElementVisible('.head', 5000)
      .assert.elementPresent('nav')
      .assert.containsText('h3', 'Shrike Videos')
      .assert.elementCount('.col', 4)
      .end();
  },
  'login': function test(browser) {
    browser
      .url(devServer)
      .waitForElementVisible('main', 5000)
      .assert.containsText('h2', 'Login')
      .assert.elementPresent('form')
      .assert.elementPresent('input[type=text]')
      .assert.elementPresent('input[type=password]')
      .end();
  },
};
