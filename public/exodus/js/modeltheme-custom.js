if (jQuery("img.lazy").length) {
    jQuery("img.lazy").lazyload({
        effect: "fadeIn"
    });
}
jQuery("[class$='mt_circle']").percircle();
if (jQuery("#grid").length) {
    (function() {
        function init() {
            var speed = 300,
                easing = mina.backout;
            [].slice.call(document.querySelectorAll('#grid a')).forEach(function(el) {
                var s = Snap(el.querySelector('svg')),
                    path = s.select('path'),
                    pathConfig = {
                        from: path.attr('d'),
                        to: el.getAttribute('data-path-hover')
                    };
                el.addEventListener('mouseenter', function() {
                    path.animate({
                        'path': pathConfig.to
                    }, speed, easing);
                });
                el.addEventListener('mouseleave', function() {
                    path.animate({
                        'path': pathConfig.from
                    }, speed, easing);
                });
            });
        }
        init();
    })();
}
if (jQuery("#mt-members-slideshow").length) {
    document.documentElement.className = 'js';
    var slideshow = new CircleSlideshow(document.getElementById('mt-members-slideshow'));
}
if (jQuery(".mockup").length) {
    (function() {
        new Slideshow(document.getElementById('slideshow'));
        setTimeout(function() {
            new Slideshow(document.getElementById('slideshow-2'));
        }, 1750);
        var body = docElem = window.document.documentElement,
            wrap = document.getElementById('wrap'),
            mockup = wrap.querySelector('.mockup'),
            mockupWidth = mockup.offsetWidth;
        scaleMockup();

        function scaleMockup() {
            var wrapWidth = wrap.offsetWidth,
                val = wrapWidth / mockupWidth;
            mockup.style.transform = 'scale3d(' + val + ', ' + val + ', 1)';
        }
        window.addEventListener('resize', resizeHandler);

        function resizeHandler() {
            function delayed() {
                resize();
                resizeTimeout = null;
            }
            if (typeof resizeTimeout != 'undefined') {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(delayed, 50);
        }

        function resize() {
            scaleMockup();
        }
    })();
}(function(window) {
    'use strict';
        function classReg( className ) {
            return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
        }
        var hasClass, addClass, removeClass;
        if ( 'classList' in document.documentElement ) {
            hasClass = function( elem, c ) {
                return elem.classList.contains( c );
            };
            addClass = function( elem, c ) {
                elem.classList.add( c );
            };
            removeClass = function( elem, c ) {
                elem.classList.remove( c );
            };
        }
        else {
            hasClass = function( elem, c ) {
                return classReg( c ).test( elem.className );
            };
            addClass = function( elem, c ) {
                if ( !hasClass( elem, c ) ) {
                    elem.className = elem.className + ' ' + c;
                }
            };
            removeClass = function( elem, c ) {
                elem.className = elem.className.replace( classReg( c ), ' ' );
            };
        }
    function toggleClass( elem, c ) {
        var fn = hasClass( elem, c ) ? removeClass : addClass;
        fn( elem, c );
    }
    var classie = {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };
    if ( typeof define === 'function' && define.amd ) {
            define( classie );
        } 
    else {
            window.classie = classie;
    }
})( window );
(function ($) {

  var divs = {
    'ball-pulse': 3,
    'ball-grid-pulse': 9,
    'ball-clip-rotate': 1,
    'ball-clip-rotate-pulse': 2,
    'square-spin': 1,
    'ball-clip-rotate-multiple': 2,
    'ball-pulse-rise': 5,
    'ball-rotate': 1,
    'cube-transition': 2,
    'ball-zig-zag': 2,
    'ball-zig-zag-deflect': 2,
    'ball-triangle-path': 3,
    'ball-scale': 1,
    'line-scale': 5,
    'line-scale-party': 4,
    'ball-scale-multiple': 3,
    'ball-pulse-sync': 3,
    'ball-beat': 3,
    'line-scale-pulse-out': 5,
    'line-scale-pulse-out-rapid': 5,
    'ball-scale-ripple': 1,
    'ball-scale-ripple-multiple': 3,
    'ball-spin-fade-loader': 8,
    'line-spin-fade-loader': 8,
    'triangle-skew-spin': 1,
    'pacman': 5,
    'ball-grid-beat': 9,
    'semi-circle-spin': 1,
    'ball-scale-random': 3
  };

  var addDivs = function(n) {
    var arr = [];
    for (i = 1; i <= n; i++) {
      arr.push('<div></div>');
    }
    return arr;
  };

  $.fn.loaders = function() {
    return this.each(function() {
      var elem = $(this);
      $.each(divs, function(key, value) {
        if (elem.hasClass(key))
          elem.html(addDivs(value))
      })
    });
  };

  $(function() {
    $.each(divs, function(key, value) {
      $('.loader-inner.' + key).html(addDivs(value));
    })
  });

}).call(window, window.$ || window.jQuery || window.Zepto);
(function($) {
    'use strict';
    $(document).ready(function() {


    if (jQuery('.testimonials-container').length){
        jQuery(".testimonials-container").owlCarousel({
            navigation: false,
            pagination: true,
            autoPlay: false,
            slideSpeed: 700,
            paginationSpeed: 700,
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 2],
                [700, 2],
                [1000, 2],
                [1200, 2],
                [1400, 2],
                [1600, 2]
            ]
        });
    }
    if (jQuery('.testimonials-container').length){
        jQuery(".members-container").owlCarousel({
            navigation: false,
            pagination: false,
            autoPlay: false,
            slideSpeed: 700,
            paginationSpeed: 700,
            singleItem: true,
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 1],
                [700, 1],
                [1000, 1],
                [1200, 1],
                [1400, 1],
                [1600, 1]
            ]
        });
    }
    if (jQuery('.testimonials-container-1').length){
        jQuery(".testimonials-container-1").owlCarousel({
            navigation: false,
            navigationText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
            pagination: false,
            autoPlay: false,
            slideSpeed: 700,
            paginationSpeed: 700,
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 1],
                [700, 1],
                [1000, 1],
                [1200, 1],
                [1400, 1],
                [1600, 1]
            ]
        });
    }
    if (jQuery('.testimonials-container-2').length){
        jQuery(".testimonials-container-2").owlCarousel({
            navigation: false,
            pagination: false,
            autoPlay: false,
            slideSpeed: 700,
            paginationSpeed: 700,
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 2],
                [700, 2],
                [1000, 2],
                [1200, 2],
                [1400, 2],
                [1600, 2]
            ]
        });
    }
    if (jQuery('.testimonials-container-3').length){
        jQuery(".testimonials-container-3").owlCarousel({
            navigation: false,
            pagination: false,
            autoPlay: false,
            slideSpeed: 700,
            paginationSpeed: 700,
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 2],
                [700, 2],
                [1000, 3],
                [1200, 3],
                [1400, 3],
                [1600, 3]
            ]
        });
    }
    if (jQuery('.testimonials02-container').length){
        jQuery(".testimonials02-container").owlCarousel({
            navigation: false,
            pagination: true,
            autoPlay: true,
            slideSpeed: 700,
            paginationSpeed: 700,
            navigationText: ["<i class='icon-arrow-left'></i>", "<i class='icon-arrow-right'></i>"],
            singleItem: true
        });
    }
    if (jQuery('.mt_tweets_slider').length){
        jQuery(".mt_tweets_slider").owlCarousel({
            navigation: false,
            pagination: false,
            autoPlay: false,
            slideSpeed: 700,
            paginationSpeed: 700,
            singleItem: true
        });
    }
    if (jQuery('.mt_members_fancy_slider').length){
        jQuery(".mt_members_fancy_slider").owlCarousel({
            navigation: false,
            pagination: false,
            autoPlay: false,
            slideSpeed: 700,
            paginationSpeed: 700,
            autoPlay: true,
            autoPlayTimeout: 10000,
            autoPlayHoverPause: true,
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 2],
                [700, 2],
                [1000, 4],
                [1200, 4],
                [1400, 4],
                [1600, 4]
            ]
        });
    }
    if (jQuery('.clients_container_shortcode-1').length){
        jQuery(".clients_container_shortcode-1").owlCarousel({
            navigation: false,
            pagination: false,
            autoPlay: false,
            slideSpeed: 700,
            paginationSpeed: 700,
            autoPlay: true,
            autoPlayTimeout: 10000,
            autoPlayHoverPause: true,
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 1],
                [700, 1],
                [1000, 1],
                [1200, 1],
                [1400, 1],
                [1600, 1]
            ]
        });
    }
    if (jQuery('.clients_container_shortcode-2').length){
        jQuery(".clients_container_shortcode-2").owlCarousel({
            navigation: false,
            pagination: false,
            autoPlay: false,
            slideSpeed: 700,
            paginationSpeed: 700,
            autoPlay: true,
            autoPlayTimeout: 10000,
            autoPlayHoverPause: true,
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 2],
                [700, 2],
                [1000, 2],
                [1200, 2],
                [1400, 2],
                [1600, 2]
            ]
        });
    }
    if (jQuery('.clients_container_shortcode-3').length){
        jQuery(".clients_container_shortcode-3").owlCarousel({
            navigation: false,
            pagination: false,
            autoPlay: false,
            slideSpeed: 700,
            paginationSpeed: 700,
            autoPlay: true,
            autoPlayTimeout: 10000,
            autoPlayHoverPause: true,
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 2],
                [700, 2],
                [1000, 3],
                [1200, 3],
                [1400, 3],
                [1600, 3]
            ]
        });
    }
    if (jQuery('.clients_container_shortcode-4').length){
        jQuery(".clients_container_shortcode-4").owlCarousel({
            navigation: false,
            pagination: false,
            autoPlay: false,
            slideSpeed: 700,
            paginationSpeed: 700,
            autoPlay: true,
            autoPlayTimeout: 10000,
            autoPlayHoverPause: true,
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 2],
                [700, 3],
                [1000, 4],
                [1200, 4],
                [1400, 4],
                [1600, 4]
            ]
        });
    }
        jQuery(document).ready(function() {
            var height = jQuery(".about_image").height();
            jQuery('.about_text_holder').css('height', height);
        });
        jQuery(document).ready(function() {
            var height = jQuery(".portfolio03_thumbnail").height();
            jQuery('.color_verlay_portfolio3').css('height', height);
        });
        jQuery(document).ready(function() {
            var height = jQuery(".color_verlay_portfolio3").height();
            jQuery('.portfolio03_title_subtitle_holder').css('height', height);
        });
        jQuery(document).ready(function() {
            var height = jQuery(".testimonial02-img").height();
            jQuery('.testimonial02-content').css('height', height);
        });
        jQuery('.right-side').ready(function() {
            var right_side_height = jQuery('.right-side').height();
            jQuery('.left-side').height(right_side_height)
        });
        var sync1 = jQuery("#service_big_slides");
        var sync2 = jQuery("#service_small_slides");
        jQuery(".service_small_slides_holder .fa-angle-right").click(function() {
            sync1.trigger('owl.next');
        })
        jQuery(".service_small_slides_holder .fa-angle-left").click(function() {
            sync1.trigger('owl.prev');
        })
        if (jQuery('sync1.owlCarousel').length){
        sync1.owlCarousel({
            center: true,
            loop: true,
            navigationText: ["<",">"],
            rewindNav: true,
            singleItem: true,
            slideSpeed: 1000,
            navigation: false,
            pagination: false,
            afterAction: syncPosition,
            responsiveRefreshRate: 200,
            afterInit: function(elem) {
                this.jumpTo(1);
            }
        });
    }
    if (jQuery('sync2.owlCarousel').length){
        sync2.owlCarousel({
            center: true,
            loop: true,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 3],
            itemsMobile: [479, 3],
            pagination: false,
            responsiveRefreshRate: 100,
            afterInit: function(el) {
                el.find(".owl-item").eq(1).addClass("synced");
            }
        });
    }
        function syncPosition(el) {
            var current = this.currentItem;
            jQuery("#service_small_slides").find(".owl-item").removeClass("synced").eq(current).addClass("synced")
            if (jQuery("#service_small_slides").data("owlCarousel") !== undefined) {
                center(current)
            }
        }
        jQuery("#service_small_slides").on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = jQuery(this).data("owlItem");
            sync1.trigger("owl.goTo", number);
        });

        function center(number) {
            var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
            var num = number;
            var found = false;
            for (var i in sync2visible) {
                if (num === sync2visible[i]) {
                    var found = true;
                }
            }
            if (found === false) {
                if (num > sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", num - sync2visible.length + 2)
                } else {
                    if (num - 1 === -1) {
                        num = 0;
                    }
                    sync2.trigger("owl.goTo", num);
                }
            } else if (num === sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", sync2visible[1])
            } else if (num === sync2visible[0]) {
                sync2.trigger("owl.goTo", num - 1)
            }
        }
    });
}(jQuery));
(function(b, h, g) {
    function c(a, d) {
        this.element = b(a);
        this.options = d || {};
        this.options.scope = this.options.scope || k.Parent;
        this.options.className = this.options.className || "stick";
        this.options.top = this.options.top || 0;
        this.options.extraHeight = this.options.extraHeight || 0;
        void 0 === this.options.zIndex && (this.zIndex = this.element.css("z-index") || 100, "auto" == this.zIndex && (this.zIndex = 100));
        this.lastY = this.offsetY = 0;
        this.stick = e.None;
        this.spacer = b("<div />");
        this.spacer[0].id = a.id;
        this.spacer[0].className = a.className;
        this.spacer[0].style.cssText = a.style.cssText;
        this.spacer.addClass("jquery-stickit-spacer");
        this.spacer.css({
            display: "none",
            visibility: "hidden"
        });
        this.spacer.insertAfter(this.element);
        "static" == this.element.parent().css("position") && this.element.parent().css("position", "relative");
        this.bound();
        this.precalculate();
        this.store()
    }

    function n() {
        p = h.innerHeight || g.documentElement.clientHeight;
        l = h.innerWidth || g.documentElement.clientWidth;
        b(":jquery-stickit").each(function() {
            b(this).data("jquery-stickit").resize()
        })
    }
    var q = -1 != navigator.userAgent.indexOf("MSIE 7.0"),
        r = q ? -2 : 0,
        u = void 0 !== h.MutationObserver,
        k = h.StickScope = {
            Parent: 0,
            Document: 1
        },
        e = {
            None: 0,
            Fixed: 1,
            Absolute: 2
        },
        t = !1;
    b.expr[":"]["jquery-stickit"] = function(a) {
        return !!b(a).data("jquery-stickit")
    };
    c.prototype.store = function() {
        var a = this.element[0];
        this.origStyle = {
            width: a.style.width,
            position: a.style.position,
            left: a.style.left,
            top: a.style.top,
            bottom: a.style.bottom,
            zIndex: a.style.zIndex
        }
    };
    c.prototype.restore = function() {
        this.element.css(this.origStyle)
    };
    c.prototype.bound =
        function() {
            var a = this.element;
            if (q || "border-box" != a.css("box-sizing")) this.extraWidth = 0;
            else {
                var d = parseInt(a.css("border-left-width")) || 0,
                    f = parseInt(a.css("border-right-width")) || 0,
                    b = parseInt(a.css("padding-left")) || 0,
                    c = parseInt(a.css("padding-right")) || 0;
                this.extraWidth = d + f + b + c
            }
            this.margin = {
                top: parseInt(a.css("margin-top")) || 0,
                bottom: parseInt(a.css("margin-bottom")) || 0,
                left: parseInt(a.css("margin-left")) || 0,
                right: parseInt(a.css("margin-right")) || 0
            };
            this.parent = {
                border: {
                    bottom: parseInt(a.parent().css("border-bottom-width")) ||
                        0
                }
            }
        };
    c.prototype.precalculate = function() {
        this.baseTop = this.margin.top + this.options.top;
        this.basePadding = this.baseTop + this.margin.bottom;
        this.baseParentOffset = this.options.extraHeight - this.parent.border.bottom;
        this.offsetHeight = Math.max(this.element.height() - p, 0)
    };
    c.prototype.reset = function() {
        this.stick = e.None;
        this.spacer.hide();
        this.spacer.css("width", "");
        this.restore();
        this.element.removeClass(this.options.className)
    };
    c.prototype.setAbsolute = function(a) {
        this.stick == e.None && this.element.addClass(this.options.className);
        this.stick = e.Absolute;
        this.element.css({
            width: this.element.width() + this.extraWidth + "px",
            position: "absolute",
            top: this.origStyle.top,
            left: a + "px",
            bottom: -this.options.extraHeight + "px",
            "z-index": this.zIndex
        })
    };
    c.prototype.setFixed = function(a, d, f) {
        this.stick == e.None && this.element.addClass(this.options.className);
        this.stick = e.Fixed;
        this.lastY = d;
        this.offsetY = f;
        this.element.css({
            width: this.element.width() + this.extraWidth + "px",
            position: "fixed",
            top: this.options.top + f + "px",
            left: a + "px",
            bottom: this.origStyle.bottom,
            "z-index": this.zIndex
        })
    };
    c.prototype.updateScroll = function(a) {
        0 != this.offsetHeight && (this.offsetY = Math.max(this.offsetY + a - this.lastY, -(this.options.top + this.offsetHeight)), this.offsetY = Math.min(this.offsetY, 0), this.lastY = a, this.element.css("top", this.options.top + this.offsetY + "px"))
    };
    c.prototype.isActive = function() {
        return (void 0 === this.options.screenMinWidth || l >= this.options.screenMinWidth) && (void 0 === this.options.screenMaxWidth || l <= this.options.screenMaxWidth) && this.element.is(":visible")
    };
    c.prototype.locate =
        function() {
            var a, d, f, b = this.element,
                c = this.spacer;
            if (this.isActive()) switch (this.stick) {
                case e.Fixed:
                    a = c[0].getBoundingClientRect();
                    d = a.top - this.baseTop;
                    0 <= d ? this.reset() : this.options.scope == k.Parent ? (a = b.parent()[0].getBoundingClientRect(), a.bottom + this.baseParentOffset + this.offsetHeight <= b.outerHeight(!1) + this.basePadding ? this.setAbsolute(this.spacer.position().left) : this.updateScroll(a.bottom)) : this.updateScroll(a.bottom);
                    break;
                case e.Absolute:
                    a = c[0].getBoundingClientRect();
                    d = a.top - this.baseTop;
                    f = a.left - this.margin.left;
                    0 <= d ? this.reset() : (a = b.parent()[0].getBoundingClientRect(), a.bottom + this.baseParentOffset + this.offsetHeight > b.outerHeight(!1) + this.basePadding && this.setFixed(f + r, a.bottom, -this.offsetHeight));
                    break;
                default:
                    a = b[0].getBoundingClientRect(), d = a.top - this.baseTop, 0 <= d || (d = b.parent()[0].getBoundingClientRect(), c.height(b.height()), c.show(), f = a.left - this.margin.left, this.options.scope == k.Document ? this.setFixed(f, a.bottom, 0) : d.bottom + this.baseParentOffset <= b.outerHeight(!1) + this.basePadding ?
                        this.setAbsolute(this.element.position().left) : this.setFixed(f + r, a.bottom, 0), c.width() || c.width(b.width()))
            } else this.stick != e.None && this.reset()
        };
    c.prototype.resize = function() {
        this.bound();
        this.precalculate();
        if (this.stick != e.None) {
            var a = this.element,
                b = this.spacer;
            a.width(b.width());
            b.height(a.height());
            this.stick == e.Fixed && (b = this.spacer[0].getBoundingClientRect().left - this.margin.left, a.css("left", b + "px"))
        }
        this.locate()
    };
    c.prototype.destroy = function() {
        this.reset();
        this.spacer.remove();
        this.element.removeData("jquery-stickit")
    };

    var p, l, m = function(a) {
            var b = 0,
                c;
            return function() {
                var e = this,
                    h = arguments,
                    g = function() {
                        b = new Date;
                        a.apply(e, h)
                    };
                c && (clearTimeout(c), c = null);
                var k = new Date - b;
                10 < k ? g() : c = setTimeout(g, 10 - k)
            }
        }(function() {
            b(":jquery-stickit").each(function() {
                b(this).data("jquery-stickit").locate()
            })
        }),
        v = ["destroy"];
    b.fn.stickit = function(a, d) {
        "string" == typeof a ? -1 != b.inArray(a, v) && this.each(function() {
            var c = b(this).data("jquery-stickit");
            c && c[a].apply(c, d)
        }) : (t || (t = !0, n(), b(g).ready(function() {
            b(h).bind("resize", n).bind("scroll",
                m);
            b(g.body).on("animationend webkitAnimationEnd oAnimationEnd transitionend webkitTransitionEnd oTransitionEnd", m)
        }), u && (new MutationObserver(m)).observe(g, {
            attributes: !0,
            childList: !0,
            characterData: !0,
            subtree: !0
        })), d = a, this.each(function() {
            var a = new c(this, d);
            b(this).data("jquery-stickit", a);
            a.locate()
        }));
        return this
    }
})(jQuery, window, document);






(function ($) {

  var divs = {
    'ball-pulse': 3,
    'ball-grid-pulse': 9,
    'ball-clip-rotate': 1,
    'ball-clip-rotate-pulse': 2,
    'square-spin': 1,
    'ball-clip-rotate-multiple': 2,
    'ball-pulse-rise': 5,
    'ball-rotate': 1,
    'cube-transition': 2,
    'ball-zig-zag': 2,
    'ball-zig-zag-deflect': 2,
    'ball-triangle-path': 3,
    'ball-scale': 1,
    'line-scale': 5,
    'line-scale-party': 4,
    'ball-scale-multiple': 3,
    'ball-pulse-sync': 3,
    'ball-beat': 3,
    'line-scale-pulse-out': 5,
    'line-scale-pulse-out-rapid': 5,
    'ball-scale-ripple': 1,
    'ball-scale-ripple-multiple': 3,
    'ball-spin-fade-loader': 8,
    'line-spin-fade-loader': 8,
    'triangle-skew-spin': 1,
    'pacman': 5,
    'ball-grid-beat': 9,
    'semi-circle-spin': 1,
    'ball-scale-random': 3
  };

  var addDivs = function(n) {
    var arr = [];
    for (i = 1; i <= n; i++) {
      arr.push('<div></div>');
    }
    return arr;
  };

  $.fn.loaders = function() {
    return this.each(function() {
      var elem = $(this);
      $.each(divs, function(key, value) {
        if (elem.hasClass(key))
          elem.html(addDivs(value))
      })
    });
  };

  $(function() {
    $.each(divs, function(key, value) {
      $('.loader-inner.' + key).html(addDivs(value));
    })
  });

}).call(window, window.$ || window.jQuery || window.Zepto);
