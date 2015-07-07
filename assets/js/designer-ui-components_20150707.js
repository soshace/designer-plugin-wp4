var designerUI = {
    activeTab: null,
    productColorPicker: null,
    textFillColorPicker: null,
    textStrokeColorPicker: null,
    textForm:null,
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
        if (designerUI.activeTab && designerUI.activeTab.length) {
            designerUI.activeTab.next('.dropdown-menu').hide();
            designerUI.activeTab.parent().removeClass('open');
            designerUI.activeTab = null;
        }        
        jQuery('#designer-main-menu').removeClass('collapsed');
    },

    showTextForm: function () {
        designerUI.closeActiveTab();

        if (designerUI.textForm && designerUI.activeTab != designerUI.textForm.prev()) {
            designerUI.activeTab = designerUI.textForm.prev();
            designerUI.activeTab.next('.dropdown-menu').show();
            designerUI.activeTab.parent().addClass('open');
            jQuery('#designer-main-menu').addClass('collapsed');
            
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
        deUI.productColorPicker.colorPicker({ container: jQuery('#product-color-btn'), isDropup: true, gap: 2 });

        deUI.textFillColorPicker = jQuery('#text-fill-color-picker');
        deUI.textFillColorPicker.colorPicker({gap: 2});

        deUI.textStrokeColorPicker = jQuery('#text-stroke-color-picker');
        deUI.textStrokeColorPicker.colorPicker({gap: 2});

        deUI.graphicsColorPicker = jQuery('#graphics-color-picker');
        deUI.graphicsColorPicker.colorPicker({ gap: 2 });

        deUI.graphicsStrokeColorPicker = jQuery('#graphics-stroke-picker');
        deUI.graphicsStrokeColorPicker.colorPicker({ gap: 2 });

        deUI.graphicsFillColorPicker = jQuery('#graphics-fill-color-picker');
        deUI.graphicsFillColorPicker.colorPicker({ gap: 2, container: deUI.graphicsFillColorPicker.parent(), isDropup: true });

        deUI.graphicsStrokeColorPicker = jQuery('#graphics-stroke-color-picker');
        deUI.graphicsStrokeColorPicker.colorPicker({ gap: 2, container: deUI.graphicsStrokeColorPicker.parent(), isDropup: true });

        deUI.textFillColorPicker2 = jQuery('#text-fill-color-picker-2');
        deUI.textFillColorPicker2.colorPicker({ gap: 2, container: deUI.textFillColorPicker2.parent(), isDropup: true });

        deUI.textStrokeColorPicker2 = jQuery('#text-stroke-color-picker-2');
        deUI.textStrokeColorPicker2.colorPicker({ gap: 2, container: deUI.textStrokeColorPicker2.parent(), isDropup: true });

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
    jQuery('#option-tab a').click(function (e) {
        e.preventDefault();
        jQuery(this).tab('show');
    });

    //tab control
    var activeTab;

    jQuery('#designer-main-menu > .designer-dropdown > a').click(function (e) {
        if (designerUI.activeTab && designerUI.activeTab.length) {
            designerUI.activeTab.next('.dropdown-menu').hide();
            designerUI.activeTab.parent().removeClass('open');
        }

        if (designerUI.activeTab && designerUI.activeTab.is(e.currentTarget)) {
            jQuery('#designer-main-menu').removeClass('collapsed');
            designerUI.activeTab = null;
        } else {
            jQuery('#designer-main-menu').addClass('collapsed');
            designerUI.activeTab = jQuery(e.currentTarget);
            designerUI.activeTab.parent().addClass('open');
            designerUI.activeTab.next('.dropdown-menu').show();
            if (jQuery('#add-text').hasClass("open")) {
                designerUI.setFocusToTextTab();
            }
        }
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
});

/* Alert */

designer_alert = function () { };

designer_alert.show = function (message) {
    jQuery('#designer-alert-message').text(message);
    jQuery('#designer-alert-popup').modal('show');
}

/* Alert end */
