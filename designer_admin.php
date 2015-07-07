<?php
/**
 * @category   Peexl
 * @package    Peexl
 * @copyright  Copyright (c) 2014 Peexl Web Development (http://www.peexl.com)
 * @license    http://framework.zend.com/license/new-bsd    New BSD License
 * @version    1.0
 */
require_once 'includes/DesignerAdmin.class.php';
$laAdmin = new DesignerAdmin();

function user_can_save($post_id, $plugin_file, $nonce) {

    $is_autosave = wp_is_post_autosave($post_id);
    $is_revision = wp_is_post_revision($post_id);
    $is_valid_nonce = ( isset($_POST[$nonce]) && wp_verify_nonce($_POST[$nonce], $plugin_file) );

    // Return true if the user is able to save; otherwise, false.
    return !( $is_autosave || $is_revision ) && $is_valid_nonce;
}

function has_files_to_upload($id) {
    return (!empty($_FILES) ) && isset($_FILES[$id]);
}



function wcla_before_delete($post_id) {

    // We check if the global post type isn't ours and just return
    global $post_type;

    if ($post_type == 'wcla_fonts') {
        if (get_post_meta($post_id, 'wcla_font_file_path', true) != '') {
            unlink(get_post_meta($post_id, 'wcla_font_file_path', true));
        }
    }

    if ($post_type == 'wcla_graphics') {
        if (get_post_meta($post_id, 'wcla_graphics_file_path', true) != '') {
            unlink(get_post_meta($post_id, 'wcla_graphics_file_path', true));
        }
        if (get_post_meta($post_id, 'wcla_graphics_thumb_file_path', true) != '') {
            unlink(get_post_meta($post_id, 'wcla_graphics_thumb_file_path', true));
        }
    }
    // My custom stuff for deleting my custom post type here
}

add_action('before_delete_post', 'wcla_before_delete');

function categoryRender($id, $taxonomy) {
    $category = get_term_by('id', $id, $taxonomy);
    $ancestors = get_ancestors($category->term_id, 'lagraphics_categories');
    $catName = $category->name;
    if (count($ancestors)) {
        foreach ($ancestors as $key => $value) {
            $cat = get_term_by('id', $value, 'lagraphics_categories');
            $catName = $cat->name . ' > ' . $catName;
        }
    }

    return $catName;
}

?>