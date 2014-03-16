// Rainforest run status

// Should:
// [ ] Be inited with their key
// [ ] Return most recent run status
// [ ] Broken down by test + browser
// [ ] Be able to use with html...
// [ ] ...or without

var bind = require('bind')
  , reactive = require('reactive');

module.exports = RainforestStatus;

function RainforestStatus (token, el) {
  if (!(this instanceof RainforestStatus)) return new RainforestStatus();

  this.el = el || document.body;
  var template = '<div id="rainforest-status">{status}</div>';
  this.model = {status: "passed"};
  this.view = reactive(template, this.model);
  return this;
}