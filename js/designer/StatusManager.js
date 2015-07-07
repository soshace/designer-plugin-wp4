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