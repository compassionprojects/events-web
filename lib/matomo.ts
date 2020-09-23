import { createInstance } from '@datapunt/matomo-tracker-react';

const domain = 'https://matamo-analytics.herokuapp.com';

export default createInstance({
  urlBase: domain,
  siteId: 1, // optional, default value: `1`
  // userId: 'UID76903202', // optional, default value: `undefined`.
  // trackerUrl: `${domain}/tracking.php`, // optional, default value: `${urlBase}matomo.php`
  // srcUrl: `${domain}/tracking.js`, // optional, default value: `${urlBase}matomo.js`
  disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: {
    // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 10, // optional, default value: `15
  },
  linkTracking: false, // optional, default value: true
  configurations: {
    // optional, default value: {}
    // any valid matomo configuration, all below are optional
    // disableCookies: true,
    // setSecureCookie: true,
    // setRequestMethod: 'POST',
  },
});
