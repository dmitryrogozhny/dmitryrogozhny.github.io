/*
    This file contains JavaScript logic for the site.
    Its <script> tag is added at the end of HTML's <body>.
*/

// Logic for social networks sharing buttons to open in a pop-up.
// To add this behaviour, add "js-social-button" class to an <a> element;
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
