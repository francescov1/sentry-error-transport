# Sentry Error Transport

A Sentry transport for Winston.

## Features

* Sends errors to Sentry using [`Sentry.withScope` and `Sentry.captureException`](https://docs.sentry.io/enriching-error-data/scopes/?platform=node#local-scopes)
* Extracts user and error stack for Sentry, along with any extra metadata

# Installation

```
npm install sentry-error-transport
```

# Usage

### Configure Winston

```javascript
"use strict";
const winston = require("winston");
const { SentryTransport } = require("sentry-error-transport");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple()
  transports: [
    new winston.transports.Console(),
    new SentryTransport({ level: "error", sentry: { dns: "{SENTRY_URL}" } })
  ]
});
```

### Use logger

```javascript
// these are only logged in console
logger.info("Hello");
logger.warn("Something happened", { user: req.user })

// when logging errors, send an error object as the first param
// this gets sent to the Sentry transport
logger.error(new Error("Something went wrong"), {
  user: req.user,
  extraMeta: "data"
})

//  ============= or =============

try {
  ...something throws an error
}
catch(err) {
  logger.error(err, { user: req.user, stack: err.stack })
}
```

### Access Sentry

The Sentry object can be accessed at `SentryTransport.Sentry` property

```javascript
const { SentryTransport } = require("sentry-error-transport");

const { Sentry } = SentryTransport;
```
