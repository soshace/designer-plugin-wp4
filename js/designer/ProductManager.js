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