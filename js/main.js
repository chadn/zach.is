$(function() {

  var launchRoute = []
  // var launchRoute = ['reading /', 'articles /', 'about /', 'cities /']

  var selectItem = function(id, value) {
    var $el = $('a:contains(' + value + ')');
    console.log($el);
    $el.trigger('click');
    launchRoute.shift();
    // console.log(launchRoute);
  }

  var getCurrentRoute = function() {
    var currentRoute = []
    $('.ui-autocomplete-input').each(function(){
      currentRoute.push($(this).val().replace(' ',''));
    });
    currentRoute = currentRoute.join('');
    // console.log('Current route = ' + currentRoute);
    return currentRoute;
  }

  var setupAutocomplete = function(id, data) {

    var $el = $('#' + id);

    // initialize the autocomplete
    $el.autocomplete({
      minLength: 0,
      // custom matcher to only look at the beginning of the string
      source: function( request, response ) {
        var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
        response( $.grep( data, function( item ){
            return matcher.test( item );
          })
        );
      },
      create: function(e, ui) { 
        if (data.length < 1) {
          console.log('End of route!'); 
          var currentRoute = getCurrentRoute();
          history.pushState({}, '', '/' + currentRoute);
          $el.remove();
          $('.ui-autocomplete-input').blur();
          $('#mainContent').attr('src', 'http://wired.heineman.info');
          $('iframe').load(function() {
            console.log('iframe loaded!');
            $('#mainContent').css('opacity', 1);
          });
        } else {
          //$el.attr('placeholder', data[0]);          
        }
      },
      focus: function(e, ui) {
        // return false; // this will prevent the placeholder from being populated with the focused item
      },
      select: function(e, ui) {
        // console.log('Selected! (autocomplete)');
        // set the input width relative to the selected content
        $el.css('width', $('#hiddenInput').html(ui.item.value).width());
        this.value = ui.item.value;
        // create another input and set up
        var newId = id + 1;
        $('<input>').attr('id', newId).appendTo('.ui-widget');
        var currentRoute = getCurrentRoute();
        var newData = Routes.getChildrenOfNodeByName(currentRoute);
        var newDataArray = _.map(newData, function(item) { return item.label + ' /'; });
        console.log(launchRoute.length);
        setupAutocomplete(newId, newDataArray);
        if (launchRoute.length > 0) {
          selectItem(newId, launchRoute[newId - 1]);
        }
      }
    });

    // automatically open the autocomplete
    $el.autocomplete('search', '');
    $el.focus();

  }

  $('form').on('focus', '.ui-autocomplete-input', function(){

    console.log('Focused! (element)');

    $('#mainContent').css('opacity', 0);

    var focusedId = parseInt($(this).attr('id'));

    $('.ui-autocomplete-input').each(function(){
      var thisId = parseInt($(this).attr('id'));
      if (thisId > focusedId) {
        $(this).remove();
      }
    });

    $(this).val('')
    $(this).attr('style', '')    
    $(this).autocomplete('search', '');

    var currentRoute = getCurrentRoute();
    history.pushState({}, '', '/' + currentRoute);

  });

  // setup the intial autocomplete on page load
  var firstLevel = Routes.getFirstLevelData();
  var firstLevelArray = _.map(firstLevel, function(item) { return item.label + ' /'; });
  setupAutocomplete(1, firstLevelArray);
  if (launchRoute.length > 0) {
    selectItem(1, launchRoute[0]);
  }
});