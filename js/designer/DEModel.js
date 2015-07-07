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