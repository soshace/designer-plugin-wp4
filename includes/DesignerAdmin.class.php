<?php
/**
 * @category   Peexl
 * @package    Peexl
 * @copyright  Copyright (c) 2014 Peexl Web Development (http://www.peexl.com)
 * @license    http://framework.zend.com/license/new-bsd    New BSD License
 * @version    1.0
 */

require_once 'DesignerWCAdmin.class.php';

class DesignerAdmin {

    private $WCLA_WC;

    public function __construct() {
        $this->WCLA_WC = new DesignerWCAdmin();
        $this->setActionFilter();
        $this->wcla_enqueue_scripts();
    }

    public function setActionFilter() {
        add_action('admin_menu', array($this, 'admin_menu'), 9);
        add_filter('upload_mimes', array($this, 'cc_mime_types'));
        add_action('admin_enqueue_scripts', array($this, 'wcla_load_wp_media_files'), 9);

        add_action('pre_get_posts', array($this, 'wcla_custom_post_type_order'));
    }

    public function cc_mime_types($mimes) {

        $mimes['svg'] = 'image/svg+xml';
        $mimes['ttf'] = 'application/x-font-ttf';
        $mimes['woff'] = 'application/font-woff';
        $mimes['otf'] = 'application/font-sfnt';
        return $mimes;
    }

    public function wcla_load_wp_media_files() {
        wp_enqueue_media();
    }

    public function wcla_enqueue_scripts() {

        wp_register_script("designer_jqueryui", DESIGNER_URL . "js/jqueryui/js/jquery-ui-1.10.4.custom.min.js", array('jquery'), '1.10.4', true);
        wp_enqueue_script('designer_jqueryui');


        wp_enqueue_style('designer_admin_fix', DESIGNER_URL . 'styles/designer.css');
        wp_enqueue_style('designer_fonts', DESIGNER_CSS_URL . 'fonts.css');

        wp_enqueue_style('designer_jscob_css', DESIGNER_URL . 'js/jcrop/css/jquery.Jcrop.min.css');
        wp_register_script("designer_jcrop", DESIGNER_URL . "js/jcrop/js/jquery.Jcrop.min.js", array('jquery'), '2.2.1', true);
        wp_enqueue_script('designer_jcrop');

        wp_register_script("designer_corejs", DESIGNER_URL . "js/core.js", array('jquery'), '2.2.1', true);
        wp_enqueue_script('designer_corejs');
    }

    public function admin_menu() {

        add_menu_page('Designer Configuration', 'Designer', 'manage_options', 'designer-configuration', array($this, 'wcla_designer_config_options'), DESIGNER_URL . '/styles/images/design.png', 50);

        add_submenu_page('designer-configuration', 'Colors', 'Colors', 'manage_options', 'edit.php?post_type=wcla_colors');
//    add_submenu_page('designer-configuration', 'Font Colors', 'Font Colors', 'manage_options','edit.php?post_type=wcla_font_colors'); 
        add_submenu_page('designer-configuration', 'Fonts', 'Fonts', 'manage_options', 'edit.php?post_type=wcla_fonts');
        add_submenu_page('designer-configuration', 'Graphics', 'Graphics', 'manage_options', 'edit.php?post_type=wcla_graphics');
        add_submenu_page('designer-configuration', 'Graphics Categories', 'Graphics Categories', 'manage_options', 'edit-tags.php?taxonomy=lagraphics_categories&post_type=wcla_graphics');

        remove_meta_box('postcustom', 'product', 'normal');
    }

    public function wcla_designer_config_options() {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }
        echo '<div class="wrap">';
        echo '<p>Peexl Designer Wordpress/Woocommerce plugin</p>';
        echo '</div>';
    }

    public function wcla_custom_post_type_order($query) {
        if (!is_admin())
            return;

//        $screen = get_current_screen();
//        if ('edit' == $screen->base && !isset($_GET['orderby'])) {
//            switch ($screen->post_type) {
//                case 'wcla_fonts':
//                    $query->set('orderby', 'title');
//                    $query->set('order', 'ASC');
//                    break;
//            }
//        }
    }

}
