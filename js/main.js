// redefine the autocomplete filter to only match from the beginning of a word
$.ui.autocomplete.filter = function (array, term) {
    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
    return $.grep(array, function (value) {
        return matcher.test(value.label || value.value || value);
    });
};

$(function() {

  var setupAutocomplete = function(id) {

    var $el = $('#' + id); 

    // initialize the autocomplete
    $el.autocomplete({
      minLength: 0,
      source: alpha,
      change: function(e, ui) { console.log('Changed! (autocomplete)') },
      close: function(e, ui) { console.log('Closed! (autocomplete)') },
      create: function(e, ui) { 
        console.log('Created! (autocomplete)');
        $el.attr('placeholder', alpha[0]);
      },
      focus: function(e, ui) {
        console.log('Focused! (autocomplete)');
        // return false; // this will prevent the placeholder from being populated with the focused item
      },
      open: function(e, ui ) { console.log('Opened! (autocomplete)') },
      response: function(e, ui) { console.log('Responsed! (autocomplete)') },
      search: function(e, ui) { console.log('Searched! (autocomplete)') },
      select: function(e, ui) {
        console.log('Selected! (autocomplete)');
        // set the input width relative to the selected content
        $el.css('width', $('#hiddenInput').html(ui.item.value).width());
        // create another input and set up
        var newId = id + 1;
        $('<input>').attr('id', newId).appendTo('.ui-widget');
        setupAutocomplete(newId);
      }
    });

    // automatically open the autocomplete
    $el.autocomplete('search', '');

  }

  setupAutocomplete(1);

  $('.ui-autocomplete-input').on('focus', function(){
    console.log('Focused! (element)');
    $(this).val('');
    $(this).autocomplete('search', '');
  })
});