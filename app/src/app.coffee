$ =>
  itemsList = $('#itemsList')
  t_itemsList = _.template($('#t_itemsList').html())

  createItemView = new CreateItemView()
  itemsListView = new ItemsListView()


  app = @app = {
    pages:
      'createItem': createItemView,
      'itemsList': itemsListView

    navigateTo: (dest) ->
      throw new Error('No such page: '+dest) if not _.has(@pages, dest)
      @pages[dest].navigateTo()
  }

  app.navigateTo('itemsList')
