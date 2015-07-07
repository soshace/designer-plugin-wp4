var DEJS;
(function (DEJS) {
    ///<reference path="../designer/DEDesigner.ts"/>
    ///<reference path="DEModel.ts"/>
    ///<reference path="../vo/ConfigVO.ts"/>
    ///<reference path="../vo/DesignVO.ts"/>
    ///<reference path="../event/Events.ts"/>
    ///<reference path="../event/EventDispatcher.ts"/>
    (function (Model) {
        var CanvasManager = (function () {
            //desiginer:
            function CanvasManager(model) {
                this.designers = [];
                this.productSideIndex = 0;
                this.currentProductColor = null;
                this.currentProductSize = null;
                this.currentScaleChange = 1;
                this.currentProductVariation = null;
                this.printAreaVisible = true;
                this.lockProportions = true;
                this.buffer = null;
                this.selectedObj = null;
                this.zoom = 100;
                this.drag = false;
                this.viewPort = { x: 0, y: 0, zoom: 100 };
                this.hasPseudoFocus = false;
                this.suppressUpdate = false;
                this.model = model;
            }
            CanvasManager.prototype.init = function () {
                var _this = this;
                DEJS.debug("canvas init");
                this.designers.push(this.createDesigner(true));
                Model.TextEffectsManager.registerCanvas(this.designers[0]);
                Model.deDesigner.holder.css("position", "relative");

                jQuery(document).keydown(function (e) {
                    return _this.onKeyDown(e);
                });
                jQuery(document).click(function (e) {
                    return _this.onClick(e);
                });
            };

            CanvasManager.prototype.updateDesigners = function () {
                if (!this.product)
                    return;
                var desCount = Math.max(this.product.locations.length, this.designers.length);
                for (var i = 0; i < desCount; i++) {
                    var designer;
                    if (i >= this.designers.length)
                        designer = this.designers[i] = this.createDesigner(i == 0);
                    else
                        designer = this.designers[i];
                    if (i == this.productSideIndex)
                        designer.holder.css({ "visibility": "visible", 'zIndex': desCount });
                    else
                        designer.holder.css({ "visibility": "hidden", 'zIndex': i });

                    if (i >= this.product.locations.length) {
                        //Clear to make sure there are no styles left
                        designer.setProductImage("");
                    } else {
                        designer.deSelect();
                        var curLocation = new DEJS.VO.ProductLocationVO(this.product.locations[i].toObject());

                        //calculaye editable coords, dpu, scale product factor
                        this.calculateEditableArea(curLocation, i);

                        designer.dpu = curLocation.dpu;

                        //!!!!!!!! Set this correctly later!!!!
                        designer.dpuX = curLocation.dpuX;
                        designer.dpuY = curLocation.dpuY;
                        var loc = this.product.getColorLocation(this.currentProductColor ? this.currentProductColor.value : "", this.product.locations[i].name);
                        loc = new DEJS.VO.ProductLocationVO(loc.toObject());
                        designer.setProductImage(loc.image, this.product.colorizableGroups);
                        loc.overlayInfo.length > 0 ? designer.setOverlay(loc.overlayInfo) : designer.setOverlay(this.product.locations[i].overlayInfo);
                        designer.setMask(loc.mask);

                        if (curLocation.editableArea) {
                            designer.printingAreaVisible(this.printAreaVisible);
                            designer.printingArea(curLocation.editableArea, this.product.resizable ? curLocation.rescaleObject : false);

                            if (curLocation.editableAreaUnits && curLocation.editableAreaUnits.length > 1) {
                                designer.printingAreaUnits(curLocation.editableAreaUnits);
                                designer.setRuler(this.product.showRuler);
                            } else {
                                designer.setRuler(false);
                            }
                        } else {
                            designer.printingAreaVisible(false);
                            designer.defaultPrintingArea();
                            designer.setRuler(false);
                        }

                        designer.setClipRect(this.product.locations[i].clipRect);
                        designer.setLockProportions(this.lockProportions);
                    }
                }
            };

            CanvasManager.prototype.curDesigner = function () {
                return this.designers[this.productSideIndex];
            };

            CanvasManager.prototype.createDesigner = function (attachColorizeEvents) {
                var _this = this;
                var designer = new DEJS.DEDesigner();
                designer.options = Model.deDesigner.configManager.config.options;
                var canvasHolder = jQuery("<div>").appendTo(Model.deDesigner.holder).css({ position: "absolute", "left": 0, "top": 0 });
                designer.init(canvasHolder, Model.deDesigner.width, Model.deDesigner.height);
                designer.setViewPort(this.viewPort);
                designer.addEventListener(DEEvents.OBJECT_SELECTED_EVENT, function (event) {
                    return _this.onObjectSelected(event);
                });
                designer.addEventListener(DEEvents.OBJECT_DCLICK_EVENT, function (event) {
                    return _this.onObjectDClicked(event);
                });
                designer.addEventListener(DEEvents.DESIGNER_CHANGED_EVENT, function (event) {
                    return _this.onDesignerChanged(event);
                });
                designer.addEventListener(DEEvents.VIEWPORT_UPDATE_EVENT, function (event) {
                    return _this.onViewPortChanged(event);
                });
                if (attachColorizeEvents) {
                    designer.addEventListener(DEEvents.BACKGROUND_COLORIZE_PARSED_EVENT, function (event) {
                        return _this.onBackgroundColorizeParsed(event);
                    });
                }
                designer.setLockProportions(this.lockProportions);
                DEJS.debug("designer side created");
                return designer;
            };

            CanvasManager.prototype.onObjectSelected = function (event) {
                this.suppressUpdate = true; //Hacky?
                this.selectedObj = event.obj;
                if (event.obj) {
                    this.model.controlsManager.setSelectedObj(event.obj);
                } else {
                    this.model.controlsManager.setSelectedObj(null);
                }
                this.checkObjectDPU();
                this.suppressUpdate = false; //Hacky?
            };

            CanvasManager.prototype.onObjectDClicked = function (event) {
                //center canvas to visible area
                var o = event.obj;
                if (o) {
                    var x = o.elementLink.getBBox().x + o.elementLink.getBBox().width / 2;
                    var y = o.elementLink.getBBox().y + o.elementLink.getBBox().height / 2;

                    var updatedVP = {};
                    updatedVP.x = x - this.curDesigner().width * 3 / 4;
                    updatedVP.y = y - this.curDesigner().height / 2;
                    updatedVP.zoom = this.viewPort.zoom;

                    this.viewPort = updatedVP;
                    for (var i = 0; i < this.designers.length; i++) {
                        this.designers[i].setViewPort(this.viewPort);
                    }
                }
                this.model.controlsManager.setObjDClicked(true);
            };

            CanvasManager.prototype.onDesignerChanged = function (event) {
                if (event && event.obj && event.obj.uploaded) {
                    Model.saveLoadManager.imageUploaded(event.obj);
                }
                if (event && this.selectedObj && event.objectSizeChanged) {
                    this.model.controlsManager.setSelectedObj(event.obj);
                }
                if (event) {
                    if (!this.suppressUpdate) {
                        this.model.dispatchEvent(new DEJS.Events.DesignerChangedEvent(event.obj, event.dispatchHistory));
                    }
                } else {
                    //if (!this.suppressUpdate) { this.model.dispatchEvent(new Events.Event(DEEvents.DESIGNER_CHANGED_EVENT, this)); }
                    if (!this.suppressUpdate) {
                        this.model.dispatchEvent(new DEJS.Events.DesignerChangedEvent(null));
                    }
                }
                this.checkObjectDPU();
            };

            /*setProductImage(image: string) {
             this.designers[0].setProductImage(image);
             }*/
            CanvasManager.prototype.addObjectToCanvas = function (obj) {
                DEJS.debug("canvas add object: " + obj.type + ", " + obj.value);

                //this.design.objects[this.currentSide].push(obj);
                return this.curDesigner().addObjectToCanvas(obj);
            };

            CanvasManager.prototype.removeObject = function (obj) {
                return this.curDesigner().remove(obj);
            };

            CanvasManager.prototype.selected = function () {
                return this.curDesigner().selected();
            };

            /*printingArea(x1, y1, x2, y2, designer?: DEDesigner) {
             if (!designer) designer = this.designers[0];
             designer.printingArea(x1, y1, x2, y2);
             }

             printingAreaRect(x, y, width, height, designer?: DEDesigner): any {
             if (!designer) designer = this.designers[0];
             this.printingArea(x, y, x + width, y + height);
             return this;
             }*/
            CanvasManager.prototype.printingAreaVisible = function (val) {
                this.printAreaVisible = val;
                this.updateDesigners();
            };

            CanvasManager.prototype.setProduct = function (product, suppressUpdate, disableIdCheck, keepUnvariatedProduct) {
                if (typeof suppressUpdate === "undefined") { suppressUpdate = false; }
                if (typeof disableIdCheck === "undefined") { disableIdCheck = false; }
                if (typeof keepUnvariatedProduct === "undefined") { keepUnvariatedProduct = false; }
                if (!disableIdCheck && this.product && this.product.id == product.id)
                    return;
                DEJS.debug("canvas set product: " + product.id);
                if (!keepUnvariatedProduct)
                    this.unvariatedProduct = product;
                if (!suppressUpdate) {
                    this.product = product.getDumbCopy();
                    this.updateDesigners();
                }
                this.product = product;

                /*if (product.colors.length > 0)
                 this.currentProductColor = product.colors[0].value;
                 else
                 this.currentProductColor = "";*/
                if (!suppressUpdate)
                    this.updateDesigners();
                /* if (!product || product.locations.length == 0) return;
                 this.designer.setProductImage(product.locations[0].image);
                 if (product.locations && product.locations[0] && product.locations[0].editableArea)
                 this.printingAreaRect(product.locations[0].editableArea[0], product.locations[0].editableArea[1], product.locations[0].editableArea[2], product.locations[0].editableArea[3]);
                 else
                 this.designer.printingAreaVisible(false);*/
            };

            CanvasManager.prototype.setProductColor = function (color, suppressUpdate) {
                if (typeof suppressUpdate === "undefined") { suppressUpdate = false; }
                //if (!this.product) return;
                if (this.currentProductColor && this.currentProductColor.equal(color))
                    return;
                this.currentProductColor = color;
                if (!suppressUpdate)
                    this.updateDesigners();
            };

            CanvasManager.prototype.setProductSize = function (size, suppressUpdate) {
                if (typeof suppressUpdate === "undefined") { suppressUpdate = false; }
                if (!this.product)
                    return;

                if (this.currentProductSize == null)
                    this.currentProductSize = new DEJS.VO.ProductCanvasSizeVO({});

                //TODO: calculate dpu
                this.currentProductSize = size;

                //TODO: new dpu and scale. OR stop 5th set prod via prod manager
                if (!suppressUpdate)
                    this.updateDesigners();
            };

            CanvasManager.prototype.calculateEditableArea = function (location, index) {
                //var location: VO.ProductLocationVO = this.product.locations[i];
                var designer = this.designers[index];

                if (!designer)
                    return;

                if (!this.currentProductSize)
                    return;
                if (!this.product.resizable)
                    return;

                var skipScale = false;
                if (designer.printAreaUnits[0] == this.currentProductSize.width && designer.printAreaUnits[1] == this.currentProductSize.height) {
                    //same size.. but area may be wrong (loaded design)
                    skipScale = true;
                    //return;
                }

                //set editable area units
                location.editableAreaUnits = [this.currentProductSize.width, this.currentProductSize.height];

                //calculate editable area for designer
                var rat = this.currentProductSize.width / this.currentProductSize.height;
                var w = designer.width;
                var h = designer.width / rat;

                if (h > designer.height) {
                    var rs = designer.height / h;
                    w *= rs;
                    h *= rs;
                }

                var editableAreaX = (designer.width - w) / 2;
                var editableAreaY = (designer.height - h) / 2;

                //objects scale factor
                var prevDPU = designer.printAreaUnits[0] == 0 ? 1 : (Math.abs(designer.printAreaCoord[0] - designer.printAreaCoord[2]) / designer.printAreaUnits[0]);

                //set editable area
                location.editableArea = [editableAreaX, editableAreaY, editableAreaX + w, editableAreaY + h];
                location.editableAreaUnits = [this.currentProductSize.width, this.currentProductSize.height];

                //recalculate dpu
                location.extractDPU();

                //objects scale factor
                location.rescaleObject = location.rescaleObject * (skipScale ? 1 : location.dpu / prevDPU);
            };

            CanvasManager.prototype.setProductVariation = function (variation, suppressUpdate) {
                if (typeof suppressUpdate === "undefined") { suppressUpdate = false; }
                return;
                //VCGLL/
                /*if (!this.product || !this.unvariatedProduct) return;
                 if (this.currentProductVariation == null && variation == null) return;
                 if (this.currentProductVariation && variation != null && this.currentProductVariation.id == variation.id) return;
                 this.currentProductVariation = variation;
                 this.setProduct(this.unvariatedProduct.toVariatedProduct(this.currentProductVariation), true, true, true);
                 this.checkDesignObjectsFitsVariation();
                 if (!suppressUpdate) this.updateDesigners();*/
            };

            CanvasManager.prototype.setProductLocation = function (location, suppressUpdate) {
                if (typeof suppressUpdate === "undefined") { suppressUpdate = false; }
                if (!this.product)
                    return;
                this.productSideIndex = DEJS.Util.arrayIndexOf(null, this.product.locations, "name", location);
                if (this.productSideIndex == -1)
                    this.productSideIndex = 0;

                //this.setPseudoFocus(true);
                if (!suppressUpdate)
                    this.updateDesigners();
            };

            CanvasManager.prototype.addGraphics = function (graphics) {
                if (!graphics || !graphics.image || graphics.image.length == 0)
                    return;
                DEJS.debug("canvas add graphics: " + graphics.image);
                var obj = new DEJS.VO.Obj(ObjectType.Image, graphics.image);
                obj.setSourceId(graphics.id);
                obj.uploaded = graphics.uploaded;
                if (graphics.colorize && Model.configManager.config.colors.length > 0) {
                    obj.attr({ fill: Model.configManager.config.colors[0].value, colorize: true });
                }
                obj.multicolor = graphics.multicolor;
                if (obj.multicolor) {
                    obj.complexColor.colorizeList = Model.configManager.exportGraphicsColorizeList(graphics);
                }
                if (graphics.colorsNum > 0) {
                    obj.attr({ colorsNumber: graphics.colorsNum });
                }
                if (graphics.colorsNum === -1) {
                    obj.attr({ processColors: true });
                }
                this.checkObjPath(obj);
                this.addObjectToCanvas(obj);
            };

            CanvasManager.prototype.getQuote = function (useDPI) {
                if (typeof useDPI === "undefined") { useDPI = false; }
                DEJS.debug("canvas get quote");
                var quote = new DEJS.VO.QuoteVO();
                quote.product = this.product;
                if (this.product) {
                    if (this.product.multicolor) {
                        if (this.currentProductColor)
                            quote.productColors = this.currentProductColor.colorizeList;
                    } else {
                        if (this.currentProductColor)
                            quote.productColor = this.product.getColor(this.currentProductColor.value);
                    }
                    if (this.product.resizable) {
                        quote.productSize = this.currentProductSize;
                    }
                    for (var i = 0; i < this.product.locations.length; i++) {
                        var location = new DEJS.VO.QuoteLocationVO(this.product.locations[i]);
                        var objects = this.designers[i].getObjList();
                        var minX, maxX, minY, maxY;
                        for (var j = 0; j < objects.length; j++) {
                            var bbox = objects[j].getBBox();
                            if (j == 0) {
                                minX = Math.min(bbox.x, bbox.x2);
                                maxX = Math.max(bbox.x, bbox.x2);
                                ;
                                minY = Math.min(bbox.y, bbox.y2);
                                maxY = Math.max(bbox.y, bbox.y2);
                                ;
                            } else {
                                minX = Math.min(bbox.x, bbox.x2, minX);
                                maxX = Math.max(bbox.x, bbox.x2, maxX);
                                ;
                                minY = Math.min(bbox.y, bbox.y2, minY);
                                maxY = Math.max(bbox.y, bbox.y2, maxY);
                                ;
                            }
                            location.addObject(new DEJS.VO.QuoteObjectVO(objects[j]));
                        }
                        if (objects.length > 0) {
                            location.designedSize = new DEJS.VO.ProductCanvasSizeVO({ width: (maxX - minX) / this.designers[i].dpuX, height: (maxY - minY) / this.designers[i].dpuY });
                        }
                        quote.locations.push(location);
                        //quote.dpuExceeded = quote.dpuExceeded || location.dpuExceeded;//VCGLL
                    }
                }
                return quote;
            };

            CanvasManager.prototype.addText = function (text) {
                var t = new DEJS.VO.Obj(ObjectType.Text);
                t.attr(text);
                t.attr({ align: AlignSide.HCenter });
                return this.addObjectToCanvas(t);
            };

            CanvasManager.prototype.updateText = function (text) {
                if (this.curDesigner().selected() && this.curDesigner().selected().type === ObjectType.Text) {
                    var t = this.curDesigner().selected();
                    if (t.isNameNumber()) {
                        delete text.text;
                    }

                    var hadTextFX = t.hasTextFX();
                    t.attr(text);
                    var dispatchHistory = hadTextFX == t.needTextFX(t.attr());
                    Model.controlsManager.setSelectedObj(t);
                    if (dispatchHistory)
                        this.onDesignerChanged();
                    return this.curDesigner().selected();
                }
                return null;
            };

            CanvasManager.prototype.align = function (side) {
                var obj = this.curDesigner().selected();
                if (!obj)
                    return;
                if (!obj.canMove())
                    return;
                this.curDesigner().align(side, obj);
            };

            CanvasManager.prototype.flip = function (kind) {
                var obj = this.curDesigner().selected();
                if (!obj)
                    return;
                if (obj.isFixed())
                    return;
                obj.flip(kind);
            };

            CanvasManager.prototype.arrange = function (side) {
                var obj = this.curDesigner().selected();
                if (!obj)
                    return;
                if (obj.attr()["fixed"])
                    return;
                switch (side) {
                    case "front":
                        obj.toFront();
                        break;
                    case "back":
                        obj.toBack();
                        break;
                }
            };

            CanvasManager.prototype.transform = function (transform) {
                var obj = this.curDesigner().selected();
                if (!obj)
                    return;
                if (obj.isFixed())
                    return;
                obj.transform(transform);
            };

            CanvasManager.prototype.updateGraphics = function (graphics) {
                var obj = this.curDesigner().selected();
                if (obj && obj.attr()["colorize"]) {
                    obj.attr(graphics);
                    Model.controlsManager.setSelectedObj(obj);
                    this.onDesignerChanged();
                    return this.curDesigner().selected();
                }
                return null;
            };

            CanvasManager.prototype.updateObject = function (objParams) {
                var obj = this.curDesigner().selected();
                if (!obj)
                    return null;
                obj.attr(objParams);
                Model.controlsManager.setSelectedObj(obj);
                this.onDesignerChanged();
                return this.curDesigner().selected();
            };

            CanvasManager.prototype.getCurrentProductColor = function () {
                if (this.product) {
                    var productColor = this.product.getColor(this.currentProductColor ? this.currentProductColor.value : "");
                    if (productColor)
                        return productColor.value;
                }
                return "";
            };

            CanvasManager.prototype.getDesign = function () {
                DEJS.debug("canvas get design");
                var design = new DEJS.VO.DesignVO();
                if (this.product) {
                    design.product = this.product;
                    design.productColor = this.product.getColor(this.currentProductColor ? this.currentProductColor.value : "");
                    design.productSize = this.currentProductSize;
                    for (var i = 0; i < Math.min(this.product.locations.length, this.designers.length); i++) {
                        design.svgs.push(this.designers[i].getSVG(Model.configManager.config.options.includeProductInDesign, Model.configManager.config.options.includePrintingAreaInDesign, Model.configManager.config.options.includeMaskInDesign));
                        if (Model.configManager.config.options.includePrintingAreaInDesign && design.product.locations[i] && design.product.locations[i].editableArea) {
                            design.editableArea.push(design.product.locations[i].editableArea.join(" "));
                        }
                    }
                }
                return design;
            };

            CanvasManager.prototype.setDesign = function (design, isTemplate) {
                if (typeof isTemplate === "undefined") { isTemplate = false; }
                DEJS.debug("canvas set design");
                if (!isTemplate) {
                    //setting a dumb copy. The actual prodcut will be set later
                    this.setProduct(design.product.getDumbCopy(), false); //False to make sure all was cleaned
                    if (design.productColor)
                        this.setProductColor(design.productColor);
                    if (design.productSize) {
                        this.setProductSize(design.productSize);
                    }
                    /* Commented 'case now we have upated them on this.setProduct now. God bless this comment!
                     else
                     this.updateDesigners(); //'cause we haven't updated them on this.setProduct()
                     */
                }
                for (var i = 0; i < Math.min(design.svgs.length, this.designers.length); i++) {
                    this.designers[i].setSVG(design.svgs[i]);
                    var objList = this.designers[i].getObjList();
                    for (var j = 0; j < objList.length; j++) {
                        var obj = objList[j];
                        if (obj.type == ObjectType.SVG) {
                            var gVO = Model.configManager.getGraphicsById(obj.getSourceId());
                            if (gVO && gVO.multicolor) {
                                obj.multicolor = true;
                                obj.complexColor.colorizeList = Model.configManager.exportGraphicsColorizeList(gVO);
                                this.designers[i].extractLoadedGraphicsStyle(obj);
                            }
                        }
                    }
                }
                this.updateDesigners();
                //this.model.dispatchEvent(new Events.Event(DEEvents.DESIGN_READY_EVENT, this));
            };

            CanvasManager.prototype.clearDesign = function () {
                for (var i = 0; i < this.designers.length; i++) {
                    this.designers[i].clear();
                }
            };

            CanvasManager.prototype.onBackgroundColorizeParsed = function (event) {
                if (!this.product || !this.product.multicolor || !this.currentProductColor)
                    return;
                if (!this.currentProductColor.colorizeInited) {
                    for (var i = 0; i < event.colorizeArray.length; i++) {
                        var colorEl = event.colorizeArray[i];
                        var productColorEl = DEJS.Util.arrayFind(this.currentProductColor.colorizeList, "id", colorEl.id);
                        if (productColorEl)
                            productColorEl.value = colorEl.value;

                        for (var j = 0; j < this.currentProductColor.colorizeGroupList.length; j++) {
                            var colorG = this.currentProductColor.colorizeGroupList[j];
                            var productColorEl2 = DEJS.Util.arrayFind(colorG.classes, "id", colorEl.id);
                            if (productColorEl2)
                                productColorEl2.value = colorEl.value;
                        }
                    }
                }
                this.currentProductColor.colorizeInited = true;
                Model.productManager.setProductColorVO(this.currentProductColor);
            };

            CanvasManager.prototype.updateBackgroundColorize = function () {
                for (var i = 0; i < this.designers.length; i++) {
                    this.designers[i].colorizeBackground(this.currentProductColor.colorizeList);
                }
            };

            CanvasManager.prototype.setProductColorizeList = function (colArray) {
                if (!this.product || !this.product.multicolor || !this.currentProductColor || !this.currentProductColor.colorizeInited)
                    return;
                this.currentProductColor.colorizeByArray(colArray);
                this.updateBackgroundColorize();
            };

            CanvasManager.prototype.updateGraphicsColorizeList = function (colArray) {
                var obj = this.selected();
                if (!obj || !obj.multicolor || !obj.complexColor || !obj.complexColor.colorizeInited)
                    return;
                if (obj.complexColor.colorizeByArray(colArray)) {
                    obj.updateColorize();
                    this.onDesignerChanged();
                }
            };

            CanvasManager.prototype.checkObjectDPU = function () {
                //VCGLL
                /*if (!this.selectedObj || this.selectedObj.maxScale <= 0 || !this.selectedObj.elementLink) return;
                 var scale: number = this.selectedObj.elementLink.matrix.split().scalex;
                 var exceeded: boolean = scale > this.selectedObj.maxScale;
                 if (exceeded != this.selectedObj.dpuExceeded) {
                 this.selectedObj.dpuExceeded = exceeded;
                 this.model.controlsManager.setSelectedObj(this.selectedObj);
                 }*/
            };

            CanvasManager.prototype.checkDesignObjectsFitsVariation = function () {
                if (!this.currentProductVariation)
                    return;
                if (!this.product)
                    return;
                var variation = this.currentProductVariation;
                for (var i = 0; i < this.designers.length; i++) {
                    var objList = this.designers[i].getObjList();
                    for (var j = 0; j < objList.length; j++) {
                        var obj = objList[j];
                        if (!variation.addObject && !obj.loadedFromDesign) {
                            obj.remove();
                        } else {
                            if (obj.type == ObjectType.Image || obj.type == ObjectType.SVG) {
                                if (variation.colorsIds) {
                                    var graphicsVO = Model.configManager.getGraphicsById(obj.getSourceId());
                                    if (graphicsVO && graphicsVO.colorize) {
                                        this.adjustObjColor(obj, "fill");
                                        this.adjustObjColor(obj, "stroke");
                                    }
                                }
                                if (!variation.imageUpload) {
                                    if (!variation.imageGallery) {
                                        obj.remove();
                                    } else if (variation.graphicsIds) {
                                        if (DEJS.Util.arrayIndexOf(obj.getSourceId(), variation.graphicsIds) < 0) {
                                            obj.remove();
                                        }
                                    }
                                }
                            } else {
                                if (variation.colorsIds) {
                                    this.adjustObjColor(obj, "fill");
                                    this.adjustObjColor(obj, "stroke");
                                }
                                if (variation.fontsIds) {
                                    var objAttrs = obj.attr();
                                    var font = Model.configManager.variatedConfig.getFont(objAttrs["font-family"]);
                                    if (!font && Model.configManager.variatedConfig.fonts.length > 0) {
                                        obj.attr({ "font-family": Model.configManager.variatedConfig.fonts[0].fontFamily });
                                    }
                                }
                            }
                        }
                    }
                }
            };

            CanvasManager.prototype.adjustObjColor = function (obj, attr) {
                var objAttrs = obj.attr();
                if (objAttrs[attr] && objAttrs[attr] != "" && objAttrs[attr] != "none") {
                    var color = Model.configManager.variatedConfig.getColor(objAttrs[attr]);
                    if (!color) {
                        color = Model.configManager.variatedConfig.getNearestColor(objAttrs[attr]);
                        if (color) {
                            var newAttr = {};
                            newAttr[attr] = color.value;
                            obj.attr(newAttr);
                        } else {
                            var newAttr = {};
                            newAttr[attr] = "none";
                            obj.attr(newAttr);
                        }
                    }
                }
            };

            CanvasManager.prototype.checkObjPath = function (obj) {
                if (Model.configManager.config.galleryBaseUrl == "")
                    return;
                if (obj.value.substr(0, 7) == "http://")
                    return;
                if (obj.value.substr(0, 8) == "https://")
                    return;
                if (obj.value.substr(0, 6) == "ftp://")
                    return;
                obj.value = Model.configManager.config.galleryBaseUrl + obj.value;
            };

            CanvasManager.prototype.addNamesObj = function (text) {
                var y = (this.curDesigner().printAreaCoord[1] + this.curDesigner().printAreaCoord[3]) * 2 / 7;
                var x = (this.curDesigner().printAreaCoord[0] + this.curDesigner().printAreaCoord[2]) / 2;
                var t = new DEJS.VO.Obj(ObjectType.Text);
                t.attr(text);
                t.attr({ nameObj: true, text: Model.configManager.config.defaultNameObjectText, align: AlignSide.HCenter });
                t.defaultTransform = "t" + x + "," + y;
                t = this.curDesigner().addObjectToCanvas(t);
            };

            CanvasManager.prototype.addNumbersObj = function (text) {
                var y = (this.curDesigner().printAreaCoord[1] + this.curDesigner().printAreaCoord[3]) * 4 / 7;
                var x = (this.curDesigner().printAreaCoord[0] + this.curDesigner().printAreaCoord[2]) / 2;
                var t = new DEJS.VO.Obj(ObjectType.Text);
                t.attr(text);
                t.attr({ numberObj: true, text: Model.configManager.config.defaultNumberObjectText, "font-size": 64, align: AlignSide.HCenter });
                t.defaultTransform = "t" + x + "," + y;
                t = this.curDesigner().addObjectToCanvas(t);
            };

            CanvasManager.prototype.setLockProportions = function (lockProportions) {
                this.lockProportions = lockProportions;
                for (var i = 0; i < this.designers.length; i++) {
                    this.designers[i].setLockProportions(lockProportions);
                }
            };

            CanvasManager.prototype.magic = function (arg) {
            };

            CanvasManager.prototype.print = function () {
                jQuery(jQuery('<div></div>').append(this.curDesigner().getSVG(true, true, true))).printArea();
            };

            CanvasManager.prototype.copy = function () {
                DEJS.debug('CanvasManager :: copy');

                if (this.selected() == null)
                    return;

                this.buffer = this.selected().clone();
            };

            CanvasManager.prototype.paste = function () {
                DEJS.debug('CanvasManager :: paste');

                if (this.buffer == null)
                    return;

                this.addObjectToCanvas(this.buffer);
            };

            CanvasManager.prototype.removeSelected = function () {
                DEJS.debug('CanvasManager :: copy');

                if (this.selected() == null)
                    return;

                this.removeObject(this.selected());
            };

            CanvasManager.prototype.cut = function () {
                DEJS.debug('CanvasManager :: cut');

                this.copy();
                this.removeSelected();
            };

            CanvasManager.prototype.move = function (keyCode, acceleration) {
                DEJS.debug('CanvasManager :: down');

                if (this.selected() == null || !this.selected().canMove())
                    return;

                var dx = 0;
                var dy = 0;

                switch (keyCode) {
                    case 37:
                        dx = -1 * CanvasManager.ARROWS_SHIFT;
                        dy = 0;
                        break;

                    case 38:
                        dx = 0;
                        dy = -1 * CanvasManager.ARROWS_SHIFT;
                        break;

                    case 39:
                        dx = CanvasManager.ARROWS_SHIFT;
                        dy = 0;
                        break;

                    case 40:
                        dx = 0;
                        dy = CanvasManager.ARROWS_SHIFT;
                        break;
                }

                this.selected().move(dx * (acceleration ? CanvasManager.ACCELERATION_MULTIPLIER : 1), dy * (acceleration ? CanvasManager.ACCELERATION_MULTIPLIER : 1));
            };

            CanvasManager.prototype.onKeyDown = function (e) {
                if (!this.hasPseudoFocus)
                    return;

                if (e.ctrlKey || e.metaKey) {
                    switch (e.keyCode) {
                        case 67:
                            e.preventDefault();
                            this.copy();
                            break;

                        case 86:
                            e.preventDefault();
                            this.paste();
                            break;

                        case 88:
                            e.preventDefault();
                            this.cut();
                            break;
                    }
                } else {
                    switch (e.keyCode) {
                        case 46:
                            e.preventDefault();
                            this.removeSelected();
                            break;

                        case 37:
                        case 38:
                        case 39:
                        case 40:
                            e.preventDefault();
                            this.move(e.keyCode, e.shiftKey);
                            break;
                    }
                }
            };

            CanvasManager.prototype.onClick = function (e) {
                var eTarget = e.target;
                var holderIsClicked = this.model && (this.model.holder.is(e.target) || this.model.holder.find(eTarget).length > 0);
                var notInput = !jQuery(e.target).is(':input') || jQuery(e.target).is(':button');

                this.setPseudoFocus(holderIsClicked || notInput);
            };

            CanvasManager.prototype.setPseudoFocus = function (value) {
                DEJS.debug('CanvasManager :: setPseudoFocus', value);

                this.hasPseudoFocus = value;
                if (value) {
                    var focusedElem = jQuery(':focus');
                    if (focusedElem.length > 0 && !focusedElem.is(document.body))
                        focusedElem.blur();
                }
            };

            CanvasManager.prototype.changeZoom = function (zoom) {
                if (!Model.configManager.config.options.zoomEnabled)
                    return;
                var newZoom = this.zoom;

                if (typeof zoom == "boolean") {
                    if (zoom) {
                        newZoom += Model.configManager.config.options.zoomStep;
                    } else {
                        newZoom -= Model.configManager.config.options.zoomStep;
                    }
                }
                if (typeof zoom == "number") {
                    newZoom = zoom;
                }

                if (newZoom < Model.configManager.config.options.minZoom || newZoom > Model.configManager.config.options.maxZoom)
                    return;
                this.zoom = newZoom;
                Model.controlsManager.setZoom(newZoom);
                for (var i = 0; i < this.designers.length; i++) {
                    this.designers[i].setZoom(this.zoom);
                }
            };

            CanvasManager.prototype.setDrag = function (drag) {
                if (!Model.configManager.config.options.zoomEnabled)
                    return;
                this.drag = drag;
                for (var i = 0; i < this.designers.length; i++) {
                    this.designers[i].setDrag(this.drag);
                }
            };

            CanvasManager.prototype.onViewPortChanged = function (event) {
                if (typeof event === "undefined") { event = null; }
                if (!event)
                    return;
                this.viewPort = event.viewPort;
                Model.controlsManager.setZoom(this.viewPort.zoom);
                for (var i = 0; i < this.designers.length; i++) {
                    this.designers[i].setViewPort(this.viewPort);
                }
            };

            CanvasManager.prototype.getCurrentDesignStatus = function () {
                var svgs = [];

                for (var i = 0; i < this.designers.length; i++) {
                    svgs.push(this.designers[i].getSVGState());
                }
                var status = new Model.DesignStatus(svgs, this.selected());
                if (this.product && this.product.resizable && this.currentProductSize) {
                    status.productSize = this.currentProductSize.toObject();
                }
                return status;
            };

            CanvasManager.prototype.setDesignStatus = function (status) {
                var svgs = status.svgs;
                for (var i = 0; i < Math.min(this.designers.length, svgs.length); i++) {
                    this.designers[i].setSVGState(svgs[i]);
                }
                if (status.productSize) {
                    this.setProductSize(new DEJS.VO.ProductCanvasSizeVO(status.productSize));
                    Model.controlsManager.setSelectedProductSize(new DEJS.VO.ProductCanvasSizeVO(status.productSize));
                }
                if (status.selectedObject) {
                    this.suppressUpdate = true; //A little hacky
                    for (var i = 0; i < this.designers.length; i++) {
                        var objects = this.designers[i].getObjList();
                        var j = 0;
                        var found = false;
                        while (!found && j < objects.length) {
                            if (status.selectedObject.elementId == objects[j].elementId) {
                                found = true;
                                this.designers[i].select(objects[j].elementLink);
                            }
                            j++;
                        }
                    }
                    this.suppressUpdate = false;
                }
            };
            CanvasManager.ARROWS_SHIFT = 5;
            CanvasManager.ACCELERATION_MULTIPLIER = 4;
            return CanvasManager;
        })();
        Model.CanvasManager = CanvasManager;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));