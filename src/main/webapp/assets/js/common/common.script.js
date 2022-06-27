/*var width = $(window).width(), height = $(window).height();
alert('width : ' +width + 'height : ' + height);*/
"use strict";

// Table Util
window.Table = {
    addRow: function (tableSelector, rowCount, skipBottom) {
        rowCount = rowCount || 1;
        skipBottom = skipBottom || 0;
        let tableLastRow = tableSelector.find('tbody tr').eq((skipBottom + 1) * -1);

        if (!tableLastRow.get(0)) {
            return null;
        }
        let rowText = tableLastRow.get(0).outerHTML;
        let rows = [];
        for (let a = 0; a < rowCount; a++) {
            rows.push(rowText);
        }
        tableLastRow.after(rows.join(','));
        return tableSelector.find('tbody tr').eq((skipBottom + 1) * -1);
    },
    deleteRow: function (tableRow, skipBottom) {
        let hasDeleted = false;
        skipBottom = skipBottom || 0;
        if (!!tableRow && !!tableRow.find('input,select')) {
            tableRow.find('input,select').val('');
        }
        let rowParent = $(tableRow).parent();
        if (rowParent.children().length > (1 + skipBottom)) {
            $(tableRow).remove();
            hasDeleted = true;
        }
        return hasDeleted;
    },
    clearRows: function (tableSelector, skipBottom) {
        skipBottom = skipBottom || 0;
        let rowCount = tableSelector.find('tbody tr').length;
        tableSelector.find('tbody tr').slice(1, (rowCount - skipBottom)).remove();
        if (!!tableSelector && !!tableSelector.find('tbody tr').find('input,select')) {
            tableSelector.find('tbody tr').find('input,select').val('');
        }
        return tableSelector.find('tbody tr').eq((skipBottom + 1) * -1);
    }
};

// Util
window.Util = {
    DECIMAL_PLACES: 2,
    numberFormat: function (num) {
        let x = Util.getFloat(num);
        let numString = x.toFixed(this.DECIMAL_PLACES);
        let numberParts = numString.split('.');
        numberParts[0] = numberParts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return numberParts.join('.');
    },
    getRawNumber: function (numString) {
        let num = numString + "";
        return Util.getFloat(num.replace(/,/g, ""));
    },
    getProperty: function (obj, key) {
        if (!key) {
            return undefined;
        }
        if (!!obj && !!obj[key]) {
            return obj[key];
        }
        let keys = key.split(".");
        let tmp = obj;
        for (let i in keys) {
            if (keys.hasOwnProperty(i) && !!tmp) {
                tmp = tmp[keys[i]];
            }
            else {
                return tmp;
            }
        }
        return tmp;
    },
    setProperty: function (obj, key, value) {
        if (!obj)
            return undefined;
        let keys = key.split(".");
        let lastKey = keys.pop();
        let currentObj = obj;
        for (let index in keys) {
            if (keys.hasOwnProperty(index) && !!currentObj) {
                let selectedKey = keys[index];
                if (!currentObj[selectedKey]) {
                    currentObj[selectedKey] = {};
                }
                currentObj = currentObj[selectedKey];
            }
        }
        currentObj[lastKey] = value;
        return obj;
    },
    getPropertyInArray: function (array, key, needle) {
        if (Array.isArray(array)) {
            for (let i in array) {
                if (array.hasOwnProperty(i) && this.getProperty(array[i], key) == needle) {
                    return array[i];
                }
            }
        }
        return undefined;
    },
    getFloat: function (val) {
        let num = val + "";
        val = num.replace(/\,/g, "");
        if (isNaN(parseFloat(val))) {
            return 0.00;
        }
        else {
            return parseFloat(val);
        }
    },
    inArray: function (array, key) {
        for (let i in array) {
            if (key == array[i])
                return true;
        }
        return false;
    },
    makeReference: function makeReference(length) {
        let result = '';
        let characters = '0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    makeId: function makeid(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    isEmpty: function (obj) {
        if (!obj)
            return true;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    },
    dateInRange: function (date, startDate, endDate, showAlert = true) {
        date = luxon.DateTime.fromFormat(date, "dd/MM/yyyy");
        startDate = luxon.DateTime.fromFormat(startDate, "dd/MM/yyyy");
        endDate = luxon.DateTime.fromFormat(endDate, "dd/MM/yyyy");
        if (date < startDate || date > endDate) {
            if (showAlert) {
                swal("Invalid Date", "Date is out of range", "error");
            }
            return false;
        }
        return true;
    },
    flatten: function (obj, generatedKey, newObj) {
        generatedKey = generatedKey || "";
        newObj = newObj || {};
        if (!obj || typeof obj !== 'object')
            return newObj

        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                let value = obj[i];
                let key = (!!generatedKey) ? generatedKey + '.' + i : i;
                if (typeof value !== "object") {
                    newObj[key] = value;
                }
                else {
                    newObj = this.flatten(value, key, newObj);
                }
            }
        }
        return newObj;
    }
};
window.urlParams = {};
(function () {
    let match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) {
            return decodeURIComponent(s.replace(pl, " "));
        },
        query = window.location.search.substring(1);

    window.urlParams = {};
    while (match = search.exec(query))
        window.urlParams[decode(match[1])] = decode(match[2]);
})();

// DateFormater
window.DateFormatter = {
    ISO: "YYYY-MM-DD",
    STANDARD: "DD/MM/YYYY",
    format: function (date, format) {
        var retDate = [];
        if (!!date && typeof date == "object") {
            if (date instanceof Date) {
                retDate.push(this._prefixZero(date.getDate()));
                retDate.push(this._prefixZero(date.getMonth() + 1));
                retDate.push(date.getFullYear());
            }
            else {
                retDate.push((!!date.dayOfMonth) ? date.dayOfMonth : "00");
                retDate.push((!!date.monthValue) ? this._prefixZero(date.monthValue) : "00");
                retDate.push((!!date.year) ? date.year : "0000");
            }
            return this._format(retDate, format);
        }
        else {
            throw new Error("Invalid date");
        }
    },
    _format: function (dateArray, format) {
        var retValue = "";
        switch (format) {
            case this.ISO:
                retValue = dateArray.reverse().join("-");
                break;
            case this.STANDARD:
                retValue = dateArray.join("/");
                break;
            default:
                retValue = dateArray.join("/");
        }
        return retValue;
    },
    _prefixZero: function (month) {
        return (month < 10) ? "0" + month : month;
    }
};

window.isNullOrWhiteSpace = function (input) {
    return typeof input === null || input.length === 0 || typeof input === "undefined";
}

$(document).ready(function () {


    var $window = $(window);
    //add id to main menu for mobile menu start
    var getBody = $("body");
    var bodyClass = getBody[0].className;
    $(".main-menu").attr('id', bodyClass);
    //add id to main menu for mobile menu end

    //loader start
    $('.theme-loader').fadeOut(1000);
    //loader end

    // card js start
    var emailbody = $(window).height();
    $('.user-body').css('min-height', emailbody);
    $(".card-header-right .icofont-close-circled").on('click', function () {
        var $this = $(this);
        $this.parents('.card').animate({
                                           'opacity': '0',
                                           '-webkit-transform': 'scale3d(.3, .3, .3)',
                                           'transform': 'scale3d(.3, .3, .3)'
                                       });

        setTimeout(function () {
            $this.parents('.card').remove();
        }, 800);
    });
    $("#styleSelector .style-cont").slimScroll({
                                                   height: '100%',
                                                   allowPageScroll: false,
                                                   wheelStep: 5,
                                                   color: '#999',
                                                   animate: true
                                               });
    $("#commentsSideView .style-cont").slimScroll({
                                                      height: '100%',
                                                      allowPageScroll: false,
                                                      wheelStep: 5,
                                                      color: '#999',
                                                      animate: true
                                                  });
    $(".card-header-right .icofont-rounded-down").on('click', function () {
        var $this = $(this);
        var port = $($this.parents('.card'));
        var card = $(port).children('.card-block').slideToggle();
        $(this).toggleClass("icon-up").fadeIn('slow');
    });
    $(".icofont-refresh").on('mouseenter mouseleave', function () {
        $(this).toggleClass("rotate-refresh").fadeIn('slow');
    });
    $("#more-details").on('click', function () {
        $(".more-details").slideToggle(500);
    });
    $(".mobile-options").on('click', function () {
        $(".navbar-container .nav-right").slideToggle('slow');
    });
    // card js end

    //Menu layout end

    /*chatbar js start*/
    /*chat box scroll*/
    var a = $(window).height() - 50;
    $(".main-friend-list").slimScroll({
                                          height: a,
                                          allowPageScroll: false,
                                          wheelStep: 5,
                                          color: '#1b8bf9'
                                      });

    // search
    $("#search-friends").on("keyup", function () {
        var g = $(this).val().toLowerCase();
        $(".userlist-box .media-body .chat-header").each(function () {
            var s = $(this).text().toLowerCase();
            $(this).closest('.userlist-box')[s.indexOf(g) !== -1 ? 'show' : 'hide']();
        });
    });

    // open chat box
    $('.displayChatbox').on('click', function () {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        }
        else {
            var options = {
                direction: 'right'
            };
        }
        $('.showChat').toggle('slide', options, 500);
    });


    //open friend chat
    $('.userlist-box').on('click', function () {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        }
        else {
            var options = {
                direction: 'right'
            };
        }
        $('.showChat_inner').toggle('slide', options, 500);
    });
    //back to main chatbar
    $('.back_chatBox').on('click', function () {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        }
        else {
            var options = {
                direction: 'right'
            };
        }
        $('.showChat_inner').toggle('slide', options, 500);
        $('.showChat').css('display', 'block');
    });
    // /*chatbar js end*/

    //Language chage dropdown start
    /*  i18next.use(window.i18nextXHRBackend).init({
          debug: !1,
          fallbackLng: !1,
          backend: {
              loadPath: "assets/locales/{{lng}}/{{ns}}.json"
          },
          returnObjects: !0
      },
      function(err, t) {
          jqueryI18next.init(i18next, $)
      }),
      $(".lng-dropdown a").on("click", function() {

          var $this = $(this),
          selected_lng = $this.data("lng");
          i18next.changeLanguage(selected_lng, function(err, t) {
              $(".main-menu").localize()
          }),
          $this.parent("li").siblings("li").children("a").removeClass("active"), $this.addClass("active"), $(".lng-dropdown a").removeClass("active");
          var drop_lng = $('.lng-dropdown a[data-lng="' + selected_lng + '"]').addClass("active");
          $(".lng-dropdown #dropdown-active-item").html(drop_lng.html())
      })*/
    //Language chage dropdown end

    // Format monetary inputs
    setTimeout(() => {
        $("input.positive-formatted-money-input").each(function () {
            new Cleave($(this), {
                numeral: true,
                numeralPositiveOnly: true
            });
        });
    }, 0);

    // Format NRC text
    $(".nrcFormatted").each(function () {
        const nrcNumber = $(this).text();
        const nrcArr = nrcNumber.trim().split("");
        // Insert slash at index 6 and 9 (account for new arr length)
        // 123456789 -> 123456/78/1
        nrcArr.splice(6, 0, "/");
        nrcArr.splice(9, 0, "/");

        // Join and replace current text value
        const nrcFormatted = nrcArr.join("");
        $(this).text(nrcFormatted);
    });
});

/* Search header start */
(function () {
    var isAnimating;
    var morphSearch = document.getElementById('morphsearch'),
        input = morphSearch.querySelector('input.morphsearch-input'),
        ctrlClose = morphSearch.querySelector('span.morphsearch-close'),
        isOpen = isAnimating = false,
        isHideAnimate = morphsearch.querySelector('.morphsearch-form'),
        // show/hide search area
        toggleSearch = function (evt) {
            // return if open and the input gets focused
            if (evt.type.toLowerCase() === 'focus' && isOpen) return false;

            var offsets = morphsearch.getBoundingClientRect();
            if (isOpen) {
                classie.remove(morphSearch, 'open');

                // trick to hide input text once the search overlay closes
                // todo: hardcoded times, should be done after transition ends
                //if( input.value !== '' ) {
                setTimeout(function () {
                    classie.add(morphSearch, 'hideInput');
                    setTimeout(function () {
                        classie.add(isHideAnimate, 'p-absolute');
                        classie.remove(morphSearch, 'hideInput');
                        input.value = '';
                    }, 300);
                }, 500);
                //}

                input.blur();
            }
            else {
                classie.remove(isHideAnimate, 'p-absolute');
                classie.add(morphSearch, 'open');
            }
            isOpen = !isOpen;
        };

    // events
    input.addEventListener('focus', toggleSearch);
    ctrlClose.addEventListener('click', toggleSearch);
    // esc key closes search overlay
    // keyboard navigation events
    document.addEventListener('keydown', function (ev) {
        var keyCode = ev.keyCode || ev.which;
        if (keyCode === 27 && isOpen) {
            toggleSearch(ev);
        }
    });
    var morphSearch_search = document.getElementsByClassName('morphsearch-search');
    $(".morphsearch-search").on('click', toggleSearch);

    /***** for demo purposes only: don't allow to submit the form *****/
    morphSearch.querySelector('button[type="submit"]').addEventListener('click', function (ev) {
        ev.preventDefault();
    });
})();
/* Search header end */

// toggle full screen
function toggleFullScreen() {
    var a = $(window).height() - 10;

    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        }
        else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
    else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

//light box
$(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

/* --------------------------------------------------------
        Color picker - demo only
        --------------------------------------------------------   */
(function () {
    $('<div class="selector-toggle"><a href="javascript:void(0)"></a></div><div class="style-cont"><ul><li><p class="selector-title main-title">FLAT ABLE CUSTOMIZER</p></li></ul><ul class="nav nav-tabs  tabs" role="tablist"><li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#sel-pos" role="tab">Position</a></li><li class="nav-item"><a class="nav-link" data-toggle="tab" href="#sel-lay" role="tab">Layout</a></li><li class="nav-item"><a class="nav-link" data-toggle="tab" href="#sel-sid" role="tab">Sidebar</a></li></ul><div class="tab-content tabs"><div class="tab-pane active" id="sel-pos" role="tabpanel"><ul><li class="theme-option"><div class="checkbox-fade fade-in-success"><label><input type="checkbox" value="false" id="sidebar-position" name="sidebar-position"><span class="cr"><i class="cr-icon icofont icofont-ui-check txt-success"></i></span><span>Fixed Sidebar Position</span></label></div></li><li class="theme-option"><div class="checkbox-fade fade-in-success"><label><input type="checkbox" value="false" id="header-position" name="header-position"><span class="cr"><i class="cr-icon icofont icofont-ui-check txt-success"></i></span><span>Fixed Header Position</span></label></div></li><li class="theme-option"><div class="checkbox-fade fade-in-success"><label><input type="checkbox" value="false" id="vertical-item-border" name="vertical-item-border"><span class="cr"><i class="cr-icon icofont icofont-ui-check txt-success"></i></span><span>Hide Item Border</span></label></div></li><li class="theme-option"><div class="checkbox-fade fade-in-success"><label><input type="checkbox" value="false" id="vertical-subitem-border" name="vertical-item-border"><span class="cr"><i class="cr-icon icofont icofont-ui-check txt-success"></i></span><span>Hide SubItem Border</span></label></div></li></ul></div><div class="tab-pane" id="sel-lay" role="tabpanel"><ul><li class="theme-option"><p class="sub-title">Page Layout</p><select id="theme-layout" class="form-control minimal input-sm"><option name="vertical-layout" value="wide">Wide layout</option><option name="vertical-layout" value="box">Boxed layout</option></select></li><li class="theme-option"><p class="sub-title">Navbar Placement</p><select id="vertical-navbar-placement" class="form-control minimal input-sm"><option name="navigation-side" value="left">Left</option><option name="navigation-side" value="right">Right</option></select></li></ul></div><div class="tab-pane" id="sel-sid" role="tabpanel"><ul><li class="theme-option"><p class="sub-title drp-title">SideBar Effect</p><select id="vertical-menu-effect" class="form-control minimal"><option name="vertical-menu-effect" value="shrink">shrink</option><option name="vertical-menu-effect" value="overlay">overlay</option><option name="vertical-menu-effect" value="push">Push</option></select></li><li class="theme-option"><p class="sub-title drp-title">Border Style</p><select id="vertical-border-style" class="form-control minimal"><option name="vertical-border-style" value="solid">Style 1</option><option name="vertical-border-style" value="dotted">Style 2</option><option name="vertical-border-style" value="dashed">Style 3</option><option name="vertical-border-style" value="none">No Border</option></select></li><li class="theme-option"><p class="sub-title drp-title">DropDown Icon</p><select id="vertical-dropdown-icon" class="form-control minimal"><option name="vertical-dropdown-icon" value="style1">Style 1</option><option name="vertical-dropdown-icon" value="style2">style 2</option><option name="vertical-dropdown-icon" value="style3">style 3</option></select></li><li class="theme-option"><p class="sub-title drp-title">Submenu Item Icon</p><select id="vertical-subitem-icon" class="form-control minimal"><option name="vertical-subitem-icon" value="style1">Style 1</option><option name="vertical-subitem-icon" value="style2">style 2</option><option name="vertical-subitem-icon" value="style3">style 3</option><option name="vertical-subitem-icon" value="style4">style 4</option><option name="vertical-subitem-icon" value="style5">style 5</option><option name="vertical-subitem-icon" value="style6">style 6</option></select></li></ul></div><ul><li><p class="selector-title">Navigator Option</p></li><li class="theme-option"><span class="selector-title">Menu Caption Color</span><div class="theme-color"><a href="#" class="leftheader-theme" lheader-theme="theme1">&nbsp;</a><a href="#" class="leftheader-theme" lheader-theme="theme2">&nbsp;</a><a href="#" class="leftheader-theme" lheader-theme="theme3">&nbsp;</a><a href="#" class="leftheader-theme" lheader-theme="theme4">&nbsp;</a><a href="#" class="leftheader-theme" lheader-theme="theme5">&nbsp;</a><a href="#" class="leftheader-theme" lheader-theme="theme6">&nbsp;</a></div></li><li class="theme-option"><span class="selector-title">Header Theme</span><div class="theme-color"><a href="#" class="header-theme" header-theme="theme1">&nbsp;</a><a href="#" class="header-theme" header-theme="theme2">&nbsp;</a><a href="#" class="header-theme" header-theme="theme3">&nbsp;</a><a href="#" class="header-theme" header-theme="theme4">&nbsp;</a><a href="#" class="header-theme" header-theme="theme5">&nbsp;</a><a href="#" class="header-theme" header-theme="theme6">&nbsp;</a></div></li><li class="theme-option"><span class="selector-title">left NavBar Theme</span><div class="theme-color"><a href="#" class="navbar-theme" navbar-theme="theme1">&nbsp;</a><a href="#" class="navbar-theme" navbar-theme="theme2">&nbsp;</a><a href="#" class="navbar-theme" navbar-theme="theme3">&nbsp;</a><a href="#" class="navbar-theme" navbar-theme="theme4">&nbsp;</a><a href="#" class="navbar-theme" navbar-theme="theme5">&nbsp;</a><a href="#" class="navbar-theme" navbar-theme="theme6">&nbsp;</a></div></li><li class="theme-option"><span class="selector-title">Active item Theme</span><div class="theme-color"><a href="#" class="active-item-theme" active-item-theme="theme1">&nbsp;</a><a href="#" class="active-item-theme" active-item-theme="theme2">&nbsp;</a><a href="#" class="active-item-theme" active-item-theme="theme3">&nbsp;</a><a href="#" class="active-item-theme" active-item-theme="theme4">&nbsp;</a><a href="#" class="active-item-theme" active-item-theme="theme5">&nbsp;</a><a href="#" class="active-item-theme" active-item-theme="theme6">&nbsp;</a></div></li><li class="theme-option"><span class="selector-title">Background Patterns</span><div class="theme-color"><a href="#" class="themebg-pattern" themebg-pattern="pattern1">&nbsp;</a><a href="#" class="themebg-pattern" themebg-pattern="pattern2">&nbsp;</a><a href="#" class="themebg-pattern" themebg-pattern="pattern3">&nbsp;</a><a href="#" class="themebg-pattern" themebg-pattern="pattern4">&nbsp;</a><a href="#" class="themebg-pattern" themebg-pattern="pattern5">&nbsp;</a><a href="#" class="themebg-pattern" themebg-pattern="pattern6">&nbsp;</a></div></li><li><p class="selector-title">Preset Color</p></li><li class="theme-option"><span class="selector-title"></span><div class="theme-color"><a href="#" class="color-1">&nbsp;</a><a href="#" class="color-2">&nbsp;</a><a href="#" class="color-3">&nbsp;</a><a href="#" class="color-4">&nbsp;</a><a href="#" class="color-5">&nbsp;</a><a href="#" class="color-6">&nbsp;</a></div></li></ul></div></div>').appendTo($('#styleSelector'));
})();

(function () {
    $('<div class="selector-toggle"><a href="javascript:void(0)"></a></div><div class="style-cont"><ul><li><p class="selector-title main-title">FLAT ABLE CUSTOMIZER</p></li></ul><ul class="nav nav-tabs  tabs" role="tablist"><li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#sel-pos" role="tab">Position</a></li><li class="nav-item"><a class="nav-link" data-toggle="tab" href="#sel-lay" role="tab">Layout</a></li><li class="nav-item"><a class="nav-link" data-toggle="tab" href="#sel-sid" role="tab">Sidebar</a></li></ul><div class="tab-content tabs"><div class="tab-pane active" id="sel-pos" role="tabpanel"><ul><li class="theme-option"><div class="checkbox-fade fade-in-success"><label><input type="checkbox" value="false" id="sidebar-position" name="sidebar-position"><span class="cr"><i class="cr-icon icofont icofont-ui-check txt-success"></i></span><span>Fixed Sidebar Position</span></label></div></li><li class="theme-option"><div class="checkbox-fade fade-in-success"><label><input type="checkbox" value="false" id="header-position" name="header-position"><span class="cr"><i class="cr-icon icofont icofont-ui-check txt-success"></i></span><span>Fixed Header Position</span></label></div></li><li class="theme-option"><div class="checkbox-fade fade-in-success"><label><input type="checkbox" value="false" id="vertical-item-border" name="vertical-item-border"><span class="cr"><i class="cr-icon icofont icofont-ui-check txt-success"></i></span><span>Hide Item Border</span></label></div></li><li class="theme-option"><div class="checkbox-fade fade-in-success"><label><input type="checkbox" value="false" id="vertical-subitem-border" name="vertical-item-border"><span class="cr"><i class="cr-icon icofont icofont-ui-check txt-success"></i></span><span>Hide SubItem Border</span></label></div></li></ul></div><div class="tab-pane" id="sel-lay" role="tabpanel"><ul><li class="theme-option"><p class="sub-title">Page Layout</p><select id="theme-layout" class="form-control minimal input-sm"><option name="vertical-layout" value="wide">Wide layout</option><option name="vertical-layout" value="box">Boxed layout</option></select></li><li class="theme-option"><p class="sub-title">Navbar Placement</p><select id="vertical-navbar-placement" class="form-control minimal input-sm"><option name="navigation-side" value="left">Left</option><option name="navigation-side" value="right">Right</option></select></li></ul></div><div class="tab-pane" id="sel-sid" role="tabpanel"><ul><li class="theme-option"><p class="sub-title drp-title">SideBar Effect</p><select id="vertical-menu-effect" class="form-control minimal"><option name="vertical-menu-effect" value="shrink">shrink</option><option name="vertical-menu-effect" value="overlay">overlay</option><option name="vertical-menu-effect" value="push">Push</option></select></li><li class="theme-option"><p class="sub-title drp-title">Border Style</p><select id="vertical-border-style" class="form-control minimal"><option name="vertical-border-style" value="solid">Style 1</option><option name="vertical-border-style" value="dotted">Style 2</option><option name="vertical-border-style" value="dashed">Style 3</option><option name="vertical-border-style" value="none">No Border</option></select></li><li class="theme-option"><p class="sub-title drp-title">DropDown Icon</p><select id="vertical-dropdown-icon" class="form-control minimal"><option name="vertical-dropdown-icon" value="style1">Style 1</option><option name="vertical-dropdown-icon" value="style2">style 2</option><option name="vertical-dropdown-icon" value="style3">style 3</option></select></li><li class="theme-option"><p class="sub-title drp-title">Submenu Item Icon</p><select id="vertical-subitem-icon" class="form-control minimal"><option name="vertical-subitem-icon" value="style1">Style 1</option><option name="vertical-subitem-icon" value="style2">style 2</option><option name="vertical-subitem-icon" value="style3">style 3</option><option name="vertical-subitem-icon" value="style4">style 4</option><option name="vertical-subitem-icon" value="style5">style 5</option><option name="vertical-subitem-icon" value="style6">style 6</option></select></li></ul></div><ul><li><p class="selector-title">Navigator Option</p></li><li class="theme-option"><span class="selector-title">Menu Caption Color</span><div class="theme-color"><a href="#" class="leftheader-theme" lheader-theme="theme1">&nbsp;</a><a href="#" class="leftheader-theme" lheader-theme="theme2">&nbsp;</a><a href="#" class="leftheader-theme" lheader-theme="theme3">&nbsp;</a><a href="#" class="leftheader-theme" lheader-theme="theme4">&nbsp;</a><a href="#" class="leftheader-theme" lheader-theme="theme5">&nbsp;</a><a href="#" class="leftheader-theme" lheader-theme="theme6">&nbsp;</a></div></li><li class="theme-option"><span class="selector-title">Header Theme</span><div class="theme-color"><a href="#" class="header-theme" header-theme="theme1">&nbsp;</a><a href="#" class="header-theme" header-theme="theme2">&nbsp;</a><a href="#" class="header-theme" header-theme="theme3">&nbsp;</a><a href="#" class="header-theme" header-theme="theme4">&nbsp;</a><a href="#" class="header-theme" header-theme="theme5">&nbsp;</a><a href="#" class="header-theme" header-theme="theme6">&nbsp;</a></div></li><li class="theme-option"><span class="selector-title">left NavBar Theme</span><div class="theme-color"><a href="#" class="navbar-theme" navbar-theme="theme1">&nbsp;</a><a href="#" class="navbar-theme" navbar-theme="theme2">&nbsp;</a><a href="#" class="navbar-theme" navbar-theme="theme3">&nbsp;</a><a href="#" class="navbar-theme" navbar-theme="theme4">&nbsp;</a><a href="#" class="navbar-theme" navbar-theme="theme5">&nbsp;</a><a href="#" class="navbar-theme" navbar-theme="theme6">&nbsp;</a></div></li><li class="theme-option"><span class="selector-title">Active item Theme</span><div class="theme-color"><a href="#" class="active-item-theme" active-item-theme="theme1">&nbsp;</a><a href="#" class="active-item-theme" active-item-theme="theme2">&nbsp;</a><a href="#" class="active-item-theme" active-item-theme="theme3">&nbsp;</a><a href="#" class="active-item-theme" active-item-theme="theme4">&nbsp;</a><a href="#" class="active-item-theme" active-item-theme="theme5">&nbsp;</a><a href="#" class="active-item-theme" active-item-theme="theme6">&nbsp;</a></div></li><li class="theme-option"><span class="selector-title">Background Patterns</span><div class="theme-color"><a href="#" class="themebg-pattern" themebg-pattern="pattern1">&nbsp;</a><a href="#" class="themebg-pattern" themebg-pattern="pattern2">&nbsp;</a><a href="#" class="themebg-pattern" themebg-pattern="pattern3">&nbsp;</a><a href="#" class="themebg-pattern" themebg-pattern="pattern4">&nbsp;</a><a href="#" class="themebg-pattern" themebg-pattern="pattern5">&nbsp;</a><a href="#" class="themebg-pattern" themebg-pattern="pattern6">&nbsp;</a></div></li><li><p class="selector-title">Preset Color</p></li><li class="theme-option"><span class="selector-title"></span><div class="theme-color"><a href="#" class="color-1">&nbsp;</a><a href="#" class="color-2">&nbsp;</a><a href="#" class="color-3">&nbsp;</a><a href="#" class="color-4">&nbsp;</a><a href="#" class="color-5">&nbsp;</a><a href="#" class="color-6">&nbsp;</a></div></li></ul></div></div>').appendTo($('#commentsSideView'));
})();

/*Gradient Color*/
/* --------------------------------------------------------
        view comment - ATR Application
        --------------------------------------------------------   */
(function () {
    $('<div class="selector-toggle"><a href="javascript:void(0)">' +
          '</a></div><div class="style-cont">' +
          '<ul>' +
          '<li>' +
          '<p class="selector-title main-title">Comments</p>' +
          '</li>' +
          '</ul>' +
          '<ul class="nav nav-tabs  tabs" role="tablist">' +
          '<li class="nav-item">' +
          '<a class="nav-link active" data-toggle="tab" href="#sel-pos" role="tab">Position</a>' +
          '</li>' +
          '<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#sel-lay" role="tab">Layout</a>' +
          '</li>' +
          '<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#sel-sid" role="tab">Sidebar</a>' +
          '</li>' +
          '</ul>' +
          '<div class="tab-content tabs">' +
          '<div class="tab-pane active" id="sel-pos" role="tabpanel">' +
          '<ul>' +
          '<li class="theme-option">' +
          '<div class="checkbox-fade fade-in-success">' +
          '<label>' +
          '<input type="checkbox" value="false" id="sidebar-position" name="sidebar-position">' +
          '<span class="cr"><i class="cr-icon icofont icofont-ui-check txt-success"></i></span>' +
          '<span>Fixed Sidebar Position</span></label></div></li>' +
          '<li class="theme-option">' +
          '<div class="checkbox-fade fade-in-success"><label>' +
          '<input type="checkbox" value="false" id="header-position" name="header-position">' +
          '<span class="cr"><i class="cr-icon icofont icofont-ui-check txt-success"></i>' +
          '</span><span>Fixed Header Position</span></label></div></li>' +
          '<li class="theme-option"><div class="checkbox-fade fade-in-success">' +
          '<label><input type="checkbox" value="false" id="vertical-item-border" name="vertical-item-border">' +
          '<span class="cr"><i class="cr-icon icofont icofont-ui-check txt-success"></i>' +
          '</span><span>Hide Item Border</span></label></div></li><li class="theme-option">' +
          '<div class="checkbox-fade fade-in-success">' +
          '<label><input type="checkbox" value="false" id="vertical-subitem-border" name="vertical-item-border">' +
          '<span class="cr"><i class="cr-icon icofont icofont-ui-check txt-success"></i></span>' +
          '<span>Hide SubItem Border</span></label></div></li></ul></div>' +
          '<div class="tab-pane" id="sel-lay" role="tabpanel">' +
          '<ul><li class="theme-option">' +
          '<p class="sub-title">Page Layout</p>' +
          '<select id="theme-layout" class="form-control minimal input-sm">' +
          '<option name="vertical-layout" value="wide">Wide layout</option>' +
          '<option name="vertical-layout" value="box">Boxed layout</option>' +
          '</select></li>' +
          '<li class="theme-option">' +
          '<p class="sub-title">Navbar Placement</p>' +
          '<select id="vertical-navbar-placement" class="form-control minimal input-sm">' +
          '<option name="navigation-side" value="left">Left</option>' +
          '<option name="navigation-side" value="right">Right</option></select></li></ul></div>' +
          '<div class="tab-pane" id="sel-sid" role="tabpanel"><ul>' +
          '<li class="theme-option"><p class="sub-title drp-title">SideBar Effect</p>' +
          '<select id="vertical-menu-effect" class="form-control minimal">' +
          '<option name="vertical-menu-effect" value="shrink">shrink</option>' +
          '<option name="vertical-menu-effect" value="overlay">overlay</option>' +
          '<option name="vertical-menu-effect" value="push">Push</option></select></li>' +
          '<li class="theme-option"><p class="sub-title drp-title">Border Style</p>' +
          '<select id="vertical-border-style" class="form-control minimal">' +
          '<option name="vertical-border-style" value="solid">Style 1</option>' +
          '<option name="vertical-border-style" value="dotted">Style 2</option>' +
          '<option name="vertical-border-style" value="dashed">Style 3</option>' +
          '<option name="vertical-border-style" value="none">No Border</option></select></li>' +
          '<li class="theme-option"><p class="sub-title drp-title">DropDown Icon</p>' +
          '<select id="vertical-dropdown-icon" class="form-control minimal">' +
          '<option name="vertical-dropdown-icon" value="style1">Style 1</option>' +
          '<option name="vertical-dropdown-icon" value="style2">style 2</option>' +
          '<option name="vertical-dropdown-icon" value="style3">style 3</option>' +
          '</select></li><li class="theme-option"><p class="sub-title drp-title">Submenu Item Icon</p>' +
          '<select id="vertical-subitem-icon" class="form-control minimal">' +
          '<option name="vertical-subitem-icon" value="style1">Style 1</option>' +
          '<option name="vertical-subitem-icon" value="style2">style 2</option>' +
          '<option name="vertical-subitem-icon" value="style3">style 3</option>' +
          '<option name="vertical-subitem-icon" value="style4">style 4</option>' +
          '<option name="vertical-subitem-icon" value="style5">style 5</option>' +
          '<option name="vertical-subitem-icon" value="style6">style 6</option>' +
          '</select></li></ul></div><ul><li><p class="selector-title">Navigator Option</p></li>' +
          '<li class="theme-option"><span class="selector-title">Menu Caption Color</span>' +
          '<div class="theme-color"><a href="#" class="leftheader-theme" lheader-theme="theme1">&nbsp;</a>' +
          '<a href="#" class="leftheader-theme" lheader-theme="theme2">&nbsp;</a>' +
          '<a href="#" class="leftheader-theme" lheader-theme="theme3">&nbsp;</a>' +
          '<a href="#" class="leftheader-theme" lheader-theme="theme4">&nbsp;</a>' +
          '<a href="#" class="leftheader-theme" lheader-theme="theme5">&nbsp;</a>' +
          '<a href="#" class="leftheader-theme" lheader-theme="theme6">&nbsp;</a>' +
          '</div></li><li class="theme-option"><span class="selector-title">Header Theme</span>' +
          '<div class="theme-color"><a href="#" class="header-theme" header-theme="theme1">&nbsp;</a>' +
          '<a href="#" class="header-theme" header-theme="theme2">&nbsp;</a>' +
          '<a href="#" class="header-theme" header-theme="theme3">&nbsp;</a>' +
          '<a href="#" class="header-theme" header-theme="theme4">&nbsp;</a>' +
          '<a href="#" class="header-theme" header-theme="theme5">&nbsp;</a>' +
          '<a href="#" class="header-theme" header-theme="theme6">&nbsp;</a>' +
          '</div></li><li class="theme-option"><span class="selector-title">left NavBar Theme</span>' +
          '<div class="theme-color"><a href="#" class="navbar-theme" navbar-theme="theme1">&nbsp;</a>' +
          '<a href="#" class="navbar-theme" navbar-theme="theme2">&nbsp;</a>' +
          '<a href="#" class="navbar-theme" navbar-theme="theme3">&nbsp;</a>' +
          '<a href="#" class="navbar-theme" navbar-theme="theme4">&nbsp;</a>' +
          '<a href="#" class="navbar-theme" navbar-theme="theme5">&nbsp;</a>' +
          '<a href="#" class="navbar-theme" navbar-theme="theme6">&nbsp;</a>' +
          '</div></li><li class="theme-option"><span class="selector-title">' +
          'Active item Theme</span><div class="theme-color">' +
          '<a href="#" class="active-item-theme" active-item-theme="theme1">&nbsp;</a>' +
          '<a href="#" class="active-item-theme" active-item-theme="theme2">&nbsp;</a>' +
          '<a href="#" class="active-item-theme" active-item-theme="theme3">&nbsp;</a>' +
          '<a href="#" class="active-item-theme" active-item-theme="theme4">&nbsp;</a>' +
          '<a href="#" class="active-item-theme" active-item-theme="theme5">&nbsp;</a>' +
          '<a href="#" class="active-item-theme" active-item-theme="theme6">&nbsp;</a>' +
          '</div></li><li class="theme-option"><span class="selector-title">Background Patterns</span>' +
          '<div class="theme-color"><a href="#" class="themebg-pattern" themebg-pattern="pattern1">&nbsp;</a>' +
          '<a href="#" class="themebg-pattern" themebg-pattern="pattern2">&nbsp;</a>' +
          '<a href="#" class="themebg-pattern" themebg-pattern="pattern3">&nbsp;</a>' +
          '<a href="#" class="themebg-pattern" themebg-pattern="pattern4">&nbsp;</a>' +
          '<a href="#" class="themebg-pattern" themebg-pattern="pattern5">&nbsp;</a>' +
          '<a href="#" class="themebg-pattern" themebg-pattern="pattern6">&nbsp;</a>' +
          '</div></li><li><p class="selector-title">Preset Color</p></li><li class="theme-option">' +
          '<span class="selector-title"></span><div class="theme-color"><a href="#" class="color-1">&nbsp;</a>' +
          '<a href="#" class="color-2">&nbsp;</a><a href="#" class="color-3">&nbsp;</a>' +
          '<a href="#" class="color-4">&nbsp;</a><a href="#" class="color-5">&nbsp;</a>' +
          '<a href="#" class="color-6">&nbsp;</a></div></li></ul></div></div>').appendTo($('#commentsSideView'));
})();


// Extend jquery to add an exists method to check if the selector matches any elements
$.fn.exists = function () {
    return this.length !== 0;
};


