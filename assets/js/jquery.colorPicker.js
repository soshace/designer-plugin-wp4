/**
 * Really Simple Color Picker in jQuery
 *
 * Licensed under the MIT (MIT-LICENSE.txt) licenses.
 *
 * Copyright (c) 2008-2012
 * Lakshan Perera (www.laktek.com) & Daniel Lacy (daniellacy.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/**
 * Modified by Andrii Pavlosiuk
 */

(function (jQuery) {
    /**
     * Create a couple private variables.
    **/
    var selectorOwner,
        activePalette,
        cItterate = 0,
        templates = {
            control: jQuery('<div class="colorPicker-picker">&nbsp;</div>'),
            palette: jQuery('<div id="colorPicker_palette" class="colorPicker-palette" />'),
            swatch: jQuery('<div class="colorPicker-swatch">&nbsp;</div>')
        },
        transparent = "none",
        maxColorsNumber = 35,
        lastColor;

    /**
     * Create our colorPicker function
    **/
    jQuery.fn.colorPicker = function (options) {

        return this.each(function () {
            // Setup time. Clone new elements from our templates, set some IDs, make shortcuts, jazzercise.
            var element = jQuery(this),
                opts = jQuery.extend({}, jQuery.fn.colorPicker.defaults, options),
                defaultColor = jQuery.fn.colorPicker.toHex(
                        (element.val().length > 0) ? element.val() : opts.pickerDefault
                    ),
                newControl = templates.control.clone(),
                paletteId = element.attr("id") + '-palette';


            /**
             * Build a color palette.
            **/
            jQuery.fn.colorPicker.createPalette(paletteId, opts.colors);


            /**
             * Build replacement interface for original color input.
            **/
            newControl.css("background-color", defaultColor);

            newControl.bind("click", function () {
                if (element.is(':not(:disabled)')) {
                    jQuery.fn.colorPicker.togglePalette(jQuery('#' + paletteId), jQuery(this));
                }
            });

            if (options && options.onColorChange) {
                newControl.data('onColorChange', options.onColorChange);
            } else {
                newControl.data('onColorChange', function () { });
            }
            if (options && options.container) {
                newControl.data('container', options.container);
            } else {
                newControl.data('container', null);
            }
            if (options && options.isDropup) {
                newControl.data('isDropup', true);
            } else {
                newControl.data('isDropup', false);
            }
            if (options && options.gap) {
                newControl.data('gap', options.gap);
            } else {
                newControl.data('gap', 1);
            }
            element.after(newControl);

            element.bind("change", function () {
                element.next(".colorPicker-picker").css(
                    "background-color", jQuery.fn.colorPicker.toHex(jQuery(this).val())
                );
            });

            // Hide the original input.
            element.val(defaultColor).hide();

            cItterate++;
        });
    };

    /**
     * Extend colorPicker with... all our functionality.
    **/
    jQuery.extend(true, jQuery.fn.colorPicker, {
        createPalette: function (paletteId, colors) {
            var newPalette = templates.palette.clone().attr('id', paletteId),
                swatch;

            var onlyTrasparent = false; // if only trasparent color in list - is't background color picker
            if (colors && colors.length === 1) {
                onlyTrasparent = (colors[0] === transparent);
            }

            if (colors && colors.length > 0 && !onlyTrasparent) {

            jQuery.each(colors, function (i) {
                swatch = templates.swatch.clone();
                swatch.addClass('tooltipster');

                if (colors[i] === transparent || this.value === transparent) {
                    swatch.addClass('transparent');
                    if (this.name)
                        swatch.attr("title", this.name);
                    jQuery.fn.colorPicker.bindPalette(swatch, transparent);
                } else {
                    swatch.css("background-color", jQuery.fn.colorPicker.toHex(this.value ? this.value : this));
                    if (this.name)
                        swatch.attr("title", this.name);
                    jQuery.fn.colorPicker.bindPalette(swatch);
                }
                swatch.appendTo(newPalette);
            });
            } else {
                var fb = newPalette.farbtastic(
                    function (color) {
                        if (selectorOwner)
                            jQuery.fn.colorPicker.changeColor(selectorOwner.prev('input').attr('id'), color);
                    }
                   )[0].farbtastic;
                newPalette.css('width', 'auto');

                if (onlyTrasparent) { // background color
                    fb.enableTransparent(transparent);
                }
            }

            jQuery("body").append(newPalette);
            if (colors.length > maxColorsNumber) {
                newPalette.addClass("scrolled-element");
            }
            newPalette.hide();

            jQuery('#' + paletteId + ' .tooltipster').tooltipster({ theme: 'tooltipster-noir' });
        },
        setColors: function (inputId, newColors) {
            var paletteId = inputId + '-palette';

            var oldPalette = jQuery('#' + paletteId);
            if (oldPalette.length == 0) return;
            oldPalette.remove();

            jQuery.fn.colorPicker.createPalette(paletteId, newColors);
        },
        /**
         * Return a Hex color, convert an RGB value and return Hex, or return false.
         *
         * Inspired by http://code.google.com/p/jquery-color-utils
        **/
        toHex: function (color) {
            // If we have a standard or shorthand Hex color, return that value.
            if (color.match(/[0-9A-F]{6}|[0-9A-F]{3}$/i)) {
                return (color.charAt(0) === "#") ? color : ("#" + color);

                // Alternatively, check for RGB color, then convert and return it as Hex.
            } else if (color.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/)) {
                var c = ([parseInt(RegExp.$1, 10), parseInt(RegExp.$2, 10), parseInt(RegExp.$3, 10)]),
                    pad = function (str) {
                        if (str.length < 2) {
                            for (var i = 0, len = 2 - str.length; i < len; i++) {
                                str = '0' + str;
                            }
                        }

                        return str;
                    };

                if (c.length === 3) {
                    var r = pad(c[0].toString(16)),
                        g = pad(c[1].toString(16)),
                        b = pad(c[2].toString(16));

                    return '#' + r + g + b;
                }

                // Otherwise we wont do anything.
            } else {
                return false;

            }
        },

        /**
         * Check whether user clicked on the selector or owner.
        **/
        checkMouse: function (event, paletteId) {
            var selector = activePalette,
                selectorParent = jQuery(event.target).parents("#" + selector.attr('id')).length;

            var container = selectorOwner.data('container');

            if (event.target === jQuery(selector)[0] || event.target === selectorOwner[0] || selectorParent > 0 ||
                (container && (container.has(event.target).length > 0 || container.is(event.target)))) {
                return;
            }

            jQuery.fn.colorPicker.hidePalette();
        },

        /**
         * Hide the color palette modal.
        **/
        hidePalette: function () {
            jQuery(document).unbind("mousedown", jQuery.fn.colorPicker.checkMouse);

            jQuery('.colorPicker-palette').hide();
        },

        /**
         * Show the color palette modal.
        **/
        showPalette: function (palette) {
            var hexColor = selectorOwner.prev("input").val();

            var _selectorOwner = selectorOwner.data('container') ? selectorOwner.data('container') : selectorOwner,
                _offset = _selectorOwner.offset(),
                _gap = selectorOwner.data('gap');

            var isDropup = selectorOwner.data('isDropup');
            if (isDropup && _offset.top < (palette.outerHeight() + _gap))
                isDropup = false;
            palette.css({
                top: _offset.top + (isDropup ? -(palette.outerHeight() + _gap) : (_selectorOwner.outerHeight() + _gap)),
                left: _offset.left
            });

            jQuery("#color_value").val(hexColor);
            if (palette.get(0).farbtastic) palette.get(0).farbtastic.setColor(hexColor);
            palette.show();

            jQuery(document).bind("mousedown", jQuery.fn.colorPicker.checkMouse);
        },

        /**
         * Toggle visibility of the colorPicker palette.
        **/
        togglePalette: function (palette, origin) {
            // selectorOwner is the clicked .colorPicker-picker.
            if (origin) {
                selectorOwner = origin;
            }

            activePalette = palette;

            if (activePalette.is(':visible')) {
                jQuery.fn.colorPicker.hidePalette();
            } else {
                jQuery.fn.colorPicker.showPalette(palette);

            }
        },

        /**
         * Update the input with a newly selected color.
        **/
        changeColor: function (inputId, value) {
            var input = jQuery('#' + inputId);
            var picker = input.next('div.colorPicker-picker');
            if (picker.length == 0) return;
            var isTransparent = (value === transparent);
            if (!isTransparent) {
                picker.css('background-color', value);
            } else {
                picker.css('background-color', '#ffffff');
            }
            picker.toggleClass('transparent', isTransparent);
            input.val(value).change();

            var palette = jQuery('#' + inputId + '-palette');
            if (palette.get(0).farbtastic) palette.get(0).farbtastic.setColor(value);

            picker.data('onColorChange').call(picker, input.attr('id'), value);
        },


        /**
         * Preview the input with a newly selected color.
        **/
        previewColor: function (value) {
            var isTransparent = (value === transparent);
            if (!isTransparent) {
                selectorOwner.css('background-color', value);
            } else {
                selectorOwner.css('background-color', '#ffffff');
            }
            selectorOwner.toggleClass('transparent', isTransparent);
        },

        /**
         * Bind events to the color palette swatches.
        */
        bindPalette: function (element, color) {
            color = color ? color : jQuery.fn.colorPicker.toHex(element.css('background-color'));

            element.bind({
                click: function (ev) {
                    lastColor = color;

                    jQuery.fn.colorPicker.changeColor(selectorOwner.prev('input').attr('id'), color);
                },
                mouseover: function (ev) {
                    lastColor = selectorOwner.hasClass('transparent') ? transparent : selectorOwner.css('background-color');

                    jQuery.fn.colorPicker.previewColor(color);
                },
                mouseout: function (ev) {
                    jQuery.fn.colorPicker.previewColor(lastColor);
                }
            });
        }
    });

    /**
     * Default colorPicker options.
     *
     * These are publibly available for global modification using a setting such as:
     *
     * jQuery.fn.colorPicker.defaults.colors = ['151337', '111111']
     *
     * They can also be applied on a per-bound element basis like so:
     *
     * jQuery('#element1').colorPicker({pickerDefault: 'efefef', transparency: true});
     * jQuery('#element2').colorPicker({pickerDefault: '333333', colors: ['333333', '111111']});
     *
    **/
    jQuery.fn.colorPicker.defaults = {
        // colorPicker default selected color.
        pickerDefault: "FFFFFF",

        // Default color set.
        colors: ['000000'/*
            '000000', '993300', '333300', '000080', '333399', '333333', '800000', 'FF6600',
            '808000', '008000', '008080', '0000FF', '666699', '808080', 'FF0000', 'FF9900',
            '99CC00', '339966', '33CCCC', '3366FF', '800080', '999999', 'FF00FF', 'FFCC00',
            'FFFF00', '00FF00', '00FFFF', '00CCFF', '993366', 'C0C0C0', 'FF99CC', 'FFCC99',
            'FFFF99', 'CCFFFF', '99CCFF', 'FFFFFF'*/
        ],

        // If we want to simply add more colors to the default set, use addColors.
        addColors: [],
    };

})(jQuery);
