
# CreateItemView.coffee
#
# Page allowing the user to create a review on a non existing item

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

    # bound version of setItemThumb callback
    setItemThumb = (src) => @setItemThumb(src)

    uploadThumbBtn = @$('#upload-thumb')
    uploadThumbBtn.on('change', ->
      return unless (@files.length > 0)

      fd = new FormData()

      fd.append('thumb', @files[0])

      request = new XMLHttpRequest()
      request.onreadystatechange = (aEvt) ->
        if (request.readyState == 4)
          if (request.status == 200)
            setItemThumb(request.responseText)
          else
            alert(request.responseText)

      request.open("POST", "#{API_URL}/thumb/upload")
      request.send(fd)
    )

    cb()

  setItemThumb: (src) ->
    @$('#item-thumb').attr('src', src)

  onSubmit: ->
    # Create an item element, a review element, push review's JSON in item attributes, save the item
    item =
      thumb: @$('#item-thumb').attr('src')
      title: @$('[name=title]').val()
      score: @starbar.getValue()
      reviews: [
        title: @$('[name=reviewTitle]').val()
        text: @$('[name=reviewText]').val()
        score: @starbar.getValue()
      ]

    items.create(item,
      success: ->
        app.navigateTo('itemsList')
    )