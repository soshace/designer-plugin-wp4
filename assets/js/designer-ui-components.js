var designerUI = {
    productColorPicker: null,
    textFillColorPicker: null,
    activeTabName: null,
    textStrokeColorPicker: null,
    textForm: null,
    textFillColorPicker2: null,
    textStrokeColorPicker2: null,
    productsGallery: null,
    productCategories: null,
    graphicsGallery: null,
    graphicsCategories: null,
    graphicsFillColorPicker: null,
    graphicsStrokeColorPicker: null,
    productDimensionsWidth: null,
    productDimensionsHeight: null,


    closeActiveTab: function () {
        var activeTabName = designerUI.activeTabName,
            $activeTab;

        if (typeof activeTabName === 'string') {
            $activeTab = $('#' + activeTabName);
            $('.js-designer-tab.active').removeClass('active');
            $activeTab.addClass('hide');
            designerUI.activeTabName = null;
        }
    },

    openTab: function (tabName) {
        console.log('open tab');
        var $activeTab;

        this.closeActiveTab();

        designerUI.activeTabName = tabName;
        $activeTab = $('#' + tabName);
        $activeTab.removeClass('hide');
        $('.js-designer-tab[href="' + tabName + '"]').addClass('active');
    },

    showTextForm: function () {
        designerUI.closeActiveTab();

        if (designerUI.textForm && designerUI.activeTab != designerUI.textForm.prev()) {
            designerUI.activeTab = designerUI.textForm.prev();
            designerUI.activeTab.next('.dropdown-menu').show();
            designerUI.activeTab.parent().addClass('open');

            this.setFocusToTextTab();
        }
    },

    setFocusToTextTab: function () {
        if (jQuery('#add-text').hasClass("open")) {
            //set focus
            if (jQuery("#add-text-input").is(':visible')) {
                setTimeout(function () {
                    jQuery("#add-text-input").focus();
                }, 0);
            } else if (jQuery("#edit-text-input").is(':visible')) {
                setTimeout(function () {
                    jQuery("#edit-text-input").focus();
                }, 0);
            }
        }
    },

    createColorPickers: function () {
        var deUI = designerUI;
        deUI.productColorPicker = jQuery('#product-color-picker');
        deUI.productColorPicker.colorPicker({container: jQuery('#product-color-btn'), isDropup: true, gap: 2});

        deUI.textFillColorPicker = jQuery('#text-fill-color-picker');
        deUI.textFillColorPicker.colorPicker({gap: 2});

        deUI.textStrokeColorPicker = jQuery('#text-stroke-color-picker');
        deUI.textStrokeColorPicker.colorPicker({gap: 2});

        deUI.graphicsColorPicker = jQuery('#graphics-color-picker');
        deUI.graphicsColorPicker.colorPicker({gap: 2});

        deUI.graphicsStrokeColorPicker = jQuery('#graphics-stroke-picker');
        deUI.graphicsStrokeColorPicker.colorPicker({gap: 2});

        deUI.graphicsFillColorPicker = jQuery('#graphics-fill-color-picker');
        deUI.graphicsFillColorPicker.colorPicker({
            gap: 2,
            container: deUI.graphicsFillColorPicker.parent(),
            isDropup: true
        });

        deUI.graphicsStrokeColorPicker = jQuery('#graphics-stroke-color-picker');
        deUI.graphicsStrokeColorPicker.colorPicker({
            gap: 2,
            container: deUI.graphicsStrokeColorPicker.parent(),
            isDropup: true
        });

        deUI.textFillColorPicker2 = jQuery('#text-fill-color-picker-2');
        deUI.textFillColorPicker2.colorPicker({gap: 2, container: deUI.textFillColorPicker2.parent(), isDropup: true});

        deUI.textStrokeColorPicker2 = jQuery('#text-stroke-color-picker-2');
        deUI.textStrokeColorPicker2.colorPicker({
            gap: 2,
            container: deUI.textStrokeColorPicker2.parent(),
            isDropup: true
        });

        //to force toggling color palette when clicking on button in bar
        deUI.productColorPicker.parent().click(function (e) {
            deUI.productColorPicker.next('div.colorPicker-picker').click();
        });
        //stop event propagation to avoid cycling
        deUI.productColorPicker.next('div.colorPicker-picker').click(function (e) {
            e.stopPropagation();
        });

        deUI.graphicsFillColorPicker.parent().click(function (e) {
            deUI.graphicsFillColorPicker.next('div.colorPicker-picker').click();
        });
        deUI.graphicsFillColorPicker.next('div.colorPicker-picker').click(function (e) {
            e.stopPropagation();
        });

        deUI.graphicsStrokeColorPicker.parent().click(function (e) {
            deUI.graphicsStrokeColorPicker.next('div.colorPicker-picker').click();
        });
        deUI.graphicsStrokeColorPicker.next('div.colorPicker-picker').click(function (e) {
            e.stopPropagation();
        });

        deUI.textFillColorPicker2.parent().click(function (e) {
            deUI.textFillColorPicker2.next('div.colorPicker-picker').click();
        });
        deUI.textFillColorPicker2.next('div.colorPicker-picker').click(function (e) {
            e.stopPropagation();
        });

        deUI.textStrokeColorPicker2.parent().click(function (e) {
            deUI.textStrokeColorPicker2.next('div.colorPicker-picker').click();
        });
        deUI.textStrokeColorPicker2.next('div.colorPicker-picker').click(function (e) {
            e.stopPropagation();
        });
    }
}

jQuery(function () {

    $('meta[name=viewport]').attr('content', 'width=device-width');
    /*var window_width = $(window).width();
    if (window_width > 768) {
        $('meta[name=viewport]').attr('content', 'width=device-width');
    } else {
        $('meta[name=viewport]').attr('content', 'width=320');
    }*/

    jQuery('#option-tab a').click(function (e) {
        e.preventDefault();
        jQuery(this).tab('show');
    });

    function initializeTabs() {
        var $activeTab = $('.js-designer-tab.active');

        if ($activeTab.length) {
            setActiveTab($activeTab.attr('href'));
        }
    }

    function setActiveTab(tabName) {
        designerUI.activeTabName = tabName;
    }

    function getActiveTab() {
        return $('#' + designerUI.activeTabName);
    }

    /*function changeColorCarouselView(tabName) {
        var $textTemplate = $('#color-group-text'),
            $productsTemplate = $('#color-group-products');

        if (tabName === 'text-tab') {
            $textTemplate.removeClass('hide');
            $productsTemplate.addClass('hide');
            return;
        }

        $textTemplate.addClass('hide');
        $productsTemplate.removeClass('hide');
    }*/

    $('.js-designer-tab').on('click', function (event) {
        var $this = $(this),
            tabName = $this.attr('href');

        event.preventDefault();

        if (designerUI.activeTabName === tabName) {
            return;
        }

        $('.js-designer-tab.active').removeClass('active');
        $this.addClass('active');

        if (typeof designerUI.activeTabName === 'string') {
            getActiveTab().addClass('hide');
            //changeColorCarouselView(tabName);
        }

        //-----to apply css in dependence of which tab is opened
        var left_column = $('.left-column');
        var right_column = $('.right-column');
        left_column.removeClass('active-' + designerUI.activeTabName);
        right_column.removeClass('active-' + designerUI.activeTabName);
        //-----

        setActiveTab(tabName);
        getActiveTab().removeClass('hide');

        //-----
        left_column.addClass('active-' + designerUI.activeTabName);
        right_column.addClass('active-' + designerUI.activeTabName);
        controlsModel.currentTab(designerUI.activeTabName);
        //-----
    });

    jQuery('#designer-main-menu > .designer-dropdown > .dropdown-menu > .designer-dropdown-form-header > .designer-close-window-btn').click(function (e) {
        designerUI.closeActiveTab();
    });

    jQuery.fn.colorPicker.defaults.colors = ['000', 'fff'];
    designerUI.createColorPickers();
    designerUI.textForm = jQuery('#add-text-form');
    designerUI.productCategories = jQuery('#designer-product-categories');
    designerUI.productsGallery = jQuery('#designer-product-gallery');
    designerUI.productsGallery.hide();
    designerUI.graphicsCategories = jQuery('#designer-graphics-categories');
    designerUI.graphicsGallery = jQuery('#designer-graphics-gallery');
    designerUI.graphicsGallery.hide();

    //for validation
    designerUI.productDimensionsWidth = jQuery('#productDimensionsWidth');
    designerUI.productDimensionsHeight = jQuery('#productDimensionsHeight');

    //jager: hack for names-numbers sizes dropdown menu
    var dropdownList;

    var modalHandler = function (e) {
        var target = jQuery(e.target);
        var dropdownToggle = dropdownList.prev('.dropdown-toggle');
        var btnGroup = dropdownList.parent();

        if (dropdownToggle.find(target).length > 0 || (!btnGroup.hasClass('open') && dropdownToggle.is(target))) return;
        dropdownList.hide();
        jQuery('body').unbind('click', modalHandler);
    }

    jQuery('#names-number-table').delegate('.designer-names-numbers-size > .dropdown-toggle', 'click', function (e) {
        dropdownList = jQuery(this).next('.dropdown-menu');
        var position = jQuery(this).prev('.btn').offset();
        position.top += (jQuery(this).outerHeight() + 2);
        dropdownList.css('position', 'fixed');
        dropdownList.show();
        dropdownList.offset(position);
        jQuery('body').click(modalHandler);
    });

    //jager: format names-numbers buttons handlers
    var formatNamesNumbersHandler = function () {
        designerUI.activeTab.next('.dropdown-menu').hide();
        designerUI.activeTab.parent().removeClass('open');
        designerUI.activeTab = jQuery('#add-text').children('a:first');
        designerUI.activeTab.parent().addClass('open');
        designerUI.activeTab.next('.dropdown-menu').show();
    }

    jQuery('#format-names-btn').click(formatNamesNumbersHandler);
    jQuery('#format-numbers-btn').click(formatNamesNumbersHandler);

    initializeTabs();

    //-----
    $('.js-ellipsis-menu').on('click', function (event) {

        event.preventDefault();
        $('.bottom-menu__ellipsis').toggleClass('hide');
        $('.bottom-menu__main').toggleClass('hide');

    });

    $('.js-graphics-upload-agreement').on('click', function (event) {

        event.preventDefault();
        if (controlsModel.colorsTabFormsState() === 'agreementForm') {
            controlsModel.colorsTabFormsState('addForm');
        } else {
            controlsModel.colorsTabFormsState('agreementForm');
        }

    });

    $('.js-graphics-upload-form').on('click', function (event) {

        event.preventDefault();
        if (!$(this).hasClass("disabled")) {
            if (controlsModel.colorsTabFormsState() === 'uploadForm') {
                controlsModel.colorsTabFormsState('addForm');
            } else {
                controlsModel.colorsTabFormsState('uploadForm');
            }
        }
    });

    $('.js-order-sheet-form').on('click', function (event) {

        event.preventDefault();
        $('.left-column').toggleClass('active-order-sheet');
        $('#order-sheet-form').toggleClass('hide');
        $('.numbers-tab-controls').toggleClass('hide');

    });

    $('.js-graphics-color-form').on('click', function (event) {

        event.preventDefault();
        hideGraphicsColorForm();

    });

    $('.js-close-overlay-form').on('click', function (event) {

        event.preventDefault();
        $('a[href="colors-tab"]').trigger('click');

    });

    $("#colors-palette-carousel").swipe( {
        //Generic swipe handler for all directions
        swipeLeft: function(event, direction, distance, duration, fingerCount) {
            $('#colors-palette-carousel').carousel('prev');
        },
        swipeRight: function() {
            $('#colors-palette-carousel').carousel('next');
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 10,
        excludedElements: "button, input, select, textarea, .noSwipe",
        preventDefaultEvents: false
    });

    function isIOS() {
        return /iPad|iPhone|iPod/i.test(navigator.userAgent);
    }

    if (isIOS()) {
        var $link = $('<link/>').attr('rel', 'stylesheet').attr('href', '/~zemsapparel/wp-content/plugins/designer/assets/css/style-ios.css');
        $('head').append($link)
    }


    //----- hack to reset colors when graphics element resized or rotated.
    //This is because when object is resized it is recreated
    //and colors palette refers to wrong old object
    /*$('#canvas-container').on('mousedown', function (event) {
        controlsModel.resetColorsSelection();
    });

    $('#canvas-container').on('touchstart', function (event) {
        controlsModel.resetColorsSelection();
    });*/
    //-----

    var resizeTimeout;
    function throttler() {

        // ignore resize events as long as an actualResizeHandler execution is in the queue
        if ( !resizeTimeout ) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                onResize();
                // The actualResizeHandler will execute at a rate of 15fps
            }, 66);
        }

    }

    //Restore svg viewBox when svg element is resized. Needed for mobile version.
    var canvasScale = 1;
    function onResize() {

        if ($(window).width() <= 767 && controlsModel.isMobile() === false) {
            controlsModel.isMobile(true);
        } else if ($(window).width() > 767 && controlsModel.isMobile() === true) {
            controlsModel.isMobile(false);
        }

        if ($(window).width() < 768) {
            if (canvasScale !== 0.545145) {
                canvasScale = 0.545145;
                DEJS.Util.canvasScale = canvasScale;
            }

        } else if ($(window).width() > 1024) {
            if (canvasScale !== 1) {
                canvasScale = 1;
                DEJS.Util.canvasScale = canvasScale;
            }
        } else {
            if (canvasScale !== 0.722317) {
                canvasScale = 0.722317;
                DEJS.Util.canvasScale = canvasScale;
            }
        }

        /*var $svg = $('#canvas-container > div > svg:first-child');
        if ($svg[0]) {
            $svg.each(function () {
                if ($(this)[0].getAttribute('viewBox') !== '0 0 587 543') {
                    //Can't use jQuery attr because of incorrect working with viewBox attribute
                    $(this)[0].setAttribute('viewBox', '0 0 587 543');
                }
            });
        }*/

    }

    $(window).bind('resize', function () {
        controlsModel.windowWidth($(window).width());
        throttler();
    });

    $(document).bind('DOMSubtreeModified', function () {
        throttler();
    });

    //-----
});

/* Alert */

designer_alert = function () {
};

designer_alert.show = function (message) {
    jQuery('#designer-alert-message').text(message);
    jQuery('#designer-alert-popup').modal('show');
};

/* Alert end */
