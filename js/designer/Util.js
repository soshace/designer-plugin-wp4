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