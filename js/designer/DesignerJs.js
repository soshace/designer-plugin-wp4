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
        DesignerJS.prototype.init = function (holder, configFile, modelUpdateHandler, options) {

            DEJS.debug("DesignerJS ver. " + DEJS.Model.DEModel.version + " (" + DEJS.Model.DEModel.buildTimeStamp + ")");

            this.deMain = new DEMain();

            this.setModelUpdateHandler(modelUpdateHandler);

            if (options && options.placeOrderHandler)
                this.setPlaceOrderHandler(options.placeOrderHandler);

            this.deMain.init(holder, configFile, options);
            return this;
        };

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
        };

        DEMain.prototype.setOptions = function (options) {
            this.options = this.model.configManager.setOptions(options);
        };

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

        DEMain.prototype.onSelect = function (handler) {
            this.selectHandler = handler;
        };

        DEMain.prototype.selected = function () {
            return this.model.canvasManager.selected();
        };

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