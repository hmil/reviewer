
@ItemsListView = Page.extend
  pageId: 'itemsList'

  items: []

  getRenderData: -> {items: @items}

  onNavigation: (cb) ->
    cb()
    items.fetch
      success: (collection) =>
        @items = collection
        @render()