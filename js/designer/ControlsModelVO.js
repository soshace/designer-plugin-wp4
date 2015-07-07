var DEJS;
(function (DEJS) {
    ///<reference path="ConfigVO.ts"/>
    (function (VO) {
        var ControlsModelVO = (function () {
            function ControlsModelVO() {
                this.obj = {};
                this.productCategories = [];
                //products: ProductVO[] = [];
                //setProducts(value: VO.ProductVO[]) { this.products = value; this.obj["products"] = Util.arrayToObjArray(value); this.invalidate("products"); }
                this.selectedProduct = null;
                this.selectedProductCategory = null;
                this.selectedProductColor = null;
                this.colors = [];
                /*selectedProductVariation: ProductVariationVO = null;  //VCGLL
                 setSelectedProductVariation(value: VO.ProductVariationVO) {
                 this.selectedProductVariation = value;
                 this.obj["selectedProductVariation"] = value ? this.selectedProductVariation.toObject() : null;
                 this.invalidate("selectedProductVariation");
                 }*/
                this.fonts = [];
                this.graphicsCategories = [];
                //graphics: GraphicsVO[] = [];
                //setGraphics(value: VO.GraphicsVO[]) { this.graphics = value; this.obj["graphics"] = value; this.invalidate("graphics"); }
                this.textEffects = [];
                this.selectedObj = null;
                //productLocations: string[] = [];
                //setProductLocations(value: string[]) { this.productLocations = value; this.obj["productLocations"] = value; this.invalidate("productLocations"); }
                this.selectedProductLocation = "";
                this.quantities = [];
                this.namesNumbers = [];
                this.selectedProductSize = null;
                this.designs = [];
                this.status = new StatusVO();
                this.designInfo = new VO.DesignInfoVO();
                this.designNotes = '';
                this.showAuthDialog = false;
                this.showAuthAndSaveDialog = false;
                this.showSaveDesignDialog = false;
                this.showLoadDesignDialog = false;
                this.showDPUExceededDialog = false;
                this.showColorCountDialog = false;
                this.shareLink = "";
                this.showShareLink = false;
                this.zoom = 100;
                this.minZoom = 100;
                this.maxZoom = 100;
                this.zoomEnabled = false;
                this.objDClicked = null;
                this.uploadFileAvailable = false;
                //VCGLL
                /*restrictions: VO.RestrictionsVO = new RestrictionsVO();
                 setRestrictions(value: VO.RestrictionsVO) { this.restrictions = value; this.obj["restrictions"] = value; this.invalidate("restrictions"); }*/
                this.strictTemplate = false;
                this.showProductSelector = false;
                this.isUndoActive = false;
                this.isRedoActive = false;
                //This is the list of changed objects
                this.invalidateList = [];
                this.obj["productCategories"] = [];

                //this.obj["products"] = [];
                this.obj["selectedProduct"] = null;
                this.obj["selectedProductCategory"] = null;
                this.obj["selectedProductColor"] = null;
                this.obj["colors"] = [];

                //this.obj["selectedProductVariation"] = null;  //VCGLL
                this.obj["fonts"] = [];
                this.obj["graphicsCategories"] = [];

                //this.obj["graphics"] = [];
                this.obj["textEffects"] = [];
                this.obj["selectedObj"] = null;
                this.obj["selectedProductLocation"] = "";
                this.obj["quantities"] = [];
                this.obj["namesNumbers"] = [];
                this.obj["selectedProductSize"] = [];
                this.obj["designs"] = [];
                this.obj["status"] = this.status;
                this.obj["designInfo"] = this.designInfo;
                this.obj["showAuthDialog"] = false;
                this.obj["showAuthAndSaveDialog"] = false;
                this.obj["showSaveDesignDialog"] = false;
                this.obj["showLoadDesignDialog"] = false;

                //this.obj["showDPUExceededDialog"] = false;
                this.obj["showColorCountDialog"] = false;
                this.obj["shareLink"] = "";
                this.obj["showShareLink"] = false;
                this.obj["zoom"] = 100;
                this.obj["zoomEnabled"] = false;
                this.obj["minZoom"] = 50;
                this.obj["maxZoom"] = 150;
                this.obj["objDClicked"] = null;

                //this.obj["restrictions"] = this.restrictions;
                this.obj["designNotes"] = "";
                this.obj["uploadFileAvailable"] = false;
                this.obj["strictTemplate"] = false;
                this.obj["showProductSelector"] = true;
                this.obj["isUndoActive"] = false;
                this.obj["isRedoActive"] = false;
                this.obj["invalidateList"] = this.invalidateList;
            }
            ControlsModelVO.prototype.setProductCategories = function (value) {
                this.productCategories = value;
                this.obj["productCategories"] = DEJS.Util.arrayToObjArray(value);
                this.invalidate("productCategories");
            };

            ControlsModelVO.prototype.setSelectedProduct = function (value) {
                this.selectedProduct = value;
                this.obj["selectedProduct"] = value ? this.selectedProduct.toObject() : null;
                this.invalidate("selectedProduct");
            };

            ControlsModelVO.prototype.setSelectedProductCategory = function (value) {
                this.selectedProductCategory = value;
                this.obj["selectedProductCategory"] = this.selectedProductCategory.toObject();
                this.invalidate("selectedProductCategory");
            };

            ControlsModelVO.prototype.setSelectedProductColor = function (value) {
                this.selectedProductColor = value;
                this.obj["selectedProductColor"] = value ? this.selectedProductColor.toObject() : null;
                this.invalidate("selectedProductColor");
            };

            ControlsModelVO.prototype.setColors = function (value) {
                this.colors = value;
                this.obj["colors"] = DEJS.Util.arrayToObjArray(value);
                this.invalidate("colors");
            };

            ControlsModelVO.prototype.setFonts = function (value) {
                this.fonts = value;
                this.obj["fonts"] = value;
                this.invalidate("fonts");
            };

            ControlsModelVO.prototype.setGraphicsCategories = function (value) {
                this.graphicsCategories = value;
                this.obj["graphicsCategories"] = DEJS.Util.arrayToObjArray(value);
                this.invalidate("graphicsCategories");
            };

            ControlsModelVO.prototype.setTextEffects = function (value) {
                this.textEffects = value;
                this.obj["textEffects"] = DEJS.Util.arrayToObjArray(value);
                this.invalidate("textEffects");
            };

            ControlsModelVO.prototype.setSelectedObj = function (value) {
                this.selectedObj = value;
                this.obj["selectedObj"] = value;
                this.invalidate("selectedObj");
            };

            ControlsModelVO.prototype.setSelectedProductLocation = function (value) {
                this.selectedProductLocation = value;
                this.obj["selectedProductLocation"] = value;
                this.invalidate("selectedProductLocation");
            };

            ControlsModelVO.prototype.setQuantities = function (value) {
                this.quantities = value;
                this.obj["quantities"] = value;
                this.invalidate("quantities");
            };

            ControlsModelVO.prototype.setNamesNumbers = function (value) {
                this.namesNumbers = value;
                this.obj["namesNumbers"] = value;
                this.invalidate("namesNumbers");
            };

            ControlsModelVO.prototype.setSelectedProductSize = function (value) {
                this.selectedProductSize = value;
                this.obj["selectedProductSize"] = this.selectedProductSize;
                this.invalidate("selectedProductSize");
            };

            ControlsModelVO.prototype.setDesigns = function (value) {
                this.designs = value;
                this.obj["designs"] = value;
                this.invalidate("designs");
            };

            ControlsModelVO.prototype.setStatus = function (value) {
                this.status = value;
                this.obj["status"] = value;
                this.invalidate("status");
            };

            ControlsModelVO.prototype.setDesignInfo = function (value) {
                this.designInfo = value;
                this.obj["designInfo"] = value;
                this.invalidate("designInfo");
            };

            ControlsModelVO.prototype.setDesignNotes = function (notes) {
                this.designNotes = notes;
                this.obj["designNotes"] = notes;
                this.invalidate("designNotes");
            };

            ControlsModelVO.prototype.setShowAuthDialog = function (value) {
                this.showAuthDialog = value;
                this.obj["showAuthDialog"] = value;
                this.invalidate("showAuthDialog");
            };

            ControlsModelVO.prototype.setShowAuthAndSaveDialog = function (value) {
                this.showAuthAndSaveDialog = value;
                this.obj["showAuthAndSaveDialog"] = value;
                this.invalidate("showAuthAndSaveDialog");
            };

            ControlsModelVO.prototype.setShowSaveDesignDialog = function (value) {
                this.showSaveDesignDialog = value;
                this.obj["showSaveDesignDialog"] = value;
                this.invalidate("showSaveDesignDialog");
            };

            ControlsModelVO.prototype.setShowLoadDesignDialog = function (value) {
                this.showLoadDesignDialog = value;
                this.obj["showLoadDesignDialog"] = value;
                this.invalidate("showLoadDesignDialog");
            };

            ControlsModelVO.prototype.setShowDPUExceededDialog = function (value) {
                this.showDPUExceededDialog = value;
                this.obj["showDPUExceededDialog"] = value;
                this.invalidate("showDPUExceededDialog");
            };

            ControlsModelVO.prototype.setShowColorCountDialog = function (value) {
                this.showColorCountDialog = value;
                this.obj["showColorCountDialog"] = value;
                this.invalidate("showColorCountDialog");
            };

            ControlsModelVO.prototype.setShareLink = function (value) {
                this.shareLink = value;
                this.obj["shareLink"] = value;
                this.invalidate("shareLink");
            };

            ControlsModelVO.prototype.setShowShareLink = function (value) {
                this.showShareLink = value;
                this.obj["showShareLink"] = value;
                this.invalidate("showShareLink");
            };

            ControlsModelVO.prototype.setZoom = function (value) {
                this.zoom = value;
                this.obj["zoom"] = value;
                this.invalidate("zoom");
            };

            ControlsModelVO.prototype.setMinZoom = function (value) {
                this.minZoom = value;
                this.obj["minZoom"] = value;
                this.invalidate("minZoom");
            };

            ControlsModelVO.prototype.setMaxZoom = function (value) {
                this.maxZoom = value;
                this.obj["maxZoom"] = value;
                this.invalidate("maxZoom");
            };

            ControlsModelVO.prototype.setZoomEnabled = function (value) {
                this.zoomEnabled = value;
                this.obj["zoomEnabled"] = value;
                this.invalidate("zoomEnabled");
            };

            ControlsModelVO.prototype.setObjDClicked = function (value) {
                this.objDClicked = this.obj["objDClicked"] = value;
                this.invalidate("objDClicked");
            };

            ControlsModelVO.prototype.setUploadFileAvailable = function (value) {
                this.uploadFileAvailable = value;
                this.obj["uploadFileAvailable"] = value;
                this.invalidate("uploadFileAvailable");
            };

            ControlsModelVO.prototype.setStrictTemplate = function (value) {
                this.strictTemplate = value;
                this.obj["strictTemplate"] = value;
                this.invalidate("strictTemplate");
            };

            ControlsModelVO.prototype.setShowProductSelector = function (value) {
                this.showProductSelector = value;
                this.obj["showProductSelector"] = value;
                this.invalidate("showProductSelector");
            };

            ControlsModelVO.prototype.setIsUndoActive = function (value) {
                this.isUndoActive = value;
                this.obj["isUndoActive"] = value;
                this.invalidate("isUndoActive");
            };

            ControlsModelVO.prototype.setIsRedoActive = function (value) {
                this.isRedoActive = value;
                this.obj["isRedoActive"] = value;
                this.invalidate("isRedoActive");
            };

            ControlsModelVO.prototype.invalidate = function (item) {
                if (DEJS.Util.arrayIndexOf(item, this.invalidateList) == -1)
                    this.invalidateList.push(item);
            };

            ControlsModelVO.prototype.toObject = function () {
                return this.obj;
            };

            ControlsModelVO.prototype.cloneObj = function () {
                DEJS.Util.copyObject(this.obj);
            };
            return ControlsModelVO;
        })();
        VO.ControlsModelVO = ControlsModelVO;

        var StatusVO = (function () {
            function StatusVO(message, showProgress, completed, percentCompleted) {
                if (typeof message === "undefined") { message = ""; }
                if (typeof showProgress === "undefined") { showProgress = false; }
                if (typeof completed === "undefined") { completed = false; }
                if (typeof percentCompleted === "undefined") { percentCompleted = 0; }
                this.message = message;
                this.showProgress = showProgress;
                this.completed = completed;
                this.percentCompleted = 0;
                this.designSaved = true;
                this.imageUploading = false;
                this.percentCompleted = Math.floor(percentCompleted);
            }
            return StatusVO;
        })();
        VO.StatusVO = StatusVO;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));