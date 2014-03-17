// Rainforest run status

// Should:
// [x] Be inited with their key
// [ ] Return most recent run status
// [ ] Broken down by test + browser
// [ ] Be able to use with html...
// [ ] ...or without

var empty = require('is-empty')
  , reactive = require('reactive')
  , request = require('superagent')
  , unserialize = require('unserialize');

var api = "https://app.rainforestqa.com/api/1/";

module.exports = RainforestStatus;

function RainforestStatus (token, el) {
  if (empty(token)) throw "API Token required!";
  if (!(this instanceof RainforestStatus)) return new RainforestStatus(token, el);
  
  this.model = {status: "passed"};
  
  if (!empty(el)) {
    this.el = el;
    var template = '<div id="rainforest-status">{status}</div>';
    this.view = reactive(template, this.model);
  }
  this.getTests();
  return this;
}

RainforestStatus.prototype.getTests = function () {
  this.fetchTests();
  return this;
}

RainforestStatus.prototype.fetchTests = function () {
  request
    .get(api + "tests?page_size=100")
    .set('X-API-Key', 'foobar')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('CLIENT_TOKEN', '08b8bc4f0cec845a37f9266918e83e98')
    .end(function(error, res){
      if (!empty(res)) {
        console.log(unserialize(res.text));
      }
      console.log(error,res);
  });
}

RainforestStatus.prototype.render = function () {
}

RainforestStatus.prototype.get = function () {
  return this.model.status;
}