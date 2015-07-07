<div id="liveart-main-container">
			<div id="liveart-header"></div>
            
            <div id="liveart-init-preloader" data-bind="visible: !$root.status().completed">
                <h6 data-bind="text: $root.status().message" class="text-center text-info"></h6>
                <div class="progress progress-striped active">
                    <div class="bar" data-bind="style: {width: $root.percentCompleted()}"></div>
                </div>
            </div>

            <!-- data-bind="style: {visibility: $root.status().completed ? 'visible' : 'hidden'}" style="visibility:hidden" -->
			<div id="liveart-content" data-bind="visible: $root.status().completed" style="display: none">
				<div id="main-controls-container" class="liveart-panel-container">
					<div id="main-controls-content">
						<ul class="nav nav-stacked liveart-list-view" id="liveart-main-menu">
							<li id="select-product" class="liveart-dropdown">
								<a >
									<span>Select Product</span>
								</a>
								<div id="select-product-form" class="dropdown-menu liveart-panel liveart-dropdown-form">
									<div class="liveart-dropdown-form-header">
                                    	Select Product
                                        <span data-bind="if: $root.selectedProductCategoryVO"> / <span data-bind="text: $root.selectedProductCategoryVO().name"></span></span>
										<a class="liveart-close-window-btn" ></a>
                                    </div>
									<ul id="liveart-product-categories" data-bind="foreach: productCategories" class="thumbnails liveart-categories-thumbnails">
										<li data-bind="css: { active: $data.id == $root.selectedProductCategoryVO().id()}, click: $root.selectProductCategory" class="thumbnail">
                                        	<a data-bind="text: name" ></a>
                                        </li>
									</ul>
									<div id="liveart-product-gallery">
										<a class="liveart-back-btn" data-bind="click: hideProductsGallery" ></a>
										<ul id="liveart-products-list" data-bind="foreach: selectedProductCategoryVO().products" class="thumbnails liveart-thumbnails">
									  		<li>
												<a data-bind="click: $root.selectProduct, css: { active: $data.id == $root.selectedProductVO().id()}" class="thumbnail liveart-thumbnail">
									  				<div class="liveart-thumbnail-state"></div>
											    	<img src="#" data-bind="attr: { src: thumbUrl }" alt="">
											    </a>
										  	</li>
									  	</ul>
									</div>
								</div>
							</li>
							<li id="add-text" class="liveart-dropdown">
								<a >
									<span>Add Text</span>
								</a>
								<div id="add-text-form" class="dropdown-menu liveart-panel liveart-dropdown-form">
									<div class="liveart-dropdown-form-header">
										<span class="liveart-form-header-title">Add Text</span>
										<a class="liveart-close-window-btn" ></a>
									</div>
									<form>
										<fieldset>
                                            <legend></legend>
											<div class="input-append" style="width: 100%;">
											  <input id="add-text-input" data-bind="value: selectedLetteringVO().text, valueUpdate: 'afterkeydown'" type="text" placeholder="Your text here">
											  <button class="btn" id="add-text-btn" type="button" data-bind="click: addText, enable: selectedLetteringVO().text().length > 0">Add</button>
											</div>
											<div class="divider"></div>
                                            <h6>Font options</h6>
                                            <div class="btn-group">
											  <button class="btn" type="button" id="font-btn" data-bind="text: selectedFontName"></button>
											  <button class="btn dropdown-toggle" type="button" id="font-dropdown-btn" data-toggle="dropdown">
											    <span class="caret"></span>
											  </button>
											  <ul class="dropdown-menu" id="font-list" data-bind="foreach: fonts">
											  	<li data-bind="css: { active: $root.selectedLetteringVO().formatVO().fontFamily() === $data.fontFamily }">
											  		<a data-bind="text: $data.name, click: $root.selectFont" ></a>
											  	</li>
											  </ul>
											</div>
											<div class="divider"></div>
											<button class="btn" type="button" id="bold-toggle-btn" data-bind="checkbox: selectedLetteringVO().formatVO().bold"><span>B</span></button>
											<button class="btn" type="button" id="italic-toggle-btn" data-bind="checkbox: selectedLetteringVO().formatVO().italic"><span>I</span></button>
					      					<input id="text-fill-color-picker" type="text" class="liveart-color-picker" data-bind="colorPicker: selectedLetteringVO().formatVO().fillColor, colorPalette: colors"/>
					      					<input id="text-stroke-color-picker" type="text" class="liveart-color-picker" data-bind="colorPicker: selectedLetteringVO().formatVO().strokeColor, colorPalette: strokeColors"/>
										</fieldset>
									</form>
								</div>
							</li>
							<li id="add-graphics" class="liveart-dropdown">
								<a >
									<span>Add Graphics</span>
								</a>
								<div id="add-graphics-form" class="dropdown-menu liveart-panel liveart-dropdown-form">
									<div class="liveart-dropdown-form-header">
                                    	Add Graphics 
                                        <span data-bind="if: $root.selectedGraphicsCategoryVO"> / <span data-bind="text: $root.selectedGraphicsCategoryVO().name"></span></span>
                                    	<a class="liveart-close-window-btn"></a>
                                    </div>
									<ul id="liveart-graphics-categories" data-bind="foreach: graphicsCategories" class="thumbnails liveart-categories-thumbnails">
										<li data-bind="css: { active: $data == $root.selectedGraphicsCategoryVO()}, click: $root.selectGraphicsCategory" class="thumbnail">
                                        	<a data-bind="text: name" ></a>
                                        </li>
									</ul>
									<div id="liveart-graphics-gallery">
										<a class="liveart-back-btn" data-bind="click: hideGraphicsGallery" ></a>
										<ul id="liveart-graphics-list" data-bind="foreach: selectedGraphicsCategoryVO().graphics" class="thumbnails liveart-thumbnails">
									  		<li>
												<a data-bind="click: $root.selectGraphics" class="thumbnail liveart-thumbnail">
									  				<div class="liveart-thumbnail-state"></div>
											    	<img src="#" data-bind="attr: { src: thumb }" alt="">
											    </a>
										  	</li>
									  	</ul>
									</div>
								</div>
							</li>
							<!--<li id="names-and-numbers" class="dropdown">
								<a class="dropdown-toggle" data-toggle="dropdown" >
									<span>Names and Numbers</span>
								</a>
								<div id="names-and-numbers-form" class="dropdown-menu liveart-panel liveart-dropdown-form">
									<div class="liveart-dropdown-form-header">Names and Numbers</div>
								</div>
							</li>-->
							<li id="upload-graphics" class="liveart-dropdown">
								<a >
									<span>Upload Graphics</span>
								</a>
								<div id="upload-graphics-form" class="dropdown-menu liveart-panel liveart-dropdown-form">
									<div class="liveart-dropdown-form-header">
										<span class="liveart-form-header-title">Upload Graphics</span>
										<a class="liveart-close-window-btn" ></a>
									</div>
                                    <form style="padding-bottom: 0;">
                                        <div class="input-append">
									        <input id="liveart-upload-grphics-url-input" type="text" placeholder="Url">
									        <button class="btn" type="button" onclick="onAddImageByUrl()">Add</button>
								        </div>
                                    </form>
                                    <p class="text-center">or</p>
                                    <form id="liveart-upload-image-form" enctype="multipart/form-data" method="post" style="padding-top: 0;">
                                        <button id="liveart-upload-image-browse-btn" type="button" class="btn btn-block" data-loading-text="Uploading..." onclick="onUploadImageClick()">Browse for file...</button>
                                    </form>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div id="canvas-container">
					<!-- LiveArtJS core goes here -->
				</div>

				<!-- Product side swictch -->
				<div id="product-sides-switch-container" class="liveart-panel-container">
					<div class="centered-pills-container">
						<ul class="nav nav-pills" data-bind="foreach: selectedProductVO().locations">
							<li data-bind="css: {active: $data == $root.selectedProductLocation()}">
								<a  data-bind="click: $root.selectProductLocation">
									<span data-bind="text: $data"></span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<!-- Product side swictch end -->

				<div id="preview-controls-container" class="liveart-panel-container">
					<div class="navbar liveart-button-bar">
					  <div class="navbar-inner">
					    <ul class="nav">
					      <!--<li id="layers" class="dropup">
					      	<a id="layers-btn"  class="dropdown-toggle" data-toggle="dropdown">Layers</a>
					      	<ul id="layers-list" class="dropdown-menu">
					      		<li>
					      			<a  class="liveart-text-layer">
					      				<span>Keep Calm And Carry On</span>
					      			</a>
					      		</li>
					      		<li class="divider"></li>
					      		<li>
					      			<a  class="liveart-text-layer">
					      				<span>Yes, We Can</span>
					      			</a>
					      		</li>
					      		<li class="divider"></li>
					      		<li>
					      			<a  class="liveart-image-layer">
					      				<img src="assets/img/layer-numbers-2-icon.png" alt="">
					      				<span>#15 â€” Right Sleeve</span>
					      			</a>
					      		</li>
					      		<li class="divider"></li>
					      		<li>
					      			<a  class="liveart-image-layer">
					      				<img src="assets/img/layer-crown-icon.png" alt="">
					      				<span>Crown</span>
					      			</a>
					      		</li>
					      		<li class="divider"></li>
					      		<li>
					      			<a  class="liveart-image-layer">
					      				<img src="assets/img/layer-numbers-icon.png" alt="">
					      				<span>Phil James â€” Back</span>
					      			</a>
					      		</li>
					      		<li class="divider"></li>
					      		<li>
					      			<a  class="liveart-image-layer">
					      				<img src="assets/img/layer-dude-icon.png" alt="">
					      				<span>My_portrait.jpg</span>
					      			</a>
					      		</li>
					      	</ul>
					      </li>
					      <li class="divider-vertical"></li>-->
					      <li id="clear-design"><a id="clear-design-btn"  data-bind="click: clearDesign"><span>Clear Design</span></a></li>
					      <!--<li class="divider-vertical"></li>
					      <li id="undo"><a id="undo-btn" ><span>Undo</span></a></li>
					      <li class="mini-divider-vertical"></li>
					      <li id="redo"><a id="redo-btn" ><span>Redo</span></a></li>
					      <li class="divider-vertical"></li>-->
					      <!-- <li id="copy"><a id="copy-btn" >Copy</a></li>
					      <li class="mini-divider-vertical"></li>
					      <li id="paste"><a id="paste-btn" >Paste</a></li>
					      <li class="divider-vertical"></li> -->
					      <!--<li id="flip" class="dropup">
					      	<a id="flip-btn"  class="dropdown-toggle" data-toggle="dropdown">Flip</a>
					      	<ul id="flip-list" class="dropdown-menu">
					      		<li id="horizontal-flip"><a id="horizontal-flip-btn" ></a></li>
					      		<li id="vertical-flip"><a id="vertical-flip-btn" ></a></li>
					      	</ul>
					      </li>-->
					      <li class="divider-vertical" data-bind="visible: selectedObjectType() != 'none'"></li>
					      <li id="align" class="dropup" data-bind="visible: selectedObjectType() != 'none'">
					      	<a id="align-btn"  class="dropdown-toggle" data-toggle="dropdown">Align</a>
					      	<ul id="align-list" class="dropdown-menu">
					      		<li id="align-left"><a id="align-left-btn"  data-bind="click: align.bind($data, 'left')"></a></li>
					      		<li id="align-center"><a id="align-center-btn"  data-bind="click: align.bind($data, 'hcenter')"></a></li>
					      		<li id="align-right"><a id="align-right-btn"  data-bind="click: align.bind($data, 'right')"></a></li>
					      	</ul>
					      </li>
					      <li class="divider-vertical" data-bind="visible: selectedObjectType() != 'none'"></li>
					      <li id="overlap" class="dropup" data-bind="visible: selectedObjectType() != 'none'">
					      	<a id="overlap-btn"  class="dropdown-toggle" data-toggle="dropdown">Arrange layers</a>
					      	<ul id="overlap-list" class="dropdown-menu">
					      		<li id="overlap-toward"><a id="overlap-toward-btn"  data-bind="click: arrange.bind($data, 'front')"></a></li>
					      		<li id="overlap-backward"><a id="overlap-backward-btn"  data-bind="click: arrange.bind($data, 'back')"></a></li>
					      	</ul>
					      </li>
					      <li class="divider-vertical" data-bind="visible: selectedObjectType() == 'text'"></li>
					      <li id="text-stroke" data-bind="visible: selectedObjectType() == 'text'">
					      	<a id="text-stroke-btn" class="liveart-color-picker-btn" >
					      		<span>Text Color</span>
					      		<input id="text-fill-color-picker-2" type="text" class="liveart-color-picker" data-bind="colorPicker: selectedLetteringVO().formatVO().fillColor, colorPalette: colors"/>
					      	</a>
					      </li>
					      <li class="divider-vertical" data-bind="visible: selectedObjectType() == 'text'"></li>
					      <li id="text-fill" data-bind="visible: selectedObjectType() == 'text'">
					      	<a id="text-fill-btn" class="liveart-color-picker-btn" >
					      		<span>Text Stroke</span>
					      		<input id="text-stroke-color-picker-2" type="text" class="liveart-color-picker" data-bind="colorPicker: selectedLetteringVO().formatVO().strokeColor, colorPalette: strokeColors"/>
					      	</a>
					      </li>
					      <li class="divider-vertical" data-bind="visible: isColorizableGraphics"></li>
					      <li id="graphics-fill" data-bind="visible: isColorizableGraphics">
					      	<a id="graphics-fill-btn" class="liveart-color-picker-btn" >
					      		<span>Image Color</span>
					      		<input id="graphics-fill-color-picker" type="text" class="liveart-color-picker dropup-color-picker" data-bind="colorPicker: selectedGraphicsFormatVO().fillColor, colorPalette: colors"/>
					      	</a>
					      </li>
					      <li class="divider-vertical" data-bind="visible: isColorizableGraphics"></li>
					      <li id="graphics-stroke" data-bind="visible: isColorizableGraphics">
					      	<a id="graphics-stroke-btn" class="liveart-color-picker-btn" >
					      		<span>Image Stroke</span>
					      		<input id="graphics-stroke-color-picker" type="text" class="liveart-color-picker dropup-color-picker" data-bind="colorPicker: selectedGraphicsFormatVO().strokeColor, colorPalette: strokeColors"/>
					      	</a>
					      </li>
					      <li class="divider-vertical" data-bind="visible: selectedProductVO().colors().length > 0"></li>
					      <li id="product-color" data-bind="visible: selectedProductVO().colors().length > 0">
					      	<a id="product-color-btn" class="liveart-color-picker-btn" >
					      		<span>Product Color</span>
					      		<input id="product-color-picker" type="text" class="liveart-color-picker dropup-color-picker" data-bind="colorPicker: selectedProductColorVO().hexValue, productColorPalette: selectedProductVO().colors"/>
					      	</a>
					      </li>
					    </ul>
					  </div>
					</div>
					<!-- <div id="preview-controls-content" class="liveart-panel">
					</div> -->
				</div>

				<div id="order-options-container" class="liveart-panel-container">
					<div id="product-info-panel" class="liveart-panel">
						<h5 id="liveart-product-name" data-bind="text: selectedProductVO().name"></h5>
						<h6>Color: <span data-bind="text: selectedProductColorVO().name"></span></h6>
						<table class="gray order-colors" data-bind="foreach: $root.designInfo().colors">
							<tr>
                                <td data-bind="text: $data.location"></td>
                                <td data-bind="text: $root.colorsCount($data.count)"></td>
							</tr>
						</table>
						<div class="divider"></div>
						<div class="gray"><span data-bind="text: objectsCount()"></span></div>
					</div>
					<div id="product-sizes-panel" class="liveart-panel">
                        <div>
                            <ul id="product-sizes-list" class="unstyled" data-bind="foreach: quantities">
                                <li>
                                    <span class="quantity-label" data-bind="visible: $root.selectedProductVO().sizes().length < 1">Quantity:</span>
                                	<!-- we need to wrap select to hide it properly -->
                                    <!-- <span data-bind="visible: $root.sizes().length > 0">
                                    	<select data-bind="options: $root.sizes, value: size" class="selectpicker"></select>
                                    </span> -->

                                    <div class="btn-group" data-bind="visible: $root.selectedProductVO().sizes().length > 1">
									  <button class="btn" type="button" id="size-btn" data-bind="text: $data.size"></button>
									  <button class="btn dropdown-toggle" type="button" id="size-dropdown-btn" data-toggle="dropdown">
									    <span class="caret"></span>
									  </button>
									  <ul class="dropdown-menu" id="sizes-list" data-bind="foreach: $root.selectedProductVO().sizes">
									  	<li data-bind="css: { active: $data == $parent.size() }">
									  		<a data-bind="text: $data, click: $parent.size" ></a>
									  	</li>
									  </ul>
									</div>
                                    <button class="btn" type="button" data-bind="click: $parent.decreaseQuantity">-</button>
                                    <input data-bind="value: quantity, valueUpdate: 'afterkeydown'" maxlength="3"/>
                                    <button class="btn" type="button" data-bind="click: $parent.increaseQuantity">+</button>
                                    <button type="button" data-bind="click: $parent.removeQuantity, visible: $root.canRemoveSize()" class="close">&times;</button>
                                </li>
                            </ul>
                            <button class="btn" type="button" data-bind="click: addQuantity, visible: $root.selectedProductVO().sizes().length > 0">Add Size</button>
                            <!--<button class="btn btn-link">Sizes Guide</button>-->
                        </div>
						<div class="divider"></div>
						<div>
							<table class="order-price" data-bind="foreach: $root.designInfo().prices">
								<tr>
                                    <td class="gray" data-bind="text: $data.label"></td>
                                    <td class="order-price" data-bind="text: $data.price, css: {bold: $data.isTotal}"></td>
								</tr>
							</table>
                            <!--<a  class="btn btn-link btn-block" onclick="onGetQuote()">Get Quote</a>-->
							<a id="place-order-btn"  class="btn btn-primary btn-block" onclick="onPlaceOrder()" data-loading-text="Placing order...">Place Order</a>
						</div>
					</div>
					<div id="save-load-print-panel" class="liveart-panel">
						<button id="save-design-btn" type="button" class="btn btn-link" onclick="onSaveDesign()">Save for later</button>
						<div class="divider-vertical"></div>
						<button id="load-design-btn" type="button" class="btn btn-link" onclick="onLoadDesign()">Load</button>
						<!--<div class="divider-vertical"></div>
						<button id="print-design-btn" class="btn btn-link print">Print</button>-->
					</div>
					<!--<div id="share-design-panel" class="liveart-panel">
						<p class="gray">Share your design: </p>
					</div>-->
				</div>
			</div>
		</div>

        <!-- Alert popup -->
		<div id="liveart-alert-popup" class="modal fade">
			<div class="modal-body">
				<a class="close" data-dismiss="modal">&times;</a>
				<p id="liveart-alert-message">Message</p>
			</div>
			<div class="modal-footer">
				<a  class="btn btn-inverse" data-dismiss="modal">Ok</a>
			</div>
		</div>
		<!-- Alert popup end -->

		<!-- Authorization popup -->
		<div id="liveart-authorization-popup" class="modal fade" onkeypress="onAuthDialogSubmit(event)">
			<div class="modal-header">
				<a class="close" data-dismiss="modal">&times;</a>
				<h3>Authorization</h3>
			</div>
			<div class="modal-body">
				<label>E-mail</label>
				<input id="liveart-authorization-email-input" type="text" class="span4" placeholder="E-mail">
			</div>
			<div class="modal-footer">
				<a  class="btn btn-inverse" onclick="onAuthDialogSubmit()">Enter</a>
				<a  class="btn" data-dismiss="modal">Cancel</a>
			</div>
		</div>
		<!-- Authorization popup end -->

        <!-- Save design popup -->
		<div id="liveart-save-design-popup" class="modal fade" onkeypress="onSaveDesignDialogSubmit(event)">
			<div class="modal-header">
				<a class="close" data-dismiss="modal">&times;</a>
				<h3>Save Design</h3>
			</div>
			<div class="modal-body">
				<label>Design Name</label>
				<input id="liveart-save-design-name-input" type="text" class="span4" placeholder="Design Name">
			</div>
			<div class="modal-footer">
				<a  class="btn btn-inverse" onclick="onSaveDesignDialogSubmit()">Save</a>
				<a  class="btn" data-dismiss="modal">Cancel</a>
			</div>
		</div>
		<!-- Save design popup end -->

        <!-- Auth and save design popup -->
		<div id="liveart-auth-and-save-dialog" class="modal fade" onkeypress="onAuthAndSaveDialogSubmit(event)">
			<div class="modal-header">
				<a class="close" data-dismiss="modal">&times;</a>
				<h3>Save design</h3>
			</div>
			<div class="modal-body">
				<label>E-mail</label>
				<input id="liveart-auth-and-save-email-input" type="text" class="span4" placeholder="E-mail" >
                <label>Design Name</label>
				<input id="liveart-auth-and-save-name-input" type="text" class="span4" placeholder="Design Name" >
			</div>
			<div class="modal-footer">
				<a  class="btn btn-inverse" onclick="onAuthAndSaveDialogSubmit()">Enter</a>
				<a  class="btn" data-dismiss="modal">Cancel</a>
			</div>
		</div>
		<!-- Auth and save design popup end -->

		<!-- Designs list popup -->
		<div id="liveart-designs-list-popup" class="modal fade" onkeypress="onLoadDesignDialogSubmit(event)">
			<div class="modal-header">
				<a class="close" data-dismiss="modal">&times;</a>
				<h3>Choose Design</h3>
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
						<tr data-bind="css: {active: $data == $root.selectedDesign()}, click: $root.onDesignSelected">
							<td data-bind="text: $data.title"></td>
							<td data-bind="text: $data.date"></td>
						</tr>
					</tbody>
				</table>
                <p class="text-center" data-bind="visible: $root.designsList().length == 0">No designs available.</p>
			</div>
			<div class="modal-footer">
				<a  class="btn btn-inverse" onclick="onLoadDesignDialogSubmit()" data-bind="css: {disabled: $root.designsList().length == 0}">Load</a>
				<a  class="btn" data-dismiss="modal">Cancel</a>
			</div>
		</div>