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