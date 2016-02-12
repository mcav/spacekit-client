'use strict';

const http = require('http');
const urlParse = require('url').parse;

function ping(url) {
  return new Promise((resolve, reject) => {
    let options = urlParse(url);
    options.method = 'GET';
    let req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        resolve();
      } else {
        reject(res.statusCode);
      }
    });

    req.on('error', (e) => {
      reject(e.message);
    });

    req.end();
  });
}

function heartbeat(url, interval) {
  return setInterval(() => {
    ping(url).then(() => {
      console.log(new Date().toISOString() + ' ' + '\x1b[32m\x1b[1m\u2713\x1b[0m OK');
    }, (err) => {
      console.log('\x1b[32m\x1b[1m\u2718\x1b[0m ERROR:', err);
    });
  }, interval || 30000);
}

heartbeat('http://mcav.com', 1000);

module.exports = {

};
