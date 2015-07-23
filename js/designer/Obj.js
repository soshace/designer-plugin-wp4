var DEJS;
(function (DEJS) {
    ///<reference path="../lib/raphael-2.1.fm.d.ts"/>
    ///<reference path="../model/FontManager.ts"/>
    (function (VO) {
        var Obj = (function () {
            function Obj(type, value) {
                if (typeof value === "undefined") { value = ""; }
                this.type = type;
                this.value = value;
                this.textElementId = "";
                this.textUrl = "";
                this._flip = FlipKind.None;
                //For the quote
                this.loadedFromDesign = false;
                this.uploaded = false;
                this.showPreloader = false;
                this.maxScale = 0;
                this.initScale = 0;
                //dpuExceeded: boolean = false;//VCGLL
                this.suppressFitResize = false;
                this.defaultTransform = "";
                this.multicolor = false;
                this.complexColor = new VO.ComplexColorVO();
                this.styleVO = new VO.StyleVO("");
                this.lastFont = "";
                this.lastAlign = "";
                this.attrCache = {};
                this.lastAttrCacheString = "";
                this.waitingToCheckFX = false;
            }
            Obj.prototype.allowedAttrs = function () {
                switch (this.type) {
                    case ObjectType.Image:
                        return VO.Obj.imgAttrs;
                        break;
                    case ObjectType.SVG:
                        return VO.Obj.svgAttrs;
                        break;
                    case ObjectType.Text:
                    default:
                        return VO.Obj.textAttrs;
                        break;
                }
            };

            Obj.prototype.getSourceId = function () {
                return this.attr()["sourceId"];
            };
            Obj.prototype.setSourceId = function (val) {
                this.attr({ sourceId: val });
            };

            Obj.prototype.clone = function () {
                var obj = new Obj(this.type, this.value);
                var attrs = this.getAttr();
                obj.setAttr(attrs);
                obj.attr({ alreadyLoaded: true });
                if (this.type == ObjectType.Image) {
                    obj.value = attrs["src"];
                } else if ((!this.value || this.value == "dumb") && this.type == ObjectType.SVG) {
                    obj.value = attrs["sourceUrl"];
                }

                obj.maxScale = this.maxScale;
                obj.initScale = this.initScale;
                if (this.multicolor) {
                    obj.multicolor = true;
                    obj.complexColor = new VO.ComplexColorVO(this.complexColor);
                    obj.styleVO = new VO.StyleVO(this.styleVO.toString());
                }
                return obj;
            };

            Obj.prototype.attr = function (attributes) {
                if (attributes) {
                    this.setAttr(attributes);
                    return this;
                } else {
                    return this.getAttr();
                }
            };

            Obj.prototype.getAttr = function () {
                var element = this.elementLink;
                if (this.textElementLink)
                    element = this.textElementLink;
                if (!element)
                    return {};
                var arr = {};
                var attrArray = this.allowedAttrs();
                for (var i = 0; i < attrArray.length; i++) {
                    //if ((Util.allowAttrs[i] == "scale" && type == "Line") == false) {
                    var attrName = attrArray[i];
                    if (element.attr(attrName) != undefined) {
                        arr[attrName] = element.attr(attrName);
                    }
                    //}
                }

                //arr["resizable"] = this.resizable;
                if (this.type == ObjectType.Text) {
                    switch (element.attr("text-anchor")) {
                        case "start":
                            arr["text-align"] = "left";
                            break;
                        case "end":
                            arr["text-align"] = "right";
                            break;
                        case "middle":
                        default:
                            arr["text-align"] = "center";
                            break;
                    }
                }
                arr["type"] = this.type;

                //arr["colorize"] = this.colorize;
                arr["multicolor"] = this.multicolor;
                arr["complex-color"] = this.complexColor.toObject();
                arr["id"] = this.elementId;

                //arr["dpuExceeded"] = this.dpuExceeded;//VCGLL
                arr["uploaded"] = this.uploaded;
                var m = element.matrix.split();
                var t = DEJS.Util.getBBox(element);
                m['width'] = t.width;
                m['height'] = t.height;
                arr["transformation"] = m;
                this.attrCache = arr;
                arr["uwidth"] = this.getUWidth();
                arr["uheight"] = this.getUHeight();
                return arr;
            };

            Obj.prototype.setAttr = function (attr) {
                if (!attr)
                    return;
                this.lastAttrCacheString = DEJS.Util.attrToString(this.attrCache, VO.Obj.floatAttrs);
                var forceTackerRedraw = false;
                attr = this.filterAttr(attr);
                if (("text" in attr) && this.isFixed() && attr["text"] == "") {
                    attr["text"] = " ";
                }

                /*var index = Util.arrayIndexOf(obj, this.objects, "id", obj.elementId);
                 if (index == -1) return;
                 var element: RaphaelElement = this.objects[index];*/
                var element = this.elementLink;
                if (this.textElementLink)
                    element = this.textElementLink;
                if (!element) {
                    if (!this.defaultAttr)
                        this.defaultAttr = {};
                    for (var key in attr) {
                        this.defaultAttr[key] = attr[key];
                    }
                    return;
                }
                var attrObject = {};
                var allowAttrs = this.allowedAttrs();
                for (var curName in attr) {
                    if (DEJS.Util.arrayIndexOf(curName, allowAttrs) != -1) {
                        var curValue = element.attr(curName);

                        //if (curValue != undefined) {  //TODO: Check if we need this
                        //element.attr(attr[i].name, attr[i].value);
                        attrObject[curName] = attr[curName];
                        //}
                    }
                }
                if (!attr["ignoreLastFont"] && this.attrCache && this.attrCache["font-family"] && attrObject["font-family"] && attrObject["font-family"] != this.attrCache["font-family"]) {
                    this.lastFont = this.attrCache["font-family"];
                }

                if ("textEffect" in attr) {
                    //Hack to disable raste effects aligns
                    var prevEff = this.getAttr()["textEffect"] ? this.getAttr()["textEffect"] : "none";
                    var prevEffRaster = prevEff != "none" && !DEJS.Effects.isVector(prevEff);
                    var newEffRaster = attr["textEffect"] != "none" && !DEJS.Effects.isVector(attr["textEffect"]);

                    if (prevEffRaster != newEffRaster) {
                        if (!prevEffRaster) {
                            this.lastAlign = this.getAttr()["text-align"];
                            attr["text-align"] = "center";
                        } else {
                            attr["text-align"] = this.lastAlign;
                            this.lastAlign = "";
                        }
                    }

                    //Hack for proper text-anchor compensation for vector efects
                    var prevEffVector = DEJS.Effects.isVector(prevEff);
                    var newEffVector = DEJS.Effects.isVector(attr["textEffect"]);

                    if (prevEffVector != newEffVector) {
                        //if switch between text & vector eff
                        var od = DEJS.Util.getObjectDimensions(this.elementLink);
                        var deltaX = 0;
                        var deltaY = 0;
                        if (newEffVector) {
                            // text -> vector eff
                            if (attr["text-align"] == "right") {
                                deltaX = -od.dw / 2;
                                deltaY = -od.dh / 2;
                            } else if (attr["text-align"] == "left") {
                                deltaX = od.dw / 2;
                                deltaY = od.dh / 2;
                            }
                        } else {
                            // vector eff -> text
                            if (attr["text-align"] == "right") {
                                deltaX = od.dw / 2;
                                deltaY = od.dh / 2;
                            } else if (attr["text-align"] == "left") {
                                deltaX = -od.dw / 2;
                                deltaY = -od.dh / 2;
                            }
                        }
                        this.move(deltaX, deltaY);
                    }
                }
                if ("text-align" in attr) {
                    //Hack to simulate previous position after changing align options
                    var prevAlign = this.getAttr()["text-align"];
                    var od = DEJS.Util.getObjectDimensions(this.elementLink);
                    var dw = od.dw;
                    var dh = od.dh;
                    var deltaX = 0;
                    var deltaY = 0;
                    switch (attr["text-align"]) {
                        case "left":
                            if (prevAlign == "center") {
                                deltaX = -dw / 2;
                                deltaY = -dh / 2;
                            }
                            if (prevAlign == "right") {
                                deltaX = -dw;
                                deltaY = -dh;
                            }

                            attrObject["text-anchor"] = "start";
                            break;
                        case "right":
                            if (prevAlign == "center") {
                                deltaX = dw / 2;
                                deltaY = dh / 2;
                            }
                            if (prevAlign == "left") {
                                deltaX = dw;
                                deltaY = dh;
                            }

                            attrObject["text-anchor"] = "end";
                            break;
                        case "center":
                        default:
                            if (prevAlign == "right") {
                                deltaX = -dw / 2;
                                deltaY = -dh / 2;
                            }
                            if (prevAlign == "left") {
                                deltaX = dw / 2;
                                deltaY = dh / 2;
                            }

                            attrObject["text-anchor"] = "middle";
                            break;
                    }

                    this.move(deltaX, deltaY);

                    if (attrObject["text-anchor"] != element.attr("text-anchor"))
                        forceTackerRedraw = true;
                }
                if (attrObject["font-family"] != element.attr("font-family"))
                    forceTackerRedraw = true;
                element.attr(attrObject);

                if (element.type == ObjectType.Image && attrObject["src"] && !attrObject["alreadyLoaded"]) {
                    this.updateImage(element, attrObject);
                }
                if (this.type == ObjectType.SVG) {
                    if (attr["fill"] == "none" || attr["fill"] === "") {
                        element.node.removeAttribute("fill");
                    }
                }

                if ("align" in attr)
                    this.align(attr["align"]);
                if ("uploaded" in attr)
                    this.uploaded = attr["uploaded"];

                //if ("resizable" in attr) this.resizable = attr["resizable"];
                if ("uwidth" in attr)
                    this.setUWidth(attr["uwidth"], attr["lockScale"]);
                if ("uheight" in attr)
                    this.setUHeight(attr["uheight"], attr["lockScale"]);
                this.checkTextFXAttr();
                this.checkFitBounds();
                if (this.designer)
                    this.designer.tracker.track(this.elementLink, forceTackerRedraw); //TODO: This shouldn't be here!
            };

            /*
             "fill",
             "fill-opacity",
             "src",
             "stroke",
             "stroke-width",
             "font-family",
             "font-weight",
             "stroke-opacity",
             "text",
             "font-style"
             */
            Obj.prototype.filterAttr = function (attr) {
                var curAttr = this.attr();
                var res = {};
                for (var attrName in attr) {
                    var allow = true;
                    switch (attrName) {
                        case "fill":
                        case "fill-opacity":
                            if (curAttr["fixedColor"])
                                allow = false;
                            break;
                        case "font-family":
                            if (curAttr["fixedFont"])
                                allow = false;
                            break;
                        case "stroke":
                        case "stroke-width":
                        case "stroke-opacity":
                        case "font-weight":
                        case "font-style":
                        case "letter-spacing":
                            if (curAttr["fixedStyle"])
                                allow = false;
                            break;
                        default:
                            break;
                    }
                    if (allow) {
                        res[attrName] = attr[attrName];
                    }
                }
                return res;
            };

            Obj.prototype.updateImage = function (element, attrObject) {
                var _this = this;
                this.value = attrObject["src"];
                if (!this.designer)
                    return;
                this.designer.loadImage(this, function (vo, element) {
                    return _this.onImageLoaded(element, attrObject);
                });
            };

            Obj.prototype.onImageLoaded = function (element, attrObject) {
                element.attr(attrObject);
                this.designer.tracker.track(element); //TODO: Dirty! Make this another way!
            };

            Obj.prototype.remove = function () {
                if (this.designer)
                    this.designer.remove(this);
                return this;
            };

            Obj.prototype.toBack = function () {
                if (this.elementLink)
                    this.elementLink.toBack();
                if (this.designer)
                    this.designer.layerChange(this.elementLink, "toBack");
                return this;
            };

            Obj.prototype.toFront = function () {
                if (this.elementLink)
                    this.elementLink.toFront();
                if (this.designer)
                    this.designer.fixPrintAreaLayer(); //TODO: Dirty! Switch this to event model!
                if (this.designer)
                    this.designer.layerChange(this.elementLink, "toFront");
                return this;
            };

            Obj.prototype.up = function () {
                if (this.elementLink && this.elementLink.next)
                    this.elementLink.insertAfter(this.elementLink.next);
                if (this.designer)
                    this.designer.fixPrintAreaLayer(); //TODO: Dirty! Switch this to event model!
                if (this.designer)
                    this.designer.layerChange(this.elementLink, "up");
                return this;
            };

            Obj.prototype.down = function () {
                if (this.elementLink && this.elementLink.prev)
                    this.elementLink.insertBefore(this.elementLink.prev);
                if (this.designer)
                    this.designer.layerChange(this.elementLink, "down");
                return this;
            };

            Obj.prototype.move = function (dx, dy) {
                if (this.elementLink)
                    DEJS.Util.move(this.elementLink, dx, dy);
                if (this.designer)
                    this.designer.tracker.track();
                return this;
            };

            Obj.prototype.flip = function (_flip) {
                this._flip = _flip;
                if (this.elementLink) {
                    DEJS.Util.flip(this.elementLink, _flip);
                    if (this.designer)
                        this.designer.forceTrackerUpdate(this);
                }
                return this;
            };

            Obj.prototype.align = function (side) {
                if (this.designer)
                    this.designer.align(side, this);
                return this;
            };

            Obj.prototype.transform = function (transform) {
                if (this.elementLink) {
                    DEJS.Util.transform(this.elementLink, transform);
                    if (this.designer)
                        this.designer.tracker.track();
                }
                return this;
            };

            Obj.prototype.getDesignedArea = function () {
                if (!this.elementLink)
                    return 0;
                var bbox = DEJS.Util.getBBox(this.elementLink, true);
                return Math.abs(bbox.height * bbox.width * Math.abs(this.elementLink.matrix.split().scalex * this.elementLink.matrix.split().scaley));
            };

            Obj.prototype.getAreaCoords = function () {
                if (!this.elementLink)
                    return null;
                var bbox = DEJS.Util.getBBox(this.elementLink, false);
                return [bbox.x, bbox.y, bbox.x2, bbox.y2];
            };

            Obj.prototype.canMove = function () {
                var objAttr = this.attr();
                return !objAttr["fixed"] && !objAttr["fixedMove"];
            };

            Obj.prototype.canRotate = function () {
                var objAttr = this.attr();
                return !objAttr["fixed"] && !objAttr["fixedRotate"];
            };

            Obj.prototype.canResize = function () {
                var objAttr = this.attr();
                return !objAttr["fixed"] && !objAttr["fixedSize"];
            };

            Obj.prototype.canDelete = function () {
                var objAttr = this.attr();
                return !objAttr["fixed"] && !objAttr["required"];
            };

            Obj.prototype.isFixed = function () {
                var objAttr = this.attr();
                return true && objAttr["fixed"];
            };

            Obj.prototype.isNameNumber = function () {
                var objAttr = this.attr();
                return objAttr["nameObj"] || objAttr["numberObj"];
            };

            Obj.prototype.getWidth = function () {
                if (!this.elementLink)
                    return 0;
                var box = DEJS.Util.getBBox(this.elementLink, true);
                return box.width * DEJS.Util.getMatrixScaleX(this.elementLink.matrix);
            };

            Obj.prototype.setWidth = function (value, locScale) {
                if (typeof locScale === "undefined") { locScale = true; }
                if (!this.elementLink)
                    return;
                var scaleX = value / this.getWidth();
                var scaleY = locScale ? scaleX : 1;
                DEJS.Util.scaleElementXY(this.elementLink, scaleX, scaleY, true);
            };

            Obj.prototype.getUWidth = function () {
                if (!this.designer)
                    return 0;
                var value = this.getWidth() / this.designer.dpuX;
                return Math.round(value * 10000) / 10000;
            };

            Obj.prototype.setUWidth = function (value, locScale) {
                if (typeof locScale === "undefined") { locScale = true; }
                value = +value;
                if (!this.designer)
                    return;
                this.setWidth(value * this.designer.dpuX, locScale);
            };

            Obj.prototype.getHeight = function (scaled) {
                if (typeof scaled === "undefined") { scaled = true; }
                if (!this.elementLink)
                    return 0;
                if (this.type == ObjectType.Text) {
                    var lineCount = ("" + this.attrCache["text"]).split("\n").length;
                    var fontSize = parseFloat(this.attrCache["font-size"]);
                    var lineLeading = parseFloat(this.attrCache["line-leading"]);
                    var ascentHeight = DEJS.Model.FontManager.getFontAscent(this.attrCache["font-family"]);
                    if (ascentHeight == 0) {
                        var box = DEJS.Util.getBBox(this.elementLink, true);
                        ascentHeight = box.height;
                    }
                    if (scaled) {
                        return (fontSize * lineLeading * (lineCount - 1) + ascentHeight) * DEJS.Util.getMatrixScaleY(this.elementLink.matrix);
                    } else {
                        return (fontSize * lineLeading * (lineCount - 1) + ascentHeight);
                    }
                } else {
                    var box = DEJS.Util.getBBox(this.elementLink, true);
                    if (scaled) {
                        return box.height * DEJS.Util.getMatrixScaleY(this.elementLink.matrix);
                    } else {
                        return box.height;
                    }
                }
            };

            Obj.prototype.setHeight = function (value, locScale) {
                if (typeof locScale === "undefined") { locScale = true; }
                if (!this.elementLink)
                    return;
                var scaleY = value / this.getHeight();
                var scaleX = locScale ? scaleY : 1;
                DEJS.Util.scaleElementXY(this.elementLink, scaleX, scaleY, true);
            };

            Obj.prototype.getUHeight = function () {
                if (!this.designer)
                    return 0;
                var value = this.getHeight() / this.designer.dpuY;
                return Math.round(value * 10000) / 10000;
            };

            Obj.prototype.setUHeight = function (value, locScale) {
                if (typeof locScale === "undefined") { locScale = true; }
                value = +value;
                if (!this.designer)
                    return;
                this.setHeight(value * this.designer.dpuY, locScale);
            };

            Obj.prototype.getBBox = function () {
                if (!this.elementLink)
                    return { x: 0, y: 0, x2: 0, y2: 0, width: 0, height: 0 };
                if (!(this.type == ObjectType.Text) || this.hasTextFX()) {
                    return DEJS.Util.getBBox(this.elementLink);
                } else {
                    var height = this.getHeight(false);
                    var bbox = DEJS.Util.getBBox(this.elementLink, true);
                    var m = this.elementLink.matrix;
                    var x = bbox.x;
                    var y = (bbox.y + bbox.y2 - height) / 2;
                    var coords = [];
                    coords.push({ x: m.x(x, y), y: m.y(x, y) });
                    x = bbox.x;
                    y = (bbox.y + bbox.y2 + height) / 2;
                    coords.push({ x: m.x(x, y), y: m.y(x, y) });
                    x = bbox.x2;
                    y = (bbox.y + bbox.y2 - height) / 2;
                    coords.push({ x: m.x(x, y), y: m.y(x, y) });
                    x = bbox.x2;
                    y = (bbox.y + bbox.y2 + height) / 2;
                    coords.push({ x: m.x(x, y), y: m.y(x, y) });
                    var res = { x: coords[0].x, y: coords[0].y, x2: coords[0].x, y2: coords[0].y, width: 0, height: 0 };
                    for (var i = 1; i < coords.length; i++) {
                        res.x = Math.min(res.x, coords[i].x);
                        res.x2 = Math.max(res.x2, coords[i].x);
                        res.y = Math.min(res.y, coords[i].y);
                        res.y2 = Math.max(res.y2, coords[i].y);
                    }
                    res.width = res.x2 - res.x;
                    res.height = res.y2 - res.y;
                    return res;
                }
            };

            Obj.prototype.checkFitBounds = function () {
                if (this.type != ObjectType.Text)
                    return;
                if (!this.elementLink)
                    return;
                var objAttr = this.attr();
                if (!objAttr["fitBounds"])
                    return;
                var bounds = objAttr["fitBounds"];
                if (bounds.length < 2)
                    return;
                var boundWidth = bounds[0];
                var boundHeight = bounds[1];
                var box = DEJS.Util.getBBox(this.elementLink);
                if (parseFloat(box.width.toFixed(4)) == 0 || parseFloat(box.height.toFixed(4)) == 0)
                    return;

                //if (box.width > boundWidth || box.height > boundHeight) {  //Need to shrink
                var vScale = boundWidth / box.width;
                var hScale = boundHeight / box.height;
                DEJS.Util.scaleElement(this.elementLink, Math.min(vScale, hScale), true);
                /*} else if ((objAttr["fixed"] || objAttr["fixedSize"]) && this.initScale > 0) {    //Check if shrinked too much
                 var curScale = Math.abs(this.elementLink.matrix.split().scalex);
                 if (curScale < this.initScale) {
                 var updScale = this.initScale / curScale;
                 //updScale = Math.min(boundWidth / box.width, boundHeight / box.height, this.initScale);
                 if (box.width * updScale <= boundWidth && box.height * updScale <= boundHeight) {
                 Util.scaleElement(this.elementLink, updScale, true);
                 }
                 }
                 }*/
            };

            /*
             private checkFitBounds() {
             if (this.type != ObjectType.Text) return;
             if (!this.elementLink) return;
             var objAttr = this.attr();
             if (!objAttr["fitBounds"]) return;
             var bounds: number[] = objAttr["fitBounds"];
             if (bounds.length < 2) return;
             var box = this.Util.getBBox(elementLink);
             if (box.width > bounds[0] || box.height > bounds[1]) {  //Need to shrink
             var vScale = bounds[0] / box.width;
             var hScale = bounds[1] / box.height;
             Util.scaleElement(this.elementLink, Math.min(vScale, hScale), true);
             } else if ((objAttr["fixed"] || objAttr["fixedSize"]) && this.initScale > 0) {    //Check if shrinked too much
             var curScale = Math.abs(this.elementLink.matrix.split().scalex);
             if (curScale < this.initScale) {
             var updScale = this.initScale / curScale;
             if (box.width * updScale <= bounds[0] && box.height * updScale <= bounds[1]) {
             Util.scaleElement(this.elementLink, updScale, true);
             }
             }
             }
             }*/
            Obj.restoreElAttrs = function (el, attr) {
                if ("letterSpacing" in attr)
                    el.attr("letterSpacing", attr["letterSpacing"]);
            };

            Obj.prototype.isImage = function () {
                return this.type == ObjectType.Image || (this.hasTextFX() && !this.isTextFXVector());
            };

            Obj.prototype.isSVG = function () {
                return this.type == ObjectType.SVG || (this.hasTextFX() && this.isTextFXVector());
            };

            Obj.prototype.needTextFX = function (attr) {
                if (("textEffect" in attr) && attr["textEffect"] != "" && attr["textEffect"] != "none")
                    return true;
                return false;
            };

            Obj.prototype.hasTextFX = function () {
                if (this.textElementId)
                    return true;
                return false;
            };

            Obj.prototype.isTextFXVector = function () {
                return this.textUrl && (this.textUrl.substr(0, 6) == "svg://");
            };

            Obj.prototype.checkTextFXAttr = function () {
                var _this = this;
                if (!(this.type == ObjectType.Text))
                    return;
                if (this.waitingToCheckFX)
                    return;

                var time = (new Date()).getTime();
                var attr = this.getAttr();
                var newAttrString = DEJS.Util.attrToString(attr, VO.Obj.floatAttrs);
                if (newAttrString == this.lastAttrCacheString)
                    return;
                if (this.needTextFX(attr)) {
                    this.waitingToCheckFX = true;
                    setTimeout(function () {
                        return _this.doCheckTextFXAttr();
                    }, Obj.checkTextFXThrottle);
                } else {
                    this.doCheckTextFXAttr();
                }
            };

            Obj.prototype.doCheckTextFXAttr = function (fontLoaded) {
                var _this = this;
                if (typeof fontLoaded === "undefined") { fontLoaded = true; }
                this.waitingToCheckFX = false;
                if (!(this.type == ObjectType.Text))
                    return;
                var attr = this.getAttr();
                if (!fontLoaded) {
                    if (this.lastFont != "" && this.lastFont != attr["font-family"]) {
                        this.attr({ "font-family": this.lastFont, ignoreLastFont: true });
                        if (this.designer && this.designer.selected() == this) {
                            this.designer.select(this.elementLink, true);
                        }
                    }
                } else {
                    if (this.needTextFX(attr)) {
                        if (!DEJS.Model.TextEffectsManager.canFormUrl(attr, function (f) {
                                return _this.doCheckTextFXAttr(f);
                            })) {
                            return;
                        }
                        if (this.hasTextFX() && this.elementLink) {
                            var size = DEJS.Util.getBBox(this.textElementLink, true).width;
                            var lastIsVector = this.isTextFXVector();
                            var textUrl = DEJS.Model.TextEffectsManager.formTextImageUrl(attr, size);
                            if (this.textUrl == textUrl)
                                return;
                            this.textUrl = textUrl;
                            if (!this.elementLink)
                                return;

                            if (lastIsVector != this.isTextFXVector()) {
                                this.removeTextFX();
                                this.addTextFX(attr);
                            } else {
                                if (this.isTextFXVector()) {
                                    this.updateVectorTextFXSize(textUrl);
                                } else {
                                    if (this.elementLink.attr()["src"] == textUrl)
                                        return;
                                    this.updateTextFXSize();
                                    this.elementLink.attr("src", textUrl);
                                }
                            }
                        } else {
                            this.addTextFX(attr);
                        }
                    } else {
                        if (this.hasTextFX()) {
                            this.removeTextFX();
                        } else {
                        }
                    }
                }
            };

            Obj.prototype.addTextFX = function (attr) {
                if (this.elementLink) {
                    this.textElementId = this.elementId;
                    this.textElementLink = this.elementLink;
                }
                var size = DEJS.Util.getBBox(this.textElementLink, true).width;
                var textUrl = DEJS.Model.TextEffectsManager.formTextImageUrl(attr, size);
                this.textUrl = textUrl;
                this.textElementLink.hide();
                this.elementId = "";
                this.elementLink = null;
                this.textUrl = textUrl;
                this.designer.addObjectToCanvas(this, false, this.designer && this.designer.selected() == this);
            };

            Obj.prototype.removeTextFX = function () {
                this.designer.switchTextFX(false, this);
                this.elementLink = this.textElementLink;
                this.elementId = this.textElementId;
                this.textElementLink = null;
                this.textElementId = "";
                this.elementLink.show();
            };

            Obj.prototype.updateTextFXSize = function () {
                var _this = this;
                this.showPreloader = true;
                if (this.designer && this.designer.selected() == this) {
                    this.designer.tracker.track(this.elementLink);
                }
                var img = new Image();
                img.onload = function (event) {
                    return _this.onTextFXLoaded(img);
                };
                img.src = this.textUrl;
            };

            Obj.prototype.onTextFXLoaded = function (img) {
                this.showPreloader = false;
                if (this.textElementLink && img.src == this.textUrl) {
                    //true text obj size:
                    //var size: number = this.textElementLink.getBBox(true).width;
                    if (this.hasTextFX() && img.src == this.textUrl) {
                        var width = img.width;
                        var height = img.height;
                        var textBox = DEJS.Util.getBBox(this.textElementLink, true);
                        height = img.height * textBox.width / width;
                        width = textBox.width;
                        this.elementLink.attr("width", width);
                        this.elementLink.attr("height", height);

                        if (this.designer && this.designer.selected() == this) {
                            this.designer.tracker.track(this.elementLink);
                        }
                    }
                }
            };

            Obj.prototype.updateVectorTextFXSize = function (svgData) {
                if (!this.textElementLink)
                    return;
                if (!this.hasTextFX())
                    return;
                if (!this.designer)
                    return;
                svgData = svgData.substr(6);
                this.designer.onSVGUpdated(this, svgData);

                if (this.designer && this.designer.selected() == this) {
                    this.designer.tracker.track(this.elementLink);
                }
            };

            Obj.prototype.updateColorize = function () {
                if (!this.designer)
                    return;
                this.designer.colorizeObject(this);
            };
            Obj.deAttrs = [
                "deservice",
                "fixed",
                "fixedSize",
                "fixedRotate",
                "fixedMove",
                "fixedColor",
                "required",
                "fitBounds",
                "fixedFont",
                "fixedStyle",
                "nameObj",
                "numberObj",
                "x", "y",
                "transform",
                "align"
            ];

            Obj.textAttrs = Obj.deAttrs.concat([
                "fill",
                "fill-opacity",
                "src",
                "stroke",
                "stroke-width",
                "font-family",
                "font-size",
                "line-height",
                "font-weight",
                "stroke-opacity",
                "text",
                "font-style",
                "letterSpacing",
                "text-align",
                "textEffect",
                "textEffectValue",
                "line-leading"
            ]);

            Obj.imgAttrs = Obj.deAttrs.concat([
                "src",
                "sourceId",
                "sourceUrl",
                "processColors",
                "colorsNumber",
                "alreadyLoaded",
                "textSourceId"
            ]);

            Obj.svgAttrs = Obj.deAttrs.concat([
                "src",
                "stroke",
                "fill",
                "sourceId",
                "sourceUrl",
                "processColors",
                "colorsNumber",
                "colorize"
            ]);

            Obj.floatAttrs = [
                "letterSpacing",
                "textEffectValue",
                "line-leading"
            ];

            Obj.checkTextFXThrottle = 400;
            return Obj;
        })();
        VO.Obj = Obj;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));