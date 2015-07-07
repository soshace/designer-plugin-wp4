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

            var boxColor = "#494949";
            var padding = 0;
            var x, y;

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