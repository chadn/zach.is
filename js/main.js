var linkPosition = 0;

// Ugly jQueryUI monkey patch
$.ui.autocomplete.prototype._move = function(direction, event) {
  var upArrow = /^previous/.test(direction),
      downArrow = /^next/.test(direction),
      noMenuItem = _.isUndefined(this.menu.active),
      theFirstItem = this.menu.isFirstItem(),
      theLastItem = this.menu.isLastItem(),
      index, newTop;

  if ((upArrow && !noMenuItem) && ((!theFirstItem && upArrow) && upArrow)) {
    this.menu[ 'previous' ]( event );
    index = this.menu.active.index();
    newTop =  - 13 - index * 32;
    $('.ui-autocomplete').css('top', newTop + 'px');
  } else if ((!theLastItem && downArrow) && downArrow) {
    this.menu[ 'next' ]( event );
    index = this.menu.active.index();
    newTop = - 13 - index * 32;
    $('.ui-autocomplete').css('top', newTop + 'px');
  } else {
    console.log('Don\'t move!'); // Or I'll shoot!
  }
};

$(function() {

  var pressDown = jQuery.Event("keypress");
  pressDown.ctrlKey = false;
  pressDown.which = $.ui.keyCode.DOWN;
  pressDown.keyCode = $.ui.keyCode.DOWN;

  var pressEnter = jQuery.Event("keypress");
  pressEnter.ctrlKey = false;
  pressEnter.which = $.ui.keyCode.ENTER;
  pressEnter.keyCode = $.ui.keyCode.ENTER;

  var pressTab = jQuery.Event("keypress");
  pressTab.ctrlKey = false;
  pressTab.which = $.ui.keyCode.TAB;
  pressTab.keyCode = $.ui.keyCode.TAB;

  var selectItem = function(id, value) {
    var $el = $('a:contains(' + value + ')');
    console.log($('a:contains(' + value + ')'));
    $el.trigger('click');
    launchRoute.shift();
    // console.log(launchRoute);
  }

  var makeLaunchRoute = function(route) {
    var launchRoute = route.split('/');
    launchRoute = _.initial(launchRoute);
    launchRoute = _.map(launchRoute, function(item) { return item + ' /'} );
    return launchRoute;
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

    $el.bind( "keydown", function( event ) {
      if ($(this).data('ui-autocomplete').term == '') {
        console.log('Whited out');
        $('.ui-menu-item').css('background','#fff');        
      }
      if ( event.keyCode === $.ui.keyCode.TAB &&
          $( this ).data( "ui-autocomplete" ).menu.active ) {
        $(this).trigger(pressEnter);
        $(this).trigger(pressEnter);
        console.log('Tabbed active!');
        event.preventDefault();
      }
      if ( event.keyCode === $.ui.keyCode.TAB && 
          !$( this ).data( "ui-autocomplete" ).menu.active) {
        if ($(this).data('ui-autocomplete').term != '') {
          event.preventDefault();
          var $el = $(this).data('ui-autocomplete').menu.element.children().first().find('a');
          // console.log(theOne);
          // var $el = $('a:contains(' + value + ')');
          // console.log($('a:contains(' + value + ')'));
          $el.trigger('click');        
        } else {
          $(this).trigger(pressDown);
          $(this).trigger(pressEnter);
          $(this).trigger(pressEnter);
          console.log('Tabbed!');
          event.preventDefault();          
        }
      }
    });

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
      position: { 
        my: "left top",
        at: "left top",
        collision: "none" 
      },
      open: function () {
        $('.ui-menu-item').css('background','#none');

        var auto = $(this).data('ui-autocomplete');
        $(this).data('ui-autocomplete').menu.element.children().first().find('a')
        .each(function() {
            var self = $(this);
            self.html(self.text().replace(new RegExp("(^" + auto.term + ")", "gi"), '<span>$1</span>'));
        });

        // console.log($(this).data('ui-autocomplete').menu.element.children().first());
        // console.log($(this).data('ui-autocomplete').term);
      },
      create: function(e, ui) { 
        if (data.length < 1) {
          console.log('End of route!'); 
          var currentRoute = getCurrentRoute();
          history.pushState({}, '', '/' + currentRoute);
          $el.remove();
          $('.ui-autocomplete-input').blur();
          console.log(currentRoute);
          console.log(makeLaunchRoute(currentRoute));
          if (_.contains(Routes.usableRoutes, currentRoute)) {
            // console.log('Route exists!');
            $('#mainContent').attr('src', '//zach.is/' + currentRoute);
          } else {
            $('#mainContent').attr('src', '//zach.is/not/finding/this/page');
          }
          $('#progress').css('opacity', 1);
          $('iframe').load(function() {
            console.log('iframe loaded!');
            $('#progress').css('opacity', 0);
            $('#mainContent').css('opacity', 1);
          });
        } else {
          //$el.attr('placeholder', data[0]);          
        }

        setTimeout(function(){
          if (launchRoute.length > 0) {
            selectItem(1, launchRoute[0]);
          }
        }, 100);
      },
      focus: function(e, ui) {
        return false; // this will prevent the placeholder from being populated with the focused item
      },
      select: function(e, ui) {
        // console.log('Selected! (autocomplete)');
        // set the input width relative to the selected content
        $el.css('width', $('#hiddenInput').html(ui.item.value).width());
        //$el.css('position', 'relative');
        this.value = ui.item.value;
        // create another input and set up
        var newId = id + 1;
        $('<input>').attr('id', newId).insertAfter($('.ui-autocomplete-input').last());
        var currentRoute = getCurrentRoute();
        var newData = Routes.getChildrenOfNodeByName(currentRoute);
        var newDataArray = _.map(newData, function(item) { return item.label + ' /'; });
        console.log(launchRoute.length);
        setupAutocomplete(newId, newDataArray);
        setTimeout(function(){
          if (launchRoute.length > 0) {
            selectItem(newId, launchRoute[newId - 1]);
          }
        }, 100);
      },
      change: function() {
        // console.log('Changed');
      }
    });

    // automatically open the autocomplete
    setTimeout(function(){
      $el.autocomplete('search', '');
      $el.focus();      
    }, 50);

  }

  $('form').on('focus', '.ui-autocomplete-input', function(){

    // console.log('Focused! (element)');

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

  $('#next').on('click', function(e) {
    e.preventDefault;
    console.log('Next!');
    launchRoute = makeLaunchRoute(Routes.usableRoutes[linkPosition]);
    linkPosition = linkPosition + 1;
    $('#prev').removeClass('disabled');
    $('#1').focus();
    selectItem(1, launchRoute[0]);
    console.log('Link position = ' + linkPosition);
  });

  $('#prev').on('click', function(e) {
    e.preventDefault;
    console.log('Next!');
    if (linkPosition > 1) {
      linkPosition = linkPosition - 1;
      launchRoute = makeLaunchRoute(Routes.usableRoutes[linkPosition]);
    }
    if (linkPosition == 0) {
      $('#prev').addClass('disabled')
    }
    $('#1').focus();
    selectItem(1, launchRoute[0]);
    console.log('Link position = ' + linkPosition);
  });

  // setup the intial autocomplete on page load
  var firstLevel = Routes.getFirstLevelData();
  var firstLevelArray = _.map(firstLevel, function(item) { return item.label + ' /'; });

  var launchRoute = []
  //var launchRoute = ['on /', 'instagram /']
  setupAutocomplete(1, firstLevelArray);
  
});