var DEJS;
(function (DEJS) {
    ///<reference path="DEModel.ts"/>
    ///<reference path="../event/Events.ts"/>
    (function (Model) {
        var FontManager = (function () {
            function FontManager(model) {
                this.fontAscents = {};
                this.fontsLoaded = 0;
                this.model = model;
            }
            FontManager.prototype.collectFontMetrics = function () {
                var _this = this;
                return;

                //console.log("start: " + performance.now());
                //for (var i = 0; i < configManager.config.fonts.length; i++) {
                if (this.fontsLoaded >= Model.configManager.config.fonts.length) {
                    return;
                }
                var fontVO = Model.configManager.config.fonts[this.fontsLoaded];
                this.fontAscents[fontVO.fontFamily] = 0;
                var font = new window["Font"]();
                font.onload = function () {
                    return _this.onFontLoaded(font, fontVO);
                };
                font.onerror = function (error) {
                    return _this.onFontLoadError(fontVO.fontFamily, error);
                };
                font.fontFamily = fontVO.fontFamily;
                font.src = fontVO.fontFamily;
                this.fontsLoaded++;
                //}
            };

            FontManager.prototype.onFontLoaded = function (font, fontVO) {
                //console.log(fontVO.fontFamily);
                var ascent = 0;
                if (font.metrics) {
                    //console.log(font.metrics.ascent);
                } else {
                    ascent = font.measureText("A", 32).ascent; //Attention! This is a magic number.
                    //console.log("no metrics")
                }

                //console.log(fontVO.fontFamily + "; ascent: " + ascent);
                //console.log("end: " + performance.now());
                this.collectFontMetrics();
            };

            FontManager.prototype.onFontLoadError = function (fontFamily, error) {
                alert("Error loading font: \n" + error);
            };

            FontManager.getFontAscent = function (fontFamily) {
                var fontVO = Model.configManager.config.getFont(fontFamily);
                if (fontVO)
                    return fontVO.ascent;
                return 0;
            };

            FontManager.checkRaphaelFont = function (fontFamily, handler) {
                if (this.raphaelFonts[fontFamily]) {
                    return true;
                }
                FontManager.loadRaphaelFont(fontFamily, handler);
                return false;
            };

            FontManager.loadRaphaelFont = function (fontFamily, handler) {
                var _this = this;
                jQuery.support.cors = true;
                var fontVO = Model.configManager.config.getFont(fontFamily);
                var load = true;
                if (!fontVO) {
                    alert("No font info:\n" + fontFamily);
                    load = false;
                }
                if (!fontVO.vector) {
                    if (!this.raphaelFontsErrors[fontFamily]) {
                        alert("No font vector info:\n" + fontFamily);
                        this.raphaelFontsErrors[fontFamily] = true;
                    }
                    load = false;
                }
                if (load) {
                    jQuery.get(fontVO.vector, function (data, status, jqXHR) {
                        return _this.onRaphaelFontLoaded(data, fontFamily, handler);
                    }, "script").fail(function (jqXHR, textStatus, errorThrown) {
                        return _this.oRaphaelFontLoadFail(fontFamily, jqXHR, textStatus, errorThrown);
                    });
                } else {
                    if (handler)
                        handler(false);
                }
            };

            FontManager.onRaphaelFontLoaded = function (data, fontFamily, handler) {
                if (data) {
                    var error = false;
                    if (!error) {
                        try  {
                            eval(data);
                        } catch (e) {
                            error = true;
                            alert("Error registering font:\n" + fontFamily);
                        }
                        this.raphaelFonts[fontFamily] = true;
                        if (handler)
                            handler();
                    }
                } else {
                    alert("Error loading font:\n" + fontFamily);
                }
            };

            FontManager.oRaphaelFontLoadFail = function (fontFamily, jqXHR, textStatus, errorThrown) {
                alert("Fail to load font:\n" + fontFamily);
            };
            FontManager.raphaelFonts = {};
            FontManager.raphaelFontsErrors = {};
            return FontManager;
        })();
        Model.FontManager = FontManager;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));