var DEJS;
(function (DEJS) {
    ///<reference path="../Util.ts"/>
    ///<reference path="Obj.ts"/>
    ///<reference path="VO.ts"/>
    (function (VO) {
        var QuoteVO = (function () {
            function QuoteVO() {
                this.productColor = null;
                this.productColors = null;
                this.productSize = null;
                this.locations = [];
                this.dpuExceeded = false;
                this.namesNumbers = [];
            }
            QuoteVO.prototype.toObject = function (dpi) {
                var data = {};
                if (this.product) {
                    data.product = {};
                    data.product.id = this.product.id;
                    if (this.productColor) {
                        data.product.color = this.productColor.value;
                        data.product.colorName = this.productColor.name;
                    }
                    if (this.productColors) {
                        data.product.productColors = [];
                        for (var i = 0; i < this.productColors.length; i++) {
                            data.product.productColors.push({ id: this.productColors[i].id, name: this.productColors[i].name, value: this.productColors[i].value });
                        }
                    }
                    if (this.productSize) {
                        data.product.size = this.productSize.toObject();
                    }
                }
                data.locations = [];
                for (var i = 0; i < this.locations.length; i++) {
                    data.locations.push(this.locations[i].toObject(dpi));
                }
                if (this.namesNumbers.length > 0)
                    data.namesNumbers = DEJS.Util.arrayToObjArray(this.namesNumbers);
                return data;
            };
            return QuoteVO;
        })();
        VO.QuoteVO = QuoteVO;

        var QuoteLocationVO = (function () {
            function QuoteLocationVO(sourceLocation) {
                this.name = "";
                this.objects = [];
                this.colorsCount = 0;
                this.colors = [];
                this.areaCoords = null;
                this.designedArea = 0;
                this.processColors = false;
                this.dpu = 1;
                //dpuExceeded: boolean = false;//VCGLL
                this.designedSize = null;
                this.name = sourceLocation.name;
                this.dpu = sourceLocation.dpu;
            }
            QuoteLocationVO.prototype.addObject = function (object) {
                if (object.processColors) {
                    this.processColors = true;
                } else if (object.fakeColorsNum > 0) {
                    this.colorsCount += object.fakeColorsNum;
                } else {
                    var tempLength = this.colors.length;
                    this.colors = DEJS.Util.mergeArrays(this.colors, object.colors);
                    this.colorsCount += this.colors.length - tempLength;
                }
                this.designedArea += object.designedArea;
                if (!this.areaCoords) {
                    this.areaCoords = object.areaCoords;
                } else if (object.areaCoords) {
                    this.areaCoords[0] = Math.min(this.areaCoords[0], object.areaCoords[0]);
                    this.areaCoords[1] = Math.min(this.areaCoords[1], object.areaCoords[1]);
                    this.areaCoords[2] = Math.max(this.areaCoords[2], object.areaCoords[2]);
                    this.areaCoords[3] = Math.max(this.areaCoords[3], object.areaCoords[3]);
                }

                //this.dpuExceeded = this.dpuExceeded || object.dpuExceed;//VCGLL
                this.objects.push(object);
            };

            QuoteLocationVO.prototype.toObject = function (dpi) {
                if (typeof dpi === "undefined") { dpi = 1; }
                if (!this.areaCoords)
                    this.areaCoords = [0, 0, 0, 0];

                var location = {};
                location.name = this.name;
                if (this.processColors)
                    location.colors = "processColors";
                else
                    location.colors = this.colorsCount;

                location.colorsList = this.colors.slice(0);

                // IMPORTANT dpi is ignored
                // using calculated dpu from product instead
                location.designedArea = this.designedArea / (this.dpu * this.dpu);
                location.designedAreaRect = (this.areaCoords[0] - this.areaCoords[2]) * (this.areaCoords[1] - this.areaCoords[3]) / (this.dpu * this.dpu);
                location.objects = [];
                var letterings = 0;
                var images = 0;
                for (var i = 0; i < this.objects.length; i++) {
                    var obj = this.objects[i];
                    var objRecord = {};
                    objRecord.type = obj.type;
                    if (obj.type == ObjectType.Text)
                        letterings++;
                    else
                        images++;
                    if (obj.sourceId && obj.sourceId.length > 0)
                        objRecord.id = obj.sourceId;
                    if (obj.text.length > 0)
                        objRecord.text = obj.text;
                    objRecord.designedArea = obj.designedArea / (this.dpu * this.dpu);
                    if (obj.processColors) {
                        objRecord.colors = "processColors";
                    } else if (obj.fakeColorsNum == 0) {
                        objRecord.colors = obj.colors.length;
                        objRecord.colorsList = obj.colors.slice(0);
                    } else {
                        objRecord.colors = obj.fakeColorsNum;
                    }

                    location.objects.push(objRecord);
                }
                location.objectCount = this.objects.length;
                location.letterings = letterings;
                location.images = images;
                if (this.designedSize) {
                    location.designedWidth = this.designedSize.width;
                    location.designedHeight = this.designedSize.height;
                }

                return location;
            };

            QuoteLocationVO.prototype.toColorsCount = function () {
                var res = new VO.ColorsCountVO();
                res.location = this.name;
                res.count = this.colorsCount;

                if (this.processColors)
                    res.count = -1;
                return res;
            };
            return QuoteLocationVO;
        })();
        VO.QuoteLocationVO = QuoteLocationVO;

        var QuoteObjectVO = (function () {
            function QuoteObjectVO(sourceObj) {
                this.type = "";
                this.sourceId = "";
                this.text = "";
                this.processColors = false;
                this.fakeColorsNum = 0;
                this.colors = [];
                this.designedArea = 0;
                this.areaCoords = null;
                this.sourceObj = sourceObj;
                this.type = sourceObj.type;
                switch (this.type) {
                    case ObjectType.Text:
                        var attr = sourceObj.attr();
                        this.text = attr["text"];
                        var fillColor = attr["fill"];
                        var stroke = attr["stroke"];
                        this.colors.push(DEJS.Util.normColor(fillColor));
                        if (stroke && stroke != "none" && stroke != fillColor)
                            this.colors.push(DEJS.Util.normColor(stroke));
                        break;
                    case ObjectType.SVG:
                        var attr = sourceObj.attr();
                        this.sourceId = sourceObj.getSourceId();

                        if (attr['processColors']) {
                            this.processColors = true;
                        } else if (attr['colorsNumber'] > 0) {
                            this.fakeColorsNum = attr['colorsNumber'];
                        } else if (sourceObj.multicolor) {
                            for (var i = 0; i < sourceObj.complexColor.colorizeList.length; i++) {
                                this.colors.push(DEJS.Util.normColor(sourceObj.complexColor.colorizeList[i].value));
                            }
                        } else if (attr['colorize']) {
                            var attr = sourceObj.attr();
                            var fillColor = attr["fill"];
                            var stroke = attr["stroke"];
                            this.colors.push(DEJS.Util.normColor(fillColor));
                            if (stroke && stroke != "none" && stroke != fillColor)
                                this.colors.push(DEJS.Util.normColor(stroke));
                        } else {
                            //not colorized by user - nothing predefined - doing nothing
                        }
                        break;
                    case ObjectType.Image:
                        var attr = sourceObj.attr();
                        this.sourceId = sourceObj.getSourceId();
                        if (attr['processColors']) {
                            //from config if colors = '-1'
                            this.processColors = true;
                        }
                        if (attr['colorsNumber'] > 0) {
                            this.fakeColorsNum = attr['colorsNumber'];
                        }
                        break;
                }
                this.designedArea = sourceObj.getDesignedArea();
                this.areaCoords = sourceObj.getAreaCoords();
                //this.dpuExceed = sourceObj.dpuExceeded;//VCGLL
            }
            return QuoteObjectVO;
        })();
        VO.QuoteObjectVO = QuoteObjectVO;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));