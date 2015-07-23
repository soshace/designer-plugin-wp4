///<reference path="../DEMain.ts"/>
///<reference path="../lib/jquery.d.ts"/>
///<reference path="../lib/raphael-2.1.fm.d.ts"/>
///<reference path="../lib/rappar.d.ts"/>
///<reference path="../Util.ts"/>
///<reference path="../event/EventDispatcher.ts"/>
///<reference path="../event/Events.ts"/>
///<reference path="TrackerManager.ts"/>
///<reference path="RulerManager.ts"/>
///<reference path="../model/Trial.ts"/>
///<reference path="../VO/StyleVO.ts"/>
var DEJS;
(function (DEJS) {
    var DEDesigner = (function (_super) {
        __extends(DEDesigner, _super);
        function DEDesigner() {
            _super.call(this);
            this.backgroundUseID = "";
            this.maskDefinedInProduct = false;
            this.productElTransform = "";
            this.selectedEl = new Array();
            this.lastSelected = new Array();
            this.elements = new Array();
            this.hitX = 0;
            this.hitY = 0;
            this.tmpX = 0;
            this.tmpY = 0;
            this.printAreaCoord = [0, 0, 0, 0];
            this.printAreaUnits = [0, 0];
            this.printAreaVisible = false;
            this.clipRectCoord = [];
            this.options = new DEJS.VO.DEOptions();
            this.maskImage = "";
            this.overlayImage = "";
            this.backgroundPreloaderSize = 66;
            this.preloaders = {};
            this.blockDoubleClick = false;
            this.doubleClickDelay = 300;
            this.lastClick = (new Date()).getTime() - 10000000;
            this.lastSelectedObj = null;
            this.dpu = 0;
            this.dpuX = 1;
            this.dpuY = 1;
            this.viewPort = { x: 0, y: 0, zoom: 100 };
            this.hitViewPort = { x: 0, y: 0, zoom: 100 };
            this.drag = false;
            this.lockProportions = true;
            this.showRuler = false;
            this.loadingSVGBackground = false;
            this.loadingRasterBackground = false;
            this.scaleLoadedBackground = false;
            this.counter = 0;
            this.rememberedTouches = [];
            this.transforming = false;
            this.dragging = false;
            this.redrawing = false;
            this.tracker = new DEJS.TrackerManager(this);
            this.ruler = new DEJS.RulerManager(this);
        }
        DEDesigner.prototype.imagePreloaderPath = function () {
            return DEJS.Model.ConfigManager.imagePreloaderPath();
        };
        DEDesigner.prototype.backgroundPreloaderPath = function () {
            return DEJS.Model.ConfigManager.assetsUrl + "img/tracker/image_preloader.gif";
        };
        DEDesigner.prototype.backgroundFillerPath = function () {
            return DEJS.Model.ConfigManager.assetsUrl + "img/bg-fill.png";
        };

        DEDesigner.prototype.loadingBackground = function () {
            return this.loadingSVGBackground || this.loadingRasterBackground;
        };

        //private colorizeArrayToApply: any[] = [];
        DEDesigner.prototype.init = function (holder, width, height, logDiv) {
            this.holder = holder;
            this.width = width;
            this.height = height;
            this.logDiv = logDiv;
            this.setupCanvas();
        };

        DEDesigner.prototype.setupCanvas = function () {
            var _this = this;
            this.holder.css({ width: this.width, height: this.height, "float": "left" });
            if (this.options.checkeredBackground) {
                this.holder.css({ "background-image": "url(" + this.backgroundFillerPath() + ")" });
            }
            this.createSpeedDiv();
            this.canvas = Raphael(this.holder[0], this.width, this.height);
            this.fixWhiteSpaces();
            this.svgHolder = this.holder.children().eq(0);

            //this.svgHolder.attr({ "zIndex": 2 });
            this.captureDefs();

            this.defaultPrintingArea();

            this.initCustomAttr();

            this.holder.mousedown(function (event) {
                return _this.onMouseDown(event);
            });
            this.holder.mousemove(function (event) {
                return _this.onMouseMove(event);
            });
            this.holder.mouseup(function (event) {
                return _this.onMouseUp(event);
            });

            if (mobilesafari) {
                var mHolder = this.holder[0];

                mHolder.addEventListener("touchstart", function (event) {
                    return _this.onTouchStart(event);
                }, false);
                mHolder.addEventListener("touchmove", function (event) {
                    return _this.onTouchMove(event);
                }, false);
                mHolder.addEventListener("touchend", function (event) {
                    return _this.onTouchEnd(event);
                }, false);

                mHolder.addEventListener("selectstart", function (event) {
                    event.preventDefault();
                    return false;
                }, false);
            }
            this.setProductImage(""); //Creating product canvas anyway
            this.addWatermark();
            this.setOverlay("");
            this.updateViewBox();
            this.svgHolder.attr("preserveAspectRatio", "xMinYMin");
            this.setupReference();
        };

        DEDesigner.prototype.captureDefs = function () {
            this.defs = this.svgHolder.find("defs");
        };

        DEDesigner.prototype.initCustomAttr = function () {
            this.canvas.customAttributes.deservice = function (val) {
                var $node = jQuery(this.node);
                $node.attr("deservice", val);
                return {};
            };
            this.canvas.customAttributes.fixStorkeScale = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("fix-storke-scale", "true");
                else
                    $node.removeAttr("fix-storke-scale");
                return {};
            };
            this.canvas.customAttributes.fixed = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-fixed", "true");
                else
                    $node.removeAttr("de-fixed");
                return {};
            };
            this.canvas.customAttributes.fixedSize = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-fixed-size", "true");
                else
                    $node.removeAttr("de-fixed-size");
                return {};
            };
            this.canvas.customAttributes.fixedRotate = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-fixed-rotate", "true");
                else
                    $node.removeAttr("de-fixed-rotate");
                return {};
            };
            this.canvas.customAttributes.fixedMove = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-fixed-move", "true");
                else
                    $node.removeAttr("de-fixed-move");
                return {};
            };
            this.canvas.customAttributes.fixedColor = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-fixed-color", "true");
                else
                    $node.removeAttr("de-fixed-color");
                return {};
            };
            this.canvas.customAttributes.required = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-required", "true");
                else
                    $node.removeAttr("de-required");
                return {};
            };
            this.canvas.customAttributes.fixedFont = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-fixed-font", "true");
                else
                    $node.removeAttr("de-fixed-font");
                return {};
            };
            this.canvas.customAttributes.fixedStyle = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-fixed-style", "true");
                else
                    $node.removeAttr("de-fixed-style");
                return {};
            };
            this.canvas.customAttributes.fitBounds = function () {
                var val = Array.prototype.slice.call(arguments);
                var $node = jQuery(this.node);
                if (val && val.length)
                    $node.attr("de-fit-bounds", val.join(","));
                else
                    $node.removeAttr("de-fit-bounds");
                return {};
            };
            this.canvas.customAttributes.sourceId = function (val) {
                var $node = jQuery(this.node);
                $node.attr("de-source-id", val);
                return {};
            };
            this.canvas.customAttributes.sourceUrl = function (val) {
                var $node = jQuery(this.node);
                $node.attr("de-source-url", val);
                return {};
            };
            this.canvas.customAttributes.nameObj = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-name-obj", "true");
                else
                    $node.removeAttr("de-name-obj");
                return {};
            };
            this.canvas.customAttributes.numberObj = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-number-obj", "true");
                else
                    $node.removeAttr("de-number-obj");
                return {};
            };
            this.canvas.customAttributes.processColors = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-process-colors", "true");
                else
                    $node.removeAttr("de-process-colors");
                return {};
            };
            this.canvas.customAttributes.colorsNumber = function (val) {
                var $node = jQuery(this.node);
                $node.attr("de-colors-number", val);
                return {};
            };
            this.canvas.customAttributes.colorize = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-colorize", "true");
                else
                    $node.removeAttr("de-colorize");
                return {};
            };
            this.canvas.customAttributes.textSourceId = function (val) {
                var $node = jQuery(this.node);
                $node.attr("de-text-source-id", val);
                return {};
            };
            this.canvas.customAttributes.letterSpacing = function (val) {
                var $node = jQuery(this.node);
                $node.attr("letter-spacing", val);
                return {};
            };
            this.canvas.customAttributes.textEffect = function (val) {
                var $node = jQuery(this.node);
                if (val && val != 0 && val != "none")
                    $node.attr("de-text-effect", val);
                else {
                    $node.removeAttr("de-text-effect");
                    $node.removeAttr("de-text-effect-value");
                }
                return {};
            };
            this.canvas.customAttributes.textEffectValue = function (val) {
                var $node = jQuery(this.node);
                if (val)
                    $node.attr("de-text-effect-value", val.toString());
                else {
                    $node.removeAttr("de-text-effect-value");
                }
                return {};
            };
        };

        //TODO: Add size&fit options.
        DEDesigner.prototype.setProductImage = function (image, colorizableGroups) {
            var _this = this;
            if (image == this.productImage)
                return;
            this.productImage = image;
            if (this.backgroundCanvas) {
                this.clearBackground();
            } else {
                this.backgroundCanvas = Raphael(this.holder[0], this.width, this.height);
                var obj = this.holder.children();
                var p = this.holder.position();
                obj.css({
                    "position": "absolute"
                });
                //jQuery(this.backgroundCanvas.canvas).attr({ "zIndex": 1 });
            }
            this.maskDefinedInProduct = false;
            if (image && image.length > 0) {
                this.createProductPreloader();
                if (this.isPathSVG(image)) {
                    this.loadingSVGBackground = true;
                    jQuery.get(image, null, function (data, status, jqXHR) {
                        return _this.onSVGBackgroundImageLoaded(data, colorizableGroups);
                    }, "text").fail(function () {
                        var args = [];
                        for (var _i = 0; _i < (arguments.length - 0); _i++) {
                            args[_i] = arguments[_i + 0];
                        }
                        return _this.onSVGBackgroundFail();
                    });
                } else {
                    this.loadingRasterBackground = true;
                    var img = new Image();
                    img.onload = function (event) {
                        return _this.onBackgroundImageLoaded(img);
                    };
                    img.src = image;
                }
            }
        };

        DEDesigner.prototype.clearBackground = function () {
            if (this.productDefsRoot)
                this.productDefsRoot = null;
            this.productElTransform = "";
            if (this.backgroundStyleNode)
                this.backgroundStyleNode.remove();
            this.backgroundStyleNode = null;
            this.backgroundStyle = null;
            this.backgroundCanvas.clear();
        };

        DEDesigner.prototype.createProductPreloader = function () {
            if (this.backgroundPreloader)
                this.backgroundPreloader.remove();
            this.backgroundPreloader = this.backgroundCanvas.image(this.backgroundPreloaderPath(), (this.width - this.backgroundPreloaderSize) / 2, (this.height - this.backgroundPreloaderSize) / 2, this.backgroundPreloaderSize, this.backgroundPreloaderSize);
        };

        DEDesigner.prototype.deleteProductPreloader = function () {
            if (this.backgroundPreloader) {
                this.backgroundPreloader.remove();
                this.backgroundPreloader = null;
            }
        };

        DEDesigner.prototype.onBackgroundImageLoaded = function (img) {
            this.loadingRasterBackground = false;
            this.deleteProductPreloader();
            this.clearBackground();
            this.productEl = this.backgroundCanvas.image(this.productImage, 0, 0, this.width, this.height); //, img.width, img.height
            if (this.scaleLoadedBackground) {
                this.updateProductSize(img.width, img.height);
                this.scaleLoadedBackground = false;
            }
        };

        DEDesigner.prototype.onSVGBackgroundImageLoaded = function (data, colorizableGroups) {
            var maskNode = null;
            this.loadingSVGBackground = false;
            this.deleteProductPreloader();
            this.clearBackground();
            var element;
            if (!data) {
                this.onSVGFail();
                return;
            }
            data = data.replace(new RegExp("<\\s*svg ", "g"), "<g ");
            data = data.replace(new RegExp("</\\s*svg", "g"), "</g");
            var xml = jQuery(jQuery.parseXML(data));
            var svgRoot;
            try  {
                svgRoot = xml.find("g").eq(0); //jQuery getAttribute error here. Why?! jQuery says we can skip it.
            } catch (e) {
            }
            if (!svgRoot) {
                this.onSVGFail();
                return;
            }
            var svgId = DEJS.Util.generateUID();
            svgRoot.attr("id", svgId);
            jQuery(this.backgroundCanvas.canvas).find("defs").append(svgRoot);
            this.productDefsRoot = svgRoot;

            maskNode = svgRoot.find("#de-product-mask");
            if (maskNode.length > 0)
                maskNode.detach();

            this.backgroundStyleNode = svgRoot.find("style");
            this.processBackgroundStyle(colorizableGroups);

            var w = parseFloat(svgRoot.attr("width"));
            var h = parseFloat(svgRoot.attr("height"));
            this.backgroundUseID = "#" + svgId;
            this.productEl = this.backgroundCanvas.use(this.backgroundUseID, 0, 0, this.width, this.height); //, w, h

            /*if (this.colorizeArrayToApply.length > 0) {
             this.colorizeBackground(this.colorizeArrayToApply);
             this.colorizeArrayToApply = [];
             }*/
            if (maskNode.length > 0) {
                this.maskDefinedInProduct = true;
                if (this.maskDefsRoot)
                    this.maskDefsRoot.remove();
                var trueMaskNode = jQuery("<g>");
                var attrs = {};
                jQuery.each(svgRoot[0].attributes, function () {
                    if (this.specified) {
                        attrs[this.name] = this.value;
                    }
                });
                trueMaskNode.attr(attrs);

                //trueMaskNode.append(maskNode);
                trueMaskNode.html(jQuery('<div>').append(maskNode.clone()).html());
                maskNode = trueMaskNode;
                var maskNodeString = jQuery('<div>').append(trueMaskNode.clone()).html();
                maskNodeString = "svg://" + maskNodeString;

                this.setMask(maskNodeString, false);
            } else {
                this.maskDefinedInProduct = false;
            }

            this.displayCutLines(false);
            if (this.scaleLoadedBackground) {
                this.updateProductSize();
                this.scaleLoadedBackground = false;
            }
            this.forceRedraw();
        };

        DEDesigner.prototype.onSVGBackgroundFail = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            //TODO: Add error handling
            this.loadingSVGBackground = false;
            this.deleteProductPreloader();
            alert("Failed to load product background.");
        };

        DEDesigner.prototype.addWatermark = function () {
            //this.onSVGLoaded(new VO.Obj(ObjectType.Image), Trial.TrialWatermark, null, null, null);
            if (this.watermarkHolder || !DEJS.Trial.isTrial())
                return;
            this.watermarkHolder = jQuery("<div>");
            this.watermarkHolder.appendTo(this.holder);
            this.watermarkHolder.html(DEJS.Trial.TrialWatermark);
            this.watermarkHolder.css({
                "position": "absolute",
                "pointer-events": "none",
                'zIndex': 40
            });
            this.watermarkHolder.find("svg").attr({ width: this.width });
        };

        DEDesigner.prototype.setOverlay = function (overlayImage) {
            if (this.overlayImage == overlayImage)
                return;
            this.overlayImage = overlayImage;
            if (overlayImage == "") {
                if (this.overlayHolder)
                    this.overlayHolder.children().detach();
            } else {
                if (!this.overlayHolder) {
                    this.overlayHolder = jQuery("<div>");
                    this.overlayHolder.appendTo(this.holder);
                    this.overlayHolder.css({
                        "position": "absolute",
                        "pointer-events": "none",
                        'zIndex': 20
                    });
                }
                this.overlayHolder.children().detach();
                var image = jQuery('<img id="overlayImage" src="' + overlayImage + '">');
                image.attr({ width: this.width, height: this.height });
                image.appendTo(this.overlayHolder);
            }
        };

        DEDesigner.prototype.setRuler = function (show) {
            if (typeof show === "undefined") { show = true; }
            if (this.rulerHolder) {
                this.rulerHolder.remove();
                this.rulerHolder = null;
            }
            this.showRuler = show;
            if (!show) {
                this.updateViewBox();
                return;
            }

            this.rulerHolder = jQuery("<div>");
            this.rulerHolder.appendTo(this.holder);
            this.rulerHolder.css({
                "position": "absolute",
                "pointer-events": "none",
                'zIndex': 10
            });

            this.ruler.rulerHolder = this.rulerHolder;
            this.ruler.width = this.width;
            this.ruler.height = this.height;
            this.ruler.printAreaCoord = this.printAreaCoord;
            this.ruler.printAreaUnits = this.printAreaUnits;
            this.ruler.showRuler();
            this.updateViewBox();
        };

        DEDesigner.prototype.setMask = function (maskImage, renew) {
            if (typeof renew === "undefined") { renew = false; }
            if (!renew) {
                if (this.maskImage == maskImage)
                    return;
                this.maskImage = maskImage;
            }
            var isMaskImageSVG = this.maskImage.substr(0, 6) == "svg://";
            if (this.maskDefinedInProduct && !isMaskImageSVG)
                return;
            if (this.maskImage == "") {
                if (this.maskEl) {
                    this.maskEl.remove();
                    this.maskEl = null;
                }
                if (this.maskDefsRoot) {
                    this.maskDefsRoot.remove();
                    this.maskDefsRoot = null;
                }
            } else {
                if (this.maskEl)
                    this.maskEl.remove();
                var rememberedTranform = "";
                if (this.maskDefsRoot) {
                    rememberedTranform = this.maskDefsRoot.attr("transform");
                    this.maskDefsRoot.remove();
                }
                if (isMaskImageSVG) {
                    var data = this.maskImage.substr(6);
                    data = '<?xml version="1.0" encoding="utf-8"?>' + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' + data;
                    data = data.replace(new RegExp("<\\s*svg ", "g"), "<g ");
                    data = data.replace(new RegExp("</\\s*svg", "g"), "</g");
                    var xml = jQuery(jQuery.parseXML(data));
                    var svgRoot;
                    try  {
                        svgRoot = xml.find("g").eq(0); //jQuery getAttribute error here. Why?! jQuery says we can skip it.
                    } catch (e) {
                    }
                    if (!svgRoot) {
                        this.onSVGFail();
                        return;
                    }
                    var svgId = DEJS.Util.generateUID();
                    svgRoot.attr("id", svgId);
                    this.maskDefsRoot = svgRoot;
                    this.defs.append(svgRoot);
                    this.maskEl = this.canvas.use("#" + svgId, 0, 0, this.width, this.height); //, w, h
                    this.maskEl.id = this.maskEl.node.id = "productMask";
                    this.maskEl.attr("deservice", true);
                    if (rememberedTranform) {
                        this.maskDefsRoot.attr({ transform: rememberedTranform });
                    }
                    if (this.productEl) {
                        this.maskEl.transform(this.productEl.transform());
                    }
                } else {
                    this.maskEl = this.canvas.image(this.maskImage, 0, 0, this.width, this.height);
                    this.maskEl.id = this.maskEl.node.id = "productMask";
                    this.maskEl.attr("deservice", true);
                    if (this.productEl) {
                        this.maskEl.transform(this.productEl.transform());
                    }
                }
                this.fixPrintAreaLayer();
            }
        };

        DEDesigner.prototype.addObjectToCanvas = function (obj, dispatchHistory, dispatchSelected) {
            var _this = this;
            if (typeof dispatchHistory === "undefined") { dispatchHistory = true; }
            if (typeof dispatchSelected === "undefined") { dispatchSelected = true; }
            this.checkObjectType(obj);
            if (obj.type == ObjectType.Image || obj.isImage()) {
                this.loadImage(obj, function (o, element) {
                    return _this.onElementAdded(o, element, dispatchSelected, null, dispatchHistory);
                });
            } else if (obj.type == ObjectType.SVG || obj.isSVG()) {
                this.loadSVG(obj, function (o, element) {
                    return _this.onElementAdded(o, element, dispatchSelected);
                });
            } else {
                this.addTextToCanvas(obj, function (o, element) {
                    return _this.onElementAdded(o, element, dispatchSelected);
                });
            }
            return obj;
        };

        DEDesigner.prototype.onElementAdded = function (obj, element, dispatchObjSelected, id, dispatchHistory) {
            if (typeof dispatchObjSelected === "undefined") { dispatchObjSelected = true; }
            if (typeof id === "undefined") { id = null; }
            if (typeof dispatchHistory === "undefined") { dispatchHistory = true; }
            obj.designer = this;
            if (id) {
                element.id = element.node.id = obj.elementId = id;
            } else {
                element.id = element.node.id = obj.elementId = DEJS.Util.generateUID();
            }
            obj.elementLink = element;

            //Checking dpi
            if (jQuery(element.node).attr("de-maxscale")) {
                obj.maxScale = parseFloat(jQuery(element.node).attr("de-maxscale"));
            }

            element.node.elementLink = element; //We receive element.node in events

            element.node.objectLink = obj;
            element.node.deDesigner = this;
            this.elements.push(element);
            obj.attr(obj.defaultAttr);
            this.switchTextFX(true, obj);
            obj.defaultAttr = {};

            this.fixPrintAreaLayer();
            if (dispatchObjSelected) {
                this.select(element, dispatchObjSelected);
            } else {
                this.deSelect();
            }
            if (dispatchObjSelected)
                this.dispatchEvent(new DEJS.Events.DesignerChangedEvent(this.selected(), dispatchHistory));
            //this.disableUserSelect();
        };

        DEDesigner.prototype.switchTextFX = function (toImage, obj) {
            if (obj.type != ObjectType.Text)
                return;
            if (toImage) {
                if (obj.loadedTextEffectElement) {
                    obj.textElementId = obj.elementId;
                    obj.textElementLink = obj.elementLink;
                    obj.textElementLink.hide();
                    if (obj.loadedTextEffectElement.type == "use")
                        obj.textUrl = "svg://" + obj.loadedTextEffectElement.attr("src");
                    else
                        obj.textUrl = obj.loadedTextEffectElement.attr("src");
                    obj.elementLink = obj.loadedTextEffectElement;
                    obj.elementId = obj.loadedTextEffectElement.id;
                    obj.elementLink.attr("textSourceId", obj.textElementLink.id);
                    obj.loadedTextEffectElement = null;
                    obj.elementLink.node.objectLink = obj;
                    this.elements.push(obj.elementLink);
                    DEJS.Util.arrayRemove(obj.textElementLink, this.elements);
                } else {
                    if (!obj.textElementLink)
                        return;

                    obj.elementLink.transform(obj.textElementLink.transform());
                    var textBox = DEJS.Util.getBBox(obj.textElementLink, true);
                    obj.elementLink.transform("...t" + (-textBox.width / 2) + "," + (-textBox.height / 2));
                    obj.elementLink.attr("textSourceId", obj.textElementLink.id);
                    DEJS.Util.arrayRemove(obj.textElementLink, this.elements);
                }
            } else {
                if (obj.elementLink) {
                    obj.textElementLink.transform(obj.elementLink.transform());
                    var textBox = DEJS.Util.getBBox(obj.elementLink, true);
                    obj.textElementLink.transform("...t" + textBox.width / 2 + "," + textBox.height / 2);
                }
                var selected = this.selected();
                if (obj == selected) {
                    this.tracker.clear();
                    this.tracker.track(obj.textElementLink);
                    this.select(obj.textElementLink, false); //without 2nd param - infinite loop
                }
                var index = DEJS.Util.arrayIndexOf(obj.elementLink, this.elements);
                if (index > -1) {
                    obj.elementLink.remove();
                    this.elements[index] = obj.textElementLink;
                } else {
                    if (DEJS.Util.arrayIndexOf(obj.textElementLink, this.elements) == -1)
                        this.elements.push(obj.textElementLink);
                }
            }
        };

        DEDesigner.prototype.addTextToCanvas = function (obj, handler) {
            //var font: string = obj.params.font;
            //var outline: boolean = obj.params.outline;
            var x = this.width / 2;
            var y = this.height / 2;

            //var element: RaphaelElement = this.canvas.text(x, y, obj.value);
            var element = this.canvas.text(0, 0, obj.value);
            if (obj.defaultTransform.length > 0) {
                element.transform(obj.defaultTransform);
                obj.defaultTransform = "";
            } else {
                element.transform("t" + x + "," + y);
            }
            var size = 32;
            element.attr({ "font-size": size });
            element.attr({ "line-height": obj.attr()["font-size"] });
            element.attr({ "letter-spacing": obj.attr()["letterSpacing"] }); //TODO: Why is this here?

            //if (font)
            //    element.attr({ "font-family": font });
            //if (outline)
            //    element.attr({ stroke: "brown", "stroke-width": "1px" });
            element.text = obj.value;

            //(<any>element).text = Util.fixMultilineEmptyLines(obj.value);
            element.attr("font-size", Math.abs(size));
            element.attr("fixStorkeScale", true);
            element.attr("cursor", "pointer");
            this.setObjectClipPath(element);
            handler(obj, element);
        };

        DEDesigner.prototype.loadImage = function (obj, handler) {
            var _this = this;
            //if (obj.type != ObjectType.Text) {
            this.createPreloadElement(obj);

            //}
            var img = new Image();
            img.onload = function (event) {
                return _this.onImageLoaded(obj, img, handler);
            };
            if (obj.type != ObjectType.Text)
                img.src = obj.value;
            else
                img.src = obj.textUrl;
        };

        DEDesigner.prototype.onImageLoaded = function (obj, img, handler) {
            var element;
            var w = img.width;
            var h = img.height;
            var imageCoord = this.fitImageCoords(w, h);
            var imageCoord = this.fitImageCoords(w, h, false, obj.suppressFitResize || obj.type == ObjectType.Text);
            var maxScale = imageCoord[4];
            var transform = this.deletePreloadElement(obj);
            if (obj.type == ObjectType.Image || (obj.hasTextFX() && obj.textUrl == img.src)) {
                if (!obj.elementLink) {
                    //element = this.canvas.image(obj.value, imageCoord[0], imageCoord[1], imageCoord[2], imageCoord[3]);
                    if (obj.type != ObjectType.Text) {
                        element = this.canvas.image(obj.value, 0, 0, w, h);
                        element.attr("cursor", "pointer");
                        if (transform != "")
                            element.transform(transform);
                        this.setObjectClipPath(element);

                        var m = element.matrix;
                        m.translate(imageCoord[0], imageCoord[1]);
                        m.scale(imageCoord[2] / w, imageCoord[3] / h);

                        element.transform(m.toTransformString());
                    } else {
                        element = this.canvas.image(obj.textUrl, 0, 0, w, h);
                        element.attr("cursor", "pointer");

                        var width = img.width;
                        var height = img.height;
                        if (obj.textElementLink) {
                            var textBox = DEJS.Util.getBBox(obj.textElementLink, true);
                            height = img.height * textBox.width / width;
                            width = textBox.width;
                            element.transform(obj.textElementLink.transform());
                        }
                        element.attr("width", width);
                        element.attr("height", height);
                        this.setObjectClipPath(element);
                    }
                } else {
                    element = obj.elementLink;
                    element.attr({ width: w, height: h });
                    this.setObjectClipPath(element);
                }
                if (maxScale > 0) {
                    jQuery(element.node).attr("de-maxscale", maxScale);
                }
                handler(obj, element);
            }
        };

        DEDesigner.prototype.loadSVG = function (obj, handler) {
            var _this = this;
            if (obj.type != ObjectType.Text) {
                this.createPreloadElement(obj);
            }

            if (obj.type != ObjectType.Text)
                var src = obj.value;
            else
                var src = obj.textUrl;

            if (src.substr(0, 6) == "svg://")
                this.onSVGLoaded(obj, src.substr(6), null, null, handler);
            else
                jQuery.get(src, null, function (data, status, jqXHR) {
                    return _this.onSVGLoaded(obj, data, status, jqXHR, handler);
                }, "text").fail(this.onSVGFail);
        };

        DEDesigner.prototype.onSVGLoaded = function (obj, data, status, jqXHR, handler) {
            var element;
            if (!data) {
                this.onSVGFail();
                return;
            }
            data = data.replace(new RegExp("<\\s*svg ", "g"), "<symbol ");
            data = data.replace(new RegExp("</\\s*svg", "g"), "</symbol");
            var xml = jQuery(jQuery.parseXML(data));
            var svgRoot;
            try  {
                svgRoot = xml.find("symbol").eq(0); //jQuery getAttribute error here. Why?! jQuery says we can skip it.
            } catch (e) {
            }
            if (!svgRoot) {
                this.onSVGFail();
                return;
            }
            var viewBox = svgRoot.attr("viewBox");
            var svgId = DEJS.Util.generateUID();
            svgRoot.attr("id", svgId);
            this.defs.append(svgRoot);

            var w = parseFloat(svgRoot.attr("width"));
            var h = parseFloat(svgRoot.attr("height"));

            // try use viewBox as default image size
            var viewBoxW = 0;
            var viewBoxH = 0;
            if (viewBox) {
                var viewBoxParts = viewBox.split(" ");
                viewBoxW = parseFloat(viewBoxParts[2]);
                viewBoxH = parseFloat(viewBoxParts[3]);
            }
            var imageCoord = this.fitSVGCoords(w, h, viewBoxW, viewBoxH);
            var transform = this.deletePreloadElement(obj);
            if (!obj.elementLink) {
                //element = (<any>this.canvas).use("#" + svgId, imageCoord[0], imageCoord[1], w, h);
                if (obj.type != ObjectType.Text) {
                    w = imageCoord[2]; // w,h may be changed in imageCoords
                    h = imageCoord[3];

                    //element = (<any>this.canvas).use("#" + svgId, 0, 0, w, h);
                    element = this.canvas.use("#" + svgId, 0, 0, w, h);
                    obj.defaultAttr["src"] = "#" + svgId;
                    obj.defaultAttr["sourceUrl"] = obj.value;

                    //Util.scaleElement(element, imageCoord[2]);
                    element.attr("cursor", "pointer");
                    if (transform != "")
                        element.transform(transform);

                    var m = element.matrix;
                    m.translate(imageCoord[0], imageCoord[1]);

                    //m.scale(imageCoord[4], imageCoord[4]);
                    element.transform(m.toTransformString());
                } else {
                    var width = parseFloat(svgRoot.attr("width"));
                    var height = parseFloat(svgRoot.attr("height"));

                    element = this.canvas.use("#" + svgId, 0, 0, width, height);
                    obj.defaultAttr["src"] = "#" + svgId;
                    obj.defaultAttr["sourceUrl"] = obj.value;

                    //Util.scaleElement(element, imageCoord[2]);
                    element.attr("cursor", "pointer");

                    if (obj.textElementLink) {
                        element.transform(obj.textElementLink.transform());
                    }
                }

                this.setObjectClipPath(element);
            } else {
                element = obj.elementLink;
                element.attr({ width: w, height: h });
                this.setObjectClipPath(element);
            }
            this.processGraphicsStyle(obj, element);
            this.forceRedraw();
            if (handler)
                handler(obj, element);
        };

        DEDesigner.prototype.onSVGUpdated = function (obj, data) {
            this.removeObjDefs(obj);
            var element;
            if (!data) {
                this.onSVGFail();
                return;
            }
            data = data.replace(new RegExp("<\\s*svg ", "g"), "<g ");
            data = data.replace(new RegExp("</\\s*svg", "g"), "</g");
            var xml = jQuery(jQuery.parseXML(data));
            var svgRoot;
            try  {
                svgRoot = xml.find("g").eq(0); //jQuery getAttribute error here. Why?! jQuery says we can skip it.
            } catch (e) {
            }
            if (!svgRoot) {
                this.onSVGFail();
                return;
            }
            var svgId = DEJS.Util.generateUID();
            svgRoot.attr("id", svgId);
            this.defs.append(svgRoot);

            var width = parseFloat(svgRoot.attr("width"));
            var height = parseFloat(svgRoot.attr("height"));

            /*var textBox = obj.textElementLink.getBBox(true);
             height = height * textBox.width / width;
             width = textBox.width;*/
            if (!obj.elementLink) {
                return;
            } else {
                element = obj.elementLink;
                element.attr({ src: "#" + svgId });
                element.attr({ width: width, height: height });
            }
            //this.forceRedraw();
        };

        DEDesigner.prototype.onSVGFail = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            //TODO: Add error handling
            alert("Failed to load graphics.");
        };

        DEDesigner.prototype.createPreloadElement = function (obj) {
            var size = Math.min(this.printAreaCoord[2] - this.printAreaCoord[0], this.printAreaCoord[3] - this.printAreaCoord[1]);
            var w = size;
            var h = size;
            var imageCoord = this.fitImageCoords(w, h, false);
            var element = this.canvas.image(this.imagePreloaderPath(), imageCoord[0], imageCoord[1], imageCoord[2], imageCoord[3]);
            element.attr("cursor", "pointer");
            obj.designer = this;
            element.id = element.node.id = obj.elementId = DEJS.Util.generateUID();
            obj.elementLink = element;
            element.node.elementLink = element;
            element.node.objectLink = obj;
            if (obj.defaultTransform.length > 0) {
                element.transform(obj.defaultTransform);
                obj.defaultTransform = "";
            }
            this.preloaders[element.id] = element;
            return element;
        };

        //returns preloader transformations
        DEDesigner.prototype.deletePreloadElement = function (obj) {
            var transform = "";
            if (obj.elementLink && this.preloaders[obj.elementLink.id]) {
                delete this.preloaders[obj.elementLink.id];
                var element = obj.elementLink;
                this.deSelect(element);
                obj.elementLink = undefined;
                var m = element.matrix;
                transform = "m" + [m.a, m.b, m.c, m.d, m.e, m.f].join(",");
                element.remove();
            }
            return transform;
        };

        DEDesigner.prototype.getSVG = function (includeProduct, includePrintingArea, includeMask) {
            this.deSelect();
            this.tracker.clear();
            var backgroundEl;
            var backgroundDefs;
            var rememeberedZoom = this.viewPort.zoom;
            var rememberedRuler = this.showRuler;
            this.setRuler(false);
            this.setZoom(100);
            this.updateTextElementTranformations();
            if (this.printAreaEl)
                this.printAreaEl.hide();
            if (this.maskEl && !includeMask)
                this.maskEl.hide();
            if (this.referenceEl)
                this.referenceEl.hide();

            if (includeProduct && this.productImage) {
                if (this.isPathSVG(this.productImage)) {
                    this.displayCutLines(true);
                    backgroundDefs = jQuery(this.backgroundCanvas.canvas).find("defs").children().clone();
                    backgroundDefs.appendTo(this.defs);
                    backgroundEl = this.canvas.use(this.backgroundUseID, 0, 0, this.width, this.height);
                    if (this.productEl) {
                        backgroundEl.transform(this.productEl.transform());
                    }
                    this.displayCutLines(false);
                } else {
                    backgroundEl = this.canvas.image(this.productImage, 0, 0, this.width, this.height);
                    if (this.productEl) {
                        backgroundEl.transform(this.productEl.transform());
                    }
                }
                backgroundEl.id = backgroundEl.node.id = "productImage";
                backgroundEl.attr("deservice", true);
                backgroundEl.toBack();
            }

            //CSS link to render fonts
            //Vanja's code:
            /*if (this.options.fontsCSSUrl.length > 0) {
             if (jQuery(this.defs).find("style").length == 0) {
             jQuery('<style type="text/css">@import url("' + this.options.fontsCSSUrl + '");</style>').appendTo(this.defs);
             }
             }*/
            var tempDiv = jQuery("<div>");
            var svgRoot = this.holder.children().eq(1).clone();
            if (DEJS.Trial.isTrial() && this.watermarkHolder) {
                var wmDiv = jQuery("<div>");
                wmDiv.html(DEJS.Trial.TrialWatermark);
                var watermark = wmDiv.find("svg");
                watermark.attr({ width: this.width });
                svgRoot.append(watermark);
            }
            tempDiv.append(svgRoot);

            var svg = tempDiv.html();

            //Fighting IE svg magic
            var xmlnsDoubler = 'xmlns="http://www.w3.org/2000/svg"';
            var firstTag = svg.split(">")[0];
            var firstIndex = firstTag.indexOf(xmlnsDoubler);
            var lastIndex = firstTag.lastIndexOf(xmlnsDoubler);
            if (lastIndex != firstIndex) {
                svg = svg.replace(xmlnsDoubler, " ");
            }

            //Fixing image links
            svg = svg.replace(xmlnsDoubler, xmlnsDoubler + ' xmlns:xlink="http://www.w3.org/1999/xlink"');

            svg = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + svg;

            if (this.printAreaEl)
                this.printAreaEl.show();
            if (this.maskEl)
                this.maskEl.show();
            if (this.referenceEl)
                this.referenceEl.show();
            if (backgroundEl) {
                backgroundEl.remove();
            }
            if (backgroundDefs) {
                backgroundDefs.remove();
            }

            //CSS link to render fonts
            //Luc's and Quiller's code
            svg = this.fixHrefs(svg);
            this.setRuler(rememberedRuler);
            this.setZoom(rememeberedZoom);
            if (this.options.fontsCSSUrl.length > 0) {
                svg = svg.replace("<defs/>", "<defs></defs>");
                svg = svg.replace("<defs />", "<defs></defs>");
                var index1 = svg.indexOf("<defs");
                var index2 = svg.indexOf(">", index1);
                if (index1 >= 0 && index2 >= 0) {
                    var s = svg.substr(0, index1) + '<defs><link xmlns="http://www.w3.org/1999/xhtml" href="' + this.options.fontsCSSUrl + '" type="text/css" rel="stylesheet"/>' + svg.substr(index2 + 1);
                    svg = s;
                }
            }
            return svg;
        };

        DEDesigner.prototype.getSVGState = function () {
            var defs = this.defs.clone();
            var objs = this.getObjList();
            var els = [];
            for (var i = 0; i < objs.length; i++) {
                if (objs[i].textElementLink) {
                    if (objs[i].elementLink) {
                        objs[i].textElementLink.transform(objs[i].elementLink.transform());
                    }
                    var attr = objs[i].textElementLink.attr();
                    attr["type"] = objs[i].textElementLink.type;
                    attr["id"] = objs[i].textElementLink.id;
                } else {
                    var attr = objs[i].elementLink.attr();
                    attr["type"] = objs[i].elementLink.type;
                    attr["id"] = objs[i].elementLink.id;
                }
                els.push(attr);
                if (objs[i].textElementLink) {
                    var attr = objs[i].elementLink.attr();
                    attr["type"] = objs[i].elementLink.type;
                    attr["id"] = objs[i].elementLink.id;
                    els.push(attr);
                }
            }
            var colArr = [];
            if (this.backgroundStyleNode && this.backgroundStyle) {
                colArr = this.backgroundStyle.toColorizeArray();
            }
            return { defs: defs, els: els, colArr: colArr };
        };

        DEDesigner.prototype.setSVG = function (svg) {
            this.stopRedraw();
            this.loadedSVGBackgroundStyle = null;
            var defsToDelete = [];
            var productImageDefId = "";
            this.clear();
            this.defs.empty();

            try  {
                var xml = jQuery(jQuery.parseXML(svg));
            } catch (e) {
            }

            var tempDiv = jQuery("<div>");
            var svgRoot = xml.children().eq(0);
            tempDiv.append(svgRoot);
            if (svgRoot.find("defs").length > 0) {
                svgRoot.find("defs").eq(0).children().each(function (index, elem) {
                    var defEl = jQuery(elem);
                    if (defEl.is("link")) {
                        defEl.remove();
                    }
                    if (defEl.attr("de-cut-mask")) {
                        defEl.remove();
                    }
                });
            }
            var defs = svgRoot.find("defs").children();
            if (defs) {
                defs.detach();
            }
            var strippedSVG = tempDiv.html();
            strippedSVG = this.fixHrefs(strippedSVG);
            var items = rappar(strippedSVG);
            var itemsToAdd = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i]["deservice"]) {
                    if (items[i]["src"]) {
                        defsToDelete.push(items[i]["src"]);
                        if (items[i]["id"] == "productImage") {
                            productImageDefId = items[i]["src"];
                        }
                    }
                } else {
                    //if (!items[i]["textSourceId"]) {
                    itemsToAdd.push(items[i]);
                    //}
                }
            }
            var res = this.canvas.add(itemsToAdd);
            var textEffectElemets = {};
            for (var i = 0; i < res.length; i++) {
                var tsId = res[i].attr("textSourceId");
                if (tsId) {
                    var teElement = res[i];
                    textEffectElemets[tsId] = teElement;
                    teElement.id = teElement.node.id = itemsToAdd[i]["id"];
                }
            }
            for (var i = 0; i < res.length; i++) {
                var tsId = res[i].attr("textSourceId");
                if (!tsId) {
                    var objType;
                    var objVal;
                    if (res[i].type == "text") {
                        objType = ObjectType.Text;
                        objVal = res[i].attr("text");
                    } else if (res[i].type == "use") {
                        objType = ObjectType.SVG;
                        objVal = res[i].attr("src");
                    } else {
                        objType = ObjectType.Image;
                        objVal = res[i].attr("src");
                    }
                    var addedObj = new DEJS.VO.Obj(objType, "dumb");
                    addedObj.initScale = Math.abs(res[i].matrix.split().scalex);
                    addedObj.loadedFromDesign = true;
                    var teElement2 = textEffectElemets[itemsToAdd[i]["id"]];
                    if (teElement2) {
                        addedObj.loadedTextEffectElement = teElement2;
                    }
                    this.onElementAdded(addedObj, res[i], false); //TODO: Check if we need dspatching here
                    //addedObj.checkTextFXAttr();
                }
            }
            this.defs = this.svgHolder.find("defs"); //defs are not the same after design load...
            if (defs) {
                this.defs.append(defs);
            }
            if (productImageDefId.length > 0) {
                try  {
                    this.extractLoadedBackgroundStyle(this.defs.find(productImageDefId));
                } catch (e) {
                }
            }
            this.removeDefs(defsToDelete);
            this.setupPrintArea();
            this.deSelect();
            this.canvas.renderfix();
            this.forceRedraw();
        };

        DEDesigner.prototype.setSVGState = function (stateObj /*, forHistory: boolean = false*/ ) {
            this.stopRedraw();
            var defs = stateObj.defs;
            defs = defs.clone();
            var els = stateObj.els;
            this.loadedSVGBackgroundStyle = null;
            var defsToDelete = [];
            var productImageDefId = "";
            this.clear(true);
            this.defs.empty();
            var items = els;
            var itemsToAdd = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i]["deservice"]) {
                    if (items[i]["src"]) {
                        defsToDelete.push(items[i]["src"]);
                        if (items[i]["id"] == "productImage") {
                            productImageDefId = items[i]["src"];
                        }
                    }
                } else {
                    //if (!items[i]["textSourceId"]) {
                    itemsToAdd.push(items[i]);
                    //}
                }
            }
            var res = this.canvas.add(itemsToAdd);
            var textEffectElemets = {};
            for (var i = 0; i < res.length; i++) {
                var tsId = res[i].attr("textSourceId");
                if (tsId) {
                    var teElement = res[i];
                    textEffectElemets[tsId] = teElement;
                    teElement.id = teElement.node.id = itemsToAdd[i]["id"];
                }
            }
            for (var i = 0; i < res.length; i++) {
                var tsId = res[i].attr("textSourceId");
                if (!tsId) {
                    var objType;
                    var objVal;
                    if (res[i].type == "text") {
                        objType = ObjectType.Text;
                        objVal = res[i].attr("text");
                    } else if (res[i].type == "use") {
                        objType = ObjectType.SVG;
                        objVal = res[i].attr("src");
                    } else {
                        objType = ObjectType.Image;
                        objVal = res[i].attr("src");
                    }
                    var addedObj = new DEJS.VO.Obj(objType, "dumb");
                    addedObj.initScale = Math.abs(res[i].matrix.split().scalex);
                    addedObj.loadedFromDesign = true;
                    DEJS.VO.Obj.restoreElAttrs(res[i], itemsToAdd[i]);
                    var teElement2 = textEffectElemets[itemsToAdd[i]["id"]];
                    if (teElement2) {
                        addedObj.loadedTextEffectElement = teElement2;
                    }
                    if (itemsToAdd[i].id) {
                        this.onElementAdded(addedObj, res[i], false, itemsToAdd[i].id);
                    } else {
                        this.onElementAdded(addedObj, res[i], false);
                    }
                    //addedObj.checkTextFXAttr();
                }
            }
            this.defs = this.svgHolder.find("defs"); //defs are not the same after design load...
            if (defs) {
                this.defs.append(defs);
            }
            if (productImageDefId.length > 0) {
                try  {
                    this.extractLoadedBackgroundStyle(this.defs.find(productImageDefId));
                } catch (e) {
                }
            }
            this.removeDefs(defsToDelete);
            this.setupPrintArea();
            this.deSelect();

            if (stateObj.colArr && stateObj.colArr.length) {
                if (this.loadingSVGBackground) {
                    this.loadedSVGBackgroundStyle = new DEJS.VO.StyleVO("");
                    this.loadedSVGBackgroundStyle.fromColorizeArray(stateObj.colArr);
                } else {
                    this.colorizeBackground(stateObj.colArr);
                    this.processBackgroundStyle();
                }
            }

            this.canvas.renderfix();
            this.updateViewBox();
            this.forceRedraw();
        };

        DEDesigner.prototype.clear = function (forHistory) {
            if (typeof forHistory === "undefined") { forHistory = false; }
            this.deSelect();
            this.tracker.clear();
            this.defs.html("");
            this.canvas.clear();
            this.captureDefs();
            this.elements = new Array();
            this.selectedEl = new Array();
            this.lastSelected = new Array();

            if (this.printAreaEl)
                this.printAreaEl.remove();
            this.printAreaEl = null;
            this.maskEl = null;
            this.referenceEl = null;
            this.setMask("", true);
            this.setupPrintArea();
            this.setupReference();
            if (!forHistory) {
                this.setZoom(100);
            }
            if (!forHistory) {
                this.dispatchEvent(new DEJS.Events.DesignerChangedEvent(this.selected()));
            }
        };

        DEDesigner.prototype.selected = function () {
            if (this.selectedEl.length > 0) {
                var el = this.selectedEl[0];
                if (el == null || el.node == null)
                    return;
                return el.node.objectLink;
            } else {
                return null;
            }
        };

        DEDesigner.prototype.onMouseDown = function (event) {
            //this.log("onMouseDown");
            //event.preventDefault();
            var x = this.tmpX = this.hitX = DEJS.Util.eventX(event, this.holder, this.viewPort);
            var y = this.tmpY = this.hitY = DEJS.Util.eventY(event, this.holder, this.viewPort);
            this.hitViewPort.x = this.viewPort.x;
            this.hitViewPort.y = this.viewPort.y;
            this.hitViewPort.zoom = this.viewPort.zoom;
            this.resizeXY = [x, y];
            if (this.isSelecting()) {
                this.stopSelection();
            } else {
                var el = null;
                //-----
                if (this.action == Action.BringToFront) {
                    //ToDo: rebuild according to designer architecture
                    DEJS.Model.canvasManager.arrange('front');
                    this.deSelect();
                }
                //-----
                if (this.drag) {
                    this.action = Action.Drag;
                } else {
                    if (event.target.elementLink) {
                        el = event.target.elementLink;
                    } else if (event.target.parentNode && event.target.parentNode.elementLink) {
                        el = event.target.parentNode.elementLink;
                    }
                    var isTracker = this.tracker.processClick(x, y);
                    if (!el && !(event.target.isTracker || isTracker)) {
                        var i = this.elements.length - 1;
                        while (!el && i >= 0) {
                            var curEl = this.elements[i];
                            if (DEJS.Util.isClicked(x, y, curEl))
                                el = curEl;
                            i--;
                        }
                    }
                    if (el) {
                        if (!this.isSelected(el)) {
                            this.select(el);
                        }
                        if (el.node == null)
                            return;
                        var obj = el.node.objectLink;
                        if (obj && obj.canMove()) {
                            this.action = Action.Move;
                        }
                    } else if (!(event.target.isTracker || isTracker)) {
                        this.deSelect();

                        //this.startSelection(x, y);
                        if (this.options.zoomEnabled)
                            this.action = Action.Drag;
                        return;
                    } else {
                        return;
                    }
                }
            }
            return false;
        };

        DEDesigner.prototype.onMouseMove = function (event) {
            //this.log("onMouseMove");
            //event.preventDefault();
            //-----
            var preventDefault = true;
            //-----
            var x = DEJS.Util.eventX(event, this.holder, this.viewPort);
            var y = DEJS.Util.eventY(event, this.holder, this.viewPort);
            if (this.selectionBox) {
                DEJS.Util.resize(this.selectionBox, x - this.hitX, y - this.hitY, this.hitX, this.hitY);
            } else {
                if (this.action == Action.Drag) {
                    x = DEJS.Util.eventX(event, this.holder, this.hitViewPort);
                    y = DEJS.Util.eventY(event, this.holder, this.hitViewPort);
                    this.viewPort.x += this.tmpX - x;
                    this.viewPort.y += this.tmpY - y;
                    this.tmpX = x;
                    this.tmpY = y;

                    /*this.viewPort.x = this.hitViewPort.x - x + this.hitX;
                     this.viewPort.y += this.hitViewPort.y - y + this.hitY;*/
                    this.updateViewBox();
                } else if (this.action == Action.Move) {
                    for (var i = 0; i < this.selectedEl.length; i++) {
                        DEJS.Util.move(this.selectedEl[i], x - this.tmpX, y - this.tmpY);
                    }
                    this.tracker.track();
                    this.tmpX = x;
                    this.tmpY = y;
                } else if (this.action == Action.Rotate) {
                    var bbox = DEJS.Util.getBBox(this.selectedEl[0], true);
                    var matrix = this.selectedEl[0].matrix;
                    var cx = matrix.x(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);
                    var cy = matrix.y(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);
                    var ax = matrix.x(bbox.x, bbox.y + bbox.height / 2);
                    var ay = matrix.y(bbox.x, bbox.y + bbox.height / 2);
                    var bx = matrix.x(bbox.x, bbox.y + bbox.height);
                    var by = matrix.y(bbox.x, bbox.y + bbox.height);
                    var ab = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
                    var ac = Math.sqrt((ax - cx) * (ax - cx) + (ay - cy) * (ay - cy));
                    var trackerAngle = Math.atan2(ab, ac);
                    var addDeg = 90 + trackerAngle * (180 / Math.PI);
                    var rad = Math.atan2(y - cy, x - cx);
                    var deg = ((((rad * (180 / Math.PI)) + 90) % 360) + 360 + addDeg) % 360;
                    DEJS.Util.rotateAbsolute(this.selectedEl[0], deg);
                    this.tracker.track();
                } else if (this.action == Action.Resize) {
                    DEJS.Util.resizeElement(this.selectedEl[0], this.resizeXY, [x, y]);
                    this.tracker.track(this.selectedEl[0]);
                    this.resizeXY = [x, y];
                } else if (this.action == Action.ResizeH) {
                    DEJS.Util.resizeElement(this.selectedEl[0], this.resizeXY, [x, y], ResizeKind.Horizontal);
                    this.tracker.track(this.selectedEl[0]);
                    this.resizeXY = [x, y];
                } else if (this.action == Action.ResizeV) {
                    DEJS.Util.resizeElement(this.selectedEl[0], this.resizeXY, [x, y], ResizeKind.Vertical);
                    this.tracker.track(this.selectedEl[0]);
                    this.resizeXY = [x, y];
                } else {
                    //-----
                    preventDefault = false;
                    //-----
                }
            }
            //-----for touch scrolling on mobiles
            if (preventDefault) {
                event.preventDefault()
            }
            //-----
            return false;
        };

        DEDesigner.prototype.onMouseUp = function (event) {
            //this.log("onMouseUp");
            event.preventDefault();
            var x = 0;
            var y = 0;
            if (!mobilesafari) {
                x = DEJS.Util.eventX(event, this.holder, this.viewPort);
                y = DEJS.Util.eventY(event, this.holder, this.viewPort);
            }

            if (this.isSelecting()) {
                var sbox = DEJS.Util.getBBox(this.selectionBox);
                var newSelected = [];

                /*for (var i = 0; i < this.elements.length; i++) {  //TODO: Enable it when multiselect will be here.
                 if (Util.rectsIntersect(this.elements[i].getBBox(), sbox)) { //TODO: is getBBox(false) to slow here?
                 newSelected.push(this.elements[i]);
                 }
                 }*/
                if (newSelected.length == 0) {
                    this.deSelect();
                }
                if (newSelected.length > 0) {
                    this.select(newSelected[0]);
                }
                if (this.selectionBox.node && this.selectionBox.node.parentNode) {
                    this.selectionBox.remove();
                }
                this.selectionBox = null;
            } else {
                if (this.action == Action.Move) {
                    this.dispatchEvent(new DEJS.Events.DesignerChangedEvent(this.selected()));
                } else if (this.action == Action.Resize || this.action == Action.ResizeH || this.action == Action.ResizeV || this.action == Action.Rotate) {
                    var e = new DEJS.Events.DesignerChangedEvent(this.selected());
                    e.objectSizeChanged = true;
                    this.dispatchEvent(e);
                }
                this.action = "";
            }
            var doRemove = false;
            if ((((new Date()).getTime() - this.lastClick) < this.doubleClickDelay) && !this.blockDoubleClick)
                doRemove = true;

            var doDClick = false;
            if ((((new Date()).getTime() - this.lastClick) < this.doubleClickDelay) && !this.blockDoubleClick)
                doDClick = true;
            if (!this.blockDoubleClick)
                this.lastClick = (new Date()).getTime();
            if (doDClick) {
                var tid = "";
                if (event.target && event.target.id) {
                    tid = event.target.id;
                }
                if (tid.substr(0, 10) != "de-tracker")
                    this.dblclick();
            }
            if (doRemove && this.options.deleteOnDoubleClick)
                this.askRemove();
            return false;
        };

        DEDesigner.prototype.onTouchStart = function (event) {
            //this.log(this.counter++, true);
            this.speedRender();
            //event.preventDefault();
            var touches = DEJS.Util.Touch.processEvent(event, this.holder, this.viewPort);
            if (touches.length > 1) {
                this.transform(touches);
            } else {
                this.onMouseDown(event);
            }
            return false;
        };

        DEDesigner.prototype.onTouchMove = function (event) {
            this.speedRender();
            //event.preventDefault();
            var touches = DEJS.Util.Touch.processEvent(event, this.holder, this.viewPort);
            if (touches.length > 1) {
                if ((this.selectedEl.length == 0 || this.drag) && this.options.zoomEnabled) {
                    this.touchDrag(event);
                } else {
                    this.transform(touches);
                }
            } else {
                this.onMouseMove(event);
            }
            return false;
        };

        DEDesigner.prototype.onTouchEnd = function (event) {
            event.preventDefault();
            var touches = DEJS.Util.Touch.processEvent(event, this.holder, this.viewPort);

            /*this.log("transforming: " + this.transforming
             + "; touches: " + touches.length
             + "; time: " + (new Date()).getTime);*/
            this.blockDoubleClick = this.transforming || touches.length > 0;
            this.stopTransform();
            this.dragging = false;
            this.onMouseUp(event); // Shutting down anyway.
            return false;
        };

        DEDesigner.prototype.transform = function (touches) {
            if (this.selectedEl.length == 0)
                return;
            var element = this.selectedEl[0];
            if (!this.transforming) {
                this.transforming = true;
            } else {
                //this.log('transform!');
                if (DEJS.Util.touchTransform(element, this.rememberedTouches, touches)) {
                    this.tracker.track();
                } else {
                    this.stopTransform();
                }
            }
            this.rememberedTouches = touches;
        };

        DEDesigner.prototype.stopTransform = function () {
            this.transforming = false;
            this.dispatchEvent(new DEJS.Events.DesignerChangedEvent(this.selected()));
        };

        DEDesigner.prototype.touchDrag = function (event) {
            var element = this.selectedEl[0];
            if (!this.dragging) {
                this.rememberedTouches = DEJS.Util.Touch.processEvent(event, this.holder, this.viewPort);
                this.hitViewPort.x = this.viewPort.x;
                this.hitViewPort.y = this.viewPort.y;
                this.hitViewPort.zoom = this.viewPort.zoom;
                this.dragging = true;
            } else {
                var touches = DEJS.Util.Touch.processEvent(event, this.holder, this.hitViewPort);
                DEJS.Util.touchDrag(this.viewPort, this.rememberedTouches, touches, this.canvas.width, this.canvas.height);
                this.updateViewBox();
                this.rememberedTouches = touches;
            }
        };

        DEDesigner.prototype.startSelection = function (x, y) {
            /*this.selectionBox = this.canvas.rect(x, y, 0, 0) //TODO: Enable when multiselect is here again
             .attr({
             "fill-opacity": 0.15,
             "stroke-opacity": 0.5,
             "fill": "#007fff",
             "stroke": "#007fff",
             "visibility": "hidden"
             });*/
            this.selectionBox = this.canvas.rect(x, y, 0, 0).attr({
                "fill-opacity": 0.0,
                "stroke-opacity": 0.0,
                "fill": "#007fff",
                "stroke": "#007fff",
                "visibility": "hidden"
            });
        };

        DEDesigner.prototype.stopSelection = function () {
            this.selectionBox.remove();
            this.selectionBox = null;
        };

        DEDesigner.prototype.isSelecting = function () {
            return this.selectionBox != null;
        };

        DEDesigner.prototype.select = function (element, dispatchObjSelected) {
            if (typeof dispatchObjSelected === "undefined") { dispatchObjSelected = true; }
            if (!element)
                return;
            this.deSelect();
            this.selectedEl = [element];
            this.tracker.track(element);
            this.lastSelectedObj = element.node.objectLink;
            if (dispatchObjSelected) {
                this.dispatchEvent(new DEJS.Events.ObjectSelectedEvent(element.node.objectLink));
            }
        };

        DEDesigner.prototype.deSelect = function (element) {
            if (!element) {
                this.lastSelected = [];
                while (this.selectedEl[0]) {
                    this.lastSelected.push(this.selectedEl[0]);
                    this.deSelect(this.selectedEl[0]);
                }
                this.tracker.clear();
            } else {
                DEJS.Util.arrayRemove(element, this.selectedEl);
                this.tracker.stopTrack(element);
            }
            if (this.lastSelectedObj != null) {
                this.lastSelectedObj = null;
                this.dispatchEvent(new DEJS.Events.ObjectSelectedEvent(null));
            }
        };

        DEDesigner.prototype.dblclick = function () {
            var a = this.selected();
            this.dispatchEvent(new DEJS.Events.ObjectDClickedEvent(this.selected()));
        };
        DEDesigner.prototype.askRemove = function () {
            if (this.selectedEl.length == 0)
                return;
            var obj = this.selectedEl[0].node.objectLink;
            if (!obj || !obj.canDelete())
                return;
            if (confirm("Delete the item?")) {
                var element = this.selectedEl[0];
                this.remove((element.node.objectLink));
            }
        };

        DEDesigner.prototype.remove = function (obj) {
            var element;
            if (obj == null) {
                if (this.selectedEl.length == 0) {
                    return null;
                } else {
                    element = this.selectedEl[0];
                    obj = element.node.objectLink;
                }
            } else {
                element = obj.elementLink;
                if (element == null)
                    return obj;
            }
            this.removeObjDefs(element.node.objectLink);
            element.remove();
            DEJS.Util.arrayRemove(element, this.elements);
            if (obj && obj.textElementLink) {
                obj.textElementLink.remove();
            }
            this.deSelect();
            this.dispatchEvent(new DEJS.Events.DesignerChangedEvent(obj));
            return obj;
        };

        DEDesigner.prototype.align = function (side, obj) {
            var element;
            if (obj == null) {
                if (this.selectedEl.length == 0)
                    return null;
                else
                    element = this.selectedEl[0];
            } else {
                element = obj.elementLink;
                if (element == null)
                    return obj;
            }
            if (!obj.canMove())
                return;
            var box = DEJS.Util.getBBox(element);
            switch (side) {
                case AlignSide.Top:
                    DEJS.Util.move(element, 0, this.printAreaCoord[1] - box.y);
                    break;
                case AlignSide.Bottom:
                    DEJS.Util.move(element, 0, this.printAreaCoord[3] - box.y2);
                    break;
                case AlignSide.Left:
                    DEJS.Util.move(element, this.printAreaCoord[0] - box.x, 0);
                    break;
                case AlignSide.Right:
                    DEJS.Util.move(element, this.printAreaCoord[2] - box.x2, 0);
                    break;
                case AlignSide.VCenter:
                    DEJS.Util.move(element, 0, (this.printAreaCoord[1] + this.printAreaCoord[3] - (box.y2 - box.y)) / 2 - box.y);
                    break;
                case AlignSide.HCenter:
                    DEJS.Util.move(element, (this.printAreaCoord[0] + this.printAreaCoord[2] - (box.x2 - box.x)) / 2 - box.x, 0);
                    break;
            }
            if (this.selectedEl.length > 0)
                this.tracker.track(this.selectedEl[0]);
            return obj;
        };

        DEDesigner.prototype.isSelected = function (element) {
            return DEJS.Util.arrayIndexOf(element, this.selectedEl) != -1;
        };

        DEDesigner.prototype.printingArea = function (coords, scale) {
            this.printAreaCoord = coords;
            this.setupPrintArea();

            //redraw product and elements with new size
            if (scale) {
                this.updateProductSize();
                this.updateElementsSize(scale);
            }
        };

        DEDesigner.prototype.defaultPrintingArea = function () {
            this.printAreaCoord = [0, 0, this.width, this.height];
            this.setupPrintArea();
        };

        //Set print area visible property
        DEDesigner.prototype.printingAreaVisible = function (val, redrawArea) {
            if (typeof redrawArea === "undefined") { redrawArea = false; }
            this.printAreaVisible = val;
            if (redrawArea)
                this.setupPrintArea();
        };

        DEDesigner.prototype.printingAreaUnits = function (area) {
            this.printAreaUnits = area;
        };

        //Draw print area rectangle
        DEDesigner.prototype.setupPrintArea = function () {
            if (this.printAreaEl) {
                this.printAreaEl.remove();
                this.printAreaEl = null;
            }

            if (!this.printAreaVisible)
                return;

            this.printAreaEl = this.canvas.rect(this.printAreaCoord[0], this.printAreaCoord[1], this.printAreaCoord[2] - this.printAreaCoord[0], this.printAreaCoord[3] - this.printAreaCoord[1]);
            this.printAreaEl.id = this.printAreaEl.node.id = "printingArea";
            this.printAreaEl.attr("stroke", "grey");
            this.printAreaEl.attr("deservice", true);
            this.fixPrintAreaLayer();
        };

        DEDesigner.prototype.setClipRect = function (val) {
            this.clipRectCoord = val;

            for (var i = 0; i < this.elements.length; i++) {
                var element = this.elements[i];
                this.setObjectClipPath(element);
            }
        };

        DEDesigner.prototype.setObjectClipPath = function (element) {
            var obj = element.node.objectLink;
            if (this.clipRectCoord && this.clipRectCoord.length == 4) {
                //convert [x1,y1,x2,y1] -> [x,y,w,h]
                var clipRect = [this.clipRectCoord[0], this.clipRectCoord[1], this.clipRectCoord[2] - this.clipRectCoord[0], this.clipRectCoord[3] - this.clipRectCoord[1]];
                element.attr("clip-rect", clipRect.join(" "));
                if (obj && obj.textElementLink)
                    obj.textElementLink.attr("clip-rect", clipRect.join(" "));
            } else {
                element.attr("clip-rect", "0 0 " + this.width + " " + this.height);
                if (obj && obj.textElementLink)
                    obj.textElementLink.attr("clip-rect", "0 0 " + this.width + " " + this.height);
            }
        };

        DEDesigner.prototype.updateProductSize = function (imgWidth, imgHeight) {
            if (typeof imgWidth === "undefined") { imgWidth = 0; }
            if (typeof imgHeight === "undefined") { imgHeight = 0; }
            if (this.loadingBackground()) {
                this.scaleLoadedBackground = true;
            } else {
                if (this.backgroundCanvas) {
                    if (this.scaleLoadedBackground && this.productDefsRoot) {
                        var w = parseFloat(this.productDefsRoot.attr("width"));
                        var h = parseFloat(this.productDefsRoot.attr("height"));
                        var scaleX = this.width / w;
                        var scaleY = this.height / h;
                        this.productDefsRoot.attr({ transform: "scale(" + scaleX + "," + scaleY + ")" });
                        if (this.maskDefsRoot) {
                            this.maskDefsRoot.attr({ transform: "scale(" + scaleX + "," + scaleY + ")" });
                        }
                    } else if (this.scaleLoadedBackground && this.productEl && imgWidth != 0 && imgWidth != 0) {
                        var w = imgWidth;
                        var h = imgHeight;
                        var scaleX = this.width / w;
                        var scaleY = this.height / h;
                        this.productElTransform = "scale(" + scaleX + "," + scaleY + ")";
                    }
                    var scaleX = (this.printAreaCoord[2] - this.printAreaCoord[0]) / this.width;
                    var scaleY = (this.printAreaCoord[3] - this.printAreaCoord[1]) / this.height;

                    this.backgroundCanvas.forEach(function (el) {
                        el.attr({ transform: "s" + scaleX + "," + scaleY });
                        return true;
                    }, this);
                    if (this.productEl) {
                        if (this.maskEl) {
                            this.maskEl.transform(this.productEl.transform());
                        }
                    }
                }
            }
        };

        DEDesigner.prototype.updateElementsSize = function (scale) {
            if (this.canvas && scale && scale != 1) {
                this.deSelect();
                this.canvas.forEach(function (el) {
                    if (el.type == 'text') {
                        DEJS.Util.scaleElementRough(el, scale);
                    }
                    return true;
                }, this);
            }
        };

        DEDesigner.prototype.setupReference = function () {
            if (this.referenceEl) {
                this.referenceEl.remove();
                this.referenceEl = null;
            }
            if (this.options.referenceImage == "")
                return;
            this.referenceEl = this.canvas.image(this.options.referenceImage, 0, this.canvas.height - this.options.referenceShift, this.options.referenceWidth, this.options.referenceHeight);
            this.referenceEl.id = this.referenceEl.node.id = "referenceImage";
            this.referenceEl.attr("deservice", true);
            this.fixPrintAreaLayer();
        };

        DEDesigner.prototype.fixPrintAreaLayer = function () {
            if (this.maskEl)
                this.maskEl.toFront();
            if (this.printAreaEl)
                this.printAreaEl.toFront();
            if (this.referenceEl)
                this.referenceEl.toBack();
        };

        DEDesigner.prototype.trackerAction = function (action) {
            if (action == Action.Delete)
                this.remove();
            else
                this.action = action;
        };

        DEDesigner.prototype.layerChange = function (element, op) {
            var index = DEJS.Util.arrayIndexOf(element, this.elements);
            if (index == -1)
                return;
            this.elements.splice(index, 1);
            switch (op) {
                case "toBack":
                    index = 0;
                    break;
                case "toFront":
                    index = this.elements.length;
                    break;
                case "up":
                    index++;
                    if (index > this.elements.length)
                        index = this.elements.length;
                    break;
                case "down":
                    index--;
                    if (index < 0)
                        index = 0;
                    break;
            }
            this.elements.splice(index, 0, element);
        };

        DEDesigner.prototype.checkObjectType = function (obj) {
            if (obj.type == ObjectType.Image) {
                if (this.isPathSVG(obj.value)) {
                    obj.type = ObjectType.SVG;
                }
            }
        };

        DEDesigner.prototype.isPathSVG = function (path) {
            var ar = path.split(".");
            if (ar.length > 0 && ar[ar.length - 1].toLowerCase() == "svg")
                return true;
            else
                return false;
        };

        DEDesigner.prototype.fitImageCoords = function (width, height, fitDPU, suppressResize) {
            if (typeof fitDPU === "undefined") { fitDPU = true; }
            if (typeof suppressResize === "undefined") { suppressResize = false; }
            var objMaxScale = 0;
            var w = width;
            var h = height;
            var paWidth = this.printAreaCoord[2] - this.printAreaCoord[0];
            var paHeight = this.printAreaCoord[3] - this.printAreaCoord[1];
            if (!w || isNaN(w))
                w = paWidth;
            if (!h || isNaN(h))
                h = paHeight;
            if (!suppressResize && w > paWidth) {
                h = h * paWidth / w;
                w = paWidth;
            }
            if (!suppressResize && h > paHeight) {
                w = w * paHeight / h;
                h = paHeight;
            }

            //Checking dpi
            if (this.options.minDPU > 0 && this.dpu > 0 && fitDPU) {
                var maxScale = this.dpu / this.options.minDPU;
                var maxWidth = width * maxScale;
                if (maxWidth > w) {
                    objMaxScale = maxWidth / w;
                } else {
                    w = width * maxScale;
                    h = height * maxScale;
                    objMaxScale = 1;
                }
            }
            return [(paWidth - w) / 2 + this.printAreaCoord[0], (paHeight - h) / 2 + this.printAreaCoord[1], w, h, objMaxScale];
        };

        DEDesigner.prototype.fitSVGCoords = function (w, h, viewBoxW, viewBoxH, suppressResize) {
            if (typeof suppressResize === "undefined") { suppressResize = false; }
            var paWidth = this.printAreaCoord[2] - this.printAreaCoord[0];
            var paHeight = this.printAreaCoord[3] - this.printAreaCoord[1];
            if (!w || isNaN(w))
                w = viewBoxW ? viewBoxW : paWidth;
            if (!h || isNaN(h))
                h = viewBoxH ? viewBoxH : paHeight;
            var scale = 1;
            if (!suppressResize && w > paWidth) {
                scale *= paWidth / w;
                h = h * paWidth / w;
                w = paWidth;
            }
            if (!suppressResize && h > paHeight) {
                scale *= paHeight / h;
                w = w * paHeight / h;
                h = paHeight;
            }
            return [(paWidth - w) / 2 + this.printAreaCoord[0], (paHeight - h) / 2 + this.printAreaCoord[1], w, h, scale];
        };

        DEDesigner.prototype.removeObjDefs = function (obj) {
            if (!obj || !obj.isSVG() || obj.elementLink == null)
                return;
            var id = obj.elementLink.attr("src");
            var def = this.defs.find(id);
            if (def)
                def.detach();
        };

        DEDesigner.prototype.removeDefs = function (defsArr) {
            if (!this.defs)
                return;
            for (var i = 0; i < defsArr.length; i++) {
                try  {
                    var def = this.defs.find(defsArr[i]);
                    if (def)
                        def.detach();
                } catch (e) {
                }
            }
        };

        DEDesigner.prototype.getObjList = function () {
            var res = [];
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].node && this.elements[i].node.objectLink) {
                    res.push(this.elements[i].node.objectLink);
                }
            }
            return res;
        };

        DEDesigner.prototype.processBackgroundStyle = function (colorizableGroups) {
            if (this.backgroundStyleNode) {
                this.backgroundStyle = new DEJS.VO.StyleVO(this.backgroundStyleNode.text(), colorizableGroups);
                if (this.loadedSVGBackgroundStyle) {
                    this.backgroundStyle.fromColorizeArray(this.loadedSVGBackgroundStyle.toColorizeArray());
                    this.colorizeBackground(this.backgroundStyle.toColorizeArray());
                    this.loadedSVGBackgroundStyle = null;
                }
                var colAr = this.backgroundStyle.toColorizeArray();
                this.dispatchEvent(new DEJS.Events.BackgroundColorizeParsedEvent(colAr));
            } else {
                this.dispatchEvent(new DEJS.Events.BackgroundColorizeParsedEvent([]));
            }
        };

        DEDesigner.prototype.extractLoadedBackgroundStyle = function (svgDef) {
            if (!svgDef)
                return;
            var styleNode = svgDef.find("style");
            if (styleNode) {
                this.loadedSVGBackgroundStyle = new DEJS.VO.StyleVO(styleNode.text());
            }
        };

        DEDesigner.prototype.colorizeBackground = function (colorizeArray) {
            if (this.backgroundStyleNode && this.backgroundStyle && !this.loadingSVGBackground) {
                this.backgroundStyle.fromColorizeArray(colorizeArray);
                this.backgroundStyleNode.text(this.backgroundStyle.toString());
                this.forceRedraw();
            }
        };

        DEDesigner.prototype.forceRedraw = function () {
            var _this = this;
            if (this.redrawing)
                this.stopRedraw();
            this.redrawing = true;
            this.redrawEl = this.holder[0];

            this.redrawN = document.createTextNode(' ');
            var disp = this.redrawEl.style.display;

            this.redrawEl.appendChild(this.redrawN);
            this.redrawEl.style.display = 'none';

            var stopRedraw = function () {
                return _this.stopRedraw();
            };
            setTimeout(stopRedraw, 40); // you can play with this timeout to make it as short as possible
        };

        DEDesigner.prototype.stopRedraw = function () {
            if (!this.redrawing)
                return;
            this.redrawing = false;
            this.redrawEl.style.display = "";
            this.redrawN.parentNode.removeChild(this.redrawN);
        };

        DEDesigner.prototype.delayRedraw = function () {
            var _this = this;
            if (!this.redrawing)
                return;
            this.stopRedraw();
            var forceRedraw = function () {
                return _this.forceRedraw();
            };
            setTimeout(forceRedraw, 40);
        };

        DEDesigner.prototype.speedRender = function () {
            if (!this.speedDiv)
                return;
            this.speedDiv.text(".");
        };

        DEDesigner.prototype.createSpeedDiv = function () {
            this.speedDiv = jQuery("<div>");
            this.speedDiv.css({ "font-size": 1, "color": "#010101", "z-index": 0, "pointer-events": "none" });
            this.speedDiv.appendTo(this.holder);
        };

        DEDesigner.prototype.fixHrefs = function (svg) {
            //fixing hrefs in mobile OSes
            var index = 0;
            while (index >= 0) {
                index = svg.indexOf("href", index);
                if (index >= 0) {
                    if (svg.substring(index - 1, index) != ":") {
                        var test = svg.substring(index - 4, index - 2).toLocaleLowerCase();
                        var newSvg = svg.slice(0, index) + "xlink:" + svg.slice(index);
                        svg = newSvg;
                        index = index + 7;
                    } else if (svg.substring(index - 4, index - 2).toLocaleLowerCase() == "ns") {
                        var newSvg = svg.slice(0, index - 4) + "xlink:" + svg.slice(index);
                        svg = newSvg;
                        index = index + 4;
                    } else {
                        index++;
                    }
                }
            }
            var index = 0;
            return svg;
        };

        DEDesigner.prototype.fixWhiteSpaces = function () {
            this.canvas.canvas.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
        };

        DEDesigner.prototype.setLockProportions = function (lockProportions) {
            if (lockProportions == this.lockProportions)
                return;
            this.lockProportions = lockProportions;
            this.tracker.setLockProportions(lockProportions);
        };

        DEDesigner.prototype.processGraphicsStyle = function (obj, element) {
            if (!obj.multicolor)
                return;
            var objStyleNode = this.getObjStyleNode(obj, element);
            if (!objStyleNode)
                return;
            var objStyle = new DEJS.VO.StyleVO(objStyleNode.text(), element.attr("src"));
            obj.styleVO = objStyle;

            var colAr = objStyle.toColorizeArray();
            if (!obj.complexColor.colorizeInited) {
                for (var i = 0; i < colAr.length; i++) {
                    var colorEl = colAr[i];
                    var coloElId = DEJS.Util.cleanUID(colorEl.id);
                    var productColorEl = DEJS.Util.arrayFind(obj.complexColor.colorizeList, "id", coloElId);
                    if (productColorEl)
                        productColorEl.value = colorEl.value;
                }
            }
            obj.complexColor.colorizeInited = true;
        };

        DEDesigner.prototype.getObjStyleNode = function (obj, element) {
            var res;
            if (!obj)
                return null;
            if (!element)
                return null;
            if (obj.type != ObjectType.SVG)
                return null;
            var id = element.attr("src");
            var graphicsRoot = this.defs.find(id);
            res = graphicsRoot.find("style");
            return res;
        };

        DEDesigner.prototype.colorizeObject = function (obj) {
            if (!obj)
                return;
            if (!obj.complexColor)
                return;
            var colorizeArray = obj.complexColor.colorizeList;
            var objStyleNode = this.getObjStyleNode(obj, obj.elementLink);
            if (objStyleNode && obj.styleVO) {
                obj.styleVO.fromColorizeArray(colorizeArray);
                objStyleNode.text(obj.styleVO.toString());
                this.forceRedraw();
            }
        };

        DEDesigner.prototype.extractLoadedGraphicsStyle = function (obj) {
            if (!obj)
                return;
            var styleNode = this.getObjStyleNode(obj, obj.elementLink);
            if (styleNode) {
                obj.styleVO = new DEJS.VO.StyleVO(styleNode.text());
            }
            this.processGraphicsStyle(obj, obj.elementLink);
        };

        DEDesigner.prototype.setZoom = function (zoom) {
            if (!this.options.zoomEnabled)
                return;
            if (zoom == this.viewPort.zoom)
                return;
            var rulerSize = this.rulerHolder ? this.ruler.rulerSize : 0;

            this.viewPort.zoom = zoom;
            var width = this.canvas.width / (zoom / 100);
            var height = this.canvas.height / (zoom / 100);
            this.viewPort.x = (this.canvas.width - (rulerSize / (zoom / 100)) - width) / 2;
            this.viewPort.y = (this.canvas.height - (rulerSize / (zoom / 100)) - height) / 2;
            this.updateViewBox();
        };

        DEDesigner.prototype.setDrag = function (drag) {
            if (drag == this.drag)
                return;
            this.drag = drag;
            if (this.drag) {
                this.svgHolder.css("cursor", "move");
            } else {
                this.svgHolder.css("cursor", "default");
            }
        };

        DEDesigner.prototype.setViewPort = function (viewPort) {
            if (this.viewPort.x.toFixed(8) == viewPort.x.toFixed(8) && this.viewPort.y.toFixed(8) == viewPort.y.toFixed(8) && this.viewPort.zoom.toFixed(8) == viewPort.zoom.toFixed(8))
                return;
            this.viewPort.x = viewPort.x;
            this.viewPort.y = viewPort.y;
            this.viewPort.zoom = viewPort.zoom;
            this.updateViewBox();
        };

        DEDesigner.prototype.updateViewBox = function () {
            this.trimViewPort();
            var rulerSize = this.rulerHolder ? this.ruler.rulerSize : 0;

            var width = (this.canvas.width + rulerSize) / (this.viewPort.zoom / 100);
            var height = (this.canvas.height + rulerSize) / (this.viewPort.zoom / 100);
            var dx = rulerSize / (this.viewPort.zoom / 100);

            this.canvas.setViewBox(this.viewPort.x - dx, this.viewPort.y - dx, width, height, false);
            if (this.backgroundCanvas) {
                this.backgroundCanvas.setViewBox(this.viewPort.x - dx, this.viewPort.y - dx, width, height, false);
            }
            ;
            if (this.referenceEl) {
                this.referenceEl.attr({ x: this.viewPort.x, y: (this.viewPort.y + height - this.options.referenceShift) });
            }
            this.tracker.setZoom(this.viewPort.zoom);
            this.speedRender();
            this.ruler.setViewPort(this.viewPort);
            this.dispatchEvent(new DEJS.Events.ViewPortChangedEvent(this.viewPort, this));
        };

        DEDesigner.prototype.trimViewPort = function () {
            if (this.viewPort.zoom > this.options.maxZoom)
                this.viewPort.zoom = this.options.maxZoom;
            if (this.viewPort.zoom < this.options.minZoom)
                this.viewPort.zoom = this.options.minZoom;

            var width = (this.canvas.width) / (this.viewPort.zoom / 100);
            var height = (this.canvas.height) / (this.viewPort.zoom / 100);

            if (this.viewPort.zoom <= 100) {
                this.viewPort.x = (this.canvas.width - width) / 2;
                this.viewPort.y = (this.canvas.height - height) / 2;
            } else {
                var minX = 0;
                if (this.viewPort.x < minX)
                    this.viewPort.x = minX;
                var maxX = this.canvas.width - width;
                if (this.viewPort.x > maxX)
                    this.viewPort.x = maxX;
                var minY = 0;
                if (this.viewPort.y < minY)
                    this.viewPort.y = minY;
                var mayY = this.canvas.height - height;
                if (this.viewPort.y > mayY)
                    this.viewPort.y = mayY;
            }
        };

        DEDesigner.prototype.forceTrackerUpdate = function (obj) {
            if (this.selected() == obj) {
                this.tracker.track(obj.elementLink, true);
            }
        };

        DEDesigner.prototype.displayCutLines = function (display) {
            var lines = jQuery(this.backgroundCanvas.canvas).find("[de-cutline='true']");
            var l = lines.length;
            if (display) {
                lines.css({ display: "inline" });
            } else {
                lines.css({ display: "none" });
            }
        };

        DEDesigner.prototype.updateTextElementTranformations = function () {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].node.objectLink) {
                    var obj = this.elements[i].node.objectLink;
                    if (obj.textElementLink) {
                        obj.textElementLink.transform(this.elements[i].transform());
                        var textBox = DEJS.Util.getBBox(obj.elementLink, true);
                        obj.textElementLink.transform("...t" + textBox.width / 2 + "," + textBox.height / 2);
                    }
                }
            }
        };

        DEDesigner.prototype.magic = function () {
        };

        DEDesigner.prototype.log = function (msg, noAppend) {
            return;
            if (!this.logDiv) {
                this.logDiv = jQuery("#divLog");
            }
            if (!noAppend)
                this.logDiv.append(msg + "<br/>");
            else
                this.logDiv.text("" + msg);
        };
        return DEDesigner;
    })(DEJS.Events.EventDispatcher);
    DEJS.DEDesigner = DEDesigner;

    (function (Action) {
        Action.Move = "move";
        Action.Resize = "resize";
        Action.ResizeH = "resizeH";
        Action.ResizeV = "resizeV";
        Action.Rotate = "rotate";
        Action.Delete = "delete";
        Action.Drag = "drag";
        //-----
        Action.BringToFront = "bringtofront";
        //-----
    })(DEJS.Action || (DEJS.Action = {}));
    var Action = DEJS.Action;

    (function (ResizeKind) {
        ResizeKind.Both = "both";
        ResizeKind.Horizontal = "horizontal";
        ResizeKind.Vertical = "vertical";
    })(DEJS.ResizeKind || (DEJS.ResizeKind = {}));
    var ResizeKind = DEJS.ResizeKind;
})(DEJS || (DEJS = {}));