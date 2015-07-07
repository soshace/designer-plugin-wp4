<?php

/*
 * Plugin Name: DesignerWP
 * Description: Integrating Designer with Wordpress/WooCommerce
 * Text Domain: designer
 * Domain Path: /locale/
 * Text Domain: designer
 * Version: 2.0 
 * Author: Peexl Web Development 
 * Author URI: http://www.peexl.com
 */

// Prevent loading this file directly
defined('ABSPATH') || exit;
define('DESIGNER_DIR', plugin_dir_path(__FILE__));
define('DESIGNER_URL', plugin_dir_url(__FILE__));

global $jal_db_version;
global $WCLA;



$wcla_db_version = "2.0";

require_once 'includes/config.php';
require_once 'includes/WCLA_Utilities.class.php';
require_once 'wcla_color_post_type.php';
require_once 'wcla_font_color_post_type.php';
require_once 'wcla_font_post_type.php';
require_once 'wcla_lagraphics_post_type.php';

require_once 'includes/Designer.class.php';



add_action('init', function () {
    global $WCLA;
    $WCLA = new Designer();
});

function wcla_custom_upload_directory($path) {

    $id = $_REQUEST['post_ID'];
    $taxonomy = isset($_REQUEST["taxonomy"]) ? $_REQUEST["taxonomy"] : FALSE;

// Check the post-type of the current post


    switch (get_post_type($id)) {
        case 'wcla_fonts':

            $fontDir = sanitize_title(get_post_meta($id, 'wcla_font_family', true));

            $basePath = 'wcla/fonts/' . $fontDir;

            if (!is_dir($path['basedir'] . $basePath)) {
                @mkdir($path['basedir'] . $basePath, 0777, true);
            }
            ;
            $path['path'] = str_replace($path['subdir'], '', $path['path']); //remove default subdir (year/month)
            $path['url'] = str_replace($path['subdir'], '', $path['url']);
            $path['subdir'] = '/' . $basePath;
            $path['path'] .= '/' . $basePath;
            $path['url'] .= '/' . $basePath;
            break;
        case 'wcla_graphics':
            $basePath = 'wcla/gallery';
            $path['path'] = str_replace($path['subdir'], '', $path['path']); //remove default subdir (year/month)
            $path['url'] = str_replace($path['subdir'], '', $path['url']);
            $path['subdir'] = '/' . $basePath;
            $path['path'] .= '/' . $basePath;
            $path['url'] .= '/' . $basePath;
            break;
    }

    if ($taxonomy) {
        switch ($taxonomy) {
            case 'lagraphics_categories':

                break;
        }
    }

    return $path;
}

add_filter('upload_dir', 'wcla_custom_upload_directory');

function wcla_load_designer($atts) {
    include DESIGNER_DIR . 'templates/designer_tpl.php';
}

//function wcla_load_designer($atts) {
//
//    include DESIGNER_DIR . 'templates/designer_tpl.php';
//}

function wcla_load_designer_iframe($atts) {

    global $woocommerce;

    $woocommerce->cart->set_quantity($_GET["cart_key"], 0);

    // . 
    if(isset($_GET["design_id"])){
        $url=site_url('/designer/') . '?design_id=' . (string) $_GET["design_id"];
    }
    else
    {
        $url=site_url('/designer/') . '?productid=' . ((int) $_GET["productid"] == 0 ? (string) WCLA_Utilities::get_option('wcla_product_id') : (string) $_GET["productid"]) ;

    }
    
    echo '<iframe height="' . WCLA_Utilities::get_option('wcla_iframe_height') . '" width="' . WCLA_Utilities::get_option('wcla_iframe_width') . '" scrolling="yes" style="border:none;overflow:hidden;" src="'.$url.'"></iframe>';
}

add_shortcode('designer', 'wcla_load_designer');
add_shortcode('designer-iframe', 'wcla_load_designer_iframe');


if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    if (is_admin()) {
        include DESIGNER_DIR . 'designer_admin.php';
    }
}

function wcla_install() {
    global $wpdb;
    global $wcla_db_version;

    $table_name = $wpdb->prefix . "wcla_designer_design";
    $sql = "CREATE TABLE IF NOT EXISTS `" . $table_name . "` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `design_id` varchar(13) NOT NULL,
            `info` text NOT NULL,
            `data` longtext NOT NULL,
            `email` varchar(255) NOT NULL,
            `title` varchar(255) NOT NULL,
            `updated` bigint(20) NOT NULL,
            PRIMARY KEY (`id`)
          ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

    dbDelta($sql);

    if (!is_dir(DESIGNER_CSS_DIR)) {
        @mkdir(DESIGNER_CSS_DIR, 0777, true);
    }
    if (!is_dir(DESIGNER_DESIGNS_DIR)) {
        @mkdir(DESIGNER_DESIGNS_DIR, 0777, true);
    }
    if (!is_dir(DESIGNER_GALLERY_UPLOAD_DIR)) {
        @mkdir(DESIGNER_GALLERY_UPLOAD_DIR, 0777, true);
    }
    if (!is_dir(DESIGNER_FONTS_UPLOAD_DIR)) {
        @mkdir(DESIGNER_FONTS_UPLOAD_DIR, 0777, true);
    }
    if (!is_dir(DESIGNER_CATEGORY_GALLERY_UPLOAD_DIR)) {
        @mkdir(DESIGNER_CATEGORY_GALLERY_UPLOAD_DIR, 0777, true);
    }
        
    if (!is_dir(DESIGNER_TMP_DIR)) {
        @mkdir(DESIGNER_TMP_DIR, 0777, true);
    }
  
    add_option("wcla_db_version", $wcla_db_version);
}

register_activation_hook(__FILE__, 'wcla_install');

add_action('plugins_loaded', 'wcla_load_textdomain');

function wcla_load_textdomain() {
    load_plugin_textdomain('designer', false, dirname( plugin_basename(__FILE__) ) . '/locale/');
}

?>