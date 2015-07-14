<div id="main-container" class="main-container clearfix">
    <div id="main-subcontainer" class="main-subcontainer clearfix">
        <div id="designer-init-preloader" data-bind="visible: !$root.status().completed">
            <div class="preloader-bar">
                <h5 data-bind="text: $root.status().message" class="text-center text-info"></h5>

                <div class="progress">
                    <div class="progress-bar progress-bar-striped active" role="progressbar"
                         data-bind="style: { width: $root.percentCompleted() }"></div>
                </div>
            </div>
        </div>
        <div class="right-column">
            <div class="main-nav">
                <ul>
                    <li class="main-nav__tab main-nav__tab_name_products active">
                        <a class="js-designer-tab active" href="products-tab">
                            <span>Products</span>
                        </a>
                    </li>
                    <li class="main-nav__tab main-nav__tab_name_colors">
                        <a class="js-designer-tab" href="colors-tab">
                            <span>Colour</span>
                        </a>
                    </li>
                    <li class="main-nav__tab main-nav__tab_name_text">
                        <a class="js-designer-tab" href="text-tab">
                            <span>Text</span>
                        </a>
                    </li>
                    <li class="main-nav__tab main-nav__tab_name_graphics">
                        <a class="js-designer-tab" href="graphics-tab">
                            <span>Graphics</span>
                        </a>
                    </li>
                    <li class="main-nav__tab main-nav__tab_name_numbers">
                        <a class="js-designer-tab" href="numbers-tab">
                            <span>Numbers</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div id="products-tab" class="products-tab">
                <div class="products-controls">
                    <div class="products-select">
                        <select class="" data-bind="
                                options: productRootCategory().categories,
                                optionsText: 'name',
                                optionsValue: 'id',
                                value: selectedCategoryId,
                                event: {change: changeCategorySelectHandler},
                                optionsCaption: 'All categories'
                            "></select>
                        <span></span>
                    </div>
                    <div class="products-search">
                        <input type="text" placeholder="Search..."
                               data-bind="value: productsSearchQuery, valueUpdate: 'input'">
                        <span></span>
                    </div>
                </div>
                <div class="products-list">
                    <ul class="" data-bind="foreach: currentProducts">
                        <div class="products-back-btn"
                             data-bind="click: $root.backToCategoriesList, visible: $root.backToCategoriesVisible">
                            Back
                        </div>
                        <li data-bind="
                                       click: $root.selectProductItem,
                                       css: { category: isCategory(),
                                       product: isProduct(),
                                       active: $data.id() == $root.selectedProductVO().id()
                                        }
                                ">
                            <a
                                data-bind="css: {active: $data.id() == $root.selectedProductVO().id()}, visible: isProduct()">
                                <img src="" data-bind="attr: { src: thumbUrl, title: name }" alt="">
                                <span data-bind="text: name"></span>
                            </a>
                            <a data-bind="visible: isCategory()">
                                <img src="" data-bind="attr: { src: thumbUrl }" alt="">
                                <span data-bind="text: name"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="colors-tab" class="colors-tab hide">
                <ul class="colorizable-groups clearfix"
                    data-bind="foreach: { data: selectedProductColorVO().colorizeGroupList}">
                    <li>
                        <a href="#" data-bind="text: name().toUpperCase(), click: $root.selectColorElement,
                                            style: {color: name() == $root.currentColorizeElementGroup() ? '#D51622': '#3F3F3F'}
                                            "></a>
                    </li>
                </ul>
                <ul class="colors-classes clearfix" data-bind="foreach: colorClasses">
                    <li data-bind="
                        style: {
                            'border-color': value() == '#FFFFFF' ? '#A3A2A4': value(),
                            'background-color': $root.selectedProductElementColor().name() == name() ? value(): '#FFFFFF'
                            }
                        "><a href="#"
                             data-bind="css: {active: $root.selectedProductElementColor().name() == name()},
                                        style: {color: $root.selectedProductElementColor().name() == name() ? value()== '#FFFFFF' ? '#000000': '#FFFFFF': value()== '#FFFFFF' ? '#A3A2A4': value() },
                                                        text: name, click: $root.selectColorSubElement"></a>
                    </li>
                </ul>
                <div class="color-selected" data-bind="visible: $root.colorName()">
                    COLOUR SELECTED:
                    <span data-bind="text: $root.colorName()"></span>
                </div>

                <!-- ko if: !isMobile() && currentTab()==='colors-tab' -->
                <ul class="colors-palette clearfix" data-bind="foreach: colorsList">
                    <li>
                        <a href="#" data-bind="
                            style: {
                                'background-color': value,
                                'color': value,
                                'border-color': value.toLocaleLowerCase() == '#ffffff' ? '#A3A2A4': value
                                },
                            title: name,
                            click: $root.colorSelected,
                            css: {
                                selected: value.toLocaleLowerCase() === $root.selectedProductElementColor().value().toLocaleLowerCase()
                            }
                        ">
                            <svg
                                data-bind="visible: value.toLocaleLowerCase() === $root.selectedProductElementColor().value().toLocaleLowerCase(), style: {fill: value.toLocaleLowerCase() == '#ffffff' ? '#A3A2A4': value}"
                                id="color-select-arrow" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
                                width="24px" height="24px" version="1.1"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink">
                              <g>
                                  <g>
                                      <path class="fil1"
                                            d="M6 12c0,0 0,0 0,0 0,0 0,0 1,0l3 3 7 -7c1,0 1,0 1,0 0,0 0,0 0,0l-8 8 0 0 0 0 -4 -4z"/>
                                  </g>
                              </g>
                        </svg>
                        </a>
                    </li>
                </ul>
                <!-- /ko -->
            </div>
            <div id="text-tab" class="hide">
                <div class="text-tab-desktop">
                    <div class="text-tab__title clearfix">
                        <div class="text-tab__title__text text-tab-title">
                            Add/Edit Text layers
                        </div>
                        <div class="text-tab__title__button">
                            <button id="add-text-btn" class="text-controls-sprite add-text-btn" type="button"
                                    data-bind="click: addText, enable: selectedLetteringVO().text().length > 0, visible: !strictTemplate()"></button>
                        </div>
                    </div>
                    <div class="text-tab__text">
                <textarea id="add-text-input"
                          data-bind="value: selectedLetteringVO().text, valueUpdate: 'input', enable: editTextEnabled(), visible: !strictTemplate(), style: { textAlign: selectedLetteringVO().formatVO().textAlign }"
                          type="text" placeholder="Type here..."></textarea>
                    </div>
                    <div data-bind="visible: textToolsIsVisible" class="clearfix font-select">
                        <div class="text-tab-label font-select-label">
                            SELECT FONT
                        </div>
                        <div class="font-select-sign">
                            <button class="text-controls-sprite text-control-t" type="button"
                                    data-bind="click: toggleFontsList"></button>
                        </div>
                        <div class="text-tab-label font-select-color-label">
                            CHOOSE A COLOR
                        </div>
                        <div class="font-select-color-picker">
                            <a class="text-controls-choose-color" href="#" data-bind="style: {
                                'background-color': selectedLetteringVO().formatVO().fillColor() === 'none' ? '#FFFFFF': selectedLetteringVO().formatVO().fillColor,
                                'color': $root.getTextColorValue(selectedLetteringVO().formatVO().fillColor()),
                                'border-color': $root.getTextColorValue(selectedLetteringVO().formatVO().fillColor())
                                },
                                 click: toggleFontsColorsList"></a>
                        </div>
                    </div>
                    <div class="fonts-colors" data-bind="visible: showFontsColorsList">
                        <div class="text-tab-title">
                            Change the look of your text
                        </div>
                        <a href="#" class="fonts-colors__close"
                           data-bind="click: toggleFontsColorsList"></a>

                        <div class="fonts-colors__name">COLOUR SELECTED - <span
                                data-bind="text: selectedFontColorName"></span></div>
                        <!-- ko if: !isMobile() && currentTab()==='text-tab' -->
                        <ul class="colors-palette clearfix" data-bind="foreach: colors">
                            <li>
                                <a href="#" data-bind="
                                    style: {
                                        'background-color': value === 'none' ? '#FFFFFF': value,
                                        'color': $root.getTextColorValue(value),
                                        'border-color': $root.getTextColorValue(value)
                                    },
                                    title: name,
                                    click: $root.selectFontColor,
                                    css: {
                                        selected: $data.value.toLocaleLowerCase() === $root.selectedLetteringVO().formatVO().fillColor().toLocaleLowerCase()
                                    }
                                    ">
                                    <svg
                                        data-bind="
                                                visible: $data.value.toLocaleLowerCase() === $root.selectedLetteringVO().formatVO().fillColor().toLocaleLowerCase(),
                                                style: {fill: $root.getTextColorValue(value)}
                                            "
                                        id="color-select-arrow" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
                                        width="24px" height="24px" version="1.1"
                                        style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                        viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink">
                                          <g>
                                              <g>
                                                  <path class="fil1"
                                                        d="M6 12c0,0 0,0 0,0 0,0 0,0 1,0l3 3 7 -7c1,0 1,0 1,0 0,0 0,0 0,0l-8 8 0 0 0 0 -4 -4z"/>
                                              </g>
                                          </g>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <!-- /ko -->
                    </div>
                    <div class="font-list" data-bind="visible: showFontsList">
                        <a href="#" class="font-list__close" data-bind="click: toggleFontsList"></a>

                        <div class="font-list-wrapper">
                            <ul data-bind="foreach: fonts">
                                <li class="font-list__item"
                                    data-bind="css: { active: $root.selectedLetteringVO().formatVO().fontFamily() === $data.fontFamily }">
                                    <a href="#"
                                       data-bind="text: $data.name, click: $root.selectFont, style: { fontFamily: $data.fontFamily }"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div data-bind="visible: textToolsIsVisible" class="text-align-outline clearfix">
                        <div class="text-tab-label text-align-outline__al-lbl">ALIGN TEXT</div>
                        <div data-toggle="buttons" class="text-align-outline__al"
                             data-bind="radio: selectedLetteringVO().formatVO().textAlign">
                            <label id="text-align-left-btn" for="text-align-left"
                                   class="text-control-align text-control-align-left text-controls-sprite"
                                   data-bind="css: { disabled: !textAlignEnabled() }">
                                <input type="radio" value="left"
                                       data-bind="enable: textAlignEnabled()" name="text-align-control"
                                       id="text-align-left">
                            </label>
                            <label id="text-align-center-btn" for="text-align-center"
                                   class="text-control-align text-control-align-center text-controls-sprite"
                                   data-bind="css: { disabled: !textAlignEnabled() }">
                                <input type="radio" value="center"
                                       data-bind="enable: textAlignEnabled()" name="text-align-control"
                                       id="text-align-center">
                            </label>
                            <label id="text-align-right-btn"
                                   class="text-control-align text-control-align-right text-controls-sprite"
                                   data-bind="css: { disabled: !textAlignEnabled() }" for="text-align-right">
                                <input type="radio" value="right"
                                       data-bind="enable: textAlignEnabled()" name="text-align-control"
                                       id="text-align-right">
                            </label>
                        </div>
                        <div class="text-tab-label text-align-outline__outl-lbl">
                            ADD AN OUTLINE
                        </div>
                        <div class="text-align-outline__outl-picker">
                            <a class="text-controls-choose-color" href="#" data-bind="style: {
                                'background-color': selectedLetteringVO().formatVO().strokeColor() === 'none' ? '#FFFFFF': selectedLetteringVO().formatVO().strokeColor,
                                'color': $root.getTextColorValue(selectedLetteringVO().formatVO().strokeColor()),
                                'border-color': $root.getTextColorValue(selectedLetteringVO().formatVO().strokeColor())
                                },
                                 click: toggleFontsStrokeColorsList">
                                <span class="stroke-color-crossed" data-bind="visible: selectedLetteringVO().formatVO().strokeColor() === 'none'"></span>
                            </a>
                        </div>
                    </div>
                    <div class="fonts-colors" data-bind="visible: showFontsStrokeColorsList">
                        <div class="text-tab-title">
                            Change the look of your text
                        </div>
                        <a href="#" class="fonts-colors__close"
                           data-bind="click: toggleFontsStrokeColorsList"></a>

                        <div class="fonts-colors__name">COLOUR SELECTED - <span
                                data-bind="text: selectedStrokeColorName"></span></div>
                        <!-- ko if: !isMobile() && currentTab()==='text-tab' -->
                        <ul class="colors-palette clearfix" data-bind="foreach: strokeColors">
                            <li>
                                <a href="#" data-bind="
                                            style: {
                                                'background-color': value,
                                                'color': value,
                                                'border-color': $root.getTextColorValue(value)
                                                },
                                                title: name,
                                                click: $root.selectFontStrokeColor,
                                                css: {
                                                    selected: $data.value.toLocaleLowerCase() === $root.selectedLetteringVO().formatVO().strokeColor().toLocaleLowerCase()
                                                }
                                            ">
                                        <svg
                                            data-bind="
                                                visible: $data.value.toLocaleLowerCase() === $root.selectedLetteringVO().formatVO().strokeColor().toLocaleLowerCase(),
                                                style: {
                                                        fill: $root.getTextColorValue(value)
                                                    }
                                                "
                                            id="color-select-arrow" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
                                            width="24px" height="24px" version="1.1"
                                            style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                            viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <g>
                                                    <g>
                                                        <path class="fil1"
                                                              d="M6 12c0,0 0,0 0,0 0,0 0,0 1,0l3 3 7 -7c1,0 1,0 1,0 0,0 0,0 0,0l-8 8 0 0 0 0 -4 -4z"/>
                                                    </g>
                                                </g>
                                        </svg>
                                    <span class="colors-palette__crossed"
                                          data-bind="visible: $data.value.toLocaleLowerCase() === 'none'"></span>
                                </a>
                            </li>
                        </ul>
                        <!-- /ko -->
                    </div>
                    <div data-bind="visible: textToolsIsVisible" class="clearfix text-transform-slider">
                        <div class="text-tab-label">RESIZE TEXT</div>
                        <div class="text-control-slider">
                            <div class="noUiSlider"
                                 data-bind="slider: selectedLetteringVO().formatVO().fontSize, rangeStart: 10, rangeEnd: 200, step: 1"></div>
                        </div>
                    </div>

                    <div data-bind="visible: textToolsIsVisible" class="clearfix text-transform-slider">
                        <div class="text-tab-label">ROTATE TEXT</div>
                        <div class="text-control-slider">
                            <div class="noUiSlider"
                                 data-bind="slider: selectedLetteringVO().formatVO().rotation, rangeStart: 0, rangeEnd: 360, step: 1"></div>
                        </div>
                    </div>

                    <div data-bind="visible: showLetterSpacingSlider()">
                        <div data-bind="visible: textToolsIsVisible" class="clearfix text-transform-slider">
                            <div class="text-tab-label">LETTER SPACE</div>
                            <div class="text-control-slider">
                                <div class="noUiSlider"
                                     data-bind="slider: selectedLetteringVO().formatVO().letterSpacing, rangeStart: 0, rangeEnd: 20, step: 1"></div>
                            </div>
                        </div>
                    </div>

                    <div data-bind="visible: textToolsIsVisible">
                        <div data-bind="visible: showLineLeadingSlider()" class="clearfix text-transform-slider">
                            <div class="text-tab-label">LINE HEIGHT</div>
                            <div class="text-control-slider">
                                <div id="text-line-leading-slider" class="noUiSlider"
                                     data-bind="slider: selectedLetteringVO().formatVO().lineLeading, rangeStart: 0, rangeEnd: 3, step: 0.05, decimals: 2"></div>
                            </div>
                        </div>
                    </div>

                    <!--<div class="text-tab-title" data-bind="visible: textToolsIsVisible">
                        Apply a text effect
                    </div>-->

                    <!--            <div data-bind="visible: showTextEffects()" class="btn-group">-->
                    <!--                <button class="btn btn-default" type="button" id="text-effects-btn"-->
                    <!--                        data-bind="text: selectedTextEffectVO().label()" data-toggle="dropdown"><span-->
                    <!--                        class="caret"></span></button>-->
                    <!--                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">-->
                    <!--                    <span class="caret"></span>-->
                    <!--                </button>-->
                    <!--                <ul class="dropdown-menu" data-bind="foreach: textEffects"-->
                    <!--                    style="height: 150px; overflow-y: scroll;">-->
                    <!--                    <li data-bind="css: { active: $root.selectedTextEffectVO().name() === $data.name }">-->
                    <!--                        <a data-bind="text: $data.label, click: $root.selectTextEffect"></a>-->
                    <!--                    </li>-->
                    <!--                </ul>-->
                    <!--            </div>-->

                    <h6 data-bind="visible: showEffectsSlider(), text: selectedTextEffectVO().paramName()"></h6>

                    <div id="text-effect-slider" class="noUiSlider"
                         data-bind="visible: showEffectsSlider(), slider: selectedTextEffectVO().value, rangeStart: selectedTextEffectVO().min(), rangeEnd: selectedTextEffectVO().max(), step: selectedTextEffectVO().step(), decimals:2"></div>
                    <div class="divider" data-bind="visible: selectedProductSizeVO().notEmpty"></div>
                    <div id="text-form-size" data-bind="visible: selectedProductSizeVO().notEmpty">
                        <div>
                            <h6 id="text-form-size-label">Size</h6>
                            <input id="text-width" class="form-control" type="text"
                                   data-bind="value: selectedObjectPropertiesVO().width, event: { keypress: selectedObjectPropertiesVO().updateWidth }"/>
                            <span id="text-form-size-label-seperator">&times;</span>
                            <input id="text-height" class="form-control" type="text"
                                   data-bind="value: selectedObjectPropertiesVO().height, event: { keypress: selectedObjectPropertiesVO().updateHeight }"/>
                        </div>
                        <div>
                            <button class="btn btn-default" id="text-form-size-apply-btn" type="button">Apply</button>
                        </div>
                    </div>
                </div>

                <div class="text-tab-mobile">
                    <div class="text-tab__text clearfix" data-bind="visible: !showMoreEnabled()">
                        <textarea id="add-text-input" class="add-text-input"
                                  data-bind="value: selectedLetteringVO().text, valueUpdate: 'input', enable: editTextEnabled(), visible: !strictTemplate(), style: { textAlign: selectedLetteringVO().formatVO().textAlign }"
                                  type="text" placeholder="Type here..."></textarea>

                        <div class="add-text-main-tools">
                            <div class="clearfix">
                                <div class="font-select-sign">
                                    <button class="text-controls-sprite text-control-t" type="button"
                                            data-bind="click: toggleFontsList, enable: selectedLetteringVO().text().length > 0"></button>
                                </div>

                                <div class="font-select-color-picker">
                                    <button class="text-controls-choose-color" data-bind="
                                            enable: selectedLetteringVO().text().length > 0,
                                            style: {
                                                'background-color': selectedLetteringVO().formatVO().fillColor() === 'none' ? '#FFFFFF': selectedLetteringVO().formatVO().fillColor,
                                                'color': $root.getTextColorValue(selectedLetteringVO().formatVO().fillColor()),
                                                'border-color': $root.getTextColorValue(selectedLetteringVO().formatVO().fillColor())
                                            },
                                            click: showFontsColorsListMobile">
                                    </button>
                                </div>

                                <div class="text-align-outline__outl-picker">
                                    <button class="text-controls-choose-color" data-bind="
                                                enable: selectedLetteringVO().text().length > 0,
                                                style: {
                                                    'background-color': selectedLetteringVO().formatVO().strokeColor() === 'none' ? '#FFFFFF': selectedLetteringVO().formatVO().strokeColor,
                                                    'color': $root.getTextColorValue(selectedLetteringVO().formatVO().strokeColor()),
                                                    'border-color': $root.getTextColorValue(selectedLetteringVO().formatVO().strokeColor())
                                                    },
                                                click: showFontsStrokeColorsListMobile">
                                        <span class="stroke-color-crossed" data-bind="visible: selectedLetteringVO().formatVO().strokeColor() === 'none'"></span>
                                    </button>
                                </div>
                                <div class="text-tab__title__button">
                                    <button id="add-text-btn" class="text-controls-sprite add-text-btn" type="button"
                                            data-bind="click: addText, enable: selectedLetteringVO().text().length > 0, visible: !strictTemplate()"></button>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div data-toggle="buttons" class="text-align-outline__al"
                                     data-bind="radio: selectedLetteringVO().formatVO().textAlign">
                                    <label id="text-align-left-btn" for="text-align-left"
                                           class="text-control-align text-control-align-left text-controls-sprite"
                                           data-bind="css: {disabled: selectedLetteringVO().text().length === 0}">
                                        <input type="radio" value="left"
                                               data-bind="enable: selectedLetteringVO().text().length > 0"
                                               name="text-align-control"
                                               id="text-align-left">
                                    </label>
                                    <label id="text-align-center-btn" for="text-align-center"
                                           class="text-control-align text-control-align-center text-controls-sprite"
                                           data-bind="css: {disabled: selectedLetteringVO().text().length === 0}">
                                        <input type="radio" value="center"
                                               data-bind="enable: selectedLetteringVO().text().length > 0"
                                               name="text-align-control"
                                               id="text-align-center">
                                    </label>
                                    <label id="text-align-right-btn"
                                           class="text-control-align text-control-align-right text-controls-sprite"
                                           data-bind="css: {disabled: selectedLetteringVO().text().length === 0}"
                                           for="text-align-right">
                                        <input type="radio" value="right"
                                               data-bind="enable: selectedLetteringVO().text().length > 0"
                                               name="text-align-control"
                                               id="text-align-right">
                                    </label>
                                </div>
                                <div class="text-align-show-more">
                                    <button class="text-controls-sprite text-controls-show-more"
                                            data-bind="click: showMoreTrigger, enable: selectedLetteringVO().text().length > 0"></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="font-list" data-bind="visible: showFontsList">
                        <a href="#" class="font-list__close" data-bind="click: toggleFontsList"></a>

                        <div class="font-list-wrapper">
                            <ul data-bind="foreach: fonts">
                                <li class="font-list__item"
                                    data-bind="css: { active: $root.selectedLetteringVO().formatVO().fontFamily() === $data.fontFamily }">
                                    <a href="#"
                                       data-bind="text: $data.name, click: $root.selectFont, style: { fontFamily: $data.fontFamily }"></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="clearfix text-control-effects" data-bind="visible: showMoreEnabled()">
                        <div class="text-control-effects__tabs">
                            <div class="text-controls-shape-sprite text-control-group-fx"
                                 data-bind="css: {active: !textControlResizeActive()}, click: textControlResizeToggle"></div>
                            <div class="text-controls-shape-sprite text-control-group-resize"
                                 data-bind="css: {active: textControlResizeActive()}, click: textControlResizeToggle"></div>
                        </div>
                        <div class="text-control-effects__sliders">
                            <div data-bind="visible: textControlResizeActive()">
                                <div class="clearfix text-transform-slider">
                                    <div class="text-tab-label-resize text-controls-shape-sprite"></div>
                                    <div class="text-control-slider">
                                        <div class="noUiSlider"
                                             data-bind="slider: selectedLetteringVO().formatVO().letterSpacing, rangeStart: 0, rangeEnd: 20, step: 1, visible: showLetterSpacingSlider()"></div>
                                    </div>
                                </div>
                                <div class="clearfix text-transform-slider" data-bind="visible: showLineLeadingSlider()" >
                                    <div class="text-tab-label-letter-space text-controls-shape-sprite"></div>
                                    <div class="text-control-slider">
                                        <div class="noUiSlider"
                                             data-bind="slider: selectedLetteringVO().formatVO().lineLeading, rangeStart: 0, rangeEnd: 3, step: 0.05, decimals: 2"></div>
                                    </div>
                                </div>
                            </div>
                            <div data-bind="visible: !textControlResizeActive()">

                            </div>
                        </div>
                        <div class="text-control-effects__show-more">
                            <button class="text-controls-shape-sprite text-controls-show-more-inverse"
                                    data-bind="click: showMoreTrigger"></button>
                        </div>
                    </div>

                    <h6 data-bind="visible: showEffectsSlider(), text: selectedTextEffectVO().paramName()"></h6>

                    <div id="text-effect-slider" class="noUiSlider"
                         data-bind="visible: showEffectsSlider(), slider: selectedTextEffectVO().value, rangeStart: selectedTextEffectVO().min(), rangeEnd: selectedTextEffectVO().max(), step: selectedTextEffectVO().step(), decimals:2"></div>
                    <div class="divider" data-bind="visible: selectedProductSizeVO().notEmpty"></div>
                    <div id="text-form-size" data-bind="visible: selectedProductSizeVO().notEmpty">
                        <div>
                            <h6 id="text-form-size-label">Size</h6>
                            <input id="text-width" class="form-control" type="text"
                                   data-bind="value: selectedObjectPropertiesVO().width, event: { keypress: selectedObjectPropertiesVO().updateWidth }"/>
                            <span id="text-form-size-label-seperator">&times;</span>
                            <input id="text-height" class="form-control" type="text"
                                   data-bind="value: selectedObjectPropertiesVO().height, event: { keypress: selectedObjectPropertiesVO().updateHeight }"/>
                        </div>
                        <div>
                            <button class="btn btn-default" id="text-form-size-apply-btn" type="button">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="graphics-tab" class="hide">
                <div id="graphics-add-form" data-bind="visible: colorsTabFormsState() == 'addForm'">
                    <div class="graphics-controls">
                        <div class="graphics-select">
                            <select data-bind="
                                options: graphicRootCategory().categories,
                                optionsText: 'name',
                                value: graphicCategory,
                                optionsCaption: 'All Graphics',
                                event: {change: enterGraphicCategory}
                            "></select>
                            <span></span>
                        </div>
                        <div class="graphics-search">
                            <input type="text" placeholder="Search"
                                   data-bind="value: graphicsSearchQuery, valueUpdate: 'input'">
                            <!--<button class="close" aria-hidden="true"
                                    data-bind="visible: graphicsSearchQuery().length > 0, click: clearGraphicsSearch">&times;</button>-->
                            <span></span>
                        </div>
                        <button class="js-graphics-upload-agreement graphics-upload" aria-label="upload-form">
                        </button>
                    </div>
                    <div class="graphics-list">
                        <ul data-bind="foreach: currentGraphics , css: { narrow: graphicSelectedSubcategory }">
                            <div class="graphics-back-btn"
                                 data-bind="visible: $root.graphicSelectedSubcategory, click: $root.backGraphicItem">
                                Back
                            </div>
                            <li data-bind="
                                    click: $root.selectGraphicItem,
                                    css: { category: isCategory(),
                                    image: isImage() },
                                    style: { backgroundImage: 'url(' + categoryThumb() + ')' }">
                                <a data-bind="visible: isImage()">
                                    <img src="#" data-bind="attr: { src: thumb }" alt=""/>
                                    <span data-bind="text: name"></span>
                                </a>
                                <a data-bind="visible: isCategory()">
                                    <img src="#" data-bind="attr: { src: thumb }" alt=""/>
                                    <span data-bind="text: name"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="graphics-upload-agreement" data-bind="visible: colorsTabFormsState() == 'agreementForm'">
                    <div class="graphics-upload-agreement__title">
                        <span>Uploading Photos and Images</span>
                        <a class="js-graphics-upload-agreement"></a>
                    </div>

                    <p>Please note that in order to use a design (photo, image, text, brand or saying) you must have
                        full rights to use this design.</p>

                    <p>By uploading or saving a design you agree that:</p>
                    <ol>
                        <li>You hold the rights to commercially reproduce this design.</li>
                        <li>You also release us from any claims made as a result of any copyright infringement.</li>
                        <li>You understand that infringement of copyright is illegal. If you have any doubt as to the
                            legal ownership of a design you should check with the rightful owner that you are able to
                            use the design before uploading.
                        </li>
                        <li>You understand that we act under your instructions and is not obligated in any way to check
                            or confirm the legal use of reproducing any designs.
                        </li>
                    </ol>
                    <p class="graphics-upload-agreement__info">Graphics Information</p>

                    <p>Designer supports jpeg, gif, png and svg formats. All images need to have a minimum resolution of
                        150 dpi.</p>

                    <div class="graphics-upload-agreement__checkbox">
                        <input type="checkbox" data-bind="checked: userAcceptsConditions">
                        <svg
                                class="upload-check-mark"
                                data-bind="visible: userAcceptsConditions"
                                xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
                                width="24px" height="24px" version="1.1"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink">
                              <g>
                                  <g>
                                      <path
                                            d="M6 12c0,0 0,0 0,0 0,0 0,0 1,0l3 3 7 -7c1,0 1,0 1,0 0,0 0,0 0,0l-8 8 0 0 0 0 -4 -4z"/>
                                  </g>
                              </g>
                        </svg>
                    </div>


                    <p>I understand and accept these conditions of copyright.</p>

                    <button class="graphics-upload-agreement__upload js-graphics-upload-form"
                            data-bind="attr: { 'disabled': !userAcceptsConditions() }">
                        Upload
                    </button>
                </div>

                <div id="graphics-upload-form" data-bind="visible: colorsTabFormsState() == 'uploadForm'">
                    <div class="graphics-upload-form__title">
                        <span>Upload Graphics</span>
                        <a class="js-graphics-upload-form"></a>
                    </div>
                    <div class="graphics-upload-form__form">
                        <input type="text" class="form-control" placeholder="Url"
                               data-bind="value: customImageUrl, valueUpdate: 'input'">
                        <button data-bind="click: addCustomImage.bind($data, 'url'),
                                           attr: {'disabled': customImageUrl().length == 0}">
                            Add
                        </button>
                        <h6 data-bind="visible: uploadFileAvailable">or</h6>
                        <button data-loading-text="Uploading..."
                                data-bind="visible: uploadFileAvailable,
                                        click: addCustomImage.bind($data, 'upload')">
                            Browse for file...
                        </button>
                    </div>
                </div>

                <div id="graphics-color-form" data-bind="visible: colorsTabFormsState() == 'colorForm'">
                    <div class="graphics-color-form__title">
                        <span>Change the colours of your graphic</span>
                        <a class="js-graphics-color-form">
                            <span></span>
                        </a>
                    </div>
                    <div class="graphics-color-form__palette" data-bind="visible: selectedIsGraphics">
                        <ul class="colors-classes clearfix"
                            data-bind="foreach: { data: selectedGraphicsFormatVO().complexColor().colorizeList}">
                            <!--<li>
                                <a href="#" class="" data-bind="style: {'background-color': value}, text: name, click: $root.selectColorSubElement"></a> |
                            </li>-->
                            <li data-bind="
                                style: {
                                    'border-color': value() == '#FFFFFF' ? '#A3A2A4': value(),
                                    'background-color': $root.selectedProductElementColor().name() == name() ? value(): '#FFFFFF'
                                    }
                                "><a href="#"
                                     data-bind="css: {active: $root.selectedProductElementColor().name() == name()},
                                                style: {color: $root.selectedProductElementColor().name() == name() ? value()== '#FFFFFF' ? '#000000': '#FFFFFF': value()== '#FFFFFF' ? '#A3A2A4': value() },
                                                        text: name, click: $root.selectColorSubElement"></a>
                            </li>
                        </ul>
                        <div class="color-selected" data-bind="visible: $root.colorName()">
                            COLOUR SELECTED:
                            <span data-bind="text: $root.colorName()"></span>
                        </div>
                        <!-- ko if: !isMobile() && currentTab()==='graphics-tab' -->
                        <ul class="colors-palette clearfix" data-bind="foreach: colorsList">
                            <li>
                                <a href="#" data-bind="
                                    style: {
                                        'background-color': value,
                                        'color': value,
                                        'border-color': value.toLocaleLowerCase() == '#ffffff' ? '#A3A2A4': value
                                        },
                                    title: name,
                                    click: $root.colorSelected,
                                    css: {
                                        selected: value.toLocaleLowerCase() === $root.selectedProductElementColor().value().toLocaleLowerCase()
                                    }
                                ">
                                    <svg
                                            data-bind="visible: value.toLocaleLowerCase() === $root.selectedProductElementColor().value().toLocaleLowerCase(), style: {fill: value.toLocaleLowerCase() === '#ffffff' ? '#A3A2A4': value}"
                                            id="color-select-arrow" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
                                            width="24px" height="24px" version="1.1"
                                            style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                            viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink">
                                          <g>
                                              <g>
                                                  <path class="fil1"
                                                        d="M6 12c0,0 0,0 0,0 0,0 0,0 1,0l3 3 7 -7c1,0 1,0 1,0 0,0 0,0 0,0l-8 8 0 0 0 0 -4 -4z"/>
                                              </g>
                                          </g>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <!-- /ko -->
                    </div>
                </div>
            </div>
            <div id="numbers-tab" class="hide">
                <div class="numbers-tab-controls">
                    <button data-bind="click: addNameObj" aria-label="Add name">
                        Add name
                    </button>
                    <button data-bind="click: addNumberObj" aria-label="Add number">
                        Add number
                    </button>
                    <button class="js-order-sheet-form" aria-label="Order sheet">
                        Order Sheet
                    </button>
                </div>
                <div id="order-sheet-form" class="hide">
                    <p>
                        Number & Names Order Sheet
                        <a class="js-order-sheet-form"></a>
                    </p>

                    <p>
                        NOTE: If you require only a name or only a number, simply
                        leave the field that is not required blank.
                    </p>

                    <div class="order-sheet-caption" data-bind="visible: namesNumbers().length > 0">
                        <span>NUMBER</span>
                        <span>NAME</span>
                        <span>SIZE</span>
                    </div>

                    <ol class="order-sheet-list" data-bind="foreach: namesNumbers">
                        <li>
                            <ul class="">
                                <li>
                                    <input class="order-item-number" type="text" data-bind="value: $data.number"
                                           placeholder="00"/>
                                </li>
                                <li>
                                    <input class="order-item-name" type="text" data-bind="value: $data.name"
                                           placeholder="Name"/>
                                </li>
                                <li>
                                    <select class="order-item-size" data-bind="
                                        visible: $root.selectedProductVO().sizes().length > 1,
                                        options: $root.selectedProductVO().sizes,
                                        value: $data.size
                                    "></select>
                                    <span></span>
                                </li>
                                <li>
                                    <a class="order-item-remove" data-bind="click: $parent.removeNameNumber">
                                        <span></span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ol>
                    <div class="order-item-add">
                        <a class="" data-bind="click: addNameNumber">+ Add more names and/or numbers
                        </a>
                    </div>
                </div>
            </div>
            <div id="product-sizes-tab" class="hide">
                <p>
                    <span>Sizes & Qty</span>
                    <a class="js-close-overlay-form"></a>
                </p>

                <div>
                    <ol class="product-sizes-list" data-bind="foreach: quantities">
                        <li>
                            <ul class="">
                                <li>
                                    <select class="order-item-size" data-bind="
                                        visible: $root.selectedProductVO().sizes().length > 1,
                                        options: $root.selectedProductVO().sizes,
                                        value: $data.size
                                    "></select>
                                    <span></span>
                                </li>
                                <li>
                                    <input type="button" class="order-item-decrease-qty"
                                           data-bind="click: $parent.decreaseQuantity">
                                </li>
                                <li>
                                    <input class="order-item-quantity" type="text"
                                           data-bind="value: quantity, valueUpdate: 'input'"
                                           maxlength="3"/>
                                </li>
                                <li>
                                    <input type="button" class="order-item-increase-qty"
                                           data-bind="click: $parent.increaseQuantity">
                                </li>
                                <li>
                                    <a class="order-item-remove"
                                       data-bind="click: $parent.removeQuantity, visible: $root.canRemoveSize()">
                                        <span></span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ol>
                    <div class="order-item-add">
                        <a data-bind="click: addQuantity, visible: $root.selectedProductVO().sizes().length > 0">
                            + Add Size
                        </a>
                    </div>
                </div>
                <div class="order-total">
                    <ul>
                        <li>
                            <div>Total Order Qty</div>
                            <div data-bind="text: totalQuantity()"></div>
                        </li>
                        <li data-bind="foreach: $root.designInfo().prices">
                            <!-- ko if: $data.isTotal -->
                            <div>Total <span>inc.gst</span></div>
                            <div class="order-price" data-bind="text: $data.price, css: { bold: $data.isTotal }"></div>
                            <!-- /ko -->
                        </li>
                    </ul>
                    <button class="order-place" onclick="onPlaceOrder()"
                            data-loading-text="Placing order...">
                        ADD TO CART
                    </button>
                </div>
            </div>
            <div id="share-design-tab" class="hide">
                <p>
                    <span>Save & Share Your Design</span>
                    <a class="js-close-overlay-form"></a>
                </p>

                <p>
                    Simply copy the link to access your saved design.
                    Or share the link to take full advantage of our designer.
                </p>

                <p>
                <ul>
                    <li>share with friends and family</li>
                    <li>post on social media to gather feedback</li>
                    <li>collaborate with committee members for approval</li>
                    <li>get approval from the boss</li>
                    <li>save for later until sizes are known</li>
                </ul>
                </p>

                <textarea row="4" cols="50" data-bind="text: shareLink"></textarea>
            </div>
            <!--<div class="designer-footer-caption">PRODUCT DESIGNER POWERED BY ZEMS PERFORMANCE APPAREL</div>-->
        </div>

        <div class="left-column active-products-tab">
            <div id="canvas">
                <div id="canvas-container">
                    <!-- DesignerJS core goes here -->
                </div>
                <!-- Product side switch -->
                <div id="product-sides-switch"
                     data-bind="visible: selectedProductVO().locations().length > 1">
                    <ul class="" data-bind="foreach: selectedProductVO().locations">
                        <li data-bind="">
                            <button data-bind="click: $root.selectProductLocation,
                                               css: { active: $data.name == $root.selectedProductLocation() }">
                            </button>
                        </li>
                    </ul>
                </div>
                <!-- Product side switch end -->
            </div>
            <div class="clearfix">
            </div>
            <div id="bottom-menus" class="bottom-menus">
                <div id="bottom-menu" data-bind="css: {hide: isBottomColorPaletteShowed()}">
                    <div class="bottom-menu__main">
                        <a class="js-ellipsis-menu"><span></span></a>
                        <a class="js-designer-tab" href="share-design-tab" onclick="onShareDesign()">
                            <span>SAVE/SHARE</span>
                        </a>
                        <a class="js-designer-tab" href="product-sizes-tab">
                            <span>ADD SIZES & QTY</span>
                        </a>
                    </div>
                    <div class="bottom-menu__ellipsis hide">
                        <a class="js-ellipsis-menu"><span></span></a>
                        <a id="undo-btn" class=""
                           data-bind="click: undo, visible: isUndoActive"><span>Undo</span></a>
                        <a id="redo-btn" class=""
                           data-bind="click: redo, visible: isRedoActive"><span>Redo</span></a>
                        <a id="copy-btn" class="" data-bind="click: copy">Copy</a>
                        <a id="paste-btn" class="" data-bind="click: paste">Paste</a>
                        <!--
                                                <ul class="nav nav-pills designer-button-bar">
                                                    <li id="undo"><a id="undo-btn" data-bind="click: undo, visible: isUndoActive"><span>Undo</span></a></li>
                                                    <li id="redo"><a id="redo-btn" data-bind="click: redo, visible: isRedoActive"><span>Redo</span></a></li>
                                                    <li id="copy"><a id="copy-btn" data-bind="click: copy">Copy</a></li>
                                                    <li id="paste"><a id="paste-btn" data-bind="click: paste">Paste</a></li>
                                                </ul>
                        -->
                    </div>
                    <div>

                    </div>
                </div>
                <div id="colors-palette-carousel" class="bottom-color-palette carousel hide" data-interval=false
                     data-bind="css: {hide: !isBottomColorPaletteShowed()}">
                    <div data-bind="visible: currentTab() === 'text-tab'" class="colors-palette__color">COLOUR SELECTED - <span
                            data-bind="text: colorSelectedName"></span></div>
                    <div data-bind="visible: currentTab() !== 'text-tab' && $root.colorName()" class="colors-palette__color">COLOUR SELECTED - <span
                            data-bind="text: $root.colorName()"></span></div>
                    <a class="carousel-left carousel-control" href="#colors-palette-carousel" role="button"
                       data-slide="prev">
                        <svg class="color-palette-arrows" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
                             width="12px" height="24px" version="1.1"
                             style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                             viewBox="0 0 12 24"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                             <g>
                                 <path class="fil0"
                                       d="M9 4c1,0 1,0 1,0 0,0 0,1 0,1l-7 7 7 7c0,0 0,1 0,1 0,0 0,0 -1,0l-7 -8 0 0 0 0 7 -8z"/>
                                 <rect class="fil1" width="12" height="24"/>
                             </g>
                            </svg>
                        <!--<span class="sr-only">Previous</span>-->
                    </a>
                    <!--<script type="text/html" id="color-group-template-products">

                    </script>
                    <script type="text/html" id="color-group-template-text">

                    </script>-->
                    <!-- ko if: isMobile() && (currentTab()==='colors-tab' || currentTab()==='graphics-tab') -->
                    <ul class="carousel-inner js-color-group" id="color-group-products" data-bind="foreach: colorsGroupsList">
                        <li class="item" data-bind="css: {active: $index() === 0}">
                            <ul class="colors-palette-group" data-bind="foreach: { data: items, as: 'item' }">
                                <li>
                                    <a href="#" data-bind="
                                            style: {
                                                'background-color': value,
                                                'color': value,
                                                'border-color': value.toLocaleLowerCase() == '#ffffff' ? '#A3A2A4': value
                                                },
                                                title: name,
                                                click: $root.colorSelected,
                                                css: {
                                                selected: value.toLocaleLowerCase() === $root.selectedProductElementColor().value().toLocaleLowerCase()
                                            }
                                        ">
                                        <svg
                                            data-bind="visible: value.toLocaleLowerCase() === $root.selectedProductElementColor().value().toLocaleLowerCase(), style: {fill: value.toLocaleLowerCase() == '#ffffff' ? '#A3A2A4': value}"
                                            id="color-select-arrow" xmlns="http://www.w3.org/2000/svg"
                                            xml:space="preserve" width="24px" height="24px" version="1.1"
                                            style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                            viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink">
                                              <g>
                                                  <g>
                                                      <path class="fil1"
                                                            d="M6 12c0,0 0,0 0,0 0,0 0,0 1,0l3 3 7 -7c1,0 1,0 1,0 0,0 0,0 0,0l-8 8 0 0 0 0 -4 -4z"/>
                                                  </g>
                                              </g>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <!-- /ko -->
                    <!-- ko if: isMobile() && currentTab()==='text-tab'-->
                    <ul class="carousel-inner js-color-group" id="color-group-text" data-bind="foreach: colorsGroupsList">
                        <li class="item" data-bind="css: {active: $index() === 0}">
                            <ul class="colors-palette-group" data-bind="foreach: { data: items, as: 'item' }">
                                <li>
                                    <a href="#" data-bind="
                                            style: {
                                                'background-color': value,
                                                'color': value,
                                                'border-color': $root.getTextColorValue(value)
                                                },
                                                title: name,
                                                click: $root.colorSelected,
                                                css: {
                                                selected: value.toLocaleLowerCase() === $root.selectedTextColor()
                                            }
                                    ">
                                        <svg
                                            data-bind="visible: value.toLocaleLowerCase() === $root.selectedTextColor(), style: {fill: $root.getTextColorValue(value)}"
                                            id="color-select-arrow" xmlns="http://www.w3.org/2000/svg"
                                            xml:space="preserve" width="24px" height="24px" version="1.1"
                                            style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                            viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink">
                                              <g>
                                                  <g>
                                                      <path class="fil1"
                                                            d="M6 12c0,0 0,0 0,0 0,0 0,0 1,0l3 3 7 -7c1,0 1,0 1,0 0,0 0,0 0,0l-8 8 0 0 0 0 -4 -4z"/>
                                                  </g>
                                              </g>
                                        </svg>
                                        <span class="colors-palette__crossed"
                                              data-bind="visible: $data.value.toLocaleLowerCase() === 'none'"></span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <!-- /ko -->

                    <a class="carousel-right carousel-control" href="#colors-palette-carousel" role="button"
                       data-slide="next">
                        <svg class="color-palette-arrows" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
                             width="12px" height="24px" version="1.1"
                             style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                             viewBox="0 0 12 24"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                             <g>
                                 <path class="fil0"
                                       d="M3 4c-1,0 -1,0 -1,0 0,0 0,1 0,1l7 7 -7 7c0,0 0,1 0,1 0,0 0,0 1,0l7 -8 0 0 0 0 -7 -8z"/>
                                 <rect class="fil1" width="12" height="24"/>
                             </g>
                            </svg>
                        <!--<span class="sr-only">Next</span>-->
                    </a>

                </div>
            </div>
            <!--<div class="designer-footer-caption">PRODUCT DESIGNER POWERED BY ZEMS PERFORMANCE APPAREL</div>-->
        </div>
        <div class="designer-footer-caption">PRODUCT DESIGNER POWERED BY ZEMS PERFORMANCE APPAREL</div>
    </div>
</div>

