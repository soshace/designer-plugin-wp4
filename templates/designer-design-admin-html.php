<table cellpadding="0" cellspacing="0" class="wcla_liveart_options wc-metabox-content">
    <tbody>
        <tr>
            <td class="options">
                <?php echo __('Thumbnail', 'wcla') ?>
            </td>
            <td class="options">                
            </td>
        </tr>     
        <tr>
            <td class="upload_image">
                <a href="#" class="upload_image_button <?php if ($thumb_id > 0) echo 'remove'; ?>" ><img src="<?php
                    if (!empty($thumb_image))
                        echo esc_attr($thumb_image);
                    else
                        echo esc_attr(woocommerce_placeholder_img_src());
                    ?>" /><input type="hidden" name="wcla_thumb" class="upload_image_id" value="<?php echo esc_attr($thumb_id); ?>" /><span class="overlay"></span></a>
            </td>

            <td class="upload_image">

            </td>

        </tr>
        <tr>
            <td colspan="2">
                <input class="wcla_left wcla_checkbox" type="checkbox" name="wcla_able_for_design" id="wcla_able_for_design" value="yes" <?php echo $wcla_able_for_design == 'yes' ? 'checked="checked' : '' ?>/><label for="wcla_able_for_design" class="wcla wcla_left">Use in liveart design</label>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <input class="wcla_left wcla_checkbox" type="checkbox" name="wcla_product_resizeable" id="wcla_product_resizeable" value="yes" <?php echo $wcla_product_resizeable == 'yes' ? 'checked="checked' : '' ?>/><label for="wcla_product_resizable" class="wcla wcla_left">Resizeable</label>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <input class="wcla_left wcla_checkbox" type="checkbox" name="wcla_product_show_ruler" id="wcla_product_resizeable" value="yes" <?php echo $wcla_product_show_ruler == 'yes' ? 'checked="checked' : '' ?>/><label for="wcla_product_show_ruler" class="wcla wcla_left">Show Ruler</label>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <input class="wcla_left wcla_checkbox" type="checkbox" name="wcla_hide_editable_area_border" id="wcla_hide_editable_area_border" value="yes" <?php echo $wcla_hide_editable_area_border == 'yes' ? 'checked="checked' : '' ?>/><label for="wcla wcla_hide_editable_area_border" class="wcla_left">Hide Editable Area Border</label>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <input class="wcla_left wcla_checkbox" type="checkbox" name="wcla_name_numbers" id="wcla_name_numbers" value="yes" <?php echo $wcla_name_numbers == 'yes' ? 'checked="checked' : '' ?>/><label for="wcla_name_numbers" class="wcla wcla_left">Enable name and numbers</label>
            </td>
        </tr>
    </tbody>
</table>

<div id="wcla_product_locations" class="wcla_product_properties wc-metabox postbox">
    <div class="handlediv" title="Click to toggle"></div>
    <h3><span>Product Printing Areas</span></h3>
    <div class="inside">

        <div class="wcla_content">
            <ul class="wcla_list_content">
                <?php if (is_array($locations) && count($locations) > 0): ?>
                    <?php foreach ($locations as $k => $location): ?>
                        <li class="wcla_list_content_row wcla_clear" id="parea-<?php echo $k ?>">
                            <span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn">
                                <button class="button button-primary wcla_printing_area" type="button" onclick="delElement('parea-<?php echo $k ?>')">Delete</button>
                                <div class="wcla_clear"></div>
                            </span>
                            <div class="wcla_left">
                                <div class=" wcla_margin_right5 upload_image">
                                    
                                    <span class="wcla_image_title wcla_w100 wcla_left">Image:</span>
                                    <a rel="id" class="upload_image_button wcla_left wcla_clearremove remove" href="#">                                    
                                        <img id="print_area_image-<?php echo $k ?>" height="120" src="<?php
                                        $front_img_id = $location["image"];
                                        $front_img = wp_get_attachment_url($front_img_id);
                                        if (!empty($front_img))
                                            echo esc_attr($front_img);
                                        else
                                            echo esc_attr(woocommerce_placeholder_img_src());
                                        ?>" />
                                        <input type="hidden" value="<?php echo $location["image"] ?>" class="upload_image_id" name="wcla_location_thumb[<?php echo $k ?>]">
                                        <span class="overlay"></span>
                                    </a>
                                    <span class="wcla_clear"></span>
                                </div> 
                                <br>                           
                                <div class="wcla_margin_right5 upload_image">                                    
                                    <span class="wcla_image_title wcla_w100 wcla_left">Mask:</span>
                                    <a rel="id" class="upload_image_button wcla_left wcla_clearremove remove" href="#">                                    
                                        <img id="print_area_image-mask-<?php echo $k ?>" height="120" src="<?php
                                        $front_mask_id = $location["mask"];
                                        $front_mask_img = wp_get_attachment_url($front_mask_id);
                                        if (!empty($front_mask_img))
                                            echo esc_attr($front_mask_img);
                                        else
                                            echo esc_attr(woocommerce_placeholder_img_src());
                                        ?>" />
                                        <input type="hidden" value="<?php echo $location["mask"] ?>" class="upload_image_id" name="wcla_location_mask[<?php echo $k ?>]">
                                        <span class="overlay"></span>
                                    </a>
                                    <span class="wcla_clear"></span>
                                </div>

                            </div>    
                            <div class="wcla_left wcla_margin_right5">                                 
                                <span class="wcla_left wcla_clear wcla_pad0">
                                    <label for="wcla_location_name[<?php echo $k ?>]">Name:</label>
                                    <input type="text" class="wcla_textbox wcla_location_name" in="wcla_location_name[<?php echo $k ?>]" name="wcla_location_name[<?php echo $k ?>]" value="<?php echo $location["name"] ?>">
                                </span>
                                <span class="wcla_left wcla_clear wcla_pad0">
                                    <label for="wcla_location_editable_area[<?php echo $k ?>]">Editable area:</label>
                                    <input type="text" class="wcla_textbox" id="wcla_location_editable_area-<?php echo $k ?>" name="wcla_location_editable_area[<?php echo $k ?>]" value="<?php echo $location["editable_area"] ?>" >
                                </span>
<!--                                <span class="wcla_left wcla_clear wcla_pad0">
                                    <label for="wcla_location_editable_area_units[<?php echo $k ?>]">Editable area units:</label>
                                    <input type="text" class="wcla_textbox" id="wcla_location_editable_area_units-<?php echo $k ?>" name="wcla_location_editable_area_units[<?php echo $k ?>]" value="<?php echo $location["editable_area_units"] ?>">
                                </span> -->
                                <span class="wcla_left wcla_clear wcla_pad0">&nbsp;</span>
                                <span class="wcla_left wcla_clear wcla_pad0">
                                    <label for="wcla_location_editable_area_units_width[<?php echo $k ?>]">Editable Area Width:</label>
                                    <input type="text" class="wcla_textbox" id="wcla_location_editable_area_width-<?php echo $k ?>" name="wcla_location_editable_area_width[<?php echo $k ?>]" value="<?php echo $location["editable_area_width"] ?>">
                                </span>
                                <span class="wcla_left wcla_clear wcla_pad0">
                                    <label for="wcla_location_editable_area_units_height[<?php echo $k ?>]">Editable Area Height:</label>
                                    <input type="text" class="wcla_textbox" id="wcla_location_editable_area_height-<?php echo $k ?>" name="wcla_location_editable_area_height[<?php echo $k ?>]" value="<?php echo $location["editable_area_height"] ?>">
                                </span>
                                <span class="wcla_left wcla_clear wcla_pad0">
                                    <label for="wcla_location_editable_cliprect[<?php echo $k ?>]">Clip Rect:</label>
                                    <input type="text" class="wcla_textbox" id="wcla_location_editable_cliprect-<?php echo $k ?>" name="wcla_location_editable_cliprect[<?php echo $k ?>]" value="<?php echo $location["editable_area_cliprect"] ?>">
                                </span>
                                <span class="wcla_left wcla_clear wcla_pad0">&nbsp;</span>
                                <span class="wcla_left wcla_clear wcla_pad0">
                                    <label for="wcla_location_editable_area_min_range_width-<?php echo $k ?>">Min Range Width:</label>
                                    <input type="text" class="wcla_textbox" id="wcla_location_editable_area_min_range_width-<?php echo $k ?>" name="wcla_location_editable_area_min_range_width[<?php echo $k ?>]" value="<?php echo $location["editable_area_min_range_width"] ?>">
                                </span>
                                <span class="wcla_left wcla_clear wcla_pad0">
                                    <label for="wcla_location_editable_area_max_range_width-<?php echo $k ?>">Max Range Width:</label>
                                    <input type="text" class="wcla_textbox" id="wcla_location_editable_area_max_range_width-<?php echo $k ?>" name="wcla_location_editable_area_max_range_width[<?php echo $k ?>]" value="<?php echo $location["editable_area_max_range_width"] ?>">
                                </span>

                                <span class="wcla_left wcla_clear wcla_pad0">
                                    <label for="wcla_location_editable_area_range_width_step-<?php echo $k ?>">Range Width Step:</label>
                                    <input type="text" class="wcla_textbox" id="wcla_location_editable_area_range_width_step-<?php echo $k ?>" name="wcla_location_editable_area_range_width_step[<?php echo $k ?>]" value="<?php echo $location["editable_area_range_width_step"] ?>">
                                </span>

                                <span class="wcla_left wcla_clear wcla_pad0">&nbsp;</span>
                                <span class="wcla_left wcla_clear wcla_pad0">
                                    <label for="wcla_location_editable_area_min_range_height-<?php echo $k ?>">Min Range Height:</label>
                                    <input type="text" class="wcla_textbox" id="wcla_location_editable_area_min_range_height-<?php echo $k ?>" name="wcla_location_editable_area_min_range_height[<?php echo $k ?>]" value="<?php echo $location["editable_area_min_range_height"] ?>">
                                </span>
                                <span class="wcla_left wcla_clear wcla_pad0">
                                    <label for="wcla_location_editable_area_max_range_height-<?php echo $k ?>">Max Range Height:</label>
                                    <input type="text" class="wcla_textbox" id="wcla_location_editable_area_max_range_height-<?php echo $k ?>" name="wcla_location_editable_area_max_range_height[<?php echo $k ?>]" value="<?php echo $location["editable_area_max_range_height"] ?>">
                                </span>

                                <span class="wcla_left wcla_clear wcla_pad0">
                                    <label for="wcla_location_editable_area_range_height_step-<?php echo $k ?>">Range Height Step:</label>
                                    <input type="text" class="wcla_textbox" id="wcla_location_editable_area_range_height_step-<?php echo $k ?>" name="wcla_location_editable_area_range_height_step[<?php echo $k ?>]" value="<?php echo $location["editable_area_range_height_step"] ?>">
                                </span>

                                <span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn">
                                    <button class="button button-primary wcla_printing_area" type="button" onclick="editArea(<?php echo $front_img_id ?>,<?php echo $k ?>)">Edit printing area</button>
                                    <div class="wcla_clear"></div>
                                </span>
                                <div class="wcla_clear"></div>
                            </div>                            
                            <div class="wcla_clear"></div>
                            <input type="hidden" name="wcla_location[]" value="<?php echo $k; ?>">
                        </li>
                    <?php endforeach; ?>
                <?php endif; ?>
            </ul>
            <div class="wcla_clear"></div>
            <div id="printing-area"></div>
        </div>

        <div class="toolbar">
            <button class="button button-primary wcla_add_location wcla_right" type="button">Add</button>
            <div class="wcla_clear"></div>
        </div>

    </div>
</div>


<div id="wcla_product_properties" class="wcla_product_properties wc-metabox postbox">
    <div class="handlediv" title="Click to toggle"></div>
    <h3><span>Product Colors</span></h3>
    <div class="inside">

        <div class="wcla_content">
            <ul class="wcla_list_content">

                <?php if (is_array($colors) && count($colors) > 0): ?>
                    <?php foreach ($colors as $k => $color): ?>
                        <li class="wcla_list_content_row wcla_clear" id="color-<?php echo $k ?>">   
                            <span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn">
                                <button class="button button-primary wcla_printing_area" type="button" onclick="delElement('color-<?php echo $k ?>')">Delete</button>
                                <div class="wcla_clear"></div>
                            </span>
                            <?php if (is_array($color["location"]) && count($color["location"]) > 0)  ?>
                            <?php foreach ($color["location"] as $_k => $location): ?>
                                <div class="wcla_left upload_image wcla_margin_right5">
                                    <span class="wcla_image_title wcla_w100 wcla_left"><?php echo $location["name"] ?></span>
                                    <a rel="id" class="upload_image_button wcla_left wcla_clearremove remove" href="#">
                                        <img src="<?php
                                        $img_id = $location["image"];
                                        $img = wp_get_attachment_url($img_id);
                                        if (!empty($img))
                                            echo esc_attr($img);
                                        else
                                            echo esc_attr(woocommerce_placeholder_img_src());
                                        ?>" />
                                        <input type="hidden" value="<?php echo $location["image"] ?>" class="upload_image_id" name="wcla_property_location_thumb[<?php echo $k ?>][<?php echo $location["name"] ?>]">
                                        <span class="overlay"></span></a><span class="wcla_clear"></span>
                                </div>
                            <?php endforeach; ?>
                            <div class="wcla_left wcla_margin_right5">
                                <span class="wcla_left wcla_clear wcla_pad10">
                                    <label for="wcla_color_name[<?php echo $k ?>]">Color Name:</label>
                                    <input type="text" class="wcla_textbox" in="wcla_color_name[<?php echo $k ?>]" name="wcla_color_name[<?php echo $k ?>]" value="<?php echo $color["color_name"] ?>">
                                </span>
                                <span class="wcla_left wcla_clear wcla_pad10">
                                    <label for="wcla_color_value[0]">Color Value:</label>
                                    <input type="text" class="wcla_textbox" in="wcla_color_value[<?php echo $k ?>]" name="wcla_color_value[<?php echo $k ?>]" value="<?php echo $color["color_value"] ?>">
                                </span>
                                <span class="wcla_clear"></span>
                            </div>
                            <div class="wcla_clear"></div>
                            <input type="hidden" name="wcla_property[]" value="<?php echo $k; ?>">
                        </li>
                    <?php endforeach; ?>
                <?php endif; ?>
            </ul>
            <div class="wcla_clear"></div>
        </div>

        <div class="toolbar">
            <button class="button button-primary wcla_add_property wcla_right" type="button">Add</button>
            <div class="wcla_clear"></div>
        </div>

    </div>
</div>

<div id="wcla_product_sizes" class="wcla_product_properties wc-metabox postbox">
    <div class="handlediv" title="Click to toggle"></div>
    <h3><span>Product sizes</span></h3>
    <div class="inside">

        <div class="wcla_content">
            <ul class="wcla_list_content">
                <?php if (is_array($sizes) && count($sizes) > 0): ?>                
                    <?php foreach ($sizes as $k => $size): ?>
                        <li class="wcla_list_content_row wcla_clear" id="size-<?php echo $k ?>">
                            <span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn">
                                <button class="button button-primary wcla_printing_area" type="button" onclick="delElement('size-<?php echo $k ?>')">Delete</button>
                                <div class="wcla_clear"></div>
                            </span>
                            <div class="wcla_left wcla_margin_right5">
                                <span class="wcla_left wcla_clear "><label for="wcla_size[<?php echo $k ?>]">Size:</label><input type="text" name="wcla_size[<?php echo $k ?>]" id="wcla_size[<?php echo $k ?>]" class="wcla_textbox" value="<?php echo esc_attr($size) ?>"/></span>
                                <span class="wcla_clear"></span>
                            </div>
                            <div class="wcla_clear"></div><input type="hidden" value="<?php echo $k ?>" name="wcla_sizes[]"/></li>
                    <?php endforeach; ?>
                <?php endif; ?>
            </ul>
            <div class="wcla_clear"></div>
        </div>

        <div class="toolbar">
            <button class="button button-primary wcla_add_sizes wcla_right" type="button">Add</button>
            <div class="wcla_clear"></div>
        </div>

    </div>
</div>
<div id="wcla_product_colorizable_elements" class="wcla_product_properties wc-metabox postbox">
    <div class="handlediv" title="Click to toggle"></div>
    <h3><span>Colorizable Elements</span></h3>
    <div class="inside">
    <!-- <pre> -->
<?php //var_dump($colorizable_elements)?>
<!-- </pre> -->
        <div class="wcla_content">           
            <ul class="wcla_list_content">
                <?php if (is_array($colorizable_elements) && count($colorizable_elements) > 0): ?>                
                    <?php foreach ($colorizable_elements as $k => $colorizable_element): ?>
                        <li class="wcla_list_content_row wcla_clear" id="colorizable_element-<?php echo $k ?>">
                            <table class="table-grid">
                                <thead>
                                    <tr>
                                        <td>Group Name<span class="required">*</span></td>                                       
                                        <td>Group ID<span class="required">*</span></td> 
                                    </tr>   
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="text" name="wcla_colorizable_element[<?php echo $k ?>][name]" id="wcla_colorizable_element_name_<?php echo $k ?>" class="wcla_textbox" value="<?php echo $colorizable_element["name"] ?>"/></td>                                      
                                        <td><input type="text" name="wcla_colorizable_element[<?php echo $k ?>][id]" id="wcla_colorizable_element_id_<?php echo $k ?>" class="wcla_textbox" value="<?php echo $colorizable_element["id"] ?>"/></td>                                      
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <div id="wcla_colorizable_element_classes_<?php echo $k ?>" class="wcla_product_colorizable_elements_properties wc-metabox postbox">
                                               
                                                    <h3>Classes</h3>
                                                    <div class="inside">
                                                        <ul id="wcla_colorizable_element_classes_content_<?php echo $k ?>">     
                                                            <?php if (isset($colorizable_element["classes"]) && $colorizable_element["classes"] > 0): ?>                                                 
                                                                <?php foreach ($colorizable_element["classes"] as $_k=> $class): ?>
                                                                    <li class="wcla_list_content_row wcla_clear" id="wcla_colorizable_element_classes_content_<?php echo $k ?>_row_<?php echo $_k ?>">
                                                                        <table class="table-grid" style="margin:10px;">
                                                                            <thead>
                                                                                <tr>
                                                                                    <td>Name<span class="required">*</span></td>
                                                                                    <td>Id<span class="required">*</span></td>                                                                              
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td><input type="text" name="wcla_colorizable_element[<?php echo $k ?>][classes][<?php echo $_k ?>][name]" id="wcla_colorizable_element_<?php echo $k ?>_classes_name_<?php echo $_k ?>" class="wcla_textbox" value="<?php echo $class["name"]?>"/></td>
                                                                                    <td><input type="text" name="wcla_colorizable_element[<?php echo $k ?>][classes][<?php echo $_k ?>][id]" id="wcla_colorizable_element_<?php echo $k ?>_classes_id_<?php echo $_k ?>" class="wcla_textbox" value="<?php echo $class["backend_id"]?>"/></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td colspan="2">
                                                                                        <div id="wcla_colorizable_element_<?php echo $k ?>_class_<?php echo $_k ?>_colors" class="wcla_product_class_colorizable_elements_properties wc-metabox postbox">
                                                                                            <h3>Colors</h3>
                                                                                            <div class="inside">
                                                                                                <table class="table-grid" style="margin:10px;">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <td>Name<span class="required">*</span></td>
                                                                                                            <td>Id<span class="required">*</span></td>
                                                                                                            <td style="width:40px"></td>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody id="colors_<?php echo $k ?>_<?php echo $_k ?>">
                                                                                                        <?php if (isset($class["colors"]) && $class["colors"] > 0): ?>
                                                                                                            <?php foreach ($class["colors"] as $key => $color): ?>
                                                                                                                <tr id="wcla_colorizable_element_<?php echo $k ?>_classes<?php echo $_k ?>_color_row_<?php echo $key ?>">
                                                                                                                    <td>
                                                                                                                        <input type="text" name="wcla_colorizable_element[<?php echo $k ?>][classes][<?php echo $_k ?>][values][<?php echo $key ?>][name]"  class="wcla_textbox" value="<?php echo $color["name"] ?>"/>
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        <input type="text" name="wcla_colorizable_element[<?php echo $k ?>][classes][<?php echo $_k ?>][values][<?php echo $key ?>][value]"  class="wcla_textbox" value="<?php echo $color["value"] ?>"/>
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        <button class="button button-primary wcla_printing_area" type="button" onclick="delElement('wcla_colorizable_element_<?php echo $k ?>_classes<?php echo $_k ?>_color_row_<?php echo $key ?>')">Delete</button><div class="wcla_clear"> 
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <?php  $ceClassesColorCnt++;?>
                                                                                                            <?php endforeach; ?>
                                                                                                        <?php endif; ?>
                                                                                                    </tbody>   
                                                                                                </table>
                                                                                                <div class="toolbar"><button class="button button-primary wcla_add_class_row_color_button wcla_right" type="button" value="colors_<?php echo $k ?>_<?php echo $_k ?>">Add Color</button><div class="wcla_clear"></div></div>
                                                                                            </div>

                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>  
                                                                        <span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn"><button class="button button-primary wcla_printing_area" type="button" onclick="delElement('wcla_colorizable_element_classes_content_<?php echo $k ?>_row_<?php echo $_k ?>')">Delete</button><div class="wcla_clear"></div></span>  
                                                                    </li>
                                                                    <?php  $ceclassescnt++;?>
                                                                <?php endforeach;?> 
                                                            <?php endif;?> 
                                                        </ul>
                                                    </div>
                                                    
                                                 
                       
                                                    <div class="toolbar"><button class="button button-primary wcla_add_row_classes_button wcla_right" type="button" value="wcla_colorizable_element_classes_<?php echo $k?>">Add Class</button><div class="wcla_clear"></div></div>                                                         
                                                   
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> 
                            <span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn"><button class="button button-primary wcla_printing_area" type="button" onclick="delElement('colorizable_element-<?php echo $k ?>')">Delete</button><div class="wcla_clear"></div></span>

                            <div class="wcla_clear"></div><input type="hidden" value="<?php echo $k ?>" name="wcla_colorizable_elements[]"/>
                        </li>
                        <?php $colElementsCnt++;?>
                    <?php endforeach; ?>
                <?php endif; ?>
            </ul>
            <div class="wcla_clear"></div>
        </div>

        <div class="toolbar">
            <!-- <button class="button button-primary wcla_add_col_elements wcla_right" type="button">Add</button> -->
            <button class="button button-primary wcla_add_col_elements_classes wcla_right" type="button">Add Group</button>
            
            <div class="wcla_clear"></div>
        </div>

    </div>
</div>

<div class="wcla_clear"></div>
<div id="wcla_product_editable_area_sizes" class="wcla_product_properties wc-metabox postbox">
    <div class="handlediv" title="Click to toggle"></div>
    <h3><span>Editable Area Sizes</span></h3>
    <div class="inside">
        <div class="wcla_content"> 
            <table class="table-grid" style="margin:10px;">
                <thead>
                    <tr>
                        <td>Name<span class="required">*</span></td>
                        <td>Width<span class="required">*</span></td>
                        <td>Height<span class="required">*</span></td>
                        <td style="width:40px"></td>
                    </tr>
                </thead>
                <tbody id="color_<?php echo $k ?>">
                    <?php if (isset($editable_area_sizes) && $editable_area_sizes > 0): ?>
                        <?php foreach ($editable_area_sizes as $k => $size): ?>
                            <tr id="wcla_editable_area_sizes_<?php echo $k ?>">
                                <td>
                                    <input type="text" name="wcla_editable_area_size[<?php echo $k ?>][label]"  class="wcla_textbox" value="<?php echo $size["label"] ?>"/>
                                </td>
                                <td>
                                    <input type="text" name="wcla_editable_area_size[<?php echo $k ?>][width]"  class="wcla_textbox" value="<?php echo $size["width"] ?>"/>
                                </td>
                                <td>
                                    <input type="text" name="wcla_editable_area_size[<?php echo $k ?>][height]"  class="wcla_textbox" value="<?php echo $size["height"] ?>"/>
                                </td>
                                <td>
                                    <button class="button button-primary wcla_printing_area" type="button" onclick="delElement('wcla_ditable_area_size_<?php echo $k ?>')">Delete</button><div class="wcla_clear"> 
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>   
            </table>
        </div> 
        <div class="toolbar">
            <button class="button button-primary wcla_add_editable_colors wcla_right" type="button" value="wcla_product_editable_area_sizes">Add</button>
            <div class="wcla_clear"></div>
        </div>
    </div>    
</div>            
<div class="wcla_clear"></div>            