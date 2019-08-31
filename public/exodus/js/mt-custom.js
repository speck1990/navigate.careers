/*
 Project name:       MODELTHEME
 Project author:     ModelTheme
 File name:          Custom JS
*/

(function ($) {
    'use strict';

    if (jQuery('#calendar').length) {
        jQuery('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: '2017-08-12',
            defaultView: 'month',
            editable: true,
            events: [
                {
                    title: 'All Day Event',
                    start: '2017-08-01'
                },
                {
                    title: 'Long Event',
                    start: '2017-08-07',
                    end: '2017-08-10'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2017-08-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2017-08-16T16:00:00'
                },
                {
                    title: 'Meeting',
                    start: '2017-08-12T10:30:00',
                    end: '2017-08-12T12:30:00'
                },
                {
                    title: 'Lunch',
                    start: '2017-08-12T12:00:00'
                },
                {
                    title: 'Birthday Party',
                    start: '2017-08-13T07:00:00'
                },
                {
                    title: 'Click for Google',
                    url: 'http://google.com/',
                    start: '2017-08-28'
                }
            ]
        });
    }
    new WOW().init();
    // jQuery preloader
    jQuery(window).load(function(){
        jQuery( '.exodoswp_preloader_holder' ).fadeOut( 1000, function() {
            jQuery( this ).fadeOut();
        });
    });
    jQuery('a.print-portfolio').on( "click", function(event) {
        event.preventDefault();
    });



    if (jQuery('[data-toggle="tooltip"]').length){
        jQuery('[data-toggle="tooltip"]').tooltip();
    }



    if (jQuery('.author-content').length){
        jQuery(".author-content").stickit({
            screenMinWidth: 768,
            top: 100,
        });
    }
    if (jQuery('.right-side-sharer').length){
        jQuery(".right-side-sharer").stickit({
            screenMinWidth: 768,
            top: 90,
        });
    }
    // FIXED SEARCH FORM
    jQuery('.mt-search-icon').on( "click", function() {
        jQuery('.fixed-search-overlay').toggleClass('visible');
    });
    jQuery('.fixed-search-overlay .icon-close').on( "click", function() {
        jQuery('.fixed-search-overlay').removeClass('visible');
    });
    jQuery(document).keyup(function(e) {
         if (e.keyCode == 27) { // escape key maps to keycode `27`
            jQuery('.fixed-search-overlay').removeClass('visible');
            jQuery('.fixed-sidebar-menu').removeClass('open');
            jQuery('.fixed-sidebar-menu-overlay').removeClass('visible');
        }
    });
    jQuery('#mt-nav-burger').on( "click", function() {
        // jQuery(this).toggleClass('open');
        jQuery('.fixed-sidebar-menu').toggleClass('open');
        jQuery(this).parent().find('#navbar').toggleClass('hidden');
        jQuery('.fixed-sidebar-menu-overlay').addClass('visible');
    });

    /* Click on Overlay - Hide Overline / Slide Back the Sidebar header */
    jQuery('.fixed-sidebar-menu-overlay').on( "click", function() {
        jQuery('.fixed-sidebar-menu').removeClass('open');
        jQuery(this).removeClass('visible');
    });    
    /* Click on Overlay - Hide Overline / Slide Back the Sidebar header */
    jQuery('.fixed-sidebar-menu .icon-close').on( "click", function() {
        jQuery('.fixed-sidebar-menu').removeClass('open');
        jQuery('.fixed-sidebar-menu-overlay').removeClass('visible');
    });
    // 9th MENU Toggle - Hamburger
    var toggles = document.querySelectorAll(".c-hamburger");
    for (var i = toggles.length - 1; i >= 0; i--) {
      var toggle = toggles[i];
      toggleHandler(toggle);
    };
    function toggleHandler(toggle) {
      toggle.addEventListener( "click", function(e) {
        e.preventDefault();
        (this.classList.contains("is-btn-active") === true) ? this.classList.remove("is-btn-active") : this.classList.add("is-btn-active");
      });
    }  
  
    $(document).ready(function() {
        if (jQuery(window).width() < 760) {

            jQuery( ".menu-item-has-children" ).on( "click", function() {
                jQuery(this).find('.sub-menu').first('.sub-menu').toggle('shown');
                jQuery('.sub-menu.shown').removeClass('.shown');
            });

        }
        //Begin: Validate and Submit contact form via Ajax
        if (jQuery('#contact_form').length){
        jQuery("#contact_form").validate({
            //Ajax validation rules
            validClass:'validated',
            rules: {
                user_name: {
                    required: true,
                    minlength: 2
                },
                user_message: {
                    required: true,
                    minlength: 10
                },
                user_subject: {
                    required: true,
                    minlength: 5
                },
                user_email: {
                    required: true,
                    email: true
                }
            },
            //Ajax validation messages
            messages: {
                user_name: {
                    required: "Please enter a name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                user_message: {
                    required: "Please enter a message",
                    minlength: "Your message must consist of at least 10 characters"
                },
                user_subject: {
                    required: "Please provide a subject",
                    minlength: "Your subject must be at least 5 characters long"
                },
                user_email: "Please enter a valid email address"
            },
            //Submit via Ajax Form
            submitHandler: function() {
                jQuery('#contact_form').ajaxSubmit();
                jQuery('.success_message').fadeIn('slow');
            }
        });
        //End: Validate and Submit contact form via Ajax
    }
    if (jQuery('#contact01_form').length){
        jQuery("#contact01_form").validate({
            //Ajax validation rules
            validClass:'validated',
            rules: {
                user_name: {
                    required: true,
                    minlength: 2
                },
                user_message: {
                    required: true,
                    minlength: 10
                },
                user_subject: {
                    required: true,
                    minlength: 5
                },
                user_email: {
                    required: true,
                    email: true
                }
            },
            //Ajax validation messages
            messages: {
                user_name: {
                    required: "Please enter a name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                user_message: {
                    required: "Please enter a message",
                    minlength: "Your message must consist of at least 10 characters"
                },
                user_subject: {
                    required: "Please provide a subject",
                    minlength: "Your subject must be at least 5 characters long"
                },
                user_email: "Please enter a valid email address"
            },
            //Submit via Ajax Form
            submitHandler: function() {
                jQuery('#contact01_form').ajaxSubmit();
                jQuery("#contact01_form")[0].reset();
                jQuery('.success_message').fadeIn('slow');
            }
        });
        //End: Validate and Submit contact form via Ajax
        //Begin: Validate and Submit contact form 2 via Ajax
    }
    if (jQuery('#contact_form2').length){
        jQuery("#contact_form2").validate({
            //Ajax validation rules
            validClass:'validated',
            rules: {
                user_name: {
                    required: true,
                    minlength: 2
                },
                user_message: {
                    required: true,
                    minlength: 10
                },
                user_subject: {
                    required: true,
                    minlength: 5
                },
                user_email: {
                    required: true,
                    email: true
                },
                user_phone: {
                    required: true,
                    minlength: 6,
                    number: true
                },
                user_city: {
                    required: true
                }
            },
            //Ajax validation messages
            messages: {
                user_name: {
                    required: "Please enter a name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                user_message: {
                    required: "Please enter a message",
                    minlength: "Your message must consist of at least 10 characters"
                },
                user_subject: {
                    required: "Please provide a subject",
                    minlength: "Your subject must be at least 5 characters long"
                },
                user_phone: {
                    required: "Please provide a phone number",
                    minlength: "Your phone must be at least 6 numbers long",
                    number: "You must enter a number"
                },
                user_city: {
                    required: "Please provide a city"
                },
                user_email: {
                    required: "Please provide a email",
                    email: "Please enter a valid email address"
                }
            },
            //Submit via Ajax Form
            submitHandler: function() {
                jQuery('#contact_form2').ajaxSubmit();
                jQuery('.success_message').fadeIn('slow');
            }
        });
        //End: Validate and Submit contact form via Ajax
        //Begin: Contact form overlay
    }
        jQuery(document).ready(function() {
            jQuery( ".see_map_button" ).on( "click", function() {
                jQuery( "#map_wrapper_overlay" ).fadeOut('slow');
            });
        });
        //End: Contact form overlay  
        //Begin: Sticky Head
        jQuery(function(){
           if (jQuery('body').hasClass('is_nav_sticky')) {
                // console.log('Enabled - is_nav_sticky');
                jQuery(window).resize(function() {
                    if (jQuery(window).width() <= 768) {
                    // console.log('smaller-than-767');
                    } else {
                        // console.log('bigger-than-767');
                        // console.log('Start STICKY');
                        jQuery("#modeltheme-main-head").sticky({
                            topSpacing:0
                        });
                    }
                });
                if (jQuery(window).width() >= 768) {
                    // console.log('=>768 Start STICKY');
                    jQuery("#modeltheme-main-head").sticky({
                        topSpacing:0
                    });
                }
           }
        });
        jQuery('#contact01_form input[name="user_name"]').on('change keyup paste', function() {
            if(jQuery(this).hasClass("validated")){
                jQuery(".cf-progress").addClass("name-validated");
            }else if(!jQuery(this).hasClass("validated")){
                jQuery(".cf-progress").removeClass("name-validated");
            }
        });
        jQuery('#contact01_form input[name="user_email"]').on('change keyup paste', function() {
            if(jQuery(this).hasClass("validated")){
                jQuery(".cf-progress").addClass("email-validated");
            }else if(!jQuery(this).hasClass("validated")){
                jQuery(".cf-progress").removeClass("email-validated");
            }
        });
        // $("#textbox").on('change keyup paste', function() {
        jQuery('#contact01_form input[name="user_subject"]').on('change keyup paste', function() {
            if(jQuery(this).hasClass("validated")){
                jQuery(".cf-progress").addClass("subject-validated");
            }else if(!jQuery(this).hasClass("validated")){
                jQuery(".cf-progress").removeClass("subject-validated");
            }
        });
        jQuery('#contact01_form input[name="user_message"]').on('change keyup paste', function() {
            if(jQuery(this).hasClass("validated")){
                jQuery(".cf-progress").addClass("message-validated");
            }else if(!jQuery(this).hasClass("validated")){
                jQuery(".cf-progress").removeClass("message-validated");
            }
        });
        //Begin: Parallax
        if (jQuery('.parralax-background').length){
            jQuery('.parralax-background').parallax("50%", 0.5);
        }
        //End: Parallax
        /*Begin: Testimonials slider*/
    if (jQuery('.quotes-slider').length){
        jQuery(".quotes-slider").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            autoPlay        : true,
            rewindNav       : true,
            slideSpeed      : 700,
            paginationSpeed : 700,
            singleItem      : true
        });
    }
    if (jQuery('.quotes-container').length){
        jQuery(".quotes-container").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            singleItem      : true
        });
        /*Begin: Pastors slider*/
    }
    if (jQuery('.pastor_slider').length){
        jQuery(".pastor_slider").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            itemsCustom : [
                [0,     1],
                [450,   1],
                [600,   2],
                [700,   2],
                [1000,  4],
                [1200,  4],
                [1400,  4],
                [1600,  4]
            ]
        });
        /*End: Pastors slider*/
    }
        /*Begin: Clients slider*/
    if (jQuery('.categories_shortcode').length){
        jQuery(".categories_shortcode").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            navigationText  : ["<i class='fa fa-arrow-left'></i>","<i class='fa fa-arrow-right'></i>"],
            itemsCustom : [
                [0,     1],
                [450,   2],
                [600,   2],
                [700,   5],
                [1000,  5],
                [1200,  5],
                [1400,  5],
                [1600,  5]
            ]
        })
    }
        /*Begin: Products by category*/
    if (jQuery('.clients-container').length){
        jQuery(".clients-container").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            autoPlay        : true,
            slideSpeed      : 700,
            paginationSpeed : 700,
            itemsCustom : [
                [0,     1],
                [450,   2],
                [600,   2],
                [700,   3],
                [1000,  5],
                [1200,  5],
                [1400,  5],
                [1600,  5]
            ]
        });
    }
        /*Begin: Portfolio single slider*/
    if (jQuery('.portfolio_thumbnails_slider').length){
        jQuery(".portfolio_thumbnails_slider").owlCarousel({
            navigation      : true, // Show next and prev buttons
            pagination      : true,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            navigationText  : ["",""],
            singleItem      : true
        });
        /*End: Portfolio single slider*/
    }
        /*Begin: Testimonials slider*/
    if (jQuery('.post_thumbnails_slider').length){
        jQuery(".post_thumbnails_slider").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            singleItem      : true
        });
    }
        var owl = jQuery(".post_thumbnails_slider");
        jQuery( ".next" ).on( "click", function() {
            owl.trigger('owl.next');
        })
        jQuery( ".prev" ).on( "click", function() {
            owl.trigger('owl.prev');
        })
        /*End: Testimonials slider*/
        
        /*Begin: Testimonials slider*/
    if (jQuery('.testimonials_slider').length){
        jQuery(".testimonials_slider").owlCarousel({
            navigation      : true, // Show next and prev buttons
            pagination      : true,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            singleItem      : true
        });
    }
        /*End: Testimonials slider*/
        /* Animate */
    if (jQuery('.animateIn').length){
        jQuery('.animateIn').animateIn();
    }
        // browser window scroll (in pixels) after which the "back to top" link is shown
        var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = jQuery('.back-to-top');
        //hide or show the "back to top" link
        jQuery(window).scroll(function(){
            ( jQuery(this).scrollTop() > offset ) ? $back_to_top.addClass('modeltheme-is-visible') : $back_to_top.removeClass('modeltheme-is-visible modeltheme-fade-out');
            if( jQuery(this).scrollTop() > offset_opacity ) { 
                $back_to_top.addClass('modeltheme-fade-out');
            }
        });
        //smooth scroll to top
        $back_to_top.on('click', function(event){
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0 ,
                }, scroll_top_duration
            );
        });
        //Begin: Skills
    if (jQuery('.statistics').length){
        jQuery('.statistics').appear(function() {
            jQuery('.percentage').each(function(){
                var dataperc = jQuery(this).attr('data-perc');
                jQuery(this).find('.skill-count').delay(6000).countTo({
                    from: 0,
                    to: dataperc,
                    speed: 5000,
                    refreshInterval: 100
                });
            });
        }); 
        //End: Skills 
    }
})
} (jQuery) )
//revolution slider buttons delete effect
jQuery('.rev_slider_wrapper .rev_slider .modeltheme_button').removeClass('animateIn').removeClass('animated');
// contact form effect
(function() {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
          return this.replace(rtrim, '');
        };
      })();
    }
    [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
      // in case the input is already filled..
      if( inputEl.value.trim() !== '' ) {
        classie.add( inputEl.parentNode, 'input--filled' );
      }
      // events:
      inputEl.addEventListener( 'focus', onInputFocus );
      inputEl.addEventListener( 'blur', onInputBlur );
    } );
    function onInputFocus( ev ) {
      classie.add( ev.target.parentNode, 'input--filled' );
    }
    function onInputBlur( ev ) {
      if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--filled' );
      }
    }
  })();