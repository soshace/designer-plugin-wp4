var DEJS;
(function (DEJS) {
    (function (VO) {
        var DEOptions = (function () {
            function DEOptions(options) {
                this.allowedOptions = ["deleteOnDoubleClick", "dpi", "minDPU", "includePrintingAreaInDesign", "includeMaskInDesign", "includeProductInDesign", "fontsCSSUrl", "minZoom", "maxZoom", "zoomStep", "referenceImage", "referenceShift", "referenceWidth", "referenceHeight", "zoomEnabled", "checkeredBackground", "unit", "unit2", "unitConversionMult", "showProductSelector", "checkTextFXThrottle"];
                this.deleteOnDoubleClick = false;
                this.dpi = 72;
                this.minDPU = 0;
                this.includePrintingAreaInDesign = false;
                this.includeMaskInDesign = false;
                this.includeProductInDesign = false;
                this.fontsCSSUrl = "";
                this.minZoom = 50;
                this.maxZoom = 150;
                this.zoomStep = 10;
                this.referenceImage = "";
                this.referenceShift = 0;
                this.referenceWidth = 0;
                this.referenceHeight = 0;
                this.zoomEnabled = false;
                this.checkeredBackground = false;
                this.unit = "";
                this.unit2 = "";
                this.unitConversionMult = 10;
                this.showProductSelector = true;
                this.checkTextFXThrottle = 400;
                if (!options)
                    return;
                for (var key in options) {
                    if (this.allowedOptions.indexOf(key) >= 0) {
                        this[key] = options[key];
                    }
                }
            }
            return DEOptions;
        })();
        VO.DEOptions = DEOptions;


    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));