var StarBar = (function() {

  function noop() {}

  var defaults = {
    onChange: noop,
    value: 0,
    interactive: true
  };

  function StarBar(el, opts) {
    opts = _.extend({}, defaults, opts);

    var fillings = this._fillings = new Array(5);
    var star;

    this._changeCb = opts.onChange;
    this.value = opts.value;

    el.addClass('starbar');
    if (opts.interactive) el.addClass('clickable');

    for (var i = 0; i < 5; ++i) {
      star = makeStar(this, i+1);
      el.append(star.$el);
      fillings[i] = star.filling;
    }
    this.setValue(this.value, {silent: true});
  }

  StarBar.prototype.setValue = function(value, opts) {
    var i;
    var fillings = this._fillings;
    var oldValue = this.value;
    this.value = value;
    opts = opts || {silent: false};

    for(i = 0 ; value >= 0.75 ; ++i, --value) {
      fillings[i].removeClass('fa-star-o fa-star-half-o').addClass('fa-star');
    }
    if (value > 0 && i < 5) {
      fillings[i].removeClass('fa-star fa-star-o').addClass('fa-star-half-o');
      ++i;
    }
    for ( ; i < 5 ; ++i) {
      fillings[i].removeClass('fa-star fa-star-half-o').addClass('fa-star-o');
    }

    if (!opts.silent)
      this._changeCb(this.value, oldValue);

    return this;
  };

  StarBar.prototype.getValue = function() {
    return this.value;
  };

  function makeStar(ctx, id) {

    var outer = $('<i />').addClass('fa fa-star-o fa-stack-2x');
    var filling = $('<i />').addClass('fa fa-star-o fa-stack-2x filling');

    var $el = $('<span />').addClass('fa-stack')
      .append(filling)
      .append(outer)
      .on('click', function() {
        ctx.setValue(id);
      });

    return {
      $el: $el,
      filling: filling
    };
  }

  return StarBar;
}())