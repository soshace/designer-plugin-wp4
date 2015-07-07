var DEJS;
(function (DEJS) {
    (function (Trial) {
        Trial.isFull = true;
    })(DEJS.Trial || (DEJS.Trial = {}));
    var Trial = DEJS.Trial;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    (function (VO) {
        /*export class Design {
        constructor() {
        this.sides = [DesignSide.Front];
        this.objects = {};
        this.objects[DesignSide.Front] = [];
        this.objects[DesignSide.Back] = [];
        this.objects[DesignSide.Left] = [];
        this.objects[DesignSide.Right] = [];
        this.svg = {};
        this.svg[DesignSide.Front] = [];
        this.svg[DesignSide.Back] = [];
        this.svg[DesignSide.Left] = [];
        this.svg[DesignSide.Right] = [];
        }
        sides: string[] = [];
        objects = {};
        svg = {};
        }*/
        /*
        export class ObjParams {
        constructor(font?, outline?) {
        if (font) this.font = font;
        if (outline) this.outline = outline;
        }
        font: string;
        outline: boolean;
        }*/
        var DEOptions = (function () {
            function DEOptions(options) {
                this.allowedOptions = ["deleteOnDoubleClick", "dpi", "minDPU", "includePrintingAreaInDesign", "includeMaskInDesign", "includeProductInDesign", "fontsCSSUrl", "minZoom", "maxZoom", "zoomStep", "referenceImage", "referenceShift", "referenceWidth", "referenceHeight", "zoomEnabled", "checkeredBackground", "unit", "unit2", "unitConversionMult", "showProductSelector", "checkTextFXThrottle"];
                this.deleteOnDoubleClick = false;
                this.dpi = 72;
                this.minDPU = 0;
                this.includePrintingAreaInDesign = false;
                this.includeMaskInDesign = false;
                this.includeProductInDesign = false;
                this.fontsCSSUrl = "";
                this.minZoom = 50;
                this.maxZoom = 150;
                this.zoomStep = 10;
                this.referenceImage = "";
                this.referenceShift = 0;
                this.referenceWidth = 0;
                this.referenceHeight = 0;
                this.zoomEnabled = false;
                this.checkeredBackground = false;
                this.unit = "";
                this.unit2 = "";
                this.unitConversionMult = 10;
                this.showProductSelector = true;
                this.checkTextFXThrottle = 400;
                if (!options)
                    return;
                for (var key in options) {
                    if (this.allowedOptions.indexOf(key) >= 0) {
                        this[key] = options[key];
                    }
                }
            }
            return DEOptions;
        })();
        VO.DEOptions = DEOptions;

        
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));

var ObjectType;
(function (ObjectType) {
    ObjectType.Text = "txt";
    ObjectType.Image = "image";
    ObjectType.SVG = "svg";
})(ObjectType || (ObjectType = {}));

/*module DesignSide {
export var Front = "front";
export var Back = "back";
export var Left = "left";
export var Right = "rigt";
}*/
var FlipKind;
(function (FlipKind) {
    FlipKind.None = "none";
    FlipKind.Horizontal = "horizontal";
    FlipKind.Vertical = "vertical";
    FlipKind.Both = "both";
})(FlipKind || (FlipKind = {}));

var AlignSide;
(function (AlignSide) {
    AlignSide.Top = "top";
    AlignSide.Bottom = "bottom";
    AlignSide.Left = "left";
    AlignSide.Right = "right";
    AlignSide.VCenter = "vcenter";
    AlignSide.HCenter = "hcenter";
})(AlignSide || (AlignSide = {}));
var DEJS;
(function (DEJS) {
    (function (Events) {
        var Event = (function () {
            function Event(type, targetObj) {
                this._type = type;
                this._target = targetObj;
            }
            Event.prototype.getTarget = function () {
                return this._target;
            };

            Event.prototype.getType = function () {
                return this._type;
            };
            return Event;
        })();
        Events.Event = Event;

        var A = (function () {
            function A() {
                this._listeners = [];
            }
            return A;
        })();
        Events.A = A;

        var EventDispatcher = (function () {
            function EventDispatcher() {
                this._listeners = [];
            }
            EventDispatcher.prototype.hasEventListener = function (type, listener) {
                var exists = false;
                for (var i = 0; i < this._listeners.length; i++) {
                    if (this._listeners[i].type === type && this._listeners[i].listener === listener) {
                        exists = true;
                    }
                }

                return exists;
            };

            EventDispatcher.prototype.addEventListener = function (typeStr, listenerFunc) {
                if (this.hasEventListener(typeStr, listenerFunc)) {
                    return;
                }

                this._listeners.push({ type: typeStr, listener: listenerFunc });
            };

            EventDispatcher.prototype.removeEventListener = function (typeStr, listenerFunc) {
                for (var i = 0; i < this._listeners.length; i++) {
                    if (this._listeners[i].type === typeStr && this._listeners[i].listener === listenerFunc) {
                        this._listeners.splice(i, 1);
                    }
                }
            };

            EventDispatcher.prototype.dispatchEvent = function (evt) {
                for (var i = 0; i < this._listeners.length; i++) {
                    if (this._listeners[i].type === evt.getType()) {
                        this._listeners[i].listener.call(this, evt);
                        //this._listeners[i].listener(evt);
                    }
                }
            };
            return EventDispatcher;
        })();
        Events.EventDispatcher = EventDispatcher;
    })(DEJS.Events || (DEJS.Events = {}));
    var Events = DEJS.Events;
})(DEJS || (DEJS = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DEJS;
(function (DEJS) {
    ///<reference path="EventDispatcher.ts"/>
    (function (Events) {
        var ObjectSelectedEvent = (function (_super) {
            __extends(ObjectSelectedEvent, _super);
            function ObjectSelectedEvent(targetObj) {
                _super.call(this, DEEvents.OBJECT_SELECTED_EVENT, targetObj);
                this.obj = targetObj;
            }
            return ObjectSelectedEvent;
        })(Events.Event);
        Events.ObjectSelectedEvent = ObjectSelectedEvent;
        var ObjectDClickedEvent = (function (_super) {
            __extends(ObjectDClickedEvent, _super);
            function ObjectDClickedEvent(targetObj) {
                _super.call(this, DEEvents.OBJECT_DCLICK_EVENT, targetObj);
                this.obj = targetObj;
            }
            return ObjectDClickedEvent;
        })(Events.Event);
        Events.ObjectDClickedEvent = ObjectDClickedEvent;
        var ConfigLoadedEvent = (function (_super) {
            __extends(ConfigLoadedEvent, _super);
            function ConfigLoadedEvent(options) {
                _super.call(this, DEEvents.CONFIG_LOADED_EVENT, null);
                this.options = options;
            }
            return ConfigLoadedEvent;
        })(Events.Event);
        Events.ConfigLoadedEvent = ConfigLoadedEvent;
        var LoadStatusEvent = (function (_super) {
            __extends(LoadStatusEvent, _super);
            function LoadStatusEvent(message, completed, percentCompleted) {
                if (typeof completed === "undefined") { completed = true; }
                if (typeof percentCompleted === "undefined") { percentCompleted = 100; }
                _super.call(this, DEEvents.LOAD_STATUS_EVENT, null);
                this.message = message;
                this.completed = completed;
                this.percentCompleted = percentCompleted;
            }
            return LoadStatusEvent;
        })(Events.Event);
        Events.LoadStatusEvent = LoadStatusEvent;
        var BackgroundColorizeParsedEvent = (function (_super) {
            __extends(BackgroundColorizeParsedEvent, _super);
            function BackgroundColorizeParsedEvent(colorizeArray) {
                _super.call(this, DEEvents.BACKGROUND_COLORIZE_PARSED_EVENT, null);
                this.colorizeArray = colorizeArray;
            }
            return BackgroundColorizeParsedEvent;
        })(Events.Event);
        Events.BackgroundColorizeParsedEvent = BackgroundColorizeParsedEvent;
        var ViewPortChangedEvent = (function (_super) {
            __extends(ViewPortChangedEvent, _super);
            function ViewPortChangedEvent(viewPort, designer) {
                _super.call(this, DEEvents.VIEWPORT_UPDATE_EVENT, null);
                this.designer = designer;
                this.viewPort = viewPort;
            }
            return ViewPortChangedEvent;
        })(Events.Event);
        Events.ViewPortChangedEvent = ViewPortChangedEvent;
        var DesignerChangedEvent = (function (_super) {
            __extends(DesignerChangedEvent, _super);
            function DesignerChangedEvent(targetObj, dispatchHistory) {
                if (typeof dispatchHistory === "undefined") { dispatchHistory = true; }
                _super.call(this, DEEvents.DESIGNER_CHANGED_EVENT, targetObj);
                this.dispatchHistory = true;
                this.objectSizeChanged = false;
                this.obj = targetObj;
                this.dispatchHistory = dispatchHistory;
            }
            return DesignerChangedEvent;
        })(Events.Event);
        Events.DesignerChangedEvent = DesignerChangedEvent;
    })(DEJS.Events || (DEJS.Events = {}));
    var Events = DEJS.Events;
})(DEJS || (DEJS = {}));

var DEEvents;
(function (DEEvents) {
    DEEvents.OBJECT_SELECTED_EVENT = "OBJECT_SELECTED_EVENT";
    DEEvents.CONFIG_LOADED_EVENT = "CONFIG_LOADED_EVENT";
    DEEvents.LOAD_STATUS_EVENT = "LOAD_STATUS_EVENT";
    DEEvents.DESIGNER_CHANGED_EVENT = "DESIGNER_CHANGED_EVENT";
    DEEvents.DESIGN_READY_EVENT = "DESIGN_READY_EVENT";
    DEEvents.AUTH_EVENT = "AUTH_EVENT";
    DEEvents.OBJECT_DCLICK_EVENT = "OBJECT_DCLICK_EVENT";
    DEEvents.BACKGROUND_COLORIZE_PARSED_EVENT = "BACKGROUND_COLORIZE_PARSED_EVENT";
    DEEvents.VIEWPORT_UPDATE_EVENT = "VIEWPORT_UPDATE_EVENT";
})(DEEvents || (DEEvents = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="lib/raphael-2.1.fm.d.ts"/>
    ///<reference path="lib/jquery.d.ts"/>
    ///<reference path="DEMain.ts"/>
    ///<reference path="vo/VO.ts"/>
    (function (Util) {
        //SpeedUp
        function purgeTransform(element) {
            var m = element.matrix;
            element.transform("m" + [m.a, m.b, m.c, m.d, m.e, m.f].join(","));
        }

        function resize(element, width, height, x, y) {
            if (element.type == "rect" || element.type == "image") {
                if (width > 0) {
                    element.attr("width", width);
                } else {
                    element.attr("x", (x ? x : element.attr("x")) + width);
                    element.attr("width", Math.abs(width));
                }
                if (height > 0) {
                    element.attr("height", height);
                } else {
                    element.attr("y", (y ? y : element.attr("y")) + height);
                    element.attr("height", Math.abs(height));
                }
            } else if (element.type == "text") {
                element.attr("font-size", Math.abs(width));
            }
        }
        Util.resize = resize;

        /*export function resizeObject(object: RaphaelElement, scale, x, y) {
        object.transform("...S" + scale + "," + scale + "," + x + "," + y);
        }*/
        function resizeElement(element, from, to, kind) {
            if (typeof kind === "undefined") { kind = DEJS.ResizeKind.Both; }
            var matrix = element.matrix;
            var box = Util.getBBox(element, true);
            var sx = matrix.x(box.x + box.width / 2, box.y + box.height / 2);
            var sy = matrix.y(box.x + box.width / 2, box.y + box.height / 2);
            var from1 = [sx, sy];
            var from2 = from;
            var to1 = [sx, sy];
            var to2 = to;
            var i = 0;

            var s = Math.sqrt((to2[0] - to1[0]) * (to2[0] - to1[0]) + (to2[1] - to1[1]) * (to2[1] - to1[1])) / Math.sqrt((from2[0] - from1[0]) * (from2[0] - from1[0]) + (from2[1] - from1[1]) * (from2[1] - from1[1]));
            var tr = "...";
            switch (kind) {
                case DEJS.ResizeKind.Horizontal:
                    tr += "S" + s + "," + 1 + "," + sx + "," + sy;
                    break;
                case DEJS.ResizeKind.Vertical:
                    tr += "S" + 1 + "," + s + "," + sx + "," + sy;
                    break;
                case DEJS.ResizeKind.Both:
                default:
                    tr += "S" + s + "," + s + "," + sx + "," + sy;
                    break;
            }
            element.transform(tr);
            purgeTransform(element);
        }
        Util.resizeElement = resizeElement;

        function scaleElement(element, scale, center) {
            if (typeof center === "undefined") { center = false; }
            var box = Util.getBBox(element, true);
            var x;
            var y;
            if (center) {
                var x_ = box.x + box.width / 2;
                var y_ = box.y + box.height / 2;
                x = element.matrix.x(x_, y_);
                y = element.matrix.y(x_, y_);
            } else {
                x = box.x;
                y = box.y;
            }
            var tr = "...";
            tr += "S" + scale + "," + scale + "," + x + "," + y;
            element.transform(tr);
            purgeTransform(element);
        }
        Util.scaleElement = scaleElement;

        function scaleElementXY(element, scaleX, scaleY, center) {
            if (typeof center === "undefined") { center = false; }
            var box = Util.getBBox(element, true);
            var x;
            var y;
            if (center) {
                var x_ = box.x + box.width / 2;
                var y_ = box.y + box.height / 2;
                x = element.matrix.x(x_, y_);
                y = element.matrix.y(x_, y_);
            } else {
                x = box.x;
                y = box.y;
            }
            var tr = "...";
            tr += "S" + scaleX + "," + scaleY + "," + x + "," + y;
            element.transform(tr);
            element.transform(element.matrix.toTransformString());
        }
        Util.scaleElementXY = scaleElementXY;

        function scaleElementRough(element, scale) {
            element.attr({ transform: "...s" + scale + "," + scale });
            purgeTransform(element);
        }
        Util.scaleElementRough = scaleElementRough;

        function move(element, dx, dy) {
            //(<any>object).translate(dx,dy);
            //object.transform("...t" + dx + "," + dy);
            if (dx == 0 && dy == 0)
                return;
            element.transform("...T" + dx + "," + dy);
            purgeTransform(element);
        }
        Util.move = move;

        function rotateAbsolute(element, deg) {
            var box = Util.getBBox(element, true);
            var x_ = box.x + box.width / 2;
            var y_ = box.y + box.height / 2;
            var x = element.matrix.x(x_, y_);
            var y = element.matrix.y(x_, y_);
            var newDeg = deg - getMatrixRotate(element.matrix, x, y);
            var m = element.matrix;
            var transform = "m" + [m.a, m.b, m.c, m.d, m.e, m.f].join(",");
            transform = "R" + newDeg + "," + x + "," + y + transform;
            element.transform(transform);
            purgeTransform(element);
        }
        Util.rotateAbsolute = rotateAbsolute;

        /*export function rotateSetAbsolute(element: RaphaelElement, deg, cx, cy) {
        //object.transform("...R" + deg);
        var newDeg = deg - (<any>element)[0].matrix.split().rotate;
        element.transform("...R" + newDeg + "," + cx + "," + cy);
        var some = element.transform();
        }*/
        function getMatrixRotate(matrix, x, y) {
            var ox = matrix.x(x, y);
            var oy = matrix.y(x, y);
            var bx = matrix.x(x, y - 100);
            var by = matrix.y(x, y - 100);
            var angle = Math.atan2(bx - ox, oy - by) * (180 / Math.PI);
            return angle;
        }
        Util.getMatrixRotate = getMatrixRotate;

        function getMatrixScaleX(matrix) {
            var x = matrix.x(0, 0);
            var y = matrix.y(0, 0);
            var x2 = matrix.x(0 + 1, 0);
            var y2 = matrix.y(0 + 1, 0);
            return getDistance(x, y, x2, y2);
        }
        Util.getMatrixScaleX = getMatrixScaleX;

        function getMatrixScaleY(matrix) {
            var x = matrix.x(0, 0);
            var y = matrix.y(0, 0);
            var x2 = matrix.x(0, 0 + 1);
            var y2 = matrix.y(0, 0 + 1);
            return getDistance(x, y, x2, y2);
        }
        Util.getMatrixScaleY = getMatrixScaleY;

        function getDistance(x1, y1, x2, y2) {
            var deltaX = x1 - x2;
            var deltaY = y1 - y2;

            return Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2));
        }
        Util.getDistance = getDistance;

        function getObjectDimensions(elementLink) {
            var width = Util.getBBox(elementLink, true)['width'] * Util.getMatrixScaleX(elementLink.matrix);
            var a = Raphael.rad(elementLink.matrix.split()['rotate']);
            var sin = Math.sin(a);
            var cos = Math.cos(a);
            var dw = cos * width;
            var dh = sin * width;

            return { dw: dw, dh: dh };
        }
        Util.getObjectDimensions = getObjectDimensions;

        function flip(element, _flip) {
            var box = Util.getBBox(element);
            var sx = box.x + box.width / 2;
            var sy = box.y + box.height / 2;

            /*var curSH = element.matrix.split().scalex;
            var curSV = element.matrix.split().scaley;
            var sh = curSH;
            var sv = curSV;*/
            var sh = 1;
            var sv = 1;

            switch (_flip) {
                case FlipKind.Horizontal:
                    sh = -1;
                    sv = 1;
                    break;
                case FlipKind.Vertical:
                    sh = 1;
                    sv = -1;
                    break;
            }

            var tr = "...S" + sh + "," + sv + "," + sx + "," + sy;
            element.transform(tr);
            purgeTransform(element);
        }
        Util.flip = flip;

        function transform(element, transform) {
            element.transform(transform);
            purgeTransform(element);
        }
        Util.transform = transform;

        function rectsIntersect(r1, r2) {
            return r2.x < (r1.x + r1.width) && (r2.x + r2.width) > r1.x && r2.y < (r1.y + r1.height) && (r2.y + r2.height) > r1.y;
        }
        Util.rectsIntersect = rectsIntersect;

        function rotatePoint(x, y, cx, cy, a) {
            // http://mathforum.org/library/drmath/view/63184.html
            // radius using distance formula
            var r = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));

            // initial angle in relation to center
            var iA = Math.atan2((y - cy), (x - cx)) * (180 / Math.PI);

            var nx = r * Math.cos((a + iA) / (180 / Math.PI));
            var ny = r * Math.sin((a + iA) / (180 / Math.PI));

            return [cx + nx, cy + ny];
        }
        Util.rotatePoint = rotatePoint;

        function arrayRemove(element, array) {
            var index = arrayIndexOf(element, array);
            if (index > -1)
                array.splice(index, 1);
        }
        Util.arrayRemove = arrayRemove;

        function arrayIndexOf(element, array, property, value) {
            if (property) {
                for (var i = 0; i < array.length; i++) {
                    var arVal = array[i];
                    var arprop = array[i][property];
                    if (array[i][property] && array[i][property] == value) {
                        return i;
                        break;
                    }
                }
            } else {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == element) {
                        return i;
                        break;
                    }
                }
            }
            return -1;
        }
        Util.arrayIndexOf = arrayIndexOf;

        function arrayFind(array, property, value) {
            if (property) {
                for (var i = 0; i < array.length; i++) {
                    var arVal = array[i];
                    var arprop = array[i][property];
                    if (array[i][property] && array[i][property] == value) {
                        return array[i];
                        break;
                    }
                }
            }
            return null;
        }
        Util.arrayFind = arrayFind;

        function arrayFilter(array, property, values) {
            var res = [];
            if (property) {
                for (var i = 0; i < array.length; i++) {
                    if (arrayIndexOf(array[i][property], values) != -1) {
                        res.push(array[i]);
                    }
                }
            }
            return res;
        }
        Util.arrayFilter = arrayFilter;

        function eventX(event, container, viewPort) {
            if (mobilesafari && event.touches && event.touches.length)
                return viewPort.x + (event.touches[0].pageX - offset(container)[0]) * 100 / viewPort.zoom;
            else
                return viewPort.x + (event.pageX - offset(container)[0]) * 100 / viewPort.zoom;
        }
        Util.eventX = eventX;

        function eventY(event, container, viewPort) {
            if (mobilesafari && event.touches && event.touches.length)
                return viewPort.y + (event.touches[0].pageY - offset(container)[1]) * 100 / viewPort.zoom;
            else
                return viewPort.y + (event.pageY - offset(container)[1]) * 100 / viewPort.zoom;
        }
        Util.eventY = eventY;

        function offset(container) {
            var pos = jQuery(container).offset();
            return [pos.left, pos.top];
        }

        function attrToString(attr, treatAsFloat) {
            if (typeof treatAsFloat === "undefined") { treatAsFloat = []; }
            var atrrString = "";
            for (var key in attr) {
                if (treatAsFloat.indexOf(key) < 0)
                    atrrString += key + ": " + attr[key] + "\n";
                else
                    atrrString += key + ": " + parseFloat(attr[key]) + "\n";
            }
            return atrrString;
        }
        Util.attrToString = attrToString;

        function stringToAttr(attrString) {
            var res = {};
            attrString = jQuery.trim(attrString);
            var ar = new String(attrString).split("\n");
            for (var i = 0; i < ar.length; i++) {
                var aAttr = ar[i].split(":");
                var atrName = jQuery.trim(aAttr.shift());
                res[atrName] = jQuery.trim(aAttr.join(":"));
                //res.push({ name: atrName, value: jQuery.trim(aAttr.join(":")) });
            }
            return res;
        }
        Util.stringToAttr = stringToAttr;

        function copyObject(obj) {
            var res = {};
            for (var key in obj) {
                res[key] = obj[key];
            }
            return res;
        }
        Util.copyObject = copyObject;

        function array(a) {
            for (var b = a.length, c = []; b--;)
                c.push(a[b]);
            return c;
        }

        function mergeArrays(a, b) {
            var res = a.slice(0);
            for (var i = 0; i < b.length; i++) {
                if (res.indexOf(b[i]) < 0)
                    res.push(b[i]);
            }
            return res;
        }
        Util.mergeArrays = mergeArrays;

        var lastNUnique = 0;
        function generateUID() {
            var nUniqueId = (new Date()).getTime();
            while (nUniqueId <= lastNUnique) {
                nUniqueId = lastNUnique + 1;
            }
            lastNUnique = nUniqueId;
            return "id" + nUniqueId.toString();
        }
        Util.generateUID = generateUID;

        function cleanUID(str) {
            //removes id's created 2002-2286
            return str.replace(/(\#id[0-9]{13})/gm, "").trim();
        }
        Util.cleanUID = cleanUID;

        function touchTransform(object, from, to) {
            var obj = object.node.objectLink;
            if (obj && obj.isFixed())
                return;
            if (from.length < 2 || to.length < 2)
                return false;
            var from1 = [from[0].x, from[0].y];
            var from2 = [from[1].x, from[1].y];
            var to1 = [to[0].x, to[0].y];
            var to2 = [to[1].x, to[1].y];
            var i = 0;
            var touch;
            var a1 = angle(from1, from2);
            var a2 = angle(to1, to2);
            var a = (a2 - a1) * 180 / Math.PI;
            var tx = (to1[0] + to2[0] - from1[0] - from2[0]) / 2;
            var ty = (to1[1] + to2[1] - from1[1] - from2[1]) / 2;

            var s = Math.sqrt((to2[0] - to1[0]) * (to2[0] - to1[0]) + (to2[1] - to1[1]) * (to2[1] - to1[1])) / Math.sqrt((from2[0] - from1[0]) * (from2[0] - from1[0]) + (from2[1] - from1[1]) * (from2[1] - from1[1]));
            var box = Util.getBBox(object, true);
            var x_ = box.x + box.width / 2;
            var y_ = box.y + box.height / 2;
            var sx = object.matrix.x(x_, y_);
            var sy = object.matrix.y(x_, y_);

            var tr = "...";
            if (obj && obj.canResize())
                tr += "S" + s + "," + s + "," + sx + "," + sy;
            if (obj && obj.canMove())
                tr += "T" + tx + "," + ty;
            if (obj && obj.canRotate())
                tr = "R" + a + "," + sx + "," + sy + tr;
            object.transform(tr);
            purgeTransform(object);
            return true;
        }
        Util.touchTransform = touchTransform;

        function touchDrag(viewPort, from, to, width, height) {
            if (from.length < 2 || to.length < 2)
                return false;
            var from1 = [from[0].x, from[0].y];
            var from2 = [from[1].x, from[1].y];
            var to1 = [to[0].x, to[0].y];
            var to2 = [to[1].x, to[1].y];
            var tx = (to1[0] + to2[0] - from1[0] - from2[0]) / 2;
            var ty = (to1[1] + to2[1] - from1[1] - from2[1]) / 2;
            var s = Math.sqrt((to2[0] - to1[0]) * (to2[0] - to1[0]) + (to2[1] - to1[1]) * (to2[1] - to1[1])) / Math.sqrt((from2[0] - from1[0]) * (from2[0] - from1[0]) + (from2[1] - from1[1]) * (from2[1] - from1[1]));
            viewPort.zoom = viewPort.zoom * s;

            /*var cx = (from[0].x + from[1].x) / 2;
            var cy = (from[0].y + from[1].y) / 2;
            console.log("----------------------------");
            console.log("cx: " + cx + "; cy:" + cy);
            console.log("x: " + viewPort.x + "; y:" + viewPort.y);
            viewPort.x = s * (viewPort.x - cx) + cx;
            viewPort.y = s * (viewPort.y - cy) + cy;
            console.log("x: " + viewPort.x + "; y:" + viewPort.y);*/
            viewPort.x = viewPort.x - ((width * 100 / (viewPort.zoom * s)) - (width * 100 / viewPort.zoom)) / 2;
            viewPort.y = viewPort.y - ((height * 100 / (viewPort.zoom * s)) - (height * 100 / viewPort.zoom)) / 2;

            viewPort.x = viewPort.x - tx;
            viewPort.y = viewPort.y - ty;
        }
        Util.touchDrag = touchDrag;

        function isClicked(x, y, el) {
            var bbox = Util.getBBox(el, true);
            if (!bbox)
                return false;
            var inMatrix = el.matrix.invert();
            var bx = inMatrix.x(x, y);
            var by = inMatrix.y(x, y);
            if (bx > bbox.x && bx < bbox.x2 && by > bbox.y && by < bbox.y2) {
                return true;
            }
            return false;
        }
        Util.isClicked = isClicked;

        function angle(p1, p2) {
            var a = p2[0] - p1[0];
            var b = p1[1] - p2[1];
            return Math.atan2(a, b);
        }

        function parseArray(source, parsefunction, noNew) {
            if (typeof noNew === "undefined") { noNew = false; }
            if (noNew) {
                var res = [];
                if (!source)
                    return res;
                if (source.length) {
                    for (var i = 0; i < source.length; i++) {
                        res.push(parsefunction(source[i]));
                    }
                }
                return res;
            } else {
                var res = [];
                if (!source)
                    return res;
                if (source.length) {
                    for (var i = 0; i < source.length; i++) {
                        res.push(new parsefunction(source[i]));
                    }
                }
                return res;
            }
        }
        Util.parseArray = parseArray;

        function normColor(color) {
            if (color.length == 7) {
                return color.toUpperCase();
            } else if (color.length == 4) {
                var res = "#" + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2) + color.charAt(3) + color.charAt(3);
                return res.toUpperCase();
            } else {
                return "";
            }
        }
        Util.normColor = normColor;

        function colorDistance(color1, color2) {
            var rgb1 = hexToRGB(normColor(color1));
            var rgb2 = hexToRGB(normColor(color2));
            var res = 0;
            for (var i = 0; i < 3; i++) {
                res += (rgb1[i] - rgb2[i]) * (rgb1[i] - rgb2[i]);
            }
            return res;
        }
        Util.colorDistance = colorDistance;

        function hexToRGB(color) {
            return [
                parseInt((cutHex(color)).substring(0, 2), 16),
                parseInt((cutHex(color)).substring(2, 4), 16),
                parseInt((cutHex(color)).substring(4, 6), 16)];
        }
        function cutHex(h) {
            return (h.charAt(0) == "#") ? h.substring(1, 7) : h;
        }

        var Touch = (function () {
            function Touch() {
            }
            Touch.processEvent = function (event, container, viewPort) {
                var res = new Array();
                for (var i = 0; i < event.touches.length; i++) {
                    var sTouch = event.touches[i];
                    var rTouch = new Touch();
                    rTouch.id = sTouch.identifier;
                    rTouch.target = sTouch.target;
                    rTouch.x = viewPort.x + (sTouch.pageX - offset(container)[0]) * 100 / viewPort.zoom;
                    rTouch.y = viewPort.y + (sTouch.pageY - offset(container)[1]) * 100 / viewPort.zoom;
                    res.push(rTouch);
                }
                return res;
            };
            return Touch;
        })();
        Util.Touch = Touch;

        function addTimeStamp(url) {
            if (typeof url !== 'undefined') {
                var hasVars = (url.indexOf("?") > -1);
                return url + (hasVars ? "&" : "?") + "timestamp=" + (new Date().getTime());
            }
            return "";
        }
        Util.addTimeStamp = addTimeStamp;
        ;

        function arrayToObjArray(ar) {
            var res = [];
            for (var i = 0; i < ar.length; i++) {
                res.push(ar[i]["toObject"]());
            }
            return res;
        }
        Util.arrayToObjArray = arrayToObjArray;

        /*export function fixMultilineEmptyLines(s: string): string {
        return s.replace(new RegExp("\n\n", 'g'), "\n \n");
        }*/
        function toRad(a) {
            return a / 180 * Math.PI;
        }
        Util.toRad = toRad;

        function getBBox(el, isWithoutTransform) {
            var deDesigner = el.node.deDesigner;
            if (deDesigner && deDesigner.redrawing) {
                deDesigner.delayRedraw();
            }
            return el.getBBox(isWithoutTransform);
        }
        Util.getBBox = getBBox;

        /**
        * Calculates bbox for each path and for all paths total
        *
        * @param paths A paths array to process
        */
        function calcPathsMetric(paths) {
            var pm = new DEJS.Effects.PathsMetric();
            if (paths.length == 0) {
                pm.bbox = { x: 0, y: 0, x2: 0, y2: 0, width: 0, height: 0 };
            } else {
                var r = DEJS.Model.TextEffectsManager.raphael();
                var dx = 0;
                var dy = 0;
                var bbox;
                for (var i = 0; i < paths.length; i++) {
                    var clRect = Raphael.pathBBox(paths[i]);
                    pm.bboxes.push({ x: clRect.x, y: clRect.y, x2: clRect.x + clRect.width, y2: clRect.y + clRect.height, width: clRect.width, height: clRect.height });
                    var cbbox = { x: clRect.x, y: clRect.y, x2: clRect.x + clRect.width, y2: clRect.y + clRect.height, width: clRect.width, height: clRect.height };
                    if (i == 0) {
                        bbox = cbbox;
                    } else {
                        bbox.x = Math.min(bbox.x, cbbox.x);
                        bbox.x2 = Math.max(bbox.x2, cbbox.x2);
                        bbox.y = Math.min(bbox.y, cbbox.y);
                        bbox.y2 = Math.max(bbox.y2, cbbox.y2);
                        var dx = cbbox.x - pm.bboxes[i - 1].x2;
                        pm.bboxes[i - 1].x2 = pm.bboxes[i - 1].x2 + dx;
                        pm.bboxes[i - 1].width = pm.bboxes[i - 1].width + dx;
                    }
                    //rpath.remove();
                }
                bbox.width = bbox.x2 - bbox.x;
                bbox.height = bbox.y2 - bbox.y;
                pm.bbox = bbox;
            }
            return pm;
        }
        Util.calcPathsMetric = calcPathsMetric;
    })(DEJS.Util || (DEJS.Util = {}));
    var Util = DEJS.Util;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="VO.ts"/>
    ///<reference path="../Util.ts"/>
    (function (VO) {
        var ConfigVO = (function () {
            function ConfigVO(config) {
                this.options = new VO.DEOptions();
                this.productCategories = [];
                this.productsList = [];
                this.defaultProductId = "";
                this.defaultDesignId = "";
                this.fonts = [];
                this.colors = [];
                this.graphicsCategories = [];
                this.graphicsList = [];
                this.textEffects = [];
                this.urls = [];
                this.assetsUrl = "assets/";
                this.galleryBaseUrl = "";
                // services
                this.getQuoteUrl = "";
                this.getDesignsUrl = "";
                this.saveDesignUrl = "";
                this.loadDesignUrl = "";
                this.redirectUrl = "";
                this.uploadImageUrl = "";
                this.redirectWindow = "";
                this.shareLinkUrl = "";
                this.textEffectsUrl = "";
                this.defaultNameObjectText = "";
                this.defaultNumberObjectText = "";
                this.defaultProductSize = [];
                if (!config)
                    return;

                //Add Text
                if (config.colors && config.colors.url)
                    this.urls.push({ key: "colors", url: config.colors.url });
                else
                    this.colors = DEJS.Util.parseArray(config.colors, ColorVO);

                //Products
                if (config.productCategoriesList && config.productCategoriesList.url)
                    this.urls.push({ key: "productCategoriesList", url: config.productCategoriesList.url });
                else
                    this.productCategories = DEJS.Util.parseArray(config.productsList, ProductCategoryVO);

                if (config.productsList && config.productsList.url)
                    this.urls.push({ key: "productsList", url: config.productsList.url });
                else
                    this.productsList = DEJS.Util.parseArray(config.productsList, ProductVO);

                this.processProductCategories();

                if (config.defaultProductId)
                    this.defaultProductId = config.defaultProductId;

                if (config.defaultDesignId)
                    this.defaultDesignId = config.defaultDesignId;

                if (config.fonts && config.fonts.url)
                    this.urls.push({ key: "fonts", url: config.fonts.url });
                else
                    this.fonts = DEJS.Util.parseArray(config.fonts, FontVO);

                if (config.textEffects && config.textEffects.config)
                    this.urls.push({ key: "textEffects", url: config.textEffects.config });

                /*else
                this.textEffects = Util.parseArray(config.textEffects, TextEffectVO);*/
                if (config.textEffects && config.textEffects.url) {
                    this.textEffectsUrl = config.textEffects.url;
                }

                //Images
                if (config.graphicsCategoriesList && config.graphicsCategoriesList.url)
                    this.urls.push({ key: "graphicsCategoriesList", url: config.graphicsCategoriesList.url });
                else
                    this.graphicsCategories = DEJS.Util.parseArray(config.graphicsList, GraphicsCategoryVO);

                if (config.graphicsList && config.graphicsList.url)
                    this.urls.push({ key: "graphicsList", url: config.graphicsList.url });
                else
                    this.graphicsList = DEJS.Util.parseArray(config.graphicsList, GraphicsVO);

                this.processGraphicCategories();

                if (config.assetsUrl) {
                    this.assetsUrl = config.assetsUrl;
                }
                if (config.galleryBaseUrl) {
                    this.galleryBaseUrl = config.galleryBaseUrl;
                }

                if (config.getQuoteUrl) {
                    this.getQuoteUrl = config.getQuoteUrl;
                }
                if (config.getDesignsUrl) {
                    this.getDesignsUrl = config.getDesignsUrl;
                }
                if (config.saveDesignUrl) {
                    this.saveDesignUrl = config.saveDesignUrl;
                }
                if (config.loadDesignUrl) {
                    this.loadDesignUrl = config.loadDesignUrl;
                }
                if (config.redirectUrl) {
                    this.redirectUrl = config.redirectUrl;
                }
                if (config.uploadImageUrl) {
                    this.uploadImageUrl = config.uploadImageUrl;
                }
                if (config.redirectWindow) {
                    this.redirectWindow = config.redirectWindow;
                }
                if (config.shareLinkUrl) {
                    this.shareLinkUrl = config.shareLinkUrl;
                }

                if (config.defaultNameObjectText) {
                    this.defaultNameObjectText = config.defaultNameObjectText;
                }
                if (config.defaultNumberObjectText) {
                    this.defaultNumberObjectText = config.defaultNumberObjectText;
                }

                if (config.defaultProductSize && config.defaultProductSize.length && config.defaultProductSize.length >= 2) {
                    this.defaultProductSize = [];
                    for (var i = 0; i < 4; i++) {
                        this.defaultProductSize[i] = Number(config.defaultProductSize[i]);
                    }
                }

                //Options
                if (config.options)
                    this.options = new VO.DEOptions(config.options);
            }
            ConfigVO.prototype.processProductCategories = function (categories) {
                if (!categories) {
                    categories = this.productCategories;
                }
                for (var i = 0; i < categories.length; i++) {
                    var cat = categories[i];
                    for (var j = 0; j < cat.products.length; j++) {
                        this.productsList.push(cat.products[j]);
                    }
                    this.processProductCategories(cat.categories);
                }
            };

            ConfigVO.prototype.processGraphicCategories = function (categories) {
                if (!categories) {
                    categories = this.graphicsCategories;
                }
                for (var i = 0; i < categories.length; i++) {
                    var cat = categories[i];
                    for (var j = 0; j < cat.graphics.length; j++) {
                        this.graphicsList.push(cat.graphics[j]);
                    }
                    this.processGraphicCategories(cat.categories);
                }
            };

            ConfigVO.prototype.getFont = function (fontFamily) {
                if (!fontFamily)
                    return null;
                var res;
                var i = 0;
                while (i < this.fonts.length && !res) {
                    var fontVO = this.fonts[i];
                    if (fontVO.fontFamily == fontFamily)
                        res = fontVO;
                    i++;
                }
                return res;
            };

            ConfigVO.prototype.getColor = function (color) {
                if (color == null)
                    return null;
                var curColor = DEJS.Util.normColor(color);
                var res;
                var i = 0;
                while (i < this.colors.length && !res) {
                    var colorVO = this.colors[i];
                    if (DEJS.Util.normColor(colorVO.value) == curColor)
                        res = colorVO;
                    i++;
                }
                return res;
            };

            ConfigVO.prototype.getNearestColor = function (color) {
                if (color == null)
                    return null;
                var curColor = DEJS.Util.normColor(color);
                var res;
                var i = 0;
                var distance = 200000;
                while (i < this.colors.length) {
                    var colorVO = this.colors[i];
                    var newDistance = DEJS.Util.colorDistance(color, colorVO.value);
                    if (newDistance < distance) {
                        res = colorVO;
                        distance = newDistance;
                    }
                    if (DEJS.Util.normColor(colorVO.value) == curColor)
                        res = colorVO;
                    i++;
                }
                return res;
            };

            ConfigVO.prototype.getTextEffect = function (name) {
                if (!name)
                    return null;
                var res;
                var i = 0;
                while (i < this.textEffects.length && !res) {
                    var textEffectVO = this.textEffects[i];
                    if (textEffectVO.name == name)
                        res = textEffectVO;
                    i++;
                }
                return res;
            };

            ConfigVO.prototype.toVariatedConfig = function (variation) {
                if (!variation)
                    return this;
                var config = new ConfigVO();
                if (variation.fontsIds)
                    config.fonts = DEJS.Util.arrayFilter(this.fonts, "id", variation.fontsIds);
                else
                    config.fonts = this.fonts;
                if (variation.colorsIds)
                    config.colors = DEJS.Util.arrayFilter(this.colors, "id", variation.colorsIds);
                else
                    config.colors = this.colors;
                config.graphicsCategories = DEJS.Util.parseArray(this.graphicsCategories, VO.GraphicsCategoryVO);
                if (variation.graphicsCategoriesIds) {
                    config.graphicsCategories = DEJS.Util.arrayFilter(config.graphicsCategories, "id", variation.graphicsCategoriesIds);
                }
                if (variation.graphicsIds) {
                    config.graphicsList = DEJS.Util.arrayFilter(this.graphicsList, "id", variation.graphicsIds);
                    for (var i = 0; i < config.graphicsCategories.length; i++) {
                        config.graphicsCategories[i].graphics = DEJS.Util.arrayFilter(config.graphicsCategories[i].graphics, "id", variation.graphicsIds);
                    }
                } else {
                    config.graphicsList = this.graphicsList;
                }

                return config;
            };
            return ConfigVO;
        })();
        VO.ConfigVO = ConfigVO;

        var FontVO = (function () {
            function FontVO(font) {
                this.id = "";
                this.name = "";
                this.fontFamily = "";
                this.ascent = 0;
                this.vector = "";
                this.boldAllowed = true;
                this.italicAllowed = true;
                if (font.id)
                    this.id = font.id;
                if (font.name)
                    this.name = font.name;
                if (font.fontFamily)
                    this.fontFamily = font.fontFamily;
                if (font.ascent)
                    this.ascent = font.ascent;
                if (font.vector)
                    this.vector = font.vector;

                if (typeof (font.boldAllowed) !== 'undefined')
                    this.boldAllowed = font.boldAllowed;
                if (typeof (font.italicAllowed) !== 'undefined')
                    this.italicAllowed = font.italicAllowed;
            }
            return FontVO;
        })();
        VO.FontVO = FontVO;

        var ColorVO = (function () {
            function ColorVO(color) {
                this.id = "";
                this.name = "";
                this.value = "";
                this.locations = [];
                if (color.id)
                    this.id = color.id;
                if (color.name)
                    this.name = color.name;
                if (color.value)
                    this.value = DEJS.Util.normColor(color.value);
                if (color.locations && color.locations.length) {
                    this.locations = [];
                    for (var i = 0; i < color.locations.length; i++) {
                        this.locations.push(new ProductLocationVO(color.locations[i]));
                    }
                }
            }
            ColorVO.prototype.toObject = function () {
                return { id: this.id, name: this.name, value: this.value };
            };
            return ColorVO;
        })();
        VO.ColorVO = ColorVO;

        var ProductCategoryVO = (function () {
            function ProductCategoryVO(category) {
                this.id = "";
                this.name = "";
                this.thumbUrl = "";
                this.products = [];
                this.categories = [];
                if (category.id)
                    this.id = category.id;
                if (category.name)
                    this.name = category.name;
                if (category.thumbUrl)
                    this.thumbUrl = category.thumbUrl;
                this.products = DEJS.Util.parseArray(category.products, ProductVO);
                this.categories = DEJS.Util.parseArray(category.categories, ProductCategoryVO);
            }
            ProductCategoryVO.prototype.toObject = function () {
                var obj = { id: this.id, name: this.name, thumbUrl: this.thumbUrl };
                obj.products = DEJS.Util.arrayToObjArray(this.products);
                obj.categories = DEJS.Util.arrayToObjArray(this.categories);
                return obj;
            };
            return ProductCategoryVO;
        })();
        VO.ProductCategoryVO = ProductCategoryVO;

        var ProductVO = (function () {
            function ProductVO(product) {
                this.id = "";
                this.categoryId = "";
                this.name = "";
                this.thumbUrl = "";
                this.description = "";
                this.price = "";
                this.locations = [];
                this.colors = [];
                this.multicolor = false;
                this.resizable = false;
                this.editableAreaSizes = [];
                this.namesNumbersEnabled = false;
                //VCGLL
                //sizes: ProductSizeVO[] = [];
                this.sizes = [];
                this.colorizableElements = [];
                this.colorizableGroups = [];
                this.variations = [];
                this.template = "";
                this.showRuler = false;
                this.hideEditableAreaBorder = false;
                if (!product)
                    return;
                if (product.id)
                    this.id = product.id;
                if (product.categoryId)
                    this.categoryId = product.categoryId;
                if (product.name)
                    this.name = product.name;
                if (product.thumbUrl)
                    this.thumbUrl = product.thumbUrl;
                if (product.description)
                    this.description = product.description;
                if (product.price)
                    this.price = product.price;
                if (product.multicolor)
                    this.multicolor = product.multicolor;
                if (product.resizable)
                    this.resizable = product.resizable;
                if (product.editableAreaSizes)
                    this.editableAreaSizes = DEJS.Util.parseArray(product.editableAreaSizes, ProductCanvasSizeVO);
                if (product.namesNumbersEnabled)
                    this.namesNumbersEnabled = product.namesNumbersEnabled;
                if (product.locations && product.locations.length) {
                    this.locations = [];
                    for (var i = 0; i < product.locations.length; i++) {
                        this.locations.push(new ProductLocationVO(product.locations[i]));
                    }
                }
                if (product.colors && product.colors.length) {
                    this.colors = [];
                    for (var i = 0; i < product.colors.length; i++) {
                        this.colors.push(new ComplexColorVO(product.colors[i]));
                    }
                } else {
                    var allColors = DEJS.Model.configManager.config.colors;
                    if (allColors && allColors.length) {
                        for (var i = 0; i < allColors.length; i++) {
                            this.colors.push(new ComplexColorVO(allColors[i]));
                        }
                    }
                }

                //VCGLL
                //this.sizes = Util.parseArray(product.sizes, VO.ProductSizeVO);
                this.sizes = DEJS.Util.parseArray(product.sizes, String);
                if (product.colorizableElements && product.colorizableElements.length > 0) {
                    if (product.colorizableElements[0].classes) {
                        this.colorizableGroups = DEJS.Util.parseArray(product.colorizableElements, VO.ColorizableElementGroupVO);

                        //populate colorizeList with colors for legacy (colorizing bg engine)
                        this.colorizableElements = [];
                        for (var i = 0; i < this.colorizableGroups.length; i++) {
                            var classes = this.colorizableGroups[i].classes;
                            for (var j = 0; j < classes.length; j++) {
                                this.colorizableElements.push(classes[j]);
                            }
                        }
                    } else {
                        this.colorizableElements = DEJS.Util.parseArray(product.colorizableElements, VO.ColorizableElementVO);
                    }
                }
                if (product.variations)
                    this.variations = DEJS.Util.parseArray(product.variations, ProductVariationVO);
                if (product.template)
                    this.template = product.template;
                if (product.showRuler)
                    this.showRuler = product.showRuler;
                if (product.hideEditableAreaBorder)
                    this.hideEditableAreaBorder = product.hideEditableAreaBorder;
            }
            ProductVO.prototype.getColorLocation = function (color, name) {
                if (color == null)
                    return new VO.ProductLocationVO({});
                var curColor = DEJS.Util.normColor(color);
                var loc;
                if (color != "") {
                    var i = 0;
                    while (i < this.colors.length && !loc) {
                        var colorVO = this.colors[i];
                        if (DEJS.Util.normColor(colorVO.value) == curColor) {
                            if (name)
                                loc = DEJS.Util.arrayFind(colorVO.locations, "name", name);
                            if (!loc && colorVO.locations.length > 0)
                                loc = colorVO.locations[0];
                        }
                        i++;
                    }
                }
                if (!loc && name)
                    loc = DEJS.Util.arrayFind(this.locations, "name", name);
                if (!loc && this.locations.length > 0)
                    loc = this.locations[0];
                if (!loc)
                    loc = new VO.ProductLocationVO({});
                return loc;
            };

            ProductVO.prototype.getColor = function (color) {
                if (color == null)
                    return null;
                var curColor = DEJS.Util.normColor(color);
                var res;
                var i = 0;
                while (i < this.colors.length && !res) {
                    var colorVO = this.colors[i];
                    if (DEJS.Util.normColor(colorVO.value) == curColor)
                        res = colorVO;
                    i++;
                }
                return res;
            };

            ProductVO.prototype.getNearestColor = function (color) {
                if (color == null)
                    return null;
                var curColor = DEJS.Util.normColor(color);
                var res;
                var i = 0;
                var distance = 200000;
                while (i < this.colors.length) {
                    var colorVO = this.colors[i];
                    var newDistance = DEJS.Util.colorDistance(color, colorVO.value);
                    if (newDistance < distance) {
                        res = colorVO;
                        distance = newDistance;
                    }
                    if (DEJS.Util.normColor(colorVO.value) == curColor)
                        res = colorVO;
                    i++;
                }
                return res;
            };

            ProductVO.prototype.getVariation = function (variationId) {
                return DEJS.Util.arrayFind(this.variations, "id", variationId);
            };

            ProductVO.prototype.exportColorizeList = function () {
                var res = [];
                for (var i = 0; i < this.colorizableElements.length; i++) {
                    var colEl = new VO.ColorizableElementVO(this.colorizableElements[i]);
                    if (colEl.colors.length == 0) {
                        colEl.colors = DEJS.Util.parseArray(this.colors, ColorVO);
                    }
                    res.push(colEl);
                }
                return res;
            };

            ProductVO.prototype.exportColorizeGroupsList = function () {
                var res = [];
                for (var i = 0; i < this.colorizableGroups.length; i++) {
                    var colGr = new VO.ColorizableElementGroupVO();
                    colGr.name = this.colorizableGroups[i].name;
                    for (var j = 0; j < this.colorizableGroups[i].classes.length; j++) {
                        var colEl = new VO.ColorizableElementVO(this.colorizableGroups[i].classes[j]);
                        if (colEl.colors.length == 0) {
                            colEl.colors = DEJS.Util.parseArray(this.colors, ColorVO);
                        }
                        colGr.classes.push(colEl);
                    }
                    res.push(colGr);
                }
                return res;
            };

            //A product with same locations count, but empty locations
            ProductVO.prototype.getDumbCopy = function () {
                var product = new ProductVO(this.toObject());
                product.locations = [];
                for (var i = 0; i < this.locations.length; i++) {
                    var location = new ProductLocationVO(this.locations[i]);
                    location.image = "";
                    product.locations.push(location);
                }
                product.id = "dumb"; //See canvasManager.setProduct()
                return product;
            };

            ProductVO.prototype.toObject = function () {
                var obj = {};
                obj.id = this.id;
                obj.categoryId = this.categoryId;
                obj.name = this.name;
                obj.thumbUrl = this.thumbUrl;
                obj.description = this.description;
                obj.price = this.price;
                obj.locations = [];
                for (var i = 0; i < this.locations.length; i++) {
                    var loc = {};
                    loc.name = this.locations[i].name;

                    //add location max and min sizes for resizable products
                    if (this.resizable && this.locations[i].editableAreaUnitsRange && this.locations[i].editableAreaUnitsRange.length > 0) {
                        loc.editableAreaUnitsRange = this.locations[i].editableAreaUnitsRange;
                    }
                    obj.locations.push(loc);
                }
                obj.colors = [];
                for (var i = 0; i < this.colors.length; i++) {
                    obj.colors.push(this.colors[i].toObject());
                }
                obj.multicolor = this.multicolor;
                obj.namesNumbersEnabled = this.namesNumbersEnabled;
                obj.resizable = this.resizable;
                if (this.editableAreaSizes && this.editableAreaSizes.length > 0) {
                    obj.editableAreaSizes = this.editableAreaSizes;
                }
                obj.sizes = this.sizes;

                //VCGLL
                /*for (var i = 0; i < this.sizes.length; i++) {
                obj.sizes.push(this.sizes[i].toObject());
                }*/
                obj.colorizableElements = DEJS.Util.arrayToObjArray(this.colorizableElements);
                obj.colorizableGroups = DEJS.Util.arrayToObjArray(this.colorizableGroups);
                obj.variations = DEJS.Util.arrayToObjArray(this.variations);
                return obj;
            };

            ProductVO.prototype.toVariatedProduct = function (variation) {
                return this;
                //VCGLL
                /*if (!variation) return this;
                var product: ProductVO = new ProductVO(this);
                if (variation.sizesIds) {
                product.sizes = Util.arrayFilter(this.sizes, "id", variation.sizesIds);
                }
                if (variation.locations) {
                product.locations = variation.locations;
                }
                return product;*/
            };
            return ProductVO;
        })();
        VO.ProductVO = ProductVO;

        var ProductLocationVO = (function () {
            function ProductLocationVO(location) {
                this.name = "";
                this.image = "";
                this.mask = "";
                this.overlayInfo = "";
                this.editableAreaUnits = [];
                this.editableAreaUnitsRange = [];
                this.clipRect = [];
                this.dpu = 0;
                this.dpuX = 1;
                this.dpuY = 1;
                this.rescaleObject = 1;
                if (location.name)
                    this.name = location.name;
                if (location.image)
                    this.image = location.image;
                if (location.mask)
                    this.mask = location.mask;
                if (location.overlayInfo)
                    this.overlayInfo = location.overlayInfo;
                if (location.editableArea && location.editableArea.length && location.editableArea.length >= 4) {
                    this.editableArea = [];
                    for (var i = 0; i < 4; i++) {
                        this.editableArea[i] = Number(location.editableArea[i]);
                    }
                }
                if (location.editableAreaUnits && location.editableAreaUnits.length && location.editableAreaUnits.length >= 2) {
                    this.editableAreaUnits = [];
                    for (var i = 0; i < 2; i++) {
                        this.editableAreaUnits[i] = Number(location.editableAreaUnits[i]);
                    }
                }
                if (location.editableAreaUnitsRange && location.editableAreaUnitsRange && location.editableAreaUnitsRange.length >= 2) {
                    this.editableAreaUnitsRange = [];
                    for (var i = 0; i < 2; i++) {
                        this.editableAreaUnitsRange[i] = [];
                        for (var j = 0; j < location.editableAreaUnitsRange[i].length; j++) {
                            this.editableAreaUnitsRange[i][j] = Number(location.editableAreaUnitsRange[i][j]);
                            if (isNaN(this.editableAreaUnitsRange[i][j]))
                                this.editableAreaUnitsRange[i][j] = 0;
                        }
                    }
                }
                if (location.rescaleObject)
                    this.rescaleObject = location.rescaleObject;
                if (location.clipRect && location.clipRect.length && location.clipRect.length >= 4) {
                    this.clipRect = [];
                    for (var i = 0; i < 4; i++) {
                        this.clipRect[i] = location.clipRect[i];
                    }
                }
                this.extractDPU();
            }
            ProductLocationVO.prototype.extractDPU = function () {
                if (this.editableArea && this.editableArea.length >= 4 && this.editableAreaUnits.length >= 2) {
                    this.dpu = this.dpuX = Math.abs(this.editableArea[0] - this.editableArea[2]) / this.editableAreaUnits[0];
                    this.dpuY = Math.abs(this.editableArea[1] - this.editableArea[3]) / this.editableAreaUnits[1];
                } else {
                    this.dpu = this.dpuX = 1;
                    this.dpuY = 1;
                }
                return this.dpu;
            };

            ProductLocationVO.prototype.toObject = function () {
                var obj = {};
                obj.name = this.name;
                obj.image = this.image;
                obj.mask = this.mask;
                obj.overlayInfo = this.overlayInfo;
                obj.editableArea = this.editableArea;
                obj.editableAreaUnits = this.editableAreaUnits;
                obj.editableAreaUnitsRange = this.editableAreaUnitsRange;
                obj.rescaleObject = this.rescaleObject;
                return obj;
            };
            return ProductLocationVO;
        })();
        VO.ProductLocationVO = ProductLocationVO;

        var ProductCanvasSizeVO = (function () {
            function ProductCanvasSizeVO(size) {
                this.width = 0;
                this.height = 0;
                this.label = "";
                if (size.width)
                    this.width = size.width;
                if (size.height)
                    this.height = size.height;
                if (size.label)
                    this.label = size.label;
            }
            ProductCanvasSizeVO.prototype.toObject = function () {
                var obj = {};
                obj.width = this.width;
                obj.height = this.height;
                if (this.label.length > 0) {
                    obj.label = this.label;
                }
                return obj;
            };
            return ProductCanvasSizeVO;
        })();
        VO.ProductCanvasSizeVO = ProductCanvasSizeVO;

        var ComplexColorVO = (function () {
            function ComplexColorVO(color) {
                this.name = "";
                this.value = "";
                this.locations = [];
                this.colorizeList = [];
                this.colorizeGroupList = [];
                this.colorizeInited = false;
                if (!color)
                    return;
                if (color.name)
                    this.name = color.name;
                if (color.value)
                    this.value = color.value;
                if (color.location && color.location.length) {
                    this.locations = [];
                    for (var i = 0; i < color.location.length; i++) {
                        this.locations.push(new ProductLocationVO(color.location[i]));
                    }
                }
                if (color.locations && color.locations.length) {
                    this.locations = [];
                    for (var i = 0; i < color.locations.length; i++) {
                        this.locations.push(new ProductLocationVO(color.locations[i]));
                    }
                }
                if (color.colorizeList && color.colorizeList.length) {
                    this.colorizeList = [];
                    for (var i = 0; i < color.colorizeList.length; i++) {
                        this.colorizeList.push(new VO.ColorizableElementVO(color.colorizeList[i]));
                    }
                }
                if (color.colorizeGroupList && color.colorizeGroupList.length) {
                    this.colorizeGroupList = [];

                    for (var i = 0; i < color.colorizeGroupList.length; i++) {
                        this.colorizeGroupList.push(new VO.ColorizableElementGroupVO(color.colorizeGroupList[i]));
                    }
                }
            }
            ComplexColorVO.prototype.toObject = function () {
                var obj = { name: this.name, value: this.value };
                if (this.colorizeList.length > 0) {
                    obj.colorizeList = DEJS.Util.arrayToObjArray(this.colorizeList);
                }
                if (this.colorizeGroupList.length > 0) {
                    obj.colorizeGroupList = DEJS.Util.arrayToObjArray(this.colorizeGroupList);
                }
                return obj;
            };

            ComplexColorVO.prototype.equal = function (color) {
                if (!color)
                    return false;
                if (color.value != this.value)
                    return false;
                if (color.colorizeList.length != this.colorizeList.length)
                    return false;
                for (var i = 0; i < color.colorizeList.length; i++) {
                    if (color.colorizeList[i].value != this.colorizeList[i].value)
                        return false;
                }

                //No need to compare groups - colorizeList is based on groups content
                /*if (color.colorizeGroupList.length != this.colorizeGroupList.length) return false;
                for (var i = 0; i < color.colorizeGroupList.length; i++) {   //TODO: This should work for now, but needs to be rewritten suppa gut.
                if (color.colorizeGroupList[i].name != this.colorizeGroupList[i].name) return false;
                }*/
                return true;
            };

            ComplexColorVO.prototype.colorizeByArray = function (colArray) {
                var changed = false;
                for (var i = 0; i < colArray.length; i++) {
                    var colElObj = colArray[i];

                    //legacy
                    if (colElObj.id && colElObj.value) {
                        var colEl = DEJS.Util.arrayFind(this.colorizeList, "id", colElObj.id);
                        if (colEl) {
                            if (colEl.value != colElObj.value) {
                                colEl.value = colElObj.value;
                                changed = true;
                            }
                        }
                    }
                }
                return changed;
            };
            return ComplexColorVO;
        })();
        VO.ComplexColorVO = ComplexColorVO;

        var ProductSizeVO = (function () {
            function ProductSizeVO(size) {
                if (typeof size === "undefined") { size = null; }
                this.id = "";
                this.name = "";
                if (!size)
                    return;
                if (size.id)
                    this.id = size.id;
                if (size.name)
                    this.name = size.name;
            }
            ProductSizeVO.prototype.toObject = function () {
                return { id: this.id, name: this.name };
            };
            return ProductSizeVO;
        })();
        VO.ProductSizeVO = ProductSizeVO;

        var GraphicsCategoryVO = (function () {
            function GraphicsCategoryVO(category) {
                this.id = "";
                this.parentId = "";
                this.name = "";
                this.thumb = "";
                this.graphics = [];
                this.categories = [];
                if (category.id)
                    this.id = category.id;
                if (category.parentId)
                    this.parentId = category.parentId;
                if (category.name)
                    this.name = category.name;
                if (category.thumb)
                    this.thumb = category.thumb;
                if (category.graphicsList) {
                    this.graphics = DEJS.Util.parseArray(category.graphicsList, GraphicsVO);
                } else if (category.graphics) {
                    this.graphics = DEJS.Util.parseArray(category.graphics, GraphicsVO);
                }
                if (category.categories)
                    this.categories = DEJS.Util.parseArray(category.categories, GraphicsCategoryVO);
            }
            GraphicsCategoryVO.prototype.toObject = function () {
                return this;
            };
            return GraphicsCategoryVO;
        })();
        VO.GraphicsCategoryVO = GraphicsCategoryVO;

        var GraphicsVO = (function () {
            function GraphicsVO(graphics) {
                this.id = "";
                this.categoryId = "";
                this.name = "";
                this.description = "";
                this.thumb = "";
                this.image = "";
                this.colorize = false;
                this.multicolor = false;
                this.colorsNum = 0;
                this.colorizableElements = [];
                this.uploaded = false;
                if (!graphics)
                    return;
                if (graphics.id)
                    this.id = graphics.id;
                if (graphics.categoryId)
                    this.categoryId = graphics.categoryId;
                if (graphics.name)
                    this.name = graphics.name;
                if (graphics.description)
                    this.description = graphics.description;
                if (graphics.thumb)
                    this.thumb = graphics.thumb;
                if (graphics.image)
                    this.image = graphics.image;
                if (graphics.colorize)
                    this.colorize = graphics.colorize;
                if (graphics.multicolor)
                    this.multicolor = graphics.multicolor;
                if (graphics.colors)
                    this.colorsNum = Number(graphics.colors);
                if (graphics.colorizableElements)
                    this.colorizableElements = DEJS.Util.parseArray(graphics.colorizableElements, VO.ColorizableElementVO);
                if (graphics.uploaded)
                    this.uploaded = graphics.uploaded;
            }
            return GraphicsVO;
        })();
        VO.GraphicsVO = GraphicsVO;

        var ProductVariationVO = (function () {
            function ProductVariationVO(variation) {
                this.id = "";
                this.name = "";
                this.minQuantity = 0;
                this.addObject = true;
                this.imageUpload = true;
                this.imageGallery = true;
                this.defaultDesign = "";
                if (!variation)
                    return;
                if (variation.id)
                    this.id = variation.id;
                if (variation.name)
                    this.name = variation.name;
                if (variation.format)
                    this.name = variation.format;
                if ("minQuantity" in variation)
                    this.minQuantity = variation.minQuantity;
                if ("addObject" in variation)
                    this.addObject = variation.addObject;
                if ("imageUpload" in variation)
                    this.imageUpload = variation.imageUpload;
                if ("imageGallery" in variation)
                    this.imageGallery = variation.imageGallery;
                if (variation.defaultDesign)
                    this.defaultDesign = variation.defaultDesign;
                if (variation.fontsIds)
                    this.fontsIds = DEJS.Util.parseArray(variation.fontsIds, String, true);
                if (variation.colorsIds)
                    this.colorsIds = DEJS.Util.parseArray(variation.colorsIds, String, true);
                if (variation.backgroundColorsIds)
                    this.backgroundColorsIds = DEJS.Util.parseArray(variation.backgroundColorsIds, String, true);
                if (variation.graphicsCategoriesIds)
                    this.graphicsCategoriesIds = DEJS.Util.parseArray(variation.graphicsCategoriesIds, String, true);
                if (variation.graphicsIds)
                    this.graphicsIds = DEJS.Util.parseArray(variation.graphicsIds, String, true);
                if (variation.sizesIds)
                    this.sizesIds = DEJS.Util.parseArray(variation.sizesIds, String, true);
                if (variation.locations)
                    this.locations = DEJS.Util.parseArray(variation.locations, ProductLocationVO);
            }
            ProductVariationVO.prototype.toRestrictionVO = function () {
                var res = new RestrictionsVO();
                res.minQuantity = this.minQuantity;
                res.addObject = this.addObject;
                res.imageUpload = this.imageUpload;
                res.imageGallery = this.imageGallery;
                return res;
            };

            ProductVariationVO.prototype.toObject = function () {
                return { id: this.id, name: this.name, format: this.name };
            };
            return ProductVariationVO;
        })();
        VO.ProductVariationVO = ProductVariationVO;

        var RestrictionsVO = (function () {
            function RestrictionsVO() {
                this.minQuantity = 0;
                this.addObject = true;
                this.imageUpload = true;
                this.imageGallery = true;
            }
            return RestrictionsVO;
        })();
        VO.RestrictionsVO = RestrictionsVO;

        var TextEffectVO = (function () {
            function TextEffectVO(te) {
                this.name = "";
                this.label = "";
                this.fxName = "";
                this.paramName = "";
                this.paramValName = "d";
                this.min = 0.05;
                this.max = 1;
                this.step = 0.05;
                if (te.name)
                    this.name = te.name;
                if (te.label)
                    this.label = te.label;
                if (te.fxName)
                    this.fxName = te.fxName;
                if (te.paramName)
                    this.paramName = te.paramName;
                if (te.paramValName)
                    this.paramValName = te.paramValName;
                if ("min" in te)
                    this.min = te.min;
                if ("max" in te)
                    this.max = te.max;
                if ("step" in te)
                    this.step = te.step;
                if (!("paramName" in te))
                    this.paramName = this.name;
            }
            TextEffectVO.prototype.toObject = function () {
                return { name: this.name, label: this.label, paramName: this.paramName, min: this.min, max: this.max, step: this.step };
            };
            return TextEffectVO;
        })();
        VO.TextEffectVO = TextEffectVO;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="../Util.ts"/>
    ///<reference path="Obj.ts"/>
    ///<reference path="VO.ts"/>
    (function (VO) {
        //This will also be used for Order.
        //So add here Quantity, sizes and all other staff.
        var DesignVO = (function () {
            function DesignVO() {
                this.svgs = [];
                this.editableArea = [];
                this.quantities = [];
                this.prices = [];
                this.notes = '';
                this.namesNumbers = [];
            }
            DesignVO.prototype.toJSON = function () {
                var data = {};
                if (this.product) {
                    data.product = {};
                    data.product.id = this.product.id;
                    data.product.name = this.product.name;
                    data.product.template = this.product.template;
                    if (this.productColor) {
                        data.product.color = this.productColor.value;
                        data.product.colorName = this.productColor.name;
                    }
                    if (this.productSize) {
                        data.product.size = this.productSize.toObject();
                    }
                    data.locations = [];
                    for (var i = 0; i < this.product.locations.length; i++) {
                        var location = {};
                        location.name = this.product.locations[i].name;
                        if (this.editableArea && this.editableArea[i])
                            location.editableArea = this.editableArea[i];
                        location.svg = this.svgs[i];
                        data.locations.push(location);
                    }
                }
                if (this.productVariation) {
                    data.variationId = this.productVariation.id;
                }
                data.quantities = this.quantities;
                data.prices = this.prices;
                data.namesNumbers = [];
                for (var i = 0; i < this.namesNumbers.length; i++) {
                    data.namesNumbers.push(this.namesNumbers[i].toObject());
                }
                data.notes = this.notes;
                return JSON.stringify({ data: data });
            };
            return DesignVO;
        })();
        VO.DesignVO = DesignVO;

        var DesignLocationVO = (function () {
            function DesignLocationVO(loc) {
                this.name = "";
                this.svg = "";
                if (loc.name)
                    this.name = loc.name;
                if (loc.svg)
                    this.svg = loc.svg;
            }
            return DesignLocationVO;
        })();
        VO.DesignLocationVO = DesignLocationVO;

        var NamesNumbersVO = (function () {
            function NamesNumbersVO(obj) {
                this.name = "";
                this.numberText = "";
                this.size = "";
                if (!obj)
                    return;
                if (obj.name)
                    this.name = obj.name;
                if (obj["number"])
                    this.numberText = obj["number"];
                if (obj.size)
                    this.size = obj.size;
            }
            NamesNumbersVO.prototype.toObject = function () {
                return { name: this.name, "number": this.numberText, size: this.size };
            };
            return NamesNumbersVO;
        })();
        VO.NamesNumbersVO = NamesNumbersVO;

        var ImageColorCountVO = (function () {
            function ImageColorCountVO(value) {
                this.colorCount = 0;
                this.processColors = false;
                if (!value)
                    return;
                if (value.colorCount)
                    this.colorCount = value.colorCount;
                if (value.processColors)
                    this.processColors = value.processColors;
            }
            return ImageColorCountVO;
        })();
        VO.ImageColorCountVO = ImageColorCountVO;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="../designer/DEDesigner.ts"/>
    ///<reference path="DEModel.ts"/>
    ///<reference path="../vo/ConfigVO.ts"/>
    ///<reference path="../vo/DesignVO.ts"/>
    ///<reference path="../event/Events.ts"/>
    ///<reference path="../event/EventDispatcher.ts"/>
    (function (Model) {
        var CanvasManager = (function () {
            //desiginer:
            function CanvasManager(model) {
                this.designers = [];
                this.productSideIndex = 0;
                this.currentProductColor = null;
                this.currentProductSize = null;
                this.currentScaleChange = 1;
                this.currentProductVariation = null;
                this.printAreaVisible = true;
                this.lockProportions = true;
                this.buffer = null;
                this.selectedObj = null;
                this.zoom = 100;
                this.drag = false;
                this.viewPort = { x: 0, y: 0, zoom: 100 };
                this.hasPseudoFocus = false;
                this.suppressUpdate = false;
                this.model = model;
            }
            CanvasManager.prototype.init = function () {
                var _this = this;
                DEJS.debug("canvas init");
                this.designers.push(this.createDesigner(true));
                Model.TextEffectsManager.registerCanvas(this.designers[0]);
                Model.deDesigner.holder.css("position", "relative");

                jQuery(document).keydown(function (e) {
                    return _this.onKeyDown(e);
                });
                jQuery(document).click(function (e) {
                    return _this.onClick(e);
                });
            };

            CanvasManager.prototype.updateDesigners = function () {
                if (!this.product)
                    return;
                var desCount = Math.max(this.product.locations.length, this.designers.length);
                for (var i = 0; i < desCount; i++) {
                    var designer;
                    if (i >= this.designers.length)
                        designer = this.designers[i] = this.createDesigner(i == 0);
                    else
                        designer = this.designers[i];
                    if (i == this.productSideIndex)
                        designer.holder.css({ "visibility": "visible", 'zIndex': desCount });
                    else
                        designer.holder.css({ "visibility": "hidden", 'zIndex': i });

                    if (i >= this.product.locations.length) {
                        //Clear to make sure there are no styles left
                        designer.setProductImage("");
                    } else {
                        designer.deSelect();
                        var curLocation = new DEJS.VO.ProductLocationVO(this.product.locations[i].toObject());

                        //calculaye editable coords, dpu, scale product factor
                        this.calculateEditableArea(curLocation, i);

                        designer.dpu = curLocation.dpu;

                        //!!!!!!!! Set this correctly later!!!!
                        designer.dpuX = curLocation.dpuX;
                        designer.dpuY = curLocation.dpuY;
                        var loc = this.product.getColorLocation(this.currentProductColor ? this.currentProductColor.value : "", this.product.locations[i].name);
                        loc = new DEJS.VO.ProductLocationVO(loc.toObject());
                        designer.setProductImage(loc.image, this.product.colorizableGroups);
                        loc.overlayInfo.length > 0 ? designer.setOverlay(loc.overlayInfo) : designer.setOverlay(this.product.locations[i].overlayInfo);
                        designer.setMask(loc.mask);

                        if (curLocation.editableArea) {
                            designer.printingAreaVisible(this.printAreaVisible);
                            designer.printingArea(curLocation.editableArea, this.product.resizable ? curLocation.rescaleObject : false);

                            if (curLocation.editableAreaUnits && curLocation.editableAreaUnits.length > 1) {
                                designer.printingAreaUnits(curLocation.editableAreaUnits);
                                designer.setRuler(this.product.showRuler);
                            } else {
                                designer.setRuler(false);
                            }
                        } else {
                            designer.printingAreaVisible(false);
                            designer.defaultPrintingArea();
                            designer.setRuler(false);
                        }

                        designer.setClipRect(this.product.locations[i].clipRect);
                        designer.setLockProportions(this.lockProportions);
                    }
                }
            };

            CanvasManager.prototype.curDesigner = function () {
                return this.designers[this.productSideIndex];
            };

            CanvasManager.prototype.createDesigner = function (attachColorizeEvents) {
                var _this = this;
                var designer = new DEJS.DEDesigner();
                designer.options = Model.deDesigner.configManager.config.options;
                var canvasHolder = jQuery("<div>").appendTo(Model.deDesigner.holder).css({ position: "absolute", "left": 0, "top": 0 });
                designer.init(canvasHolder, Model.deDesigner.width, Model.deDesigner.height);
                designer.setViewPort(this.viewPort);
                designer.addEventListener(DEEvents.OBJECT_SELECTED_EVENT, function (event) {
                    return _this.onObjectSelected(event);
                });
                designer.addEventListener(DEEvents.OBJECT_DCLICK_EVENT, function (event) {
                    return _this.onObjectDClicked(event);
                });
                designer.addEventListener(DEEvents.DESIGNER_CHANGED_EVENT, function (event) {
                    return _this.onDesignerChanged(event);
                });
                designer.addEventListener(DEEvents.VIEWPORT_UPDATE_EVENT, function (event) {
                    return _this.onViewPortChanged(event);
                });
                if (attachColorizeEvents) {
                    designer.addEventListener(DEEvents.BACKGROUND_COLORIZE_PARSED_EVENT, function (event) {
                        return _this.onBackgroundColorizeParsed(event);
                    });
                }
                designer.setLockProportions(this.lockProportions);
                DEJS.debug("designer side created");
                return designer;
            };

            CanvasManager.prototype.onObjectSelected = function (event) {
                this.suppressUpdate = true; //Hacky?
                this.selectedObj = event.obj;
                if (event.obj) {
                    this.model.controlsManager.setSelectedObj(event.obj);
                } else {
                    this.model.controlsManager.setSelectedObj(null);
                }
                this.checkObjectDPU();
                this.suppressUpdate = false; //Hacky?
            };

            CanvasManager.prototype.onObjectDClicked = function (event) {
                //center canvas to visible area
                var o = event.obj;
                if (o) {
                    var x = o.elementLink.getBBox().x + o.elementLink.getBBox().width / 2;
                    var y = o.elementLink.getBBox().y + o.elementLink.getBBox().height / 2;

                    var updatedVP = {};
                    updatedVP.x = x - this.curDesigner().width * 3 / 4;
                    updatedVP.y = y - this.curDesigner().height / 2;
                    updatedVP.zoom = this.viewPort.zoom;

                    this.viewPort = updatedVP;
                    for (var i = 0; i < this.designers.length; i++) {
                        this.designers[i].setViewPort(this.viewPort);
                    }
                }
                this.model.controlsManager.setObjDClicked(true);
            };

            CanvasManager.prototype.onDesignerChanged = function (event) {
                if (event && event.obj && event.obj.uploaded) {
                    Model.saveLoadManager.imageUploaded(event.obj);
                }
                if (event && this.selectedObj && event.objectSizeChanged) {
                    this.model.controlsManager.setSelectedObj(event.obj);
                }
                if (event) {
                    if (!this.suppressUpdate) {
                        this.model.dispatchEvent(new DEJS.Events.DesignerChangedEvent(event.obj, event.dispatchHistory));
                    }
                } else {
                    //if (!this.suppressUpdate) { this.model.dispatchEvent(new Events.Event(DEEvents.DESIGNER_CHANGED_EVENT, this)); }
                    if (!this.suppressUpdate) {
                        this.model.dispatchEvent(new DEJS.Events.DesignerChangedEvent(null));
                    }
                }
                this.checkObjectDPU();
            };

            /*setProductImage(image: string) {
            this.designers[0].setProductImage(image);
            }*/
            CanvasManager.prototype.addObjectToCanvas = function (obj) {
                DEJS.debug("canvas add object: " + obj.type + ", " + obj.value);

                //this.design.objects[this.currentSide].push(obj);
                return this.curDesigner().addObjectToCanvas(obj);
            };

            CanvasManager.prototype.removeObject = function (obj) {
                return this.curDesigner().remove(obj);
            };

            CanvasManager.prototype.selected = function () {
                return this.curDesigner().selected();
            };

            /*printingArea(x1, y1, x2, y2, designer?: DEDesigner) {
            if (!designer) designer = this.designers[0];
            designer.printingArea(x1, y1, x2, y2);
            }
            
            printingAreaRect(x, y, width, height, designer?: DEDesigner): any {
            if (!designer) designer = this.designers[0];
            this.printingArea(x, y, x + width, y + height);
            return this;
            }*/
            CanvasManager.prototype.printingAreaVisible = function (val) {
                this.printAreaVisible = val;
                this.updateDesigners();
            };

            CanvasManager.prototype.setProduct = function (product, suppressUpdate, disableIdCheck, keepUnvariatedProduct) {
                if (typeof suppressUpdate === "undefined") { suppressUpdate = false; }
                if (typeof disableIdCheck === "undefined") { disableIdCheck = false; }
                if (typeof keepUnvariatedProduct === "undefined") { keepUnvariatedProduct = false; }
                if (!disableIdCheck && this.product && this.product.id == product.id)
                    return;
                DEJS.debug("canvas set product: " + product.id);
                if (!keepUnvariatedProduct)
                    this.unvariatedProduct = product;
                if (!suppressUpdate) {
                    this.product = product.getDumbCopy();
                    this.updateDesigners();
                }
                this.product = product;

                /*if (product.colors.length > 0)
                this.currentProductColor = product.colors[0].value;
                else
                this.currentProductColor = "";*/
                if (!suppressUpdate)
                    this.updateDesigners();
                /* if (!product || product.locations.length == 0) return;
                this.designer.setProductImage(product.locations[0].image);
                if (product.locations && product.locations[0] && product.locations[0].editableArea)
                this.printingAreaRect(product.locations[0].editableArea[0], product.locations[0].editableArea[1], product.locations[0].editableArea[2], product.locations[0].editableArea[3]);
                else
                this.designer.printingAreaVisible(false);*/
            };

            CanvasManager.prototype.setProductColor = function (color, suppressUpdate) {
                if (typeof suppressUpdate === "undefined") { suppressUpdate = false; }
                //if (!this.product) return;
                if (this.currentProductColor && this.currentProductColor.equal(color))
                    return;
                this.currentProductColor = color;
                if (!suppressUpdate)
                    this.updateDesigners();
            };

            CanvasManager.prototype.setProductSize = function (size, suppressUpdate) {
                if (typeof suppressUpdate === "undefined") { suppressUpdate = false; }
                if (!this.product)
                    return;

                if (this.currentProductSize == null)
                    this.currentProductSize = new DEJS.VO.ProductCanvasSizeVO({});

                //TODO: calculate dpu
                this.currentProductSize = size;

                //TODO: new dpu and scale. OR stop 5th set prod via prod manager
                if (!suppressUpdate)
                    this.updateDesigners();
            };

            CanvasManager.prototype.calculateEditableArea = function (location, index) {
                //var location: VO.ProductLocationVO = this.product.locations[i];
                var designer = this.designers[index];

                if (!designer)
                    return;

                if (!this.currentProductSize)
                    return;
                if (!this.product.resizable)
                    return;

                var skipScale = false;
                if (designer.printAreaUnits[0] == this.currentProductSize.width && designer.printAreaUnits[1] == this.currentProductSize.height) {
                    //same size.. but area may be wrong (loaded design)
                    skipScale = true;
                    //return;
                }

                //set editable area units
                location.editableAreaUnits = [this.currentProductSize.width, this.currentProductSize.height];

                //calculate editable area for designer
                var rat = this.currentProductSize.width / this.currentProductSize.height;
                var w = designer.width;
                var h = designer.width / rat;

                if (h > designer.height) {
                    var rs = designer.height / h;
                    w *= rs;
                    h *= rs;
                }

                var editableAreaX = (designer.width - w) / 2;
                var editableAreaY = (designer.height - h) / 2;

                //objects scale factor
                var prevDPU = designer.printAreaUnits[0] == 0 ? 1 : (Math.abs(designer.printAreaCoord[0] - designer.printAreaCoord[2]) / designer.printAreaUnits[0]);

                //set editable area
                location.editableArea = [editableAreaX, editableAreaY, editableAreaX + w, editableAreaY + h];
                location.editableAreaUnits = [this.currentProductSize.width, this.currentProductSize.height];

                //recalculate dpu
                location.extractDPU();

                //objects scale factor
                location.rescaleObject = location.rescaleObject * (skipScale ? 1 : location.dpu / prevDPU);
            };

            CanvasManager.prototype.setProductVariation = function (variation, suppressUpdate) {
                if (typeof suppressUpdate === "undefined") { suppressUpdate = false; }
                return;
                //VCGLL/
                /*if (!this.product || !this.unvariatedProduct) return;
                if (this.currentProductVariation == null && variation == null) return;
                if (this.currentProductVariation && variation != null && this.currentProductVariation.id == variation.id) return;
                this.currentProductVariation = variation;
                this.setProduct(this.unvariatedProduct.toVariatedProduct(this.currentProductVariation), true, true, true);
                this.checkDesignObjectsFitsVariation();
                if (!suppressUpdate) this.updateDesigners();*/
            };

            CanvasManager.prototype.setProductLocation = function (location, suppressUpdate) {
                if (typeof suppressUpdate === "undefined") { suppressUpdate = false; }
                if (!this.product)
                    return;
                this.productSideIndex = DEJS.Util.arrayIndexOf(null, this.product.locations, "name", location);
                if (this.productSideIndex == -1)
                    this.productSideIndex = 0;

                //this.setPseudoFocus(true);
                if (!suppressUpdate)
                    this.updateDesigners();
            };

            CanvasManager.prototype.addGraphics = function (graphics) {
                if (!graphics || !graphics.image || graphics.image.length == 0)
                    return;
                DEJS.debug("canvas add graphics: " + graphics.image);
                var obj = new DEJS.VO.Obj(ObjectType.Image, graphics.image);
                obj.setSourceId(graphics.id);
                obj.uploaded = graphics.uploaded;
                if (graphics.colorize && Model.configManager.config.colors.length > 0) {
                    obj.attr({ fill: Model.configManager.config.colors[0].value, colorize: true });
                }
                obj.multicolor = graphics.multicolor;
                if (obj.multicolor) {
                    obj.complexColor.colorizeList = Model.configManager.exportGraphicsColorizeList(graphics);
                }
                if (graphics.colorsNum > 0) {
                    obj.attr({ colorsNumber: graphics.colorsNum });
                }
                if (graphics.colorsNum === -1) {
                    obj.attr({ processColors: true });
                }
                this.checkObjPath(obj);
                this.addObjectToCanvas(obj);
            };

            CanvasManager.prototype.getQuote = function (useDPI) {
                if (typeof useDPI === "undefined") { useDPI = false; }
                DEJS.debug("canvas get quote");
                var quote = new DEJS.VO.QuoteVO();
                quote.product = this.product;
                if (this.product) {
                    if (this.product.multicolor) {
                        if (this.currentProductColor)
                            quote.productColors = this.currentProductColor.colorizeList;
                    } else {
                        if (this.currentProductColor)
                            quote.productColor = this.product.getColor(this.currentProductColor.value);
                    }
                    if (this.product.resizable) {
                        quote.productSize = this.currentProductSize;
                    }
                    for (var i = 0; i < this.product.locations.length; i++) {
                        var location = new DEJS.VO.QuoteLocationVO(this.product.locations[i]);
                        var objects = this.designers[i].getObjList();
                        var minX, maxX, minY, maxY;
                        for (var j = 0; j < objects.length; j++) {
                            var bbox = objects[j].getBBox();
                            if (j == 0) {
                                minX = Math.min(bbox.x, bbox.x2);
                                maxX = Math.max(bbox.x, bbox.x2);
                                ;
                                minY = Math.min(bbox.y, bbox.y2);
                                maxY = Math.max(bbox.y, bbox.y2);
                                ;
                            } else {
                                minX = Math.min(bbox.x, bbox.x2, minX);
                                maxX = Math.max(bbox.x, bbox.x2, maxX);
                                ;
                                minY = Math.min(bbox.y, bbox.y2, minY);
                                maxY = Math.max(bbox.y, bbox.y2, maxY);
                                ;
                            }
                            location.addObject(new DEJS.VO.QuoteObjectVO(objects[j]));
                        }
                        if (objects.length > 0) {
                            location.designedSize = new DEJS.VO.ProductCanvasSizeVO({ width: (maxX - minX) / this.designers[i].dpuX, height: (maxY - minY) / this.designers[i].dpuY });
                        }
                        quote.locations.push(location);
                        //quote.dpuExceeded = quote.dpuExceeded || location.dpuExceeded;//VCGLL
                    }
                }
                return quote;
            };

            CanvasManager.prototype.addText = function (text) {
                var t = new DEJS.VO.Obj(ObjectType.Text);
                t.attr(text);
                t.attr({ align: AlignSide.HCenter });
                return this.addObjectToCanvas(t);
            };

            CanvasManager.prototype.updateText = function (text) {
                if (this.curDesigner().selected() && this.curDesigner().selected().type === ObjectType.Text) {
                    var t = this.curDesigner().selected();
                    if (t.isNameNumber()) {
                        delete text.text;
                    }
                    ;

                    var hadTextFX = t.hasTextFX();
                    t.attr(text);
                    var dispatchHistory = hadTextFX == t.needTextFX(t.attr());
                    Model.controlsManager.setSelectedObj(t);
                    if (dispatchHistory)
                        this.onDesignerChanged();
                    return this.curDesigner().selected();
                }
                return null;
            };

            CanvasManager.prototype.align = function (side) {
                var obj = this.curDesigner().selected();
                if (!obj)
                    return;
                if (!obj.canMove())
                    return;
                this.curDesigner().align(side, obj);
            };

            CanvasManager.prototype.flip = function (kind) {
                var obj = this.curDesigner().selected();
                if (!obj)
                    return;
                if (obj.isFixed())
                    return;
                obj.flip(kind);
            };

            CanvasManager.prototype.arrange = function (side) {
                var obj = this.curDesigner().selected();
                if (!obj)
                    return;
                if (obj.attr()["fixed"])
                    return;
                switch (side) {
                    case "front":
                        obj.toFront();
                        break;
                    case "back":
                        obj.toBack();
                        break;
                }
            };

            CanvasManager.prototype.transform = function (transform) {
                var obj = this.curDesigner().selected();
                if (!obj)
                    return;
                if (obj.isFixed())
                    return;
                obj.transform(transform);
            };

            CanvasManager.prototype.updateGraphics = function (graphics) {
                var obj = this.curDesigner().selected();
                if (obj && obj.attr()["colorize"]) {
                    /*var attr:any = {};
                    if (graphics.fill) {
                    attr.fill = graphics.fillColor;
                    } else {
                    attr.fill = null;
                    }
                    if (graphics.stroke) {
                    attr.stroke = graph
                    ics.strokeColor;
                    } else {
                    attr.stroke = null;
                    }*/
                    obj.attr(graphics);
                    Model.controlsManager.setSelectedObj(obj);
                    this.onDesignerChanged();
                    return this.curDesigner().selected();
                }
                return null;
            };

            CanvasManager.prototype.updateObject = function (objParams) {
                var obj = this.curDesigner().selected();
                if (!obj)
                    return null;
                obj.attr(objParams);
                Model.controlsManager.setSelectedObj(obj);
                this.onDesignerChanged();
                return this.curDesigner().selected();
            };

            CanvasManager.prototype.getCurrentProductColor = function () {
                if (this.product) {
                    var productColor = this.product.getColor(this.currentProductColor ? this.currentProductColor.value : "");
                    if (productColor)
                        return productColor.value;
                }
                return "";
            };

            CanvasManager.prototype.getDesign = function () {
                DEJS.debug("canvas get design");
                var design = new DEJS.VO.DesignVO();
                if (this.product) {
                    design.product = this.product;
                    design.productColor = this.product.getColor(this.currentProductColor ? this.currentProductColor.value : "");
                    design.productSize = this.currentProductSize;
                    for (var i = 0; i < Math.min(this.product.locations.length, this.designers.length); i++) {
                        design.svgs.push(this.designers[i].getSVG(Model.configManager.config.options.includeProductInDesign, Model.configManager.config.options.includePrintingAreaInDesign, Model.configManager.config.options.includeMaskInDesign));
                        if (Model.configManager.config.options.includePrintingAreaInDesign && design.product.locations[i] && design.product.locations[i].editableArea) {
                            design.editableArea.push(design.product.locations[i].editableArea.join(" "));
                        }
                    }
                }
                return design;
            };

            CanvasManager.prototype.setDesign = function (design, isTemplate) {
                if (typeof isTemplate === "undefined") { isTemplate = false; }
                DEJS.debug("canvas set design");
                if (!isTemplate) {
                    //setting a dumb copy. The actual prodcut will be set later
                    this.setProduct(design.product.getDumbCopy(), false); //False to make sure all was cleaned
                    if (design.productColor)
                        this.setProductColor(design.productColor);
                    if (design.productSize) {
                        this.setProductSize(design.productSize);
                    }
                    /* Commented 'case now we have upated them on this.setProduct now. God bless this comment!
                    else
                    this.updateDesigners(); //'cause we haven't updated them on this.setProduct()
                    */
                }
                for (var i = 0; i < Math.min(design.svgs.length, this.designers.length); i++) {
                    this.designers[i].setSVG(design.svgs[i]);
                    var objList = this.designers[i].getObjList();
                    for (var j = 0; j < objList.length; j++) {
                        var obj = objList[j];
                        if (obj.type == ObjectType.SVG) {
                            var gVO = Model.configManager.getGraphicsById(obj.getSourceId());
                            if (gVO && gVO.multicolor) {
                                obj.multicolor = true;
                                obj.complexColor.colorizeList = Model.configManager.exportGraphicsColorizeList(gVO);
                                this.designers[i].extractLoadedGraphicsStyle(obj);
                            }
                        }
                    }
                }
                this.updateDesigners();
                //this.model.dispatchEvent(new Events.Event(DEEvents.DESIGN_READY_EVENT, this));
            };

            CanvasManager.prototype.clearDesign = function () {
                for (var i = 0; i < this.designers.length; i++) {
                    this.designers[i].clear();
                }
            };

            CanvasManager.prototype.onBackgroundColorizeParsed = function (event) {
                if (!this.product || !this.product.multicolor || !this.currentProductColor)
                    return;
                if (!this.currentProductColor.colorizeInited) {
                    for (var i = 0; i < event.colorizeArray.length; i++) {
                        var colorEl = event.colorizeArray[i];
                        var productColorEl = DEJS.Util.arrayFind(this.currentProductColor.colorizeList, "id", colorEl.id);
                        if (productColorEl)
                            productColorEl.value = colorEl.value;

                        for (var j = 0; j < this.currentProductColor.colorizeGroupList.length; j++) {
                            var colorG = this.currentProductColor.colorizeGroupList[j];
                            var productColorEl2 = DEJS.Util.arrayFind(colorG.classes, "id", colorEl.id);
                            if (productColorEl2)
                                productColorEl2.value = colorEl.value;
                        }
                    }
                }
                this.currentProductColor.colorizeInited = true;
                Model.productManager.setProductColorVO(this.currentProductColor);
            };

            CanvasManager.prototype.updateBackgroundColorize = function () {
                for (var i = 0; i < this.designers.length; i++) {
                    this.designers[i].colorizeBackground(this.currentProductColor.colorizeList);
                }
            };

            CanvasManager.prototype.setProductColorizeList = function (colArray) {
                if (!this.product || !this.product.multicolor || !this.currentProductColor || !this.currentProductColor.colorizeInited)
                    return;
                this.currentProductColor.colorizeByArray(colArray);
                this.updateBackgroundColorize();
            };

            CanvasManager.prototype.updateGraphicsColorizeList = function (colArray) {
                var obj = this.selected();
                if (!obj || !obj.multicolor || !obj.complexColor || !obj.complexColor.colorizeInited)
                    return;
                if (obj.complexColor.colorizeByArray(colArray)) {
                    obj.updateColorize();
                    this.onDesignerChanged();
                }
            };

            CanvasManager.prototype.checkObjectDPU = function () {
                //VCGLL
                /*if (!this.selectedObj || this.selectedObj.maxScale <= 0 || !this.selectedObj.elementLink) return;
                var scale: number = this.selectedObj.elementLink.matrix.split().scalex;
                var exceeded: boolean = scale > this.selectedObj.maxScale;
                if (exceeded != this.selectedObj.dpuExceeded) {
                this.selectedObj.dpuExceeded = exceeded;
                this.model.controlsManager.setSelectedObj(this.selectedObj);
                }*/
            };

            CanvasManager.prototype.checkDesignObjectsFitsVariation = function () {
                if (!this.currentProductVariation)
                    return;
                if (!this.product)
                    return;
                var variation = this.currentProductVariation;
                for (var i = 0; i < this.designers.length; i++) {
                    var objList = this.designers[i].getObjList();
                    for (var j = 0; j < objList.length; j++) {
                        var obj = objList[j];
                        if (!variation.addObject && !obj.loadedFromDesign) {
                            obj.remove();
                        } else {
                            if (obj.type == ObjectType.Image || obj.type == ObjectType.SVG) {
                                if (variation.colorsIds) {
                                    var graphicsVO = Model.configManager.getGraphicsById(obj.getSourceId());
                                    if (graphicsVO && graphicsVO.colorize) {
                                        this.adjustObjColor(obj, "fill");
                                        this.adjustObjColor(obj, "stroke");
                                    }
                                }
                                if (!variation.imageUpload) {
                                    if (!variation.imageGallery) {
                                        obj.remove();
                                    } else if (variation.graphicsIds) {
                                        if (DEJS.Util.arrayIndexOf(obj.getSourceId(), variation.graphicsIds) < 0) {
                                            obj.remove();
                                        }
                                    }
                                }
                            } else {
                                if (variation.colorsIds) {
                                    this.adjustObjColor(obj, "fill");
                                    this.adjustObjColor(obj, "stroke");
                                }
                                if (variation.fontsIds) {
                                    var objAttrs = obj.attr();
                                    var font = Model.configManager.variatedConfig.getFont(objAttrs["font-family"]);
                                    if (!font && Model.configManager.variatedConfig.fonts.length > 0) {
                                        obj.attr({ "font-family": Model.configManager.variatedConfig.fonts[0].fontFamily });
                                    }
                                }
                            }
                        }
                    }
                }
            };

            CanvasManager.prototype.adjustObjColor = function (obj, attr) {
                var objAttrs = obj.attr();
                if (objAttrs[attr] && objAttrs[attr] != "" && objAttrs[attr] != "none") {
                    var color = Model.configManager.variatedConfig.getColor(objAttrs[attr]);
                    if (!color) {
                        color = Model.configManager.variatedConfig.getNearestColor(objAttrs[attr]);
                        if (color) {
                            var newAttr = {};
                            newAttr[attr] = color.value;
                            obj.attr(newAttr);
                        } else {
                            var newAttr = {};
                            newAttr[attr] = "none";
                            obj.attr(newAttr);
                        }
                    }
                }
            };

            CanvasManager.prototype.checkObjPath = function (obj) {
                if (Model.configManager.config.galleryBaseUrl == "")
                    return;
                if (obj.value.substr(0, 7) == "http://")
                    return;
                if (obj.value.substr(0, 8) == "https://")
                    return;
                if (obj.value.substr(0, 6) == "ftp://")
                    return;
                obj.value = Model.configManager.config.galleryBaseUrl + obj.value;
            };

            CanvasManager.prototype.addNamesObj = function (text) {
                var y = (this.curDesigner().printAreaCoord[1] + this.curDesigner().printAreaCoord[3]) * 2 / 7;
                var x = (this.curDesigner().printAreaCoord[0] + this.curDesigner().printAreaCoord[2]) / 2;
                var t = new DEJS.VO.Obj(ObjectType.Text);
                t.attr(text);
                t.attr({ nameObj: true, text: Model.configManager.config.defaultNameObjectText, align: AlignSide.HCenter });
                t.defaultTransform = "t" + x + "," + y;
                t = this.curDesigner().addObjectToCanvas(t);
            };

            CanvasManager.prototype.addNumbersObj = function (text) {
                var y = (this.curDesigner().printAreaCoord[1] + this.curDesigner().printAreaCoord[3]) * 4 / 7;
                var x = (this.curDesigner().printAreaCoord[0] + this.curDesigner().printAreaCoord[2]) / 2;
                var t = new DEJS.VO.Obj(ObjectType.Text);
                t.attr(text);
                t.attr({ numberObj: true, text: Model.configManager.config.defaultNumberObjectText, "font-size": 64, align: AlignSide.HCenter });
                t.defaultTransform = "t" + x + "," + y;
                t = this.curDesigner().addObjectToCanvas(t);
            };

            CanvasManager.prototype.setLockProportions = function (lockProportions) {
                this.lockProportions = lockProportions;
                for (var i = 0; i < this.designers.length; i++) {
                    this.designers[i].setLockProportions(lockProportions);
                }
            };

            CanvasManager.prototype.magic = function (arg) {
            };

            CanvasManager.prototype.print = function () {
                jQuery(jQuery('<div></div>').append(this.curDesigner().getSVG(true, true, true))).printArea();
            };

            CanvasManager.prototype.copy = function () {
                DEJS.debug('CanvasManager :: copy');

                if (this.selected() == null)
                    return;

                this.buffer = this.selected().clone();
            };

            CanvasManager.prototype.paste = function () {
                DEJS.debug('CanvasManager :: paste');

                if (this.buffer == null)
                    return;

                this.addObjectToCanvas(this.buffer);
            };

            CanvasManager.prototype.removeSelected = function () {
                DEJS.debug('CanvasManager :: copy');

                if (this.selected() == null)
                    return;

                this.removeObject(this.selected());
            };

            CanvasManager.prototype.cut = function () {
                DEJS.debug('CanvasManager :: cut');

                this.copy();
                this.removeSelected();
            };

            CanvasManager.prototype.move = function (keyCode, acceleration) {
                DEJS.debug('CanvasManager :: down');

                if (this.selected() == null || !this.selected().canMove())
                    return;

                var dx = 0;
                var dy = 0;

                switch (keyCode) {
                    case 37:
                        dx = -1 * CanvasManager.ARROWS_SHIFT;
                        dy = 0;
                        break;

                    case 38:
                        dx = 0;
                        dy = -1 * CanvasManager.ARROWS_SHIFT;
                        break;

                    case 39:
                        dx = CanvasManager.ARROWS_SHIFT;
                        dy = 0;
                        break;

                    case 40:
                        dx = 0;
                        dy = CanvasManager.ARROWS_SHIFT;
                        break;
                }

                this.selected().move(dx * (acceleration ? CanvasManager.ACCELERATION_MULTIPLIER : 1), dy * (acceleration ? CanvasManager.ACCELERATION_MULTIPLIER : 1));
            };

            CanvasManager.prototype.onKeyDown = function (e) {
                if (!this.hasPseudoFocus)
                    return;

                if (e.ctrlKey || e.metaKey) {
                    switch (e.keyCode) {
                        case 67:
                            e.preventDefault();
                            this.copy();
                            break;

                        case 86:
                            e.preventDefault();
                            this.paste();
                            break;

                        case 88:
                            e.preventDefault();
                            this.cut();
                            break;
                    }
                } else {
                    switch (e.keyCode) {
                        case 46:
                            e.preventDefault();
                            this.removeSelected();
                            break;

                        case 37:
                        case 38:
                        case 39:
                        case 40:
                            e.preventDefault();
                            this.move(e.keyCode, e.shiftKey);
                            break;
                    }
                }
            };

            CanvasManager.prototype.onClick = function (e) {
                var eTarget = e.target;
                var holderIsClicked = this.model && (this.model.holder.is(e.target) || this.model.holder.find(eTarget).length > 0);
                var notInput = !jQuery(e.target).is(':input') || jQuery(e.target).is(':button');

                this.setPseudoFocus(holderIsClicked || notInput);
            };

            CanvasManager.prototype.setPseudoFocus = function (value) {
                DEJS.debug('CanvasManager :: setPseudoFocus', value);

                this.hasPseudoFocus = value;
                if (value) {
                    var focusedElem = jQuery(':focus');
                    if (focusedElem.length > 0 && !focusedElem.is(document.body))
                        focusedElem.blur();
                }
            };

            CanvasManager.prototype.changeZoom = function (zoom) {
                if (!Model.configManager.config.options.zoomEnabled)
                    return;
                var newZoom = this.zoom;

                if (typeof zoom == "boolean") {
                    if (zoom) {
                        newZoom += Model.configManager.config.options.zoomStep;
                    } else {
                        newZoom -= Model.configManager.config.options.zoomStep;
                    }
                }
                if (typeof zoom == "number") {
                    newZoom = zoom;
                }

                if (newZoom < Model.configManager.config.options.minZoom || newZoom > Model.configManager.config.options.maxZoom)
                    return;
                this.zoom = newZoom;
                Model.controlsManager.setZoom(newZoom);
                for (var i = 0; i < this.designers.length; i++) {
                    this.designers[i].setZoom(this.zoom);
                }
            };

            CanvasManager.prototype.setDrag = function (drag) {
                if (!Model.configManager.config.options.zoomEnabled)
                    return;
                this.drag = drag;
                for (var i = 0; i < this.designers.length; i++) {
                    this.designers[i].setDrag(this.drag);
                }
            };

            CanvasManager.prototype.onViewPortChanged = function (event) {
                if (typeof event === "undefined") { event = null; }
                if (!event)
                    return;
                this.viewPort = event.viewPort;
                Model.controlsManager.setZoom(this.viewPort.zoom);
                for (var i = 0; i < this.designers.length; i++) {
                    this.designers[i].setViewPort(this.viewPort);
                }
            };

            CanvasManager.prototype.getCurrentDesignStatus = function () {
                var svgs = [];

                for (var i = 0; i < this.designers.length; i++) {
                    svgs.push(this.designers[i].getSVGState());
                }
                var status = new Model.DesignStatus(svgs, this.selected());
                if (this.product && this.product.resizable && this.currentProductSize) {
                    status.productSize = this.currentProductSize.toObject();
                }
                return status;
            };

            CanvasManager.prototype.setDesignStatus = function (status) {
                var svgs = status.svgs;
                for (var i = 0; i < Math.min(this.designers.length, svgs.length); i++) {
                    this.designers[i].setSVGState(svgs[i]);
                }
                if (status.productSize) {
                    this.setProductSize(new DEJS.VO.ProductCanvasSizeVO(status.productSize));
                    Model.controlsManager.setSelectedProductSize(new DEJS.VO.ProductCanvasSizeVO(status.productSize));
                }
                if (status.selectedObject) {
                    this.suppressUpdate = true; //A little hacky
                    for (var i = 0; i < this.designers.length; i++) {
                        var objects = this.designers[i].getObjList();
                        var j = 0;
                        var found = false;
                        while (!found && j < objects.length) {
                            if (status.selectedObject.elementId == objects[j].elementId) {
                                found = true;
                                this.designers[i].select(objects[j].elementLink);
                            }
                            j++;
                        }
                    }
                    this.suppressUpdate = false;
                }
            };
            CanvasManager.ARROWS_SHIFT = 5;
            CanvasManager.ACCELERATION_MULTIPLIER = 4;
            return CanvasManager;
        })();
        Model.CanvasManager = CanvasManager;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="ConfigVO.ts"/>
    (function (VO) {
        var ControlsModelVO = (function () {
            function ControlsModelVO() {
                this.obj = {};
                this.productCategories = [];
                //products: ProductVO[] = [];
                //setProducts(value: VO.ProductVO[]) { this.products = value; this.obj["products"] = Util.arrayToObjArray(value); this.invalidate("products"); }
                this.selectedProduct = null;
                this.selectedProductCategory = null;
                this.selectedProductColor = null;
                this.colors = [];
                /*selectedProductVariation: ProductVariationVO = null;  //VCGLL
                setSelectedProductVariation(value: VO.ProductVariationVO) {
                this.selectedProductVariation = value;
                this.obj["selectedProductVariation"] = value ? this.selectedProductVariation.toObject() : null;
                this.invalidate("selectedProductVariation");
                }*/
                this.fonts = [];
                this.graphicsCategories = [];
                //graphics: GraphicsVO[] = [];
                //setGraphics(value: VO.GraphicsVO[]) { this.graphics = value; this.obj["graphics"] = value; this.invalidate("graphics"); }
                this.textEffects = [];
                this.selectedObj = null;
                //productLocations: string[] = [];
                //setProductLocations(value: string[]) { this.productLocations = value; this.obj["productLocations"] = value; this.invalidate("productLocations"); }
                this.selectedProductLocation = "";
                this.quantities = [];
                this.namesNumbers = [];
                this.selectedProductSize = null;
                this.designs = [];
                this.status = new StatusVO();
                this.designInfo = new VO.DesignInfoVO();
                this.designNotes = '';
                this.showAuthDialog = false;
                this.showAuthAndSaveDialog = false;
                this.showSaveDesignDialog = false;
                this.showLoadDesignDialog = false;
                this.showDPUExceededDialog = false;
                this.showColorCountDialog = false;
                this.shareLink = "";
                this.showShareLink = false;
                this.zoom = 100;
                this.minZoom = 100;
                this.maxZoom = 100;
                this.zoomEnabled = false;
                this.objDClicked = null;
                this.uploadFileAvailable = false;
                //VCGLL
                /*restrictions: VO.RestrictionsVO = new RestrictionsVO();
                setRestrictions(value: VO.RestrictionsVO) { this.restrictions = value; this.obj["restrictions"] = value; this.invalidate("restrictions"); }*/
                this.strictTemplate = false;
                this.showProductSelector = false;
                this.isUndoActive = false;
                this.isRedoActive = false;
                //This is the list of changed objects
                this.invalidateList = [];
                this.obj["productCategories"] = [];

                //this.obj["products"] = [];
                this.obj["selectedProduct"] = null;
                this.obj["selectedProductCategory"] = null;
                this.obj["selectedProductColor"] = null;
                this.obj["colors"] = [];

                //this.obj["selectedProductVariation"] = null;  //VCGLL
                this.obj["fonts"] = [];
                this.obj["graphicsCategories"] = [];

                //this.obj["graphics"] = [];
                this.obj["textEffects"] = [];
                this.obj["selectedObj"] = null;
                this.obj["selectedProductLocation"] = "";
                this.obj["quantities"] = [];
                this.obj["namesNumbers"] = [];
                this.obj["selectedProductSize"] = [];
                this.obj["designs"] = [];
                this.obj["status"] = this.status;
                this.obj["designInfo"] = this.designInfo;
                this.obj["showAuthDialog"] = false;
                this.obj["showAuthAndSaveDialog"] = false;
                this.obj["showSaveDesignDialog"] = false;
                this.obj["showLoadDesignDialog"] = false;

                //this.obj["showDPUExceededDialog"] = false;
                this.obj["showColorCountDialog"] = false;
                this.obj["shareLink"] = "";
                this.obj["showShareLink"] = false;
                this.obj["zoom"] = 100;
                this.obj["zoomEnabled"] = false;
                this.obj["minZoom"] = 50;
                this.obj["maxZoom"] = 150;
                this.obj["objDClicked"] = null;

                //this.obj["restrictions"] = this.restrictions;
                this.obj["designNotes"] = "";
                this.obj["uploadFileAvailable"] = false;
                this.obj["strictTemplate"] = false;
                this.obj["showProductSelector"] = true;
                this.obj["isUndoActive"] = false;
                this.obj["isRedoActive"] = false;
                this.obj["invalidateList"] = this.invalidateList;
            }
            ControlsModelVO.prototype.setProductCategories = function (value) {
                this.productCategories = value;
                this.obj["productCategories"] = DEJS.Util.arrayToObjArray(value);
                this.invalidate("productCategories");
            };

            ControlsModelVO.prototype.setSelectedProduct = function (value) {
                this.selectedProduct = value;
                this.obj["selectedProduct"] = value ? this.selectedProduct.toObject() : null;
                this.invalidate("selectedProduct");
            };

            ControlsModelVO.prototype.setSelectedProductCategory = function (value) {
                this.selectedProductCategory = value;
                this.obj["selectedProductCategory"] = this.selectedProductCategory.toObject();
                this.invalidate("selectedProductCategory");
            };

            ControlsModelVO.prototype.setSelectedProductColor = function (value) {
                this.selectedProductColor = value;
                this.obj["selectedProductColor"] = value ? this.selectedProductColor.toObject() : null;
                this.invalidate("selectedProductColor");
            };

            ControlsModelVO.prototype.setColors = function (value) {
                this.colors = value;
                this.obj["colors"] = DEJS.Util.arrayToObjArray(value);
                this.invalidate("colors");
            };

            ControlsModelVO.prototype.setFonts = function (value) {
                this.fonts = value;
                this.obj["fonts"] = value;
                this.invalidate("fonts");
            };

            ControlsModelVO.prototype.setGraphicsCategories = function (value) {
                this.graphicsCategories = value;
                this.obj["graphicsCategories"] = DEJS.Util.arrayToObjArray(value);
                this.invalidate("graphicsCategories");
            };

            ControlsModelVO.prototype.setTextEffects = function (value) {
                this.textEffects = value;
                this.obj["textEffects"] = DEJS.Util.arrayToObjArray(value);
                this.invalidate("textEffects");
            };

            ControlsModelVO.prototype.setSelectedObj = function (value) {
                this.selectedObj = value;
                this.obj["selectedObj"] = value;
                this.invalidate("selectedObj");
            };

            ControlsModelVO.prototype.setSelectedProductLocation = function (value) {
                this.selectedProductLocation = value;
                this.obj["selectedProductLocation"] = value;
                this.invalidate("selectedProductLocation");
            };

            ControlsModelVO.prototype.setQuantities = function (value) {
                this.quantities = value;
                this.obj["quantities"] = value;
                this.invalidate("quantities");
            };

            ControlsModelVO.prototype.setNamesNumbers = function (value) {
                this.namesNumbers = value;
                this.obj["namesNumbers"] = value;
                this.invalidate("namesNumbers");
            };

            ControlsModelVO.prototype.setSelectedProductSize = function (value) {
                this.selectedProductSize = value;
                this.obj["selectedProductSize"] = this.selectedProductSize;
                this.invalidate("selectedProductSize");
            };

            ControlsModelVO.prototype.setDesigns = function (value) {
                this.designs = value;
                this.obj["designs"] = value;
                this.invalidate("designs");
            };

            ControlsModelVO.prototype.setStatus = function (value) {
                this.status = value;
                this.obj["status"] = value;
                this.invalidate("status");
            };

            ControlsModelVO.prototype.setDesignInfo = function (value) {
                this.designInfo = value;
                this.obj["designInfo"] = value;
                this.invalidate("designInfo");
            };

            ControlsModelVO.prototype.setDesignNotes = function (notes) {
                this.designNotes = notes;
                this.obj["designNotes"] = notes;
                this.invalidate("designNotes");
            };

            ControlsModelVO.prototype.setShowAuthDialog = function (value) {
                this.showAuthDialog = value;
                this.obj["showAuthDialog"] = value;
                this.invalidate("showAuthDialog");
            };

            ControlsModelVO.prototype.setShowAuthAndSaveDialog = function (value) {
                this.showAuthAndSaveDialog = value;
                this.obj["showAuthAndSaveDialog"] = value;
                this.invalidate("showAuthAndSaveDialog");
            };

            ControlsModelVO.prototype.setShowSaveDesignDialog = function (value) {
                this.showSaveDesignDialog = value;
                this.obj["showSaveDesignDialog"] = value;
                this.invalidate("showSaveDesignDialog");
            };

            ControlsModelVO.prototype.setShowLoadDesignDialog = function (value) {
                this.showLoadDesignDialog = value;
                this.obj["showLoadDesignDialog"] = value;
                this.invalidate("showLoadDesignDialog");
            };

            ControlsModelVO.prototype.setShowDPUExceededDialog = function (value) {
                this.showDPUExceededDialog = value;
                this.obj["showDPUExceededDialog"] = value;
                this.invalidate("showDPUExceededDialog");
            };

            ControlsModelVO.prototype.setShowColorCountDialog = function (value) {
                this.showColorCountDialog = value;
                this.obj["showColorCountDialog"] = value;
                this.invalidate("showColorCountDialog");
            };

            ControlsModelVO.prototype.setShareLink = function (value) {
                this.shareLink = value;
                this.obj["shareLink"] = value;
                this.invalidate("shareLink");
            };

            ControlsModelVO.prototype.setShowShareLink = function (value) {
                this.showShareLink = value;
                this.obj["showShareLink"] = value;
                this.invalidate("showShareLink");
            };

            ControlsModelVO.prototype.setZoom = function (value) {
                this.zoom = value;
                this.obj["zoom"] = value;
                this.invalidate("zoom");
            };

            ControlsModelVO.prototype.setMinZoom = function (value) {
                this.minZoom = value;
                this.obj["minZoom"] = value;
                this.invalidate("minZoom");
            };

            ControlsModelVO.prototype.setMaxZoom = function (value) {
                this.maxZoom = value;
                this.obj["maxZoom"] = value;
                this.invalidate("maxZoom");
            };

            ControlsModelVO.prototype.setZoomEnabled = function (value) {
                this.zoomEnabled = value;
                this.obj["zoomEnabled"] = value;
                this.invalidate("zoomEnabled");
            };

            ControlsModelVO.prototype.setObjDClicked = function (value) {
                this.objDClicked = this.obj["objDClicked"] = value;
                this.invalidate("objDClicked");
            };

            ControlsModelVO.prototype.setUploadFileAvailable = function (value) {
                this.uploadFileAvailable = value;
                this.obj["uploadFileAvailable"] = value;
                this.invalidate("uploadFileAvailable");
            };

            ControlsModelVO.prototype.setStrictTemplate = function (value) {
                this.strictTemplate = value;
                this.obj["strictTemplate"] = value;
                this.invalidate("strictTemplate");
            };

            ControlsModelVO.prototype.setShowProductSelector = function (value) {
                this.showProductSelector = value;
                this.obj["showProductSelector"] = value;
                this.invalidate("showProductSelector");
            };

            ControlsModelVO.prototype.setIsUndoActive = function (value) {
                this.isUndoActive = value;
                this.obj["isUndoActive"] = value;
                this.invalidate("isUndoActive");
            };

            ControlsModelVO.prototype.setIsRedoActive = function (value) {
                this.isRedoActive = value;
                this.obj["isRedoActive"] = value;
                this.invalidate("isRedoActive");
            };

            ControlsModelVO.prototype.invalidate = function (item) {
                if (DEJS.Util.arrayIndexOf(item, this.invalidateList) == -1)
                    this.invalidateList.push(item);
            };

            ControlsModelVO.prototype.toObject = function () {
                return this.obj;
            };

            ControlsModelVO.prototype.cloneObj = function () {
                DEJS.Util.copyObject(this.obj);
            };
            return ControlsModelVO;
        })();
        VO.ControlsModelVO = ControlsModelVO;

        var StatusVO = (function () {
            function StatusVO(message, showProgress, completed, percentCompleted) {
                if (typeof message === "undefined") { message = ""; }
                if (typeof showProgress === "undefined") { showProgress = false; }
                if (typeof completed === "undefined") { completed = false; }
                if (typeof percentCompleted === "undefined") { percentCompleted = 0; }
                this.message = message;
                this.showProgress = showProgress;
                this.completed = completed;
                this.percentCompleted = 0;
                this.designSaved = true;
                this.imageUploading = false;
                this.percentCompleted = Math.floor(percentCompleted);
            }
            return StatusVO;
        })();
        VO.StatusVO = StatusVO;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="DEModel.ts"/>
    ///<reference path="../VO/ControlsModelVO.ts"/>
    (function (Model) {
        var ConfigManager = (function () {
            function ConfigManager(model) {
                this.config = new DEJS.VO.ConfigVO();
                this.variatedConfig = new DEJS.VO.ConfigVO();
                this.configPath = "";
                this.totalConfigSteps = 1;
                this.loadedConfigSteps = 0;
                this.currentProductVariation = null;
                this.model = model;
            }
            ConfigManager.imagePreloaderPath = function () {
                return this.assetsUrl + "img/tracker/image_preloader.svg";
            };

            ConfigManager.prototype.loadConfig = function (configPath) {
                var _this = this;
                DEJS.debug("loading config: " + configPath);
                this.model.dispatchEvent(new DEJS.Events.LoadStatusEvent("Loading configuration...", false, 0));
                this.configPath = configPath;
                jQuery.getJSON(DEJS.Util.addTimeStamp(configPath), null, function (data, status, jqXHR) {
                    return _this.onConfigLoaded(data, status, jqXHR);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    return _this.onConfigFail(jqXHR, textStatus, errorThrown);
                });
            };

            ConfigManager.prototype.onConfigLoaded = function (data, status, jqXHR) {
                DEJS.debug("config loaded");
                if (data)
                    this.config = new DEJS.VO.ConfigVO(data);
                ConfigManager.assetsUrl = this.config.assetsUrl;
                this.loadedConfigSteps++;
                this.totalConfigSteps += this.config.urls.length;
                DEJS.debug("config parts to load: " + this.config.urls.length);
                this.loadConfigParts();
            };

            ConfigManager.prototype.onConfigFail = function (jqXHR, textStatus, errorThrown) {
                alert("Failed to load config: \n" + textStatus); //TODO: add normal error handling.
            };

            ConfigManager.prototype.setOptions = function (options) {
                this.config.options = new DEJS.VO.DEOptions(options);
                return this.config.options;
            };

            ConfigManager.prototype.loadConfigParts = function () {
                if (this.config.urls.length > 0) {
                    var loadInfo = this.config.urls.shift();
                    this.loadConfigPart(loadInfo.key, loadInfo.url);
                } else {
                    this.configLoaded();
                }
            };

            ConfigManager.prototype.loadConfigPart = function (key, configPath) {
                var _this = this;
                DEJS.debug("loading config part '" + key + "':" + configPath);
                this.model.dispatchEvent(new DEJS.Events.LoadStatusEvent(this.getLoadMessage(key), false, this.loadedConfigSteps / this.totalConfigSteps * 100));
                this.configPath = configPath;
                jQuery.getJSON(DEJS.Util.addTimeStamp(configPath), null, function (data, status, jqXHR) {
                    return _this.onConfigPartLoaded(key, data, status, jqXHR);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    return _this.onConfigPartFail(jqXHR, textStatus, errorThrown);
                });
            };

            ConfigManager.prototype.onConfigPartLoaded = function (key, data, status, jqXHR) {
                DEJS.debug("config part '" + key + "' loaded");
                this.loadedConfigSteps++;
                if (data) {
                    switch (key) {
                        case "productsList":
                            if (data.productCategoriesList) {
                                this.config.productCategories = DEJS.Util.parseArray(data.productCategoriesList, DEJS.VO.ProductCategoryVO);
                                this.config.processProductCategories();
                            }
                            if (data.productsList)
                                this.config.productsList = DEJS.Util.parseArray(data.productsList, DEJS.VO.ProductVO);
                            break;
                        case "productCategoriesList":
                            this.config.productCategories = DEJS.Util.parseArray(data.productCategoriesList, DEJS.VO.ProductCategoryVO);
                            this.config.processProductCategories();
                            break;
                        case "fonts":
                            this.config.fonts = DEJS.Util.parseArray(data.fonts, DEJS.VO.FontVO);
                            break;
                        case "colors":
                            this.config.colors = DEJS.Util.parseArray(data.colors, DEJS.VO.ColorVO);
                            break;
                        case "graphicsList":
                            if (data.graphicsCategoriesList) {
                                this.config.graphicsCategories = DEJS.Util.parseArray(data.graphicsCategoriesList, DEJS.VO.GraphicsCategoryVO);
                                this.config.processGraphicCategories();
                            }
                            if (data.graphicsList)
                                this.config.graphicsList = DEJS.Util.parseArray(data.graphicsList, DEJS.VO.GraphicsVO);
                            break;
                        case "graphicsCategoriesList":
                            this.config.graphicsCategories = DEJS.Util.parseArray(data.graphicsCategoriesList, DEJS.VO.GraphicsCategoryVO);
                            break;
                        case "textEffects":
                            this.config.textEffects = DEJS.Util.parseArray(data.textEffects, DEJS.VO.TextEffectVO);
                            break;
                    }
                }
                this.model.dispatchEvent(new DEJS.Events.LoadStatusEvent(this.getLoadMessage(key), false, this.loadedConfigSteps / this.totalConfigSteps * 100));
                this.loadConfigParts();
            };

            ConfigManager.prototype.onConfigPartFail = function (jqXHR, textStatus, errorThrown) {
                alert("Failed to load config part: \n" + textStatus); //TODO: add normal error handling.
                this.loadedConfigSteps++;
                this.loadConfigParts();
            };

            ConfigManager.prototype.configLoaded = function () {
                this.variatedConfig = this.config.toVariatedConfig(null);
                Model.deDesigner.canvasManager.init();

                //if (this.config.defaultProductId != "") deDesigner.canvasManager.setProduct(this.getProductById(this.config.defaultProductId));
                this.model.dispatchEvent(new DEJS.Events.LoadStatusEvent("Loaded", true, 100));
                this.updateControls();
                this.model.inited = true;
                this.model.dispatchEvent(new DEJS.Events.ConfigLoadedEvent(this.config.options));
                DEJS.VO.Obj.checkTextFXThrottle = this.config.options.checkTextFXThrottle;

                //read default design
                var defaultDesignId = "";
                if (this.model.defaultDesignId != "" && this.model.defaultDesignId != "null") {
                    defaultDesignId = this.model.defaultDesignId;
                } else if (this.config.defaultDesignId != "") {
                    defaultDesignId = this.config.defaultDesignId;
                }

                //read default product
                var defaultProductId = "";
                if (this.model.defaultProductId != "") {
                    defaultProductId = this.model.defaultProductId;
                } else if (this.config.defaultProductId != "") {
                    defaultProductId = this.config.defaultProductId;
                }

                //read default graphic
                var defaultGraphicId = "";
                if (this.model.defaultGraphicId != "") {
                    defaultGraphicId = this.model.defaultGraphicId;
                }

                //set defaults: design or product and/or graphic
                if (defaultDesignId.length > 0) {
                    Model.saveLoadManager.loadDesign(defaultDesignId, true);
                } else {
                    if (defaultProductId.length > 0) {
                        var defaultProduct = this.getProductById(defaultProductId);
                        Model.controlsManager.setSelectedProductCategory(this.getProductCategoryById(defaultProduct.categoryId));
                        Model.productManager.setProduct(defaultProductId, true);

                        //default product size
                        if (defaultProduct && defaultProduct.resizable && this.config.defaultProductId && this.config.defaultProductSize.length >= 2) {
                            Model.controlsManager.setSelectedProductSize(new DEJS.VO.ProductCanvasSizeVO({ width: this.config.defaultProductSize[0], height: this.config.defaultProductSize[1] }));
                            Model.productManager.setProductSize(new DEJS.VO.ProductCanvasSizeVO({ width: this.config.defaultProductSize[0], height: this.config.defaultProductSize[1] }));
                        }
                    }

                    if (defaultGraphicId.length > 0) {
                        var graphics = this.getGraphicsById(defaultGraphicId);
                        if (graphics)
                            Model.canvasManager.addGraphics(graphics);
                    }
                }

                Model.saveLoadManager.checkUploadFileAvailable();

                /*if (this.currentProductVariation) {
                var tempVariation = this.currentProductVariation;
                this.currentProductVariation = null;
                this.setProductVariation(tempVariation);     //For default product variation. Shouldn't it be rewritten better?
                }*/
                Model.historyManager.saveStatus();
            };

            ConfigManager.prototype.getProductById = function (id) {
                var res;
                var index = DEJS.Util.arrayIndexOf(null, this.config.productsList, "id", id);
                if (index >= 0) {
                    res = this.config.productsList[index];
                }
                if (!res)
                    res = new DEJS.VO.ProductVO();
                return res;
            };

            ConfigManager.prototype.getProductCategoryById = function (id) {
                var res = null;
                res = this.getProductSubCategoryById(id, this.config.productCategories);
                if (!res)
                    res = new DEJS.VO.ProductCategoryVO({});
                return res;
            };

            ConfigManager.prototype.getProductSubCategoryById = function (id, categories) {
                var res = null;
                var index = DEJS.Util.arrayIndexOf(null, categories, "id", id);
                if (index >= 0) {
                    res = categories[index];
                }
                var i = 0;
                while (res == null && i < categories.length) {
                    var category = categories[i];
                    res = this.getProductSubCategoryById(id, category.categories);
                    i++;
                }
                return res;
            };

            ConfigManager.prototype.getGraphicsById = function (id) {
                var res;
                var index = DEJS.Util.arrayIndexOf(null, this.config.graphicsList, "id", id);
                if (index >= 0) {
                    res = this.config.graphicsList[index];
                }

                //if (!res) res = new VO.GraphicsVO();
                return res;
            };

            ConfigManager.prototype.exportGraphicsColorizeList = function (gVO) {
                var res = [];
                for (var i = 0; i < gVO.colorizableElements.length; i++) {
                    var colEl = new DEJS.VO.ColorizableElementVO(gVO.colorizableElements[i]);
                    if (colEl.colors.length == 0) {
                        colEl.colors = DEJS.Util.parseArray(this.config.colors, DEJS.VO.ColorVO);
                    }
                    res.push(colEl);
                }
                return res;
            };

            ConfigManager.prototype.updateControls = function () {
                Model.controlsManager.setFonts(this.config.fonts);
                Model.controlsManager.setColors(this.config.colors);
                Model.controlsManager.setProducts(this.config.productCategories);
                Model.controlsManager.setGraphics(this.config.graphicsCategories);
                Model.controlsManager.setZoomEnabled(this.config.options.zoomEnabled);
                Model.controlsManager.setMinZoom(this.config.options.minZoom);
                Model.controlsManager.setMaxZoom(this.config.options.maxZoom);
                Model.controlsManager.setTextEffects(this.config.textEffects);
                Model.controlsManager.setShowProductSelector(this.config.options.showProductSelector);
            };

            ConfigManager.prototype.getLoadMessage = function (key) {
                switch (key) {
                    case "colors":
                        return "Loading colors...";
                        break;
                    case "fonts":
                        return "Loading fonts...";
                        break;
                    case "productsList":
                    case "productCategoriesList":
                        return "Loading products...";
                        break;
                    case "graphicsList":
                    case "graphicsCategoriesList":
                        return "Loading graphics...";
                        break;
                    default:
                        return "Loading...";
                        break;
                }
            };
            ConfigManager.assetsUrl = "assets/";
            return ConfigManager;
        })();
        Model.ConfigManager = ConfigManager;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="DEModel.ts"/>
    ///<reference path="../VO/ControlsModelVO.ts"/>
    (function (Model) {
        var ControlsManager = (function () {
            function ControlsManager(model) {
                var _this = this;
                this.controlsModel = new DEJS.VO.ControlsModelVO();
                this.model = model;
                this.model.addEventListener(DEEvents.CONFIG_LOADED_EVENT, function (event) {
                    return _this.onConfigLoaded(event);
                });
            }
            ControlsManager.prototype.onConfigLoaded = function (event) {
                var _this = this;
                this.model.removeEventListener(DEEvents.CONFIG_LOADED_EVENT, function (event) {
                    return _this.onConfigLoaded(event);
                });
            };

            ControlsManager.prototype.setModelUpdateHandler = function (updateHandler) {
                this.updateHandler = updateHandler;
                this.updateControls();
            };

            ControlsManager.prototype.updateControls = function () {
                DEJS.debug("updateControls", this.controlsModel.toObject());
                if (!this.updateHandler)
                    return;
                this.updateHandler(this.controlsModel.toObject());
            };

            ControlsManager.prototype.needSaveHistory = function (ui) {
                if (("selectedProductId" in ui) && Model.productManager.currentVariatedProduct && (ui["selectedProductId"] != Model.productManager.currentVariatedProduct.id)) {
                    return true;
                }
                if ("selectedProductColor" in ui) {
                    return true;
                }
                if ("selectedProductColorize" in ui) {
                    return true;
                }
                if ("selectedProductSize" in ui) {
                    return true;
                }
                return false;
            };

            ControlsManager.prototype.saveHistoryStatus = function () {
                Model.historyManager.onUserInteract();
            };

            // --- SET to UI --- START ---
            ControlsManager.prototype.setStatus = function (status) {
                this.controlsModel.setStatus(status);
                this.updateControls();
            };

            ControlsManager.prototype.setProducts = function (categories) {
                this.controlsModel.setProductCategories(categories);
                this.updateControls();
            };

            ControlsManager.prototype.setFonts = function (fonts) {
                this.controlsModel.setFonts(fonts);
                this.updateControls();
            };

            ControlsManager.prototype.setColors = function (colors) {
                this.controlsModel.setColors(colors);
                this.updateControls();
            };

            ControlsManager.prototype.setGraphics = function (categories) {
                this.controlsModel.setGraphicsCategories(categories);
                this.updateControls();
            };

            ControlsManager.prototype.setTextEffects = function (textEffects) {
                this.controlsModel.setTextEffects(textEffects);
                this.updateControls();
            };

            ControlsManager.prototype.setSelectedProductCategory = function (category) {
                this.controlsModel.setSelectedProductCategory(category);
                this.updateControls();
            };

            ControlsManager.prototype.setSelectedProduct = function (product) {
                this.controlsModel.setSelectedProduct(product);
                this.updateControls();
            };

            //VCGLL
            /*setSelectedProductVariation(variation: VO.ProductVariationVO) {
            this.controlsModel.setSelectedProductVariation(variation);
            this.updateControls();
            }*/
            ControlsManager.prototype.setSelectedProductColor = function (color) {
                this.controlsModel.setSelectedProductColor(color);
                this.updateControls();
            };

            ControlsManager.prototype.setSelectedProductSize = function (size) {
                this.controlsModel.setSelectedProductSize(size);
                this.updateControls();
            };

            ControlsManager.prototype.setSelectedObj = function (obj) {
                if (obj)
                    this.controlsModel.setSelectedObj(obj.attr());
                else
                    this.controlsModel.setSelectedObj(null);
                this.updateControls();
            };

            ControlsManager.prototype.setObjDClicked = function (value) {
                this.controlsModel.setObjDClicked(value);
                this.updateControls();
            };

            ControlsManager.prototype.setDesignInfo = function (designInfo) {
                this.controlsModel.setDesignInfo(designInfo);
                this.updateControls();
            };

            ControlsManager.prototype.setDesignNotes = function (designNotes) {
                this.controlsModel.setDesignNotes(designNotes);
                this.updateControls();
            };

            ControlsManager.prototype.setDesignSaved = function (designSaved) {
                this.controlsModel.status.designSaved = designSaved;
                this.controlsModel.setStatus(this.controlsModel.status);
                this.updateControls();
            };

            ControlsManager.prototype.setSelectedProductLocation = function (name) {
                this.controlsModel.setSelectedProductLocation(name);
                this.updateControls();
            };

            //VCGLL
            /*setRestrictions(restrictions: VO.RestrictionsVO) {
            this.controlsModel.setRestrictions(restrictions);
            this.updateControls();
            }*/
            ControlsManager.prototype.setQuantities = function (quantitites) {
                this.controlsModel.setQuantities(quantitites);
                this.updateControls();
            };

            ControlsManager.prototype.setImageUploading = function (uploading) {
                this.controlsModel.status.imageUploading = uploading;
                this.controlsModel.setStatus(this.controlsModel.status);
                this.updateControls();
            };

            ControlsManager.prototype.showAuthDialog = function () {
                this.controlsModel.setShowAuthDialog(true);
                this.updateControls();
                this.controlsModel.setShowAuthDialog(false);
            };

            ControlsManager.prototype.showAuthAndSaveDialog = function () {
                this.controlsModel.setShowAuthAndSaveDialog(true);
                this.updateControls();
                this.controlsModel.setShowAuthAndSaveDialog(false);
            };

            ControlsManager.prototype.showSaveDesignDialog = function () {
                this.controlsModel.setShowSaveDesignDialog(true);
                this.updateControls();
                this.controlsModel.setShowSaveDesignDialog(false);
            };

            ControlsManager.prototype.showLoadDesignsDialog = function (designs) {
                this.controlsModel.setDesigns(designs);
                this.controlsModel.setShowLoadDesignDialog(true);
                this.updateControls();
                this.controlsModel.setShowLoadDesignDialog(false);
            };

            ControlsManager.prototype.showDPUExceededDialog = function () {
                this.controlsModel.setShowDPUExceededDialog(true);
                this.updateControls();
                this.controlsModel.setShowDPUExceededDialog(false);
            };

            ControlsManager.prototype.showColorCountDialog = function () {
                this.controlsModel.setShowColorCountDialog(true);
                this.updateControls();
                this.controlsModel.setShowColorCountDialog(false);
            };

            ControlsManager.prototype.showShareLink = function (link) {
                this.controlsModel.setShareLink(link);
                this.controlsModel.setShowShareLink(true);
                this.updateControls();
                this.controlsModel.setShowShareLink(false);
            };

            ControlsManager.prototype.setNamesNumbers = function (namesNumbers) {
                this.controlsModel.setNamesNumbers(namesNumbers);
                this.updateControls();
            };

            ControlsManager.prototype.setUploadFileAvailable = function (uploadVailable) {
                this.controlsModel.setUploadFileAvailable(uploadVailable);
                this.updateControls();
            };

            ControlsManager.prototype.setStrictTemplate = function (strictTemplate) {
                this.controlsModel.setStrictTemplate(strictTemplate);
                this.updateControls();
            };

            ControlsManager.prototype.setZoom = function (zoom) {
                this.controlsModel.setZoom(zoom);
                this.updateControls();
            };

            ControlsManager.prototype.setZoomEnabled = function (zoomEnabled) {
                this.controlsModel.setZoomEnabled(zoomEnabled);
                this.updateControls();
            };

            ControlsManager.prototype.setMinZoom = function (zoom) {
                this.controlsModel.setMinZoom(zoom);
                this.updateControls();
            };

            ControlsManager.prototype.setMaxZoom = function (zoom) {
                this.controlsModel.setMaxZoom(zoom);
                this.updateControls();
            };

            ControlsManager.prototype.setShowProductSelector = function (showProductSelector) {
                this.controlsModel.setShowProductSelector(showProductSelector);
                this.updateControls();
            };

            ControlsManager.prototype.setIsUndoActive = function (value) {
                this.controlsModel.setIsUndoActive(value);
                this.updateControls();
            };

            ControlsManager.prototype.setIsRedoActive = function (value) {
                this.controlsModel.setIsRedoActive(value);
                this.updateControls();
            };

            // --- SET to UI --- END ---
            // --- UPDATE from UI --- START ---
            ControlsManager.prototype.updateSelectedProduct = function (id) {
                Model.productManager.setProduct(id, true);
            };

            ControlsManager.prototype.updateSelectedProductColor = function (color) {
                Model.productManager.setProductColor(color);
            };

            ControlsManager.prototype.updateSelectedProductSize = function (size) {
                Model.productManager.setProductSize(size);
            };

            //VCGLL
            /*private updateSelectedProductVariation(variationId: string) {
            productManager.setProductVariation(variationId);
            this.controlsModel.setSelectedProductVariation(productManager.currentProductVariation);
            this.updateControls();
            }*/
            ControlsManager.prototype.updateSelectedProductColorize = function (colorizeList) {
                Model.productManager.setProductColorize(colorizeList);
            };

            ControlsManager.prototype.updateSelectedGraphicsColorize = function (colorizeList) {
                Model.canvasManager.updateGraphicsColorizeList(colorizeList);
            };

            // --- UPDATE from UI --- END ---
            ControlsManager.prototype.userInteract = function (ui) {
                if (!this.model.inited)
                    return;
                DEJS.debug("userInteract", ui);
                if (!ui)
                    return;
                var dispatchHistory = this.needSaveHistory(ui);
                if ("selectedProductId" in ui) {
                    this.updateSelectedProduct(ui["selectedProductId"]);
                }
                if ("addGraphics" in ui) {
                    var graphics = Model.configManager.getGraphicsById(ui["addGraphics"]);
                    if (graphics)
                        Model.canvasManager.addGraphics(graphics);
                }
                if ("addCustomGraphics" in ui) {
                    var graphics = new DEJS.VO.GraphicsVO({ image: ui.addCustomGraphics });
                    Model.canvasManager.addGraphics(graphics);
                }
                if ("uploadGraphics" in ui) {
                    Model.saveLoadManager.uploadGraphics();
                }
                if ("selectedProductColor" in ui) {
                    this.updateSelectedProductColor(ui["selectedProductColor"]);
                }
                if ("selectedProductSize" in ui) {
                    this.updateSelectedProductSize(new DEJS.VO.ProductCanvasSizeVO(ui["selectedProductSize"]));
                }

                //VCGLL
                /*if ("selectedProductVariation" in ui) {
                this.updateSelectedProductVariation(ui["selectedProductVariation"]);
                }*/
                if ("selectedProductColorize" in ui) {
                    this.updateSelectedProductColorize(ui["selectedProductColorize"]);
                }
                if ("selectedGraphicsColorize" in ui) {
                    this.updateSelectedGraphicsColorize(ui["selectedGraphicsColorize"]);
                }
                if ("addText" in ui) {
                    var obj = Model.canvasManager.addText(ui["addText"]);
                }
                if ("updateText" in ui) {
                    var obj = Model.canvasManager.updateText(ui["updateText"]);
                }
                if ("updateGraphics" in ui) {
                    var obj = Model.canvasManager.updateGraphics(ui["updateGraphics"]);
                }
                if ("updateObject" in ui) {
                    var obj = Model.canvasManager.updateObject(ui["updateObject"]);
                }
                if ("selectedProductLocation" in ui) {
                    //this.controlsModel.setSelectedProductLocation(ui["selectedProductLocation"]);
                    this.controlsModel.selectedProductLocation = ui["selectedProductLocation"]; //TODO: Check this out
                    Model.canvasManager.setProductLocation(this.controlsModel.selectedProductLocation);
                }
                if ("clearDesign" in ui) {
                    Model.canvasManager.clearDesign();
                }
                if ("shareDesign" in ui) {
                    Model.saveLoadManager.shareDesign();
                }
                if ("saveDesign" in ui) {
                    Model.saveLoadManager.saveDesign(ui.saveDesign);
                }
                if ("designNotes" in ui) {
                    Model.orderManager.setDesignNotes(ui.designNotes);
                }
                if ("loadDesign" in ui) {
                    Model.saveLoadManager.loadDesign(ui.loadDesign);
                }
                if ("updateQuantities" in ui) {
                    Model.orderManager.setQuantities(ui["updateQuantities"]);

                    //this.controlsModel.setQuantities(ui.updateQuantities);
                    this.controlsModel.quantities = ui["updateQuantities"]; //TODO: Check this out
                }
                if ("updateNamesNumbers" in ui) {
                    Model.orderManager.setNamesNumbers(DEJS.Util.parseArray(ui["updateNamesNumbers"], DEJS.VO.NamesNumbersVO));
                    this.controlsModel.namesNumbers = DEJS.Util.parseArray(ui["updateNamesNumbers"], DEJS.VO.NamesNumbersVO);
                }
                if ("placeOrder" in ui) {
                    Model.orderManager.placeOrder();
                }
                if ("authorize" in ui) {
                    Model.authManager.authorize(ui.authorize);
                }
                if ("align" in ui) {
                    Model.canvasManager.align(ui["align"]);
                }
                if ("flip" in ui) {
                    Model.canvasManager.flip(ui["flip"]);
                }
                if ("arrange" in ui) {
                    Model.canvasManager.arrange(ui["arrange"]);
                }
                if ("transform" in ui) {
                    Model.canvasManager.transform(ui["transform"]);
                }
                if ("dpuExceedConfirmed" in ui) {
                    Model.orderManager.saveDesignForPlaceOrder();
                }
                if ("addNameObj" in ui) {
                    Model.canvasManager.addNamesObj(ui["addNameObj"]);
                }
                if ("addNumberObj" in ui) {
                    Model.canvasManager.addNumbersObj(ui["addNumberObj"]);
                }
                if ("lockProportions" in ui) {
                    Model.canvasManager.setLockProportions(ui["lockProportions"]);
                }
                if ("print" in ui) {
                    Model.canvasManager.print();
                }
                if ("copy" in ui) {
                    Model.canvasManager.copy();
                }
                if ("paste" in ui) {
                    Model.canvasManager.paste();
                }
                if ("zoomIn" in ui) {
                    Model.canvasManager.changeZoom(true);
                }
                if ("zoomOut" in ui) {
                    Model.canvasManager.changeZoom(false);
                }
                if ("zoom" in ui) {
                    Model.canvasManager.changeZoom(ui["zoom"]);
                }
                if ("drag" in ui) {
                    Model.canvasManager.setDrag(ui["drag"]);
                }
                if ("imageColorCount" in ui) {
                    Model.saveLoadManager.imageColorCountSubmit(new DEJS.VO.ImageColorCountVO(ui["imageColorCount"]));
                }
                if ("undo" in ui) {
                    Model.historyManager.undo();
                }
                if ("redo" in ui) {
                    Model.historyManager.redo();
                }
                if (dispatchHistory)
                    this.saveHistoryStatus();
            };
            return ControlsManager;
        })();
        Model.ControlsManager = ControlsManager;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="DEModel.ts"/>
    ///<reference path="../event/Events.ts"/>
    (function (Model) {
        var StatusManager = (function () {
            function StatusManager(model) {
                var _this = this;
                this.totalLoadSteps = 3;
                this.loadedSteps = 0;
                this.model = model;
                this.model.addEventListener(DEEvents.LOAD_STATUS_EVENT, function (event) {
                    return _this.onLoadStatus(event);
                });
            }
            StatusManager.prototype.onLoadStatus = function (event) {
                Model.controlsManager.setStatus(new DEJS.VO.StatusVO(event.message, !event.completed, event.completed, event.percentCompleted));
            };
            return StatusManager;
        })();
        Model.StatusManager = StatusManager;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="../Util.ts"/>
    ///<reference path="Obj.ts"/>
    ///<reference path="VO.ts"/>
    (function (VO) {
        var QuoteVO = (function () {
            function QuoteVO() {
                this.productColor = null;
                this.productColors = null;
                this.productSize = null;
                this.locations = [];
                this.dpuExceeded = false;
                this.namesNumbers = [];
            }
            QuoteVO.prototype.toObject = function (dpi) {
                var data = {};
                if (this.product) {
                    data.product = {};
                    data.product.id = this.product.id;
                    if (this.productColor) {
                        data.product.color = this.productColor.value;
                        data.product.colorName = this.productColor.name;
                    }
                    if (this.productColors) {
                        data.product.productColors = [];
                        for (var i = 0; i < this.productColors.length; i++) {
                            data.product.productColors.push({ id: this.productColors[i].id, name: this.productColors[i].name, value: this.productColors[i].value });
                        }
                    }
                    if (this.productSize) {
                        data.product.size = this.productSize.toObject();
                    }
                }
                data.locations = [];
                for (var i = 0; i < this.locations.length; i++) {
                    data.locations.push(this.locations[i].toObject(dpi));
                }
                if (this.namesNumbers.length > 0)
                    data.namesNumbers = DEJS.Util.arrayToObjArray(this.namesNumbers);
                return data;
            };
            return QuoteVO;
        })();
        VO.QuoteVO = QuoteVO;

        var QuoteLocationVO = (function () {
            function QuoteLocationVO(sourceLocation) {
                this.name = "";
                this.objects = [];
                this.colorsCount = 0;
                this.colors = [];
                this.areaCoords = null;
                this.designedArea = 0;
                this.processColors = false;
                this.dpu = 1;
                //dpuExceeded: boolean = false;//VCGLL
                this.designedSize = null;
                this.name = sourceLocation.name;
                this.dpu = sourceLocation.dpu;
            }
            QuoteLocationVO.prototype.addObject = function (object) {
                if (object.processColors) {
                    this.processColors = true;
                } else if (object.fakeColorsNum > 0) {
                    this.colorsCount += object.fakeColorsNum;
                } else {
                    var tempLength = this.colors.length;
                    this.colors = DEJS.Util.mergeArrays(this.colors, object.colors);
                    this.colorsCount += this.colors.length - tempLength;
                }
                this.designedArea += object.designedArea;
                if (!this.areaCoords) {
                    this.areaCoords = object.areaCoords;
                } else if (object.areaCoords) {
                    this.areaCoords[0] = Math.min(this.areaCoords[0], object.areaCoords[0]);
                    this.areaCoords[1] = Math.min(this.areaCoords[1], object.areaCoords[1]);
                    this.areaCoords[2] = Math.max(this.areaCoords[2], object.areaCoords[2]);
                    this.areaCoords[3] = Math.max(this.areaCoords[3], object.areaCoords[3]);
                }

                //this.dpuExceeded = this.dpuExceeded || object.dpuExceed;//VCGLL
                this.objects.push(object);
            };

            QuoteLocationVO.prototype.toObject = function (dpi) {
                if (typeof dpi === "undefined") { dpi = 1; }
                if (!this.areaCoords)
                    this.areaCoords = [0, 0, 0, 0];

                var location = {};
                location.name = this.name;
                if (this.processColors)
                    location.colors = "processColors";
                else
                    location.colors = this.colorsCount;

                location.colorsList = this.colors.slice(0);

                // IMPORTANT dpi is ignored
                // using calculated dpu from product instead
                location.designedArea = this.designedArea / (this.dpu * this.dpu);
                location.designedAreaRect = (this.areaCoords[0] - this.areaCoords[2]) * (this.areaCoords[1] - this.areaCoords[3]) / (this.dpu * this.dpu);
                location.objects = [];
                var letterings = 0;
                var images = 0;
                for (var i = 0; i < this.objects.length; i++) {
                    var obj = this.objects[i];
                    var objRecord = {};
                    objRecord.type = obj.type;
                    if (obj.type == ObjectType.Text)
                        letterings++;
                    else
                        images++;
                    if (obj.sourceId && obj.sourceId.length > 0)
                        objRecord.id = obj.sourceId;
                    if (obj.text.length > 0)
                        objRecord.text = obj.text;
                    objRecord.designedArea = obj.designedArea / (this.dpu * this.dpu);
                    if (obj.processColors) {
                        objRecord.colors = "processColors";
                    } else if (obj.fakeColorsNum == 0) {
                        objRecord.colors = obj.colors.length;
                        objRecord.colorsList = obj.colors.slice(0);
                    } else {
                        objRecord.colors = obj.fakeColorsNum;
                    }

                    location.objects.push(objRecord);
                }
                location.objectCount = this.objects.length;
                location.letterings = letterings;
                location.images = images;
                if (this.designedSize) {
                    location.designedWidth = this.designedSize.width;
                    location.designedHeight = this.designedSize.height;
                }

                return location;
            };

            QuoteLocationVO.prototype.toColorsCount = function () {
                var res = new VO.ColorsCountVO();
                res.location = this.name;
                res.count = this.colorsCount;

                if (this.processColors)
                    res.count = -1;
                return res;
            };
            return QuoteLocationVO;
        })();
        VO.QuoteLocationVO = QuoteLocationVO;

        var QuoteObjectVO = (function () {
            function QuoteObjectVO(sourceObj) {
                this.type = "";
                this.sourceId = "";
                this.text = "";
                this.processColors = false;
                this.fakeColorsNum = 0;
                this.colors = [];
                this.designedArea = 0;
                this.areaCoords = null;
                this.sourceObj = sourceObj;
                this.type = sourceObj.type;
                switch (this.type) {
                    case ObjectType.Text:
                        var attr = sourceObj.attr();
                        this.text = attr["text"];
                        var fillColor = attr["fill"];
                        var stroke = attr["stroke"];
                        this.colors.push(DEJS.Util.normColor(fillColor));
                        if (stroke && stroke != "none" && stroke != fillColor)
                            this.colors.push(DEJS.Util.normColor(stroke));
                        break;
                    case ObjectType.SVG:
                        var attr = sourceObj.attr();
                        this.sourceId = sourceObj.getSourceId();

                        if (attr['processColors']) {
                            this.processColors = true;
                        } else if (attr['colorsNumber'] > 0) {
                            this.fakeColorsNum = attr['colorsNumber'];
                        } else if (sourceObj.multicolor) {
                            for (var i = 0; i < sourceObj.complexColor.colorizeList.length; i++) {
                                this.colors.push(DEJS.Util.normColor(sourceObj.complexColor.colorizeList[i].value));
                            }
                        } else if (attr['colorize']) {
                            var attr = sourceObj.attr();
                            var fillColor = attr["fill"];
                            var stroke = attr["stroke"];
                            this.colors.push(DEJS.Util.normColor(fillColor));
                            if (stroke && stroke != "none" && stroke != fillColor)
                                this.colors.push(DEJS.Util.normColor(stroke));
                        } else {
                            //not colorized by user - nothing predefined - doing nothing
                        }
                        break;
                    case ObjectType.Image:
                        var attr = sourceObj.attr();
                        this.sourceId = sourceObj.getSourceId();
                        if (attr['processColors']) {
                            //from config if colors = '-1'
                            this.processColors = true;
                        }
                        if (attr['colorsNumber'] > 0) {
                            this.fakeColorsNum = attr['colorsNumber'];
                        }
                        break;
                }
                this.designedArea = sourceObj.getDesignedArea();
                this.areaCoords = sourceObj.getAreaCoords();
                //this.dpuExceed = sourceObj.dpuExceeded;//VCGLL
            }
            return QuoteObjectVO;
        })();
        VO.QuoteObjectVO = QuoteObjectVO;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    (function (VO) {
        var DesignInfoVO = (function () {
            function DesignInfoVO() {
                this.colors = [];
                this.prices = [];
                this.objectsCount = new ObjectsCountVO();
            }
            return DesignInfoVO;
        })();
        VO.DesignInfoVO = DesignInfoVO;

        var ColorsCountVO = (function () {
            function ColorsCountVO() {
            }
            return ColorsCountVO;
        })();
        VO.ColorsCountVO = ColorsCountVO;

        var PriceVO = (function () {
            function PriceVO() {
                this.isTotal = false;
            }
            return PriceVO;
        })();
        VO.PriceVO = PriceVO;

        var ObjectsCountVO = (function () {
            function ObjectsCountVO() {
                this.imagesCount = 0;
                this.letteringsCount = 0;
            }
            return ObjectsCountVO;
        })();
        VO.ObjectsCountVO = ObjectsCountVO;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="DEModel.ts"/>
    ///<reference path="../vo/Quote.ts"/>
    ///<reference path="../event/Events.ts"/>
    ///<reference path="../vo/ControlsModelVO.ts"/>
    ///<reference path="../vo/DesignInfoVO.ts"/>
    (function (Model) {
        var OrderManager = (function () {
            function OrderManager(model) {
                var _this = this;
                this.quantities = [];
                this.namesNumbers = [];
                this.designInfo = new DEJS.VO.DesignInfoVO();
                this.prices = [];
                this.designNotes = '';
                this.model = model;
                this.model.addEventListener(DEEvents.CONFIG_LOADED_EVENT, function (event) {
                    return _this.onConfigLoaded(event);
                });
            }
            OrderManager.prototype.setPlaceOrderHandler = function (handler) {
                this.placeOrderHandler = handler;
            };

            OrderManager.prototype.setQuantities = function (value) {
                this.quantities = value;
                this.updatePrice();
            };

            OrderManager.prototype.setNamesNumbers = function (value) {
                this.namesNumbers = value;
                this.updatePrice();
            };

            OrderManager.prototype.onConfigLoaded = function (event) {
                var _this = this;
                this.model.removeEventListener(DEEvents.CONFIG_LOADED_EVENT, function (event) {
                    return _this.onConfigLoaded(event);
                });
                this.model.addEventListener(DEEvents.DESIGNER_CHANGED_EVENT, function (event) {
                    return _this.onDesignerChanged(event);
                });
                this.updateQuote(false, null, true);
            };

            OrderManager.prototype.onDesignerChanged = function (event) {
                Model.controlsManager.setDesignSaved(false);
                if (!this.ignoreChange) {
                    this.updateQuote();
                }
            };

            OrderManager.prototype.onProductColorChanged = function () {
                Model.controlsManager.setDesignSaved(false);
                if (!this.ignoreChange) {
                    this.updateQuote();
                }
            };

            OrderManager.prototype.updateQuote = function (useDPI, callback, ignoreDelay) {
                if (typeof useDPI === "undefined") { useDPI = false; }
                if (typeof callback === "undefined") { callback = null; }
                if (typeof ignoreDelay === "undefined") { ignoreDelay = false; }
                DEJS.debug("order update quote");
                this.currentQuote = Model.canvasManager.getQuote();
                this.updateQuoteNamesNumbers(this.currentQuote);
                this.updateDesignInfo(this.currentQuote);
                this.updatePrice(this.currentQuote, useDPI, callback, ignoreDelay);
            };

            OrderManager.prototype.updateDesignInfo = function (quote) {
                DEJS.debug("order update design info");
                if (quote == null) {
                    quote = Model.canvasManager.getQuote();
                    this.updateQuoteNamesNumbers(quote);
                }

                var colors = jQuery.map(quote.locations, function (location) {
                    return location.toColorsCount();
                });

                var letteringsCount = 0;
                var imagesCount = 0;
                var locationObj;

                for (var i = 0; i < quote.locations.length; i++) {
                    locationObj = quote.locations[i].toObject();
                    letteringsCount += locationObj.letterings;
                    imagesCount += locationObj.images;
                }

                this.designInfo.colors = colors;
                this.designInfo.objectsCount.letteringsCount = letteringsCount;
                this.designInfo.objectsCount.imagesCount = imagesCount;
                Model.controlsManager.setDesignInfo(this.designInfo);
            };

            OrderManager.prototype.updatePrice = function (quote, useDPI, callback, ignoreDelay) {
                var _this = this;
                if (typeof useDPI === "undefined") { useDPI = false; }
                if (typeof callback === "undefined") { callback = null; }
                if (typeof ignoreDelay === "undefined") { ignoreDelay = false; }
                if (quote == null) {
                    quote = Model.canvasManager.getQuote();
                    this.updateQuoteNamesNumbers(quote);
                }
                clearTimeout(this.timeout);
                if (ignoreDelay) {
                    this._updatePrice(quote, useDPI, callback);
                } else {
                    this.timeout = setTimeout(function () {
                        _this._updatePrice(quote, useDPI, callback);
                    }, 2000);
                }
            };

            OrderManager.prototype._updatePrice = function (quote, useDPI, callback) {
                var _this = this;
                if (!Model.configManager.config.getQuoteUrl) {
                    DEJS.debug("order update price empty getQuoteUrl");
                    this.onQuoteLoaded({ prices: "not available" }, callback);
                    return;
                }
                DEJS.debug("order update price call");
                var quoteObj = quote.toObject(useDPI ? Model.configManager.config.options.dpi : 1);
                quoteObj.quantities = this.quantities;
                quoteObj.namesNumbers = this.namesNumbers;
                jQuery.support.cors = true;
                var url = DEJS.Util.addTimeStamp(Model.configManager.config.getQuoteUrl);
                jQuery.post(url, { data: JSON.stringify(quoteObj) }, function (data) {
                    return _this.onQuoteLoaded(data, callback);
                }, "json").fail(function (jqXHR, textStatus, errorThrown) {
                    return _this.onQuoteFail(jqXHR, textStatus, errorThrown, callback);
                });
            };

            OrderManager.prototype.onQuoteLoaded = function (data, callback) {
                DEJS.debug("order quote loaded");
                if (data.prices) {
                    this.prices = data.prices;
                    this.designInfo.prices = this.prices;
                    Model.controlsManager.setDesignInfo(this.designInfo);
                    if (callback != null) {
                        callback(true);
                    }
                } else if (data.error) {
                    alert("Error: " + data.error.message);
                } else {
                    alert("Failed to load quote! Response is invalid.");
                }
            };

            OrderManager.prototype.onQuoteFail = function (jqXHR, textStatus, errorThrown, callback) {
                alert("Failed to load quote: " + textStatus);
                if (callback != null) {
                    callback(false);
                }
            };

            OrderManager.prototype.setDesignNotes = function (notes) {
                this.designNotes = notes;
            };

            OrderManager.prototype.getDesign = function () {
                var designVO = Model.canvasManager.getDesign();
                designVO.quantities = this.quantities;
                if (Model.productManager.currentVariatedProduct && Model.productManager.currentVariatedProduct.namesNumbersEnabled) {
                    designVO.namesNumbers = this.namesNumbers;
                }
                designVO.prices = this.prices;
                designVO.notes = this.designNotes;
                return designVO;
            };

            OrderManager.prototype.parseDesignJSON = function (design) {
                var res = new DEJS.VO.DesignVO();
                if (design.product) {
                    res.product = Model.configManager.getProductById(design.product.id);
                    res.productVariation = res.product.getVariation(design.variationId);
                    if (design.product.color) {
                        res.productColor = res.product.getColor(design.product.color);
                    }
                    if (design.product.size) {
                        res.productSize = new DEJS.VO.ProductCanvasSizeVO(design.product.size);
                    }
                    var locations = DEJS.Util.parseArray(design.locations, DEJS.VO.DesignLocationVO);
                    for (var i = 0; i < res.product.locations.length; i++) {
                        var designLocation = DEJS.Util.arrayFind(locations, "name", res.product.locations[i].name);
                        if (designLocation) {
                            res.svgs.push(designLocation.svg ? designLocation.svg : "");
                        } else {
                            res.svgs.push("");
                        }
                    }
                } else {
                    var locations = DEJS.Util.parseArray(design.locations, DEJS.VO.DesignLocationVO);
                    for (var i = 0; i < locations.length; i++) {
                        var designLocation = locations[i];
                        if (designLocation) {
                            res.svgs.push(designLocation.svg ? designLocation.svg : "");
                        } else {
                            res.svgs.push("");
                        }
                    }
                }
                if (design.quantities) {
                    res.quantities = design.quantities;
                }
                if (design.prices) {
                    res.prices = design.prices;
                }
                if (design.namesNumbers) {
                    res.namesNumbers = DEJS.Util.parseArray(design.namesNumbers, DEJS.VO.NamesNumbersVO);
                }
                if (design.notes) {
                    res.notes = design.notes;
                } else {
                    res.notes = "";
                }
                return res;
            };

            OrderManager.prototype.setDesign = function (designJSON, isTemplate) {
                var _this = this;
                if (typeof isTemplate === "undefined") { isTemplate = false; }
                this.ignoreChange = true;
                this.model.addEventListener(DEEvents.DESIGN_READY_EVENT, function (event) {
                    return _this.onDesignReady(event);
                });
                var design = this.parseDesignJSON(designJSON);
                Model.canvasManager.setDesign(design, isTemplate);
                if (!isTemplate) {
                    Model.productManager.setDesign(design);
                    this.quantities = design.quantities;
                    this.prices = design.prices;
                    this.designNotes = design.notes;
                    if (design.prices) {
                        this.designInfo.prices = design.prices;
                        Model.controlsManager.setDesignInfo(this.designInfo);
                    }
                    this.namesNumbers = design.namesNumbers;
                    Model.controlsManager.setNamesNumbers(this.namesNumbers);
                    this.updateDesignNotes();
                }
                this.model.dispatchEvent(new DEJS.Events.Event(DEEvents.DESIGN_READY_EVENT, this));
            };

            OrderManager.prototype.onDesignReady = function (event) {
                var _this = this;
                this.model.removeEventListener(DEEvents.DESIGN_READY_EVENT, function (event) {
                    return _this.onDesignReady(event);
                });
                this.ignoreChange = false;
                this.updateQuote();
            };

            OrderManager.prototype.placeOrder = function () {
                var _this = this;
                DEJS.debug("order place order");

                //this.model.dispatchEvent(new Events.LoadStatusEvent("Placing order...", false, 100));
                this.updateQuote(false, function (success) {
                    return _this.onGetQuoteForPlaceOrder(success);
                }, true);
            };

            OrderManager.prototype.onSaveDesignForPlaceOrder = function (success) {
                DEJS.debug("order order design saved: " + success);
                if (success == true) {
                    if (this.placeOrderHandler) {
                        this.placeOrderHandler(this.model.saveLoadManager.currentDesign.id);
                    } else if (Model.configManager.config.redirectUrl != "") {
                        var redirectionUrl = Model.configManager.config.redirectUrl.replace("${design_id}", Model.saveLoadManager.currentDesign.id);
                        switch (Model.configManager.config.redirectWindow) {
                            case "parent":
                                window.parent.location.assign(redirectionUrl);
                                break;
                            case "top":
                                window.top.location.assign(redirectionUrl);
                                break;
                            default:
                                window.location.assign(redirectionUrl);
                                break;
                        }
                    } else {
                        alert("Order placed successfully!");
                    }
                } else {
                    if (this.placeOrderHandler) {
                        this.placeOrderHandler(false);
                    }
                    //this.model.dispatchEvent(new Events.LoadStatusEvent("Placing order...", true, 100));
                }
            };

            OrderManager.prototype.onGetQuoteForPlaceOrder = function (success) {
                DEJS.debug("order order guote updated: " + success);
                if (success == true) {
                    if (this.currentQuote.dpuExceeded) {
                        DEJS.debug("order dpu exceeded");
                        Model.controlsManager.showDPUExceededDialog();
                    } else {
                        this.saveDesignForPlaceOrder();
                    }
                } else {
                    if (this.placeOrderHandler) {
                        this.placeOrderHandler(false);
                    }
                    //this.model.dispatchEvent(new Events.LoadStatusEvent("Placing order...", true, 100));
                }
            };

            OrderManager.prototype.saveDesignForPlaceOrder = function () {
                var _this = this;
                Model.saveLoadManager.saveDesign(Model.saveLoadManager.currentDesign.name, function (success) {
                    return _this.onSaveDesignForPlaceOrder(success);
                }, true);
            };

            OrderManager.prototype.updateDesignNotes = function () {
                Model.controlsManager.setDesignNotes(this.designNotes);
            };

            //VCGLL
            /*setProductVariation(newVariation: VO.ProductVariationVO, suppressDesignLoad?: boolean = false) {
            var variation: VO.ProductVariationVO = newVariation;
            if (!variation) variation = new VO.ProductVariationVO(); // To get default variation values
            if (this.quantities.length > 0) {
            for (var i = 0; i < this.quantities.length; i++) {
            this.quantities[i].quantity = Math.max(this.quantities[i].quantity, variation.minQuantity);
            }
            controlsManager.setQuantities(this.quantities);
            }
            controlsManager.setRestrictions(variation.toRestrictionVO());
            if (!suppressDesignLoad && variation.defaultDesign.length > 0) {
            saveLoadManager.loadDesign(variation.defaultDesign, true);
            }
            }*/
            OrderManager.prototype.updateQuoteNamesNumbers = function (quote) {
                if (Model.productManager.currentVariatedProduct && Model.productManager.currentVariatedProduct.namesNumbersEnabled)
                    quote.namesNumbers = this.namesNumbers;
                else
                    quote.namesNumbers = this.namesNumbers;
            };
            return OrderManager;
        })();
        Model.OrderManager = OrderManager;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="DEModel.ts"/>
    ///<reference path="../event/Events.ts"/>
    (function (Model) {
        var AuthManager = (function () {
            function AuthManager(model) {
                this.isAuthorized = false;
                this.model = model;
            }
            AuthManager.prototype.authorize = function (email) {
                if (typeof email === "undefined") { email = ""; }
                DEJS.debug("authorize, email: " + email);
                if (email == "") {
                    Model.controlsManager.showAuthDialog();
                } else {
                    this.email = email;
                    this.isAuthorized = true;
                    this.model.dispatchEvent(new DEJS.Events.Event(DEEvents.AUTH_EVENT, this));
                }
            };
            return AuthManager;
        })();
        Model.AuthManager = AuthManager;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="DEModel.ts"/>
    ///<reference path="../Util.ts"/>
    (function (Model) {
        var SaveLoadManager = (function () {
            function SaveLoadManager(model) {
                this.currentAction = "";
                this.currentDesign = {};
                this.uploadFileEnabled = false;
                this.imagesToCountColors = [];
                this.processingImageColors = false;
                this.model = model;
            }
            SaveLoadManager.prototype.shareDesign = function () {
                var _this = this;
                DEJS.debug("saveLoad share design: " + name);
                this.currentAction = "shareDesign";

                if (!Model.configManager.config.saveDesignUrl) {
                    return;
                }
                var url = DEJS.Util.addTimeStamp(Model.configManager.config.saveDesignUrl);
                var data = {};
                data.data = Model.orderManager.getDesign().toJSON();
                data.title = name;
                data.email = Model.authManager.email;
                data.type = "shared";
                jQuery.post(url, data, function (data, status, jqXHR) {
                    return _this.onDesignShareSaveComplete(data);
                }, "json").fail(function (jqXHR, textStatus, errorThrown) {
                    return _this.onDesignSaveFail(jqXHR, textStatus, errorThrown);
                });
            };

            SaveLoadManager.prototype.onDesignShareSaveComplete = function (data) {
                DEJS.debug("saveLoad design share saved");
                if (data.design) {
                    Model.controlsManager.setDesignSaved(true);
                    this.currentDesign = data.design;
                    if (!data.design.id) {
                        alert("Error: no design id.");
                    } else {
                        var link = this.model.configManager.config.shareLinkUrl.replace("${design_id}", data.design.id);
                        Model.controlsManager.showShareLink(link);
                    }
                } else if (data.error) {
                    alert("Error: " + data.error.message);
                } else {
                    alert("Fail to save design! Response is invalid.");
                }
            };

            SaveLoadManager.prototype.saveDesign = function (name, callback, force) {
                var _this = this;
                if (typeof callback === "undefined") { callback = null; }
                if (typeof force === "undefined") { force = false; }
                DEJS.debug("saveLoad save design: " + name);
                this.currentAction = "saveDesign";
                if (Model.authManager.isAuthorized == false && !force) {
                    if (name == "") {
                        Model.controlsManager.showAuthAndSaveDialog();
                    } else {
                        this.model.addEventListener(DEEvents.AUTH_EVENT, function () {
                            _this.model.removeEventListener(DEEvents.AUTH_EVENT, arguments.callee);
                            if (_this.currentAction == "saveDesign") {
                                _this.saveDesign(name, callback);
                            }
                        });
                        Model.authManager.authorize();
                    }
                } else if (name == "") {
                    Model.controlsManager.showSaveDesignDialog();
                } else {
                    if (!Model.configManager.config.saveDesignUrl) {
                        return;
                    }
                    var url = DEJS.Util.addTimeStamp(Model.configManager.config.saveDesignUrl);
                    var data = {};
                    data.data = Model.orderManager.getDesign().toJSON();
                    data.title = name;
                    data.email = Model.authManager.email;
                    data.type = "saved";
                    jQuery.post(url, data, function (data, status, jqXHR) {
                        return _this.onDesignSaveComplete(data, status, jqXHR, callback);
                    }, "json").fail(function (jqXHR, textStatus, errorThrown) {
                        return _this.onDesignSaveFail(jqXHR, textStatus, errorThrown, callback);
                    });
                }
            };

            SaveLoadManager.prototype.onDesignSaveComplete = function (data, status, jqXHR, callback) {
                DEJS.debug("saveLoad design saved");
                if (data.design) {
                    Model.controlsManager.setDesignSaved(true);
                    this.currentDesign = data.design;
                    if (callback != null) {
                        callback(true);
                    } else {
                        alert("Design '" + this.currentDesign.title + "' saved successfully!");
                    }
                } else if (data.error) {
                    alert("Error: " + data.error.message);
                } else {
                    alert("Fail to save design! Response is invalid.");
                }
            };

            SaveLoadManager.prototype.onDesignSaveFail = function (jqXHR, textStatus, errorThrown, callback) {
                if (typeof callback === "undefined") { callback = null; }
                alert("Fail to save design!");
                if (callback != null) {
                    callback(false);
                }
            };

            SaveLoadManager.prototype.loadDesign = function (id, forceLoad, isTemplate) {
                var _this = this;
                if (typeof forceLoad === "undefined") { forceLoad = false; }
                if (typeof isTemplate === "undefined") { isTemplate = false; }
                DEJS.debug("saveLoad load design: " + id);
                this.currentAction = "loadDesign";
                if (Model.authManager.isAuthorized == false && !forceLoad) {
                    Model.authManager.authorize();
                    this.model.addEventListener(DEEvents.AUTH_EVENT, function () {
                        _this.model.removeEventListener(DEEvents.AUTH_EVENT, arguments.callee);
                        if (_this.currentAction == "loadDesign") {
                            _this.loadDesign(id);
                        }
                    });
                } else if (id == "") {
                    this.getDesigns();
                } else {
                    if (!Model.configManager.config.loadDesignUrl) {
                        return;
                    }
                    jQuery.support.cors = true;
                    var url = DEJS.Util.addTimeStamp(this.model.configManager.config.loadDesignUrl).replace("${design_id}", id);
                    jQuery.get(url, function (data, status, jqXHR) {
                        return _this.onDesignLoadComplete(data, isTemplate, status, jqXHR);
                    }, "json").fail(function (jqXHR, textStatus, errorThrown) {
                        return _this.onDesignLoadFail(isTemplate, jqXHR, textStatus, errorThrown);
                    });
                }
            };

            SaveLoadManager.prototype.onDesignLoadComplete = function (data, isTemplate, status, jqXHR) {
                DEJS.debug("saveLoad design loaded");
                if (data.data) {
                    Model.orderManager.setDesign(data.data, isTemplate);
                } else if (data.error) {
                    alert("Error: " + data.error.message);
                } else {
                    alert("Fail to load design! Response is invalid.");
                }
            };

            SaveLoadManager.prototype.onDesignLoadFail = function (isTemplate, jqXHR, textStatus, errorThrown) {
                if (isTemplate)
                    alert("Fail to load design template!");
                else
                    alert("Fail to load design!");
            };

            SaveLoadManager.prototype.getDesigns = function () {
                var _this = this;
                if (!Model.configManager.config.getDesignsUrl) {
                    return;
                }
                DEJS.debug("saveLoad load designs");
                var url = DEJS.Util.addTimeStamp(this.model.configManager.config.getDesignsUrl).replace("${email}", this.model.authManager.email);
                jQuery.get(url, function (data, status, jqXHR) {
                    return _this.onDesignsGetComplete(data, status, jqXHR);
                }, "json").fail(function (jqXHR, textStatus, errorThrown) {
                    return _this.onDesignsGetFail(jqXHR, textStatus, errorThrown);
                });
            };

            SaveLoadManager.prototype.onDesignsGetComplete = function (data, status, jqXHR) {
                DEJS.debug("saveLoad designs loaded");
                if (data.designs) {
                    Model.controlsManager.showLoadDesignsDialog(data.designs);
                } else if (data.error) {
                    alert("Error: " + data.error.message);
                } else {
                    alert("Fail to load designs list! Response is invalid.");
                }
            };

            SaveLoadManager.prototype.onDesignsGetFail = function (jqXHR, textStatus, errorThrown) {
                alert("Fail to load designs list!");
            };

            SaveLoadManager.prototype.uploadGraphics = function () {
                var _this = this;
                if (!this.uploadFileEnabled) {
                    DEJS.debug("saveLoad upload graphics disabled");
                    return;
                }
                DEJS.debug("saveLoad upload graphics");
                var uploadForm = jQuery("<form>");
                uploadForm.get(0).setAttribute('action', Model.configManager.config.uploadImageUrl);
                uploadForm.attr({ enctype: "multipart/form-data", method: "post" }).addClass("invisible temporary");

                //add form  to DOM - Safari 5.* hack
                uploadForm.appendTo(jQuery('body'));
                var test = uploadForm.attr("action");
                var input = jQuery("<input>").attr({ name: "image", type: "file", accept: "image/*" }).change(function (event) {
                    return _this.onGraphicsFilesSelected(input);
                });
                input.appendTo(uploadForm);
                input.get(0).click();
            };

            SaveLoadManager.prototype.onGraphicsFilesSelected = function (input) {
                var _this = this;
                DEJS.debug("saveLoad upload graphics selected");
                var files = input.prop("files");
                if (files && files.length > 0) {
                    var v = input.val();
                    var formdata = new FormData();
                    formdata.append("image", files[0]);
                    var options = {
                        url: Model.configManager.config.uploadImageUrl,
                        type: 'post',
                        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
                    };
                    var extOptions = jQuery.extend(true, {}, jQuery.ajaxSettings, options, {
                        contentType: false,
                        processData: false,
                        cache: false,
                        type: 'post',
                        data: formdata,
                        success: function (event) {
                            return _this.onUploadGraphicsComplete(event);
                        },
                        fail: function () {
                            return _this.onUploadGraphicsFail();
                        }
                    });
                    jQuery.ajax(extOptions).fail();
                    Model.controlsManager.setImageUploading(true);
                }
            };

            SaveLoadManager.prototype.onUploadGraphicsComplete = function (pathToGraphics) {
                DEJS.debug("saveLoad graphics uploaded: " + pathToGraphics);
                Model.controlsManager.setImageUploading(false);
                jQuery("form.temporary").remove();
                var graphics = new DEJS.VO.GraphicsVO({ image: pathToGraphics, uploaded: true });
                Model.canvasManager.addGraphics(graphics);
            };

            SaveLoadManager.prototype.onUploadGraphicsFail = function () {
                Model.controlsManager.setImageUploading(false);
                alert("Failed to upload graphics.");
            };

            SaveLoadManager.prototype.checkUploadFileAvailable = function () {
                var input = jQuery("<input>").attr({ name: "image", type: "file", accept: "image/*" });
                var some = input.attr("disabled");
                this.uploadFileEnabled = !some;
                DEJS.debug("saveLoad upload available: " + this.uploadFileEnabled);
                Model.controlsManager.setUploadFileAvailable(this.uploadFileEnabled);
            };

            SaveLoadManager.prototype.imageUploaded = function (obj) {
                this.imagesToCountColors.push(obj);
                this.processImageColors();
            };

            SaveLoadManager.prototype.processImageColors = function () {
                if (this.processingImageColors)
                    return;
                if (this.imagesToCountColors.length <= 0)
                    return;
                this.processingImageColors = true;
                Model.controlsManager.showColorCountDialog();
            };

            SaveLoadManager.prototype.imageColorCountSubmit = function (colorCount) {
                var obj = this.imagesToCountColors.shift();
                if (!obj)
                    return;
                obj.attr({ uploaded: false, colorsNumber: colorCount.colorCount, processColors: colorCount.processColors });
                this.model.dispatchEvent(new DEJS.Events.Event(DEEvents.DESIGNER_CHANGED_EVENT, this));
                this.processingImageColors = false;
                this.processImageColors();
            };
            return SaveLoadManager;
        })();
        Model.SaveLoadManager = SaveLoadManager;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="DEModel.ts"/>
    (function (Model) {
        var ProductManager = (function () {
            function ProductManager(model) {
                this.currentProduct = null;
                this.currentProductColor = null;
                this.currentProductSize = null;
                this.currentProductVariation = null;
                this.currentVariatedProduct = null;
                this.currentTemplate = "";
                this.model = model;
            }
            ProductManager.prototype.setProduct = function (id, resetQuantity, forceLoad, suppressLoadTemplate) {
                if (typeof resetQuantity === "undefined") { resetQuantity = false; }
                if (typeof forceLoad === "undefined") { forceLoad = false; }
                if (typeof suppressLoadTemplate === "undefined") { suppressLoadTemplate = false; }
                if (this.currentProduct && this.currentProduct.id == id && !forceLoad)
                    return;
                this.currentProduct = Model.configManager.getProductById(id);
                if (!this.currentProduct) {
                    alert("Wrong product ID.");
                    return;
                }

                //Product Variation
                this.currentProductVariation = this.currentProduct.getVariation(this.currentProductVariation ? this.currentProductVariation.id : "");
                if (!this.currentProductVariation && this.currentProduct.variations.length > 0) {
                    this.currentProductVariation = this.currentProduct.variations[0];
                }
                this.currentVariatedProduct = this.currentProduct.toVariatedProduct(this.currentProductVariation);

                //Product Color
                if (this.currentVariatedProduct.multicolor) {
                    this.currentProductColor = new DEJS.VO.ComplexColorVO({});
                    this.currentProductColor.colorizeList = this.currentVariatedProduct.exportColorizeList();
                    this.currentProductColor.colorizeGroupList = this.currentVariatedProduct.exportColorizeGroupsList();
                } else {
                    this.currentProductColor = this.currentVariatedProduct.getColor(this.currentProductColor ? this.currentProductColor.value : "");
                    if (!this.currentProductColor && this.currentProduct.colors.length > 0) {
                        this.currentProductColor = this.currentProduct.colors[0];
                    }
                }

                //Product Location
                var productLocation = "";
                if (this.currentProduct.locations.length > 0) {
                    productLocation = this.currentVariatedProduct.locations[0].name;

                    //ProductSize
                    var areaUnits = this.currentVariatedProduct.locations[0].editableAreaUnits;
                    if (!forceLoad) {
                        // we are not loading design, so create fresh new
                        this.currentProductSize = new DEJS.VO.ProductCanvasSizeVO({});
                    }
                    if (!forceLoad && areaUnits.length == 2) {
                        //set default product size
                        this.currentProductSize.width = areaUnits[0];
                        this.currentProductSize.height = areaUnits[1];
                    } else if (!forceLoad && this.currentVariatedProduct.editableAreaSizes.length > 0) {
                        //if no default area size but area sizes list
                        if (!this.currentProductSize)
                            this.currentProductSize = new DEJS.VO.ProductCanvasSizeVO({});

                        this.currentProductSize.width = this.currentVariatedProduct.editableAreaSizes[0].width;
                        this.currentProductSize.height = this.currentVariatedProduct.editableAreaSizes[0].height;
                        this.currentProductSize.label = this.currentVariatedProduct.editableAreaSizes[0].label;
                    } else {
                        //set loaded product size. we have only 1 location
                        if (this.currentProductSize) {
                            this.currentVariatedProduct.locations[0].editableAreaUnits = [this.currentProductSize.width, this.currentProductSize.height];
                        }
                    }
                }

                Model.controlsManager.setSelectedProduct(this.currentVariatedProduct);

                //controlsManager.setSelectedProductVariation(this.currentProductVariation);//VCGLL
                Model.controlsManager.setSelectedProductLocation(productLocation);
                Model.controlsManager.setSelectedProductColor(this.currentProductColor);
                if (this.currentProductSize)
                    Model.controlsManager.setSelectedProductSize(this.currentProductSize);

                Model.canvasManager.setProductLocation(productLocation, true);
                Model.canvasManager.setProductColor(this.currentProductColor, true);
                if (this.currentProductSize)
                    Model.canvasManager.setProductSize(this.currentProductSize, true);
                Model.canvasManager.setProduct(this.currentVariatedProduct);
                Model.canvasManager.printingAreaVisible(!this.currentVariatedProduct.hideEditableAreaBorder);
                if (this.currentVariatedProduct.template != this.currentTemplate) {
                    this.currentTemplate = this.currentVariatedProduct.template;
                    if (!suppressLoadTemplate) {
                        Model.canvasManager.clearDesign();
                    }
                    if (this.currentVariatedProduct.template) {
                        Model.controlsManager.setStrictTemplate(true);
                        if (!suppressLoadTemplate) {
                            Model.saveLoadManager.loadDesign(this.currentVariatedProduct.template, true, true);
                        }
                    } else {
                        Model.controlsManager.setStrictTemplate(false);
                    }
                }

                /*if (this.currentProductVariation) {//VCGLL
                this.setProductVariation(this.currentProductVariation.id, true);
                }*/
                //Reset quantity
                if (resetQuantity) {
                    var quantity = {};
                    quantity.size = this.currentVariatedProduct.sizes[0];
                    if (this.currentProductVariation) {
                        quantity.quantity = Math.max(this.currentProductVariation.minQuantity, 1);
                    } else {
                        quantity.quantity = 1;
                    }
                    Model.controlsManager.setQuantities([quantity]);
                    Model.orderManager.setQuantities([quantity]);
                }
            };

            //VCGLL
            /*setProductVariation(id: string, force?: boolean = false, suppressDesignLoad?: boolean = false) {
            if (this.currentProduct) {
            if (!force && this.currentProductVariation && this.currentProductVariation.id == id) return;
            this.currentProductVariation = this.currentProduct.getVariation(id);
            this.currentVariatedProduct = this.currentProduct.toVariatedProduct(this.currentProductVariation);
            configManager.setProductVariation(this.currentProductVariation);
            canvasManager.setProductVariation(this.currentProductVariation);
            orderManager.setProductVariation(this.currentProductVariation, suppressDesignLoad);
            } else {
            this.currentProductVariation = null;
            configManager.setProductVariation(null);
            canvasManager.setProductVariation(null);
            orderManager.setProductVariation(null);
            }
            }*/
            ProductManager.prototype.setProductColor = function (color) {
                if (this.currentProduct) {
                    if (this.currentProduct.multicolor)
                        return;
                    this.currentProductColor = this.currentProduct.getColor(color);
                    Model.canvasManager.setProductColor(this.currentProductColor);
                    Model.controlsManager.setSelectedProductColor(this.currentProductColor);
                } else {
                    Model.canvasManager.setProductColor(null);
                }
                Model.orderManager.onProductColorChanged();
            };

            ProductManager.prototype.setProductColorVO = function (colorVO) {
                this.currentProductColor = colorVO;
                Model.controlsManager.setSelectedProductColor(this.currentProductColor);
                Model.orderManager.onProductColorChanged();
                Model.historyManager.saveStatus(true);
            };

            ProductManager.prototype.setProductColorize = function (colorizeList) {
                if (this.currentProduct) {
                    if (!this.currentProduct.multicolor || !colorizeList.length)
                        return;
                    Model.canvasManager.setProductColorizeList(colorizeList);
                } else {
                    Model.canvasManager.setProductColor(null);
                }
                Model.orderManager.onProductColorChanged();
            };

            ProductManager.prototype.setProductSize = function (size) {
                if (this.currentProduct && this.currentProduct.resizable) {
                    Model.canvasManager.setProductSize(size);
                }
            };

            ProductManager.prototype.setDesign = function (design) {
                DEJS.debug("product set design");
                if (!design.product)
                    return;
                this.currentProduct = design.product;
                this.currentProductVariation = design.productVariation;
                if (design.productColor) {
                    this.currentProductColor = design.productColor;
                } else {
                    this.currentProductColor = null;
                }
                if (design.productSize) {
                    this.currentProductSize = design.productSize;
                }
                this.setProduct(this.currentProduct.id, false, true, true);

                /* No more same code
                this.currentVariatedProduct = this.currentProduct.toVariatedProduct(this.currentProductVariation);
                controlsManager.setSelectedProduct(this.currentVariatedProduct);
                if (design.productColor) {
                this.currentProductColor = design.productColor;
                } else {
                this.currentProductColor = null;
                }
                controlsManager.setSelectedProductColor(this.currentProductColor);
                if (this.currentVariatedProduct.locations.length > 0) {
                controlsManager.setSelectedProductLocation(this.currentVariatedProduct.locations[0].name);
                }*/
                /*if (this.currentProductVariation) {   //VCGLL
                this.setProductVariation(this.currentProductVariation.id, true, true);
                } else {
                this.setProductVariation("", true, true);
                }*/
                if (design.quantities) {
                    Model.controlsManager.setQuantities(design.quantities);
                }
            };
            return ProductManager;
        })();
        Model.ProductManager = ProductManager;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    (function (Effects) {
        var VectorEffect = (function () {
            function VectorEffect() {
                this.paths = [];
                this.pathMetric = new PathsMetric();
            }
            /**
            * Applies a vector effect to paths
            *
            * @param paths A paths array to process
            */
            VectorEffect.prototype.processPaths = function (paths) {
                var values = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    values[_i] = arguments[_i + 1];
                }
                this.paths = paths;
                this.values = values;
                this.pathMetric = DEJS.Util.calcPathsMetric(paths);
                this.bbox = this.pathMetric.bbox;
                this.prepare();
                this.transform();
            };

            VectorEffect.prototype.prepare = function () {
            };

            VectorEffect.prototype.transform = function () {
            };
            return VectorEffect;
        })();
        Effects.VectorEffect = VectorEffect;

        var LettersEffect = (function (_super) {
            __extends(LettersEffect, _super);
            function LettersEffect() {
                _super.apply(this, arguments);
            }
            LettersEffect.prototype.prepare = function () {
            };

            LettersEffect.prototype.transform = function () {
                for (var i = 0; i < this.paths.length; i++) {
                    this.paths[i] = this.transformLetter(this.paths[i]);
                }
            };

            LettersEffect.prototype.transformLetter = function (path) {
                return path;
            };
            return LettersEffect;
        })(VectorEffect);
        Effects.LettersEffect = LettersEffect;

        var PointsEffect = (function (_super) {
            __extends(PointsEffect, _super);
            function PointsEffect() {
                _super.apply(this, arguments);
            }
            PointsEffect.prototype.prepare = function () {
            };

            PointsEffect.prototype.transform = function () {
                for (var i = 0; i < this.paths.length; i++) {
                    var curPath = (this.paths[i]);
                    for (var j = 0; j < curPath.length; j++) {
                        var curve = curPath[j];
                        for (var k = 1; k < curve.length - 1; k += 2) {
                            var x = curve[k];
                            var y = curve[k + 1];
                            var newXY = this.transformPoint(x, y);
                            curve[k] = newXY[0];
                            curve[k + 1] = newXY[1];
                        }
                    }
                }
            };

            PointsEffect.prototype.transformPoint = function (x, y) {
                return [x, y];
            };
            return PointsEffect;
        })(VectorEffect);
        Effects.PointsEffect = PointsEffect;

        var PathsMetric = (function () {
            function PathsMetric() {
                this.bboxes = [];
            }
            return PathsMetric;
        })();
        Effects.PathsMetric = PathsMetric;
    })(DEJS.Effects || (DEJS.Effects = {}));
    var Effects = DEJS.Effects;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    (function (Effects) {
        function isVector(effectName) {
            return (effectName in Effects.VectorEffects);
        }
        Effects.isVector = isVector;

        var ArcUp = (function (_super) {
            __extends(ArcUp, _super);
            function ArcUp() {
                _super.apply(this, arguments);
            }
            ArcUp.prototype.prepare = function () {
                this.value = this.values[0];
                this.value = Math.min(this.value, 360);
                this.value = Math.max(this.value, 0.05);
                this.r = this.bbox.width * 180 / (Math.PI * this.value);
                this.a1 = 90 - (this.value / 2);
                this.a2 = 90 + (this.value / 2);
            };

            ArcUp.prototype.transformLetter = function (path) {
                var pBBox = Raphael.pathBBox(path);
                var sx = (pBBox.x + pBBox.x2) / 2;
                var sy = this.pathMetric.bbox.height;

                var a = (this.a2 - this.a1) * sx / this.bbox.width + this.a1;
                var tx = 0 - this.r * Math.cos(DEJS.Util.toRad(a));
                var ty = 0 - this.r * Math.sin(DEJS.Util.toRad(a));
                path = Raphael.transformPath(path, ["R", "" + (a - 90), "" + sx, "" + sy]);
                path = Raphael.transformPath(path, ["t", "" + (tx - sx), "" + (ty - sy)]);
                return path;
            };
            return ArcUp;
        })(Effects.LettersEffect);

        var ArcDown = (function (_super) {
            __extends(ArcDown, _super);
            function ArcDown() {
                _super.apply(this, arguments);
            }
            ArcDown.prototype.prepare = function () {
                this.value = this.values[0];
                this.value = Math.max(this.value, -360);
                this.value = Math.min(this.value, -0.05);
                this.value = Math.abs(this.value);
                this.r = this.bbox.width * 180 / (Math.PI * this.value);
                this.a1 = 90 - (this.value / 2);
                this.a2 = 90 + (this.value / 2);
            };

            ArcDown.prototype.transformLetter = function (path) {
                var pBBox = Raphael.pathBBox(path);
                var sx = (pBBox.x + pBBox.x2) / 2;
                var sy = 0;

                var a = (this.a2 - this.a1) * sx / this.bbox.width + this.a1;
                var tx = 0 - this.r * Math.cos(DEJS.Util.toRad(a));
                var ty = this.r * Math.sin(DEJS.Util.toRad(a));
                path = Raphael.transformPath(path, ["R", "" + (90 - a), "" + sx, "" + sy]);
                path = Raphael.transformPath(path, ["t", "" + (tx - sx), "" + (ty - sy)]);
                return path;
            };
            return ArcDown;
        })(Effects.LettersEffect);

        var SimpleWave = (function (_super) {
            __extends(SimpleWave, _super);
            function SimpleWave() {
                _super.apply(this, arguments);
            }
            SimpleWave.prototype.transformPoint = function (x, y) {
                var newY = y + this.pathMetric.bbox.height * Math.sin(2 * Math.PI * (x - this.pathMetric.bbox.x) / this.pathMetric.bbox.width + this.values[0] * 2 * Math.PI);
                return [x, newY];
            };
            return SimpleWave;
        })(Effects.PointsEffect);

        Effects.VectorEffects = {
            "arcUp": ArcUp,
            "arcDown": ArcDown,
            "simpleWave": SimpleWave
        };
    })(DEJS.Effects || (DEJS.Effects = {}));
    var Effects = DEJS.Effects;
})(DEJS || (DEJS = {}));
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
                var textAlign = "left";
                if (attr["font-weight"] == "bold")
                    weight = "bold";
                if (attr["font-style"] == "italic")
                    style = "italic";
                if ("letterSpacing" in attr)
                    letterSpacing = parseFloat(attr["letterSpacing"]);
                if ("line-leading" in attr)
                    lineLeading = parseFloat(attr["line-leading"]);
                if ("text-align" in attr)
                    textAlign = attr["text-align"];
                var paths = this.formTextPaths(0, 0, attr["text"], this.raphael().getFont(attr["font-family"], weight, style), 32, null, letterSpacing, lineLeading, textAlign);
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
            TextEffectsManager.formTextPaths = function (x, y, textString, font, size, origin, letter_spacing, line_leading, textAlign) {
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
var DEJS;
(function (DEJS) {
    (function (Model) {
        var HistoryManager = (function () {
            function HistoryManager(model) {
                var _this = this;
                this.restoring = false;
                this.modelLocator = model;
                this.storage = HistoryStorage.getInstance();

                this.modelLocator.addEventListener(DEEvents.DESIGNER_CHANGED_EVENT, function (e) {
                    return _this.onChange(e);
                });
            }
            HistoryManager.prototype.getCurrentStatus = function () {
                var current = Model.canvasManager.getCurrentDesignStatus();
                if (Model.productManager.currentVariatedProduct) {
                    current.productId = Model.productManager.currentVariatedProduct.id;
                    if (Model.productManager.currentVariatedProduct.multicolor) {
                    } else {
                        current.productColor = Model.canvasManager.getCurrentProductColor();
                    }
                }
                return current;
            };

            HistoryManager.prototype.onChange = function (e) {
                if (!e.dispatchHistory)
                    return;
                DEJS.debug("HistoryManager :: onChange");
                this.saveStatus();
            };

            HistoryManager.prototype.onUserInteract = function () {
                DEJS.debug("HistoryManager :: onUserInteract");
                this.saveStatus();
            };

            HistoryManager.prototype.saveStatus = function (replace) {
                if (typeof replace === "undefined") { replace = false; }
                if (this.restoring)
                    return;
                var current = this.getCurrentStatus();

                if (replace) {
                    this.storage.replace(current);
                } else {
                    this.storage.add(current);
                }

                Model.controlsManager.setIsUndoActive(this.isUndoActive());
                Model.controlsManager.setIsRedoActive(this.isRedoActive());
            };

            HistoryManager.prototype.restoreStatus = function (restored) {
                this.restoring = true;
                if (restored.productId) {
                    Model.productManager.setProduct(restored.productId, true);
                }
                if (restored.productColor) {
                    Model.canvasManager.setProductColor(Model.productManager.currentVariatedProduct.getColor(restored.productColor));
                }
                Model.canvasManager.setDesignStatus(restored);

                Model.controlsManager.setIsUndoActive(this.isUndoActive());
                Model.controlsManager.setIsRedoActive(this.isRedoActive());
                this.restoring = false;
            };

            HistoryManager.prototype.undo = function () {
                var restored = this.storage.back();
                if (restored == null)
                    return;
                DEJS.debug("HistoryManager :: undo");
                this.restoreStatus(restored);
            };

            HistoryManager.prototype.redo = function () {
                var restored = this.storage.forward();
                if (restored == null)
                    return;
                DEJS.debug("HistoryManager :: redo");
                this.restoreStatus(restored);
            };

            HistoryManager.prototype.isUndoActive = function () {
                return (this.storage.getCurrentIndex() > 0);
            };

            HistoryManager.prototype.isRedoActive = function () {
                return (this.storage.getCurrentIndex() < this.storage.getLength() - 1);
            };
            return HistoryManager;
        })();
        Model.HistoryManager = HistoryManager;

        var HistoryStorage = (function () {
            function HistoryStorage() {
                this.designsList = [];
                this.index = -1;
                if (HistoryStorage.instance != null) {
                    throw new Error('HistoryStorage is a singleton. Please use HistoryStorage.getInstance() instead.');
                }
            }
            HistoryStorage.getInstance = function () {
                if (HistoryStorage.instance == null) {
                    HistoryStorage.instance = new HistoryStorage();
                }

                return HistoryStorage.instance;
            };

            HistoryStorage.prototype.add = function (designStatus) {
                DEJS.debug("HistoryStorage :: add"); //, designSvgs);
                this.designsList = this.designsList.slice(0, this.index + 1);
                var doAdd = true;
                if (this.designsList.length > 0 && (designStatus.timeStamp - this.designsList[this.designsList.length - 1].timeStamp) < DesignStatus.TIMESTAMP_DEDEY) {
                    doAdd = false;
                }
                if (doAdd) {
                    this.designsList.push(designStatus);
                } else {
                    this.designsList[this.designsList.length - 1] = designStatus;
                }
                if (this.designsList.length > HistoryStorage.MAX_LENGTH)
                    this.designsList.shift();
                this.index = this.designsList.length - 1;
            };

            HistoryStorage.prototype.replace = function (designStatus) {
                if (this.designsList.length == 0)
                    this.add(designStatus);
                DEJS.debug("HistoryStorage :: replace"); //, designSvgs);
                this.designsList[this.index] = designStatus;
            };

            HistoryStorage.prototype.forward = function () {
                DEJS.debug("HistoryStorage :: forward");
                if (this.index < this.designsList.length - 1) {
                    return this.designsList[++this.index];
                } else {
                    return null;
                }
            };

            HistoryStorage.prototype.back = function () {
                DEJS.debug("HistoryStorage :: back");
                if (this.index > 0) {
                    return this.designsList[--this.index];
                } else {
                    return null;
                }
            };

            HistoryStorage.prototype.getCurrentIndex = function () {
                return this.index;
            };

            HistoryStorage.prototype.getLength = function () {
                return this.designsList.length;
            };
            HistoryStorage.MAX_LENGTH = 100;
            return HistoryStorage;
        })();

        var DesignStatus = (function () {
            function DesignStatus(svgs, selectedObject) {
                this.timeStamp = new Date().getTime();
                this.productId = "";
                this.productColor = "";
                if (svgs)
                    this.svgs = svgs;
                if (selectedObject)
                    this.selectedObject = selectedObject;
            }
            DesignStatus.TIMESTAMP_DEDEY = 500;
            return DesignStatus;
        })();
        Model.DesignStatus = DesignStatus;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    ///<reference path="../event/Events.ts"/>
    ///<reference path="../VO/VO.ts"/>
    ///<reference path="../VO/ConfigVO.ts"/>
    ///<reference path="CanvasManager.ts"/>
    ///<reference path="ConfigManager.ts"/>
    ///<reference path="ControlsManager.ts"/>
    ///<reference path="StatusManager.ts"/>
    ///<reference path="OrderManager.ts"/>
    ///<reference path="AuthManager.ts"/>
    ///<reference path="SaveLoadManager.ts"/>
    ///<reference path="ProductManager.ts"/>
    ///<reference path="TextEffectsManager.ts"/>
    ///<reference path="HistoryManager.ts"/>
    (function (Model) {
        Model.deDesigner;
        Model.configManager;
        Model.canvasManager;
        Model.controlsManager;
        Model.statusManager;
        Model.orderManager;
        Model.authManager;
        Model.saveLoadManager;
        Model.productManager;
        Model.textEffectsManager;
        Model.fontManager;
        Model.historyManager;

        var DEModel = (function (_super) {
            __extends(DEModel, _super);
            function DEModel() {
                _super.call(this);
                this.inited = false;
                this.width = 0;
                this.height = 0;
                this.defaultDesignId = "";
                this.defaultProductId = "";
                this.defaultGraphicId = "";
                Model.configManager = this.configManager = new Model.ConfigManager(this);
                Model.canvasManager = this.canvasManager = new Model.CanvasManager(this);
                Model.controlsManager = this.controlsManager = new Model.ControlsManager(this);
                Model.statusManager = this.statusManager = new Model.StatusManager(this);
                Model.orderManager = this.orderManager = new Model.OrderManager(this);
                Model.authManager = this.authManager = new Model.AuthManager(this);
                Model.saveLoadManager = this.saveLoadManager = new Model.SaveLoadManager(this);
                Model.productManager = this.productManager = new Model.ProductManager(this);
                Model.textEffectsManager = this.textEffectsManager = new Model.TextEffectsManager(this);
                Model.historyManager = this.historyManager = new Model.HistoryManager(this);
            }
            DEModel.getInstance = function () {
                if (!Model.deDesigner)
                    Model.deDesigner = new DEModel();
                return Model.deDesigner;
            };

            DEModel.prototype.setHolder = function (holder) {
                this.holder = jQuery(holder);
                this.width = this.holder.innerWidth();
                this.height = this.holder.innerHeight();
            };
            DEModel.version = "0.9.5.140901";
            DEModel.buildTimeStamp = "{build_time_stamp____}";
            return DEModel;
        })(DEJS.Events.EventDispatcher);
        Model.DEModel = DEModel;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));
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
///<reference path="designer/DEDesigner.ts"/>
///<reference path="VO/VO.ts"/>
///<reference path="VO/Obj.ts"/>
///<reference path="VO/Quote.ts"/>
///<reference path="lib/jquery.d.ts"/>
///<reference path="event/Events.ts"/>
///<reference path="model/DEModel.ts"/>
//var mobilesafari = /AppleWebKit.*Mobile/.test(navigator.userAgent);
var mobilesafari = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
var DEJS;
(function (DEJS) {
    var DesignerJS = (function () {
        function DesignerJS() {
        }
        /**
        * Inits Designer
        * @param holder HTLMElement to place Designer. Designer will rescpect the holder's size
        * @param configFile configuration file path
        * @param logDiv HTMLElement to place log info
        */
        DesignerJS.prototype.init = function (holder, configFile, modelUpdateHandler, options /*placeOrderHandler?: Function, defaultDesignId: string = ""*/ ) {
            DEJS.debug("DesignerJS ver. " + DEJS.Model.DEModel.version + " (" + DEJS.Model.DEModel.buildTimeStamp + ")");
            this.deMain = new DEMain();
            this.setModelUpdateHandler(modelUpdateHandler);

            if (options && options.placeOrderHandler)
                this.setPlaceOrderHandler(options.placeOrderHandler);

            this.deMain.init(holder, configFile, options);
            return this;
        };

        /*setProductImage(image: string, side?: String) {
        this.deMain.setProductImage(image);
        }
        
        addObject(type: string, value: string, attr?: {[key: string]: any}): VO.Obj {
        return this.deMain.addObject(type, value, attr);
        }
        
        text(text: string, attr?: {}): VO.Obj {
        return this.deMain.addObject(ObjectType.Text, text, attr);
        }
        
        image(url: string, attr?: {}): VO.Obj {
        return this.deMain.addObject(ObjectType.Image, url, attr);
        }
        
        svg(url: string, attr?: {}): VO.Obj {
        return this.deMain.addObject(ObjectType.SVG, url, attr);
        }
        
        graphics(url: string, attr?: {}): VO.Obj {
        return this.deMain.addObject(ObjectType.SVG, url, attr);
        }
        
        removeObject(obj?: VO.Obj): VO.Obj {
        return this.deMain.removeObject(obj);
        }
        
        onSelect(handler: Function) {
        this.deMain.onSelect(handler);
        }
        
        selected(): VO.Obj {
        return this.deMain.selected();
        }
        
        getDesign(options): string {
        return this.deMain.getDesign(options);
        }
        
        setDesign(designXLM?: string): any {
        this.deMain.setDesign(designXLM);
        return this;
        }
        
        getQuote(useDPI: boolean = false) {
        this.deMain.getQuote(useDPI);
        }
        
        printingArea(x1, y1, x2, y2): any {
        this.deMain.printingArea(x1, y1, x2, y2);
        return this;
        }
        
        printingAreaRect(x, y, width, height): any {
        this.printingArea(x, y, x + width, y + height);
        return this;
        }
        
        printingAreaVisible(val?: boolean): any {
        if (val !== undefined) {
        this.deMain.printingAreaVisible(val);
        return this;
        } else {
        return this.deMain.printingAreaVisible();
        }
        }*/
        DesignerJS.prototype.setModelUpdateHandler = function (updateHandler) {
            this.deMain.setModelUpdateHandler(updateHandler);
            return this;
        };

        DesignerJS.prototype.setPlaceOrderHandler = function (handler) {
            this.deMain.setPlaceOrderHandler(handler);
        };

        DesignerJS.prototype.userInteract = function (ui) {
            if (!this.deMain)
                return false;
            this.deMain.userInteract(ui);
            return this;
        };

        DesignerJS.prototype.debug = function () {
            DEJS.debug = DEJS.trueDebug;
        };

        DesignerJS.prototype.magic = function (arg) {
            this.deMain.magic(arg);
        };
        return DesignerJS;
    })();
    DEJS.DesignerJS = DesignerJS;

    var DEMain = (function () {
        function DEMain() {
            var _this = this;
            this.options = new DEJS.VO.DEOptions();
            this.model = DEJS.Model.DEModel.getInstance();
            this.model.addEventListener(DEEvents.CONFIG_LOADED_EVENT, function (options) {
                return _this.onOptionsLoaded(options);
            }); //We do not need this anymore, but I left it as an example
        }
        DEMain.prototype.init = function (holder, configFile, options /*defaultDesignId: string = ""*/ ) {
            if (options) {
                if (options.defaultDesignId && options.defaultDesignId != 'null')
                    this.model.defaultDesignId = options.defaultDesignId;
                if (options.defaultProductId && options.defaultProductId != 'null')
                    this.model.defaultProductId = options.defaultProductId;
                if (options.defaultGraphicId && options.defaultGraphicId != 'null')
                    this.model.defaultGraphicId = options.defaultGraphicId;
            }

            this.model.setHolder(holder);
            this.model.configManager.loadConfig(configFile);
        };

        DEMain.prototype.onOptionsLoaded = function (options) {
            this.options = options;
            this.continueInit();
        };

        DEMain.prototype.continueInit = function () {
            //this.design = new VO.Design();
            //this.controls.controller = this;
            //if (this.options.showControls) designerWidth = this.height;
            /*if (this.options.showControls) {
            this.controlsHolder = jQuery("<div>").appendTo(this.holder);
            this.controls.init(this.controlsHolder);
            }*/
        };

        DEMain.prototype.setOptions = function (options) {
            this.options = this.model.configManager.setOptions(options);
        };

        /*setProductImage(image: string) {
        this.model.canvasManager.setProductImage(image);
        }*/
        DEMain.prototype.addObject = function (type, value, attr) {
            var obj = new DEJS.VO.Obj(type, value);
            obj.defaultAttr = attr;
            return this.addObjectToCanvas(obj);
        };

        DEMain.prototype.removeObject = function (obj) {
            return this.model.canvasManager.removeObject(obj);
        };

        DEMain.prototype.addObjectToCanvas = function (obj) {
            //this.design.objects[this.currentSide].push(obj);
            return this.model.canvasManager.addObjectToCanvas(obj);
        };

        DEMain.prototype.onObjectSelected = function (event) {
            /*if (this.options.showControls)
            this.controls.onObjectSelected(event.obj);*/
            if (this.selectHandler)
                this.selectHandler(event.obj);
        };

        DEMain.prototype.getObjAttr = function (obj) {
            return obj.attr();
        };

        DEMain.prototype.settObjAttr = function (obj, attr) {
            obj.attr(attr);
        };

        /*getInnerSVG(): string {
        var svg: string = this.model.canvasManager.getInnerSVG();
        return svg;
        }*/
        /*getDesign(options?: { [key: string]: any; }): string {
        return this.model.orderManager.getDesign(new VO.DesignOptions(options));
        }
        
        setDesign(design: string) {
        this.model.orderManager.setDesign(design);
        }*/
        DEMain.prototype.onSelect = function (handler) {
            this.selectHandler = handler;
        };

        DEMain.prototype.selected = function () {
            return this.model.canvasManager.selected();
        };

        /*printingArea(x1, y1, x2, y2) {
        this.model.canvasManager.printingArea(x1, y1, x2, y2);
        }
        
        printingAreaVisible(val?: boolean): any {
        return this.model.canvasManager.printingAreaVisible(val);
        }*/
        DEMain.prototype.setModelUpdateHandler = function (updateHandler) {
            this.model.controlsManager.setModelUpdateHandler(updateHandler);
        };

        DEMain.prototype.setPlaceOrderHandler = function (handler) {
            this.model.orderManager.setPlaceOrderHandler(handler);
        };

        DEMain.prototype.userInteract = function (ui) {
            this.model.controlsManager.userInteract(ui);
        };

        DEMain.prototype.magic = function (arg) {
            this.model.canvasManager.magic(arg);
        };
        return DEMain;
    })();
    DEJS.DEMain = DEMain;

    function trueDebug() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        if (window["console"] && console.log) {
            var date = new Date();
            console.log("--- " + date.toTimeString() + " " + date.getMilliseconds() + " ---");
            for (var i = 0; i < args.length; i++) {
                console.log(args[i]);
            }
        }
    }
    DEJS.trueDebug = trueDebug;

    function noDebug() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
    }
    DEJS.noDebug = noDebug;

    DEJS.debug = noDebug;
})(DEJS || (DEJS = {}));
///<reference path="DEDesigner.ts"/>
///<reference path="../Util.ts"/>
var DEJS;
(function (DEJS) {
    var TrackerManager = (function () {
        function TrackerManager(designer) {
            this.trackers = {};
            this.zoom = 100;
            this.lockProportions = true;
            this.designer = designer;
        }
        TrackerManager.prototype.track = function (element, forceRedraw) {
            var _this = this;
            if (typeof forceRedraw === "undefined") { forceRedraw = false; }
            if (element) {
                var tracker = this.trackers[element.id];
                if (!tracker)
                    tracker = this.trackers[element.id] = new Tracker(element, this.designer.canvas, function (action) {
                        return _this.onTrackerMouseDown(action);
                    }, this);
                else
                    tracker.update(forceRedraw);
            } else {
                for (var key in this.trackers) {
                    this.trackers[key].update(forceRedraw);
                }
            }
        };

        TrackerManager.prototype.stopTrack = function (element) {
            if (element) {
                var tracker = this.trackers[element.id];
                if (tracker) {
                    tracker.remove();
                    delete this.trackers[element.id];
                }
            } else {
                this.clear();
            }
        };

        TrackerManager.prototype.clear = function () {
            for (var key in this.trackers) {
                this.trackers[key].remove();
                delete this.trackers[key];
            }
        };

        TrackerManager.prototype.processClick = function (x, y) {
            for (var key in this.trackers) {
                var tracker = this.trackers[key];
                if (tracker.processClick(x, y))
                    return true;
            }
            return false;
        };

        TrackerManager.prototype.setLockProportions = function (lockProportions) {
            if (lockProportions == this.lockProportions)
                return;
            this.lockProportions = lockProportions;
            this.track(null, true);
        };

        TrackerManager.prototype.onTrackerMouseDown = function (action) {
            this.designer.trackerAction(action);
        };

        TrackerManager.prototype.markTracker = function (element) {
            element.node.isTracker = true;
            return element;
        };

        TrackerManager.prototype.setZoom = function (zoom) {
            if (zoom == this.zoom)
                return;
            this.zoom = zoom;
            this.track();
        };
        return TrackerManager;
    })();
    DEJS.TrackerManager = TrackerManager;

    var Tracker = (function () {
        function Tracker(element, canvas, mouseHandler, trackerManager) {
            this.element = element;
            this.canvas = canvas;
            this.mouseHandler = mouseHandler;
            this.trackerManager = trackerManager;
            this.draw();
        }
        Tracker.prototype.draw = function () {
            var obj = this.element.node.objectLink;
            var bbox = DEJS.Util.getBBox(this.element, true);
            this.lastBBox = bbox;

            //TODO: Add this only when we need
            /*this.moveEl = this.canvas.ellipse(x + box.width / 2, y + box.height / 2, 12, 12).attr({
            "stroke": "gray",
            "stroke-opacity": 0.5,
            "fill": "gray",
            "fill-opacity": 0.15
            });
            this.markTracker(this.moveEl);
            this.moveEl.mousedown((event) => this.onTrackerMouseDown(event, Action.Move));
            tracker.push(this.moveEl);*/
            var boxColor = "#494949";
            var padding = 0;
            var x, y;

            //this.box = this.canvas.rect(x - padding, y - padding, bbox.width + padding * 2, bbox.height + padding * 2).attr({ "opacity": 0.7 }).attr({ "stroke": boxColor });
            this.box = this.canvas.rect(bbox.x - padding, bbox.y - padding, bbox.width + padding * 2, bbox.height + padding * 2).attr({ "opacity": 0.7, "stroke": boxColor, "stroke-dasharray": "- " });
            var preloaderSize = Math.min(bbox.width + padding * 2, bbox.height + padding * 2);
            this.preloader = this.canvas.image(DEJS.Model.ConfigManager.imagePreloaderPath(), bbox.x + ((bbox.width + padding * 2) - preloaderSize) / 2, bbox.y + ((bbox.height + padding * 2) - preloaderSize) / 2, preloaderSize, preloaderSize); //.attr({ "opacity": 0.7 });
            this.preloader.hide();
            if (obj && obj.canRotate()) {
                x = this.getTrackerXY(DEJS.Action.Rotate, bbox).x;
                y = this.getTrackerXY(DEJS.Action.Rotate, bbox).y;
                this.rotateEl = this.trackerIcon(x, y, DEJS.Action.Rotate);
            }
            if (obj && obj.canDelete()) {
                x = this.getTrackerXY(DEJS.Action.Delete, bbox).x;
                y = this.getTrackerXY(DEJS.Action.Delete, bbox).y;
                this.deleteEl = this.trackerIcon(x, y, DEJS.Action.Delete);
            }
            if (obj && obj.canResize()) {
                if (!this.trackerManager.lockProportions) {
                    x = this.getTrackerXY(DEJS.Action.ResizeH, bbox).x;
                    y = this.getTrackerXY(DEJS.Action.ResizeH, bbox).y;
                    this.resizeHEl = this.trackerIcon(x, y, DEJS.Action.ResizeH);
                    x = this.getTrackerXY(DEJS.Action.ResizeV, bbox).x;
                    y = this.getTrackerXY(DEJS.Action.ResizeV, bbox).y;
                    this.resizeVEl = this.trackerIcon(x, y, DEJS.Action.ResizeV);
                }
                x = this.getTrackerXY(DEJS.Action.Resize, bbox).x;
                y = this.getTrackerXY(DEJS.Action.Resize, bbox).y;
                this.resizeEl = this.trackerIcon(x, y, DEJS.Action.Resize);
            }
            this.update();
        };

        Tracker.prototype.update = function (forceRedraw) {
            if (typeof forceRedraw === "undefined") { forceRedraw = false; }
            var bbox = DEJS.Util.getBBox(this.element, true);
            if (forceRedraw || (bbox.width != this.lastBBox.width || bbox.height != this.lastBBox.height)) {
                this.remove();
                this.draw();
                return;
            }
            var padding = 0;
            var transform = this.element.transform();
            var matrix = this.element.matrix;

            //var r = this.element.matrix.split().rotate;
            var r = DEJS.Util.getMatrixRotate(matrix, bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);
            var scaleX = DEJS.Util.getMatrixScaleX(matrix);
            var scaleY = DEJS.Util.getMatrixScaleY(matrix);
            var x;
            var y;
            var x2;
            var y2;
            if (this.box) {
                x = this.getTrackerXY("", bbox).x;
                y = this.getTrackerXY("", bbox).y;
                x2 = matrix.x(x, y);
                y2 = matrix.y(x, y);

                var newWidth = bbox.width * Math.abs(scaleX) * this.trackerManager.zoom / 100;
                var newHeight = bbox.height * Math.abs(scaleY) * this.trackerManager.zoom / 100;
                this.box.attr({ x: x2, y: y2, width: newWidth, height: newHeight });
                var ns = 100 / this.trackerManager.zoom;
                this.box.transform("s" + ns + "," + ns + "," + x2 + "," + y2 + "r" + r + "," + x2 + "," + y2);
                if (this.preloader) {
                    var preloaderSize = Math.min(newWidth, newHeight);
                    this.preloader.attr({ x: x2 + (newWidth - preloaderSize) / 2, y: y2 + (newHeight - preloaderSize) / 2, width: preloaderSize, height: preloaderSize });
                    this.preloader.transform("s" + ns + "," + ns + "," + x2 + "," + y2 + "r" + r + "," + x2 + "," + y2);
                    var obj = this.element.node.objectLink;
                    if (obj && obj.showPreloader) {
                        this.preloader.show();
                    } else {
                        this.preloader.hide();
                    }
                }
            }
            if (this.resizeEl) {
                x = this.getTrackerXY(DEJS.Action.Resize, bbox).x;
                y = this.getTrackerXY(DEJS.Action.Resize, bbox).y;
                x2 = matrix.x(x, y);
                y2 = matrix.y(x, y);
                this.resizeEl.transform("t" + (x2 - x) + "," + (y2 - y) + "r" + r);
                DEJS.Util.scaleElement(this.resizeEl, 100 / this.trackerManager.zoom, true);
            }
            if (this.resizeHEl) {
                x = this.getTrackerXY(DEJS.Action.ResizeH, bbox).x;
                y = this.getTrackerXY(DEJS.Action.ResizeH, bbox).y;
                x2 = matrix.x(x, y);
                y2 = matrix.y(x, y);
                this.resizeHEl.transform("t" + (x2 - x) + "," + (y2 - y) + "r" + r);
                DEJS.Util.scaleElement(this.resizeHEl, 100 / this.trackerManager.zoom, true);
            }
            if (this.resizeVEl) {
                x = this.getTrackerXY(DEJS.Action.ResizeV, bbox).x;
                y = this.getTrackerXY(DEJS.Action.ResizeV, bbox).y;
                x2 = matrix.x(x, y);
                y2 = matrix.y(x, y);
                this.resizeVEl.transform("t" + (x2 - x) + "," + (y2 - y) + "r" + r);
                DEJS.Util.scaleElement(this.resizeVEl, 100 / this.trackerManager.zoom, true);
            }
            if (this.rotateEl) {
                x = this.getTrackerXY(DEJS.Action.Rotate, bbox).x;
                y = this.getTrackerXY(DEJS.Action.Rotate, bbox).y;
                x2 = matrix.x(x, y);
                y2 = matrix.y(x, y);
                this.rotateEl.transform("t" + (x2 - x) + "," + (y2 - y) + "r" + r);
                DEJS.Util.scaleElement(this.rotateEl, 100 / this.trackerManager.zoom, true);
            }
            if (this.deleteEl) {
                x = this.getTrackerXY(DEJS.Action.Delete, bbox).x;
                y = this.getTrackerXY(DEJS.Action.Delete, bbox).y;
                x2 = matrix.x(x, y);
                y2 = matrix.y(x, y);
                this.deleteEl.transform("t" + (x2 - x) + "," + (y2 - y) + "r" + r);
                DEJS.Util.scaleElement(this.deleteEl, 100 / this.trackerManager.zoom, true);
            }
            if (this.moveEl) {
                x = this.getTrackerXY(DEJS.Action.Move, bbox).x;
                y = this.getTrackerXY(DEJS.Action.Move, bbox).y;
                x2 = matrix.x(x, y);
                y2 = matrix.y(x, y);
                this.moveEl.transform("t" + (x2 - x) + "," + (y2 - y) + "r" + r);
                DEJS.Util.scaleElement(this.moveEl, 100 / this.trackerManager.zoom, true);
            }
        };

        Tracker.prototype.remove = function () {
            this.box.remove();
            if (this.preloader)
                this.preloader.remove();
            if (this.resizeEl)
                this.resizeEl.remove();
            if (this.resizeHEl)
                this.resizeHEl.remove();
            if (this.resizeVEl)
                this.resizeVEl.remove();
            if (this.rotateEl)
                this.rotateEl.remove();
            if (this.deleteEl)
                this.deleteEl.remove();
            if (this.moveEl)
                this.moveEl.remove();
        };

        Tracker.prototype.trackerIcon = function (x, y, action) {
            var _this = this;
            var w = mobilesafari ? 32 : 21;
            var addName = mobilesafari ? "_32px" : "";
            var element;
            switch (action) {
                case DEJS.Action.Resize:
                    element = this.canvas.image(DEJS.Model.ConfigManager.assetsUrl + "img/tracker/resize" + addName + ".png", x - w / 2, y - w / 2, w, w);
                    break;
                case DEJS.Action.ResizeH:
                    element = this.canvas.image(DEJS.Model.ConfigManager.assetsUrl + "img/tracker/resizeH" + addName + ".png", x - w / 2, y - w / 2, w, w);
                    break;
                case DEJS.Action.ResizeV:
                    element = this.canvas.image(DEJS.Model.ConfigManager.assetsUrl + "img/tracker/resizeV" + addName + ".png", x - w / 2, y - w / 2, w, w);
                    break;
                case DEJS.Action.Rotate:
                    element = this.canvas.image(DEJS.Model.ConfigManager.assetsUrl + "img/tracker/rotate" + addName + ".png", x - w / 2, y - w / 2, w, w);
                    break;
                case DEJS.Action.Delete:
                    element = this.canvas.image(DEJS.Model.ConfigManager.assetsUrl + "img/tracker/delete" + addName + ".png", x - w / 2, y - w / 2, w, w);
                    break;
                default:
                    element = this.canvas.ellipse(x, y, w / 2, w / 2).attr({
                        "stroke-width": 1,
                        "stroke": "grey",
                        "fill": "white"
                    });
                    break;
            }
            element.node.id = "de-tracker-" + action;
            element.attr("cursor", "pointer").mouseover(function () {
                this.attr("fill", "grey");
            }).mouseout(function () {
                this.attr("fill", "white");
            }).mousedown(function (event) {
                return _this.onTrackerMouseDown(event, action);
            }).dblclick(function (dblclickEvent) {
                //this.paper.editor.trackers[0].object.rotate(0, true);
                //this.paper.editor.updateTracker();
            });
            if (mobilesafari) {
                element.node.addEventListener("touchstart", function (event) {
                    return _this.onTrackerMouseDown(event, action);
                }, false);
            }
            this.markTracker(element);
            return element;
        };

        Tracker.prototype.onTrackerMouseDown = function (event, action) {
            if (this.mouseHandler)
                this.mouseHandler(action);
        };

        Tracker.prototype.markTracker = function (element) {
            element.node.isTracker = true;
            return element;
        };

        Tracker.prototype.processClick = function (x, y) {
            if (this.resizeEl && DEJS.Util.isClicked(x, y, this.resizeEl)) {
                this.onTrackerMouseDown(null, DEJS.Action.Resize);
                return true;
            }
            if (this.resizeHEl && DEJS.Util.isClicked(x, y, this.resizeHEl)) {
                this.onTrackerMouseDown(null, DEJS.Action.ResizeH);
                return true;
            }
            if (this.resizeVEl && DEJS.Util.isClicked(x, y, this.resizeVEl)) {
                this.onTrackerMouseDown(null, DEJS.Action.ResizeV);
                return true;
            }
            if (this.rotateEl && DEJS.Util.isClicked(x, y, this.rotateEl)) {
                this.onTrackerMouseDown(null, DEJS.Action.Rotate);
                return true;
            }
            if (this.deleteEl && DEJS.Util.isClicked(x, y, this.deleteEl)) {
                this.onTrackerMouseDown(null, DEJS.Action.Delete);
                return true;
            }
            if (this.moveEl && DEJS.Util.isClicked(x, y, this.moveEl)) {
                this.onTrackerMouseDown(null, DEJS.Action.Move);
                return true;
            }
            return false;
        };

        Tracker.prototype.getTrackerXY = function (action, bbox) {
            var x;
            var y;
            var padding = 0;
            switch (action) {
                case DEJS.Action.Resize:
                    x = bbox.x + bbox.width + padding;
                    y = bbox.y + bbox.height + padding;
                    break;
                case DEJS.Action.ResizeH:
                    x = bbox.x + bbox.width + padding;
                    y = bbox.y + bbox.height / 2;
                    break;
                case DEJS.Action.ResizeV:
                    x = bbox.x + bbox.width / 2;
                    y = bbox.y + bbox.height + padding;
                    break;
                case DEJS.Action.Rotate:
                    x = bbox.x - padding;
                    y = bbox.y + bbox.height + padding;
                    break;
                case DEJS.Action.Delete:
                    x = bbox.x + bbox.width + padding;
                    y = bbox.y - padding;
                    break;
                default:
                    x = bbox.x;
                    y = bbox.y;
                    break;
            }
            var m = this.element.matrix;
            var cx = m.x(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);
            var cy = m.y(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);
            var curRotate = DEJS.Util.getMatrixRotate(m, cx, cy);
            var m2 = Raphael.matrix(1, 0, 0, 1, 0, 0);
            m2.rotate(0 - curRotate, cx, cy);
            m2.add(m.a, m.b, m.c, m.d, m.e, m.f);
            var flipH = m2.a < 0;
            var flipV = m2.d < 0;
            if (flipH)
                x = 2 * bbox.x + bbox.width - x;
            if (flipV)
                y = 2 * bbox.y + bbox.width - y;
            return { x: x, y: y, flipH: flipH, flipV: flipV };
        };
        return Tracker;
    })();
    DEJS.Tracker = Tracker;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    (function (Trial) {
        Trial.TrialWatermark = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="587px"	 height="543px" viewBox="0 0 587 543" enable-background="new 0 0 587 543" xml:space="preserve"><g id="Layer">	<polygon fill="#CC0000" points="470,0 532,0 587,55 587,117 	"/>	<g>		<path fill="#FFFFFF" d="M504.561,13.174l5.748-5.749l-2.068-2.068l1.326-1.326l5.643,5.643L513.883,11l-2.058-2.058l-5.748,5.749			L504.561,13.174z"/>		<path fill="#FFFFFF" d="M513.099,21.712l1.124-3.903l-1.103-1.103l-2.514,2.514l-1.506-1.506l7.074-7.075l3.309,3.309			c1.475,1.475,1.421,3.352,0.106,4.667c-1.241,1.241-2.716,1.124-3.66,0.541l-1.092,4.296L513.099,21.712z M518.052,17.056			c0.583-0.583,0.487-1.4-0.106-1.994l-1.591-1.591l-1.909,1.909l1.591,1.591C516.63,17.564,517.447,17.66,518.052,17.056z"/>		<path fill="#FFFFFF" d="M515.921,24.534l7.074-7.075l1.506,1.506l-7.074,7.075L515.921,24.534z"/>		<path fill="#FFFFFF" d="M523.716,32.329l0.753-1.644l-3.033-3.033l-1.645,0.752l-1.707-1.707l9.8-4.349l1.888,1.888l-4.349,9.8			L523.716,32.329z M527.322,24.799l-4.146,1.941l2.205,2.205L527.322,24.799z"/>		<path fill="#FFFFFF" d="M526.018,34.631l7.074-7.075l1.517,1.517l-5.749,5.749l2.99,2.99l-1.325,1.326L526.018,34.631z"/>		<path fill="#FFFFFF" d="M536.624,45.237l4.179-9.97l0.7,0.7l-3.818,8.973l8.962-3.829l0.7,0.7l-9.97,4.179L536.624,45.237z"/>		<path fill="#FFFFFF" d="M541.313,49.926l7.074-7.075l4.486,4.486l-0.552,0.552l-3.882-3.882l-2.62,2.62l3.808,3.808l-0.551,0.552			l-3.808-3.808l-2.801,2.8l3.882,3.882l-0.551,0.552L541.313,49.926z"/>		<path fill="#FFFFFF" d="M551.441,60.055l0.943-4.911l-1.56-1.56l-2.927,2.928l-0.604-0.604l7.074-7.075l2.641,2.641			c1.22,1.22,1.378,2.927,0.084,4.221c-1.283,1.283-2.896,1.093-3.998,0.075l-0.923,5.017L551.441,60.055z M556.458,55.059			c0.891-0.891,0.891-2.143-0.053-3.086l-1.984-1.984l-3.044,3.044l1.984,1.984C554.305,55.96,555.567,55.95,556.458,55.059z"/>		<path fill="#FFFFFF" d="M554.199,60.818l0.848-0.064c-0.064,0.976,0.169,2.227,1.188,3.246c1.442,1.442,2.663,1.05,3.268,0.446			c2.078-2.079-3.245-5.239-0.774-7.71c1.156-1.156,2.927-0.849,4.21,0.434c1.05,1.05,1.485,2.228,1.4,3.395l-0.849,0.042			c0.106-1.124-0.339-2.122-1.134-2.917c-0.944-0.944-2.196-1.114-2.96-0.351c-1.814,1.813,3.425,5.059,0.784,7.7			c-0.912,0.912-2.608,1.401-4.519-0.509C554.495,63.363,554.092,62.005,554.199,60.818z"/>		<path fill="#FFFFFF" d="M559.757,68.37l7.074-7.075l0.604,0.604l-7.074,7.075L559.757,68.37z"/>		<path fill="#FFFFFF" d="M565.389,66.938c2.068-2.068,5.017-2.302,7.095-0.224c2.068,2.068,1.847,5.029-0.222,7.097			c-2.067,2.068-5.028,2.29-7.097,0.222C563.087,71.955,563.321,69.007,565.389,66.938z M571.625,73.175			c1.793-1.792,2.005-4.211,0.308-5.908c-1.707-1.707-4.115-1.485-5.908,0.308c-1.781,1.782-2.015,4.201-0.308,5.908			C567.414,75.179,569.844,74.957,571.625,73.175z"/>		<path fill="#FFFFFF" d="M575.284,83.897l1.622-10.533l-6.077,6.078l-0.604-0.604l7.074-7.075l0.615,0.615l-1.559,10.426			l5.992-5.993l0.604,0.604l-7.074,7.075L575.284,83.897z"/>	</g>	<g opacity="0.15">		<path d="M88.701,103.649l36.314-36.314l7.785,7.785l-29.509,29.509l15.353,15.353l-6.806,6.806L88.701,103.649z"/>		<path d="M117.068,132.016l36.314-36.314l7.73,7.73l-36.314,36.314L117.068,132.016z"/>		<path d="M142.167,157.114l22.323-50.306l8.765,8.765l-17.802,37.949l37.947-17.804l8.765,8.765l-50.306,22.323L142.167,157.114z"			/>		<path d="M169.227,184.175l36.314-36.314l25.697,25.697l-6.806,6.806l-17.967-17.967l-7.622,7.622l17.586,17.586l-6.806,6.806			l-17.586-17.586l-8.275,8.275l17.967,17.967l-6.806,6.806L169.227,184.175z"/>		<path d="M226.068,241.016l3.865-8.439l-15.571-15.571l-8.439,3.865l-8.765-8.765l50.306-22.323l9.692,9.692l-22.322,50.306			L226.068,241.016z M244.58,202.36l-21.288,9.963l11.324,11.324L244.58,202.36z"/>		<path d="M258.736,273.684l5.771-20.036l-5.662-5.661l-12.903,12.903l-7.731-7.731l36.315-36.314l16.986,16.987			c7.567,7.567,7.296,17.205,0.545,23.956c-6.37,6.37-13.938,5.771-18.783,2.776l-5.609,22.05L258.736,273.684z M284.162,249.782			c2.994-2.994,2.504-7.187-0.545-10.235l-8.166-8.166l-9.8,9.8l8.167,8.166C276.866,252.396,281.059,252.886,284.162,249.782z"/>		<path d="M281.061,296.008l29.509-29.509l-10.617-10.617l6.806-6.806l28.965,28.965l-6.806,6.806l-10.563-10.563l-29.509,29.509			L281.061,296.008z"/>		<path d="M331.422,346.369l17.259-17.259l-23.03-23.03l-17.259,17.259l-3.104-3.104l36.314-36.314l3.104,3.104l-16.225,16.225			l23.03,23.03l16.225-16.225l3.104,3.104l-36.314,36.314L331.422,346.369z"/>		<path d="M352.819,367.767l33.483-33.483l-11.868-11.868l2.831-2.831l26.895,26.895l-2.831,2.831L389.46,337.44l-33.483,33.483			L352.819,367.767z"/>		<path d="M405.088,420.035l32.395-32.395l-45.625,19.164l-1.197-1.197l19.109-45.68l-32.395,32.395l-3.103-3.103l36.314-36.314			l4.628,4.628l-17.858,42.575l42.521-17.912l4.683,4.683l-36.314,36.314L405.088,420.035z"/>		<path d="M416.523,431.471l36.314-36.314l3.157,3.157l-33.483,33.483l17.586,17.586l-2.831,2.831L416.523,431.471z"/>		<path d="M448.429,452.813h4.137c-0.979,5.662,0.328,10.672,5.01,15.354c5.281,5.281,12.903,5.28,17.857,0.326			c5.499-5.499,5.063-12.685-0.163-17.911c-3.321-3.321-7.241-5.063-12.358-5.282l-1.361-3.32l19.056-19.056l20.961,20.961			l-2.831,2.831l-17.857-17.857l-14.21,14.21c3.538,0.054,8.274,1.524,12.031,5.281c6.098,6.098,7.568,15.625,0.001,23.192			c-7.241,7.241-17.26,6.152-23.956-0.544C448.701,464.955,447.339,458.911,448.429,452.813z"/>	</g></g></svg>';
        function isTrial() {
            return !this["isFull"];
        }
        Trial.isTrial = isTrial;
    })(DEJS.Trial || (DEJS.Trial = {}));
    var Trial = DEJS.Trial;
})(DEJS || (DEJS = {}));
var DEJS;
(function (DEJS) {
    (function (VO) {
        var StyleVO = (function () {
            function StyleVO(css, attr2) {
                this.classList = {};
                this.colorizableList = [];
                this.symbolId = "";
                this.fromString(css, attr2);
            }
            StyleVO.prototype.fromString = function (css, attr2) {
                var colorizableGroups = null;
                if (attr2 && typeof (attr2) == 'string') {
                    this.symbolId = attr2;
                }
                if (attr2 && attr2 instanceof Array) {
                    colorizableGroups = attr2;
                }

                this.classList = {};
                var ruleAr = css.split("}");
                for (var i = 0; i < ruleAr.length; i++) {
                    var ar = ruleAr[i].split("{");
                    if (ar.length >= 2) {
                        var stClass = new StyleClassVO();
                        stClass.name = DEJS.Util.cleanUID(ar[0].trim());
                        var attrAr = ar[1].split(";");
                        for (var j = 0; j < attrAr.length; j++) {
                            var attrParts = attrAr[j].split(":");
                            if (attrParts.length >= 2) {
                                var stAttr = new StyleAttrVO();
                                stAttr.name = attrParts[0].trim();
                                stAttr.value = attrParts[1].trim();
                                stClass.attrList.push(stAttr);
                            }
                        }
                        this.classList[stClass.name] = stClass;
                    }
                }

                if (colorizableGroups) {
                    //override classList for VRJS products
                    //we take classes from json config, style colors from product svg and generate new product styles
                    var classListUpdated = {};
                    for (var i = 0; i < colorizableGroups.length; i++) {
                        for (var j = 0; j < colorizableGroups[i].classes.length; j++) {
                            //classes extracted from
                            var colElement = colorizableGroups[i].classes[j];

                            //to
                            var stClass = new StyleClassVO();

                            var colElementParts = colElement.id.split(".");
                            var colElementAttr = colElementParts.pop();
                            var colElementName = colElementParts.join(".");
                            stClass.name = colElementName;
                            var stAttr = new StyleAttrVO();
                            stAttr.name = colElementAttr;

                            //search for real value
                            var val = "";
                            for (var origStClass in this.classList) {
                                var curStClass = this.classList[origStClass];
                                if (colElement.id.indexOf(curStClass.name) >= 0) {
                                    //TODO: add search
                                    val = curStClass.attrList[0].value;
                                }
                            }
                            stAttr.value = val;
                            stClass.attrList.push(stAttr);

                            classListUpdated[stClass.name] = stClass;
                        }
                    }
                    this.classList = classListUpdated;
                }

                this.processClassList();
            };

            StyleVO.prototype.processClassList = function () {
                this.colorizableList = [];
                for (var key in this.classList) {
                    var stClass = this.classList[key];
                    var fillAttr = DEJS.Util.arrayFind(stClass.attrList, "name", "fill");
                    if (fillAttr) {
                        var fillEl = new ColorizableElementVO();
                        fillEl.className = DEJS.Util.cleanUID(stClass.name);
                        fillEl.attrName = fillAttr.name;
                        fillEl.formId();
                        fillEl.value = fillAttr.value;
                        var fillNameAttr = DEJS.Util.arrayFind(stClass.attrList, "name", "de-fill-name");
                        if (fillNameAttr) {
                            var sAr = fillNameAttr.value.split('"');
                            if (sAr.length > 1)
                                fillEl.name = sAr[1];
                            else
                                fillEl.name = fillNameAttr.value;
                        }
                        this.colorizableList.push(fillEl);
                    }
                    var strokeAttr = DEJS.Util.arrayFind(stClass.attrList, "name", "stroke");
                    if (strokeAttr) {
                        var strokeEl = new ColorizableElementVO();
                        strokeEl.className = DEJS.Util.cleanUID(stClass.name);
                        ;
                        strokeEl.attrName = strokeAttr.name;
                        strokeEl.formId();
                        strokeEl.value = strokeAttr.value;
                        var strokeNameAttr = DEJS.Util.arrayFind(stClass.attrList, "name", "de-stroke-name");
                        if (strokeNameAttr) {
                            var sAr = strokeNameAttr.value.split('"');
                            if (sAr.length > 1)
                                strokeEl.name = sAr[1];
                            else
                                strokeEl.name = strokeNameAttr.value;
                        }
                        this.colorizableList.push(strokeEl);
                    }
                }
            };

            StyleVO.prototype.toString = function () {
                var res = "";
                for (var key in this.classList) {
                    var stClass = this.classList[key];

                    //prefix - symbol id for resolving colorizing same graphics
                    var prefix = "";
                    if (this.symbolId.length > 0 && stClass.name.indexOf(this.symbolId) == -1) {
                        prefix = this.symbolId + " ";
                    }
                    res += prefix + stClass.name + " {";
                    for (var j = 0; j < stClass.attrList.length; j++) {
                        var attr = stClass.attrList[j];
                        res += attr.name + ":" + attr.value + ";";
                    }
                    res += "} ";
                }
                return res;
            };

            StyleVO.prototype.toColorizeArray = function () {
                return DEJS.Util.arrayToObjArray(this.colorizableList);
            };

            StyleVO.prototype.fromColorizeArray = function (ar) {
                for (var i = 0; i < ar.length; i++) {
                    var colorObj = ar[i];
                    if (colorObj.id && colorObj.value) {
                        var colorEl = DEJS.Util.arrayFind(this.colorizableList, "id", colorObj.id);
                        if (colorEl) {
                            colorEl.value = colorObj.value;
                            var stClass = this.classList[colorEl.className];
                            if (stClass) {
                                var attr = DEJS.Util.arrayFind(stClass.attrList, "name", colorEl.attrName);
                                if (attr) {
                                    attr.value = colorEl.value;
                                }
                            }
                        }
                    }
                }
            };
            return StyleVO;
        })();
        VO.StyleVO = StyleVO;

        var StyleClassVO = (function () {
            function StyleClassVO() {
                this.name = "";
                this.attrList = [];
            }
            return StyleClassVO;
        })();
        VO.StyleClassVO = StyleClassVO;

        var StyleAttrVO = (function () {
            function StyleAttrVO() {
                this.name = "";
                this.value = "";
            }
            return StyleAttrVO;
        })();
        VO.StyleAttrVO = StyleAttrVO;

        var ColorizableElementGroupVO = (function () {
            function ColorizableElementGroupVO(obj) {
                if (typeof obj === "undefined") { obj = {}; }
                this.name = "";
                this.classes = [];
                if (obj.name)
                    this.name = obj.name;
                if (obj.classes)
                    this.classes = DEJS.Util.parseArray(obj.classes, ColorizableElementVO);
            }
            ColorizableElementGroupVO.prototype.toObject = function () {
                return this;
            };
            return ColorizableElementGroupVO;
        })();
        VO.ColorizableElementGroupVO = ColorizableElementGroupVO;

        var ColorizableElementVO = (function () {
            function ColorizableElementVO(obj) {
                if (typeof obj === "undefined") { obj = {}; }
                this.id = "";
                this.name = "";
                this.className = "";
                this.attrName = "";
                this.value = "";
                this.colors = [];
                if (obj.id)
                    this.id = obj.id;
                if (obj.name)
                    this.name = obj.name;
                if (obj.className)
                    this.className = obj.className;
                if (obj.attrName)
                    this.attrName = obj.attrName;
                if (obj.value)
                    this.value = obj.value;
                if (obj.colors)
                    this.colors = DEJS.Util.parseArray(obj.colors, VO.ColorVO);
            }
            ColorizableElementVO.prototype.formId = function () {
                this.id = this.className + "." + this.attrName;
            };

            ColorizableElementVO.prototype.toObject = function () {
                return { id: this.id, name: this.name, className: this.className, attrName: this.attrName, value: this.value, colors: DEJS.Util.arrayToObjArray(this.colors) };
            };
            return ColorizableElementVO;
        })();
        VO.ColorizableElementVO = ColorizableElementVO;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));
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
            event.preventDefault();
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
            event.preventDefault();
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
                }
            }
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
            event.preventDefault();
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
            event.preventDefault();
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

        /*disableUserSelect() {
        jQuery("*").css("-webkit-user-select", "none");
        jQuery("*").css("-moz-user-select", "none");
        if (jQuery.browser.msie) {
        jQuery("body").attr("onselectstart", "return false;");
        }
        };*/
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
            /*if (this.loadingSVGBackground) {
            this.colorizeArrayToApply = colorizeArray;
            }*/
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

            /*if (this.loadedSVGBackgroundStyle) {
            this.backgroundStyle.fromColorizeArray(this.loadedSVGBackgroundStyle.toColorizeArray());
            this.loadedSVGBackgroundStyle = null;
            }*/
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

            //var zoomFix = this.canvas.width / (this.canvas.width - rulerSize);
            //var dx = 0 - rulerSize * zoomFix;
            this.viewPort.zoom = zoom;
            var width = this.canvas.width / (zoom / 100);
            var height = this.canvas.height / (zoom / 100);
            this.viewPort.x = (this.canvas.width - (rulerSize / (zoom / 100)) - width) / 2;
            this.viewPort.y = (this.canvas.height - (rulerSize / (zoom / 100)) - height) / 2;
            this.updateViewBox();
            /*if (zoom == 100) {
            this.canvas.setViewBox(0, 0, this.canvas.width, this.canvas.height, false);
            if (this.backgroundCanvas) { this.backgroundCanvas.setViewBox(0, 0, this.canvas.width, this.canvas.height, false); };
            if (this.referenceEl) { this.referenceEl.attr({ x: 0, y: (this.canvas.height - this.options.referenceShift) }); }
            } else {
            var width = this.canvas.width / (zoom / 100);
            var height = this.canvas.height / (zoom / 100);
            this.dragX = (this.canvas.width - width) / 2;
            this.dragY = (this.canvas.height - height) / 2;
            this.canvas.setViewBox(this.dragX, this.dragY, width, height, false);
            if (this.backgroundCanvas) { this.backgroundCanvas.setViewBox(this.dragX, this.dragY, width, height, false); };
            if (this.referenceEl) { this.referenceEl.attr({ x: this.dragX, y: (this.dragY + height - this.options.referenceShift) }); }
            }*/
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
    })(DEJS.Action || (DEJS.Action = {}));
    var Action = DEJS.Action;

    (function (ResizeKind) {
        ResizeKind.Both = "both";
        ResizeKind.Horizontal = "horizontal";
        ResizeKind.Vertical = "vertical";
    })(DEJS.ResizeKind || (DEJS.ResizeKind = {}));
    var ResizeKind = DEJS.ResizeKind;
})(DEJS || (DEJS = {}));
///<reference path="DEDesigner.ts"/>
///<reference path="../Util.ts"/>
var DEJS;
(function (DEJS) {
    var RulerManager = (function () {
        function RulerManager(designer) {
            this.printAreaCoord = [0, 0, 0, 0];
            this.printAreaUnits = [0, 0];
            this.locPrintAreaCoord = [0, 0, 0, 0];
            this.locPrintAreaUnits = [0, 0];
            this.locUnit = "";
            this.width = 0;
            this.height = 0;
            this.viewPort = { x: 0, y: 0, zoom: 100 };
            this.rulerSize = 17;
            this.designer = designer;
        }
        RulerManager.prototype.showRuler = function () {
            //calculating marks step - same for both
            this.calcLocValues();
            if (this.locPrintAreaUnits[0] >= this.locPrintAreaUnits[1]) {
                var marksIntervals = calculateMarksSpacing(this.locPrintAreaCoord[0], this.locPrintAreaCoord[2], this.locPrintAreaUnits[0]);
            } else {
                var marksIntervals = calculateMarksSpacing(this.locPrintAreaCoord[1], this.locPrintAreaCoord[3], this.locPrintAreaUnits[1]);
            }

            //draw vertical ruler
            var verticalRuler = jQuery('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" ></svg>').attr({ width: "15", height: this.height });
            var verticalBar = drawRulerBar(this.height, this.locPrintAreaCoord[1], this.locPrintAreaCoord[3], this.locPrintAreaUnits[1], marksIntervals);

            //'rotating' horizontal bar
            verticalBar.attr({ transform: "rotate(90, 7.5, 7.5) translate(0.5, -0.5)" });
            verticalBar.find("path").attr({ transform: "scale(1, -1) translate(0, -15)" });
            verticalBar.find("text").attr({ transform: "rotate(180) translate(5, 5)" });
            verticalBar.find("text").last().attr({ transform: "rotate(180) translate(4, 5)" }).css("text-anchor", "start");
            verticalBar.appendTo(verticalRuler);
            verticalRuler.appendTo(this.rulerHolder);

            //draw horizontal ruler
            var horizontalRuler = jQuery('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" ></svg>').attr({ width: this.width, height: "15" }).css({ "position": "absolute", "left": "0", "top": "0" });
            var horizontalBar = drawRulerBar(this.width, this.locPrintAreaCoord[0], this.locPrintAreaCoord[2], this.locPrintAreaUnits[0], marksIntervals, this.locUnit);
            horizontalBar.appendTo(horizontalRuler);
            horizontalRuler.appendTo(this.rulerHolder);

            //Hack - http://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
            jQuery(this.rulerHolder).html(jQuery(this.rulerHolder).html());

            //
            function calculateMarksSpacing(rulerStart, rulerEnd, widthUnit) {
                //ruler width in px
                var widthPx = rulerEnd - rulerStart;

                //quantity of main marks with labels
                var majorMarksCount = Math.floor(widthPx / 80);

                //delta of main marks labels
                var majorMarksIntervalUnits = Math.round(widthUnit / majorMarksCount);

                //correcting majorMarksIntervalUnits
                var p = majorMarksIntervalUnits.toString().length;
                var k = Math.pow(10, p - 1);
                var m = Math.round(majorMarksIntervalUnits / k);
                if (m >= 8) {
                    m = 8;
                } else if (m < 8 && m >= 5) {
                    m = 5;
                } else if (m < 5 && m >= 4) {
                    m = 4;
                } else if (m < 4 && m >= 2) {
                    m = 2;
                } else {
                    m = 1;
                }
                majorMarksIntervalUnits = m * k;

                //interval between marks
                var majorMarksIntervalPx = (widthPx / widthUnit) * majorMarksIntervalUnits;
                var minorMarksIntervalPx = majorMarksIntervalPx / 4;

                return {
                    majorPx: majorMarksIntervalPx,
                    minorPx: minorMarksIntervalPx,
                    majorUnits: majorMarksIntervalUnits
                };
            }

            function drawRulerBar(barWidth, rulerStart, rulerEnd, widthUnit, marksIntervals, unitLabel) {
                //1. create parent node
                //2. draw bg
                //3. calculate labels and marks position in loop
                //4. calculate last label and mark position
                //5. draw marks
                //6. draw labels
                //1. create g for ruler
                var g = jQuery('<g></g>');

                //2. background
                var hbg = jQuery('<rect x="0" y="0" height="15" fill="#ffffff"></rect>');
                hbg.attr({ width: barWidth });
                g.append(hbg);

                //3. marks + labels calculations
                //path data, main bottom line
                var d = "M" + rulerStart + ",14.5H" + rulerEnd;

                //labels
                var labels = new Array();

                var position = rulerStart;
                var counter = 0;
                while (position < rulerEnd) {
                    //major mark line
                    d += "M" + position + ",0V15";

                    for (var j = 1; j <= 3; j++) {
                        var nextMinorMark = position + marksIntervals.minorPx * j;
                        if (nextMinorMark < rulerEnd) {
                            //middle submark - higher
                            var ystart = j == 2 ? 9 : 11;
                            d += "M" + nextMinorMark + "," + ystart + "V15";
                        }
                    }

                    //label and it's pos
                    labels.push(new RulerMarkLabelVO(position + 3, marksIntervals.majorUnits * counter));

                    //remove mark if it overlaps the last mark
                    if (position + 3 + marksIntervals.minorPx >= rulerEnd) {
                        labels.pop();
                    }

                    position += marksIntervals.majorPx;
                    counter++;
                }

                //4. add final mark and label
                d += "M" + rulerEnd + ",0V15";
                labels.push(new RulerMarkLabelVO(rulerEnd + 3, widthUnit));

                //add units label
                if (unitLabel && unitLabel.length > 0) {
                    if (rulerEnd + marksIntervals.majorPx > barWidth) {
                        labels[0].label += " " + unitLabel;
                    } else {
                        labels[labels.length - 1].label += " " + unitLabel;
                    }
                }

                //5. svg marks node
                var hmarks = jQuery('<path fill="none" stroke="#a9a9a9" shape-rendering="crispEdges"></path>');
                hmarks.attr({ d: d });
                g.append(hmarks);

                //6. svg labels group
                var group = jQuery('<g transform="translate(0,11)" style="font-size: 10px; font-family: Arial; fill: #222;"></g>');
                for (var i = 0; i < labels.length; i++) {
                    //wrap text in g for easy rotation
                    var tg = jQuery('<g></g>').attr({ transform: "translate(" + labels[i].x + ",0)" });
                    var t = jQuery('<text></text>').text(labels[i].label);
                    tg.append(t);
                    group.append(tg);

                    //detecting label is out of canvas
                    if (labels[i].x + marksIntervals.minorPx > barWidth) {
                        tg.attr({ transform: "translate(" + (labels[i].x - 6) + ",0)" });
                        t.css("text-anchor", "end");
                    }
                }
                g.append(group);

                return g;
            }
        };

        RulerManager.prototype.setViewPort = function (viewPort) {
            this.viewPort = viewPort;
            if (this.rulerHolder)
                this.rulerHolder.children().remove();
            this.showRuler();
        };

        RulerManager.prototype.calcLocValues = function () {
            var dx = this.rulerSize / (this.viewPort.zoom / 100);
            var width = (this.width + this.rulerSize) / (this.viewPort.zoom / 100);
            var trueZoom = this.width / width * 100;
            var mult = this.designer.options.unitConversionMult;
            this.locPrintAreaCoord[0] = (this.printAreaCoord[0] - this.viewPort.x + dx) * trueZoom / 100;
            this.locPrintAreaCoord[1] = (this.printAreaCoord[1] - this.viewPort.y + dx) * trueZoom / 100;
            this.locPrintAreaCoord[2] = (this.printAreaCoord[2] - this.viewPort.x + dx) * trueZoom / 100;
            this.locPrintAreaCoord[3] = (this.printAreaCoord[3] - this.viewPort.y + dx) * trueZoom / 100;
            if (this.designer.options.unit2 && this.printAreaUnits[0] >= 30 && this.printAreaUnits[1] >= 30) {
                this.locPrintAreaUnits[0] = parseFloat((this.printAreaUnits[0] / mult).toFixed(2));
                this.locPrintAreaUnits[1] = parseFloat((this.printAreaUnits[1] / mult).toFixed(2));
                this.locUnit = this.designer.options.unit2;
            } else {
                this.locPrintAreaUnits[0] = this.printAreaUnits[0];
                this.locPrintAreaUnits[1] = this.printAreaUnits[1];
                this.locUnit = this.designer.options.unit;
            }
        };
        return RulerManager;
    })();
    DEJS.RulerManager = RulerManager;

    var RulerMarkLabelVO = (function () {
        function RulerMarkLabelVO(x, label) {
            this.x = x;
            this.label = label.toString();
        }
        return RulerMarkLabelVO;
    })();
    DEJS.RulerMarkLabelVO = RulerMarkLabelVO;
})(DEJS || (DEJS = {}));
///<reference path="DEMain.ts"/>
var designer = new DEJS.DesignerJS();

var NNViewModel = (function () {
    function NNViewModel() {
    }
    // add properties requerd for nnSynhronizer
    NNViewModel.extend = function (model) {
        var extendedModel = model;

        extendedModel.namesNumberSizeQuantities = ko.computed(function () {
            var results = new Array();

            ko.utils.arrayForEach(model.namesNumbers(), function (nameNumber) {
                var sizeName = nameNumber.size();

                //try find exists SizeQuantityVO in results;
                var sizeQuantity = ko.utils.arrayFirst(results, function (sq) {
                    return sq.size() == sizeName;
                });
                if (sizeQuantity == null) {
                    sizeQuantity = new SizeQuantityVO(nameNumber.size(), 0);
                    results.push(sizeQuantity);
                }

                sizeQuantity.quantity(sizeQuantity.quantity() + 1);
            });

            return results;
        }); // end of namesNumberSizeQuantities

        return extendedModel;
    };
    return NNViewModel;
})();
/// <reference path="../DE.d.ts" />
/// <reference path="NNViewModel.ts" />
/** Helper to work with NameNumbers lines and Quantity Lines in */
var NNHelper = (function () {
    function NNHelper(model) {
        this.model = model;
    }
    NNHelper.prototype.findSizeLineByName = function (sizeName, addIfNotExists) {
        if (typeof addIfNotExists === "undefined") { addIfNotExists = false; }
        var sizeLine = ko.utils.arrayFirst(this.model.quantities(), function (l) {
            return l.size() == sizeName;
        });
        if (sizeLine == null && addIfNotExists)
            sizeLine = this.model.addQuantityBaseOnSize(sizeName);
        return sizeLine;
    };

    NNHelper.prototype.findNameNumberQuantityByName = function (sizeName) {
        return ko.utils.arrayFirst(this.model.namesNumberSizeQuantities(), function (q) {
            return q.size() == sizeName;
        });
    };
    return NNHelper;
})();
/// <reference path="../DE.d.ts" />
/// <reference path="../../lib/knockout.d.ts" />
/*
class NNDebugHelper {
model: INameNumberDEControlModel;
constructor(model: INameNumberDEControlModel, trackNamesNumberSizeQuantities:boolean=true) {
this.model = model;
if (trackNamesNumberSizeQuantities) {
this.model.namesNumberSizeQuantities.subscribe((newValue) => {
this.printNameNumberQuantities(newValue);
this.printNamesNumbers();
});
}
}
public printNameNumberQuantities(namesNumberSizeQuantities: SizeQuantityVO[]= null): void  {
if (namesNumberSizeQuantities == null) namesNumberSizeQuantities = this.model.namesNumberSizeQuantities();
console.log("NamesNumberSizeQuantities");
(<any>console).table(ko.utils.arrayMap(namesNumberSizeQuantities ,  (sqVo)=> {
return {
sizeName: sqVo.size().toString(),
quantity: sqVo.quantity()
}
}));
}
public printNamesNumbers(): void {
console.log("namesNumbers");
(<any>console).table(ko.utils.arrayMap(this.model.namesNumbers(), function (nn) {
var obj = nn.toObject();
obj.size=obj.size.toString(); // convert [S]tring to [s]tring
return obj;
}));
}
}*/
/// <reference path="../DE.d.ts" />
/// <reference path="../../lib/knockout.d.ts" />

var NNQuantitySynchronizer = (function () {
    function NNQuantitySynchronizer(model) {
        this.model = NNViewModel.extend(controlsModel); // add additional properties request for NNQuantitySynchronizer
        this.nnHelper = new NNHelper(this.model);
    }
    /***************************  Public ********************************************/
    NNQuantitySynchronizer.prototype.onNameNumberSizeChanged = function (changeNameNumberSize) {
        this.model.namesNumbers.valueHasMutated(); // force update NameNamerQuantity
        var newSizeExist = ("size" in changeNameNumberSize) && changeNameNumberSize.size != null;
        var prevSizeExist = ("prevSize" in changeNameNumberSize) && changeNameNumberSize.prevSize != null;

        //decrease prev quantity
        if (prevSizeExist)
            this.decreasePrevQuantityLine(changeNameNumberSize.prevSize, newSizeExist); // total restriction ignored only on change(newSizeExists), on delete - worked

        if (!newSizeExist)
            return;
        this.increaseOrCreateNewQuantityLine(changeNameNumberSize.size);
    };

    NNQuantitySynchronizer.prototype.onRemovedNameNumberLine = function (removedNNLine) {
        var eventArgs = {
            prevSize: removedNNLine.size(),
            size: null
        };

        this.onNameNumberSizeChanged(eventArgs);
    };

    NNQuantitySynchronizer.prototype.onAddNameNumberLine = function (addedLine) {
        var eventArgs = {
            prevSize: null,
            size: addedLine.size()
        };
        this.onNameNumberSizeChanged(eventArgs);
    };

    NNQuantitySynchronizer.prototype.getMinQuantity = function (quantityLine) {
        var nameNumberMin = 0;
        var nameNumber = this.nnHelper.findNameNumberQuantityByName(quantityLine.size());
        if (nameNumber != null)
            nameNumberMin = nameNumber.quantity();
        return nameNumberMin;
    };

    /**************************   Private ******************************************/
    NNQuantitySynchronizer.prototype.decreasePrevQuantityLine = function (prevNNSizeName, ignoreTotal) {
        var oldLine = this.nnHelper.findSizeLineByName(prevNNSizeName);
        if (oldLine != null)
            this.model.decreaseQuantity(oldLine, null, { ignoreTotal: ignoreTotal, removeZero: true }); // total restriction ignored only on change, on delete - worked
    };

    NNQuantitySynchronizer.prototype.increaseOrCreateNewQuantityLine = function (newSizeName) {
        //find or create new size line
        var newLine = this.nnHelper.findSizeLineByName(newSizeName, true);

        // check if increare required by nameNambers minimum
        var requireIncreaseByNameNambers = this.requireIncreaseByNameNumbers(newSizeName, newLine);
        var requireIncreaseByTotal = this.requireIncreaseByTotal();
        if (requireIncreaseByNameNambers || requireIncreaseByTotal) {
            this.model.increaseQuantity(newLine);
        }
    };

    NNQuantitySynchronizer.prototype.requireIncreaseByNameNumbers = function (newSizeName, quantityLine) {
        var numberSizeQuantity = this.nnHelper.findNameNumberQuantityByName(newSizeName);
        var nnQuantity = numberSizeQuantity.quantity();

        var lineQuantity = quantityLine.quantity();

        return nnQuantity > lineQuantity;
    };

    NNQuantitySynchronizer.prototype.requireIncreaseByTotal = function () {
        var totalQuantity = this.model.totalQuantity();
        var minQuantity = this.model.restrictions().minQuantity();
        return totalQuantity < minQuantity;
    };
    return NNQuantitySynchronizer;
})();
//# sourceMappingURL=DesignerJS.js.map
