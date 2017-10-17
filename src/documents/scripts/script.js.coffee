pullDown = ->
    $('.pull-down').each( ->
        $(this).css("margin-top", 0)
        console.log "pulling down"
        console.log "p height", $(this).parent().height()
        console.log "height", $(this).height()
        if $(window).width() > 767
            $(this).css('margin-top', $(this).parent().height()-$(this).height())
    );

$ ->
    # $('.navigation').affix({
    #     offset: $('.navigation').position()
    # })

    # $('.navigation-wrapper').height($(".navigation").height());

    # $('body').scrollspy()

    # $('.navigation').css(
    #         width: $('.container').width()
    #     )

    $(window).resize ->
        # $('.navigation.affix').css(
        #     width: $('.container').width()
        # )
        pullDown()

    $(".steve-img").imagesLoaded pullDown

