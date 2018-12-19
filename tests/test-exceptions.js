const assert = require('assert')

const XMLHttpRequest = require('../lib/XMLHttpRequest').XMLHttpRequest
const xhr = new XMLHttpRequest()

// Test request methods that aren't allowed
try {
  xhr.open('TRACK', 'http://localhost:8000/')
  assert.fail('ERROR: TRACK should have thrown exception')
} catch (e) {}
try {
  xhr.open('TRACE', 'http://localhost:8000/')
  assert.fail('ERROR: TRACE should have thrown exception')
} catch (e) {}
try {
  xhr.open('CONNECT', 'http://localhost:8000/')
  assert.fail('ERROR: CONNECT should have thrown exception')
} catch (e) {}
// Test valid request method
try {
  xhr.open('GET', 'http://localhost:8000/')
} catch (e) {
  assert.fail('ERROR: Invalid exception for GET - Error: ' + e.message)
}

// Test forbidden headers
const forbiddenRequestHeaders = [
  'accept-charset',
  'accept-encoding',
  'access-control-request-headers',
  'access-control-request-method',
  'connection',
  'content-length',
  'content-transfer-encoding',
  'cookie',
  'cookie2',
  'date',
  'expect',
  'host',
  'keep-alive',
  'origin',
  'referer',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'user-agent',
  'via'
]

for (let i in forbiddenRequestHeaders) {
  try {
    const headerKey = forbiddenRequestHeaders[i]
    xhr.setRequestHeader(headerKey, 'Test')
    // should ignore forbidden request headers and log a warning
    assert.strictEqual(xhr.headers[headerKey], undefined)
  } catch (e) {
  }
}

// Try valid header
xhr.setRequestHeader('X-Foobar', 'Test')

console.log('Done')
