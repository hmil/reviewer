(function() {
  this.API_URL = 'http://192.168.137.1:1337';

}).call(this);

(function() {
  this.Page = Backbone.View.extend({
    navigateTo: function() {
      this.render();
      return this.onNavigation((function(_this) {
        return function() {
          return $.UIGoToArticle('#' + _this.pageId);
        };
      })(this));
    },
    onNavigation: function(cb) {
      return cb();
    },
    render: function() {
      return this.$el.html(this.template(this.getRenderData()));
    },
    getRenderData: function() {
      return null;
    }
  });

  this.Page.extend = function(props) {
    var proto;
    proto = _.extend({
      el: '#' + props.pageId,
      template: _.template($('#t_' + props.pageId).html())
    }, props);
    return Backbone.View.extend.call(this, proto);
  };

}).call(this);

(function() {
  this.starbar = (function() {
    var el, sb;
    el = $('<div class="starbar"/>');
    sb = new StarBar(el, {
      interactive: false
    });
    return function(grade) {
      sb.setValue(grade);
      return '<div class="starbar">' + el.html() + '</div>';
    };
  })();

  $(function() {
    return $('[data-nav]').each(function(el) {
      var destination;
      destination = $(el).attr('data-nav');
      return $(el).on('singletap', function() {
        return app.navigateTo(destination);
      });
    });
  });

}).call(this);

(function() {
  this.items = new (Backbone.Collection.extend({
    url: API_URL + '/item'
  }));

}).call(this);

(function() {
  var grades;

  grades = ['forget it', 'meh', 'ok', 'good', 'awesome'];

  this.CreateItemView = Page.extend({
    pageId: 'createItem',
    onNavigation: function(cb) {
      var newItemGrade;
      newItemGrade = this.$('#newItemGrade');
      this.starbar = new StarBar(this.$('#newItemStar'), {
        onChange: function(value) {
          return newItemGrade.text(grades[value - 1]);
        }
      });
      this.$('#submitNewThing').on('click', (function(_this) {
        return function() {
          return _this.onSubmit();
        };
      })(this));
      return cb();
    },
    onSubmit: function() {
      var item;
      item = {
        thumb: '',
        title: this.$('[name=title]').val(),
        score: this.starbar.getValue(),
        reviews: [
          {
            title: this.$('[name=reviewTitle]').val(),
            text: this.$('[name=reviewText]').val(),
            score: this.starbar.getValue()
          }
        ]
      };
      return items.create(item, {
        success: function() {
          return app.navigateTo('itemsList');
        }
      });
    }
  });

}).call(this);

(function() {
  this.ItemsListView = Page.extend({
    pageId: 'itemsList',
    items: [],
    getRenderData: function() {
      return {
        items: this.items
      };
    },
    onNavigation: function(cb) {
      cb();
      return items.fetch({
        success: (function(_this) {
          return function(collection) {
            _this.items = collection;
            return _this.render();
          };
        })(this)
      });
    }
  });

}).call(this);

(function() {
  $((function(_this) {
    return function() {
      var app, createItemView, itemsList, itemsListView, t_itemsList;
      itemsList = $('#itemsList');
      t_itemsList = _.template($('#t_itemsList').html());
      createItemView = new CreateItemView();
      itemsListView = new ItemsListView();
      app = _this.app = {
        pages: {
          'createItem': createItemView,
          'itemsList': itemsListView
        },
        navigateTo: function(dest) {
          if (!_.has(this.pages, dest)) {
            throw new Error('No such page: ' + dest);
          }
          return this.pages[dest].navigateTo();
        }
      };
      return app.navigateTo('itemsList');
    };
  })(this));

}).call(this);
