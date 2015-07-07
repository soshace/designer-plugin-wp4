<?php
/**
 * @category   Peexl
 * @package    Peexl
 * @copyright  Copyright (c) 2014 Peexl Web Development (http://www.peexl.com)
 * @license    http://framework.zend.com/license/new-bsd    New BSD License
 * @version    1.0
 */

define('DESIGNER_LOCALE_DIR',DESIGNER_DIR.'locale/');
define('DESIGNER_IFRAME_PAGE_ID',6886);
define('DESIGNER_DESIGNER_PAGE_ID',6345);

define('DESIGNER_PRODUCTS_URL_JSON', admin_url('admin-ajax.php') . '?action=wcla_products_json');
define('DESIGNER_COLORS_URL_JSON', admin_url('admin-ajax.php') . '?action=wcla_colors_json');
define('DESIGNER_FONTS_URL_JSON', admin_url('admin-ajax.php') . '?action=wcla_fonts_json');

define('DESIGNER_GRAPHICS_URL_JSON', admin_url('admin-ajax.php') . '?action=wcla_graphics_json');
define('DESIGNER_QUOTE_URL_JSON', admin_url('admin-ajax.php') . '?action=wcla_quote_json');
define('DESIGNER_ADD_TO_CART_URL', admin_url('admin-ajax.php') . '?action=wcla_add_to_cart&design_id=${design_id}');
define('DESIGNER_SAVE_DESIGN_URL', admin_url('admin-ajax.php') . '?action=wcla_save_design');
define('DESIGNER_LOAD_DESIGNS_URL', admin_url('admin-ajax.php') . '?action=wcla_load_designs&&email=${email}');
define('DESIGNER_LOAD_DESIGN_URL', admin_url('admin-ajax.php') . '?action=wcla_load_design&design_id=${design_id}');
define('DESIGNER_UPLOAD_IMAGE_URL', admin_url('admin-ajax.php') . '?action=wcla_upload_image');
define('DESIGNER_GET_TEXT_Z_URL', DESIGNER_URL.'getTextZ.php');



$uploads = wp_upload_dir();
define('DESIGNER_UPLOAD_DIR',$uploads["basedir"]);
define('DESIGNER_UPLOAD_URL',$uploads["baseurl"]);
define('DESIGNER_GALLERY_UPLOAD_DIR', $uploads["basedir"] . "/wcla/gallery/");
define('DESIGNER_GALLERY_UPLOAD_URL', $uploads["baseurl"] . "/wcla/gallery/");
define('DESIGNER_CATEGORY_GALLERY_UPLOAD_DIR', $uploads["basedir"] . "/wcla/gallery/category");
define('DESIGNER_CATEGORY_GALLERY_UPLOAD_URL', $uploads["baseurl"] . "/wcla/gallery/category");
define('DESIGNER_FONTS_UPLOAD_DIR', $uploads["basedir"] . "/wcla/fonts/");
define('DESIGNER_FONTS_UPLOAD_URL', $uploads["baseurl"] . "/wcla/fonts/");

define('DESIGNER_DESIGNS_DIR', $uploads["basedir"] . "/wcla/designs/");
define('DESIGNER_DESIGNS_URL', $uploads["baseurl"] . "/wcla/designs/");
define('DESIGNER_CSS_DIR', $uploads["basedir"] . "/wcla/css/");
define('DESIGNER_CSS_URL', $uploads["baseurl"] . "/wcla/css/");
define('DESIGNER_TMP_DIR', $uploads["basedir"] . "/wcla/tmp/");
define('DESIGNER_TMP_URL', $uploads["baseurl"] . "/wcla/tmp/");
define('DESIGNER_FONTS_CSS_URL', DESIGNER_CSS_URL.'fonts.css');

?>