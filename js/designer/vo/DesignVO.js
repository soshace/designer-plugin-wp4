var DEJS;
(function (DEJS) {
    ///<reference path="../Util.ts"/>
    ///<reference path="Obj.ts"/>
    ///<reference path="VO.ts"/>
    (function (VO) {
        //This will also be used for Order.
        //So add here Quantity, sizes and all other staff.
        var DesignVO = (function () {
            function DesignVO() {
                this.svgs = [];
                this.editableArea = [];
                this.quantities = [];
                this.prices = [];
                this.notes = '';
                this.namesNumbers = [];
            }
            DesignVO.prototype.toJSON = function () {
                var data = {};
                if (this.product) {
                    data.product = {};
                    data.product.id = this.product.id;
                    data.product.name = this.product.name;
                    data.product.template = this.product.template;
                    if (this.productColor) {
                        data.product.color = this.productColor.value;
                        data.product.colorName = this.productColor.name;
                    }
                    if (this.productSize) {
                        data.product.size = this.productSize.toObject();
                    }
                    data.locations = [];
                    for (var i = 0; i < this.product.locations.length; i++) {
                        var location = {};
                        location.name = this.product.locations[i].name;
                        if (this.editableArea && this.editableArea[i])
                            location.editableArea = this.editableArea[i];
                        location.svg = this.svgs[i];
                        data.locations.push(location);
                    }
                }
                if (this.productVariation) {
                    data.variationId = this.productVariation.id;
                }
                data.quantities = this.quantities;
                data.prices = this.prices;
                data.namesNumbers = [];
                for (var i = 0; i < this.namesNumbers.length; i++) {
                    data.namesNumbers.push(this.namesNumbers[i].toObject());
                }
                data.notes = this.notes;
                return JSON.stringify({ data: data });
            };
            return DesignVO;
        })();
        VO.DesignVO = DesignVO;

        var DesignLocationVO = (function () {
            function DesignLocationVO(loc) {
                this.name = "";
                this.svg = "";
                if (loc.name)
                    this.name = loc.name;
                if (loc.svg)
                    this.svg = loc.svg;
            }
            return DesignLocationVO;
        })();
        VO.DesignLocationVO = DesignLocationVO;

        var NamesNumbersVO = (function () {
            function NamesNumbersVO(obj) {
                this.name = "";
                this.numberText = "";
                this.size = "";
                if (!obj)
                    return;
                if (obj.name)
                    this.name = obj.name;
                if (obj["number"])
                    this.numberText = obj["number"];
                if (obj.size)
                    this.size = obj.size;
            }
            NamesNumbersVO.prototype.toObject = function () {
                return { name: this.name, "number": this.numberText, size: this.size };
            };
            return NamesNumbersVO;
        })();
        VO.NamesNumbersVO = NamesNumbersVO;

        var ImageColorCountVO = (function () {
            function ImageColorCountVO(value) {
                this.colorCount = 0;
                this.processColors = false;
                if (!value)
                    return;
                if (value.colorCount)
                    this.colorCount = value.colorCount;
                if (value.processColors)
                    this.processColors = value.processColors;
            }
            return ImageColorCountVO;
        })();
        VO.ImageColorCountVO = ImageColorCountVO;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));