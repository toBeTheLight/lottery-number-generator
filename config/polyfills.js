'use strict';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}
if (typeof localStorage === 'undefined') {
  //browserMocks.js
  var localStorageMock = (function() {
    var store = {};
    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        }
    };

  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global);
}

const Enzyme = require('enzyme');

let Adapter;
if (process.env.REACT === '15') {
  Adapter = require('enzyme-adapter-react-15');
} else {
  Adapter = require('enzyme-adapter-react-16');
}

Enzyme.configure({ adapter: new Adapter() });