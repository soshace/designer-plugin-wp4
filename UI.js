﻿﻿﻿
function isNullOrUndefined(val) {
    return (typeof (val) == 'undefined' || val == null);
}

var LetteringVO = function (textString, formatVO) {
    if (isNullOrUndefined(textString)) textString = '';
    if (isNullOrUndefined(formatVO)) formatVO = new TextFormatVO();

    var self = this;
    self.text = ko.observable(textString);
    self.isNames = ko.observable(false);
    self.isNumbers = ko.observable(false);
    self.formatVO = ko.observable(formatVO);
    self.transformation = ko.observable({});

    self.toObject = function () {
        var obj = {};
        obj['text'] = self.text();
        obj['fill'] = self.formatVO().fillColor();
        obj['font-weight'] = self.formatVO().bold() ? "bold" : "normal";
        obj['font-style'] = self.formatVO().italic() ? "italic" : "normal";
        obj['font-family'] = self.formatVO().fontFamily();
        obj['stroke'] = self.formatVO().strokeColor();
        obj['letterSpacing'] = self.formatVO().letterSpacing();
        obj['text-align'] = self.formatVO().textAlign();
        obj['textEffect'] = self.formatVO().textEffect();
        obj['textEffectValue'] = self.formatVO().textEffectValue();
        obj['line-leading'] = self.formatVO().lineLeading();
        obj['font-size'] = self.formatVO().fontSize();
        obj['line-height'] = self.formatVO().lineHeight();
        obj['rotation'] = self.formatVO().rotation();
        return obj;
    };

    self.fromObject = function (obj) {
        if (isNullOrUndefined(obj)) return;

        if (!isNullOrUndefined(obj['text'])) {
            self.text(obj['text']);
        }
        if (!isNullOrUndefined(obj['fill'])) {
            self.formatVO().fillColor(obj['fill']);
        }
        if (!isNullOrUndefined(obj['stroke'])) {
            self.formatVO().strokeColor(obj['stroke']);
        }
        if (!isNullOrUndefined(obj['font-weight'])) {
            self.formatVO().bold(obj['font-weight'] === "bold");
        }
        if (!isNullOrUndefined(obj['font-style'])) {
            self.formatVO().italic(obj['font-style'] === "italic");
        }
        if (!isNullOrUndefined(obj['font-family'])) {
            self.formatVO().fontFamily(obj['font-family']);
        }
        if (!isNullOrUndefined(obj['letterSpacing'])) {
            self.formatVO().letterSpacing(obj['letterSpacing']);
        }
        if (!isNullOrUndefined(obj['text-align'])) {
            self.formatVO().textAlign(obj['text-align']);
        }
        if (!isNullOrUndefined(obj['textEffect'])) {
            self.formatVO().textEffect(obj['textEffect']);
        }
        if (!isNullOrUndefined(obj['textEffectValue'])) {
            self.formatVO().textEffectValue(obj['textEffectValue']);
        }
        if (!isNullOrUndefined(obj['line-leading'])) {
            self.formatVO().lineLeading(obj['line-leading']);
        }

        if (!isNullOrUndefined(obj['font-size'])) {
            self.formatVO().fontSize(obj['font-size']);
        }

        if (!isNullOrUndefined(obj['line-height'])) {
            self.formatVO().lineHeight(obj['line-height']);
        }

        if (!isNullOrUndefined(obj['rotation'])) {
            self.formatVO().rotation(obj['rotation']);
        }

        self.isNames(!isNullOrUndefined(obj['nameObj']));
        self.isNumbers(!isNullOrUndefined(obj['numberObj']));
        if (!isNullOrUndefined(obj['transformation'])) {
            self.transformation(obj['transformation']);
        }
    };
};

var TextFormatVO = function (fontFamily, fillColor, bold, italic, stroke, strokeColor, letterSpacing, textAlign, textEffect, textEffectValue, lineLeading, fontSize, lineHeight, rotation) {
    if (isNullOrUndefined(fontFamily)) fontFamily = '';
    if (isNullOrUndefined(fillColor)) fillColor = '#000000';
    if (isNullOrUndefined(bold)) bold = false;
    if (isNullOrUndefined(italic)) italic = false;
    if (isNullOrUndefined(strokeColor)) strokeColor = 'none';
    if (isNullOrUndefined(letterSpacing)) letterSpacing = '0';
    if (isNullOrUndefined(textAlign)) textAlign = 'left';
    if (isNullOrUndefined(textEffect)) textEffect = 'none';
    if (isNullOrUndefined(textEffectValue)) textEffectValue = "0";
    if (isNullOrUndefined(lineLeading)) lineLeading = 1.2;
    if (isNullOrUndefined(fontSize)) fontSize = 32;
    if (isNullOrUndefined(lineHeight)) lineHeight = 32;
    if (isNullOrUndefined(rotation)) rotation = 0;

    var self = this;
    self.fontFamily = ko.observable(fontFamily);
    self.fillColor = ko.observable(fillColor);
    self.bold = ko.observable(bold);
    self.italic = ko.observable(italic);
    self.strokeColor = ko.observable(strokeColor);
    self.letterSpacing = ko.observable(letterSpacing);
    self.textAlign = ko.observable(textAlign);
    self.textEffect = ko.observable(textEffect);
    self.textEffectValue = ko.observable(textEffectValue);
    self.lineLeading = ko.observable(lineLeading).extend({throttle: 25});
    self.fontSize = ko.observable(fontSize);
    self.lineHeight = ko.observable(lineHeight);
    self.rotation = ko.observable(rotation);

    self.textEffectCombined = ko.computed(function () {
        return self.textEffect() + self.textEffectValue();
    });
};

var TextEffectVO = function (name, label, value, paramName, min, max, step, inverted) {
    if (isNullOrUndefined(name)) name = 'none';
    if (isNullOrUndefined(label)) label = 'None';
    if (isNullOrUndefined(value)) value = 0;
    if (isNullOrUndefined(paramName)) paramName = 'none';
    if (isNullOrUndefined(min)) min = 0.05;
    if (isNullOrUndefined(max)) max = 1;
    if (isNullOrUndefined(step)) step = 0.05;
    if (isNullOrUndefined(inverted)) inverted = false;

    var self = this;
    self.name = ko.observable(name);
    self.label = ko.observable(label);
    self.value = ko.observable(value);
    self.paramName = ko.observable(paramName);
    self.min = ko.observable(min);
    self.max = ko.observable(max);
    self.step = ko.observable(step);
    self.inverted = ko.observable(inverted);
}

var GraphicsCategoryVO = function (obj) {
    if (isNullOrUndefined(obj)) obj = {};
    if (isNullOrUndefined(obj.id)) obj.id = 'graphics-item-' + (new Date().getTime());
    if (isNullOrUndefined(obj.parendId)) obj.parendId = '';
    if (isNullOrUndefined(obj.name)) obj.name = '';
    if (isNullOrUndefined(obj.description)) obj.description = '';
    if (isNullOrUndefined(obj.thumb)) obj.thumb = '';
    if (isNullOrUndefined(obj.graphics)) obj.graphics = [];
    if (isNullOrUndefined(obj.categories)) obj.categories = [];

    var self = this;
    self.id = ko.observable(obj.id);
    self.parendId = ko.observable(obj.parendId);
    self.name = ko.observable(obj.name);
    self.description = ko.observable(obj.description);
    self.thumb = ko.observable(obj.thumb);

    var mappedGraphics = ko.utils.arrayMap(obj.graphics, function (item) {
        return new GraphicsCategoryVO(item);
    });
    self.graphics = ko.observable(mappedGraphics);

    var mappedCategories = ko.utils.arrayMap(obj.categories, function (item) {
        return new GraphicsCategoryVO(item);
    });
    self.categories = ko.observable(mappedCategories);

    self.children = ko.computed(function () {
        if (self.categories().length > 0) {
            return self.categories();
        }
        return self.graphics();
    });

    self.isImage = ko.computed(function () {
        return self.categories().length == 0 && self.graphics().length == 0;
    });

    self.isCategory = ko.computed(function () {
        return !self.isImage();
    });

    self.categoryThumb = ko.computed(function () {
        if (self.isCategory()) return self.thumb();
        return "";
    });

}

var GraphicsFormatVO = function (updateHandler, colorize, fillColor, strokeColor, multicolor, complexColor) {
    if (isNullOrUndefined(colorize)) colorize = false;
    if (isNullOrUndefined(fillColor)) fillColor = '#000000';
    if (isNullOrUndefined(strokeColor)) strokeColor = 'none';
    if (isNullOrUndefined(multicolor)) multicolor = false;

    var self = this;
    self.colorize = ko.observable(colorize);
    self.fillColor = ko.observable(fillColor);
    self.strokeColor = ko.observable(strokeColor);
    self.multicolor = ko.observable(multicolor);
    self.complexColor = ko.observable(new ComplexColorVO(updateHandler));
    self.transformation = ko.observable({});

    self.toObject = function () {
        var obj = {};
        obj.fill = self.fillColor();
        obj.stroke = self.strokeColor();
        return obj;
    }

    self.fromObject = function (obj) {
        if (isNullOrUndefined(obj)) return;

        if (!isNullOrUndefined(obj['stroke'])) {
            self.strokeColor(obj['stroke']);
        } else {
            self.strokeColor("none")
        }
        if (!isNullOrUndefined(obj['fill'])) {
            self.fillColor(obj['fill']);
        }
        if (!isNullOrUndefined(obj['complex-color'])) {
            self.complexColor().fromObject(obj['complex-color']);
        }
        self.colorize(obj['colorize'] ? true : false);
        self.multicolor(obj['multicolor'] ? true : false);

        if (!isNullOrUndefined(obj['transformation'])) {
            self.transformation(obj['transformation']);
        }
    }
}

var ObjectPropertiesVO = function (width, height, lockScale) {
    if (isNullOrUndefined(width)) width = 0;
    if (isNullOrUndefined(height)) height = 0;
    if (isNullOrUndefined(lockScale)) lockScale = true;

    var self = this;
    self.width = ko.observable(width);
    self.height = ko.observable(height);
    self.lockScale = ko.observable(lockScale);
    self.suppressUpdate = false;

    self.toWidthObject = function () {
        var obj = {};
        obj['uwidth'] = self.width();
        obj['lockScale'] = self.lockScale();
        return obj;
    };

    self.toHeightObject = function () {
        var obj = {};
        obj['lockScale'] = self.lockScale();
        obj['uheight'] = self.height();
        return obj;
    };

    self.updateWidth = function (data, event) {
        if (event.keyCode == 13) {
            self.width(jQuery("#text-width").val());
        }
        return true;
    };

    self.updateHeight = function (data, event) {
        if (event.keyCode == 13) {
            self.height(jQuery("#text-height").val());
        }
        return true;
    };

    self.fromObject = function (obj) {
        if (isNullOrUndefined(obj)) {
            self.width(0);
            self.height(0);
            return;
        }
        if (!isNullOrUndefined(obj['uwidth']) && !isNullOrUndefined(obj['uheight'])) {
            self.suppressUpdate = true;
            self.width(obj['uwidth'].toFixed(2));
            self.height(obj['uheight'].toFixed(2));
            self.suppressUpdate = false;
        }
        if (!isNullOrUndefined(obj['lockScale'])) {
            self.lockScale(obj['lockScale']);
        }
    };
}

var ProductVO = function (id, categoryId, name, description, price, colors, locations, sizes, multicolor, namesNumbersEnabled, resizable, editableAreaSizes) {
    if (isNullOrUndefined(id)) id = 'product-' + (new Date().getTime());
    if (isNullOrUndefined(categoryId)) categoryId = 'product-category-' + (new Date().getTime());
    if (isNullOrUndefined(name)) name = '';
    if (isNullOrUndefined(description)) description = '';
    if (isNullOrUndefined(price)) price = '';
    if (isNullOrUndefined(colors)) colors = [];
    if (isNullOrUndefined(locations)) locations = [];
    if (isNullOrUndefined(sizes)) sizes = [];
    if (isNullOrUndefined(multicolor)) multicolor = false;
    if (isNullOrUndefined(namesNumbersEnabled)) namesNumbersEnabled = false;
    if (isNullOrUndefined(resizable)) resizable = false;
    if (isNullOrUndefined(editableAreaSizes)) editableAreaSizes = [];

    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
    self.description = ko.observable(description);
    self.price = ko.observable(price);
    self.categoryId = ko.observable(categoryId);
    self.colors = ko.observableArray(colors);
    self.locations = ko.observableArray(locations);
    self.sizes = ko.observableArray(sizes);
    self.multicolor = ko.observable(multicolor);
    self.namesNumbersEnabled = ko.observable(namesNumbersEnabled);
    self.resizable = ko.observable(resizable);
    self.editableAreaSizes = ko.observableArray(editableAreaSizes);

    self.fromObject = function (obj) {
        if (isNullOrUndefined(obj)) return;

        if (!isNullOrUndefined(obj['name'])) {
            self.name(obj['name']);
        }
        if (!isNullOrUndefined(obj['description'])) {
            self.description(obj['description']);
        }
        if (!isNullOrUndefined(obj['price'])) {
            self.price(obj['price']);
        }
        if (!isNullOrUndefined(obj['categoryId'])) {
            self.categoryId(obj['categoryId']);
        }
        if (!isNullOrUndefined(obj['colors'])) {
            self.colors(obj['colors']);
        }
        if (!isNullOrUndefined(obj['locations'])) {
            self.locations(obj['locations']);
        }
        if (!isNullOrUndefined(obj['sizes'])) {
            self.sizes(obj['sizes']);
        }
        if (!isNullOrUndefined(obj['multicolor'])) {
            self.multicolor(obj['multicolor']);
        }
        if (!isNullOrUndefined(obj['namesNumbersEnabled'])) {
            self.namesNumbersEnabled(obj['namesNumbersEnabled']);
        }
        if (!isNullOrUndefined(obj['resizable'])) {
            self.resizable(obj['resizable']);
        }
        if (!isNullOrUndefined(obj['editableAreaSizes'])) {
            self.editableAreaSizes(obj['editableAreaSizes']);
        } else {
            self.editableAreaSizes([]);
        }
        if (!isNullOrUndefined(obj['id'])) {    //Put it last to not interfere with lib settings
            self.id(obj['id']);
        }
    }
};

var ProductCategoryVO = function (obj) {
    if (isNullOrUndefined(obj)) obj = {};
    if (isNullOrUndefined(obj.id)) id = 'product-category-' + (new Date().getTime());
    if (isNullOrUndefined(obj.name)) name = '';
    var thumbUrl = '';
    if (isNullOrUndefined(obj.thumbUrl)) {
        thumbUrl = '';
    } else {
        thumbUrl = obj.thumbUrl;
    }
    if (isNullOrUndefined(obj.products)) products = [];
    if (isNullOrUndefined(obj.categories)) obj.categories = [];
    if (isNullOrUndefined(obj.obj)) obj.obj = null;

    var self = this;
    self.id = ko.observable(obj.id);
    self.name = ko.observable(obj.name);
    self.thumbUrl = ko.observable(thumbUrl);
    self.obj = ko.observable(obj);

    var mappedProducts = ko.utils.arrayMap(obj.products, function (item) {
        return new ProductCategoryVO(item);
    });

    self.products = ko.observableArray(mappedProducts);

    var mappedCategories = ko.utils.arrayMap(obj.categories, function (item) {
        return new ProductCategoryVO(item);
    });

    self.categories = ko.observableArray(mappedCategories);

    self.children = ko.computed(function () {
        if (self.categories().length > 0) {
            return self.categories();
        }
        return self.products();
    });

    self.isProduct = ko.computed(function () {
        return self.categories().length == 0 && self.products().length == 0;
    });

    self.isCategory = ko.computed(function () {
        return !self.isProduct();
    });

    self.categoryThumb = ko.computed(function () {
        if (self.isCategory()) return self.thumbUrl();
        return "";
    });

};

var ComplexColorVO = function (updateHandler, hexValue, name, colorizeList, colorizeGroupList) {
    if (isNullOrUndefined(hexValue)) hexValue = '#000000';
    if (isNullOrUndefined(name)) name = 'Black';
    if (isNullOrUndefined(colorizeList)) colorizeList = [];
    if (isNullOrUndefined(colorizeGroupList)) colorizeGroupList = [];

    var self = this;
    self.hexValue = ko.observable(hexValue);
    self.name = ko.observable(name);
    //Legacy object
    self.colorizeList = ko.observableArray(colorizeList);
    //Colorizing Groups for products
    self.colorizeGroupList = ko.observableArray(colorizeGroupList);
    self.updateHandler = updateHandler;
    self.suppressUpdate = false;

    self.fromObject = function (obj) {
        if (isNullOrUndefined(obj)) return;

        self.suppressUpdate = true;
        if (!isNullOrUndefined(obj['name'])) {
            self.name(obj['name']);
        }
        if (!isNullOrUndefined(obj['value'])) {
            self.hexValue(obj['value']);
        }

        if (!isNullOrUndefined(obj['colorizeList']) && obj['colorizeList'].length) {
            var colAr = [];
            for (var i = 0; i < obj['colorizeList'].length; i++) {
                var colEl = new ColorizeElementVO(self.updateHandler);
                colEl.fromObject(obj['colorizeList'][i]);
                colAr.push(colEl);
            }
            self.colorizeList(colAr);
        } else {
            self.colorizeList([]);
        }

        if (!isNullOrUndefined(obj['colorizeGroupList']) && obj['colorizeGroupList'].length) {
            var colAr = [];
            for (var i = 0; i < obj['colorizeGroupList'].length; i++) {
                var colEl = new ColorizeElementGroupVO(self.updateHandler);
                colEl.fromObject(obj['colorizeGroupList'][i]);
                colAr.push(colEl);
            }
            self.colorizeGroupList(colAr);
        } else {
            self.colorizeGroupList([]);
        }

        self.suppressUpdate = false;
    }

    self.toColorizeList = function () {
        var res = [];
        //return flat legacy list without groups
        for (var i = 0; i < self.colorizeList().length; i++) {
            var colEl = self.colorizeList()[i];
            res.push({id: colEl.id(), value: colEl.value()});
        }
        for (var i = 0; i < self.colorizeGroupList().length; i++) {
            var colGr = self.colorizeGroupList()[i];
            for (var j = 0; j < colGr.classes().length; j++) {
                var colEl = colGr.classes()[j];
                res.push({id: colEl.id(), value: colEl.value()});
            }
        }
        return res;
    }
};

var ProductSizeVO = function (width, height, label) {
    if (isNullOrUndefined(width)) width = 0;
    if (isNullOrUndefined(height)) height = 0;
    if (isNullOrUndefined(label)) label = "";

    var self = this;
    self.width = ko.observable(width);
    self.height = ko.observable(height);
    self.label = ko.observable(label);

    self.fromObject = function (obj) {
        if (isNullOrUndefined(obj)) return;

        if (!isNullOrUndefined(obj['width'])) {
            self.width(obj['width']);
        }
        if (!isNullOrUndefined(obj['height'])) {
            self.height(obj['height']);
        }
        if (!isNullOrUndefined(obj['editableAreaUnits']) && obj['editableAreaUnits'].length >= 2) {
            self.width(obj['editableAreaUnits'][0]);
            self.height(obj['editableAreaUnits'][1]);
        }
        if (!isNullOrUndefined(obj['label'])) {
            self.label(obj['label']);
        }
    };

    self.notEmpty = ko.computed(function () {
        return (self.width() != 0 && self.height() != 0)
    });
};

var RestrictionsVO = function (root, minQuantity) { // for future refactoring, now stuped hardhoded
    self = this;
    if (isNullOrUndefined(minQuantity)) minQuantity = 0;

    self.minQuantity = ko.observable(minQuantity);
};

var ColorizeElementGroupVO = function (updateHandler, name, classes) {
    if (isNullOrUndefined(name)) name = 'Base';
    if (isNullOrUndefined(classes)) classes = [];

    var self = this;
    self.name = ko.observable(name);
    self.classes = ko.observableArray(classes);
    self.updateHandler = updateHandler;
    self.suppressUpdate = false;

    self.fromObject = function (obj) {
        if (isNullOrUndefined(obj)) return;

        self.suppressUpdate = true;
        if (!isNullOrUndefined(obj['name'])) {
            self.name(obj['name']);
        }
        if (!isNullOrUndefined(obj['classes']) && obj['classes'].length) {
            var colAr = [];
            for (var i = 0; i < obj['classes'].length; i++) {
                var colEl = new ColorizeElementVO(self.updateHandler);
                colEl.fromObject(obj['classes'][i]);
                colAr.push(colEl);
            }
            self.classes(colAr);
        } else {
            self.classes([]);
        }
        self.suppressUpdate = false;
    }
};

var ColorizeElementVO = function (updateHandler, value, name, colors, id) {
    if (isNullOrUndefined(id)) id = '';
    if (isNullOrUndefined(value)) value = '#000000';
    if (isNullOrUndefined(name)) name = 'Black';
    if (isNullOrUndefined(colors)) colors = [];

    var self = this;
    self.id = ko.observable(id);
    self.value = ko.observable(value);
    self.name = ko.observable(name);
    self.colors = ko.observableArray(colors);
    self.updateHandler = updateHandler;
    self.suppressUpdate = false;

    self.value.subscribe(function (newValue) {
        if (self.updateHandler && !self.suppressUpdate)
            updateHandler();
    });

    self.fromObject = function (obj) {
        if (isNullOrUndefined(obj)) return;

        self.suppressUpdate = true;
        if (!isNullOrUndefined(obj['id'])) {
            self.id(obj['id']);
        }
        if (!isNullOrUndefined(obj['name'])) {
            self.name(obj['name']);
        }
        if (!isNullOrUndefined(obj['value'])) {
            self.value(obj['value']);
        }
        if (!isNullOrUndefined(obj['colors'])) {
            self.colors(obj['colors']);
        }
        self.suppressUpdate = false;
    }
};

var SizeQuantityVO = function (size, quantity, changeHandler) {
    if (isNullOrUndefined(size)) size = '';
    if (isNullOrUndefined(quantity)) quantity = 1;
    if (isNullOrUndefined(changeHandler)) changeHandler = function () {
    };

    var self = this;
    self.size = ko.observable(size);
    self.quantity = ko.observable(quantity);
    self.changeHandler = changeHandler;

    self.size.subscribe(function (newValue) {
        self.changeHandler();
    });

    self.quantity.subscribe(function (newValue) {
        self.changeHandler();
    });

    self.toObject = function () {
        var obj = {};
        obj.size = self.size();
        obj.quantity = self.quantity();
        return obj;
    }
};

var NameNumberVO = function (name, number, size, changeHandler) {
    if (isNullOrUndefined(name)) name = '';
    if (isNullOrUndefined(number)) number = '';
    if (isNullOrUndefined(size)) size = '';
    if (isNullOrUndefined(changeHandler)) changeHandler = function () {
    };

    var self = this;
    self.name = ko.observable(name);
    self.number = ko.observable(number);
    self.size = ko.observable(size);
    self.sizePrevValue = size; // to send in changeNNHandler handler


    self.changeNNHandler = changeHandler;


    self.name.subscribe(function (newValue) {
        self.changeNNHandler();
    });

    self.number.subscribe(function (newValue) {
        self.changeNNHandler();
    });

    self.size.subscribe(function (newValue) {
        self.changeNNHandler({
            size: newValue,
            prevSize: self.sizePrevValue
        });
        self.sizePrevValue = newValue;
    });

    self.toObject = function () {
        var obj = {};
        obj.name = self.name();
        obj.number = self.number();
        obj.size = self.size();
        return obj;
    }
};

var ImageColorCountVO = function (processColors, colorCount) {
    if (isNullOrUndefined(processColors)) processColors = false;
    if (isNullOrUndefined(colorCount)) colorCount = 1;

    var self = this;
    self.processColors = ko.observable(processColors);
    self.colorCount = ko.observable(colorCount);

    self.decreaseQuantity = function () {
        self.colorCount(self.colorCount() - 1);
    };
    self.increaseQuantity = function () {
        self.colorCount(self.colorCount() + 1);
    };

    self.colorCount.subscribe(function (newValue) {
        if (newValue > 8) {
            self.colorCount(8);
        }
        if (newValue < 1) {
            self.colorCount(1);
        }
    });

    self.toObject = function () {
        var obj = {};
        obj.processColors = self.processColors();
        obj.colorCount = self.colorCount();
        return obj;
    }
};

/**
 * Designer ViewModel
 */

function DEControlsModel() {
    var self = this;

    //-----
    self.windowWidth = function() {
        return $(window).width();
    };
    self.colorsTabFormsState = ko.observable('addForm');
    self.currentTab = ko.observable('products-tab');
    self.currentTab.subscribe(function(newValue) {
        if (newValue === "colors-tab") {
            self.initialColorsSelection();
        } else {
            self.resetColorsSelection();
        }
    });
    self.isMobile = ko.observable(self.windowWidth() <= 767);
    //-----

    /**
     * PRODUCT BEGINS HERE
     */

    self.showProductSelector = ko.observable(false);

    // selected product value object
    self.selectedProductVO = ko.observable(new ProductVO());

    self.selectProduct = function (product) {
        if (product.id != self.selectedProductVO().id()) {
            self.selectedProductVO().fromObject(product);
        }
    };

    self.selectedProductVO().id.subscribe(function (id) {
        userInteract({selectedProductId: id});
    });

    self.selectedProductElementColor = ko.observable(new ColorizeElementVO());

    // product's selected color value object
    self.selectedProductColorVO = ko.observable(new ComplexColorVO(updateProductColorize));
    //-----
    self.selectedProductColorVO().colorizeGroupList.subscribe(function() {
        self.initialColorsSelection();
    });
    //-----

    self.selectedProductColorVO().hexValue.subscribe(function (newValue) {

        if (!self.selectedProductColorVO().suppressUpdate) {
            userInteract({selectedProductColor: newValue});
        }
    });

    self.showProductColorPicker = ko.computed(function () {
        return self.selectedProductVO().colors().length > 0 && !self.selectedProductVO().multicolor();
    });

    self.colorClasses = ko.observableArray();
    self.colorsList = ko.observableArray();

    self.populateObservableArray= function (observableArray, items) {
        observableArray(items);
        /*var underlyingArray = observableArray();
        underlyingArray.splice(0, underlyingArray.length);
        for (var i = 0, l = items.length; i < l; i++) {
            underlyingArray.push(items[i]);
        }
        observableArray.valueHasMutated();*/
    };

    //-----to show on colors-tab openning first group, frist class and choosen color
    self.initialColorsSelection = function () {
        //console.log('-----');
        //console.time('init');
        var colorGroup = self.selectedProductColorVO().colorizeGroupList()[0],
            colorClasses = colorGroup.classes(),
            colorClass = colorClasses[0],
            colors = colorClass.colors();

        self.currentColorizeElementGroup(colorGroup.name());
        self.colorClasses(colorClasses);
        self.selectedProductElementColor(colorClass);
        //console.time('colorslist');
        self.populateObservableArray(self.colorsList, colors);
        //console.timeEnd('colorslist');
        //console.time('colorsgroups');
        self.setColorsByGroups(colors);
        //console.timeEnd('colorsgroups');
        //console.timeEnd('init');
        //console.log('+++++');
    };

    //----- use to reset color selection in some situations (tab switching or product selecting)
    self.resetColorsSelection = function () {
        //console.log('-----');
        //console.time('reset');
        self.selectedProductElementColor(new ColorizeElementVO());
        self.colorClasses([]);
        //console.time('colorslist');
        self.populateObservableArray(self.colorsList, []);
        //console.timeEnd('colorslist');
        //console.time('colorsgroups');
        self.setColorsByGroups([]);
        //console.timeEnd('colorsgroups');
        self.currentColorizeElementGroup('');
        //console.timeEnd('reset');
        //console.log('+++++');
    };
    //-----

    //----- for colors palette in mobile version
    self.colorsGroupsList = ko.observableArray();
    //----- to hide or show bottom menu/color palette
    self.isBottomColorPaletteShowed = ko.computed(function () {
        return self.isMobile() && self.colorsGroupsList().length > 0
    });
    self.currentColorizeElementGroup = ko.observable('');
    self.colorName = ko.computed(function () {
        var colorName = '',
            colors = self.selectedProductElementColor().colors(),
            colorValue = self.selectedProductElementColor().value();

        for (var i = 0; i < colors.length; i++) {
            if (colors[i].value === colorValue) {
                colorName = colors[i].name;
                break;
            }
        }

        return colorName;
    });
    //-----

    self.selectColorElement = function (colorizeElementGroup, event) {
        //console.log('-----');
        event.preventDefault();

        //console.time('select');
        var colorClasses = colorizeElementGroup.classes(),
            colorClass = colorClasses[0],
            colors = colorClass.colors();

        //----- for colorizing current element group
        self.currentColorizeElementGroup(colorizeElementGroup.name());
        self.selectedProductElementColor(colorClass);
        self.colorClasses(colorClasses);
        //console.time('colorslist');
        self.populateObservableArray(self.colorsList, colors);
        //console.timeEnd('colorslist');
        //console.time('colorsgroups');
        self.setColorsByGroups(colors);
        //console.timeEnd('colorsgroups');
        //console.timeEnd('select');
        //console.log('+++++');
        //-----
    };

    self.selectColorSubElement = function (colorizeElement, event) {
        //console.log('-----');
        var colorsList = colorizeElement.colors();
        //console.time('subelement');
        event.preventDefault();
        self.selectedProductElementColor(colorizeElement);
        //console.time('colorslist');
        self.populateObservableArray(self.colorsList, colorsList);
        //console.timeEnd('colorslist');
        //console.time('colorsgroups');
        self.setColorsByGroups(colorsList);
        //console.timeEnd('colorsgroups');
        //console.timeEnd('subelement');
        //console.log('+++++');
    };

    self.setColorsByGroups = function (colors) {
        //----- for colors palette in mobile version where it is devided in groups by 9
        var i = 0,
            k = 0,
            group = [],
            groupsList = [];
        while (i < colors.length) {
            if (k > 8) {
                groupsList.push({items: group});
                group = [];
                k = 0;
            } else {
                group.push(colors[i]);
                k += 1;
                i += 1;
            }
        }
        if (group.length !== 0) {
            groupsList.push({items: group});
        }
        self.populateObservableArray(self.colorsGroupsList, groupsList);
    };

    self.colorSelectedName = ko.observable('');

    self.colorSelected = function (color, event) {
        event.preventDefault();

        self.colorSelectedName(color.name);

        if (color.type === 'strokeColor') {
            self.selectFontStrokeColor(color);
            return;
        }

        if (color.type === 'fontColor') {
            self.selectFontColor(color);
            return;
        }

        self.selectedProductElementColor().value(color.value);
    };

    // product's selected size value object
    self.selectedProductSizeVO = ko.observable(new ProductSizeVO());

    self.selectedProductSizeVO().width.subscribe(function (newValue) {
        var min = 1;
        var max = 0;
        var step = 0;

        if (self.selectedProductVO().resizable() && self.selectedProductVO().locations()[0] && self.selectedProductVO().locations()[0].editableAreaUnitsRange) {
            min = self.selectedProductVO().locations()[0].editableAreaUnitsRange[0][0];
            max = self.selectedProductVO().locations()[0].editableAreaUnitsRange[0][1];
            step = self.selectedProductVO().locations()[0].editableAreaUnitsRange[0][2];
        }

        var control = designerUI.productDimensionsWidth;
        designerUI.validationSuccess(control);

        if (isNaN(newValue)) {
            designerUI.validationError(control, "Invalid value");
        } else if (newValue < min) {
            designerUI.validationError(control, "Minimal width is " + min);
        } else if (max > 0 && newValue > max) {
            designerUI.validationError(control, "Maximal width is " + max);
        } else if (step > 0 && newValue % step != 0) {
            designerUI.validationError(control, "Minimal step is " + step);
        } else {
            userInteract({selectedProductSize: {width: newValue, height: self.selectedProductSizeVO().height()}});
        }
    });

    self.selectedProductSizeVO().height.subscribe(function (newValue) {
        var min = 1;
        var max = 0;
        var step = 0;

        if (self.selectedProductVO().resizable() && self.selectedProductVO().locations()[0] && self.selectedProductVO().locations()[0].editableAreaUnitsRange) {
            min = self.selectedProductVO().locations()[0].editableAreaUnitsRange[1][0];
            max = self.selectedProductVO().locations()[0].editableAreaUnitsRange[1][1];
            step = self.selectedProductVO().locations()[0].editableAreaUnitsRange[0][2];
        }

        var control = designerUI.productDimensionsHeight;
        designerUI.validationSuccess(control);

        if (isNaN(newValue)) {
            designerUI.validationError(control, "Invalid value");
        } else if (newValue < min) {
            designerUI.validationError(control, "Minimal height is " + min);
        } else if (max > 0 && newValue > max) {
            designerUI.validationError(control, "Maximal height is " + max);
        } else if (step > 0 && newValue % step != 0) {
            designerUI.validationError(control, "Minimal step is " + step);
        } else {
            userInteract({selectedProductSize: {width: self.selectedProductSizeVO().width(), height: newValue}});
        }
    });

    self.selectProductSize = function (size) {
        self.selectedProductSizeVO().width(size.width);
        self.selectedProductSizeVO().height(size.height);
        self.selectedProductSizeVO().label(size.label);

        userInteract({
            selectedProductSize: {
                width: self.selectedProductSizeVO().width(),
                height: self.selectedProductSizeVO().height(),
                label: self.selectedProductSizeVO().label()
            }
        });
    };

    // product's selected location
    self.selectedProductLocation = ko.observable();

    self.selectProductLocation = function (location) {
        self.selectedProductLocation(location.name);
    };

    self.selectedProductLocation.subscribe(function (newValue) {
        userInteract({selectedProductLocation: newValue});
    });

    function updateProductColorize() {
        userInteract({selectedProductColorize: self.selectedProductColorVO().toColorizeList()});
    }

    /**
     * PRODUCT ENDS HERE
     */


    /**
     * PRODUCT CATEGORY BEGINS HERE
     */

        //variables
    self.productRootCategory = ko.observable(new ProductCategoryVO({id: 'root'}));
    self.productCurrentCategory = ko.observable(self.productRootCategory());
    self.selectedCategoryId = ko.observable();
    self.selectedCategoryId.subscribe(function () {
        self.productsSearchQuery("");
    });

    self.productCurrentCategory.subscribe(function (value) {
        var id = value.id();

        if (id === 'root') {
            id = undefined;
        }

        self.selectedCategoryId(id);
    });

    var setProductCategoryParrent = function(category) {
        var categories = category.categories();
        ko.utils.arrayForEach(categories, function (childCategory) {
            childCategory.parentCategory = category;
            setProductCategoryParrent(childCategory);
        });
    };
    self.changeCategorySelectHandler = function (model, event) {
        var oldValue = self.changeCategorySelectHandler.oldValue,
            value = event.target.value,
            categories = self.productRootCategory().categories();

        if (event.isTrigger) {
            return;
        }

        if (typeof value === 'string') {
            value = value.length === 0 ? undefined : value;
        }

        /*if (value === oldValue) {
         return;
         }*/

        if (!categories.length) {
            return;
        }

        if (value === undefined) {
            self.productCurrentCategory(self.productRootCategory());
        }

        ko.utils.arrayForEach(categories, function (category) {
            if (category.id() === value) {
                self.productCurrentCategory(category);
            }
        });

        self.changeCategorySelectHandler.oldValue = value;
    };

    //functons
    self.parseProducts = function (rootCategories) {
        var mappedData = ko.utils.arrayMap(rootCategories, function (item) {
            return new ProductCategoryVO(item);
        });

        self.productRootCategory().categories(mappedData);
        self.productCurrentCategory(self.productRootCategory());

        setProductCategoryParrent(self.productRootCategory());
    };

    self.selectProductItem = function (item) {
        if (item.isProduct()) {
            if (item.id()) {
                self.selectProduct(item.obj());

                //----- Switch to colors tab in mobile version
                if (self.windowWidth() <= 767) {
                    $('a[href="colors-tab"]').trigger('click');
                }
                //-----

            }
            return;
        }

        self.productCurrentCategory(item);
    };

    self.openProductCategory = function (category) {
        if (!category) return;
        if (!category.id) return;

        if (self.productRootCategory().id() == category.id) {
            self.productCurrentCategory(self.productRootCategory());
        } else if (!self.productRootCategory()) {
            return;
        } else {
            var foundPath = self.findCategory(category.id, self.productRootCategory().children());
            if (foundPath.length) {
                self.productCurrentCategory(foundPath[0]);
            }
        }
    };

    self.findCategory = function (id, categories) {
        var category = null;
        var i = 0;
        var subPath = [];
        while (!category && subPath.length == 0 && i < categories.length) {
            if (categories[i].isCategory()) {
                if (categories[i].id() == id) {
                    category = categories[i];
                } else {
                    subPath = self.findCategory(id, categories[i].children());
                    if (subPath.length > 0) {
                        category = categories[i];
                    }
                }
            }
            i++;
        }
        if (category) {
            return [category].concat(subPath);
        } else {
            return [];
        }
    };

    self.backToCategoriesList = function () {
        self.productCurrentCategory(self.productCurrentCategory().parentCategory || self.productRootCategory());
    };

    //search
    self.productsSearchQuery = ko.observable("");
    self.productsSearchQuery.subscribe(function (newValue) {
        if (newValue === '') {
            self.selectedCategoryId(self.productCurrentCategory().id());
        }
    });
    self.productsSearchResult = ko.observableArray();
    self.searchProducts = function (query, category) {
        //unwrap if observable
        if (typeof category == 'function') {
            category = ko.toJS(category);
        }

        for (var i = 0; i < category.categories.length; i++) {
            var cat = category.categories[i];
            if (cat.categories && cat.categories.length > 0) {
                self.searchProducts(query, cat);
            }

            if (cat.products && cat.products.length > 0) {
                for (var g = 0; g < cat.products.length; g++) {
                    var product = cat.products[g];
                    //query match condition
                    var match = product.name.toLowerCase().indexOf(query) > -1;
                    if (match) self.productsSearchResult().push(new ProductCategoryVO(product));
                }
            }
        }
    };
    self.clearProductsSearch = function () {
        self.productsSearchQuery("");
    };

    //main function
    self.currentProducts = ko.computed(function () {
        var query = self.productsSearchQuery().toLowerCase();
        var result = [];

        if (query.length > 0) {
            self.productsSearchResult([]);
            //self.productCurrentCategory(self.productRootCategory());
            self.searchProducts(query, self.productRootCategory);
            result = self.productsSearchResult();
        } else {
            result = self.productCurrentCategory().children();
        }

        return result;
    });

    self.backToCategoriesVisible = ko.computed(function () {
        var id = self.productCurrentCategory().id();

        if (id === '') {
            return false;
        }

        return !isNaN(id);
    });

    /**
     * PRODUCT CATEGORY ENDS HERE
     */


    /**
     * PRODUCT PRICES BEGIN HERE
     */

    self.prices = ko.observableArray();

    /**
     * PRODUCT PRICES END HERE
     */


    /**
     * PRODUCT SIZES & QUANTITIES BEGIN HERE
     */

    self.sizes = ko.observableArray();

    self.quantities = ko.observableArray();

    self.quantities.subscribe(function (newValue) {
        updateQuantities();
    });

    self.canRemoveSize = ko.computed(function () {
        return self.selectedProductVO().sizes().length > 0 && self.quantities().length > 1;
    });

    self.addQuantityBaseOnSize = function (size) {
        var sqVO = new SizeQuantityVO(size, 1, updateQuantities);
        self.quantities.push(sqVO);
        return sqVO;
    }

    self.addQuantity = function () { // executed as button handler, so first param - context
        var size = self.selectedProductVO().sizes().length > 0 ? self.selectedProductVO().sizes()[0] : '';
        return self.addQuantityBaseOnSize(size);
    };


    self.removeQuantity = function (line, clickEvent) {
        var q = parseInt(line.quantity());
        var decreaseStep = -q; // decrease to -q for set quantity to zero before delete

        self.changeQuantity(line, decreaseStep, clickEvent, {
            ignoreTotal: false,
            removeZero: true // if set zero quantity success, line will deleted
        });

    };

    self.increaseQuantity = function (line) {
        self.changeQuantity(line, 1);
    };

    self.decreaseQuantity = function (line, clickEvent, changeQuantityOptions) {
        self.changeQuantity(line, -1, clickEvent, changeQuantityOptions);
    };

    self.changeQuantity = function (line, number1, clickEvent, changeQuantityOptions) {
        if (!changeQuantityOptions) changeQuantityOptions = {ignoreTotal: false, removeZero: false};

        var r = parseInt(line.quantity());
        var totalQ = self.totalQuantity();
        var totalAfterUpdate = totalQ + number1;
        var rAfterUpdate = r + number1;

        var nameNumberMin = nnQuantitySynchronizer.getMinQuantity(line);

        if (rAfterUpdate >= nameNumberMin && (changeQuantityOptions.ignoreTotal || totalAfterUpdate >= self.restrictions().minQuantity())) {
            line.quantity(rAfterUpdate);
            if (rAfterUpdate <= 0 && changeQuantityOptions.removeZero && self.canRemoveSize()) {
                self.quantities.remove(line)

            }
        }

    };

    self.getQuantity = function () {
        var dataToSave = jQuery.map(self.quantities(), function (item) {
            return item.quantity() > 0 ? item.toObject() : undefined
        });
        alert(JSON.stringify(dataToSave));
    };

    self.totalQuantity = ko.computed(function () {// summ of all size.qountityes
        var total = 0;
        ko.utils.arrayForEach(self.quantities(), function (q) {
            total += parseInt(q.quantity(), 10);
        });
        return total;
    });


    function updateQuantities() {
        var quantities = jQuery.map(controlsModel.quantities(), function (item) {
            return item.toObject();
        });
        userInteract({updateQuantities: quantities});
    }

    /**
     * PRODUCT SIZES & QUANTITIES BEGIN HERE
     */

    /**
     * NAMES & HUMBERS BEGIN HERE
     */

    self.addNameObj = function () {
        userInteract({addNameObj: self.selectedLetteringVO().toObject()});
    }

    self.addNumberObj = function () {
        userInteract({addNumberObj: self.selectedLetteringVO().toObject()});
    }

    self.namesNumbers = ko.observableArray();

    self.namesNumbers.subscribe(function (newValue) {
        updateNamesNumbers();
    });

    self.canRemoveNameNumber = ko.computed(function () {
        return self.namesNumbers().length > 1;
    });

    self.addNameNumber = function () {
        var size = self.selectedProductVO().sizes().length > 0 ? self.selectedProductVO().sizes()[0] : '';
        var newNN = new NameNumberVO("", "", size, updateNamesNumbers);
        self.namesNumbers.push(newNN);
        nnQuantitySynchronizer.onAddNameNumberLine(newNN);
    };

    self.removeNameNumber = function (line) {
        self.namesNumbers.remove(line)
        nnQuantitySynchronizer.onRemovedNameNumberLine(line);
    };

    self.removeAllNameNumbers = function () {
        if (self.namesNumbers == null) return;// nothing to do
        if (!self.selectedProductVO().namesNumbersEnabled()) return;// nothing to do
        while (self.namesNumbers().length > 0) {
            var nnLine = self.namesNumbers()[0];// get first line
            self.removeNameNumber(nnLine);
        }
    }

    function updateNamesNumbers(newNameNumberValue) {
        if (typeof (newNameNumberValue) !== "undefined") {

            if (("size" in newNameNumberValue)) {
                nnQuantitySynchronizer.onNameNumberSizeChanged(newNameNumberValue);
            }

        }


        var namesNumbers = jQuery.map(controlsModel.namesNumbers(), function (item) {
            return item.toObject();
        });
        userInteract({updateNamesNumbers: namesNumbers});
    }

    /**
     * NAMES & HUMBERS END HERE
     */

    /**
     * COLORS AND FONTS BEGIN HERE
     */

        // list of available fonts for letterings
    self.fonts = ko.observableArray();

    // name of selected font
    self.selectedFont = ko.computed(function () {
        var fonts = self.fonts();

        for (var i = 0; i < fonts.length; i++) {
            if (self.selectedLetteringVO().formatVO().fontFamily() == fonts[i].fontFamily) {
                return fonts[i];
            }
        }
        return {name: "", fontFamily: "", boldAllowed: true, italicAllowed: true};
    });


    // set font family
    self.selectFont = function (fontVO, event) {
        var formatVo = self.selectedLetteringVO().formatVO(); // short alias

        if (typeof event !== 'undefined') {
            event.preventDefault();
        }

        formatVo.fontFamily(fontVO.fontFamily);

        // uncheck bold/italic if new font not allowed it
        if (!fontVO.boldAllowed) formatVo.bold(false);
        if (!fontVO.italicAllowed) formatVo.italic(false);

    }

    // list of available fill colors for graphics and lette
    // rings
    self.colors = ko.observableArray();

    // list of available stroke colors for graphics and letterings
    self.strokeColors = ko.observableArray();

    //hack to force preload all fonts
    self.preloadFonts = function () {
        var container = jQuery('<div id="designer-fonts-preloader-container"></div>').appendTo('body');
        var fonts = self.fonts();
        for (var i = 0; i < fonts.length; i++) {
            jQuery('<p style="font-family:' + fonts[i].fontFamily + '"><em><strong></strong></em></div>').appendTo(container);
        }
    };

    self.selectedFontColorName = ko.observable('black');

    self.selectFontColor = function (color) {
        self.selectedFontColorName(color.name);
        self.selectedLetteringVO().formatVO().fillColor(color.value);
    };

    self.selectedStrokeColorName = ko.observable('transparent');

    self.selectFontStrokeColor = function (color) {
        self.selectedStrokeColorName(color.name);
        self.selectedLetteringVO().formatVO().strokeColor(color.value);
    };

    /**
     * COLORS AND FONTS END HERE
     */

    /**
     * GRAPHICS CATEGORY BEGINS HERE
     */

        // tree if graphics categories
    self.graphicRootCategory = ko.observable(new GraphicsCategoryVO({id: 'root'}));

    // list of graphics categories
    self.graphicCatalogBreadcrumbs = ko.observableArray();

    //----- graphics current category in select box
    self.graphicCategory = ko.observable();
    self.graphicCategory.subscribe(function () {
        self.graphicsSearchQuery("");
    })
    //-----

    //selected graphics category
    self.graphicCurrentCategory = ko.computed(function () {
        if (!self.graphicCatalogBreadcrumbs() || self.graphicCatalogBreadcrumbs().length < 1)
            return new GraphicsCategoryVO();

        var lastCatIdx = self.graphicCatalogBreadcrumbs().length - 1;
        return self.graphicCatalogBreadcrumbs()[lastCatIdx];
    });

    //initialisation of graphic categories
    self.graphicCatalogLoaded = function (rootCategories) {
        var mappedData = ko.utils.arrayMap(rootCategories, function (item) {
            return new GraphicsCategoryVO(item);
        });
        self.graphicRootCategory().categories(mappedData);
        self.graphicCatalogBreadcrumbs([self.graphicRootCategory()]);
    };

    //-----
    self.enterGraphicCategory = function () {
        self.graphicCatalogBreadcrumbs.splice(1);
        if (self.graphicCategory()) {
            self.selectGraphicItem(self.graphicCategory());
        } else {
            self.graphicCategory(undefined);
        }
    };
    //-----

    //handlers - click on categories/graphics
    self.selectGraphicItem = function (categoryItem) {
        if (categoryItem.isImage()) {
            if (categoryItem.id()) {
                userInteract({addGraphics: categoryItem.id()});
                //designerUI.closeActiveTab();
                //-----
                openGraphicsColorForm();
                self.resetColorsSelection();
                //-----
            }
            return;
        }
        self.graphicCatalogBreadcrumbs.push(categoryItem);
        //-----
        self.graphicCategory(categoryItem);
        //-----
    };

    //handlers - back button
    self.backGraphicItem = function () {
        if (!self.graphicCatalogBreadcrumbs() || self.graphicCatalogBreadcrumbs().length < 1)
            return;

        self.graphicCatalogBreadcrumbs.pop();

        //-----
        if (self.graphicCurrentCategory().id() === 'root') {
            self.graphicCategory(undefined);
        } else {
            self.graphicCategory(self.graphicCurrentCategory());
        }
        //-----
    };

    //back button visibility
    self.graphicSelectedSubcategory = ko.computed(function () {
        if (!self.graphicCatalogBreadcrumbs() || self.graphicCatalogBreadcrumbs().length < 1)
            return true;

        return self.graphicCatalogBreadcrumbs().length > 1;
    });

    //Search
    self.graphicsSearchQuery = ko.observable("");
    self.graphicsSearchQuery.subscribe(function (newValue) {
        if (newValue === '') {
            self.graphicCategory(self.graphicCurrentCategory());
        }
    });
    self.searchGraphicsResult = ko.observableArray();

    self.graphicsSearch = function (query, category) {
        //unwrap if observable
        if (typeof category == 'function') {
            category = ko.toJS(category);
        }

        for (var i = 0; i < category.categories.length; i++) {
            var cat = category.categories[i];
            if (cat.categories && cat.categories.length > 0) {
                self.graphicsSearch(query, cat);
            }

            if (cat.graphics && cat.graphics.length > 0) {
                for (var g = 0; g < cat.graphics.length; g++) {
                    var image = cat.graphics[g];
                    //query match condition
                    var match = image.name.toLowerCase().indexOf(query) > -1 || image.description.toLowerCase().indexOf(query) > -1;
                    if (match) self.searchGraphicsResult().push(new GraphicsCategoryVO(image));
                }
            }
        }

    };

    self.clearGraphicsSearch = function () {
        //-----
        self.graphicCategory(undefined);
        //-----
        self.graphicsSearchQuery("");
    }

    //breadcrumbs to string
    self.graphicBreadcrumbsString = ko.computed(function () {
        var str = "All Categories";
        ko.utils.arrayForEach(self.graphicCatalogBreadcrumbs(), function (item) {
            if (item.id() != 'root')
                str += " / " + item.name();
        });

        if (self.graphicsSearchQuery().length > 0)
            str = "Search";
        return str;
    });

    //Current graphcis - selected category or search result
    self.currentGraphics = ko.computed(function () {
        var query = self.graphicsSearchQuery().toLowerCase();
        var result = [];

        if (query.length > 0) {
            self.searchGraphicsResult([]);
            //self.graphicCatalogBreadcrumbs([self.graphicRootCategory()]);
            self.graphicsSearch(query, self.graphicRootCategory);
            result = self.searchGraphicsResult();
        } else {
            result = self.graphicCurrentCategory().children();
        }

        return result;
    });

    /**
     * GRAPHICS CATEGORY ENDS HERE
     */


    /**
     * SELECTED OBJECT BEGINS HERE
     */

        // selected object's type
        // can be 'none' (no object is selected), 'text' or 'graphics'
    self.selectedObjectType = ko.observable('none');

    //-----
    self.selectedObjectType.subscribe(function (newValue) {
        switch (newValue) {
            case 'text':
                openTextForm();
                break;
            case 'graphics':
                openGraphicsColorForm();
                break;
            case 'none':
                if (!self.isMobile()) {
                    hideGraphicsColorForm();
                }
                break;
            default:
        }
        self.resetColorsSelection();
    });
    //-----

    // return true if some object is selected
    self.hasSelected = ko.computed(function () {
        return self.selectedObjectType() != 'none';
    });

    // return true if selected object is text
    self.selectedIsText = ko.computed(function () {
        return self.selectedObjectType() == 'text';
    });


    // return true if selected object is graphics
    self.selectedIsGraphics = ko.computed(function () {
        return self.selectedObjectType() == 'graphics';
    });

    self.selectedObjectPropertiesVO = ko.observable(new ObjectPropertiesVO());

    self.selectedObjectPropertiesVO().width.subscribe(function (value) {
        if (!self.selectedObjectPropertiesVO().suppressUpdate) {
            userInteract({updateObject: self.selectedObjectPropertiesVO().toWidthObject()});
        }
    });

    self.selectedObjectPropertiesVO().height.subscribe(function (value) {
        if (!self.selectedObjectPropertiesVO().suppressUpdate) {
            userInteract({updateObject: self.selectedObjectPropertiesVO().toHeightObject()});
        }
    });

    /**
     * LETTERING OBJECT BEGINS HERE
     */

        // selected lettering value object
    self.selectedLetteringVO = ko.observable(new LetteringVO());

    // public function that forces Designer to add new text
    self.addText = function () {
        userInteract({addText: self.selectedLetteringVO().toObject()});
    };

    self.selectedLetteringVO().text.subscribe(function (value) {
        updateText();
    });

    self.selectedLetteringVO().formatVO().fontFamily.subscribe(function (value) {
        updateText();
    });

    self.selectedLetteringVO().formatVO().fillColor.subscribe(function (value) {
        updateText();
    });

    self.selectedLetteringVO().formatVO().bold.subscribe(function (value) {
        updateText();
    });

    self.selectedLetteringVO().formatVO().italic.subscribe(function (value) {
        updateText();
    });

    self.selectedLetteringVO().formatVO().strokeColor.subscribe(function (value) {
        updateText();
    });

    self.selectedLetteringVO().formatVO().textEffectCombined.subscribe(function (value) {
        updateText();
    });

    self.selectedLetteringVO().formatVO().letterSpacing.subscribe(function (value) {
        updateText();
    });

    self.selectedLetteringVO().formatVO().lineLeading.subscribe(function (value) {
        updateText();
    });

    self.selectedLetteringVO().formatVO().fontSize.subscribe(function (value) {
        updateText();
    });

    self.selectedLetteringVO().formatVO().lineHeight.subscribe(function (value) {
        updateText();
    });

    self.selectedLetteringVO().formatVO().textAlign.subscribe(function (newValue) {
        updateText();
    });

    self.selectedLetteringVO().formatVO().rotation.subscribe(function (newValue) {
        var designers = designer.deMain.model.canvasManager.designers,
            selectedEl;

        if (!(designers instanceof Array && designers.length)) {
            return;
        }

        selectedEl = designers[0].selectedEl;

        if (!(selectedEl instanceof Array && selectedEl.length)) {
            return;
        }

        DEJS.Util.rotateAbsolute(selectedEl[0], newValue);
        designers[0].tracker.track();
    });

    self.editTextEnabled = ko.computed(function () {
        return !(self.selectedLetteringVO().isNames() || self.selectedLetteringVO().isNumbers());
    });

    self.letterSpacingEnabled = ko.observable(false);
    self.lineLeadingEnabled = ko.observable(false);
    self.fontSizeEnabled = ko.observable(false);

    // private function that informs Designer about change in letterings (fill, stroke, bold, italic, etc.)
    self.suppressTextUpdate = false;
    function updateText() {
        if (self.selectedObjectType() == 'text' && !self.suppressTextUpdate) {
            userInteract({updateText: self.selectedLetteringVO().toObject()});
        }
    }

    self._textToolsIsVisible = ko.observable(true);

    self.textToolsIsVisible = ko.computed(function () {
        var isVisible = self._textToolsIsVisible(),
            textLength = self.selectedLetteringVO().text().length > 0;

        if (!isVisible) {
            return false;
        }

        return textLength;
    });

    self.isFontColorPalette = ko.observable(true);

    self.selectedTextColor = ko.computed(function () {
        var isFontsColors = self.isFontColorPalette();

        if (isFontsColors) {
            return self.selectedLetteringVO().formatVO().fillColor().toLocaleLowerCase();
        }

        return self.selectedLetteringVO().formatVO().strokeColor().toLocaleLowerCase();
    });

    self.showFontsList = ko.observable(false);

    self.showFontsColorsListMobile = function () {
        self.colorSelectedName(self.selectedFontColorName());
        self.isFontColorPalette(true);
        self.setColorsByGroups(self.colors());
        self.colorsList(self.colors());
    };

    self.toggleFontsList = function (model, event) {
        var currentValue = self.showFontsList();

        if (typeof event !== 'undefined') {
            event.preventDefault();
        }

        self.showFontsList(!currentValue);
        self._textToolsIsVisible(currentValue);
    };

    self.showFontsColorsList = ko.observable(false);

    self.toggleFontsColorsList = function (model, event) {
        var currentValue = self.showFontsColorsList();

        if (typeof event !== 'undefined') {
            event.preventDefault();
        }

        self.showFontsColorsList(!currentValue);
        self._textToolsIsVisible(currentValue);
    };

    self.showFontsStrokeColorsList = ko.observable(false);

    self.showFontsStrokeColorsListMobile = function () {
        self.colorSelectedName(self.selectedStrokeColorName());
        self.isFontColorPalette(false);
        self.setColorsByGroups(self.strokeColors());
        self.colorsList(self.strokeColors());
    };

    self.getTextColorValue = function (value) {
        if (value === 'none') {
            return '#A3A2A4';
        }

        if (value === '#FFFFFF') {
            return '#A3A2A4';
        }

        return value;
    };

    self.showMoreEnabled = ko.observable(false);

    self.showMoreTrigger = function () {
        var showMoreValue = self.showMoreEnabled();

        self.showMoreEnabled(!showMoreValue);
    };

    self.textControlResizeActive = ko.observable(true);

    self.textControlResizeToggle = function () {
        var resizeActive = self.textControlResizeActive();

        self.textControlResizeActive(!resizeActive);
    };

    self.toggleFontsStrokeColorsList = function (model, event) {
        var currentValue = self.showFontsStrokeColorsList();

        if (typeof event !== 'undefined') {
            event.preventDefault();
        }

        self.showFontsStrokeColorsList(!currentValue);
        self._textToolsIsVisible(currentValue);
    };

    /**
     * LETTERING OBJECT ENDS HERE
     */

    /**
     * TEXT EFFECT START
     */
    self.textEffects = ko.observableArray([]);
    self.selectedTextEffectVO = ko.observable(new TextEffectVO());

    self.selectedTextEffectCombined = ko.computed(function () {
        return self.selectedTextEffectVO().name() + self.selectedTextEffectVO().value();
    });//.extend({ throttle: 200 });

    self.selectedTextEffectCombined.subscribe(function (value) {
        self.updateTextEffect();
    });

    //UI to selected text effect
    self.selectTextEffect = function (effect) {
        if (effect) {
            self.selectedTextEffectVO().inverted(effect.max() < 0);
            self.selectedTextEffectVO().name(effect.name());
            self.selectedTextEffectVO().label(effect.label());
            self.selectedTextEffectVO().paramName(effect.paramName());
            self.selectedTextEffectVO().min(Math.abs(effect.min()));
            self.selectedTextEffectVO().max(Math.abs(effect.max()));
            self.selectedTextEffectVO().step(effect.step());
            self.selectedTextEffectVO().value(Math.abs(effect.min()).toFixed(2));
        } else {
            self.selectedTextEffectVO().name("none");
            self.selectedTextEffectVO().label("None");
            self.selectedTextEffectVO().value("0");
        }
    };

    //From UI to LetteringVO
    self.updateTextEffect = function () {
        if (self.selectedTextEffectVO().name() != 'none' && self.selectedTextEffectVO().name() != 'arcUp' && self.selectedTextEffectVO().name() != 'arcDown') {
            self.suppressTextUpdate = true;
            self.selectedLetteringVO().formatVO().letterSpacing(0);
            self.suppressTextUpdate = false;
        }
        self.selectedLetteringVO().formatVO().textEffect(self.selectedTextEffectVO().name());
        self.selectedLetteringVO().formatVO().textEffectValue(self.selectedTextEffectVO().inverted() ? 0 - self.selectedTextEffectVO().value() : self.selectedTextEffectVO().value());
    };

    //From LetteringVO to UI after parseObject
    self.setTextEffect = function () {
        var effectName = self.selectedLetteringVO().formatVO().textEffect();
        if (effectName == 'none') {
            self.selectedTextEffectVO().name('none');
        } else {
            for (var i = 0; i < self.textEffects().length; i++) {
                if (self.textEffects()[i].name() == effectName) {
                    var effect = self.textEffects()[i];
                    self.selectedTextEffectVO().inverted(effect.max() < 0);
                    self.selectedTextEffectVO().name(effect.name());
                    self.selectedTextEffectVO().label(effect.label());
                    self.selectedTextEffectVO().paramName(effect.paramName());
                    self.selectedTextEffectVO().min(Math.abs(effect.min()));
                    self.selectedTextEffectVO().max(Math.abs(effect.max()));
                    self.selectedTextEffectVO().step(effect.step());
                    //self.selectedTextEffectVO().value(Math.abs(effect.value()));
                }
            }
            self.selectedTextEffectVO().value(Math.abs(self.selectedLetteringVO().formatVO().textEffectValue()).toFixed(2));
        }
    }

    self.showTextEffects = ko.computed(function () {
        return self.textEffects().length > 1;
    });

    self.showEffectsSlider = ko.computed(function () {
        return self.showTextEffects() && (self.selectedTextEffectVO().name() != "none");
    });

    self.showLetterSpacingSlider = ko.computed(function () {
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        var spacingAvailable = self.selectedTextEffectVO().name() == "none" || self.selectedTextEffectVO().name() == "arcUp" || self.selectedTextEffectVO().name() == "arcDown";
        return (!isFirefox && spacingAvailable);
    });

    self.showLineLeadingSlider = ko.computed(function () {
        var spacingAvailable = self.selectedTextEffectVO().name() == "none" || self.selectedTextEffectVO().name() == "arcUp" || self.selectedTextEffectVO().name() == "arcDown";
        return (self.selectedLetteringVO().text().split("\n").length > 1) && spacingAvailable;
    });

    self.textAlignEnabled = ko.computed(function () {
        return self.selectedTextEffectVO().name() == "none" || self.selectedTextEffectVO().name() == "arcUp" || self.selectedTextEffectVO().name() == "arcDown";
    });

    /**
     * TEXT EFFECT END
     */

    /**
     * GRAPHICS OBJECT BEGINS HERE
     */

        // selected graphics format value object
    self.selectedGraphicsFormatVO = ko.observable(new GraphicsFormatVO(updateGraphicsColorize));

    // boolean value that shows whether selected object is a colorizable graphics object
    self.isColorizableGraphics = ko.computed(function () {
        return (self.selectedIsGraphics() && self.selectedGraphicsFormatVO().colorize());
    });

    self.isMulticolorGraphics = ko.computed(function () {
        return (self.selectedIsGraphics() && self.selectedGraphicsFormatVO().multicolor());
    });

    self.selectedGraphicsFormatVO().strokeColor.subscribe(function (value) {
        updateGraphics();
    });

    self.selectedGraphicsFormatVO().fillColor.subscribe(function (value) {
        updateGraphics();
    });

    // private function that informs Designer about change in graphics (fill, stroke, etc.)
    function updateGraphics() {
        userInteract({updateGraphics: self.selectedGraphicsFormatVO().toObject()});
    }

    function updateGraphicsColorize() {
        userInteract({selectedGraphicsColorize: self.selectedGraphicsFormatVO().complexColor().toColorizeList()});
    }

    self.uploadFileAvailable = ko.observable(false);

    self.showUploadConditions = function (type) {
        if (type == 'url' && self.customImageUrl().length == 0) return;

        self.customImageType(type);
        jQuery("#designer-upload-conditions-popup").modal("show");
    }

    self.strictTemplate = ko.observable(false);

    self.customImageType = ko.observable('');

    self.userAcceptsConditions = ko.observable(false);
    self.addCustomImage = function (type) {
        //-----
        if (type == 'url' && self.customImageUrl().length == 0) return;
        self.customImageType(type);
        //-----
        if (self.userAcceptsConditions()) {
            jQuery("#designer-upload-conditions-popup").modal("hide");
            /*var type = self.customImageType();*/
            if (type == 'url') {
                self.addImageByUrl();
            } else {
                self.uploadImage();
            }
            self.customImageType('');
            self.userAcceptsConditions(false);
        }
    }
    self.uploadImage = function () {
        userInteract({
            uploadGraphics: true
        });
    }

    self.customImageUrl = ko.observable("");

    self.addImageByUrl = function () {
        if (self.customImageUrl().length > 0) {
            userInteract({
                addCustomGraphics: self.customImageUrl()
            });
        }
    }

    /**
     * GRAPHICS OBJECT ENDS HERE
     */

    // private function for correct selected object detection
    function parseObjectAttributes(selectedObject) {
        self.suppressTextUpdate = true;
        self.selectedObjectPropertiesVO().fromObject(selectedObject);
        if (selectedObject == null) {
            self.selectedObjectType('none');
            self.selectedLetteringVO().text('');
            if (self.showTextEffects) {
                self.selectTextEffect(new TextEffectVO("none", "None"));
            }
        } else if (selectedObject.type == 'txt') {
            self.selectedObjectType('text');
            self.selectedLetteringVO().fromObject(selectedObject);
            self.setTextEffect();
        } else {
            self.selectedObjectType('graphics');
            self.selectedGraphicsFormatVO().fromObject(selectedObject);
        }

        self.suppressTextUpdate = false;
    }

    /**
     * SELECTED OBJECT ENDS HERE
     */

    /**
     * DESIGNER PROGRESS STATUS BEGINS HERE
     */

    self.status = ko.observable({});

    self.percentCompleted = ko.computed(function () {
        return self.status().percentCompleted + "%";
    });

    self.status.subscribe(function (value) {
        if (value.imageUploading) {
            jQuery("#designer-upload-image-browse-btn").button("loading");
        } else {
            jQuery("#designer-upload-image-browse-btn").button("reset");
        }
    });

    /**
     * DESIGNER PROGRESS STATUS ENDS HERE
     */

    /**
     * DESIGNER ACTIONS BEGIN HERE
     */

    self.arrange = function (value) {
        userInteract({
            arrange: value
        });
    };

    self.align = function (value) {
        userInteract({
            align: value
        });
    };

    self.flip = function (value) {
        userInteract({
            flip: value
        });
    };

    self.clearDesign = function () {
        var retVal = confirm("Are you sure to continue ?");
        if (retVal == true) {

            // clean name/numbers
            self.removeAllNameNumbers();

            userInteract({
                clearDesign: true
            });
        }
    };

    self.lockProportions = ko.observable(true);
    self.lockProportions.subscribe(function (value) {
        userInteract({
            "lockProportions": value
        });
    });

    self.zoomEnabled = ko.observable(false);
    self.minZoom = ko.observable(50);
    self.maxZoom = ko.observable(150);
    self.zoom = ko.observable(100);
    self.zoom.subscribe(function (value) {
        userInteract({
            zoom: Number(value)
        });
    });

    self.zoomIn = function () {
        userInteract({
            zoomIn: true
        });
    }

    self.zoomOut = function () {
        userInteract({
            zoomOut: true
        });
    }

    self.drag = ko.observable(false);
    self.drag.subscribe(function (value) {
        userInteract({
            drag: value
        });
    });

    /**
     * DESIGNER ACTIONS END HERE
     */


    /**
     * SAVED DESIGNS BEGIN HERE
     */

    self.designsList = ko.observableArray();
    self.selectedDesign = ko.observable();
    self.designNotes = ko.observable();
    self.designNotes.subscribe(function (val) {
        userInteract({designNotes: val});
    });

    self.onDesignSelected = function (design) {
        self.selectedDesign(design);
    }

    self.shareLink = ko.observable("");

    /**
     * SAVED DESIGNS END HERE
     */


    /**
     * DESIGN INFO BEGINS HERE
     */

    self.designInfo = ko.observable({});

    self.objectsCount = ko.computed(function () {
        var imagesCount = '';
        var letteringsCount = '';
        if (isNullOrUndefined(self.designInfo().objectsCount)) {
            return 'No objects';
        } else if (self.designInfo().objectsCount) {
            if (self.designInfo().objectsCount.letteringsCount === 0 && self.designInfo().objectsCount.imagesCount === 0) {
                return 'No objects';
            }

            if (self.designInfo().objectsCount.letteringsCount === 0) {
                letteringsCount = 'No letterings';
            } else if (self.designInfo().objectsCount.letteringsCount === 1) {
                letteringsCount = 'One lettering';
            } else if (self.designInfo().objectsCount.letteringsCount > 1) {
                letteringsCount = self.designInfo().objectsCount.letteringsCount + ' letterings';
            }

            if (self.designInfo().objectsCount.imagesCount === 0) {
                imagesCount = 'no images';
            } else if (self.designInfo().objectsCount.imagesCount === 1) {
                imagesCount = 'one image';
            } else if (self.designInfo().objectsCount.imagesCount > 1) {
                imagesCount = self.designInfo().objectsCount.imagesCount + ' images';
            }
        }

        return letteringsCount + ', ' + imagesCount;
    });

    self.colorsCount = function (count) {
        var colorsCount = '';
        if (count === 0) {
            colorsCount = 'No colors';
        } else if (count === -1) {
            colorsCount = 'Process colors';
        } else if (count === 1) {
            colorsCount = 'One color';
        } else if (count > 1) {
            colorsCount = count + ' colors';
        }

        return colorsCount;
    }

    /**
     * DESIGN INFO ENDS HERE
     */

    /**
     * MODAL OPTIONS BEGIN HERE
     */

    self.dpuExceedConfirmed = ko.observable(false);

    self.imageColorCount = ko.observable(new ImageColorCountVO(false, 1));

    /**
     * MODAL OPTIONS END HERE
     */

    /**
     * PRINT
     */
    self.print = function () {
        userInteract({
            print: true
        });
    }
    /**
     * PRINT ENDS HERE
     */

    /**
     * COPY/PASTE
     */
    self.copy = function () {
        userInteract({
            copy: true
        });
    }

    self.paste = function () {
        userInteract({
            paste: true
        });
    }
    /**
     * COPY/PASTE ENDS HERE
     */


    /**
     * RESTRICTIONS BEGIN HERE
     */

    self.restrictions = ko.observable(new RestrictionsVO(self));

    /**
     * RESTRICTIONS END HERE
     */

    /**
     * UNDO/REDO BEGINS HERE
     */
    self.undo = function () {
        //-----in case of color changing undo should reset color selection.
        self.resetColorsSelection();
        //-----
        userInteract({undo: true});
    };

    self.redo = function () {
        userInteract({redo: true});
    };

    self.isUndoActive = ko.observable(false);
    self.isRedoActive = ko.observable(false);
    /**
     * UNDO/REDO ENDS HERE
     */

    /**
     * UPDATE VIEW MODEL BEGINS HERE
     */

    self.suppressUpdate = false;

    function isInvalid(invalidateList, type) {
        return (invalidateList.indexOf(type) > -1);
    }

    function validate(invalidateList, type) {
        if (isInvalid(invalidateList, type)) {
            delete invalidateList[invalidateList.indexOf(type)];
        }
    }

    self.markAsStrokeColors = function () {
        var strokeColors = self.strokeColors();

        ko.utils.arrayForEach(strokeColors, function (color) {
            color.type = 'strokeColor';
        });

        self.strokeColors(strokeColors);
    };

    self.markAsFontColors = function () {
        var colors = self.colors();

        ko.utils.arrayForEach(colors, function (color) {
            color.type = 'fontColor';
        });

        self.colors(colors);
    };

    self.update = function (model) {
        var invalidateList = model.invalidateList ? model.invalidateList : [];

        self.suppressUpdate = true;

        // set status
        if (isInvalid(invalidateList, 'status')) {
            self.status(model.status);
            validate(invalidateList, 'status');
        }

        // set selected product
        if (isInvalid(invalidateList, 'selectedProduct')) {
            self.selectedProductVO().fromObject(model.selectedProduct);
            validate(invalidateList, 'selectedProduct');
        }

        // set selected product category
        if (isInvalid(invalidateList, 'selectedProductCategory')) {
            self.openProductCategory(model.selectedProductCategory);
            validate(invalidateList, 'selectedProductCategory');
        }

        // set selected product color
        if (isInvalid(invalidateList, 'selectedProductColor')) {
            self.selectedProductColorVO().fromObject(model.selectedProductColor);
            validate(invalidateList, 'selectedProductColor');
        }

        // set selected product size
        if (isInvalid(invalidateList, 'selectedProductSize')) {
            self.selectedProductSizeVO().fromObject(model.selectedProductSize);
            validate(invalidateList, 'selectedProductSize');
        }

        // set selected product location
        if (isInvalid(invalidateList, 'selectedProductLocation')) {
            self.selectedProductLocation(model.selectedProductLocation);
            validate(invalidateList, 'selectedProductLocation');
        }

        // fill product categories list
        if (isInvalid(invalidateList, 'productCategories')) {
            self.parseProducts(model.productCategories);
            validate(invalidateList, 'productCategories');
        }

        // fill graphics categories list
        if (isInvalid(invalidateList, 'graphicsCategories')) {
            self.graphicCatalogLoaded(model.graphicsCategories);
            validate(invalidateList, 'graphicsCategories');
        }

        // fill fonts list
        if (isInvalid(invalidateList, 'fonts')) {
            self.fonts(model.fonts);
            self.preloadFonts();
            if (model.fonts.length > 0)
                self.selectFont(model.fonts[0]);

            validate(invalidateList, 'fonts');
        }

        // fill colors and stroke colors list
        if (isInvalid(invalidateList, 'colors')) {
            var colors = model.colors,
                deepCopyColors = JSON.parse(JSON.stringify(colors)),
                strokeColors = [];

            self.colors(colors);
            strokeColors.push({
                value: 'none',
                name: 'Transparent'
            });


            self.strokeColors(strokeColors.concat(deepCopyColors));
            validate(invalidateList, 'colors');
            self.markAsStrokeColors();
            self.markAsFontColors();
        }

        // fill colors and stroke colors list
        if (isInvalid(invalidateList, 'selectedObj')) {
            parseObjectAttributes(model.selectedObj);
            validate(invalidateList, 'selectedObj');
        }

        // Order
        if (isInvalid(invalidateList, 'quantities')) {
            validate(invalidateList, 'quantities');
            var quantities = jQuery.map(model.quantities, function (item) {
                return new SizeQuantityVO(item.size, item.quantity, updateQuantities);
            });
            self.quantities(quantities);
        }

        // Names & numbers
        if (isInvalid(invalidateList, 'namesNumbers')) {
            validate(invalidateList, 'namesNumbers');
            var namesNumbers = jQuery.map(model.namesNumbers, function (item) {
                return new NameNumberVO(item.name, item.numberText, item.size, updateNamesNumbers);
            });
            self.namesNumbers(namesNumbers);
        }

        // Design info
        if (isInvalid(invalidateList, 'designInfo') && !isNullOrUndefined(model.designInfo)) {
            self.designInfo(model.designInfo);
            validate(invalidateList, 'designInfo');
        }

        // Designs
        if (isInvalid(invalidateList, 'designs')) {
            self.designsList(model.designs);
            validate(invalidateList, 'designs');
        }

        if (isInvalid(invalidateList, 'designNotes')) {
            self.designNotes(model.designNotes);
            validate(invalidateList, 'designNotes');
        }

        // Dialogs
        if (isInvalid(invalidateList, 'showAuthDialog') && model.showAuthDialog) {
            showAuthDialog();
            validate(invalidateList, 'showAuthDialog');
        }
        if (isInvalid(invalidateList, 'showAuthAndSaveDialog') && model.showAuthAndSaveDialog) {
            showAuthAndSaveDialog();
            validate(invalidateList, 'showAuthAndSaveDialog');
        }
        if (isInvalid(invalidateList, 'showSaveDesignDialog') && model.showSaveDesignDialog) {
            showSaveDesignDialog();
            validate(invalidateList, 'showSaveDesignDialog');
        }
        if (isInvalid(invalidateList, 'showLoadDesignDialog') && model.showLoadDesignDialog) {
            showLoadDesignDialog();
            validate(invalidateList, 'showLoadDesignDialog');
        }
        if (isInvalid(invalidateList, 'showColorCountDialog') && model.showColorCountDialog) {
            showColorCountDialog();
            validate(invalidateList, 'showColorCountDialog');
        }
        if (isInvalid(invalidateList, 'showShareLink') && model.showShareLink) {
            self.shareLink(model.shareLink);
            showShareLink();
            validate(invalidateList, 'shareLink');
            validate(invalidateList, 'showShareLink');
        }

        if (isInvalid(invalidateList, 'uploadFileAvailable')) {
            self.uploadFileAvailable(model.uploadFileAvailable);
            validate(invalidateList, 'uploadFileAvailable');
        }

        if (isInvalid(invalidateList, 'strictTemplate')) {
            self.strictTemplate(model.strictTemplate);
            validate(invalidateList, 'strictTemplate');
        }

        if (isInvalid(invalidateList, 'zoom')) {
            var val = parseInt(model.zoom.toFixed(1));
            if (self.zoom() != val) {
                self.zoom(val);
            }
            validate(invalidateList, 'zoom');
        }
        if (isInvalid(invalidateList, 'minZoom')) {
            self.minZoom(parseInt(model.minZoom.toFixed(1)));
            validate(invalidateList, 'minZoom');
        }
        if (isInvalid(invalidateList, 'maxZoom')) {
            self.maxZoom(parseInt(model.maxZoom.toFixed(1)));
            validate(invalidateList, 'maxZoom');
        }
        if (isInvalid(invalidateList, 'zoomEnabled')) {
            self.zoomEnabled(model.zoomEnabled);
            validate(invalidateList, 'zoomEnabled');
        }
        // fill textEffects
        if (isInvalid(invalidateList, 'textEffects')) {
            var textEffects = jQuery.map(model.textEffects, function (item) {
                return new TextEffectVO(item.name, item.label, item.value, item.paramName, item.min, item.max, item.step);
            });
            self.textEffects(textEffects);
            self.textEffects.unshift(new TextEffectVO("none", "None", 0));
            validate(invalidateList, 'textEffects');
        }

        if (isInvalid(invalidateList, 'showProductSelector')) {
            self.showProductSelector(model.showProductSelector);
            validate(invalidateList, 'showProductSelector');
        }

        if (isInvalid(invalidateList, 'objDClicked') && model.objDClicked) {
            var type = self.selectedObjectType();
            //-----
            switch (type) {
                case 'text':
                    openTextForm();
                    break
                case 'graphics':
                    openGraphicsColorForm();
                    break
                default:
            }
            //-----
            validate(invalidateList, 'objDClicked');
        }


        //Undo/redo
        if (isInvalid(invalidateList, 'isUndoActive')) {
            self.isUndoActive(model.isUndoActive);
            validate(invalidateList, 'isUndoActive');
        }
        if (isInvalid(invalidateList, 'isRedoActive')) {
            self.isRedoActive(model.isRedoActive);
            validate(invalidateList, 'isRedoActive');
        }

        self.suppressUpdate = false;
    }

    /**
     * UPDATE VIEW MODEL ENDS HERE
     */
};


/**
 * CUSTOM KNOCKOUT BINDINGS BEGIN HERE
 */

// bootstrap checkboxes
var uelementId = 0;
function checkUniqueId(element) {
    if (element.attr("id") == null || element.attr("id") == "") {
        uelementId++;
        element.attr("id", "de-element-id-" + uelementId);
    }
}

ko.bindingHandlers.checkbox = {
    init: function (element, valueAccessor) {
        var $element, observable;
        observable = valueAccessor();
        if (!ko.isWriteableObservable(observable)) {
            throw 'You must pass an observable or writeable computed';
        }
        $element = jQuery(element);
        $element.on('click', function () {
            observable(!observable());
        });
        ko.computed({
            disposeWhenNodeIsRemoved: element,
            read: function () {
                $element.toggleClass('active', observable());
            }
        });
    }
};

// jquery colorpicker (color)
ko.bindingHandlers.colorPickerInit = {
    init: function (element, valueAccessor) {
        var $element, observable;
        observable = valueAccessor();
        /*if (!ko.isWriteableObservable(observable)) {
         throw 'You must pass an observable or writeable computed';
         }*/
        $element = jQuery(element);
        checkUniqueId($element);
        var params = {};
        if (observable.container) params.container = $element.parent();
        if (observable.isDropup) params.isDropup = true;
        params.gap = 2;
        $element.colorPicker(params);
        if (params.container) {
            //to force toggling color palette when clicking on button in bar
            $element.parent().click(function (e) {
                $element.next('div.colorPicker-picker').click();
            });
            //stop event propagation to avoid cycling
            $element.next('div.colorPicker-picker').click(function (e) {
                e.stopPropagation();
            });

        }
    }
}

ko.bindingHandlers.colorPicker = {
    init: function (element, valueAccessor) {
        var $element, observable;
        observable = valueAccessor();
        if (!ko.isWriteableObservable(observable)) {
            throw 'You must pass an observable or writeable computed';
        }
        $element = jQuery(element);
        checkUniqueId($element);
        $element.on('change', function (event) {
            observable(jQuery(event.currentTarget).val());
        });
        ko.computed({
            disposeWhenNodeIsRemoved: element,
            read: function () {
                jQuery.fn.colorPicker.changeColor($element.attr('id'), observable());
            }
        });
    }
}


// jquery colorpicker (palette)
ko.bindingHandlers.colorPalette = {
    init: function (element, valueAccessor) {
        var $element, observableArray;
        observableArray = valueAccessor();
        if (!ko.isObservable(observableArray)) {
            throw 'You must pass an observable';
        }
        $element = jQuery(element);
        checkUniqueId($element);
        ko.computed({
            disposeWhenNodeIsRemoved: element,
            read: function () {
                var colorValues = [];
                var _observableArray = observableArray();
                for (var i = 0; i < _observableArray.length; i++) {
                    colorValues.push({value: _observableArray[i].value, name: _observableArray[i].name});
                }

                if (colorValues.length > 0) {
                    jQuery.fn.colorPicker.changeColor($element.attr('id'), colorValues[0].value);
                }
                jQuery.fn.colorPicker.setColors($element.attr('id'), colorValues);
            }
        })
    }
}

ko.bindingHandlers.productColorPalette = {
    init: function (element, valueAccessor) {
        var $element, observableArray;
        observableArray = valueAccessor();
        if (!ko.isObservable(observableArray)) {
            throw 'You must pass an observable';
        }
        $element = jQuery(element);
        checkUniqueId($element);
        ko.computed({
            disposeWhenNodeIsRemoved: element,
            read: function () {
                var colorValues = [];
                var _observableArray = observableArray();
                for (var i = 0; i < _observableArray.length; i++) {
                    colorValues.push({value: _observableArray[i].value, name: _observableArray[i].name});
                }
                jQuery.fn.colorPicker.setColors($element.attr('id'), colorValues);
            }
        })
    }
}

ko.bindingHandlers.slider = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var observable = valueAccessor();
        var allBindings = allBindingsAccessor();

        var sliderValue = ko.utils.unwrapObservable(observable);
        var rangeStart = Number(ko.utils.unwrapObservable(isNullOrUndefined(allBindings.rangeStart) ? 50 : allBindings.rangeStart));
        var rangeEnd = Number(ko.utils.unwrapObservable(isNullOrUndefined(allBindings.rangeEnd) ? 150 : allBindings.rangeEnd));
        var step = Number(ko.utils.unwrapObservable(isNullOrUndefined(allBindings.step) ? 5 : allBindings.step));
        var decimals = Number(ko.utils.unwrapObservable(isNullOrUndefined(allBindings.decimals) ? 0 : allBindings.decimals));

        sliderValue = isNullOrUndefined(sliderValue) ? rangeStart : sliderValue;
        sliderValue = Number(sliderValue);

        var slideFunction = function () {
            var value = jQuery(this).val();
            if (typeof (observable) == "function") {
                observable(value);
            }
        };

        var options = {
            start: sliderValue,
            range: {
                'min': [rangeStart],
                'max': [rangeEnd]
            },
            step: step,
            serialization: {
                format: {
                    decimals: decimals
                }
            }
        };

        var $element = jQuery(element).noUiSlider(options).on({
            slide: slideFunction
        });
        ko.computed({
            read: function () {
                var sliderValue = ko.utils.unwrapObservable(observable);
                sliderValue = isNullOrUndefined(sliderValue) ? 0 : sliderValue;
                $element.val(sliderValue);
            }
        });
    }
};


ko.bindingHandlers.rangeStart = {
    update: (function () {
        var valuesHolder = {};
        var updater = function (element, valueAccessor, allBindingsAccessor) {
            var slider = jQuery(element);
            var rangeEnd = ko.utils.unwrapObservable(valueAccessor());
            if (rangeEnd != valuesHolder[slider.attr("id")]) {
                designerUI.laUpdateSliderRange(element, valueAccessor, allBindingsAccessor);
            }
            valuesHolder[slider.attr("id")] = rangeEnd;
        };
        return updater;
    })()
};

ko.bindingHandlers.rangeEnd = {
    update: (function () {
        var valuesHolder = {};
        var updater = function (element, valueAccessor, allBindingsAccessor) {
            var slider = jQuery(element);
            var rangeEnd = ko.utils.unwrapObservable(valueAccessor());
            if (rangeEnd != valuesHolder[slider.attr("id")]) {
                designerUI.laUpdateSliderRange(element, valueAccessor, allBindingsAccessor);
            }
            valuesHolder[slider.attr("id")] = rangeEnd;
        }
        return updater;
    })()
};

designerUI.laUpdateSliderRange = function (element, valueAccessor, allBindingsAccessor) {
    var slider = jQuery(element);
    var allBindings = allBindingsAccessor();
    var rangeStart = Number(ko.utils.unwrapObservable(isNullOrUndefined(allBindings.rangeStart) ? 50 : allBindings.rangeStart));
    var rangeEnd = Number(ko.utils.unwrapObservable(isNullOrUndefined(allBindings.rangeEnd) ? 150 : allBindings.rangeEnd));
    var mergedOptions = {
        range: {
            'min': [rangeStart],
            'max': [rangeEnd]
        }
    };
    slider.noUiSlider(mergedOptions, true);
};

ko.bindingHandlers.step = {
    update: (function () {
        var valuesHolder = {};
        var updater = function (element, valueAccessor, allBindingsAccessor) {
            var slider = jQuery(element);
            var rangeEnd = ko.utils.unwrapObservable(valueAccessor());
            if (rangeEnd != valuesHolder[slider.attr("id")]) {
                var allBindings = allBindingsAccessor();
                var step = Number(ko.utils.unwrapObservable(isNullOrUndefined(allBindings.step) ? 50 : allBindings.step));
                var mergedOptions = {
                    step: step
                };
                slider.noUiSlider(mergedOptions, true);
            }
            valuesHolder[slider.attr("id")] = rangeEnd;
        };
        return updater;
    })()
};

// Knockout checked binding doesn't work with Bootstrap radio-buttons
//origin: https://github.com/faulknercs/Knockstrap/blob/master/src/bindings/radioBinding.js
ko.bindingHandlers.radio = {
    init: function (element, valueAccessor) {

        if (!ko.isObservable(valueAccessor())) {
            throw new Error('radio binding should be used only with observable values');
        }

        jQuery(element).on('change', 'input:radio', function (e) {
            // we need to handle change event after bootsrap will handle its event
            // to prevent incorrect changing of radio button styles
            setTimeout(function () {
                var radio = jQuery(e.target),
                    value = valueAccessor(),
                    newValue = radio.val();

                value(newValue);
            }, 0);
        });
    },

    update: function (element, valueAccessor) {
        var $radioButton = jQuery(element).find('input[value="' + ko.utils.unwrapObservable(valueAccessor()) + '"]'),
            $radioButtonWrapper;

        if ($radioButton.length) {
            $radioButtonWrapper = $radioButton.parent();

            $radioButtonWrapper.siblings().removeClass('active');
            $radioButtonWrapper.addClass('active');

            $radioButton.prop('checked', true);
        } else {
            $radioButtonWrapper = jQuery(element).find('.active');
            $radioButtonWrapper.removeClass('active');
            $radioButtonWrapper.find('input').prop('checked', false);
        }
    }
};


designerUI.validationError = function (element, message) {
    element.tooltip({
        title: message,
        trigger: "manual"
    });
    element.addClass('error');
    element.tooltip('show');
};

designerUI.validationSuccess = function (element) {
    element.tooltip('destroy');
    element.removeClass('error');
};

/**
 * CUSTOM KNOCKOUT BINDINGS END HERE
 */


/**
 * MODAL POPUP WINDOWS AND BUTTONS EVENTS BEGIN HERE
 */

function showAuthDialog() {
    jQuery("#designer-authorization-popup").modal("show");
}

function onAuthDialogSubmit(event) {
    if (event == null || event.keyCode == 13) {
        var email = jQuery("#designer-authorization-email-input").val();
        userInteract({
            authorize: email
        });
        jQuery("#designer-authorization-popup").modal("hide");
    }
}

function showAuthAndSaveDialog() {
    jQuery("#designer-auth-and-save-dialog").modal("show");
}

function onAuthAndSaveDialogSubmit(event) {
    if (event == null || event.keyCode == 13) {
        var email = jQuery("#designer-auth-and-save-email-input").val();
        userInteract({
            authorize: email
        }); // if auth will be async - we need callback here
        var name = jQuery("#designer-auth-and-save-name-input").val();
        userInteract({
            saveDesign: name
        });
        jQuery("#designer-auth-and-save-dialog").modal("hide");
    }
}

function showSaveDesignDialog() {
    jQuery("#designer-save-design-popup").modal("show");
}

function onSaveDesignDialogSubmit(event) {
    if (event == null || event.keyCode == 13) {
        var name = jQuery("#designer-save-design-name-input").val();
        userInteract({
            saveDesign: name
        });
        jQuery("#designer-save-design-popup").modal("hide");
    }
}

function showLoadDesignDialog() {
    jQuery("#designer-designs-list-popup").modal("show");
}

function openTextForm() {
    /*designerUI.openTab('text-tab');*/
    $('a[href="text-tab"]').trigger('click');
    designerUI.setFocusToTextTab();
}

//-----
function openGraphicsColorForm() {
    /*designerUI.openTab('graphics-tab');*/
    $('a[href="graphics-tab"]').trigger('click');
    controlsModel.colorsTabFormsState('colorForm');
    $('.left-column').addClass('upload-form');
};

function hideGraphicsColorForm() {
    controlsModel.colorsTabFormsState('addForm');
    $('.left-column').removeClass('upload-form');
};
//-----

function onLoadDesignDialogSubmit(event) {
    if (event == null || event.keyCode == 13) {
        if (controlsModel.selectedDesign() != null) {
            jQuery("#designer-designs-list-popup").modal("hide");
            userInteract({
                loadDesign: controlsModel.selectedDesign().id
            });
        }
    }
}

function showColorCountDialog() {
    controlsModel.imageColorCount(new ImageColorCountVO(false, 1));
    jQuery("#designer-color-count-popup").modal({
        backdrop: false
    });
    //jQuery("#designer-color-count-popup").modal("show");
    jQuery('#designer-color-count-popup').on('shown', function () {
        var backdrop = jQuery('<div class="modal-backdrop" />').appendTo(document.body).css({
            opacity: 0
        });
        //jQuery(".modal-backdrop").css({ opacity: 0 });
    });
    jQuery('#designer-color-count-popup').on('hidden', function () {
        jQuery(".modal-backdrop").detach();
        //jQuery(".modal-backdrop").css({ opacity: 0 });
    });
}


function onColorCountDialogSubmit() {
    userInteract({
        imageColorCount: controlsModel.imageColorCount().toObject()
    });
    jQuery("#designer-color-count-popup").modal("hide");
}

jQuery("#designer-authorization-popup").on("hidden", function () {
    jQuery("#place-order-btn").button("reset");
});

jQuery("#designer-auth-and-save-dialog").on("hidden", function () {
    jQuery("#place-order-btn").button("reset");
});

function onShareDesign() {
    userInteract({
        shareDesign: ""
    });
}

function showShareLink() {
    jQuery("#designer-share-link-popup").modal("show");
}


function onSaveDesign() {
    userInteract({
        saveDesign: ""
    });
}

function onLoadDesign() {
    userInteract({
        loadDesign: ""
    });
}

function onPlaceOrder() {
    jQuery("#place-order-btn").button("loading");
    userInteract({
        placeOrder: true
    });
}

function placeOrderHandler(id) {
    if (id && controlsModel.redirectUrl) {
        var serverUrl = "services/order.php?design_id=${design_id}";
        window.location.assign(controlsModel.redirectUrl().replace("${design_id}", id));
    }
    jQuery("#place-order-btn").button("reset");
}

//TODO: revert before publishing
//window.onbeforeunload = function () {
//    if (!controlsModel.status().designSaved) {
//        return "By exiting this page all design changes will be lost. This window might also popup as a hickup - then just skip it and continue to have fun!";
//    } else {
//    }
//}

/**
 * MODAL POPUP WINDOWS AND BUTTONS EVENTS END HERE
 */

//debug
function magic() {
    designer.magic();
}

function magic2() {
    designer.magic(true);
}

// create controls view model
var controlsModel = new DEControlsModel();
ko.applyBindings(controlsModel);
var nnQuantitySynchronizer = new NNQuantitySynchronizer(controlsModel);// add additional properties request for NNQuantitySynchronizer

// before use uncoment it in .ts file
//var nnDebugHelper = new NNDebugHelper(controlsModel, true); //trackNamesNumberSizeQuantities=true 


// this handler will be invoked when UI needs to be updated
function controlsUpdateHandler(updatedModel) {
    controlsModel.update(updatedModel);
}

// this handler will be invoked when Designer core need to be updated
function userInteract(o) {
    if (!controlsModel.suppressUpdate)
        designer.userInteract(o);
}

/**
 * DESIGNER INITALIZATION BEGINS HERE
 */

var options = {};

options.defaultDesignId = decodeURI((RegExp("design_id" + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
options.defaultProductId = decodeURI((RegExp("product_id" + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
options.defaultGraphicId = decodeURI((RegExp("graphic_id" + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);

options.placeOrderHandler = null;

//designer.debug();
var defaultDesignId = decodeURI((RegExp("design_id" + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
designer.init(
    document.getElementById('canvas-container'),
    AjaxRequest.ajaxurl + "?action=wcla_config_json&productid=" + AjaxRequest.productid + "&design_id=" + AjaxRequest.design_id,
    controlsUpdateHandler, null/*, placeOrderHandler*/, options
);

/**
 * DESIGNER INITALIZATION ENDS HERE
 */