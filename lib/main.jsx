var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;

var config = require('../config/config');
var generator = require('./page-generator.jsx');
var developerHelp = require('./build/developer-help');

var ga = require('react-ga');
var GA_ACCOUNT = process.env.GA_ACCOUNT || '';
var GA_DEBUG = process.env.GA_DEBUG || 'off';

/**
 * ... FIXME: TODO: document ...
 */
function startRunningSite() {
  var pageHolder = document.getElementById('page-holder');
  var location = config.ENABLE_PUSHSTATE ? Router.HistoryLocation : Router.RefreshLocation;
  generator.run(location, pageHolder);
}

// flip the "using JS" switch and perform GA accordingly
if (config.IN_STATIC_SITE) {
  if (GA_ACCOUNT) {
    ga.initialize(GA_ACCOUNT, { debug: GA_DEBUG === 'on' });
  }

  if (window.ENABLE_JS) {
    if (!window.Intl) {
      require.ensure(['intl'], function(require) {
        window.Intl = require('intl');
        startRunningSite();
      }, "IntlBundle");
    } else {
      startRunningSite();
    }
  }

  else if (GA_ACCOUNT) {
    ga.pageview(window.location.pathname);
    ga.event({
      category: 'JavaScript',
      action: 'JS Disabled',
      nonInteraction: true
    });
  }
}

// Add in the developer ribbon when not in production mode.
if (process.env.NODE_ENV !== 'production') {
  developerHelp();
}
