<?php
/**
 * @category   Peexl
 * @package    Peexl
 * @copyright  Copyright (c) 2014 Peexl Web Development (http://www.peexl.com)
 * @license    http://framework.zend.com/license/new-bsd    New BSD License
 * @version    1.0
 */

class WCLA_LAGraphics_Post_Type {

    public function __construct() {
        // load_plugin_textdomain('mma', false, basename(dirname(__FILE__)) . '/languages');
        $this->register_post_type();
        $this->taxonomies();
        $this->setActionFilters();
        $this->removeUnwantedMetaboxes();
        $this->metaboxes();
    }

    protected function setActionFilters() {

        add_filter('manage_wcla_graphics_posts_columns', array($this, 'wcla_columns_head_gallery'), 10);
        add_action('manage_wcla_graphics_posts_custom_column', array($this, 'wcla_columns_content_gallery'), 10, 2);
    }

    public function register_post_type() {
        $args = array(
            'labels' => array(
                'name' => __('Graphics', 'liveart'),
                'singular_name' => __('Graphic', 'liveart'),
                'add_new_item' => __('Add new Image', 'liveart'),
                'add_new' => __('Add new Image', 'liveart'),
                'edit_item' => __('Edit Item', 'liveart'),
                'view_item' => __('View item', 'liveart'),
                'not_found' => __('No Images Found', 'liveart'),
                'not_found_in_trash' => __('No Images found in trash', 'liveart')
            ),
            'query_var' => 'wcla_graphics',
            'rewrite' => array(
                'slug' => 'wcla_graphics',
            ),
            'public' => true,
            'menu_position' => 49,
            'supports' => array(
                'title',
            //'thumbnail',
            //'editor',
            //'custom-fields'		
            ),
            //  'taxonomies'    => array('lagraphics_categories'),
            'show_in_nav_menus' => false,
            'show_in_menu' => false
        );
        register_post_type('wcla_graphics', $args);
    }

    public function metaboxes() {
        add_action('add_meta_boxes', function() {
            //css id,title,callback func,page,priority, callback func arguments  
            add_meta_box('wcla_graphics_details', __('Graphic Details', 'liveart'), 'wcla_graphics_details_cb', 'wcla_graphics');
            add_meta_box('wcla_graphics_colorizable_elements', __('Colorizable Elements', 'liveart'), 'wcla_graphics_colorizable_elements', 'wcla_graphics');
        });

        function wcla_graphics_details_cb($post) {
            ?>
            <p>     
                <?php if (get_post_meta($post->ID, 'wcla_graphics_file_url', true) != ''): ?>
                    <a href="<?php echo get_post_meta($post->ID, 'wcla_graphics_file_url', true) ?>" style="float:left"><img src="<?php echo get_post_meta($post->ID, 'wcla_graphics_file_url', true) ?>" height="40" width="40"></a>
                <?php endif; ?>                             
                <label for="wcla_graphics_image_file"><?php echo __('Image', 'liveart') ?>:</label>
                <input type="file" id="wcla_graphics_image_file" name="wcla_graphics_image_file" value="" accept="image/*" />
            </p>
            <div style="clear:both"></div>
            <p>
                <?php if (get_post_meta($post->ID, 'wcla_graphics_thumb_file_url', true) != ''): ?>
                    <a href="<?php echo get_post_meta($post->ID, 'wcla_graphics_thumb_file_url', true) ?>" style="float:left"><img src="<?php echo get_post_meta($post->ID, 'wcla_graphics_thumb_file_url', true) ?>" height="40" width="40"></a>
                <?php endif; ?> 
                <label for="wcla_graphics_image_thumb_file"><?php echo __('Thumbnail', 'liveart') ?>:</label>
                <input type="file" id="wcla_graphics_image_thumb_file" name="wcla_graphics_image_thumb_file" value="" accept="image/*"/>                
            </p>
            <p>
                <label for="category_id"><?php echo __('Category', 'liveart') ?>:</label>
                <?php echo WCLA_LAGraphics_Post_Type::getTaxonomyCombo('lagraphics_categories', 'category_id', get_post_meta($post->ID, 'wcla_graphics_category_id', true) == '' ? 0 : get_post_meta($post->ID, 'wcla_graphics_category_id', true)); ?>
            </p>
            <div class="note wide50pct" ><?php echo __('Graphic category', 'liveart') ?>.</div>
            <p>
                <label for="wcla_graphics_desc"><?php echo __('Description', 'liveart') ?>:</label>
                <textarea type="text" id="wcla_graphics_desc" name="wcla_graphics_desc"  class="wide50pct" ><?php echo get_post_meta($post->ID, 'wcla_graphics_desc', true) ?></textarea>
            </p>
            <p>
                <label for="wcla_graphics_price"><?php echo __('Price', 'liveart') ?>:</label>
                <input type="text" id="wcla_graphics_price" name="wcla_graphics_price" value="<?php echo get_post_meta($post->ID, 'wcla_graphics_price', true) ?>"  class="wide50pct"/>
            </p>
            <div class="note wide50pct" ><?php echo __('Extra price', 'liveart') ?></div>
            <p>
                <?php echo WCLA_Utilities::selectYesNo('wcla_graphics_colorizable', 'Colorizable', get_post_meta($post->ID, 'wcla_graphics_colorizable', true)) ?>
            </p>
            <p>
                <label for="wcla_graphics_colors"><?php echo __('Colors', 'liveart') ?>:</label>
                <input type="text" id="wcla_graphics_colors" name="wcla_graphics_colors" value="<?php echo get_post_meta($post->ID, 'wcla_graphics_colors', true) ?>"  class="wide50pct" />
            </p>

            <div class="note wide50pct" >
                <ul>
                    <li> <code class="prettyprint">"-1"</code> — <?php echo __('process colors are required, e.g. if the graphic is photo', 'liveart') ?>; </li>
                    <li> <code class="prettyprint">"0"</code> — default value (need graphic to be <code class="prettyprint">Colorizable = Yes</code> and get colors information from selected fill color/outline/multicolor layers); </li>
                    <li> <?php echo __('integer (e.g. <code class="prettyprint">"5"</code>) — number of unique graphic colors', 'liveart') ?>;</li>
                    <li> <?php echo __('array of hex web colors (e.g. <code class="prettyprint">["#FFFFFF", "#000000"]</code>) — list of colors for accurate counting', 'liveart') ?></li>
                </ul>
            </div>
            <?php wp_nonce_field(plugin_basename(__FILE__), 'graphic_file_nonce'); ?>
            <?php
        }

        function wcla_graphics_colorizable_elements($post) {
            $colorizable_elements = maybe_unserialize(get_post_meta($post->ID, 'wcla_graphic_colorizable_elements', true));
            ?>


            <div class="wcla_content">           
                <ul class="wcla_list_content">
                    <?php if (is_array($colorizable_elements) && count($colorizable_elements) > 0): ?>                
                        <?php foreach ($colorizable_elements as $k => $colorizable_element): ?>
                            <li class="wcla_list_content_row wcla_clear" id="colorizable_element-<?php echo $k ?>">
                                <table class="table-grid">
                                    <thead>
                                        <tr>
                                            <td>Name<span class="required">*</span></td>
                                            <td>Id<span class="required">*</span></td>
                                        </tr>   
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="text" name="wcla_colorizable_element[<?php echo $k ?>][name]" id="wcla_colorizable_element_name_<?php echo $k ?>" class="wcla_textbox" value="<?php echo $colorizable_element["name"] ?>"/></td>
                                            <td><input type="text" name="wcla_colorizable_element[<?php echo $k ?>][id]" id="wcla_colorizable_element_id_<?php echo $k ?>" class="wcla_textbox" value="<?php echo $colorizable_element["id"] ?>" /></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <div id="wcla_colorizable_element_colors_<?php echo $k ?>" class="wcla_product_properties wc-metabox postbox">
                                                    <h3>Colors</h3>
                                                    <div class="inside">
                                                        <table class="table-grid" style="margin:10px;">
                                                            <thead>
                                                                <tr>
                                                                    <td>Name<span class="required">*</span></td>
                                                                    <td>Value<span class="required">*</span></td>
                                                                    <td style="width:40px"></td>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="color_<?php echo $k ?>">
                                                                <?php if (isset($colorizable_element["colors"]) && $colorizable_element["colors"] > 0): ?>
                                                                    <?php foreach ($colorizable_element["colors"] as $key => $color): ?>
                                                                        <tr id="wcla_colorizable_element_<?php echo $k ?>_color_row_<?php echo $key ?>">
                                                                            <td>
                                                                                <input type="text" name="wcla_colorizable_element[<?php echo $k ?>][colors][<?php echo $key ?>][name]"  class="wcla_textbox" value="<?php echo $color["name"] ?>"/>
                                                                            </td>
                                                                            <td>
                                                                                <input type="text" name="wcla_colorizable_element[<?php echo $k ?>][colors][<?php echo $key ?>][value]"  class="wcla_textbox" value="<?php echo $color["value"] ?>"/>
                                                                            </td>
                                                                            <td>
                                                                                <button class="button button-primary wcla_printing_area" type="button" onclick="delElement('wcla_colorizable_element_<?php echo $k ?>_color_row_<?php echo $key ?>')">Delete</button><div class="wcla_clear"> 
                                                                            </td>
                                                                        </tr>
                                                                    <?php endforeach; ?>
                                                                <?php endif; ?>
                                                            </tbody>   
                                                        </table>
                                                        <div class="toolbar"><button class="button button-primary wcla_add_row_color_button wcla_right" type="button" value="wcla_colorizable_element_colors_<?php echo $k ?>">Add</button><div class="wcla_clear"></div></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> 
                                <span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn"><button class="button button-primary wcla_printing_area" type="button" onclick="delElement('colorizable_element-<?php echo $k ?>')">Delete</button><div class="wcla_clear"></div></span>

                                <div class="wcla_clear"></div><input type="hidden" value="<?php echo $k ?>" name="wcla_colorizable_elements[]"/>
                            </li>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </ul>
                <div class="wcla_clear"></div>
            </div>
            <div class="wcla_clear"></div>
            <div class="toolbar">
                <button class="button button-primary wcla_add_col_elements wcla_right" type="button">Add</button>
                <div class="wcla_clear"></div>
            </div>


            <?php
            /**
             * Graphic Type Javascript
             */
            ob_start();
            ?>
            <script type="text/javascript">
                var cecnt =<?php echo count($colorizable_elements); ?>;
                jQuery(function () {
                    jQuery('#wcla_graphics_colorizable_elements').on('click', '.wcla_add_col_elements', function () {
                        jQuery('#wcla_graphics_colorizable_elements ul.wcla_list_content').append(
                                '<li class="wcla_list_content_row wcla_clear" id="colorizable_element-' + cecnt + '">'
                                + '<table class="table-grid">'
                                + '<thead>'
                                + '<tr>'
                                + '<td>'
                                + 'Name<span class="required">*</span>'
                                + '</td>'
                                + '<td>'
                                + 'Id<span class="required">*</span>'
                                + '</td> '
                                + '</tr>'
                                + '</thead>'
                                + '<tbody>'
                                + '<tr>'
                                + '<td><input type="text" name="wcla_colorizable_element[' + cecnt + '][name]" id="wcla_colorizable_element_name_' + cecnt + '" class="wcla_textbox"/></td>'
                                + '<td><input type="text" name="wcla_colorizable_element[' + cecnt + '][id]" id="wcla_colorizable_element_id_' + cecnt + '" class="wcla_textbox"/></td>'
                                + '</tr>'
                                + '<tr>'
                                + '<td colspan="2">'
                                + '<div id="wcla_colorizable_element_colors_' + cecnt + '" class="wcla_product_properties wc-metabox postbox">'
                                + '<h3>Colors</h3>'
                                + '<div class="inside">'
                                + '<table class="table-grid" style="margin:10px;">'
                                + '<thead>'
                                + '<tr>'
                                + '<td>'
                                + 'Name<span class="required">*</span>'
                                + '</td>'
                                + '<td>'
                                + 'Value<span class="required">*</span>'
                                + '</td> '
                                + '<td style="width:40px"></td>'
                                + '</tr>'
                                + '</thead>'
                                + '<tbody id="color_' + cecnt + '">'
                                + '</tbody>'
                                + '</table>'
                                + '<div class="toolbar"><button class="button button-primary wcla_add_row_color_button wcla_right" type="button" value="wcla_colorizable_element_colors_' + cecnt + '">Add</button><div class="wcla_clear"></div></div>'
                                + '</div>'
                                + '</div>'
                                + '</td>'
                                + '</tr>'
                                + '</tbody>'
                                + '</table>'
                                + '<span class="wcla_left wcla_clear wcla_pad0 wcla_print_area_btn wcla_remove_btn"><button class="button button-primary wcla_printing_area" type="button" onclick="delElement(\'colorizable_element-' + cecnt + '\')">Delete</button><div class="wcla_clear"></div></span>'

                                + '<div class="wcla_clear"></div><input type="hidden" value="' + cecnt + '" name="wcla_colorizable_elements[]"/></li>'
                                );
                        cecnt++;

                    });

                    jQuery('#wcla_graphics_colorizable_elements').on('click', '.wcla_add_row_color_button', function () {
                        var cnt = parseInt(jQuery("#" + jQuery(this).val() + " tbody tr").length);
                        cnt++;
                        var idxStr = jQuery("#" + jQuery(this).val() + " tbody").attr("id");
                        var idArr = idxStr.split("_");

                        jQuery("#" + jQuery(this).val() + " tbody").append(
                                '<tr id="wcla_colorizable_element_' + idArr[1] + '_color_row_' + cnt + '">'
                                + '<td>'
                                + '<input type="text" name="wcla_colorizable_element[' + idArr[1] + '][colors][' + cnt + '][name]"  class="wcla_textbox"/>'
                                + '</td>'
                                + '<td>'
                                + '<input type="text" name="wcla_colorizable_element[' + idArr[1] + '][colors][' + cnt + '][value]"  class="wcla_textbox"/>'
                                + '</td>'
                                + '<td>'
                                + '<button class="button button-primary wcla_printing_area" type="button" onclick="delElement(\'wcla_colorizable_element_' + idArr[1] + '_color_row_' + cnt + '\')">Delete</button><div class="wcla_clear">'
                                + '</td>'
                                + '</tr>'
                                );

                    });
                });
            </script>    
            <?php
            $javascript = ob_get_clean();
            // $woocommerce->add_inline_js($javascript);
            echo $javascript;
            ?>

            <?php
        }

        add_action('save_post', function($post_id) {
            if ($_POST /* && wp_verify_nonce($_POST["mma_nonce"], __FILE__) */) {

                update_post_meta($post_id, 'wcla_graphics_category_id', $_POST["category_id"]);
                update_post_meta($post_id, 'wcla_graphics_price', $_POST["wcla_graphics_price"]);
                update_post_meta($post_id, 'wcla_graphics_desc', $_POST["wcla_graphics_desc"]);
                update_post_meta($post_id, 'wcla_graphics_colorizable', $_POST["wcla_graphics_colorizable"]);
                update_post_meta($post_id, 'wcla_graphics_colors', $_POST["wcla_graphics_colors"]);



                if (user_can_save($post_id, plugin_basename(__FILE__), 'graphic_file_nonce')) {

                    if (has_files_to_upload('wcla_graphics_image_file')) {


                        if (isset($_FILES['wcla_graphics_image_file'])) {
                            $file = wp_upload_bits($_FILES['wcla_graphics_image_file']['name'], null, @file_get_contents($_FILES['wcla_graphics_image_file']['tmp_name']));

                            if (FALSE === $file['error']) {

                                update_post_meta($post_id, 'wcla_graphics_file', pathinfo($file["file"], PATHINFO_FILENAME) . '.' . pathinfo($file["file"], PATHINFO_EXTENSION));
                            }
                        }

                        if (isset($_FILES['wcla_graphics_image_thumb_file'])) {
                            $file = array();
                            $file = wp_upload_bits('thumb_' . $_FILES['wcla_graphics_image_thumb_file']['name'], null, @file_get_contents($_FILES['wcla_graphics_image_thumb_file']['tmp_name']));
                            
                            if (FALSE === $file['error']) {
                                update_post_meta($post_id, 'wcla_graphics_thumb_file', pathinfo($file["file"], PATHINFO_FILENAME) . '.' . pathinfo($file["file"], PATHINFO_EXTENSION));
                            }
                        }
                    }
                }


                $colorizable_elements = array();
                if (isset($_POST["wcla_colorizable_elements"])) {
                    foreach ($_POST["wcla_colorizable_elements"] as $key => $val) {
                        $colorizable_elements[] = isset($_POST["wcla_colorizable_element"][$val]) ? $_POST["wcla_colorizable_element"][$val] : array();
                    }
                }
                // var_dump($_POST["wcla_colorizable_elements"],$_POST["wcla_colorizable_element"],$colorizable_elements);die();
                update_post_meta($post_id, 'wcla_graphic_colorizable_elements', $colorizable_elements);
            }
        });
    }

    public function taxonomies() {
        $taxonomies = array();
        $taxonomies["lagraphics_categories"] = array(
            'hierarchical' => true,
            'show_ui' => false,
            'query_var' => 'lagraphics_categories',
            //'rewrite' => 'gyms/countries',
            'labels' => array(
                'name' => __('Graphics Categories', 'liveart'),
                'singular_name' => __('Graphic Categories', 'liveart'),
                'add_new_item' => __('Add new Category', 'liveart'),
                'add_new' => __('Add new Category', 'liveart'),
                'edit_item' => __('Edit Item', 'liveart'),
                'all_items' => __('All Categories', 'liveart'),
                'search_items' => __('Search Categories', 'liveart'),
                'pupular_items' => __('Popular Categories', 'liveart'),
                'add_or_remove_items' => __('Add or remove category', 'liveart')
            )
        );


        $this->register_all_taxonomies($taxonomies);

        //add_action( 'create_term', array( $this, 'create_term' ), 5, 3 );      
    }

    function wcla_taxonomy_add_new_meta_field() {
        // this will add the custom meta field to the add new term page
        ?>
        <div class="form-field">
            <label><?php echo __('Thumbnail', 'liveart'); ?></label>
            <div id="wcla_graphics_category_thumbnail" style="float:left;margin-right:10px;"><img src="<?php echo wc_placeholder_img_src(); ?>" width="60px" height="60px" /></div>
            <div style="line-height:60px;">
                <input type="hidden" id="wcla_graphics_category_thumbnail_id" name="term_meta[thumbnail_id]" />
                <button type="button" class="upload_image_button button"><?php echo __('Upload/Add image', 'liveart'); ?></button>
                <button type="button" class="remove_image_button button"><?php echo __('Remove image', 'liveart'); ?></button>
            </div>
            <script type="text/javascript">

                // Only show the "remove image" button when needed
                if (!jQuery('#wcla_graphics_category_thumbnail_id').val()) {
                    jQuery('.remove_image_button').hide();
                }

                // Uploading files
                var file_frame;

                jQuery(document).on('click', '.upload_image_button', function (event) {

                    event.preventDefault();

                    // If the media frame already exists, reopen it.
                    if (file_frame) {
                        file_frame.open();
                        return;
                    }

                    // Create the media frame.
                    file_frame = wp.media.frames.downloadable_file = wp.media({
                        title: '<?php echo __('Choose an image', 'liveart'); ?>',
                        button: {
                            text: '<?php echo __('Use image', 'liveart'); ?>',
                        },
                        multiple: false
                    });

                    // When an image is selected, run a callback.
                    file_frame.on('select', function () {
                        attachment = file_frame.state().get('selection').first().toJSON();

                        jQuery('#wcla_graphics_category_thumbnail_id').val(attachment.id);
                        if (attachment.sizes) {
                            if (attachment.sizes.thumbnail)
                                jQuery('#wcla_graphics_category_thumbnail img').attr('src', attachment.sizes.thumbnail.url);
                            else
                                jQuery('#wcla_graphics_category_thumbnail img').attr('src', attachment.sizes.full.url);
                        }
                        else {
                            jQuery('#wcla_graphics_category_thumbnail img').attr('src', attachment.url);
                        }
                        jQuery('.remove_image_button').show();
                    });

                    // Finally, open the modal.
                    file_frame.open();
                });

                jQuery(document).on('click', '.remove_image_button', function (event) {
                    jQuery('#wcla_graphics_category_thumbnail img').attr('src', '<?php echo wc_placeholder_img_src(); ?>');
                    jQuery('#wcla_graphics_category_thumbnail_id').val('');
                    jQuery('.remove_image_button').hide();
                    return false;
                });

            </script>
            <div class="clear"></div>
        </div>

        <?php
    }

    function wcla_taxonomy_edit_meta_field($term) {


        // put the term ID into a variable
        $term_id = $term->term_id;

        // retrieve the existing value(s) for this meta field. This returns an array
        $term_meta = get_option("taxonomy_$term_id");
        $thumbnail_id = absint($term_meta["thumbnail_id"]);

        if ($thumbnail_id) {
            $image = wp_get_attachment_thumb_url($thumbnail_id);
        } else {
            $image = wc_placeholder_img_src();
        }
        ?>        	
        <tr class="form-field">
            <th scope="row" valign="top"><label><?php echo __('Thumbnail', 'liveart'); ?></label></th>
            <td>
                <div id="wcla_graphics_category_thumbnail" style="float:left;margin-right:10px;"><img src="<?php echo $image; ?>" width="60px" height="60px" /></div>
                <div style="line-height:60px;">
                    <input type="hidden" id="wcla_graphics_category_thumbnail_id" name="term_meta[thumbnail_id]" value="<?php echo $thumbnail_id; ?>" />
                    <button type="submit" class="upload_image_button button"><?php echo __('Upload/Add image', 'liveart'); ?></button>
                    <button type="submit" class="remove_image_button button"><?php echo __('Remove image', 'liveart'); ?></button>
                </div>
                <script type="text/javascript">

                    // Uploading files
                    var file_frame;

                    jQuery(document).on('click', '.upload_image_button', function (event) {

                        event.preventDefault();

                        // If the media frame already exists, reopen it.
                        if (file_frame) {
                            file_frame.open();
                            return;
                        }

                        // Create the media frame.
                        file_frame = wp.media.frames.downloadable_file = wp.media({
                            title: '<?php echo __('Choose an image', 'liveart'); ?>',
                            button: {
                                text: '<?php echo __('Use image', 'liveart'); ?>',
                            },
                            multiple: false
                        });

                        // When an image is selected, run a callback.
                        file_frame.on('select', function () {
                            attachment = file_frame.state().get('selection').first().toJSON();

                            jQuery('#wcla_graphics_category_thumbnail_id').val(attachment.id);

                            if (attachment.sizes) {
                                if (attachment.sizes.thumbnail)
                                    jQuery('#wcla_graphics_category_thumbnail img').attr('src', attachment.sizes.thumbnail.url);
                                else
                                    jQuery('#wcla_graphics_category_thumbnail img').attr('src', attachment.sizes.full.url);
                            }
                            else {
                                jQuery('#wcla_graphics_category_thumbnail img').attr('src', attachment.url);
                            }


                            jQuery('.remove_image_button').show();
                        });

                        // Finally, open the modal.
                        file_frame.open();
                    });

                    jQuery(document).on('click', '.remove_image_button', function (event) {
                        jQuery('#wcla_graphics_category_thumbnail img').attr('src', '<?php echo wc_placeholder_img_src(); ?>');
                        jQuery('#wcla_graphics_category_thumbnail_id').val('');
                        jQuery('.remove_image_button').hide();
                        return false;
                    });

                </script>
                <div class="clear"></div>
            </td>
        </tr>

        <?php
    }

    function save_taxonomy_custom_meta($term_id) {

        if (isset($_POST['term_meta'])) {
            $t_id = $term_id;
            $term_meta = get_option("taxonomy_$t_id");
            $cat_keys = array_keys($_POST['term_meta']);
            foreach ($cat_keys as $key) {
                if (isset($_POST['term_meta'][$key])) {
                    $term_meta[$key] = $_POST['term_meta'][$key];
                }
            }
            // Save the option array.
            update_option("taxonomy_$t_id", $term_meta);
        }
    }

    public function wcla_taxonomy_columns($columns) {
        $new_columns = array();
        $new_columns['cb'] = $columns['cb'];
        $new_columns['thumb'] = __('Image', 'liveart');

        unset($columns['cb']);

        return array_merge($new_columns, $columns);
    }

    public function wcla_taxonomy_column($columns, $column, $id) {

        if ('thumb' == $column) {
            $term_meta = get_option("taxonomy_$id");

            $thumbnail_id = $term_meta["thumbnail_id"];

            if ($thumbnail_id) {
                $image = wp_get_attachment_thumb_url($thumbnail_id);
            } else {
                $image = wc_placeholder_img_src();
            }

            $image = str_replace(' ', '%20', $image);

            $columns .= '<img src="' . esc_url($image) . '" alt="' . __('Thumbnail', 'liveart') . '" class="wp-post-image" height="48" width="48" />';
        }

        return $columns;
    }

    public function register_all_taxonomies($taxonomies) {
        foreach ($taxonomies as $name => $arr) {
            register_taxonomy($name, array('wcla_graphics'), $arr);

            add_action($name . '_add_form_fields', array($this, 'wcla_taxonomy_add_new_meta_field'), 10, 2);
            add_action($name . '_edit_form_fields', array($this, 'wcla_taxonomy_edit_meta_field'), 10, 2);
            add_action('edited_' . $name, array($this, 'save_taxonomy_custom_meta'), 10, 2);
            add_action('create_' . $name, array($this, 'save_taxonomy_custom_meta'), 10, 2);

            add_filter('manage_edit-' . $name . '_columns', array($this, 'wcla_taxonomy_columns'));
            add_filter('manage_' . $name . '_custom_column', array($this, 'wcla_taxonomy_column'), 10, 3);
        }
    }

    private function removeUnwantedMetaboxes() {
        add_action('admin_menu', function() {
            remove_meta_box('tagsdiv-lagraphics_categories', 'wcla_graphics', 'core');
        });
    }

    public static function getTaxonomyCombo($taxonomy, $name, $selected = 0) {
        $args = array(
            'show_option_all' => '',
            'show_option_none' => '',
            'orderby' => 'ID',
            'order' => 'ASC',
            'show_last_update' => 0,
            'show_count' => 0,
            'hide_empty' => 0,
            'child_of' => 0,
            'exclude' => '',
            'echo' => 1,
            'selected' => $selected,
            'hierarchical' => true,
            'name' => $name,
            'id' => $name,
            'class' => 'postform',
            'depth' => 10,
            'tab_index' => 0,
            'taxonomy' => $taxonomy,
            'hide_if_empty' => false);

        wp_dropdown_categories($args);
    }

    // CREATE TWO FUNCTIONS TO HANDLE THE COLUMN
    function wcla_columns_head_gallery($defaults) {
        unset($defaults["date"]);
        $defaults['wcla_file'] = __('Image', 'liveart');
        $defaults['wcla_category'] = __('Category', 'liveart');
        return $defaults;
    }

    function wcla_columns_content_gallery($column_name, $post_ID) {
        switch ($column_name) {
            case 'wcla_category':
                echo categoryRender(get_post_meta($post_ID, 'wcla_graphics_category_id', true), 'lagraphics_categories');
                break;
            case 'wcla_file':
                $file = get_post_meta($post_ID, 'wcla_graphics_thumb_file_url', true);
                echo '<img src="' . DESIGNER_GALLERY_UPLOAD_URL . get_post_meta($post_ID, 'wcla_graphics_thumb_file', true) . '" width="40">';
                break;
        }
    }

}
?>