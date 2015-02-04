
# Creates a "starbar" template function to render a static starbar
@starbar = do ->
  el = $('<div class="starbar"/>')
  sb = new StarBar(el, interactive: false )

  return (grade) ->
    sb.setValue(grade);
    return '<div class="starbar">' + el.html() + '</div>'

# navigation
$ ->
  $('[data-nav]').each (el) ->
    destination = $(el).attr('data-nav');
    $(el).on 'singletap', ->
      app.navigateTo(destination)