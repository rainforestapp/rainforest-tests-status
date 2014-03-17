// Rainforest run status

// Should:
// [x] Be inited with their key
// [ ] Return most recent run status
// [ ] Broken down by test + browser
// [ ] Be able to use with html...
// [ ] ...or without

var empty = require('is-empty')
  , Emitter = require('emitter')
  , map = require('map')
  , index = require('indexof')
  , reactive = require('reactive')
  , request = require('superagent')
  , unserialize = require('unserialize');

var api = "https://app.rainforestqa.com/api/1/";

module.exports = RainforestStatus;

function RainforestStatus (token, el) {
  if (empty(token)) throw "API Token required!";
  if (!(this instanceof RainforestStatus)) return new RainforestStatus(token, el);
  
  this.model = {};
  if (!empty(el)) {
    this.el = el;
    var template = '<div id="rainforest-status">{status}</div>';
    this.view = reactive(template, this.model);
  }
  this.getTests();
  return this;
}

/**
 * Mixin emitter
 */
Emitter(RainforestStatus.prototype);

RainforestStatus.prototype.getTests = function () {
  var self = this;
  this.fetchTests(function (data) {
    this.model = self.parseTestsData(data);
    self.emit("result", this.model)
  }, this.errorCallback); 
  return this;
}

RainforestStatus.prototype.parseTestsData = function (data) {
  var returnObj = { status: "", tests: data };
  var names = map(data, 'result');
  if (index(names, "failed") != -1) {
    returnObj.status = "failed";
  } else if (index(names, 'passed') == -1) {
    returnObj.status = "no_result";
  } else {
    returnObj.status = "passed";
  }
  
  return returnObj;
}

RainforestStatus.prototype.fetchTests = function (successCallback, errorCallback) {
  request
    .get(api + "tests?page_size=100")
    .set('X-API-Key', 'foobar')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('CLIENT_TOKEN', '08b8bc4f0cec845a37f9266918e83e98')
    .end(function(error, res){
      if (!empty(res)) {
        successCallback(unserialize(res.text));
      }
      if (!empty(error)) {
        errorCallback(error);
      }
  });
}

RainforestStatus.prototype.errorCallback = function (error) {
  console.log(error);
}

RainforestStatus.prototype.render = function () {
}

RainforestStatus.prototype.get = function () {
  return this.model;
}