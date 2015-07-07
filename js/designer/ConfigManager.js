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