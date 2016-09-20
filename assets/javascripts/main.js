$(document).ready(function() {
    // Header navbar
    $("#menu-toggle").click(function(){
        var toggleId = $(this).attr("data-target");
        $("#"+toggleId).slideToggle('slow', function() {
            // clear the inline style for display
            if( $("#"+toggleId).attr('style') === 'display: none;' ) {
                $("#"+toggleId).attr('style',"");
            }
        });
        $(this).toggleClass("mastheader__nav-button--toggle");
        $(this).find(".mastheader__nav-button__icon-bar")
          .toggleClass("mastheader__nav-button__icon-bar--toggle");
    });
});