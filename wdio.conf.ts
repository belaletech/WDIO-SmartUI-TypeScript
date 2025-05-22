import { remote } from 'webdriverio';

export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: ['./tests/*.ts'],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'Chrome',
      'LT:Options': {
        platformName: 'android',
        deviceName: 'Galaxy S23',
        platformVersion: '13',
        browserVersion: 'latest',
        isRealMobile: true,
        // resolution: '1280x800',
        username: process.env.LT_USERNAME,
        accessKey: process.env.LT_ACCESS_KEY,
        build: 'Geolocation',
        project: ' WDIO android web test',
        visual: true,
      },
    },
  ],
//   logLevel: 'info',
  logLevel: 'warn', // Change from 'info' to 'warn' or 'error'
  bail: 0,
  hostname: 'mobile-hub.lambdatest.com',
  port: 80,
  path: '/wd/hub',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  services: [],  //  Removed 'lambdatest' since no package exists
  afterTest: async function (test, context, { error }) {
    if (error) {
      await browser.execute('lambda-status=failed');
    } else {
      await browser.execute('lambda-status=passed');
    }
  },
  
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};
