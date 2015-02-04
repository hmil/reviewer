grades = ['forget it', 'meh', 'ok', 'good', 'awesome']

@CreateItemView = Page.extend
  pageId: 'createItem'

  onNavigation: (cb) ->
    newItemGrade = this.$('#newItemGrade')

    @starbar = new StarBar(@$('#newItemStar'),
      onChange: (value) ->
        newItemGrade.text(grades[value-1])
    )

    @$('#submitNewThing').on('click', =>
      @onSubmit()
    )

    cb()

  onSubmit: ->
    # Create an item element, a review element, push review's JSON in item attributes, save the item
    item =
      thumb: ''
      title: this.$('[name=title]').val()
      score: this.starbar.getValue()
      reviews: [
        title: this.$('[name=reviewTitle]').val()
        text: this.$('[name=reviewText]').val()
        score: this.starbar.getValue()
      ]

    items.create(item,
      success: ->
        app.navigateTo('itemsList')
    )