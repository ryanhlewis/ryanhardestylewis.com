(function() {
  var pullDown;

  pullDown = function() {
    return $('.pull-down').each(function() {
      $(this).css("margin-top", 0);
      console.log("pulling down");
      console.log("p height", $(this).parent().height());
      console.log("height", $(this).height());
      if ($(window).width() > 767) {
        return $(this).css('margin-top', $(this).parent().height() - $(this).height());
      }
    });
  };

  $(function() {
    $(window).resize(function() {
      return pullDown();
    });
    return $(".headshot-img").imagesLoaded(pullDown);
  });

}).call(this);
