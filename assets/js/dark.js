(function($) {
  "use strict"; 
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 310) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  navbarCollapse();
  $(window).scroll(navbarCollapse);
})(jQuery);