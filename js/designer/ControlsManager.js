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