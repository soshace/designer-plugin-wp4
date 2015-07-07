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