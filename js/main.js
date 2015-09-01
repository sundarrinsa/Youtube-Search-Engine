//SEARCH HANDLER
$(function() {
    var searchField = $('#query');
    var icon = $('#search-btn');
    
    //focus event handle
    $(searchField).on('focus', function() {
        $(this).animate({
            width: '570px'
        }, 400);
        $(icon).animate({
            right: '3px'
        }, 400);
    });
    
    //blur event handle
    $(searchField).on('blur', function() {
        if(searchField.val() == '') {
            $(searchField).animate({
                width: '100%'
            },400, function() {});
            $(icon).animate({
                right: '205px'
            },400, function() {});
        }
    });
});