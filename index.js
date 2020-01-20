"use strict";
const Sentry = require("@sentry/node");
const Transport = require("winston-transport");

class SentryTransport extends Transport {
  constructor(opts) {
    super(opts);
    Sentry.init(opts ? opts.sentry : {});
    this.Sentry = Sentry;
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    const { message, user, stack, ...meta } = info;

    Sentry.withScope(scope => {
      if (user) scope.setUser(user);
      if (meta) scope.setExtras(meta);
      Sentry.captureException(message);
    });

    callback();
  }
}

module.exports = SentryTransport;
