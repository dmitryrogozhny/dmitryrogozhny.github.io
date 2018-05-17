/*
    This file contains JavaScript logic for the site.
    NOTE: Once changed the content of the file should be minified and manually added at the end of the default.html layout.
*/

// Logic for social networks sharing buttons to open in a pop-up.
// To add this behavior, add "js-social-button" class to an <a> element;
(function () {
    function openWindowPopup(url, width, height) {
        var left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        window.open(
            url,
            "",
            "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
        );
    }

    function addPopupOnClick(cssClass, width, height) {
        var links = document.querySelectorAll(cssClass);

        if (links) {
            for (var i = 0; i < links.length; i++) {
                var link = links[i];

                link.addEventListener("click", function (e) {
                    e.preventDefault();
                    openWindowPopup(this.href, width, height);
                });
            }
        }
    }

    addPopupOnClick(".js-social-buttons", 750, 500);
}());


/*
	disqusLoader.js v1.0
	A JavaScript plugin for lazy-loading Disqus comments widget.
	-
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

; (function (window, document, index) {
    'use strict';

    var extendObj = function (defaults, options) {
        var prop, extended = {};
        for (prop in defaults)
            if (Object.prototype.hasOwnProperty.call(defaults, prop))
                extended[prop] = defaults[prop];

        for (prop in options)
            if (Object.prototype.hasOwnProperty.call(options, prop))
                extended[prop] = options[prop];

        return extended;
    },
        getOffset = function (el) {
            var rect = el.getBoundingClientRect();
            return { top: rect.top + document.body.scrollTop, left: rect.left + document.body.scrollLeft };
        },
        checkVisible = function (elm, threshold, mode) {
            threshold = threshold || 0;
            mode = mode || 'visible';

            var rect = elm.getBoundingClientRect();
            var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            var above = rect.bottom - threshold < 0;
            var below = rect.top - viewHeight + threshold >= 0;

            return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
        },
        loadScript = function (url, callback) {
            var script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.setAttribute('data-timestamp', +new Date());
            script.addEventListener('load', function () {
                if (typeof callback === 'function')
                    callback();
            });
            (document.head || document.body).appendChild(script);
        },
        throttle = function (a, b) { var c, d; return function () { var e = this, f = arguments, g = +new Date; c && g < c + a ? (clearTimeout(d), d = setTimeout(function () { c = g, b.apply(e, f) }, a)) : (c = g, b.apply(e, f)) } },

        throttleTO = false,
        laziness = false,
        disqusConfig = false,
        scriptUrl = false,

        scriptStatus = 'unloaded',
        instance = false,

        init = function () {
            if (!instance || !document.body.contains(instance) || instance.disqusLoaderStatus == 'loaded')
                return true;

            var winST = window.pageYOffset,
                offset = getOffset(instance).top;

            // if the element is too far below || too far above
            if (!checkVisible(instance, -100))
                return true;

            var tmp = document.getElementById('disqus_thread');
            if (tmp) tmp.removeAttribute('id');
            instance.setAttribute('id', 'disqus_thread');
            instance.disqusLoaderStatus = 'loaded';

            if (scriptStatus == 'loaded') {
                DISQUS.reset({ reload: true, config: disqusConfig });
            }
            else // unloaded | loading
            {
                window.disqus_config = disqusConfig;
                if (scriptStatus == 'unloaded') {
                    scriptStatus = 'loading';
                    loadScript(scriptUrl, function () {
                        scriptStatus = 'loaded';
                    });
                }
            }
        };

    window.addEventListener('scroll', throttle(throttleTO, init));
    window.addEventListener('resize', throttle(throttleTO, init));

    window.disqusLoader = function (element, options) {
        options = extendObj(
            {
                laziness: 1,
                throttle: 250,
                scriptUrl: false,
                disqusConfig: false,

            }, options);

        laziness = options.laziness;
        throttleTO = options.throttle;
        disqusConfig = options.disqusConfig;
        scriptUrl = scriptUrl === false ? options.scriptUrl : scriptUrl; // set it only once

        if (typeof element === 'string') instance = document.querySelector(element);
        else if (typeof element.length === 'number') instance = element[0];
        else instance = element;

        if (instance) {
            instance.disqusLoaderStatus = 'unloaded';
        }

        init();
    };

    var disqus_options = {
        scriptUrl: '//{{ site.disqus.shortname }}.disqus.com/embed.js',
        disqusConfig: function () {
            this.page.url = "{{ site.url }}{{ page.url }}";
            this.page.identifier = "{{ site.url }}{{ page.url }}";
        },
    };

    disqusLoader('.disqus', disqus_options);

}(window, document, 0));
