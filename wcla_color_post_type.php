<?php
/**
 * @category   Peexl
 * @package    Peexl
 * @copyright  Copyright (c) 2014 Peexl Web Development (http://www.peexl.com)
 * @license    http://framework.zend.com/license/new-bsd    New BSD License
 * @version    1.0
 */

class WCLA_Color_Post_Type {

    public function __construct() {
       // load_plugin_textdomain('mma', false, basename(dirname(__FILE__)) . '/languages');
        $this->register_post_type();       
        $this->metaboxes();
        $this->setActionFilters();
    }
    
    private function setActionFilters() {
        add_filter('manage_wcla_colors_posts_columns', array($this, 'wcla_columns_head_colors'), 10);
        add_action('manage_wcla_colors_posts_custom_column', array($this, 'wcla_columns_content_colors'), 10, 2);
    }

    public function register_post_type() {
    	$args = array(
            'labels' => array(
                'name' => __('Colors', 'liveart'),
                'singular_name' => __('Color', 'liveart'),
                'add_new_item' => __('Add new Color', 'liveart'),
                'add_new' => __('Add new Color', 'liveart'),
                'edit_item' => __('Edit Item', 'liveart'),
                'view_item' => __('View item', 'liveart'),
                'not_found' => __('No Color Found', 'liveart'),
                'not_found_in_trash' => __('No Color found in trash', 'liveart')
            ),        
            'query_var' => 'wcla_colors',
            'rewrite' => array(
                'slug' => 'wcla_colors',
            ),
            'public' => true,
            'menu_position' => 49,            
            'supports' => array(
                'title',
                //'thumbnail',
                //'editor',
            //'custom-fields'		
            ),
            'show_in_nav_menus' 	=> false,
            //'show_ui'=>false,
            'show_in_menu'=>false
                );
        register_post_type('wcla_colors', $args);
    }

    public function metaboxes() {
    	add_action('add_meta_boxes', function() {
                    //css id,title,callback func,page,priority, callback func arguments            
                    add_meta_box('wcla_color_hex_value', __('Details', 'liveart'), 'wcla_color_hex_value_cb', 'wcla_colors');
                  
        });

        function wcla_color_hex_value_cb($post) {           
             //wp_nonce_field(__FILE__, 'mma_nonce');
            ?>
            <p>          			
            <lable for="wcla_color_hex_value"><?php echo __('Value(hex)', 'liveart') ?>:</label>            
            <input type="text" id="wcla_color_hex_value" name="wcla_color_hex_value" value="<?php echo get_post_meta($post->ID, 'wcla_color_hex_value', true) ?>" class="widefat" />                       
            </p>
            <?php
        }

    

        add_action('save_post', function($id) {
                    if ($_POST /*&& wp_verify_nonce($_POST["mma_nonce"], __FILE__)*/) {
                        if (isset($_POST["wcla_color_hex_value"])) {
                            update_post_meta($id, 'wcla_color_hex_value', $_POST["wcla_color_hex_value"]);
                        }
                      
                    }
                });	
    }
    
    // CREATE TWO FUNCTIONS TO HANDLE THE COLUMN
    public function wcla_columns_head_colors($defaults) {
        unset($defaults["date"]);
        $defaults['wcla_color'] = 'Value';
        return $defaults;
    }

    public function wcla_columns_content_colors($column_name, $post_ID) {
        if ($column_name == 'wcla_color') {
            echo '<div style="background:' . get_post_meta($post_ID, 'wcla_color_hex_value', true) . '; float: left; width:15px; height: 15px; border: 1px solid black;margin-right:8px"></div><span style="float: left; width: 65px; text-transform: uppercase;line-height:15px;">' . get_post_meta($post_ID, 'wcla_color_hex_value', true) . '</span>';
        }
    }

}

?>