const { expect, browser } = require('@wdio/globals');
const { smartuiSnapshot } = require('@lambdatest/wdio-driver');

describe('LambdaTest WDIO SmartUI', () => {
  it('should take SmartUI screenshots on Kayak About page', async () => {
    try {
      await browser.pause(1000);
      console.log("Opening URL");

      await browser.url("https://the-internet.herokuapp.com/geolocation");
      console.log("URL opened");

      const viewportWidth = await browser.execute(() => window.innerWidth);
      const viewportHeight = await browser.execute(() => window.innerHeight);
      console.log(`Viewport Width: ${viewportWidth}, Viewport Height: ${viewportHeight}`);

      await browser.pause(3000);
      const pageTitle = await browser.getTitle();
      console.log(`Page Title: ${pageTitle}`);

      if (!pageTitle.includes("The Internet")) {
        throw new Error("Page title validation failed");
      }

      const whereAmIButton = await $("button"); // ✅ Using CSS selector as requested
      await whereAmIButton.click();
      await browser.pause(3000);

      const contexts = await browser.getContexts();
      contexts.forEach((context) => console.log(`Available context: ${context}`));

      await browser.switchContext('NATIVE_APP');
      console.log("Switched to Native Context");

      try {
        const allowButton = await $("//*[@text='Allow' or @text='ALLOW']");
        await allowButton.waitForExist({ timeout: 5000 });
        await allowButton.click();
        console.log("Clicked Allow on permission pop-up");
      } catch (error) {
        console.log("Permission pop-up not found or already granted");
      }

      // ✅ LambdaTest test status update using lambda-hook
      await browser.execute(
        'lambda-hook: {"action": "setTestStatus", "arguments": {"status":"passed"}}'
      );
    } catch (err) {
      console.error('Test failed:', err.message);

      //  LambdaTest fail status update using lambda-hook
      await browser.execute(
        'lambda-hook: {"action": "setTestStatus", "arguments": {"status":"failed"}}'
      );

      throw err;
    }
  });
});
