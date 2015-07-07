var DEJS;

(function (DEJS) {
    (function (VO) {
        var StyleVO = (function () {
            function StyleVO(css, attr2) {
                this.classList = {};
                this.colorizableList = [];
                this.symbolId = "";
                this.fromString(css, attr2);
            }
            StyleVO.prototype.fromString = function (css, attr2) {
                var colorizableGroups = null;
                if (attr2 && typeof (attr2) == 'string') {
                    this.symbolId = attr2;
                }
                if (attr2 && attr2 instanceof Array) {
                    colorizableGroups = attr2;
                }

                this.classList = {};
                var ruleAr = css.split("}");
                for (var i = 0; i < ruleAr.length; i++) {
                    var ar = ruleAr[i].split("{");
                    if (ar.length >= 2) {
                        var stClass = new StyleClassVO();
                        stClass.name = DEJS.Util.cleanUID(ar[0].trim());
                        var attrAr = ar[1].split(";");
                        for (var j = 0; j < attrAr.length; j++) {
                            var attrParts = attrAr[j].split(":");
                            if (attrParts.length >= 2) {
                                var stAttr = new StyleAttrVO();
                                stAttr.name = attrParts[0].trim();
                                stAttr.value = attrParts[1].trim();
                                stClass.attrList.push(stAttr);
                            }
                        }
                        this.classList[stClass.name] = stClass;
                    }
                }

                if (colorizableGroups) {
                    //override classList for VRJS products
                    //we take classes from json config, style colors from product svg and generate new product styles
                    var classListUpdated = {};
                    for (var i = 0; i < colorizableGroups.length; i++) {
                        for (var j = 0; j < colorizableGroups[i].classes.length; j++) {
                            //classes extracted from
                            var colElement = colorizableGroups[i].classes[j];

                            //to
                            var stClass = new StyleClassVO();

                            var colElementParts = colElement.id.split(".");
                            var colElementAttr = colElementParts.pop();
                            var colElementName = colElementParts.join(".");
                            stClass.name = colElementName;
                            var stAttr = new StyleAttrVO();
                            stAttr.name = colElementAttr;

                            //search for real value
                            var val = "";
                            for (var origStClass in this.classList) {
                                var curStClass = this.classList[origStClass];
                                if (colElement.id.indexOf(curStClass.name) >= 0) {
                                    //TODO: add search
                                    val = curStClass.attrList[0].value;
                                }
                            }
                            stAttr.value = val;
                            stClass.attrList.push(stAttr);

                            classListUpdated[stClass.name] = stClass;
                        }
                    }
                    this.classList = classListUpdated;
                }

                this.processClassList();
            };

            StyleVO.prototype.processClassList = function () {
                this.colorizableList = [];
                for (var key in this.classList) {
                    var stClass = this.classList[key];
                    var fillAttr = DEJS.Util.arrayFind(stClass.attrList, "name", "fill");
                    if (fillAttr) {
                        var fillEl = new ColorizableElementVO();
                        fillEl.className = DEJS.Util.cleanUID(stClass.name);
                        fillEl.attrName = fillAttr.name;
                        fillEl.formId();
                        fillEl.value = fillAttr.value;
                        var fillNameAttr = DEJS.Util.arrayFind(stClass.attrList, "name", "de-fill-name");
                        if (fillNameAttr) {
                            var sAr = fillNameAttr.value.split('"');
                            if (sAr.length > 1)
                                fillEl.name = sAr[1];
                            else
                                fillEl.name = fillNameAttr.value;
                        }
                        this.colorizableList.push(fillEl);
                    }
                    var strokeAttr = DEJS.Util.arrayFind(stClass.attrList, "name", "stroke");
                    if (strokeAttr) {
                        var strokeEl = new ColorizableElementVO();
                        strokeEl.className = DEJS.Util.cleanUID(stClass.name);
                        ;
                        strokeEl.attrName = strokeAttr.name;
                        strokeEl.formId();
                        strokeEl.value = strokeAttr.value;
                        var strokeNameAttr = DEJS.Util.arrayFind(stClass.attrList, "name", "de-stroke-name");
                        if (strokeNameAttr) {
                            var sAr = strokeNameAttr.value.split('"');
                            if (sAr.length > 1)
                                strokeEl.name = sAr[1];
                            else
                                strokeEl.name = strokeNameAttr.value;
                        }
                        this.colorizableList.push(strokeEl);
                    }
                }
            };

            StyleVO.prototype.toString = function () {
                var res = "";
                for (var key in this.classList) {
                    var stClass = this.classList[key];

                    //prefix - symbol id for resolving colorizing same graphics
                    var prefix = "";
                    if (this.symbolId.length > 0 && stClass.name.indexOf(this.symbolId) == -1) {
                        prefix = this.symbolId + " ";
                    }
                    res += prefix + stClass.name + " {";
                    for (var j = 0; j < stClass.attrList.length; j++) {
                        var attr = stClass.attrList[j];
                        res += attr.name + ":" + attr.value + ";";
                    }
                    res += "} ";
                }
                return res;
            };

            StyleVO.prototype.toColorizeArray = function () {
                return DEJS.Util.arrayToObjArray(this.colorizableList);
            };

            StyleVO.prototype.fromColorizeArray = function (ar) {
                for (var i = 0; i < ar.length; i++) {
                    var colorObj = ar[i];
                    if (colorObj.id && colorObj.value) {
                        var colorEl = DEJS.Util.arrayFind(this.colorizableList, "id", colorObj.id);
                        if (colorEl) {
                            colorEl.value = colorObj.value;
                            var stClass = this.classList[colorEl.className];
                            if (stClass) {
                                var attr = DEJS.Util.arrayFind(stClass.attrList, "name", colorEl.attrName);
                                if (attr) {
                                    attr.value = colorEl.value;
                                }
                            }
                        }
                    }
                }
            };
            return StyleVO;
        })();
        VO.StyleVO = StyleVO;

        var StyleClassVO = (function () {
            function StyleClassVO() {
                this.name = "";
                this.attrList = [];
            }
            return StyleClassVO;
        })();
        VO.StyleClassVO = StyleClassVO;

        var StyleAttrVO = (function () {
            function StyleAttrVO() {
                this.name = "";
                this.value = "";
            }
            return StyleAttrVO;
        })();
        VO.StyleAttrVO = StyleAttrVO;

        var ColorizableElementGroupVO = (function () {
            function ColorizableElementGroupVO(obj) {
                if (typeof obj === "undefined") { obj = {}; }
                this.name = "";
                this.classes = [];
                if (obj.name)
                    this.name = obj.name;
                if (obj.classes)
                    this.classes = DEJS.Util.parseArray(obj.classes, ColorizableElementVO);
            }
            ColorizableElementGroupVO.prototype.toObject = function () {
                return this;
            };
            return ColorizableElementGroupVO;
        })();
        VO.ColorizableElementGroupVO = ColorizableElementGroupVO;

        var ColorizableElementVO = (function () {
            function ColorizableElementVO(obj) {
                if (typeof obj === "undefined") { obj = {}; }
                this.id = "";
                this.name = "";
                this.className = "";
                this.attrName = "";
                this.value = "";
                this.colors = [];
                if (obj.id)
                    this.id = obj.id;
                if (obj.name)
                    this.name = obj.name;
                if (obj.className)
                    this.className = obj.className;
                if (obj.attrName)
                    this.attrName = obj.attrName;
                if (obj.value)
                    this.value = obj.value;
                if (obj.colors)
                    this.colors = DEJS.Util.parseArray(obj.colors, VO.ColorVO);
            }
            ColorizableElementVO.prototype.formId = function () {
                this.id = this.className + "." + this.attrName;
            };

            ColorizableElementVO.prototype.toObject = function () {
                return { id: this.id, name: this.name, className: this.className, attrName: this.attrName, value: this.value, colors: DEJS.Util.arrayToObjArray(this.colors) };
            };
            return ColorizableElementVO;
        })();
        VO.ColorizableElementVO = ColorizableElementVO;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));