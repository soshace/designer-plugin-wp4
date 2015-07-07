<script>
jQuery(document).ready(function(){

	jQuery('#designer-sel-prod').click(function(){
	
		jQuery('.designer-back-btn').click();
		console.log('back button click!');
	});
});
</script>

<div id="designer-main-container">
        <div id="designer-header"></div>

        <div id="designer-init-preloader" data-bind="visible: !$root.status().completed">
            <h5 data-bind="text: $root.status().message" class="text-center text-info"></h5>
            <div class="progress">
                <div class="progress-bar progress-bar-striped active" role="progressbar" data-bind="style: { width: $root.percentCompleted() }"></div>
            </div>
        </div>

        <!-- data-bind="style: {visibility: $root.status().completed ? 'visible' : 'hidden'}" style="visibility:hidden" -->
        <div id="designer-content" data-bind="visible: $root.status().completed" style="display: none">
            <div id="main-controls-container" class="designer-panel-container">
                <div id="main-controls-content">
                    <ul class="nav nav-stacked designer-list-view" id="designer-main-menu">
                        <li id="select-product" class="designer-dropdown" data-bind="visible: showProductSelector()">
                            <a>
                                <span>Select Product</span>
                            </a>
                            <div id="select-product-form" class="dropdown-menu designer-panel designer-dropdown-form">
                                <div class="designer-dropdown-form-header">
                                    <span data-bind="text: productBreadcrumbsRender()"></span>
                                    <a class="designer-close-window-btn"></a>
                                </div>
                                <div id="products-search" class="search-box hello">
                                    <div class="input-group">
                                        <div class="input-group-addon"><span class="glyphicon glyphicon-search"></span></div>
                                        <input type="text" class="form-control" placeholder="Search" data-bind="value: productsSearchQuery, valueUpdate: 'input'">
                                        <button class="close" aria-hidden="true" data-bind="visible: productsSearchQuery().length > 0, click: clearProductsSearch">&times;</button>
                                    </div>
                                </div>
                                <div class="divider"></div>
                                <a class="designer-back-btn btn1" data-bind="click: backProductsItem, visible: productSelectedCategories().length > 1" style="display:none;"></a>
                                <ul data-bind="foreach: currentProducts, css: { narrow: productSelectedCategories().length > 1 }" class="thumbnails designer-categories-subcategories">
                                    <li class="thumbnail" data-bind="click: $root.selectProductItem, css: { category: isCategory(), product: isProduct(), active: $data.id() == $root.selectedProductVO().id() }, style: { backgroundImage: 'url(' + categoryThumb() + ')' }">
                                        <a data-bind="css: { active: $data.id() == $root.selectedProductVO().id(), visible: isProduct() }">
                                            <div class="state"></div>
                                            <span data-bind="text: name"></span>
                                            <img src="" data-bind="attr: { src: thumbUrl, title: name }" alt="">
                                        </a>
                                        <a data-bind="text: name, visible: isCategory()" class="acategory"></a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li id="main-controls-product-dimensions" class="designer-panel" data-bind="visible: selectedProductVO().resizable()">
                            <div class="form-horizontal">
                                <div class="control-group" data-bind="visible: selectedProductVO().editableAreaSizes().length == 0">
                                    <label class="control-label" for="productDimensionsWidth">Width</label>
                                    <div class="controls">
                                        <input type="number" id="productDimensionsWidth" data-bind="value: selectedProductSizeVO().width, valueUpdate: 'input'" data-placement="right" maxlength="5" class="form-control" placeholder="Width">
                                    </div>
                                </div>
                                <div class="control-group" data-bind="visible: selectedProductVO().editableAreaSizes().length == 0">
                                    <label class="control-label" for="productDimensionsHeight">Height</label>
                                    <div class="controls">
                                        <input type="number" id="productDimensionsHeight" data-bind="value: selectedProductSizeVO().height, valueUpdate: 'input'" data-placement="right" maxlength="5" class="form-control" placeholder="Height">
                                    </div>
                                </div>
                                <div data-bind="visible: selectedProductVO().editableAreaSizes().length > 0">
                                    <label>Select Size</label>
                                    <div class="btn-group">
                                        <button id="selectedProductSize" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" data-bind="text: selectedProductSizeVO().label"></button>
                                        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" data-bind="foreach: selectedProductVO().editableAreaSizes">
                                            <li data-bind="css: { active: ($root.selectedProductSizeVO().width() === $data.width && $root.selectedProductSizeVO().height() === $data.height) }">
                                                <a data-bind="text: $data.label, click: $root.selectProductSize"></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li id="add-text" class="designer-dropdown" data-bind="visible: !strictTemplate() || hasSelected()">
                            <a>
                                <span data-bind="visible: !strictTemplate()">Add/Edit Text</span>
                                <span data-bind="visible: strictTemplate()">Edit Text</span>
                            </a>
                            <div id="add-text-form" class="dropdown-menu designer-panel designer-dropdown-form">
                                <div class="designer-dropdown-form-header">
                                    <span class="designer-form-header-title" data-bind="if: !strictTemplate()">Add/Edit Text</span>
                                    <span class="designer-form-header-title" data-bind="if: strictTemplate()">Edit Text</span>
                                    <a class="designer-close-window-btn"></a>
                                </div>
                                <div id="add-text-form-content">
                                    <!--div class="input-append" style="width: 100%;">
                                        <input id="add-text-input" data-bind="value: selectedLetteringVO().text, valueUpdate: 'input', enable: editTextEnabled(), visible: !strictTemplate()" type="text" placeholder="Your text here">
                                        <input id="edit-text-input" data-bind="value: selectedLetteringVO().text, valueUpdate: 'input', enable: editTextEnabled(), visible: strictTemplate()" type="text" placeholder="Your text here">
                                        <button class="btn" id="add-text-btn" type="button" data-bind="click: addText, enable: selectedLetteringVO().text().length > 0, visible: !strictTemplate()">Add</button>
                                    </div>-->
                                    <textarea id="add-text-input" data-bind="value: selectedLetteringVO().text, valueUpdate: 'input', enable: editTextEnabled(), visible: !strictTemplate(), style: { textAlign: selectedLetteringVO().formatVO().textAlign }" type="text" placeholder="Your text here"></textarea>
                                    <textarea id="edit-text-input" data-bind="value: selectedLetteringVO().text, valueUpdate: 'input', enable: editTextEnabled(), visible: strictTemplate(), style: { textAlign: selectedLetteringVO().formatVO().textAlign }" type="text" placeholder="Your text here"></textarea>
                                    <div id="text-align-group" class="btn-group" data-toggle="buttons" data-bind="radio: selectedLetteringVO().formatVO().textAlign">
                                        <label id="text-align-left-btn" class="btn btn-default" data-bind="css: { disabled: !textAlignEnabled() }">
                                            <input type="radio" name="rb-text-align-group" value="left" data-bind="enable: textAlignEnabled()">
                                        </label>
                                        <label id="text-align-center-btn" class="btn btn-default" data-bind="css: { disabled: !textAlignEnabled() }">
                                            <input type="radio" name="rb-text-align-group" value="center" data-bind="enable: textAlignEnabled()">
                                        </label>
                                        <label id="text-align-right-btn" class="btn btn-default" data-bind="css: { disabled: !textAlignEnabled() }">
                                            <input type="radio" name="rb-text-align-group" value="right" data-bind="enable: textAlignEnabled()">
                                        </label>
                                    </div>
                                    <button class="btn btn-default" id="add-text-btn" type="button" data-bind="click: addText, enable: selectedLetteringVO().text().length > 0, visible: !strictTemplate()">Add</button>
                                    <div class="divider"></div>
                                    <h6>Font options</h6>
                                    <div class="btn-group">
                                        <button class="btn btn-default" type="button" id="font-btn" data-bind="text: selectedFont().name, style: { fontFamily: selectedFont().fontFamily }" data-toggle="dropdown"></button>
                                        <button class="btn btn-default dropdown-toggle" type="button" id="font-dropdown-btn" data-toggle="dropdown">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" id="font-list" data-bind="foreach: fonts" style="height: 300px; overflow-y: scroll;">
                                            <li data-bind="css: { active: $root.selectedLetteringVO().formatVO().fontFamily() === $data.fontFamily }">
                                                <a data-bind="text: $data.name, click: $root.selectFont, style: { fontFamily: $data.fontFamily }"></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div id="text-font-options">
                                        <button class="btn btn-default" type="button" id="bold-toggle-btn" data-bind="checkbox: selectedLetteringVO().formatVO().bold, enable: selectedFont().boldAllowed"><span>B</span></button>
                                        <button class="btn btn-default" type="button" id="italic-toggle-btn" data-bind="checkbox: selectedLetteringVO().formatVO().italic, enable: selectedFont().italicAllowed"><span>I</span></button>
                                        <input id="text-fill-color-picker" type="text" class="designer-color-picker" data-bind="colorPicker: selectedLetteringVO().formatVO().fillColor, colorPalette: colors" />
                                        <input id="text-stroke-color-picker" type="text" class="designer-color-picker" data-bind="colorPicker: selectedLetteringVO().formatVO().strokeColor, colorPalette: strokeColors" />
                                    </div>
                                    <div class="divider"></div>
                                    <h6 data-bind="visible: showLetterSpacingSlider()">Letter Spacing</h6>
                                    <div id="text-letter-spacing-slider" class="noUiSlider" data-bind="slider: selectedLetteringVO().formatVO().letterSpacing, rangeStart: 0, rangeEnd: 20, step: 1, visible: showLetterSpacingSlider()"></div>
                                    <h6 data-bind="visible: showLineLeadingSlider()">Line Spacing</h6>
                                    <div id="text-line-leading-slider" class="noUiSlider" data-bind="slider: selectedLetteringVO().formatVO().lineLeading, rangeStart: 0, rangeEnd: 3, step: 0.05, decimals: 2, visible: showLineLeadingSlider()"></div>
                                    <h6 data-bind="visible: showTextEffects()">Text Effects</h6>
                                    <div data-bind="visible: showTextEffects()" class="btn-group">
                                        <button class="btn btn-default" type="button" id="text-effects-btn" data-bind="text: selectedTextEffectVO().label()" data-toggle="dropdown"><span class="caret"></span></button>
                                        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" data-bind="foreach: textEffects" style="height: 150px; overflow-y: scroll;">
                                            <li data-bind="css: { active: $root.selectedTextEffectVO().name() === $data.name }">
                                                <a data-bind="text: $data.label, click: $root.selectTextEffect"></a>
                                            </li>
                                        </ul>
                                    </div>

                                    <!--<div class="divider"></div>-->
                                    <h6 data-bind="visible: showEffectsSlider(), text: selectedTextEffectVO().paramName()"></h6>
                                    <div id="text-effect-slider" class="noUiSlider" data-bind="visible: showEffectsSlider(), slider: selectedTextEffectVO().value, rangeStart: selectedTextEffectVO().min(), rangeEnd: selectedTextEffectVO().max(), step: selectedTextEffectVO().step(), decimals:2"></div>
                                    <div class="divider" data-bind="visible: selectedProductSizeVO().notEmpty"></div>
                                    <div id="text-form-size" data-bind="visible: selectedProductSizeVO().notEmpty">
                                        <div>
                                            <h6 id="text-form-size-label">Size</h6>
                                            <input id="text-width" class="form-control" type="text" data-bind="value: selectedObjectPropertiesVO().width, event: { keypress: selectedObjectPropertiesVO().updateWidth }" />
                                            <span id="text-form-size-label-seperator">&times;</span>
                                            <input id="text-height" class="form-control" type="text" data-bind="value: selectedObjectPropertiesVO().height, event: { keypress: selectedObjectPropertiesVO().updateHeight }" />
                                        </div>
                                        <div>
                                            <!--<label><input id="text-lock-aspect" type="checkbox" data-bind="checked: selectedObjectPropertiesVO().lockScale" /><span>Lock proportions</span></label>-->
                                            <button class="btn btn-default" id="text-form-size-apply-btn" type="button">Apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li id="add-names" class="designer-dropdown" data-bind="visible: $root.selectedProductVO().namesNumbersEnabled()">
                            <a>
                                <span>Add/Edit Names</span>
                            </a>
                            <div id="add-names-form" class="dropdown-menu designer-panel designer-dropdown-form">
                                <div class="designer-dropdown-form-header">
                                    <span class="designer-form-header-title">Add/Edit Names</span>
                                    <a class="designer-close-window-btn"></a>
                                </div>
                                <div id="add-names-form-content">
                                    <div id="names-controls">
                                        <div class="btn-group">
                                            <button class="btn btn-default" id="add-names-btn" type="button" data-bind="click: addNameObj">Add name</button>
                                            <button class="btn btn-default" id="format-names-btn" type="button" data-bind="css: { disabled: !selectedLetteringVO().isNames() }">Format name</button>
                                        </div>
                                        <div class="btn-group">
                                            <button class="btn btn-default" id="add-numbers-btn" type="button" data-bind="click: addNumberObj">Add number</button>
                                            <button class="btn btn-default" id="format-numbers-btn" type="button" data-bind="css: { disabled: !selectedLetteringVO().isNumbers() }">Format number</button>
                                        </div>
                                    </div>
                                    <div class="divider"></div>
                                    <div id="names-number-table-container">
                                        <table id="names-number-table">
                                            <thead data-bind="visible: namesNumbers().length > 0">
                                                <tr>
                                                    <th></th>
                                                    <th>Names</th>
                                                    <th>Numbers</th>
                                                    <th>Size</th>
                                                </tr>
                                            </thead>
                                            <tbody data-bind="foreach: namesNumbers">
                                                <tr>
                                                    <td data-bind="text: ($index() + 1) + '.'" class="bold"></td>
                                                    <td>
                                                        <input type="text" data-bind="value: $data.name" class="form-control designer-names-input" placeholder="Name" />
                                                    </td>
                                                    <td>
                                                        <input type="text" data-bind="value: $data.number" class="form-control designer-numbers-input" placeholder="00" />
                                                    </td>
                                                    <td>
                                                        <div class="btn-group designer-names-numbers-size" data-bind="visible: $root.selectedProductVO().sizes().length > 1">
                                                            <button class="btn btn-default" type="button" data-bind="text: $data.size"></button>
                                                            <button class="btn btn-default dropdown-toggle" type="button" id="names-size-dropdown-btn" data-toggle="dropdown">
                                                                <span class="caret"></span>
                                                            </button>
                                                            <ul class="dropdown-menu" id="names-sizes-list" data-bind="foreach: $root.selectedProductVO().sizes">
                                                                <li data-bind="css: { active: $data == $parent.size() }">
                                                                    <a data-bind="text: $data, click: $parent.size"></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button type="button" data-bind="click: $parent.removeNameNumber" class="close">&times;</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style="text-align: left;">
                                        <button id="designer-add-more-names-btn" class="btn btn-link" type="button" data-bind="click: addNameNumber">+ Add more names and/or numbers</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li id="add-graphics" class="designer-dropdown" data-bind="visible: !strictTemplate()">
                            <a>
                                <span>Add Graphics</span>
                            </a>
                            <div id="add-graphics-form" class="dropdown-menu designer-panel designer-dropdown-form">
                                <div class="designer-dropdown-form-header">
                                    <span data-bind="text: graphicBreadcrumbsString"></span>
                                    <a class="designer-close-window-btn"></a>
                                </div>
                                <div id="graphics-search" class="search-box">
                                    <div class="input-group">
                                        <div class="input-group-addon"><span class="glyphicon glyphicon-search"></span></div>
                                        <input type="text" class="form-control" placeholder="Поиск" data-bind="value: graphicsSearchQuery, valueUpdate: 'input'">
                                        <button class="close" aria-hidden="true" data-bind="visible: graphicsSearchQuery().length > 0, click: clearGraphicsSearch">&times;</button>
                                    </div>
                                </div>
                                <div class="divider"></div>
                                <a class="designer-back-btn btn2" data-bind="visible: graphicSelectedSubcategory, click: backGraphicItem"></a>
                                <ul data-bind="foreach: currentGraphics, css: { narrow: graphicSelectedSubcategory }" class="thumbnails designer-categories-subcategories">
                                    <li class="thumbnail" data-bind="click: $root.selectGraphicItem, css: { category: isCategory(), image: isImage() }, style: { backgroundImage: 'url(' + categoryThumb() + ')' }">
                                        <a data-bind="visible: isImage()">
                                            <div class="state"></div>
                                            <span data-bind="text: name"></span>
                                            <img src="#" data-bind="attr: { src: thumb }" alt="" />
                                        </a>
                                        <a data-bind="text: name, visible: isCategory()"></a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li id="upload-graphics" class="designer-dropdown" data-bind="visible: !strictTemplate()">
                            <a>
                                <span>Upload Graphics</span>
                            </a>
                            <div id="upload-graphics-form" class="dropdown-menu designer-panel designer-dropdown-form">
                                <div class="designer-dropdown-form-header">
                                    <span class="designer-form-header-title">Upload Graphics</span>
                                    <a class="designer-close-window-btn"></a>
                                </div>
                                <div id="upload-image-form-content">
                                    <form id="designer-upload-upload-image-by-url">
                                        <div class="input-group">
                                            <input id="designer-upload-graphics-url-input" type="text" class="form-control" placeholder="Url" data-bind="value: customImageUrl, valueUpdate: 'input'">
                                            <span class="input-group-btn">
                                                <button class="btn btn-default" type="button" data-bind="click: showUploadConditions.bind($data, 'url'), enable: customImageUrl().length > 0">Add</button>
                                            </span>
                                        </div>
                                    </form>
                                    <h6 class="text-center" data-bind="visible: uploadFileAvailable">or</h6>
                                    <form id="designer-upload-image-form" enctype="multipart/form-data" method="post" data-bind="visible: uploadFileAvailable">
                                        <button id="designer-upload-image-browse-btn" type="button" class="btn btn-default btn-block" data-loading-text="Uploading..." data-bind="click: showUploadConditions.bind($data, 'upload')">Browse for file...</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="canvas-container">
                <!-- DesignerJS core goes here -->
            </div>

            <!-- Product side swictch -->
            <div id="product-sides-switch-container" class="designer-panel-container" data-bind="visible: selectedProductVO().locations().length > 1">
                <div class="centered-pills-container">
                    <ul class="nav nav-pills" data-bind="foreach: selectedProductVO().locations">
                        <li data-bind="css: { active: $data.name == $root.selectedProductLocation() }">
                            <a data-bind="click: $root.selectProductLocation">
                                <span data-bind="text: $data.name"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- Product side swictch end -->
            <div id="preview-controls-container" class="designer-panel-container">
                <!--                <div class="navbar designer-button-bar">
                                    <div class="navbar-inner">-->
                <ul class="nav nav-pills designer-button-bar">
                    <!--<li id="layers" class="dropup">
                      <a id="layers-btn" class="dropdown-toggle" data-toggle="dropdown">Layers</a>
                      <ul id="layers-list" class="dropdown-menu">
                          <li>
                              <a class="designer-text-layer">
                                  <span>Keep Calm And Carry On</span>
                              </a>
                          </li>
                          <li class="divider"></li>
                          <li>
                              <a class="designer-text-layer">
                                  <span>Yes, We Can</span>
                              </a>
                          </li>
                          <li class="divider"></li>
                          <li>
                              <a class="designer-image-layer">
                                  <img src="assets/img/layer-numbers-2-icon.png" alt="">
                                  <span>#15 — Right Sleeve</span>
                              </a>
                          </li>
                          <li class="divider"></li>
                          <li>
                              <a class="designer-image-layer">
                                  <img src="assets/img/layer-crown-icon.png" alt="">
                                  <span>Crown</span>
                              </a>
                          </li>
                          <li class="divider"></li>
                          <li>
                              <a class="designer-image-layer">
                                  <img src="assets/img/layer-numbers-icon.png" alt="">
                                  <span>Phil James — Back</span>
                              </a>
                          </li>
                          <li class="divider"></li>
                          <li>
                              <a class="designer-image-layer">
                                  <img src="assets/img/layer-dude-icon.png" alt="">
                                  <span>My_portrait.jpg</span>
                              </a>
                          </li>
                      </ul>
                    </li>
                    -->
                    <li id="clear-design" data-bind="visible: !strictTemplate()"><a id="clear-design-btn" data-bind="    click: clearDesign"><span>Clear Design</span></a></li>
                    <li class="divider-vertical" data-bind="visible: isUndoActive() || isRedoActive()"></li>
                    <li id="undo"><a id="undo-btn" data-bind="click: undo, visible: isUndoActive"><span>Undo</span></a></li>
                    <li class="mini-divider-vertical" data-bind="visible: isUndoActive() && isRedoActive()"></li>
                    <li id="redo"><a id="redo-btn" data-bind="click: redo, visible: isRedoActive"><span>Redo</span></a></li>
                    <!-- ko if: hasSelected() && !strictTemplate()  -->
                    <!-- /ko -->
                    <li id="copy"><a id="copy-btn" data-bind="click: copy">Copy</a></li>
                    <li id="paste"><a id="paste-btn" data-bind="click: paste">Paste</a></li>
                    <li id="flip" class="dropup">
                        <a id="flip-btn" class="dropdown-toggle" data-toggle="dropdown">Flip</a>
                        <ul id="flip-list" class="dropdown-menu">
                            <li id="horizontal-flip"><a id="horizontal-flip-btn" data-bind="click: flip.bind($data, 'horizontal')"></a></li>
                            <li id="vertical-flip"><a id="vertical-flip-btn" data-bind="click: flip.bind($data, 'vertical')"></a></li>
                        </ul>
                    </li>
                    <li id="align" class="dropup" data-bind="visible: hasSelected() && !strictTemplate()">
                        <a id="align-btn" class="dropdown-toggle" data-toggle="dropdown">Align</a>
                        <ul id="align-list" class="dropdown-menu">
                            <li id="align-left"><a id="align-left-btn" data-bind="click: align.bind($data, 'left')"></a></li>
                            <li id="align-center"><a id="align-center-btn" data-bind="click: align.bind($data, 'hcenter')"></a></li>
                            <li id="align-right"><a id="align-right-btn" data-bind="click: align.bind($data, 'right')"></a></li>
                        </ul>
                    </li>
                    <li id="overlap" class="dropup" data-bind="visible: hasSelected()">
                        <a id="overlap-btn" class="dropdown-toggle" data-toggle="dropdown">Arrange</a>
                        <ul id="overlap-list" class="dropdown-menu">
                            <li id="overlap-toward"><a id="overlap-toward-btn" data-bind="click: arrange.bind($data, 'front')"></a></li>
                            <li id="overlap-backward"><a id="overlap-backward-btn" data-bind="click: arrange.bind($data, 'back')"></a></li>
                        </ul>
                    </li>
                    <li id="text-stroke" data-bind="visible: selectedIsText()">
                        <a id="text-stroke-btn" class="designer-color-picker-btn">
                            <span>Text Color</span>
                            <input id="text-fill-color-picker-2" type="text" class="designer-color-picker" data-bind="colorPicker: selectedLetteringVO().formatVO().fillColor, colorPalette: colors" />
                        </a>
                    </li>
                    <li id="text-fill" data-bind="visible: selectedIsText()">
                        <a id="text-fill-btn" class="designer-color-picker-btn">
                            <span>Text Stroke</span>
                            <input id="text-stroke-color-picker-2" type="text" class="designer-color-picker" data-bind="colorPicker: selectedLetteringVO().formatVO().strokeColor, colorPalette: strokeColors" />
                        </a>
                    </li>
                    <li id="graphics-fill" data-bind="visible: isColorizableGraphics">
                        <a id="graphics-fill-btn" class="designer-color-picker-btn">
                            <span>Image Color</span>
                            <input id="graphics-fill-color-picker" type="text" class="designer-color-picker dropup-color-picker" data-bind="colorPicker: selectedGraphicsFormatVO().fillColor, colorPalette: colors" />
                        </a>
                    </li>
                    <li id="graphics-stroke" data-bind="visible: isColorizableGraphics">
                        <a id="graphics-stroke-btn" class="designer-color-picker-btn">
                            <span>Image Stroke</span>
                            <input id="graphics-stroke-color-picker" type="text" class="designer-color-picker dropup-color-picker" data-bind="colorPicker: selectedGraphicsFormatVO().strokeColor, colorPalette: strokeColors" />
                        </a>
                    </li>
                    <li id="product-color" data-bind="visible: showProductColorPicker">
                        <a id="product-color-btn" class="designer-color-picker-btn">
                            <span>Product Color</span>
                            <input id="product-color-picker" type="text" class="designer-color-picker dropup-color-picker" data-bind="colorPicker: selectedProductColorVO().hexValue, productColorPalette: selectedProductVO().colors" />
                        </a>
                    </li>
                    <li id="graphics-colorizable-elements" class="dropup" data-bind="visible: isMulticolorGraphics">
                        <a id="graphics-colorizable-elements-btn" class="dropdown-toggle" data-toggle="dropdown">Colorize Graphics</a>
                        <ul id="graphics-colorizable-elements-list" class="dropdown-menu" data-bind="foreach: { data: selectedGraphicsFormatVO().complexColor().colorizeList, afterAdd: selectedGraphicsFormatVO().complexColor().createColorPicker }">
                            <li>
                                <a class="designer-color-picker-btn">
                                    <span data-bind="text: name" style="float: left; padding-left: 10px; display: inline-block; width: 90px;"></span>
                                    <input type="text" class="designer-color-picker dropup-color-picker" data-bind="colorPickerInit: { container: true, isDropup: true }, colorPicker: value, productColorPalette: colors" />
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!--li id="product-colorizable-elements" class="dropup" data-bind="visible: selectedProductVO().multicolor"-->
                        <!-- ko ifnot: selectedProductColorVO().colorizeList().length == "1" -->
                        <!--<a id="product-colorizable-elements-btn" class="dropdown-toggle" data-toggle="dropdown">Colorizable Elements</a>
                        <ul id="product-colorizable-elements-list" class="dropdown-menu" data-bind="foreach: { data: selectedProductColorVO().colorizeList, afterAdd: selectedProductColorVO().createColorPicker }">
                            <li>
                                <a class="designer-color-picker-btn">
                                    <span data-bind="text: name"></span>
                                    <input type="text" class="designer-color-picker dropup-color-picker" data-bind="colorPickerInit: { container: true, isDropup: true }, colorPicker: value, productColorPalette: colors" />
                                </a>
                            </li>
                        </ul>-->
                        <!-- /ko -->
                        <!-- ko if: (selectedProductColorVO().colorizeList().length == "1") -->
                        <!--<a class="designer-color-picker-btn" data-bind="foreach: { data: selectedProductColorVO().colorizeList, afterAdd: selectedProductColorVO().createColorPicker }" href="#">
                            <span>Product Color</span>
                            <input type="text" class="designer-color-picker dropup-color-picker" data-bind="colorPickerInit: { container: true, isDropup: true }, colorPicker: value, productColorPalette: colors" />
                        </a>-->
                        <!-- /ko -->
                    <!--</li>-->
                    <li id="product-colorizable-elements" class="dropup" data-bind="visible: selectedProductVO().multicolor">
                        <a id="product-colorizable-elements-btn" class="dropdown-toggle" data-toggle="dropdown">Colorizable Groups</a>
                        <ul id="" class="dropdown-menu" data-bind="foreach: { data: selectedProductColorVO().colorizeGroupList}">
                            <li>
                                <span data-bind="text: name"></span>
                                <ul id="product-colorizable-elements-list" class="list-unstyled" data-bind="foreach: { data: classes, afterAdd: $root.selectedProductColorVO().createColorPicker }">
                                    <li>
                                        <a class="designer-color-picker-btn">
                                            <span data-bind="text: name"></span>
                                            <input type="text" class="designer-color-picker dropup-color-picker" data-bind="colorPickerInit: { container: true, isDropup: true }, colorPicker: value, productColorPalette: colors" />
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <!--
                    <li id="lock-proportions">
                        <button class="btn" type="button" id="lock-proportions-btn" data-bind="checkbox: lockProportions"><span>Lock Proportions</span></button>
                    </li>-->
                </ul>
                <!--</div>
                </div>-->
                <!-- <div id="preview-controls-content" class="designer-panel">
                    </div> -->
            </div>

            <div id="order-options-container" class="designer-panel-container">
                <div id="product-info-panel" class="designer-panel">
                    <h5 id="designer-product-name" data-bind="text: selectedProductVO().name"></h5>
                    <h6 data-bind="visible: $root.selectedProductVO().price">$<span data-bind="    text: selectedProductVO().price"></span> for each</h6>
                    <h6 data-bind="text: selectedProductVO().description" class="description height-restriction"></h6>
                    <h6 data-bind="visible: $root.showProductColorPicker">Color: <span data-bind="    text: selectedProductColorVO().name"></span></h6>
                    <table class="gray order-colors" data-bind="foreach: $root.designInfo().colors">
                        <tr>
                            <td data-bind="text: $data.location"></td>
                            <td data-bind="text: $root.colorsCount($data.count)"></td>
                        </tr>
                    </table>
                    <div class="divider"></div>
                    <div class="gray"><span data-bind="text: objectsCount()"></span></div>
                </div>
                <div id="product-sizes-panel" class="designer-panel">
                    <div>
                        <ul id="product-sizes-list" class="list-unstyled" data-bind="foreach: quantities">
                            <li>
                                <span class="quantity-label" data-bind="visible: $root.selectedProductVO().sizes().length < 1">Quantity:</span>
                                <!--<div class="btn-group" data-bind="visible: $root.selectedProductVO().sizes().length > 1">
                                    <button class="btn btn-default dropdown-toggle size-btn" type="button" data-toggle="dropdown">
                                        <span class="size-btn-label" data-bind="text: $data.size"></span>
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="size-btn" data-bind="foreach: $root.selectedProductVO().sizes">
                                        <li role="presentation" data-bind="css: { active: $data == $parent.size() }">
                                            <a role="menuitem" tabindex="-1" data-bind="text: $data, click: $parent.size"></a>
                                        </li>
                                    </ul>
                                </div>-->
                                <select class="btn btn-default" data-bind=" visible: $root.selectedProductVO().sizes().length > 1,
                                                                options: $root.selectedProductVO().sizes,
                                                                value: size"></select>

                                <span class="btn-group-quantity">
                                    <button class="btn btn-default btn-round" type="button" data-bind="click: $parent.decreaseQuantity"><span class="glyphicon glyphicon-minus"></span></button>
                                    <input data-bind="value: quantity, valueUpdate: 'input'" maxlength="3" />
                                    <button class="btn btn-default btn-round" type="button" data-bind="click: $parent.increaseQuantity"><span class="glyphicon glyphicon-plus"></span></button>
                                    <button type="button" data-bind="click: $parent.removeQuantity, visible: $root.canRemoveSize()" class="close">&times;</button>
                                </span>
                            </li>
                        </ul>
                        <button class="btn btn-default" type="button" data-bind="click: addQuantity, visible: $root.selectedProductVO().sizes().length > 0">Add Size</button>
                        <!--<button class="btn btn-link">Sizes Guide</button>-->
                    </div>
                    <div class="divider"></div>
                    <div>
                        <!--<div>
                            <textarea style="resize: vertical;" placeholder="Order notes" data-bind="value: designNotes"></textarea>
                        </div>-->
                        <table class="order-price height-restriction" data-bind="if:$root.designInfo().prices!='not available'">
                            <tbody data-bind="foreach: $root.designInfo().prices">
                                <tr>
                                    <td class="gray" data-bind="text: $data.label"></td>
                                    <td class="order-price" data-bind="text: $data.price, css: { bold: $data.isTotal }"></td>
                                </tr>
                            </tbody>
                        </table>
                        <!--<a class="btn btn-link btn-block" onclick="onGetQuote()">Get Quote</a>-->
                        <a id="place-order-btn" class="btn btn-primary btn-block" onclick="onPlaceOrder()" data-loading-text="Placing order...">Place Order</a>
                    </div>
                </div>
                <div id="zoom-container" class="designer-panel" data-bind="visible: zoomEnabled">
                    <h6>Zoom: <span data-bind="text: (zoom() + '%')"></span></h6>
                    <div id="zoom-slider" class="noUiSlider" data-bind="slider: zoom, rangeStart: minZoom(), rangeEnd: maxZoom()"></div>
                </div>
                <!--<button class="btn" type="button" id="drag-toggle-btn" data-bind="checkbox: drag"><span>Drag</span></button>-->
                <div id="save-load-print-panel" class="designer-panel">
                    <button id="save-design-btn" type="button" class="btn btn-link" onclick="onSaveDesign()">Save for later</button>
                    <div class="divider-vertical"></div>
                    <button id="load-design-btn" type="button" class="btn btn-link" onclick="onLoadDesign()">Load</button>
                    <div class="divider-vertical"></div>
                    <button id="print-design-btn" class="btn btn-link print" data-bind="click: print"><span>Print</span></button>
                </div>
                <div id="share-design-panel" class="designer-panel">
                    <button id="share-design-btn" type="button" class="btn btn-link" onclick="onShareDesign()">Share your design</button>
                </div>
            </div>
        </div>
    </div>

    <!-- pop-ups section -->
    <!-- Alert popup -->
    <div id="designer-alert-popup" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <a class="close" data-dismiss="modal">&times;</a>
                    <p id="designer-alert-message">Message</p>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-default btn-inverse" data-dismiss="modal">Ok</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Alert popup end -->
    <!-- Authorization popup -->
    <div id="designer-authorization-popup" class="modal fade" role="dialog" aria-labelledby="designer-authorization-popup-title" aria-hidden="true" onkeypress="onAuthDialogSubmit(event)">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <a class="close" data-dismiss="modal">&times;</a>
                    <h3 id="designer-authorization-popup-title">Load Saved Designs</h3>
                    <p>Please enter your email below, then click "Load Designs" to see list of all your saved designs.</p>
                </div>
                <div class="modal-body">
                    <label>Email</label>
                    <input id="designer-authorization-email-input" type="text" class="form-control" placeholder="myemail@domain.com">
                </div>
                <div class="modal-footer">
                    <a class="btn btn-inverse" onclick="onAuthDialogSubmit()">Load Designs</a>
                    <a class="btn btn-default" data-dismiss="modal">Cancel</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Authorization popup end -->
    <!-- Save design popup -->
    <div id="designer-save-design-popup" class="modal fade" role="dialog" aria-labelledby="designer-save-design-popup-title" aria-hidden="true" onkeypress="onSaveDesignDialogSubmit(event)">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <a class="close" data-dismiss="modal">&times;</a>
                    <h3 id="designer-save-design-popup-title">Save Design</h3>
                    <p>Please name your design below and click "Save Design". You can always access it later by entering just email.</p>
                </div>
                <div class="modal-body">
                    <label>Name Your Design Below</label>
                    <input id="designer-save-design-name-input" type="text" class="form-control" placeholder="My Design">
                </div>
                <div class="modal-footer">
                    <a class="btn btn-inverse" onclick="onSaveDesignDialogSubmit()">Save Design</a>
                    <a class="btn btn-default" data-dismiss="modal">Cancel</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Save design popup end -->
    <!-- Auth and save design popup -->
    <div id="designer-auth-and-save-dialog" class="modal fade" role="dialog" aria-labelledby="designer-auth-and-save-dialog-title" aria-hidden="true" onkeypress="onAuthAndSaveDialogSubmit(event)">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <a class="close" data-dismiss="modal">&times;</a>
                    <h3 id="designer-auth-and-save-dialog-title">Save Your Design</h3>
                    <p>Please name your design and leave your email to save design. You can always access it later by entering just email.</p>
                </div>
                <div class="modal-body">
                    <label>Name Your Design Below</label>
                    <input id="designer-auth-and-save-name-input" type="text" class="form-control" placeholder="My Design">
                    <label>Email</label>
                    <input id="designer-auth-and-save-email-input" type="text" class="form-control" placeholder="myemail@domain.com">
                </div>
                <div class="modal-footer">
                    <a class="btn btn-inverse" onclick="onAuthAndSaveDialogSubmit()">Save Design</a>
                    <a class="btn btn-default" data-dismiss="modal">Cancel</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Auth and save design popup end -->
    <!-- Designs list popup -->
    <div id="designer-designs-list-popup" class="modal fade" role="dialog" aria-labelledby="designer-designs-list-popup-title" aria-hidden="true" onkeypress="onLoadDesignDialogSubmit(event)">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <a class="close" data-dismiss="modal">&times;</a>
                    <h3 id="designer-designs-list-popup-title">Load Design</h3>
                    <p>Pick design below and click "Load" to load your design.</p>
                </div>
                <div class="modal-body">
                    <table class="table" data-bind="visible: $root.designsList().length > 0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last change</th>
                            </tr>
                        </thead>
                        <tbody data-bind="foreach: $root.designsList">
                            <tr data-bind="css: { active: $data == $root.selectedDesign() }, click: $root.onDesignSelected" style="cursor: hand; cursor: pointer;">
                                <td data-bind="text: $data.title"></td>
                                <td data-bind="text: $data.date"></td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="text-center" data-bind="visible: $root.designsList().length == 0">No designs available.</p>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-inverse" onclick="onLoadDesignDialogSubmit()" data-bind="css: { disabled: $root.designsList().length == 0 }">Load</a>
                    <a class="btn btn-default" data-dismiss="modal">Cancel</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Designs list popup end-->
    <!-- Share link popup -->
    <div id="designer-share-link-popup" class="modal fade" role="dialog" aria-labelledby="designer-share-link-popup-title" aria-hidden="true" onkeypress="onSaveDesignDialogSubmit(event)">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <a class="close" data-dismiss="modal">&times;</a>
                    <h3 id="designer-share-link-popup-title">Share link</h3>
                    <!--<p>The URL of your design is below, simply copy it to save your design or send to a friend.</p>-->
                </div>
                <div class="modal-body">
                    <label>The URL of your design is below, simply copy it to save your design or send to a friend.</label>
                    <textarea id="designer-share-link-input" onclick="this.select();" type="text" class="form-control" data-bind="value: $root.shareLink()" readonly></textarea>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-default" data-dismiss="modal">OK</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Share link popup end -->
    <!-- Upload conditions popup -->
    <div id="designer-upload-conditions-popup" class="modal fade" role="dialog" aria-labelledby="designer-upload-conditions-popup-title" aria-hidden="true">
        <!--<div class="modal-header">
            <a class="close" data-dismiss="modal">&times;</a>
            <h3>Share link</h3>
        </div>-->
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <a class="close" data-dismiss="modal">&times;</a>
                    <h3 id="designer-upload-conditions-popup-title">Uploading photos and Images</h3>
                </div>
                <div class="modal-body">
                    <div class="upload-conditions">
                        <div class="upload-conditions-text">
                            Please note that in order to use a design (photo, image, text, brand or saying) you must have full rights to use this design. By uploading or saving a design you agree that:
                            <br />
                            <br />
                            <ol>
                                <li>You hold the rights to commercially reproduce this design.</li>
                                <li>You also release us from any claims made as a result of any copyright infringement.</li>
                                <li>You understand that infringement of copyright is illegal. If you have any doubt as to the legal ownership of a design you should check with the rightful owner that you are able to use the design before uploading.</li>
                                <li>You understand that we act under your instructions and is not obligated in any way to check or confirm the legal use of reproducing any designs.</li>
                            </ol>
                            <br />
                            <b>Graphics Information</b>
                            <br />
                            <br />
                            In the designer you can upload designs in jpeg, gif, png and svg format. All images will need to have a minimum of 150 dpi.
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" data-bind="checked: userAcceptsConditions">
                                I understand and accept these conditions of copyright.
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-inverse" data-bind="css: { 'disabled': !userAcceptsConditions() }, click: addCustomImage">OK</button>
                    <button class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Upload conditions popup end -->
    <!-- Color count popup -->
    <div id="designer-color-count-popup" class="modal fade" role="dialog" aria-labelledby="colors-number-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div id="colors-number">
                        <h6 id="colors-number-label">Please indicate the number of colors in your uploaded image:</h6>
                        <div id="colors-numeric-stepper">
                            <button class="btn btn-default btn-round" type="button" data-bind="click: imageColorCount().decreaseQuantity, disable: imageColorCount().processColors"><span class="glyphicon glyphicon-minus"></span></button>
                            <input class="form-control" type="text" data-bind="value: imageColorCount().colorCount, disable: imageColorCount().processColors" maxlength="1" />
                            <button class="btn btn-default btn-round" type="button" data-bind="click: imageColorCount().increaseQuantity, disable: imageColorCount().processColors"><span class="glyphicon glyphicon-plus"></span></button>
                        </div>
                    </div>
                    <div id="process-colors">
                        <input id="cb-process-colors" type="checkbox" data-bind="checked: imageColorCount().processColors">
                        <label id="label-process-colors" for="cb-process-colors">My uploaded image is a photograph or has too many colors to count or<br /> includes a color gradient.</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <a id="color-count-submit" class="btn btn-inverse" onclick="onColorCountDialogSubmit()">OK</a>
                </div>
                <!--<div class="modal-footer">
                    <a id="color-count-submit" href="#" class="btn btn-inverse" onclick="onColorCountDialogSubmit()">OK</a>
                </div>-->
            </div>
        </div>
    </div>
    <!-- Color count popup end -->
