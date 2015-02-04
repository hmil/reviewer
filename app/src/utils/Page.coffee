@Page = Backbone.View.extend
  navigateTo: ->
    @render()
    @onNavigation =>
      $.UIGoToArticle('#'+@pageId);

  onNavigation: (cb) -> cb();

  render: ->
    @$el.html(@template(@getRenderData()));

  getRenderData: -> null

@Page.extend = (props) ->
  proto = _.extend(
    el: '#'+props.pageId,
    template: _.template($('#t_'+props.pageId).html())
  , props)
  return Backbone.View.extend.call(this, proto)