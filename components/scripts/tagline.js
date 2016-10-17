(function() {
  var $, fill;

  $ = require('jquery');

  (fill = function(item) {
    return $('.tagline').append("" + item);
  })('Super Creative minds in Art');

  fill;

}).call(this);
