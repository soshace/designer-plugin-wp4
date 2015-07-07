var DEJS;
(function (DEJS) {
    ///<reference path="DEModel.ts"/>
    ///<reference path="../event/Events.ts"/>
    ///<reference path="../effects/VectorEffect.ts"/>
    ///<reference path="../effects/Effects.ts"/>
    (function (Model) {
        var TextEffectsManager = (function () {
            function TextEffectsManager(model) {
                this.model = model;
            }
            TextEffectsManager.canFormUrl = function (attr, handler) {
                if (DEJS.Effects.isVector(attr["textEffect"])) {
                    return Model.FontManager.checkRaphaelFont(attr["font-family"], handler);
                } else {
                    return true;
                }
            };

            TextEffectsManager.clearCache = function () {
                var _this = this;
                if (this.waitingToClean)
                    return;
                var time = (new Date()).getTime();
                this.waitingToClean = true;
                setTimeout(function () {
                    return _this.doClearCache(time);
                });
            };
            TextEffectsManager.doClearCache = function (time) {
                for (var key in this.urlCache) {
                    if (this.urlCache[key].time < time) {
                        delete this.urlCache[key];
                    }
                }
                this.waitingToClean = false;
            };

            /**
             * Returns imgage url for a given text attributs. Will start with 'svg://' for vector text effects
             *
             * @param attr All text object's attributes
             * @param size Should be width of an object. Currently not used.
             */
            TextEffectsManager.formTextImageUrl = function (attr, size) {
                if (!("text" in attr) || attr["text"] == "")
                    return "";
                if (!("textEffect" in attr) || attr["textEffect"] == "" || attr["textEffect"] == "none")
                    return "";
                var teVO = Model.configManager.config.getTextEffect(attr["textEffect"]);
                if (!teVO)
                    return "";
                if (DEJS.Effects.isVector(teVO.name)) {
                    var psAttr = {};
                    psAttr["textEffect"] = attr["textEffect"];
                    psAttr["text"] = attr["text"];
                    psAttr["font-weight"] = attr["font-weight"];
                    psAttr["font-style"] = attr["font-style"];
                    psAttr["font-family"] = attr["font-family"];
                    psAttr["letterSpacing"] = attr["letterSpacing"];
                    psAttr["line-leading"] = attr["line-leading"];
                    psAttr["textEffectValue"] = attr["textEffectValue"];
                    psAttr["fill"] = attr["fill"];
                    psAttr["stroke"] = attr["stroke"];
                    psAttr["text-align"] = attr["text-align"];
                    var ps = DEJS.Util.attrToString(psAttr);
                    var url;
                    if (this.urlCache[ps]) {
                        url = this.urlCache[ps].url;
                    } else {
                        url = this.formVectorTextImageUrl(attr, size);
                        var cUrl = new CachedTEUrl(ps, url);
                        this.urlCache[ps] = cUrl;
                    }
                    this.clearCache();
                    return url;
                } else {
                    return this.formRasterTextImageUrl(attr, size);
                }
            };

            TextEffectsManager.formRasterTextImageUrl = function (attr, size) {
                var url = Model.configManager.config.textEffectsUrl;
                if (url == "")
                    return "";
                if (!("text" in attr) || attr["text"] == "")
                    return "";
                if (!("textEffect" in attr) || attr["textEffect"] == "" || attr["textEffect"] == "none")
                    return "";
                var teVO = Model.configManager.config.getTextEffect(attr["textEffect"]);
                if (!teVO)
                    return "";
                url += "?t=" + encodeURIComponent(attr["text"]);
                url += "&fx=" + ((teVO.fxName == "") ? teVO.name : teVO.fxName);
                url += "&" + teVO.paramValName + "=" + encodeURIComponent(attr["textEffectValue"]);
                url += "&fn=" + encodeURIComponent(attr["font-family"]);
                url += "&c=" + encodeURIComponent(attr["fill"]);
                url += "&o=" + encodeURIComponent(attr["stroke"]);

                //url += "&p=" + encodeURIComponent(attr["font-size"]);
                // hard code this to 72 for best resolution
                url += "&p=72";
                if (attr["font-weight"] == "bold" || attr["font-style"] == "italic") {
                    url += "&st=" + ((attr["font-weight"] == "bold") ? "b" : "");
                    url += ((attr["font-style"] == "italic") ? "i" : "");
                }
                return url;
            };

            TextEffectsManager.formVectorTextImageUrl = function (attr, size) {
                if (!this.designer)
                    return "";
                if (!("text" in attr) || attr["text"] == "")
                    return "";
                if (!("textEffect" in attr) || attr["textEffect"] == "" || attr["textEffect"] == "none")
                    return "";
                var teVO = Model.configManager.config.getTextEffect(attr["textEffect"]);
                if (!teVO)
                    return "";

                //var paths = this.formTextPaths(0, 0, attr["text"], this.raphael().getFont(attr["font-family"]), 32, null, attr["letterSpacing"]);
                var weight;
                var style;
                var letterSpacing = 0;
                var lineLeading = 1.2;
                var fontSize = 32;
                var lineHeight = 32;
                var textAlign = "left";
                if (attr["font-weight"] == "bold")
                    weight = "bold";
                if (attr["font-style"] == "italic")
                    style = "italic";
                if ("letterSpacing" in attr)
                    letterSpacing = parseFloat(attr["letterSpacing"]);
                if ("line-leading" in attr)
                    lineLeading = parseFloat(attr["line-leading"]);
                if ("font-size" in attr)
                    fontSize = parseFloat(attr["font-size"]);
                if ("line-height" in attr)
                    lineHeight = parseFloat(attr["line-height"]);
                if ("text-align" in attr)
                    textAlign = attr["text-align"];
                var paths = this.formTextPaths(0, 0, attr["text"], this.raphael().getFont(attr["font-family"], weight, style), fontSize, null, letterSpacing, lineLeading, textAlign, lineHeight);
                this.applyEffect(paths, teVO.name, attr["textEffectValue"]);
                var pm = DEJS.Util.calcPathsMetric(paths);
                var bbox = pm.bbox;

                var svg = 'svg://';
                svg += '<?xml version="1.0" encoding="utf-8"?>\n';
                svg += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n';
                svg += '<svg version="1.1" id="txtPath" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"';
                svg += ' width="' + bbox.width + 'px" height="' + bbox.height + 'px" viewBox="0 0 ' + bbox.width + ' ' + bbox.height + '" enable-background="new 0 0 32 32" xml:space="preserve">';

                for (var i = 0; i < paths.length; i++) {
                    svg += '<path d="' + paths[i] + '"';
                    svg += ' fill="' + attr["fill"] + '" stroke="' + attr["stroke"] + '"';
                    svg += ' />';
                }

                svg += '</svg>';
                return svg;
            };

            /**
             * Forms a set of paths. One path for each letter.
             */
            TextEffectsManager.formTextPaths = function (x, y, textString, font, size, origin, letter_spacing, line_leading, textAlign, lineHeigt) {
                jQuery.ajax;
                var separator = /[, ]+/;
                origin = origin || "middle"; // baseline|middle
                letter_spacing = letter_spacing / 30;
                letter_spacing = Math.max(Math.min(letter_spacing || 0, 1), -1);
                var letters = String(textString).split(""), shift = 0, notfirst = 0, path = [], curPath = [], scale;
                if (font) {
                    scale = (size || 16) / font.face["units-per-em"];
                    var bb = font.face.bbox["split"](separator), top = +bb[0], lineHeight = bb[3] - bb[1], shifty = 0, height = +bb[1] + (origin == "baseline" ? lineHeight + (+font.face.descent) : lineHeight / 2);
                    for (var i = 0, ii = letters.length; i < ii; i++) {
                        if (letters[i] == "\n" || path.length == 0) {
                            curPath = [];
                            path.push(curPath);
                        }
                        if (letters[i] == "\n") {
                            shift = 0;
                            curr = 0;
                            notfirst = 0;
                            shifty += lineHeight * line_leading / 1.2;
                        } else {
                            var prev = notfirst && font.glyphs[letters[i - 1]] || {}, curr = font.glyphs[letters[i]];
                            shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
                            notfirst = 1;
                        }
                        if (curr && curr.d) {
                            curPath.push(Raphael.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale]));
                            //path.push(Raphael.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale]) + " z");
                        }
                    }
                }

                /*var result = [];
                 for (var i = 0; i < path.length; i++) {
                 result.push(this.path(path[i]).attr({
                 fill: "#000",
                 stroke: "none"
                 }));
                 }*/
                if (path.length > 1 && textAlign != "left") {
                    var min, max;
                    var metrics = [];
                    for (var i = 0; i < path.length; i++) {
                        curPath = path[i];
                        var metric = DEJS.Util.calcPathsMetric(curPath);
                        metrics.push(metric);
                        if (i == 0) {
                            min = metric.bbox.x;
                            max = metric.bbox.x + metric.bbox.width;
                        } else {
                            min = Math.min(min, metric.bbox.x);
                            max = Math.max(max, metric.bbox.x + metric.bbox.width);
                        }
                    }
                    for (var i = 0; i < path.length; i++) {
                        switch (textAlign) {
                            case "right":
                                var dx = max - (metrics[i].bbox.x + metrics[i].bbox.width);
                                break;
                            case "center":
                                var dx = (max - min - metrics[i].bbox.width) / 2;
                            default:
                                break;
                        }
                        curPath = path[i];
                        for (var j = 0; j < curPath.length; j++) {
                            curPath[j] = Raphael.transformPath(curPath[j], ["t", dx, 0]);
                        }
                    }
                }
                var res = [];
                for (var i = 0; i < path.length; i++) {
                    res = res.concat(path[i]);
                }
                return res;
                /*return this.path(path).attr({
                 fill: "#000",
                 stroke: "none"
                 });*/
            };

            /**
             * To perform some calculations TextEffectsManager needs a link to any DEDesigner instance
             *
             * @param designer Any of DEDesigners
             */
            TextEffectsManager.registerCanvas = function (designer) {
                this.designer = designer;
            };

            TextEffectsManager.raphael = function () {
                return this.designer.canvas;
            };

            /**
             * Puts a set of path to (0,0)
             *
             * @param paths A paths array to process
             */
            TextEffectsManager.normalizePosition = function (paths) {
                var bbox = DEJS.Util.calcPathsMetric(paths).bbox;
                var dx = 0 - bbox.x;
                var dy = 0 - bbox.y;
                for (var i = 0; i < paths.length; i++) {
                    paths[i] = Raphael.transformPath(paths[i], ["t", "" + dx, "" + dy]);
                }
            };

            /**
             * Applies a vector effect to paths
             *
             * @param paths A paths array to process
             */
            TextEffectsManager.applyEffect = function (paths, effect, value) {
                this.normalizePosition(paths);
                var effectsList = DEJS.Effects.VectorEffects;
                var effectClass = effectsList[effect];
                if (effectClass) {
                    var ve = new effectClass();
                    ve.processPaths(paths, value);
                }
                this.normalizePosition(paths);
            };
            TextEffectsManager.urlCache = {};

            TextEffectsManager.clearCacheInterval = 600000;
            TextEffectsManager.waitingToClean = false;
            return TextEffectsManager;
        })();
        Model.TextEffectsManager = TextEffectsManager;

        var CachedTEUrl = (function () {
            function CachedTEUrl(paramString, url) {
                this.paramString = paramString;
                this.url = url;
                this.time = (new Date()).getTime();
            }
            return CachedTEUrl;
        })();
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));