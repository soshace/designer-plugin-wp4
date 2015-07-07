<?php
/**
 * @category   Peexl
 * @package    Peexl
 * @copyright  Copyright (c) 2014 Peexl Web Development (http://www.peexl.com)
 * @license    http://framework.zend.com/license/new-bsd    New BSD License
 * @version    1.0
 */

class DesignerWCAdmin {

    const SETTINGS_NAMESPACE = 'designer_settings';

    public function __construct() {
        $this->setActionFilter();
    }

    public function setActionFilter() {
        add_filter('woocommerce_settings_tabs_array', array($this, 'wcla_add_settings_tab'));
        add_filter('woocommerce_settings_tabs_' . self::SETTINGS_NAMESPACE, array($this, 'wcla_add_settings_tab_content'));

        add_filter('woocommerce_update_options_' . self::SETTINGS_NAMESPACE, array($this, 'wcla_update_options'));

        add_action('woocommerce_product_write_panel_tabs', array($this, 'wcla_tab_options_tab'));
        add_action('woocommerce_product_write_panels', array($this, 'wcla_tab_options'));
        add_action('woocommerce_process_product_meta', array($this, 'wcla_product_data_tab'), 1, 2);

        add_filter('manage_edit-shop_order_columns', array($this, 'wcla_edit_order_columns'), 100);
        add_action('manage_shop_order_posts_custom_column', array($this, 'wcla_custom_order_columns'), 100, 2);

        add_filter('woocommerce_hidden_order_itemmeta', array($this, 'wcla_hidden_order_itemmeta'), 100, 1);
        add_filter('post_thumbnail_html', array($this, 'wcla_post_image_html'), 100, 3);
        add_action('add_meta_boxes', array($this, 'wcla_woocommerce_order_meta_boxes'), 100);
    }

    

    public function wcla_add_settings_tab($tabs) {
        $tabs[self::SETTINGS_NAMESPACE] = __('Designer', 'designer');
        return $tabs;
    }

    public function wcla_add_settings_tab_content() {
        woocommerce_admin_fields(WCLA_Utilities::get_fields());
    }

    public function wcla_update_options() {
        woocommerce_update_options(WCLA_Utilities::get_fields());
    }

   
    public function wcla_tab_options_tab() {
        ?>

        <li class="wcla_designer_tab"><a href="#wcla_designer_tab_data"><?php _e('Designer', 'designer'); ?></a></li>

        <?php
    }

    public function wcla_tab_options() {

        global $post, $woocommerce;

        $cnt = 0;
        $scnt = 0;
        $lcnt = 0;
        $cecnt = 0;
        $secnt = 0;

        $ceclassescnt=0;   //colorizable element's classes counter
        $ceClassesColorCnt=0; //colorizable element's classes color counter
        $colElementsCnt=0; //colorizable element counte

        $thumb_id = maybe_unserialize(get_post_meta($post->ID, 'wcla_thumb', true));

        $thumb_image = wp_get_attachment_url($thumb_id);

        $wcla_able_for_design = maybe_unserialize(get_post_meta($post->ID, 'wcla_able_for_design', true));
        $wcla_product_resizeable = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_resizeable', true));
        $wcla_product_show_ruler = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_show_ruler', true));
        $wcla_hide_editable_area_border = maybe_unserialize(get_post_meta($post->ID, 'wcla_hide_editable_area_border', true));
        $wcla_name_numbers = maybe_unserialize(get_post_meta($post->ID, 'wcla_name_numbers', true));
        
        $colors = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_colors', true));
        $cnt = count($colors);
        $sizes = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_sizes', true));
        $scnt = count($sizes);
        $locations = maybe_unserialize(get_post_meta($post->ID, 'wcla_locations', true));
        $lcnt = count($locations);
        $colorizable_elements = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_colorizable_elements', true));
        $cecnt = count($colorizable_elements);
        $editable_area_sizes = maybe_unserialize(get_post_meta($post->ID, 'wcla_editable_area_sizes', true));

        $secnt = count($editable_area_sizes);
        ?>

        <div id="wcla_designer_tab_data" class="panel woocommerce_options_panel">
            <?php include( DESIGNER_DIR . 'templates/designer-design-admin-html.php' ) ?>

            <?php
            /**
             * Product Type Javascript
             */
            ob_start();
            ?>



            jQuery(function(){
            // Uploader

            var cnt=<?php echo $cnt ?>;
            var scnt=<?php echo $scnt ?>;
            var lcnt=<?php echo $lcnt ?>;
            var cecnt=<?php echo $cecnt ?>;
            var secnt=<?php echo $secnt ?>;
            var ceclassescnt=<?php echo $ceclassescnt?>;
            var ceClassesColorCnt=<?php echo $ceClassesColorCnt?>;
            var colElementsCnt=<?php echo $colElementsCnt?>;

            var variable_image_frame;
            var setting_variation_image_id;
            var setting_variation_image;
            var wp_media_post_id = wp.media.model.settings.post.id;
            jQuery('#wcla_designer_tab_data').on('click', '.upload_image_button', function( event ) {

            var button                = jQuery( this );
            var post_id                = button.attr('rel');
            var parent                = button.closest('.upload_image');
            setting_variation_image    = parent;
            setting_variation_image_id = post_id;

            event.preventDefault();

            if ( button.is('.remove') ) {

            setting_variation_image.find( '.upload_image_id' ).val( '' );
            setting_variation_image.find( 'img' ).attr( 'src', '<?php echo woocommerce_placeholder_img_src(); ?>' );
            setting_variation_image.find( '.upload_image_button' ).removeClass( 'remove' );

            } else {

            // If the media frame already exists, reopen it.
            if ( variable_image_frame ) {      
            variable_image_frame.open();
            return;
            }

            // Create the media frame.
            variable_image_frame = wp.media.frames.downloadable_file = wp.media({
            // Set the title of the modal.
            title: '<?php echo esc_js(__('Choose an image', 'woocommerce')); ?>',
            button: {
            text: '<?php echo esc_js(__('Set Designer image', 'woocommerce')); ?>'
            }
            });

            // When an image is selected, run a callback.
            variable_image_frame.on( 'select', function() {

            var selection = variable_image_frame.state().get('selection');


            selection.map( function( attachment ) {

            attachment = attachment.toJSON();

            setting_variation_image.find( '.upload_image_id' ).val( attachment.id );
            setting_variation_image.find( '.upload_image_button' ).addClass( 'remove' );
            setting_variation_image.find( 'img' ).attr( 'src', attachment.url );

            } );

            });

            // Finally, open the modal.
            variable_image_frame.open();
            }
            });


            jQuery('#wcla_designer_tab_data div.wcla_product_properties').on('click','.wcla_add_property',function(){
            if(lcnt>0){
            var img_content='';
            jQuery("#wcla_product_locations input.wcla_location_name").each(function(){
            var name=jQuery(this).val();
            img_content=img_content+'<div class="wcla_left wcla_margin_right5 upload_image"><span class="wcla_image_title wcla_w100 wcla_left">'+name+'</span><a href="#" class="upload_image_button wcla_left wcla_clear<?php if ($image_id > 0) echo 'remove'; ?>" rel="id"><img class="wcla_left"   src="<?php
                    echo esc_attr(woocommerce_placeholder_img_src());
                    ?>" /><input type="hidden" name="wcla_property_location_thumb['+cnt+']['+name+']" class="upload_image_id" value="" /><span class="overlay"></span></a><span class="wcla_clear"></span></div>'

            });

            jQuery('#wcla_designer_tab_data #wcla_product_properties ul.wcla_list_content').append(
            '<li class="wcla_list_content_row wcla_clear" id="color-'+cnt+'">'
                +'<span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn"><button class="button button-primary wcla_printing_area" type="button" onclick="delElement(\'color-' + cnt + '\')">Delete</button><div class="wcla_clear"></div></span>'
                + img_content
                +'<div class="wcla_left wcla_margin_right5">'
                    +'<span class="wcla_left wcla_clear wcla_pad10"><label for="wcla_color_name['+cnt+']">Color Name:</label><input type="text" name="wcla_color_name['+cnt+']" in="wcla_color_name['+cnt+']" class="wcla_textbox"/></span>'
                    +'<span class="wcla_left wcla_clear wcla_pad10"><label for="wcla_color_value['+cnt+']">Color Value:</label><input type="text" name="wcla_color_value['+cnt+']" in="wcla_color_value['+cnt+']" class="wcla_textbox"/></span>'
                    +'<span class="wcla_clear"></span>'
                    +'</div>'
                +'<div class="wcla_clear"></div><input type="hidden" value="'+cnt+'" name="wcla_property[]"/></li>'
            );
            cnt++;
            }
            else{
            alert('Please add at least one location');          
            }

            });

            jQuery('#wcla_designer_tab_data div.wcla_product_properties').on('click','.wcla_add_location',function(){

            jQuery('#wcla_designer_tab_data #wcla_product_locations ul.wcla_list_content').append(
            '<li class="wcla_list_content_row wcla_clear" id="parea-'+lcnt+'">'
                +'<span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn"><button class="button button-primary wcla_printing_area" type="button" onclick="delElement(\'parea-' + lcnt + '\')">Delete</button><div class="wcla_clear"></div></span>'
                +'<div class="wcla_left">'    
                    +'<div class="wcla_margin_right5 upload_image">'                        
                        +'Image:<br><a href="#" class="upload_image_button wcla_left wcla_clear<?php if ($image_id > 0) echo 'remove'; ?>" rel="id"><img class="wcla_left"  height="120" id="print_area_image-'+lcnt+'" src="<?php
                            echo esc_attr(woocommerce_placeholder_img_src());
                            ?>" /><input type="hidden" name="wcla_location_thumb['+lcnt+']" class="upload_image_id" value="" /><span class="overlay"></span></a><span class="wcla_clear"></span></div>'                    
                    +'<br><div class="wcla_margin_right5 upload_image">'                
                        +'Mask:<br><a href="#" class="upload_image_button wcla_left wcla_clear<?php if ($image_id > 0) echo 'remove'; ?>" rel="id"><img class="wcla_left"  height="120" id="print_area_image-mask-'+lcnt+'" src="<?php
                            echo esc_attr(woocommerce_placeholder_img_src());
                            ?>" /><input type="hidden" name="wcla_location_mask['+lcnt+']" class="upload_image_id" value="" /><span class="overlay"></span></a><span class="wcla_clear"></span></div>' 
                    +'</div>'
                +'<div class="wcla_left wcla_margin_right5">'
                    +'<span class="wcla_left wcla_clear wcla_pad0"><label for="wcla_location_name['+lcnt+']">Name:</label><input type="text" name="wcla_location_name['+lcnt+']" id="wcla_location_name-'+lcnt+'" class="wcla_textbox wcla_location_name"/></span>'
                    +'<span class="wcla_left wcla_clear wcla_pad0"><label for="wcla_location_editable_area['+lcnt+']">Editable area:</label><input type="text" name="wcla_location_editable_area['+lcnt+']" id="wcla_location_editable_area-'+lcnt+'" class="wcla_textbox"  /></span>'                    
                    +'<span class="wcla_left wcla_clear wcla_pad0">&nbsp;</span>'
                    +'<span class="wcla_left wcla_clear wcla_pad0"><label for="wcla_location_editable_area_width['+lcnt+']">Editable area width:</label><input type="text" name="wcla_location_editable_area_width['+lcnt+']" id="wcla_location_editable_area_width-'+lcnt+'" class="wcla_textbox"/></span>'
                    +'<span class="wcla_left wcla_clear wcla_pad0"><label for="wcla_location_editable_area_height['+lcnt+']">Editable area height:</label><input type="text" name="wcla_location_editable_area_height['+lcnt+']" id="wcla_location_editable_area_height-'+lcnt+'" class="wcla_textbox"/></span>'                        
                    +'<span class="wcla_left wcla_clear wcla_pad0"><label for="wcla_location_editable_cliprect['+lcnt+']">Clip Rect:</label><input type="text" name="wcla_location_editable_cliprect['+lcnt+']" id="wcla_location_editable_cliprect-'+lcnt+'" class="wcla_textbox"  /></span>'
                    +'<span class="wcla_clear"></span>'
                    +'<span class="wcla_left wcla_clear wcla_pad0">&nbsp;</span>'
                    +'<span class="wcla_left wcla_clear wcla_pad0">'
                        +'<label for="wcla_location_editable_area_min_range_width-'+lcnt+'">Min Range Width:</label>'
                        +'<input type="text" class="wcla_textbox" id="wcla_location_editable_area_min_range_width-'+lcnt+'" name="wcla_location_editable_area_min_range_width['+lcnt+']">'
                        +'</span>'
                    +'<span class="wcla_left wcla_clear wcla_pad0">'
                        +'<label for="wcla_location_editable_area_max_range_width-'+lcnt+'">Max Range Width:</label>'
                        +'<input type="text" class="wcla_textbox" id="wcla_location_editable_area_max_range_width-'+lcnt+'" name="wcla_location_editable_area_max_range_width['+lcnt+']">'
                        +'</span>'
                    +'<span class="wcla_left wcla_clear wcla_pad0">'
                        +'<label for="wcla_location_editable_area_range_width_step-'+lcnt+'">Range Width Step:</label>'
                        +'<input type="text" class="wcla_textbox" id="wcla_location_editable_area_range_width_step-'+lcnt+'" name="wcla_location_editable_area_range_width_step['+lcnt+']">'
                        +'</span>'
                    +'<span class="wcla_left wcla_clear wcla_pad0">&nbsp;</span>'
                    +'<span class="wcla_left wcla_clear wcla_pad0">'
                        +'<label for="wcla_location_editable_area_min_range_height-'+lcnt+'">Min Range Height:</label>'
                        +'<input type="text" class="wcla_textbox" id="wcla_location_editable_area_min_range_height-'+lcnt+'" name="wcla_location_editable_area_min_range_height['+lcnt+']" >'
                        +'</span>'
                    +'<span class="wcla_left wcla_clear wcla_pad0">'
                        +'<label for="wcla_location_editable_area_max_range_height-'+lcnt+'">Max Range Height:</label>'
                        +'<input type="text" class="wcla_textbox" id="wcla_location_editable_area_max_range_height-'+lcnt+'" name="wcla_location_editable_area_max_range_height['+lcnt+']" >'
                        +'</span>'
                    +'<span class="wcla_left wcla_clear wcla_pad0">'
                        +'<label for="wcla_location_editable_area_range_height_step-'+lcnt+'">Range Height Step:</label>'
                        +'<input type="text" class="wcla_textbox" id="wcla_location_editable_area_range_height_step-'+lcnt+'" name="wcla_location_editable_area_range_height_step['+lcnt+']" >'
                        +'</span>'
                    +' <span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn"><button class="button button-primary wcla_printing_area" type="button" onclick="editArea('+lcnt+', '+lcnt+')">Edit ptinting area</button><div class="wcla_clear"></div></span>'
                    +'</div>'
                +'<div class="wcla_clear"></div><input type="hidden" value="'+lcnt+'" name="wcla_location[]"/></li>'
            );
            lcnt++;            

            });

            jQuery('#wcla_designer_tab_data div.wcla_product_properties').on('click','.wcla_add_sizes',function(){
            jQuery('#wcla_designer_tab_data #wcla_product_sizes ul.wcla_list_content').append(
            '<li class="wcla_list_content_row wcla_clear" id="size-'+scnt+'">'
                +'<span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn"><button class="button button-primary wcla_printing_area" type="button" onclick="delElement(\'size-' + scnt + '\')">Delete</button><div class="wcla_clear"></div></span>'
                +'<div class="wcla_left wcla_margin_right5">'
                    +'<span class="wcla_left wcla_clear "><label for="wcla_size['+scnt+']">Size:</label><input type="text" name="wcla_size['+scnt+']" id="wcla_size['+scnt+']" class="wcla_textbox"/></span>'                        
                    +'<span class="wcla_clear"></span>'
                    +'</div>'
                +'<div class="wcla_clear"></div><input type="hidden" value="'+scnt+'" name="wcla_sizes[]"/></li>'
            );
            scnt++;               

            });

            jQuery('#wcla_designer_tab_data div.wcla_product_properties').on('click','.wcla_add_col_elements_classes',function(){
        console.log('new button');
        jQuery('#wcla_designer_tab_data #wcla_product_colorizable_elements ul.wcla_list_content').append(
        '<li class="wcla_list_content_row wcla_clear" id="colorizable_element-'+colElementsCnt+'">'
             +'<table class="table-grid">'
                +'<thead>'
                    +'<tr>'
                        +'<td>'
                            +'Group Name<span class="required">*</span>'                            
                        +'</td>'    
                        +'<td>'
                           +'Group ID<span class="required">*</span>'                        
                        +'</td>'                                     
                        
                    +'</tr>'   
                +'</thead>'
                +'<tbody>'
                   +'<tr>'
                       +'<td id="wcla_colorizable_element_classes_'+colElementsCnt+'"><input type="text" name="wcla_colorizable_element['+colElementsCnt+'][name]" id="wcla_colorizable_element_name_'+colElementsCnt+'" class="wcla_textbox"/></td>'                
                       +'<td id="wcla_colorizable_element_classes_'+colElementsCnt+'"><input type="text" name="wcla_colorizable_element['+colElementsCnt+'][id]" id="wcla_colorizable_element_id_'+colElementsCnt+'" class="wcla_textbox"/></td>'                
                   +'</tr>'
                   +'<tr>'
                       +'<td colspan="2">'
                           +'<div id="wcla_colorizable_element_classes_'+colElementsCnt+'" class="wcla_product_colorizable_elements_properties wc-metabox postbox">'
                               +'<h3>Classes</h3>'
                                +'<div class="inside" >'
                                     +'<ul id="wcla_colorizable_element_classes_content_'+colElementsCnt+'">'

                                     +'</ul>'
                                +'</div>'
                                                                
                                +'<div class="wcla_clear"></div><input type="hidden" value="'+colElementsCnt+'" name="wcla_colorizable_elements[]"/>'
                           +'</div>'   
                           +'<div class="toolbar"><button class="button button-primary wcla_add_row_classes_button wcla_right" type="button" value="wcla_colorizable_element_classes_'+colElementsCnt+'">Add Class</button><div class="wcla_clear"></div></div>'    
                       +'</td>'
                   +'</tr>'    
                 +'</tbody>'    
            +'</table>'
            +'<span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn"><button class="button button-primary wcla_printing_area" type="button" onclick="delElement(\'colorizable_element-'+colElementsCnt+'\')">Delete</button><div class="wcla_clear"></div></span>'
            
            
            +'<div class="wcla_clear"></div><input type="hidden" value="'+ceclassescnt+'" name="wcla_colorizable_elements_classes[]"/></li>'
            );
            colElementsCnt++;   
            console.log(colElementsCnt);         

        });


        jQuery('#wcla_designer_tab_data div#wcla_product_colorizable_elements').on('click','.wcla_add_row_classes_button',function(){
            //console.log(jQuery(this).val());

            var idxStr=jQuery(this).val();
            var idArr=idxStr.split("_");            
            console.log(idArr);
            jQuery('#'+jQuery(this).val()+' ul#wcla_colorizable_element_classes_content_'+idArr[idArr.length-1]).append(
                                '<li class="wcla_list_content_row wcla_clear" id="wcla_colorizable_element_classes_content_'+idArr[idArr.length-1]+'_row_'+ceclassescnt+'">'
                                    +'<table class="table-grid">'
                                        +'<thead>'
                                            +'<tr>'
                                                +'<td>'
                                                    +'Name<span class="required">*</span>'
                                                +'</td>'    
                                                +'<td>'
                                                    +'Id<span class="required">*</span>'                            
                                                +'</td> '                           
                                            +'</tr>'   
                                        +'</thead>'
                                        +'<tbody>'
                                           +'<tr>'
                                               +'<td><input type="text" name="wcla_colorizable_element['+idArr[idArr.length-1]+'][classes]['+ceclassescnt+'][name]" id="wcla_colorizable_element_'+idArr[idArr.length-1]+'_classes_name_'+ceclassescnt+'" class="wcla_textbox"/></td>'
                                               +'<td><input type="text" name="wcla_colorizable_element['+idArr[idArr.length-1]+'][classes]['+ceclassescnt+'][id]" id="wcla_colorizable_element_'+idArr[idArr.length-1]+'classes_id_'+ceclassescnt+'" class="wcla_textbox"/></td>'
                                           +'</tr>' 
                                           +'<tr>'
                                               +'<td colspan="2">'
                                                   +'<div id="wcla_colorizable_element_'+idArr[idArr.length-1]+'_class_'+ceclassescnt+'_colors" class="wcla_product_class_colorizable_elements_properties wc-metabox postbox">'
                                                       +'<h3>Colors</h3>'
                                                       +'<div class="inside" >'
                                                           +'<table class="table-grid" style="margin:10px;">'
                                                                +'<thead>'
                                                                    +'<tr>'
                                                                        +'<td>'
                                                                            +'Name<span class="required">*</span>'
                                                                        +'</td>'    
                                                                        +'<td>'
                                                                            +'Value<span class="required">*</span>'                            
                                                                        +'</td>'  
                                                                        +'<td style="width:40px"></td>'                                                                     
                                                                    +'</tr>'   
                                                                +'</thead>'
                                                                +'<tbody id="colors_'+idArr[idArr.length-1]+'_'+ceclassescnt+'">'
                                                                +'</tbody>'    
                                                            +'</table>'    
                                                           +'<div class="toolbar"><button class="button button-primary wcla_add_class_row_color_button wcla_right" type="button" value="colors_'+idArr[idArr.length-1]+'_'+ceclassescnt+'">Add Color</button><div class="wcla_clear"></div></div>'
                                                       +'</div>'
                                                   +'</div>'    
                                               +'</td>'
                                           +'</tr>'
                                        +'</tbody>' 
                                    +'</table>' 
                                    +'<span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn"><button class="button button-primary wcla_printing_area" type="button" onclick="delElement(\'wcla_colorizable_element_classes_content_'+idArr[idArr.length-1]+'_row_'+ceclassescnt+'\')">Delete</button><div class="wcla_clear"></div></span>'
                                +'</li>'    
            );
            ceclassescnt++;
            console.log(ceclassescnt);
        });

        jQuery(document).on('click','.wcla_add_class_row_color_button',function(){
            var cnt=parseInt(jQuery("#"+jQuery(this).val()+" tr").length);
            cnt++;
            var idxStr=jQuery(this).val();
            var idArr=idxStr.split("_");            
            console.log(jQuery(this).val());
            console.log(idArr);
            jQuery("#"+jQuery(this).val()).append(
                '<tr id="wcla_colorizable_element_'+idArr[1]+'_classes'+idArr[2]+'_color_row_'+ceClassesColorCnt+'">'
                    +'<td>'
                      +'<input type="text" name="wcla_colorizable_element['+idArr[1]+'][classes]['+idArr[2]+'][values]['+ceClassesColorCnt+'][name]"  class="wcla_textbox"/>'  
                    +'</td>'
                    +'<td>'
                      +'<input type="text" name="wcla_colorizable_element['+idArr[1]+'][classes]['+idArr[2]+'][values]['+ceClassesColorCnt+'][value]"  class="wcla_textbox"/>'  
                    +'</td>'
                    +'<td>'
                      +'<button class="button button-primary wcla_printing_area" type="button" onclick="delElement(\'wcla_colorizable_element_'+idArr[1]+'_classes'+idArr[2]+'_color_row_'+ceClassesColorCnt+'\')">Delete</button><div class="wcla_clear">'  
                    +'</td>'
               +'</tr>'    
            );
            ceClassesColorCnt++;
        });    
        

        jQuery('#wcla_designer_tab_data div.wcla_product_properties').on('click','.wcla_add_col_elements',function(){
        jQuery('#wcla_designer_tab_data #wcla_product_colorizable_elements ul.wcla_list_content').append(
        '<li class="wcla_list_content_row wcla_clear" id="colorizable_element-'+cecnt+'">'            

            +'<table class="table-grid">'
                +'<thead>'
                    +'<tr>'
                        +'<td>'
                            +'Name<span class="required">*</span>'
                        +'</td>'    
                        +'<td>'
                            +'Id<span class="required">*</span>'                            
                        +'</td> '                           
                    +'</tr>'   
                +'</thead>'
                +'<tbody>'
                   +'<tr>'
                       +'<td><input type="text" name="wcla_colorizable_element['+cecnt+'][name]" id="wcla_colorizable_element_name_'+cecnt+'" class="wcla_textbox"/></td>'
                       +'<td><input type="text" name="wcla_colorizable_element['+cecnt+'][id]" id="wcla_colorizable_element_id_'+cecnt+'" class="wcla_textbox"/></td>'
                   +'</tr>' 
                   +'<tr>'
                       +'<td colspan="2">'
                           +'<div id="wcla_colorizable_element_colors_'+cecnt+'" class="wcla_product_colorizable_elements_properties wc-metabox postbox">'
                               +'<h3>Colors</h3>'
                               +'<div class="inside">'
                                   +'<table class="table-grid" style="margin:10px;">'
                                        +'<thead>'
                                            +'<tr>'
                                                +'<td>'
                                                    +'Name<span class="required">*</span>'
                                                +'</td>'    
                                                +'<td>'
                                                    +'Value<span class="required">*</span>'                            
                                                +'</td> '
                                                +'<td style="width:40px"></td>'
                                            +'</tr>'   
                                        +'</thead>'
                                        +'<tbody id="color_'+cecnt+'">'
                                        +'</tbody>'    
                                    +'</table>'    
                                   +'<div class="toolbar"><button class="button button-primary wcla_add_row_color_button wcla_right" type="button" value="wcla_colorizable_element_colors_'+cecnt+'">Add</button><div class="wcla_clear"></div></div>'
                               +'</div>'
                           +'</div>'    
                       +'</td>'
                   +'</tr>'
                +'</tbody>'    
            +'</table>'    
            +'<span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn"><button class="button button-primary wcla_printing_area" type="button" onclick="delElement(\'colorizable_element-'+cecnt+'\')">Delete</button><div class="wcla_clear"></div></span>'
          
            +'<div class="wcla_clear"></div><input type="hidden" value="'+cecnt+'" name="wcla_colorizable_elements[]"/></li>'
        );
        cecnt++;               

        });
        


        jQuery('#wcla_designer_tab_data div.wcla_product_properties  div.wcla_product_colorizable_elements_properties').on('click','.wcla_add_row_color_button',function(){
            var cnt=parseInt(jQuery("#"+jQuery(this).val()+" tbody tr").length);
            cnt++;
            var idxStr=jQuery("#"+jQuery(this).val()+" tbody").attr("id");
            var idArr=idxStr.split("_");            
            console.log(jQuery(this).val());
            jQuery("#"+jQuery(this).val()+" tbody").append(
                '<tr id="wcla_colorizable_element_'+idArr[1]+'_color_row_'+ceClassesColorCnt+'">'
                    +'<td>'
                      +'<input type="text" name="wcla_colorizable_element['+idArr[1]+'][colors]['+ceClassesColorCnt+'][name]"  class="wcla_textbox"/>'  
                    +'</td>'
                    +'<td>'
                      +'<input type="text" name="wcla_colorizable_element['+idArr[1]+'][colors]['+ceClassesColorCnt+'][value]"  class="wcla_textbox"/>'  
                    +'</td>'
                    +'<td>'
                      +'<button class="button button-primary wcla_printing_area" type="button" onclick="delElement(\'wcla_colorizable_element_'+idArr[1]+'_color_row_'+ceClassesColorCnt+'\')">Delete</button><div class="wcla_clear">'  
                    +'</td>'
               +'</tr>'    
            );
            ceClassesColorCnt++;
            
        });


            jQuery('#wcla_designer_tab_data div.wcla_product_properties').on('click','.wcla_add_editable_colors',function(){                                                   
            jQuery("#"+jQuery(this).val()+" tbody").append(
            '<tr id="wcla_editable_area_sizes_'+secnt+'">'
                +'<td>'
                    +'<input type="text" name="wcla_editable_area_size['+secnt+'][label]"  class="wcla_textbox"/>'  
                    +'</td>'
                +'<td>'
                    +'<input type="text" name="wcla_editable_area_size['+secnt+'][width]"  class="wcla_textbox"/>'  
                    +'</td>'
                +'<td>'
                    +'<input type="text" name="wcla_editable_area_size['+secnt+'][height]"  class="wcla_textbox"/>'  
                    +'</td>'
                +'<td>'
                    +'<button class="button button-primary wcla_printing_area" type="button" onclick="delElement(\'wcla_editable_area_sizes_' + secnt + '\')">Delete</button><div class="wcla_clear">'  
                        +'</td>'
                +'</tr>'    
            );  
            secnt++;
            });     

            });

            <?php
            $javascript = ob_get_clean();
            wc_enqueue_js($javascript);
            ?>
        </div>

        <?php
    }

    public function wcla_product_data_tab($post_id) {

        global $woocommerce;
        update_post_meta($post_id, 'wcla_thumb', isset($_POST["wcla_thumb"]) ? $_POST["wcla_thumb"] : 0);
        //  update_post_meta($post_id, 'wcla_image', isset($_POST["wcla_image"]) ? $_POST["wcla_image"] : 0);


        update_post_meta($post_id, 'wcla_able_for_design', isset($_POST["wcla_able_for_design"]) ? $_POST["wcla_able_for_design"] : 'no');
        update_post_meta($post_id, 'wcla_product_resizeable', isset($_POST["wcla_product_resizeable"]) ? $_POST["wcla_product_resizeable"] : 'no');
        update_post_meta($post_id, 'wcla_product_show_ruler', isset($_POST["wcla_product_show_ruler"]) ? $_POST["wcla_product_show_ruler"] : 'no');
        update_post_meta($post_id, 'wcla_hide_editable_area_border', isset($_POST["wcla_hide_editable_area_border"]) ? $_POST["wcla_hide_editable_area_border"] : 'no');
        update_post_meta($post_id, 'wcla_name_numbers', isset($_POST["wcla_name_numbers"]) ? $_POST["wcla_name_numbers"] : 'no');


        $locations = array();
        if (isset($_POST["wcla_location"])) {

            foreach ($_POST["wcla_location"] as $key => $val) {
                $locations[] = array(
                    "name" => isset($_POST["wcla_location_name"][$val]) ? $_POST["wcla_location_name"][$val] : '',
                    "image" => isset($_POST["wcla_location_thumb"][$val]) ? $_POST["wcla_location_thumb"][$val] : 0,
                    "mask" => isset($_POST["wcla_location_mask"][$val]) ? $_POST["wcla_location_mask"][$val] : 0,
                    "editable_area" => isset($_POST["wcla_location_editable_area"][$val]) ? $_POST["wcla_location_editable_area"][$val] : '',
//                    "editable_area_units" => isset($_POST["wcla_location_editable_area_units"][$val]) ? $_POST["wcla_location_editable_area_units"][$val] : '',
                    "editable_area_width" => isset($_POST["wcla_location_editable_area_width"][$val]) ? $_POST["wcla_location_editable_area_width"][$val] : '',
                    "editable_area_height" => isset($_POST["wcla_location_editable_area_height"][$val]) ? $_POST["wcla_location_editable_area_height"][$val] : '',
                    "editable_area_min_range_width" => isset($_POST["wcla_location_editable_area_min_range_width"][$val]) ? $_POST["wcla_location_editable_area_min_range_width"][$val] : '',
                    "editable_area_max_range_width" => isset($_POST["wcla_location_editable_area_max_range_width"][$val]) ? $_POST["wcla_location_editable_area_max_range_width"][$val] : '',
                    "editable_area_range_width_step" => isset($_POST["wcla_location_editable_area_range_width_step"][$val]) ? $_POST["wcla_location_editable_area_range_width_step"][$val] : 1,
                    "editable_area_min_range_height" => isset($_POST["wcla_location_editable_area_min_range_height"][$val]) ? $_POST["wcla_location_editable_area_min_range_height"][$val] : '',
                    "editable_area_max_range_height" => isset($_POST["wcla_location_editable_area_max_range_height"][$val]) ? $_POST["wcla_location_editable_area_max_range_height"][$val] : '',
                    "editable_area_range_height_step" => isset($_POST["wcla_location_editable_area_range_height_step"][$val]) ? $_POST["wcla_location_editable_area_range_height_step"][$val] : 1,
                    "editable_area_cliprect" => isset($_POST["wcla_location_editable_cliprect"][$val]) ? $_POST["wcla_location_editable_cliprect"][$val] : '',
                );
            }
        }


        update_post_meta($post_id, 'wcla_locations', $locations);

        $product_colors = array();
        if (isset($_POST["wcla_property"])) {

            foreach ($_POST["wcla_property"] as $key => $val) {
                $color_locations = isset($_POST["wcla_property_location_thumb"][$val]) ? $_POST["wcla_property_location_thumb"][$val] : array();

                $clocations = array();
                foreach ($color_locations as $k => $value) {
                    $clocations[] = array("name" => $k, "image" => $value);
                }

                $product_colors[] = array('color_name' => isset($_POST["wcla_color_name"][$val]) ? $_POST["wcla_color_name"][$val] : '',
                    'color_value' => isset($_POST["wcla_color_value"][$val]) ? $_POST["wcla_color_value"][$val] : '',
                    'location' => $clocations
                );
            }
        }
        update_post_meta($post_id, 'wcla_product_colors', $product_colors);

        $product_sizes = array();
        if (isset($_POST["wcla_sizes"])) {

            foreach ($_POST["wcla_sizes"] as $key => $val) {
                $product_sizes[] = isset($_POST["wcla_size"][$val]) ? $_POST["wcla_size"][$val] : '';
            }
        }

        update_post_meta($post_id, 'wcla_product_sizes', $product_sizes);

        $colorizable_elements = array();
        if (isset($_POST["wcla_colorizable_elements"])) {
            foreach ($_POST["wcla_colorizable_elements"] as $key => $val) {
                $colorizable_elements[] = isset($_POST["wcla_colorizable_element"][$val]) ? $_POST["wcla_colorizable_element"][$val] : array();
            }
        }
        // var_dump($_POST["wcla_colorizable_elements"],$_POST["wcla_colorizable_element"],$colorizable_elements);die();
        update_post_meta($post_id, 'wcla_product_colorizable_elements', $colorizable_elements);

        $editable_area_sizes = array();

        if (isset($_POST["wcla_editable_area_size"])) {
            foreach ($_POST["wcla_editable_area_size"] as $key => $val) {
                $editable_area_sizes[] = isset($_POST["wcla_editable_area_size"][$key]) ? $_POST["wcla_editable_area_size"][$key] : array();
            }
        }
        update_post_meta($post_id, 'wcla_editable_area_sizes', $editable_area_sizes);
    }

    public function wcla_edit_order_columns($columns) {

        $newcolumns = array();
        foreach ($columns as $k => $column) {
            $newcolumns[$k] = $column;
            if ($k == "note") {
                $newcolumns["wcla_design"] = '<img src="' . DESIGNER_URL . '/styles/images/design.png" alt="' . __('Custom Design', 'wcla') . '" class="tips" data-tip="' . __('Custom design', 'wcla') . '" width="12" height="12" />';
            }
        }

        return $newcolumns;
    }

    public function wcla_custom_order_columns($column, $post_id) {
        global $post, $woocommerce, $the_order;

        if (empty($the_order) || $the_order->id != $post->ID)
            $the_order = new WC_Order($post->ID);

        switch ($column) {
            case 'wcla_design':
                $design = false;
                foreach ($the_order->get_items() as $k => $item) {
                    if ($item["wcla_design_id"])
                        $design = true;
                }
                if ($design)
                    echo '<img src="' . DESIGNER_URL . '/styles/images/color-yes.png" alt="yes" class="tips" data-tip="' . __('Yes', 'wcla') . '" width="14" height="14" />';
                else
                    echo '<img src="' . DESIGNER_URL . '/styles/images/color.png" alt="no" class="tips" data-tip="' . __('No', 'wcla') . '" width="14" height="14" />';
                break;
        }
    }

    public function wcla_hidden_order_itemmeta($meta) {
        $meta[] = 'wcla_design_id';
        return $meta;
    }

    public function wcla_post_image_html($html, $post_id, $post_image_id) {
        $html = '<a href="' . get_permalink($post_id) . '" title="' . esc_attr(get_post_field('post_title', $post_id)) . '">' . $html . '</a>';
        return $html;
    }

    public function wcla_woocommerce_order_meta_boxes() {
        //remove_meta_box('woocommerce-order-items', 'shop_order','normal');
        add_meta_box('woocommerce-order-items', __('Order Items', 'woocommerce') . ' <span class="tips" data-tip="' . __('Note: if you edit quantities or remove items from the order you will need to manually update stock levels.', 'woocommerce') . '">[?]</span>', array($this, 'wcla_woocommerce_order_items_meta_box'), 'shop_order', 'normal', 'high');
    }

    /**
     * Order items meta box.
     *
     * Displays the order items meta box - for showing individual items in the order.
     */
    public function wcla_woocommerce_order_items_meta_box($post) {
        global $wpdb, $thepostid, $theorder, $woocommerce;

        if (!is_object($theorder))
            $theorder = new WC_Order($thepostid);

        $order = $theorder;

        $data = get_post_meta($post->ID);
        ?>
        <div class="woocommerce_order_items_wrapper">
            <table cellpadding="0" cellspacing="0" class="woocommerce_order_items">
                <thead>
                    <tr>
                        <th><input type="checkbox" class="check-column" /></th>
                        <th class="item" colspan="2"><?php _e('Item', 'woocommerce'); ?></th>

                        <?php do_action('woocommerce_admin_order_item_headers'); ?>

                        <?php if (get_option('woocommerce_calc_taxes') == 'yes') : ?>
                            <th class="tax_class"><?php _e('Tax Class', 'woocommerce'); ?>&nbsp;<a class="tips" data-tip="<?php _e('Tax class for the line item', 'woocommerce'); ?>." href="#">[?]</a></th>
                        <?php endif; ?>

                        <th class="quantity"><?php _e('Qty', 'woocommerce'); ?></th>

                        <th class="line_cost"><?php _e('Totals', 'woocommerce'); ?>&nbsp;<a class="tips" data-tip="<?php _e('Line subtotals are before pre-tax discounts, totals are after.', 'woocommerce'); ?>" href="#">[?]</a></th>

                        <?php if (get_option('woocommerce_calc_taxes') == 'yes') : ?>
                            <th class="line_tax"><?php _e('Tax', 'woocommerce'); ?></th>
                        <?php endif; ?>
                    </tr>
                </thead>
                <tbody id="order_items_list">

                    <?php
                    // List order items
                    $order_items = $order->get_items(apply_filters('woocommerce_admin_order_item_types', array('line_item', 'fee')));

                    foreach ($order_items as $item_id => $item) {

                        switch ($item['type']) {
                            case 'line_item' :
                                $_product = $order->get_product_from_item($item);
                                $item_meta = $order->get_item_meta($item_id);
                                include( DESIGNER_DIR . 'woocommerce/admin/post-types/writepanels/order-item-html.php' );
                                break;
                            case 'fee' :

                                include( PLUGINDIR . '/' . plugin_basename('woocommerce') . '/admin/post-types/writepanels/order-fee-html.php' );
                                break;
                        }

                        do_action('woocommerce_order_item_' . $item['type'] . '_html');
                    }
                    ?>
                </tbody>
            </table>
        </div>

        <p class="bulk_actions">
            <select>
                <option value=""><?php _e('Actions', 'woocommerce'); ?></option>
                <optgroup label="<?php _e('Edit', 'woocommerce'); ?>">
                    <option value="delete"><?php _e('Delete Lines', 'woocommerce'); ?></option>
                </optgroup>
                <optgroup label="<?php _e('Stock Actions', 'woocommerce'); ?>">
                    <option value="reduce_stock"><?php _e('Reduce Line Stock', 'woocommerce'); ?></option>
                    <option value="increase_stock"><?php _e('Increase Line Stock', 'woocommerce'); ?></option>
                </optgroup>
            </select>

            <button type="button" class="button do_bulk_action wc-reload" title="<?php _e('Apply', 'woocommerce'); ?>"><span><?php _e('Apply', 'woocommerce'); ?></span></button>
        </p>

        <p class="add_items">
            <select id="add_item_id" class="ajax_chosen_select_products_and_variations" multiple="multiple" data-placeholder="<?php _e('Search for a product&hellip;', 'woocommerce'); ?>" style="width: 400px"></select>

            <button type="button" class="button add_order_item"><?php _e('Add item(s)', 'woocommerce'); ?></button>
            <button type="button" class="button add_order_fee"><?php _e('Add fee', 'woocommerce'); ?></button>
        </p>
        <div class="clear"></div>
        <?php
    }

}
