var DEJS;
(function (DEJS) {
    ///<reference path="DEModel.ts"/>
    ///<reference path="../Util.ts"/>
    (function (Model) {
        var SaveLoadManager = (function () {
            function SaveLoadManager(model) {
                this.currentAction = "";
                this.currentDesign = {};
                this.uploadFileEnabled = false;
                this.imagesToCountColors = [];
                this.processingImageColors = false;
                this.model = model;
            }
            SaveLoadManager.prototype.shareDesign = function () {
                var _this = this;
                DEJS.debug("saveLoad share design: " + name);
                this.currentAction = "shareDesign";

                if (!Model.configManager.config.saveDesignUrl) {
                    return;
                }
                var url = DEJS.Util.addTimeStamp(Model.configManager.config.saveDesignUrl);
                var data = {};
                data.data = Model.orderManager.getDesign().toJSON();
                data.title = name;
                data.email = Model.authManager.email;
                data.type = "shared";
                jQuery.post(url, data, function (data, status, jqXHR) {
                    return _this.onDesignShareSaveComplete(data);
                }, "json").fail(function (jqXHR, textStatus, errorThrown) {
                    return _this.onDesignSaveFail(jqXHR, textStatus, errorThrown);
                });
            };

            SaveLoadManager.prototype.onDesignShareSaveComplete = function (data) {
                DEJS.debug("saveLoad design share saved");
                if (data.design) {
                    Model.controlsManager.setDesignSaved(true);
                    this.currentDesign = data.design;
                    if (!data.design.id) {
                        alert("Error: no design id.");
                    } else {
                        var link = this.model.configManager.config.shareLinkUrl.replace("${design_id}", data.design.id);
                        Model.controlsManager.showShareLink(link);
                    }
                } else if (data.error) {
                    alert("Error: " + data.error.message);
                } else {
                    alert("Fail to save design! Response is invalid.");
                }
            };

            SaveLoadManager.prototype.saveDesign = function (name, callback, force) {
                var _this = this;
                if (typeof callback === "undefined") { callback = null; }
                if (typeof force === "undefined") { force = false; }
                DEJS.debug("saveLoad save design: " + name);
                this.currentAction = "saveDesign";
                if (Model.authManager.isAuthorized == false && !force) {
                    if (name == "") {
                        Model.controlsManager.showAuthAndSaveDialog();
                    } else {
                        this.model.addEventListener(DEEvents.AUTH_EVENT, function () {
                            _this.model.removeEventListener(DEEvents.AUTH_EVENT, arguments.callee);
                            if (_this.currentAction == "saveDesign") {
                                _this.saveDesign(name, callback);
                            }
                        });
                        Model.authManager.authorize();
                    }
                } else if (name == "") {
                    Model.controlsManager.showSaveDesignDialog();
                } else {
                    if (!Model.configManager.config.saveDesignUrl) {
                        return;
                    }
                    var url = DEJS.Util.addTimeStamp(Model.configManager.config.saveDesignUrl);
                    var data = {};
                    data.data = Model.orderManager.getDesign().toJSON();
                    data.title = name;
                    data.email = Model.authManager.email;
                    data.type = "saved";
                    jQuery.post(url, data, function (data, status, jqXHR) {
                        return _this.onDesignSaveComplete(data, status, jqXHR, callback);
                    }, "json").fail(function (jqXHR, textStatus, errorThrown) {
                        return _this.onDesignSaveFail(jqXHR, textStatus, errorThrown, callback);
                    });
                }
            };

            SaveLoadManager.prototype.onDesignSaveComplete = function (data, status, jqXHR, callback) {
                DEJS.debug("saveLoad design saved");
                if (data.design) {
                    Model.controlsManager.setDesignSaved(true);
                    this.currentDesign = data.design;
                    if (callback != null) {
                        callback(true);
                    } else {
                        alert("Design '" + this.currentDesign.title + "' saved successfully!");
                    }
                } else if (data.error) {
                    alert("Error: " + data.error.message);
                } else {
                    alert("Fail to save design! Response is invalid.");
                }
            };

            SaveLoadManager.prototype.onDesignSaveFail = function (jqXHR, textStatus, errorThrown, callback) {
                if (typeof callback === "undefined") { callback = null; }
                alert("Fail to save design!");
                if (callback != null) {
                    callback(false);
                }
            };

            SaveLoadManager.prototype.loadDesign = function (id, forceLoad, isTemplate) {
                var _this = this;
                if (typeof forceLoad === "undefined") { forceLoad = false; }
                if (typeof isTemplate === "undefined") { isTemplate = false; }
                DEJS.debug("saveLoad load design: " + id);
                this.currentAction = "loadDesign";
                if (Model.authManager.isAuthorized == false && !forceLoad) {
                    Model.authManager.authorize();
                    this.model.addEventListener(DEEvents.AUTH_EVENT, function () {
                        _this.model.removeEventListener(DEEvents.AUTH_EVENT, arguments.callee);
                        if (_this.currentAction == "loadDesign") {
                            _this.loadDesign(id);
                        }
                    });
                } else if (id == "") {
                    this.getDesigns();
                } else {
                    if (!Model.configManager.config.loadDesignUrl) {
                        return;
                    }
                    jQuery.support.cors = true;
                    var url = DEJS.Util.addTimeStamp(this.model.configManager.config.loadDesignUrl).replace("${design_id}", id);
                    jQuery.get(url, function (data, status, jqXHR) {
                        return _this.onDesignLoadComplete(data, isTemplate, status, jqXHR);
                    }, "json").fail(function (jqXHR, textStatus, errorThrown) {
                        return _this.onDesignLoadFail(isTemplate, jqXHR, textStatus, errorThrown);
                    });
                }
            };

            SaveLoadManager.prototype.onDesignLoadComplete = function (data, isTemplate, status, jqXHR) {
                DEJS.debug("saveLoad design loaded");
                if (data.data) {
                    Model.orderManager.setDesign(data.data, isTemplate);
                } else if (data.error) {
                    alert("Error: " + data.error.message);
                } else {
                    alert("Fail to load design! Response is invalid.");
                }
            };

            SaveLoadManager.prototype.onDesignLoadFail = function (isTemplate, jqXHR, textStatus, errorThrown) {
                if (isTemplate)
                    alert("Fail to load design template!");
                else
                    alert("Fail to load design!");
            };

            SaveLoadManager.prototype.getDesigns = function () {
                var _this = this;
                if (!Model.configManager.config.getDesignsUrl) {
                    return;
                }
                DEJS.debug("saveLoad load designs");
                var url = DEJS.Util.addTimeStamp(this.model.configManager.config.getDesignsUrl).replace("${email}", this.model.authManager.email);
                jQuery.get(url, function (data, status, jqXHR) {
                    return _this.onDesignsGetComplete(data, status, jqXHR);
                }, "json").fail(function (jqXHR, textStatus, errorThrown) {
                    return _this.onDesignsGetFail(jqXHR, textStatus, errorThrown);
                });
            };

            SaveLoadManager.prototype.onDesignsGetComplete = function (data, status, jqXHR) {
                DEJS.debug("saveLoad designs loaded");
                if (data.designs) {
                    Model.controlsManager.showLoadDesignsDialog(data.designs);
                } else if (data.error) {
                    alert("Error: " + data.error.message);
                } else {
                    alert("Fail to load designs list! Response is invalid.");
                }
            };

            SaveLoadManager.prototype.onDesignsGetFail = function (jqXHR, textStatus, errorThrown) {
                alert("Fail to load designs list!");
            };

            SaveLoadManager.prototype.uploadGraphics = function () {
                var _this = this;
                if (!this.uploadFileEnabled) {
                    DEJS.debug("saveLoad upload graphics disabled");
                    return;
                }
                DEJS.debug("saveLoad upload graphics");
                var uploadForm = jQuery("<form>");
                uploadForm.get(0).setAttribute('action', Model.configManager.config.uploadImageUrl);
                uploadForm.attr({ enctype: "multipart/form-data", method: "post" }).addClass("invisible temporary");

                //add form  to DOM - Safari 5.* hack
                uploadForm.appendTo(jQuery('body'));
                var test = uploadForm.attr("action");
                var input = jQuery("<input>").attr({ name: "image", type: "file", accept: "image/*" }).change(function (event) {
                    return _this.onGraphicsFilesSelected(input);
                });
                input.appendTo(uploadForm);
                input.get(0).click();
            };

            SaveLoadManager.prototype.onGraphicsFilesSelected = function (input) {
                var _this = this;
                DEJS.debug("saveLoad upload graphics selected");
                var files = input.prop("files");
                if (files && files.length > 0) {
                    var v = input.val();
                    var formdata = new FormData();
                    formdata.append("image", files[0]);
                    var options = {
                        url: Model.configManager.config.uploadImageUrl,
                        type: 'post',
                        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
                    };
                    var extOptions = jQuery.extend(true, {}, jQuery.ajaxSettings, options, {
                        contentType: false,
                        processData: false,
                        cache: false,
                        type: 'post',
                        data: formdata,
                        success: function (event) {
                            return _this.onUploadGraphicsComplete(event);
                        },
                        fail: function () {
                            return _this.onUploadGraphicsFail();
                        }
                    });
                    jQuery.ajax(extOptions).fail();
                    Model.controlsManager.setImageUploading(true);
                }
            };

            SaveLoadManager.prototype.onUploadGraphicsComplete = function (pathToGraphics) {
                DEJS.debug("saveLoad graphics uploaded: " + pathToGraphics);
                Model.controlsManager.setImageUploading(false);
                jQuery("form.temporary").remove();
                var graphics = new DEJS.VO.GraphicsVO({ image: pathToGraphics, uploaded: true });
                Model.canvasManager.addGraphics(graphics);
            };

            SaveLoadManager.prototype.onUploadGraphicsFail = function () {
                Model.controlsManager.setImageUploading(false);
                alert("Failed to upload graphics.");
            };

            SaveLoadManager.prototype.checkUploadFileAvailable = function () {
                var input = jQuery("<input>").attr({ name: "image", type: "file", accept: "image/*" });
                var some = input.attr("disabled");
                this.uploadFileEnabled = !some;
                DEJS.debug("saveLoad upload available: " + this.uploadFileEnabled);
                Model.controlsManager.setUploadFileAvailable(this.uploadFileEnabled);
            };

            SaveLoadManager.prototype.imageUploaded = function (obj) {
                this.imagesToCountColors.push(obj);
                this.processImageColors();
            };

            SaveLoadManager.prototype.processImageColors = function () {
                if (this.processingImageColors)
                    return;
                if (this.imagesToCountColors.length <= 0)
                    return;
                this.processingImageColors = true;
                Model.controlsManager.showColorCountDialog();
            };

            SaveLoadManager.prototype.imageColorCountSubmit = function (colorCount) {
                var obj = this.imagesToCountColors.shift();
                if (!obj)
                    return;
                obj.attr({ uploaded: false, colorsNumber: colorCount.colorCount, processColors: colorCount.processColors });
                this.model.dispatchEvent(new DEJS.Events.Event(DEEvents.DESIGNER_CHANGED_EVENT, this));
                this.processingImageColors = false;
                this.processImageColors();
            };
            return SaveLoadManager;
        })();
        Model.SaveLoadManager = SaveLoadManager;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));