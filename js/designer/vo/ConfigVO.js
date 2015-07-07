var DEJS;
(function (DEJS) {
    ///<reference path="VO.ts"/>
    ///<reference path="../Util.ts"/>
    (function (VO) {
        var ConfigVO = (function () {
            function ConfigVO(config) {
                this.options = new VO.DEOptions();
                this.productCategories = [];
                this.productsList = [];
                this.defaultProductId = "";
                this.defaultDesignId = "";
                this.fonts = [];
                this.colors = [];
                this.graphicsCategories = [];
                this.graphicsList = [];
                this.textEffects = [];
                this.urls = [];
                this.assetsUrl = "assets/";
                this.galleryBaseUrl = "";
                // services
                this.getQuoteUrl = "";
                this.getDesignsUrl = "";
                this.saveDesignUrl = "";
                this.loadDesignUrl = "";
                this.redirectUrl = "";
                this.uploadImageUrl = "";
                this.redirectWindow = "";
                this.shareLinkUrl = "";
                this.textEffectsUrl = "";
                this.defaultNameObjectText = "";
                this.defaultNumberObjectText = "";
                this.defaultProductSize = [];
                if (!config)
                    return;

                //Add Text
                if (config.colors && config.colors.url)
                    this.urls.push({ key: "colors", url: config.colors.url });
                else
                    this.colors = DEJS.Util.parseArray(config.colors, ColorVO);

                //Products
                if (config.productCategoriesList && config.productCategoriesList.url)
                    this.urls.push({ key: "productCategoriesList", url: config.productCategoriesList.url });
                else
                    this.productCategories = DEJS.Util.parseArray(config.productsList, ProductCategoryVO);

                if (config.productsList && config.productsList.url)
                    this.urls.push({ key: "productsList", url: config.productsList.url });
                else
                    this.productsList = DEJS.Util.parseArray(config.productsList, ProductVO);

                this.processProductCategories();

                if (config.defaultProductId)
                    this.defaultProductId = config.defaultProductId;

                if (config.defaultDesignId)
                    this.defaultDesignId = config.defaultDesignId;

                if (config.fonts && config.fonts.url)
                    this.urls.push({ key: "fonts", url: config.fonts.url });
                else
                    this.fonts = DEJS.Util.parseArray(config.fonts, FontVO);

                if (config.textEffects && config.textEffects.config)
                    this.urls.push({ key: "textEffects", url: config.textEffects.config });

                /*else
                 this.textEffects = Util.parseArray(config.textEffects, TextEffectVO);*/
                if (config.textEffects && config.textEffects.url) {
                    this.textEffectsUrl = config.textEffects.url;
                }

                //Images
                if (config.graphicsCategoriesList && config.graphicsCategoriesList.url)
                    this.urls.push({ key: "graphicsCategoriesList", url: config.graphicsCategoriesList.url });
                else
                    this.graphicsCategories = DEJS.Util.parseArray(config.graphicsList, GraphicsCategoryVO);

                if (config.graphicsList && config.graphicsList.url)
                    this.urls.push({ key: "graphicsList", url: config.graphicsList.url });
                else
                    this.graphicsList = DEJS.Util.parseArray(config.graphicsList, GraphicsVO);

                this.processGraphicCategories();

                if (config.assetsUrl) {
                    this.assetsUrl = config.assetsUrl;
                }
                if (config.galleryBaseUrl) {
                    this.galleryBaseUrl = config.galleryBaseUrl;
                }

                if (config.getQuoteUrl) {
                    this.getQuoteUrl = config.getQuoteUrl;
                }
                if (config.getDesignsUrl) {
                    this.getDesignsUrl = config.getDesignsUrl;
                }
                if (config.saveDesignUrl) {
                    this.saveDesignUrl = config.saveDesignUrl;
                }
                if (config.loadDesignUrl) {
                    this.loadDesignUrl = config.loadDesignUrl;
                }
                if (config.redirectUrl) {
                    this.redirectUrl = config.redirectUrl;
                }
                if (config.uploadImageUrl) {
                    this.uploadImageUrl = config.uploadImageUrl;
                }
                if (config.redirectWindow) {
                    this.redirectWindow = config.redirectWindow;
                }
                if (config.shareLinkUrl) {
                    this.shareLinkUrl = config.shareLinkUrl;
                }

                if (config.defaultNameObjectText) {
                    this.defaultNameObjectText = config.defaultNameObjectText;
                }
                if (config.defaultNumberObjectText) {
                    this.defaultNumberObjectText = config.defaultNumberObjectText;
                }

                if (config.defaultProductSize && config.defaultProductSize.length && config.defaultProductSize.length >= 2) {
                    this.defaultProductSize = [];
                    for (var i = 0; i < 4; i++) {
                        this.defaultProductSize[i] = Number(config.defaultProductSize[i]);
                    }
                }

                //Options
                if (config.options)
                    this.options = new VO.DEOptions(config.options);
            }
            ConfigVO.prototype.processProductCategories = function (categories) {
                if (!categories) {
                    categories = this.productCategories;
                }
                for (var i = 0; i < categories.length; i++) {
                    var cat = categories[i];
                    for (var j = 0; j < cat.products.length; j++) {
                        this.productsList.push(cat.products[j]);
                    }
                    this.processProductCategories(cat.categories);
                }
            };

            ConfigVO.prototype.processGraphicCategories = function (categories) {
                if (!categories) {
                    categories = this.graphicsCategories;
                }
                for (var i = 0; i < categories.length; i++) {
                    var cat = categories[i];
                    for (var j = 0; j < cat.graphics.length; j++) {
                        this.graphicsList.push(cat.graphics[j]);
                    }
                    this.processGraphicCategories(cat.categories);
                }
            };

            ConfigVO.prototype.getFont = function (fontFamily) {
                if (!fontFamily)
                    return null;
                var res;
                var i = 0;
                while (i < this.fonts.length && !res) {
                    var fontVO = this.fonts[i];
                    if (fontVO.fontFamily == fontFamily)
                        res = fontVO;
                    i++;
                }
                return res;
            };

            ConfigVO.prototype.getColor = function (color) {
                if (color == null)
                    return null;
                var curColor = DEJS.Util.normColor(color);
                var res;
                var i = 0;
                while (i < this.colors.length && !res) {
                    var colorVO = this.colors[i];
                    if (DEJS.Util.normColor(colorVO.value) == curColor)
                        res = colorVO;
                    i++;
                }
                return res;
            };

            ConfigVO.prototype.getNearestColor = function (color) {
                if (color == null)
                    return null;
                var curColor = DEJS.Util.normColor(color);
                var res;
                var i = 0;
                var distance = 200000;
                while (i < this.colors.length) {
                    var colorVO = this.colors[i];
                    var newDistance = DEJS.Util.colorDistance(color, colorVO.value);
                    if (newDistance < distance) {
                        res = colorVO;
                        distance = newDistance;
                    }
                    if (DEJS.Util.normColor(colorVO.value) == curColor)
                        res = colorVO;
                    i++;
                }
                return res;
            };

            ConfigVO.prototype.getTextEffect = function (name) {
                if (!name)
                    return null;
                var res;
                var i = 0;
                while (i < this.textEffects.length && !res) {
                    var textEffectVO = this.textEffects[i];
                    if (textEffectVO.name == name)
                        res = textEffectVO;
                    i++;
                }
                return res;
            };

            ConfigVO.prototype.toVariatedConfig = function (variation) {
                if (!variation)
                    return this;
                var config = new ConfigVO();
                if (variation.fontsIds)
                    config.fonts = DEJS.Util.arrayFilter(this.fonts, "id", variation.fontsIds);
                else
                    config.fonts = this.fonts;
                if (variation.colorsIds)
                    config.colors = DEJS.Util.arrayFilter(this.colors, "id", variation.colorsIds);
                else
                    config.colors = this.colors;
                config.graphicsCategories = DEJS.Util.parseArray(this.graphicsCategories, VO.GraphicsCategoryVO);
                if (variation.graphicsCategoriesIds) {
                    config.graphicsCategories = DEJS.Util.arrayFilter(config.graphicsCategories, "id", variation.graphicsCategoriesIds);
                }
                if (variation.graphicsIds) {
                    config.graphicsList = DEJS.Util.arrayFilter(this.graphicsList, "id", variation.graphicsIds);
                    for (var i = 0; i < config.graphicsCategories.length; i++) {
                        config.graphicsCategories[i].graphics = DEJS.Util.arrayFilter(config.graphicsCategories[i].graphics, "id", variation.graphicsIds);
                    }
                } else {
                    config.graphicsList = this.graphicsList;
                }

                return config;
            };
            return ConfigVO;
        })();
        VO.ConfigVO = ConfigVO;

        var FontVO = (function () {
            function FontVO(font) {
                this.id = "";
                this.name = "";
                this.fontFamily = "";
                this.ascent = 0;
                this.vector = "";
                this.boldAllowed = true;
                this.italicAllowed = true;
                if (font.id)
                    this.id = font.id;
                if (font.name)
                    this.name = font.name;
                if (font.fontFamily)
                    this.fontFamily = font.fontFamily;
                if (font.ascent)
                    this.ascent = font.ascent;
                if (font.vector)
                    this.vector = font.vector;

                if (typeof (font.boldAllowed) !== 'undefined')
                    this.boldAllowed = font.boldAllowed;
                if (typeof (font.italicAllowed) !== 'undefined')
                    this.italicAllowed = font.italicAllowed;
            }
            return FontVO;
        })();
        VO.FontVO = FontVO;

        var ColorVO = (function () {
            function ColorVO(color) {
                this.id = "";
                this.name = "";
                this.value = "";
                this.locations = [];
                if (color.id)
                    this.id = color.id;
                if (color.name)
                    this.name = color.name;
                if (color.value)
                    this.value = DEJS.Util.normColor(color.value);
                if (color.locations && color.locations.length) {
                    this.locations = [];
                    for (var i = 0; i < color.locations.length; i++) {
                        this.locations.push(new ProductLocationVO(color.locations[i]));
                    }
                }
            }
            ColorVO.prototype.toObject = function () {
                return { id: this.id, name: this.name, value: this.value };
            };
            return ColorVO;
        })();
        VO.ColorVO = ColorVO;

        var ProductCategoryVO = (function () {
            function ProductCategoryVO(category) {
                this.id = "";
                this.name = "";
                this.thumbUrl = "";
                this.products = [];
                this.categories = [];
                if (category.id)
                    this.id = category.id;
                if (category.name)
                    this.name = category.name;
                if (category.thumbUrl)
                    this.thumbUrl = category.thumbUrl;
                this.products = DEJS.Util.parseArray(category.products, ProductVO);
                this.categories = DEJS.Util.parseArray(category.categories, ProductCategoryVO);
            }
            ProductCategoryVO.prototype.toObject = function () {
                var obj = { id: this.id, name: this.name, thumbUrl: this.thumbUrl };
                obj.products = DEJS.Util.arrayToObjArray(this.products);
                obj.categories = DEJS.Util.arrayToObjArray(this.categories);
                return obj;
            };
            return ProductCategoryVO;
        })();
        VO.ProductCategoryVO = ProductCategoryVO;

        var ProductVO = (function () {
            function ProductVO(product) {
                this.id = "";
                this.categoryId = "";
                this.name = "";
                this.thumbUrl = "";
                this.description = "";
                this.price = "";
                this.locations = [];
                this.colors = [];
                this.multicolor = false;
                this.resizable = false;
                this.editableAreaSizes = [];
                this.namesNumbersEnabled = false;
                //VCGLL
                //sizes: ProductSizeVO[] = [];
                this.sizes = [];
                this.colorizableElements = [];
                this.colorizableGroups = [];
                this.variations = [];
                this.template = "";
                this.showRuler = false;
                this.hideEditableAreaBorder = false;
                if (!product)
                    return;
                if (product.id)
                    this.id = product.id;
                if (product.categoryId)
                    this.categoryId = product.categoryId;
                if (product.name)
                    this.name = product.name;
                if (product.thumbUrl)
                    this.thumbUrl = product.thumbUrl;
                if (product.description)
                    this.description = product.description;
                if (product.price)
                    this.price = product.price;
                if (product.multicolor)
                    this.multicolor = product.multicolor;
                if (product.resizable)
                    this.resizable = product.resizable;
                if (product.editableAreaSizes)
                    this.editableAreaSizes = DEJS.Util.parseArray(product.editableAreaSizes, ProductCanvasSizeVO);
                if (product.namesNumbersEnabled)
                    this.namesNumbersEnabled = product.namesNumbersEnabled;
                if (product.locations && product.locations.length) {
                    this.locations = [];
                    for (var i = 0; i < product.locations.length; i++) {
                        this.locations.push(new ProductLocationVO(product.locations[i]));
                    }
                }
                if (product.colors && product.colors.length) {
                    this.colors = [];
                    for (var i = 0; i < product.colors.length; i++) {
                        this.colors.push(new ComplexColorVO(product.colors[i]));
                    }
                } else {
                    var allColors = DEJS.Model.configManager.config.colors;
                    if (allColors && allColors.length) {
                        for (var i = 0; i < allColors.length; i++) {
                            this.colors.push(new ComplexColorVO(allColors[i]));
                        }
                    }
                }

                //VCGLL
                //this.sizes = Util.parseArray(product.sizes, VO.ProductSizeVO);
                this.sizes = DEJS.Util.parseArray(product.sizes, String);
                if (product.colorizableElements && product.colorizableElements.length > 0) {
                    if (product.colorizableElements[0].classes) {
                        this.colorizableGroups = DEJS.Util.parseArray(product.colorizableElements, VO.ColorizableElementGroupVO);

                        //populate colorizeList with colors for legacy (colorizing bg engine)
                        this.colorizableElements = [];
                        for (var i = 0; i < this.colorizableGroups.length; i++) {
                            var classes = this.colorizableGroups[i].classes;
                            for (var j = 0; j < classes.length; j++) {
                                this.colorizableElements.push(classes[j]);
                            }
                        }
                    } else {
                        this.colorizableElements = DEJS.Util.parseArray(product.colorizableElements, VO.ColorizableElementVO);
                    }
                }
                if (product.variations)
                    this.variations = DEJS.Util.parseArray(product.variations, ProductVariationVO);
                if (product.template)
                    this.template = product.template;
                if (product.showRuler)
                    this.showRuler = product.showRuler;
                if (product.hideEditableAreaBorder)
                    this.hideEditableAreaBorder = product.hideEditableAreaBorder;
            }
            ProductVO.prototype.getColorLocation = function (color, name) {
                if (color == null)
                    return new VO.ProductLocationVO({});
                var curColor = DEJS.Util.normColor(color);
                var loc;
                if (color != "") {
                    var i = 0;
                    while (i < this.colors.length && !loc) {
                        var colorVO = this.colors[i];
                        if (DEJS.Util.normColor(colorVO.value) == curColor) {
                            if (name)
                                loc = DEJS.Util.arrayFind(colorVO.locations, "name", name);
                            if (!loc && colorVO.locations.length > 0)
                                loc = colorVO.locations[0];
                        }
                        i++;
                    }
                }
                if (!loc && name)
                    loc = DEJS.Util.arrayFind(this.locations, "name", name);
                if (!loc && this.locations.length > 0)
                    loc = this.locations[0];
                if (!loc)
                    loc = new VO.ProductLocationVO({});
                return loc;
            };

            ProductVO.prototype.getColor = function (color) {
                if (color == null)
                    return null;
                var curColor = DEJS.Util.normColor(color);
                var res;
                var i = 0;
                while (i < this.colors.length && !res) {
                    var colorVO = this.colors[i];
                    if (DEJS.Util.normColor(colorVO.value) == curColor)
                        res = colorVO;
                    i++;
                }
                return res;
            };

            ProductVO.prototype.getNearestColor = function (color) {
                if (color == null)
                    return null;
                var curColor = DEJS.Util.normColor(color);
                var res;
                var i = 0;
                var distance = 200000;
                while (i < this.colors.length) {
                    var colorVO = this.colors[i];
                    var newDistance = DEJS.Util.colorDistance(color, colorVO.value);
                    if (newDistance < distance) {
                        res = colorVO;
                        distance = newDistance;
                    }
                    if (DEJS.Util.normColor(colorVO.value) == curColor)
                        res = colorVO;
                    i++;
                }
                return res;
            };

            ProductVO.prototype.getVariation = function (variationId) {
                return DEJS.Util.arrayFind(this.variations, "id", variationId);
            };

            ProductVO.prototype.exportColorizeList = function () {
                var res = [];
                for (var i = 0; i < this.colorizableElements.length; i++) {
                    var colEl = new VO.ColorizableElementVO(this.colorizableElements[i]);
                    if (colEl.colors.length == 0) {
                        colEl.colors = DEJS.Util.parseArray(this.colors, ColorVO);
                    }
                    res.push(colEl);
                }
                return res;
            };

            ProductVO.prototype.exportColorizeGroupsList = function () {
                var res = [];
                for (var i = 0; i < this.colorizableGroups.length; i++) {
                    var colGr = new VO.ColorizableElementGroupVO();
                    colGr.name = this.colorizableGroups[i].name;
                    for (var j = 0; j < this.colorizableGroups[i].classes.length; j++) {
                        var colEl = new VO.ColorizableElementVO(this.colorizableGroups[i].classes[j]);
                        if (colEl.colors.length == 0) {
                            colEl.colors = DEJS.Util.parseArray(this.colors, ColorVO);
                        }
                        colGr.classes.push(colEl);
                    }
                    res.push(colGr);
                }
                return res;
            };

            //A product with same locations count, but empty locations
            ProductVO.prototype.getDumbCopy = function () {
                var product = new ProductVO(this.toObject());
                product.locations = [];
                for (var i = 0; i < this.locations.length; i++) {
                    var location = new ProductLocationVO(this.locations[i]);
                    location.image = "";
                    product.locations.push(location);
                }
                product.id = "dumb"; //See canvasManager.setProduct()
                return product;
            };

            ProductVO.prototype.toObject = function () {
                var obj = {};
                obj.id = this.id;
                obj.categoryId = this.categoryId;
                obj.name = this.name;
                obj.thumbUrl = this.thumbUrl;
                obj.description = this.description;
                obj.price = this.price;
                obj.locations = [];
                for (var i = 0; i < this.locations.length; i++) {
                    var loc = {};
                    loc.name = this.locations[i].name;

                    //add location max and min sizes for resizable products
                    if (this.resizable && this.locations[i].editableAreaUnitsRange && this.locations[i].editableAreaUnitsRange.length > 0) {
                        loc.editableAreaUnitsRange = this.locations[i].editableAreaUnitsRange;
                    }
                    obj.locations.push(loc);
                }
                obj.colors = [];
                for (var i = 0; i < this.colors.length; i++) {
                    obj.colors.push(this.colors[i].toObject());
                }
                obj.multicolor = this.multicolor;
                obj.namesNumbersEnabled = this.namesNumbersEnabled;
                obj.resizable = this.resizable;
                if (this.editableAreaSizes && this.editableAreaSizes.length > 0) {
                    obj.editableAreaSizes = this.editableAreaSizes;
                }
                obj.sizes = this.sizes;

                //VCGLL
                /*for (var i = 0; i < this.sizes.length; i++) {
                 obj.sizes.push(this.sizes[i].toObject());
                 }*/
                obj.colorizableElements = DEJS.Util.arrayToObjArray(this.colorizableElements);
                obj.colorizableGroups = DEJS.Util.arrayToObjArray(this.colorizableGroups);
                obj.variations = DEJS.Util.arrayToObjArray(this.variations);
                return obj;
            };

            ProductVO.prototype.toVariatedProduct = function (variation) {
                return this;
                //VCGLL
                /*if (!variation) return this;
                 var product: ProductVO = new ProductVO(this);
                 if (variation.sizesIds) {
                 product.sizes = Util.arrayFilter(this.sizes, "id", variation.sizesIds);
                 }
                 if (variation.locations) {
                 product.locations = variation.locations;
                 }
                 return product;*/
            };
            return ProductVO;
        })();
        VO.ProductVO = ProductVO;

        var ProductLocationVO = (function () {
            function ProductLocationVO(location) {
                this.name = "";
                this.image = "";
                this.mask = "";
                this.overlayInfo = "";
                this.editableAreaUnits = [];
                this.editableAreaUnitsRange = [];
                this.clipRect = [];
                this.dpu = 0;
                this.dpuX = 1;
                this.dpuY = 1;
                this.rescaleObject = 1;
                if (location.name)
                    this.name = location.name;
                if (location.image)
                    this.image = location.image;
                if (location.mask)
                    this.mask = location.mask;
                if (location.overlayInfo)
                    this.overlayInfo = location.overlayInfo;
                if (location.editableArea && location.editableArea.length && location.editableArea.length >= 4) {
                    this.editableArea = [];
                    for (var i = 0; i < 4; i++) {
                        this.editableArea[i] = Number(location.editableArea[i]);
                    }
                }
                if (location.editableAreaUnits && location.editableAreaUnits.length && location.editableAreaUnits.length >= 2) {
                    this.editableAreaUnits = [];
                    for (var i = 0; i < 2; i++) {
                        this.editableAreaUnits[i] = Number(location.editableAreaUnits[i]);
                    }
                }
                if (location.editableAreaUnitsRange && location.editableAreaUnitsRange && location.editableAreaUnitsRange.length >= 2) {
                    this.editableAreaUnitsRange = [];
                    for (var i = 0; i < 2; i++) {
                        this.editableAreaUnitsRange[i] = [];
                        for (var j = 0; j < location.editableAreaUnitsRange[i].length; j++) {
                            this.editableAreaUnitsRange[i][j] = Number(location.editableAreaUnitsRange[i][j]);
                            if (isNaN(this.editableAreaUnitsRange[i][j]))
                                this.editableAreaUnitsRange[i][j] = 0;
                        }
                    }
                }
                if (location.rescaleObject)
                    this.rescaleObject = location.rescaleObject;
                if (location.clipRect && location.clipRect.length && location.clipRect.length >= 4) {
                    this.clipRect = [];
                    for (var i = 0; i < 4; i++) {
                        this.clipRect[i] = location.clipRect[i];
                    }
                }
                this.extractDPU();
            }
            ProductLocationVO.prototype.extractDPU = function () {
                if (this.editableArea && this.editableArea.length >= 4 && this.editableAreaUnits.length >= 2) {
                    this.dpu = this.dpuX = Math.abs(this.editableArea[0] - this.editableArea[2]) / this.editableAreaUnits[0];
                    this.dpuY = Math.abs(this.editableArea[1] - this.editableArea[3]) / this.editableAreaUnits[1];
                } else {
                    this.dpu = this.dpuX = 1;
                    this.dpuY = 1;
                }
                return this.dpu;
            };

            ProductLocationVO.prototype.toObject = function () {
                var obj = {};
                obj.name = this.name;
                obj.image = this.image;
                obj.mask = this.mask;
                obj.overlayInfo = this.overlayInfo;
                obj.editableArea = this.editableArea;
                obj.editableAreaUnits = this.editableAreaUnits;
                obj.editableAreaUnitsRange = this.editableAreaUnitsRange;
                obj.rescaleObject = this.rescaleObject;
                return obj;
            };
            return ProductLocationVO;
        })();
        VO.ProductLocationVO = ProductLocationVO;

        var ProductCanvasSizeVO = (function () {
            function ProductCanvasSizeVO(size) {
                this.width = 0;
                this.height = 0;
                this.label = "";
                if (size.width)
                    this.width = size.width;
                if (size.height)
                    this.height = size.height;
                if (size.label)
                    this.label = size.label;
            }
            ProductCanvasSizeVO.prototype.toObject = function () {
                var obj = {};
                obj.width = this.width;
                obj.height = this.height;
                if (this.label.length > 0) {
                    obj.label = this.label;
                }
                return obj;
            };
            return ProductCanvasSizeVO;
        })();
        VO.ProductCanvasSizeVO = ProductCanvasSizeVO;

        var ComplexColorVO = (function () {
            function ComplexColorVO(color) {
                this.name = "";
                this.value = "";
                this.locations = [];
                this.colorizeList = [];
                this.colorizeGroupList = [];
                this.colorizeInited = false;
                if (!color)
                    return;
                if (color.name)
                    this.name = color.name;
                if (color.value)
                    this.value = color.value;
                if (color.location && color.location.length) {
                    this.locations = [];
                    for (var i = 0; i < color.location.length; i++) {
                        this.locations.push(new ProductLocationVO(color.location[i]));
                    }
                }
                if (color.locations && color.locations.length) {
                    this.locations = [];
                    for (var i = 0; i < color.locations.length; i++) {
                        this.locations.push(new ProductLocationVO(color.locations[i]));
                    }
                }
                if (color.colorizeList && color.colorizeList.length) {
                    this.colorizeList = [];
                    for (var i = 0; i < color.colorizeList.length; i++) {
                        this.colorizeList.push(new VO.ColorizableElementVO(color.colorizeList[i]));
                    }
                }
                if (color.colorizeGroupList && color.colorizeGroupList.length) {
                    this.colorizeGroupList = [];

                    for (var i = 0; i < color.colorizeGroupList.length; i++) {
                        this.colorizeGroupList.push(new VO.ColorizableElementGroupVO(color.colorizeGroupList[i]));
                    }
                }
            }
            ComplexColorVO.prototype.toObject = function () {
                var obj = { name: this.name, value: this.value };
                if (this.colorizeList.length > 0) {
                    obj.colorizeList = DEJS.Util.arrayToObjArray(this.colorizeList);
                }
                if (this.colorizeGroupList.length > 0) {
                    obj.colorizeGroupList = DEJS.Util.arrayToObjArray(this.colorizeGroupList);
                }
                return obj;
            };

            ComplexColorVO.prototype.equal = function (color) {
                if (!color)
                    return false;
                if (color.value != this.value)
                    return false;
                if (color.colorizeList.length != this.colorizeList.length)
                    return false;
                for (var i = 0; i < color.colorizeList.length; i++) {
                    if (color.colorizeList[i].value != this.colorizeList[i].value)
                        return false;
                }

                //No need to compare groups - colorizeList is based on groups content
                /*if (color.colorizeGroupList.length != this.colorizeGroupList.length) return false;
                 for (var i = 0; i < color.colorizeGroupList.length; i++) {   //TODO: This should work for now, but needs to be rewritten suppa gut.
                 if (color.colorizeGroupList[i].name != this.colorizeGroupList[i].name) return false;
                 }*/
                return true;
            };

            ComplexColorVO.prototype.colorizeByArray = function (colArray) {
                var changed = false;
                for (var i = 0; i < colArray.length; i++) {
                    var colElObj = colArray[i];

                    //legacy
                    if (colElObj.id && colElObj.value) {
                        var colEl = DEJS.Util.arrayFind(this.colorizeList, "id", colElObj.id);
                        if (colEl) {
                            if (colEl.value != colElObj.value) {
                                colEl.value = colElObj.value;
                                changed = true;
                            }
                        }
                    }
                }
                return changed;
            };
            return ComplexColorVO;
        })();
        VO.ComplexColorVO = ComplexColorVO;

        var ProductSizeVO = (function () {
            function ProductSizeVO(size) {
                if (typeof size === "undefined") { size = null; }
                this.id = "";
                this.name = "";
                if (!size)
                    return;
                if (size.id)
                    this.id = size.id;
                if (size.name)
                    this.name = size.name;
            }
            ProductSizeVO.prototype.toObject = function () {
                return { id: this.id, name: this.name };
            };
            return ProductSizeVO;
        })();
        VO.ProductSizeVO = ProductSizeVO;

        var GraphicsCategoryVO = (function () {
            function GraphicsCategoryVO(category) {
                this.id = "";
                this.parentId = "";
                this.name = "";
                this.thumb = "";
                this.graphics = [];
                this.categories = [];
                if (category.id)
                    this.id = category.id;
                if (category.parentId)
                    this.parentId = category.parentId;
                if (category.name)
                    this.name = category.name;
                if (category.thumb)
                    this.thumb = category.thumb;
                if (category.graphicsList) {
                    this.graphics = DEJS.Util.parseArray(category.graphicsList, GraphicsVO);
                } else if (category.graphics) {
                    this.graphics = DEJS.Util.parseArray(category.graphics, GraphicsVO);
                }
                if (category.categories)
                    this.categories = DEJS.Util.parseArray(category.categories, GraphicsCategoryVO);
            }
            GraphicsCategoryVO.prototype.toObject = function () {
                return this;
            };
            return GraphicsCategoryVO;
        })();
        VO.GraphicsCategoryVO = GraphicsCategoryVO;

        var GraphicsVO = (function () {
            function GraphicsVO(graphics) {
                this.id = "";
                this.categoryId = "";
                this.name = "";
                this.description = "";
                this.thumb = "";
                this.image = "";
                this.colorize = false;
                this.multicolor = false;
                this.colorsNum = 0;
                this.colorizableElements = [];
                this.uploaded = false;
                if (!graphics)
                    return;
                if (graphics.id)
                    this.id = graphics.id;
                if (graphics.categoryId)
                    this.categoryId = graphics.categoryId;
                if (graphics.name)
                    this.name = graphics.name;
                if (graphics.description)
                    this.description = graphics.description;
                if (graphics.thumb)
                    this.thumb = graphics.thumb;
                if (graphics.image)
                    this.image = graphics.image;
                if (graphics.colorize)
                    this.colorize = graphics.colorize;
                if (graphics.multicolor)
                    this.multicolor = graphics.multicolor;
                if (graphics.colors)
                    this.colorsNum = Number(graphics.colors);
                if (graphics.colorizableElements)
                    this.colorizableElements = DEJS.Util.parseArray(graphics.colorizableElements, VO.ColorizableElementVO);
                if (graphics.uploaded)
                    this.uploaded = graphics.uploaded;
            }
            return GraphicsVO;
        })();
        VO.GraphicsVO = GraphicsVO;

        var ProductVariationVO = (function () {
            function ProductVariationVO(variation) {
                this.id = "";
                this.name = "";
                this.minQuantity = 0;
                this.addObject = true;
                this.imageUpload = true;
                this.imageGallery = true;
                this.defaultDesign = "";
                if (!variation)
                    return;
                if (variation.id)
                    this.id = variation.id;
                if (variation.name)
                    this.name = variation.name;
                if (variation.format)
                    this.name = variation.format;
                if ("minQuantity" in variation)
                    this.minQuantity = variation.minQuantity;
                if ("addObject" in variation)
                    this.addObject = variation.addObject;
                if ("imageUpload" in variation)
                    this.imageUpload = variation.imageUpload;
                if ("imageGallery" in variation)
                    this.imageGallery = variation.imageGallery;
                if (variation.defaultDesign)
                    this.defaultDesign = variation.defaultDesign;
                if (variation.fontsIds)
                    this.fontsIds = DEJS.Util.parseArray(variation.fontsIds, String, true);
                if (variation.colorsIds)
                    this.colorsIds = DEJS.Util.parseArray(variation.colorsIds, String, true);
                if (variation.backgroundColorsIds)
                    this.backgroundColorsIds = DEJS.Util.parseArray(variation.backgroundColorsIds, String, true);
                if (variation.graphicsCategoriesIds)
                    this.graphicsCategoriesIds = DEJS.Util.parseArray(variation.graphicsCategoriesIds, String, true);
                if (variation.graphicsIds)
                    this.graphicsIds = DEJS.Util.parseArray(variation.graphicsIds, String, true);
                if (variation.sizesIds)
                    this.sizesIds = DEJS.Util.parseArray(variation.sizesIds, String, true);
                if (variation.locations)
                    this.locations = DEJS.Util.parseArray(variation.locations, ProductLocationVO);
            }
            ProductVariationVO.prototype.toRestrictionVO = function () {
                var res = new RestrictionsVO();
                res.minQuantity = this.minQuantity;
                res.addObject = this.addObject;
                res.imageUpload = this.imageUpload;
                res.imageGallery = this.imageGallery;
                return res;
            };

            ProductVariationVO.prototype.toObject = function () {
                return { id: this.id, name: this.name, format: this.name };
            };
            return ProductVariationVO;
        })();
        VO.ProductVariationVO = ProductVariationVO;

        var RestrictionsVO = (function () {
            function RestrictionsVO() {
                this.minQuantity = 0;
                this.addObject = true;
                this.imageUpload = true;
                this.imageGallery = true;
            }
            return RestrictionsVO;
        })();
        VO.RestrictionsVO = RestrictionsVO;

        var TextEffectVO = (function () {
            function TextEffectVO(te) {
                this.name = "";
                this.label = "";
                this.fxName = "";
                this.paramName = "";
                this.paramValName = "d";
                this.min = 0.05;
                this.max = 1;
                this.step = 0.05;
                if (te.name)
                    this.name = te.name;
                if (te.label)
                    this.label = te.label;
                if (te.fxName)
                    this.fxName = te.fxName;
                if (te.paramName)
                    this.paramName = te.paramName;
                if (te.paramValName)
                    this.paramValName = te.paramValName;
                if ("min" in te)
                    this.min = te.min;
                if ("max" in te)
                    this.max = te.max;
                if ("step" in te)
                    this.step = te.step;
                if (!("paramName" in te))
                    this.paramName = this.name;
            }
            TextEffectVO.prototype.toObject = function () {
                return { name: this.name, label: this.label, paramName: this.paramName, min: this.min, max: this.max, step: this.step };
            };
            return TextEffectVO;
        })();
        VO.TextEffectVO = TextEffectVO;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));