<?php

/* * Plugin Name: Designer plugin 
 * Description: Integrating Designer with WP
 * Text Domain: Designer
 * Version: 1.0 Author: Peexl Web Development (http://www.peexl.com)
 */

// Prevent loading this file directly

require_once 'wcla_color_post_type.php';
require_once 'wcla_font_color_post_type.php';
require_once 'wcla_font_post_type.php';
require_once 'wcla_lagraphics_post_type.php';


defined('ABSPATH') || exit;
define('DESIGNER_IFRAME_PAGE', 6345);
define('DESIGNER_PAGE', 5859);
define('DESIGNER_DIR'
admin_url('admin-ajax.php') . '?action=wcla_save_design');
define('DESIGNER_LOAD_DESIGNS_URL', admin_url('admin-ajax.php') . '?action=wcla_load_designs');
define('DESIGNER_LOAD_DESIGN_URL', admin_url('admin-ajax.php') . '?action=wcla_load_design&design_id=${design_id}');
define('DESIGNER_UPLOAD_IMAGE_URL', admin_url('admin-ajax.php') . '?action=wcla_upload_image');



$uploads = wp_upload_dir();
define('DESIGNER_GALLERY_UPLOAD_DIR', $uploads["basedir"] . "/wcla/gallery/");
define('DESIGNER_GALLERY_UPLOAD_URL', $uploads["baseurl"] . "/wcla/gallery/");
define('DESIGNER_DESIGNS_DIR', $uploads["basedir"] . "/wcla/designs/");
define('DESIGNER_DESIGNS_URL', $uploads["baseurl"] . "/wcla/designs/");
define('DESIGNER_TEXT_EFFECTS',DESIGNER_URL."/textEffects.json");

add_action('init', function () {
	new WCLA_Color_Post_Type();
	new WCLA_Font_Color_Post_Type();
	new WCLA_Font_Post_Type();
	new WCLA_LAGraphics_Post_Type();
});

// config json function

add_action('wp_ajax_nopriv_wcla_config_json', 'wcla_config_json', 100);
add_action('wp_ajax_wcla_config_json', 'wcla_config_json', 100);
//products json function
add_action('wp_ajax_nopriv_wcla_products_json', 'wcla_products_json', 100);
add_action('wp_ajax_wcla_products_json', 'wcla_products_json', 100);

//colors json function 
add_action('wp_ajax_nopriv_wcla_colors_json', 'wcla_colors_json', 100);
add_action('wp_ajax_wcla_colors_json', 'wcla_colors_json', 100);

//graphics json function
add_action('wp_ajax_nopriv_wcla_graphics_json', 'wcla_graphics_json', 100);
add_action('wp_ajax_wcla_graphics_json', 'wcla_graphics_json', 100);

//fonts json function
add_action('wp_ajax_nopriv_wcla_fonts_json', 'wcla_fonts_json', 100);
add_action('wp_ajax_wcla_fonts_json', 'wcla_fonts_json', 100);

//fonts cssjson function
add_action('wp_ajax_nopriv_wcla_fonts_css_json', 'wcla_fonts_css_json', 100);
add_action('wp_ajax_wcla_fonts_css_json', 'wcla_fonts_css_json', 100);

//quote json function
add_action('wp_ajax_nopriv_wcla_quote_json', 'wcla_quote_json', 100);
add_action('wp_ajax_wcla_quote_json', 'wcla_quote_json', 100);

//add to cart function
add_action('wp_ajax_nopriv_wcla_add_to_cart', 'wcla_add_to_cart', 100);
add_action('wp_ajax_wcla_add_to_cart', 'wcla_add_to_cart', 100);

//save design ajax function
add_action('wp_ajax_nopriv_wcla_save_design', 'wcla_save_design', 100);
add_action('wp_ajax_wcla_save_design', 'wcla_save_design', 100);

//load designs ajax funtion
add_action('wp_ajax_nopriv_wcla_load_designs', 'wcla_load_designs', 100);
add_action('wp_ajax_wcla_load_designs', 'wcla_load_designs', 100);

//load design ajax function
add_action('wp_ajax_nopriv_wcla_load_design', 'wcla_load_design', 100);
add_action('wp_ajax_wcla_load_design', 'wcla_load_design', 100);


//upload image function
add_action('wp_ajax_nopriv_wcla_upload_image', 'wcla_upload_image', 100);
add_action('wp_ajax_wcla_upload_image', 'wcla_upload_image', 100);

function designer_localize_script() {
    if (is_page(array(DESIGNER_IFRAME_PAGE, 'designer'))) {
        add_action('wp_print_scripts', 'designer_load_js_scripts', 100);
        add_action('wp_print_styles', 'designer_load_styles', 100);
       
    }
}

add_action('wp', 'designer_localize_script');


function designer_load_styles() {
    wp_enqueue_style('designer_bootstrap', DESIGNER_URL . 'assets/bootstrap/css/bootstrap.css');
 //   wp_enqueue_style('designer_bootstrap_responsive', DESIGNER_URL . 'assets/bootstrap/css/bootstrap-responsive.css');
    wp_enqueue_style('designer_nouislider_css', DESIGNER_URL . 'assets/css/jquery.nouislider.min.css');
    wp_enqueue_style('designer_color_picker', DESIGNER_URL . 'assets/css/colorPicker.css');
    
    wp_enqueue_style('designer_farbtastic', DESIGNER_URL . 'assets/css/farbtastic.css');
    wp_enqueue_style('designer_tooltipster', DESIGNER_URL . 'assets/css/tooltipster.css');
    wp_enqueue_style('designer_tooltipster_noir', DESIGNER_URL . 'assets/css/tooltipster-noir.css');
    
    wp_enqueue_style('designer_styles', DESIGNER_URL . 'assets/css/style.css');
//   wp_enqueue_style('designer_style_fix', DESIGNER_URL . 'styles/fix.css');

    //wp_enqueue_style('designer_fonts', DESIGNER_URL . 'fonts/fonts.css');
	wp_enqueue_style('designer_css_fonts', DESIGNER_FONTS_CSS_URL_JSON);
    
}

function designer_load_js_scripts() {

    if (!is_admin()) {

        // deregister the original versio n of jQuery
        wp_deregister_script('jquery');

        // register it again, this time with no file path
        wp_register_script('jquery', DESIGNER_URL . "lib/jquery-1.9.1.min.js", FALSE, '1.9.1');

        // add it back into the queue
        wp_enqueue_script('jquery');
    }
    wp_register_script("designer_knockout", DESIGNER_URL . "lib/knockout-2.2.1.js", array('jquery'), '2.2.1', false);
    wp_register_script("designer_bootstrap", DESIGNER_URL . "assets/bootstrap/js/bootstrap.js", array('jquery'), '2.2.1', false);
    wp_register_script("designer_colorpicker", DESIGNER_URL . "assets/js/jquery.colorPicker.js", array('jquery'), '2.2.1', false);
    wp_register_script("knockout", DESIGNER_URL . "lib/knockout-2.2.1.js", array('jquery'), '2.2.1', false);
    wp_register_script("lieveart_libs", DESIGNER_URL . "lib/DELibs.js", array('jquery'), '2.2.1', false);
    wp_register_script("designer_nouislider", DESIGNER_URL . "assets/js/jquery.nouislider.min.js", array('jquery'), '2.2.1', false);
    wp_register_script("designer_printarea", DESIGNER_URL . "assets/js/jquery.PrintArea.js", array('jquery'), '2.2.1', false);
    
    wp_register_script("designer_farbtastic", DESIGNER_URL . "assets/js/farbtastic.js", array('jquery'), '2.2.1', false);
    wp_register_script("designer_tooltipster", DESIGNER_URL . "assets/js/jquery.tooltipster.min.js", array('jquery'), '2.2.1', false);
    
    
    

    wp_register_script("designer_ui", DESIGNER_URL . "assets/js/designer-ui-components.js", array('jquery'), '2.2.1', true);
    wp_register_script("designer", DESIGNER_URL . "js/ui.js", array('jquery'), '2.2.2', true);

    wp_enqueue_script('designer_knockout');
    wp_enqueue_script('designer_bootstrap');

    wp_enqueue_script('designer_nouislider');
    
    wp_enqueue_script('designer_farbtastic');
    wp_enqueue_script('designer_tooltipster');
    
    wp_enqueue_script('designer_colorpicker');

    wp_enqueue_script('designer_printarea');

    
    //wp_enqueue_script('knockout');
    wp_enqueue_script('lieveart_libs');


    wp_register_script("designer_trial", DESIGNER_URL . "js/designer/Trial.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_trial');

    wp_register_script("designer_options", DESIGNER_URL . "js/designer/DEOptions.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_options');

    wp_register_script("designer_object_type", DESIGNER_URL . "js/designer/ObjectType.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_object_type');

    wp_register_script("designer_flip_kind", DESIGNER_URL . "js/designer/FlipKind.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_flip_kind');

    wp_register_script("designer_align_side", DESIGNER_URL . "js/designer/AlignSide.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_align_side');

    wp_register_script("designer_events_dispatcher", DESIGNER_URL . "js/designer/events/EventDispatcher.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_events_dispatcher');

    wp_register_script("designer_extend", DESIGNER_URL . "js/designer/extend.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_extend');

    wp_register_script("designer_events", DESIGNER_URL . "js/designer/events/Events.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_events');

    wp_register_script("designer_designer_events", DESIGNER_URL . "js/designer/events/DEEvents.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_designer_events');

    wp_register_script("designer_utils", DESIGNER_URL . "js/designer/Util.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_utils');

    wp_register_script("designer_vo", DESIGNER_URL . "js/designer/vo/ConfigVO.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_vo');

    wp_register_script("designer_design_vo", DESIGNER_URL . "js/designer/vo/DesignVO.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_design_vo');

    wp_register_script("designer_canvas_manager", DESIGNER_URL . "js/designer/CanvasManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_canvas_manager');

    wp_register_script("designer_controls_model", DESIGNER_URL . "js/designer/ControlsModelVO.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_controls_model');

    wp_register_script("designer_config_manager", DESIGNER_URL . "js/designer/ConfigManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_config_manager');

    wp_register_script("designer_controls_manager", DESIGNER_URL . "js/designer/ControlsManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_controls_manager');

    wp_register_script("designer_status_manager", DESIGNER_URL . "js/designer/StatusManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_status_manager');

    wp_register_script("designer_quote_location_vo", DESIGNER_URL . "js/designer/vo/QuoteLocationVO.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_quote_location_vo');

    wp_register_script("designer_design_info_vo", DESIGNER_URL . "js/designer/vo/DesignInfoVO.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_design_info_vo');

    wp_register_script("designer_order_manager", DESIGNER_URL . "js/designer/OrderManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_order_manager');

    wp_register_script("auth_manager", DESIGNER_URL . "js/designer/AuthManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('auth_manager');

    wp_register_script("save_load_manager", DESIGNER_URL . "js/designer/SaveLoadManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('save_load_manager');

    wp_register_script("product_manager", DESIGNER_URL . "js/designer/ProductManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('product_manager');

    wp_register_script("vector_effect", DESIGNER_URL . "js/designer/VectorEffect.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('vector_effect');

    wp_register_script("arc_up", DESIGNER_URL . "js/designer/ArcUp.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('arc_up');



    wp_register_script("text_effects_manager", DESIGNER_URL . "js/designer/TextEffectsManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('text_effects_manager');

    wp_register_script("history_manager", DESIGNER_URL . "js/designer/HistoryManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('history_manager');

    wp_register_script("de_model", DESIGNER_URL . "js/designer/DEModel.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('de_model');

    wp_register_script("font_manager", DESIGNER_URL . "js/designer/FontManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('font_manager');

    wp_register_script("obj", DESIGNER_URL . "js/designer/Obj.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('obj');

    wp_register_script("designer_js", DESIGNER_URL . "js/designer/DesignerJs.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_js');

    wp_register_script("tracker_manager", DESIGNER_URL . "js/designer/TrackerManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('tracker_manager');

    wp_register_script("trial_watermark", DESIGNER_URL . "js/designer/TrialWaterMark.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('trial_watermark');

    wp_register_script("style_vo", DESIGNER_URL . "js/designer/vo/StyleVO.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('style_vo');

    wp_register_script("de_designer", DESIGNER_URL . "js/designer/DEDesigner.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('de_designer');

    wp_register_script("ruler_manager", DESIGNER_URL . "js/designer/RulerManager.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('ruler_manager');

    wp_register_script("designer_design_libs", DESIGNER_URL . "DesignerJS.js", array('jquery'), '2.2.2', false);
    wp_enqueue_script('designer_design_libs');

    wp_enqueue_script('designer_ui');
    wp_enqueue_script('designer');
    wp_localize_script('designer', 'AjaxRequest', array('ajaxurl' => admin_url('admin-ajax.php'), 'pluginurl' => DESIGNER_URL,'productid'=> (int)$_GET["productid"]==0?(int) get_option('wcla_default_product_id'):(int)$_GET["productid"],'design_id'=> (int)$_GET["design_id"]==0?0:(string)$_GET["design_id"],'cart_key'=> (int)$_GET["cart_key"]==0?0:(string)$_GET["cart_key"]));
}

function wcla_load_designer($atts) {	
    include DESIGNER_DIR . 'templates/designer_tpl.php';
}
function wcla_load_designer_iframe($atts) {
    //include DESIGNER_DIR . 'templates/designer_tpl.php';
    global $woocommerce;
//    var_dump($_GET);
    $woocommerce->cart->set_quantity($_GET["cart_key"],0);
  

   echo '<iframe height="650" width="1100" scrolling="yes" style="border:none;overflow:hidden; margin-left: -25px;" src="'.site_url( '/designer/').'?productid='.((int)$_GET["productid"]==0?(string) get_option('wcla_default_product_id'):(string)$_GET["productid"]).((int)$_GET["design_id"]==0?'':'&design_id='.(string)$_GET["design_id"]).'"></iframe>';


} 

function wcla_config_json() {
    $config = array(
        "productsList" => array(
            "url" => DESIGNER_PRODUCTS_URL_JSON,
        ),
        "defaultProductId" => (int)$_GET["productid"]==0?(string) get_option('wcla_default_product_id'):(string)$_GET["productid"],
        "defaultNameObjectText"=>"NAMES HERE",
        "defaultNumberObjectText" =>"00",
        "defaultProductSize_"=>array(32,16),
        "fonts" => array(
            "url" => DESIGNER_FONTS_URL_JSON
        ),
        "colors" => array(
            "url" => DESIGNER_COLORS_URL_JSON
        ),
        "graphicsList" => array(
            "url" => DESIGNER_GRAPHICS_URL_JSON
        ),
        // "option" => array(
        //     "showControls" => false,
        //     "deleteOnDoubleClick" > false
        // ),
        "options" =>array(
            "deleteOnDoubleClick"=>false,
            "fontsCSSUrl"=>DESIGNER_FONTS_CSS_URL_JSON,
            "includePrintingAreaInDesign"=>true,
            "includeProductInDesign"=>true,
            "maxZoom"=> 150,
            "minZoom"=> 50,
            "zoomEnabled"=> false,
            "checkeredBackground"=> false,
            "unit"=> "in",
            "unit2"=> "ft",
            "showProductSelector"=> true,
        ),
        "textEffects" => array(
        	"config"=>DESIGNER_TEXT_EFFECTS,
        	"url"=>"http://hive.liveartdesigner.com/mmjs/services/getTextZ.php"
        ),
        "assetsUrl" => DESIGNER_URL . "assets/",
       // "dpi" => 72,
        "getQuoteUrl" => DESIGNER_QUOTE_URL_JSON,
        "getDesignsUrl" => DESIGNER_LOAD_DESIGNS_URL,
        "saveDesignUrl" => DESIGNER_SAVE_DESIGN_URL,
        "loadDesignUrl" => DESIGNER_LOAD_DESIGN_URL,
        "redirectUrl" => DESIGNER_ADD_TO_CART_URL,
        "uploadImageUrl" => DESIGNER_UPLOAD_IMAGE_URL,
	"shareLinkUrl"=> get_permalink(DESIGNER_PAGE).'?design_id=${design_id}',
    );

  if(isset($_GET["design_id"])){
        if($_GET["design_id"]!="0")
        $config["defaultDesignId"]=(string)$_GET["design_id"];
    }
    echo json_encode($config);

    exit();
}

function wcla_products_json() {
    echo json_encode(wcla_get_product_list());

    exit;
}

function wcla_colors_json() {
    // $colors_list = get_option('wcla_fonts_colors_list');
    // $collors_arr = explode("\r\n", $colors_list);

    // $output = array();

    // foreach ($collors_arr as $color) {
    //     $colorData = explode("|", $color);
    //     $output["colors"][] = array("name" => $colorData[1], "value" => $colorData[0]);
    // }
    // echo json_encode($output);

     $output = array();
    
			$colors = new WP_Query();
            $colors->query(
                    array('post_type' => 'wcla_colors', 'nopaging' => true));
            
            foreach ($colors->posts as $color) {
            	$i++;            	
             	 $output["colors"][] = array("name" => $color->post_title, "value" =>get_post_meta($color->ID, 'wcla_color_hex_value', true));
            }

    echo json_encode($output);    

    exit;
}

function wcla_fonts_json() {

    // $fonts = get_option('wcla_fonts_list');
    // $fonts_arr = explode("\r\n", $fonts);

    $output = array();
    // foreach ($fonts_arr as $font) {
    //     $output["fonts"][] = array("name" => $font, "fontFamily" => $font,"ascent"=>30);
    // }
			$fonts = new WP_Query();
            $fonts->query(
                    array('post_type' => 'wcla_fonts', 'nopaging' => true));
            foreach ($fonts->posts as $font) {
             	 $output["fonts"][] = array("name" => $font->post_title,"vector"=>get_post_meta($font->ID, 'wcla_font_vector_file_url', true),"ascent"=>get_post_meta($font->ID, 'wcla_font_ascent', true), "fontFamily" => $font->post_title);
            }

    echo json_encode($output);
    exit;
}

function wcla_fonts_css_json() {
	$content='';
	$fonts = new WP_Query();
            $fonts->query(
                    array('post_type' => 'wcla_fonts', 'nopaging' => true));
            foreach ($fonts->posts as $font) {
              $content.='@font-face {
                                font-family: '.$font->post_title.';
                                src: url("'.get_post_meta($font->ID, 'wcla_font_file_url', true).'");
                                font-weight: normal;
                                font-style: normal;
                            }';
            }
	header("Content-type: text/css", true);
    echo $content;
    exit;
}

function wcla_graphics_json() {	

	//$category=get_term_by('id', get_post_meta($post_ID, 'wcla_graphics_category_id', true), 'lagallery_categories');
			//$category->name;
	$galleryList=array();
	$images=array();
	$gallery = new WP_Query();
            $gallery->query(
                    array('post_type' => 'wcla_graphics', 'nopaging' => true));
            foreach ($gallery->posts as $image) {
            	$imgdata=array(
    					"id"=>(string)$image->ID,
    					"categoryId"=>(string)get_post_meta($image->ID, 'wcla_graphics_category_id', true),
    					"name"=>$image->post_title,
    					"description"=>$image->post_title,
    					"thumb"=>get_post_meta($image->ID, 'wcla_graphics_thumb_file_url', true),
    					"image"=>get_post_meta($image->ID, 'wcla_graphics_file_url', true),                        
    				);
    			$colorizableElements=get_post_meta($image->ID, 'wcla_graphic_colorizable_elements', true);    			
    			if($colorizableElements){
    				$imgdata["multicolor"]=true;
    				$colElements=array();
    				foreach ($colorizableElements as $idx=> $cel){
    					
    					if(!$cel["colors"]) unset ($cel["colors"]);
    					else{
							$cecols=array();    						
    						foreach ($cel["colors"] as $color){
    							$cecols[]=$color;
    						}
    						$cel["colors"]	=$cecols;
    					}
    					$colElements[]=$cel;
    				}
    				$imgdata["colorizableElements"]=$colElements;
    			}
    			else{
    				$imgdata["colors"]="-1";
    			}
    			$images[(int)get_post_meta($image->ID, 'wcla_graphics_category_id', true)][]= $imgdata;
            }

            foreach ($images as $catid => $imagelist) {
            	$category=get_term_by('id', $catid, 'lagraphics_categories');                
            	$galleryList["graphicsCategoriesList"][]=array(
            			"id"=>$catid,
            			"name"=>$category->name,
            			"graphicsList"=>$imagelist
            		);
            }
    echo json_encode($galleryList);
    exit;
}

add_shortcode('designer', 'wcla_load_designer');
add_shortcode('designer-iframe', 'wcla_load_designer_iframe');


if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins'))) || in_array('woocommerce-2.1.12/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins'))) ) {
    if (is_admin()) {
        include DESIGNER_DIR . 'designer_admin.php';
    }
}

function wcla_get_categories($parent = 0) {
    $args = array(
        'orderby' => 'name',
        'order' => 'ASC',
        'hide_empty' => true,
        'number' => '',
        'fields' => 'all',
        'hierarchical' => true,
        'child_of' => $parent,
    );
    return get_terms('product_cat', $args);
}

function wcla_get_product_list() {
    $standardColors=array();
    $colorsquery = new WP_Query();
            $colorsquery->query(
                    array('post_type' => 'wcla_colors', 'nopaging' => true));
            foreach ($colorsquery->posts as $colorq) {
                 $standardColors[] = array("name" => $colorq->post_title, "value" =>get_post_meta($colorq->ID, 'wcla_color_hex_value', true));
            }

    $catlist = array();
    $cats = wcla_get_categories();

    foreach ($cats as $cat) {

        $args = array('post_type' => 'product', 'posts_per_page' => -1, 'product_cat' => $cat->slug, 'meta_query' => array(
                array(
                    'key' => 'wcla_able_for_design',
                    'value' => 'yes',
                )
        ));
        $loop = new WP_Query($args);
        if ($loop->have_posts()) {
            $thumbnail_id = get_woocommerce_term_meta( $cat->term_id, 'thumbnail_id', true );
            $catdata = array(
                'id' => $cat->term_id,
                'name' => $cat->name,
                'thumbUrl' => wp_get_attachment_url( $thumbnail_id )
            );

            while ($loop->have_posts()):
                $sizes=array();
                global $post;
                $loop->the_post();
                $thumb_id = maybe_unserialize(get_post_meta($post->ID, 'wcla_thumb', true));
                $thumb_image = wp_get_attachment_url($thumb_id);
                $colors = array();
                $prodcolors = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_colors', true));

                $prodLocations = maybe_unserialize(get_post_meta($post->ID, 'wcla_locations', true));
                foreach ($prodcolors as $k => $color) {
                    $clocations = array();
                    foreach ($color["location"] as $k => $loc) {

                        $img_id = $loc["image"];                        
                        $img = wp_get_attachment_url($img_id);                        
                        $loc["image"]=$img;
                        $clocations[] = $loc;
                    }

                    $colors[] = array(
                        "name" => $color["color_name"],
                        "value" => $color["color_value"],
                        "location" => $clocations
                    );
                }

                $plocations = array();
                foreach ($prodLocations as $k => $location) {
                    $img_id = $location["image"];
                    $img = wp_get_attachment_url($img_id);
                    $currLocation=array(
                        "name" => $location["name"],
                        "image" => $img,
                        "editableArea" => explode(',', $location["editable_area"]),
                        "editableAreaUnits" => explode(',', $location["editable_area_units"])
                    );
                        
                        if(isset($location["mask"]) && $location["mask"]!=0){
                            $img_id = $location["mask"];                        
                            $img = wp_get_attachment_url($img_id);
                            $currLocation["mask"]=$img;
                        }


                    $plocations[] = $currLocation;
                }

                $prodSizes = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_sizes', true));
               // $colorizable_elements = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_colorizable_elements', array()));
//                var_dump($colorizable_elements);

                foreach ($prodSizes as $k => $size)
                    $sizes[] = $size;
                
                // foreach($colorizable_elements[0] as $k=>$element){
                //     $colors=array();
                //     if(count($element["colors"])>0){
                //         foreach($element["colors"] as $_k=>$kcolor){
                //             $colors[]=$kcolor;
                //         }
                //         $colorizable_elements[0][$k]["colors"]=$colors;
                //     }    
                // }


                
               //$colorizable_elements[0][0]["colors"]=$col_el_colors;
                $colElements=maybe_unserialize(get_post_meta($post->ID, 'wcla_product_colorizable_elements', array()));
                $multicolor=count($colElements[0])>0?true:false;
               
                $colElements=maybe_unserialize(get_post_meta($post->ID, 'wcla_product_colorizable_elements', array()));

                $product = array(
                    "id" => $post->ID,
                    "categoryId" => $cat->term_id,
                    "name" => $post->post_title,
                    "thumbUrl" => $thumb_image,
                    "locations" => $plocations,
                   // "colors" => count($colors)==0?$standardColors:$colors,
                    "sizes" => $sizes,                       
                    "description"=>"Description",
                    "multicolor"=>$multicolor,
                    // "colorizableElements"=>$colorizable_elements[0]
                     "colorizableElements"=>$colElements[0]
                );
                if(count($colors)>0)  $product["colors"]=$colors;
                $resizable = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_resizeable', true));
                $show_ruler = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_show_ruler', true));
                $wcla_hide_editable_area_border = maybe_unserialize(get_post_meta($post->ID, 'wcla_hide_editable_area_border', true));
                $namesNumbersEnabled = maybe_unserialize(get_post_meta($post->ID, 'wcla_name_numbers', true));
                //var_dump($resizable);
                if($wcla_hide_editable_area_border=="yes"){
                    $product["hideEditableAreaBorder"]=true;                   
                }
                else{
                    $product["hideEditableAreaBorder"]=false;
                }
                if($resizable=="yes"){
                    $product["resizable"]=true;                   
                }
                else{
                    $product["resizable"]=false;
                }
                
                if($show_ruler=="yes"){
                    $product["showRuler"]=true;                   
                }
                else{
                    $product["showRuler"]=false;
                }
                
                 if($namesNumbersEnabled=="yes"){
                    $product["namesNumbersEnabled"]=true;                   
                }
                else{
                    $product["namesNumbersEnabled"]=false;
                }
                
                $editableAreaSizes = maybe_unserialize(get_post_meta($post->ID, 'wcla_editable_area_sizes', true));
                if (count($editableAreaSizes)>0){
                    $product["editableAreaSizes"]=$editableAreaSizes;
                    
                }
                 
                $catdata["products"][] = $product;

            endwhile;
            $catlist["productCategoriesList"][] = $catdata;
            wp_reset_query();
        }
    }

    return $catlist;
}

/*
 * getQuote Designer Function
 */

function wcla_quote_json() {
    global $product;
    // get and process data
    $data = json_decode(stripslashes($_POST['data']));
    //var_dump($data);
  //  get_product($data->product->id);
    if($data->product->id)
        $product = get_product($data->product->id);
    else
        $product = get_product(get_option('wcla_default_product_id'));

    // create response
    $total = 0;
    if (count($data->quantities) > 0) {
        foreach ($data->quantities as $k => $qty) {
            $total+=$qty->quantity * $product->get_price();
        }
    }
    $success = true;
    if ($success) {
        // on success

        $response = array('prices' => array(
                array('label' => 'Item Price', 'price' => html_entity_decode(get_woocommerce_currency_symbol(), ENT_COMPAT, "UTF-8") . ' ' . number_format($product->get_price(), 2, '.', ' ')),
                //  array('label' => 'Discount', 'price' => '$ -' . rand(1, 10) . '.00'),
                array('label' => 'Total', 'price' => html_entity_decode(get_woocommerce_currency_symbol(), ENT_COMPAT, "UTF-8") . ' ' . number_format($total, 2, '.', ' '), 'isTotal' => true)
            )
        );
    } else {
        // on error
        $response = array('error' => array(
                'message' => 'Failed to process quote.'
            )
        );
    }

    echo json_encode($response);
    exit;
}

function wcla_add_to_cart() {
    global $wpdb, $woocommerce;
    $design_id = $_REQUEST["design_id"];
    $design = $wpdb->get_row("SELECT * FROM {$wpdb->prefix}wcla_designer_design WHERE design_id='" . $wpdb->escape($design_id) . "'");
    $data = @json_decode(stripslashes_deep($design->data));
 
    $product_id = $data->data->product->id;
    $qty = 0;
  
    foreach ($data->data->quantities as $k => $quantity) {
        $qty+=$quantity->quantity;
    }

    $woocommerce->cart->add_to_cart($product_id, $qty, NULL, NULL, array("design_id" => $design_id, "qtys" => $qty));


   //wp_safe_redirect($woocommerce->cart->get_cart_url());
    echo '<script type="text/javascript">window.top.location.href = "'.$woocommerce->cart->get_cart_url().'";</script>';
}

function wcla_save_design() {
    global $wpdb;
    $data['email'] = isset($_POST["email"]) ? $_POST["email"] : '';
    $data["data"] = isset($_POST["data"]) ? $_POST["data"] : '';
    //echo $_POST["data"];
    $data["title"] = isset($_POST["title"]) ? $_POST["title"] : NULL;
    $data["updated"] = time();
    $data["info"] = '';
    $designId = isset($_POST["id"]) ? $_POST["id"] : uniqid();
    $data["design_id"] = $designId;
    $id = $wpdb->get_var($wpdb->prepare("SELECT id
		FROM {$wpdb->prefix}wcla_designer_design
		WHERE design_id = %s", $designId
    ));

    if ($id) {
        $wpdb->update($wpdb->prefix . "wcla_designer_design", $data, array('id' => $id));
    } else {
        $wpdb->insert($wpdb->prefix . "wcla_designer_design", $data);
    }
    $saveData = json_decode(stripslashes_deep($data["data"]));
    $locations = $saveData->data->locations;
  //  require_once DESIGNER_DIR . 'extlib/svglib/svglib.php';
    foreach ($locations as $location) {
        $imagePath = DESIGNER_DESIGNS_DIR . 'image_' . $designId . '_' . $location->name . '_' . '.svg';
/*        file_put_contents($imagePath, $location->svg);
        
            $svg = SVGDocument::getInstance($imagePath);  
        

        $prodcolors = maybe_unserialize(get_post_meta($saveData->data->product->id, 'wcla_product_colors', true));

      	//var_dump($saveData->data->product->color);var_dump($prodcolors);die();
        $img_path = "";
        foreach ($prodcolors as $k => $color) {
            $clocations = array();
            if (strtolower($color["color_value"]) == strtolower($saveData->data->product->color)) {
                foreach ($color["location"] as $k => $loc) {

                    if ($loc["name"] == $location->name) {
                        $img_id = $loc["image"];
                        $location->svg=str_replace('</defs>', '</defs><image preserveAspectRatio="none" x="0" y="0" width="'.$svg->getWidth().'" height="'.$svg->getHeight().'" xlink:href="'.wp_get_attachment_url($img_id).'"/>', $location->svg);
                        $location->svg=str_replace('<defs/>', '<defs/><image preserveAspectRatio="none" x="0" y="0" width="'.$svg->getWidth().'" height="'.$svg->getHeight().'" xlink:href="'.wp_get_attachment_url($img_id).'"/>', $location->svg);
                        break;
                    }
                }
            }
        }
 
 */
        
//        $img = $svg->addChild('image');
//        
//        $img->addAttribute("xlink:href",$img_path,'http://www.w3.org/1999/xlink');
//        $img->addAttribute('x',0);
//        $img->addAttribute('y',0);
//        $img->addAttribute('width',$svg->getWidth());
//        $img->addAttribute('height',$svg->getHeight());
//        $img->addAttribute('preserveAspectRatio',"none");
//        
//        $svg->saveXML(DESIGNER_DESIGNS_DIR . 'image_' . $designId . '_' . $location->name . '_' . '.svg');
        
        file_put_contents($imagePath, $location->svg);    
        
//        $svg = SVGDocument::getInstance($imagePath);   
//        $height=$svg->getHeight();
//        $width=$svg->getWidth();
//        $svg->setAttribute('width', '100%');
//        $svg->setAttribute('height', '100%');
//        $svg->setAttribute('viewBox', '0 0 '.$width.' '.$height);
//        $svg->setAttribute('preserveAspectRatio', 'xMidYMid meet');   
//        $svg->saveXML(DESIGNER_DESIGNS_DIR . 'image_' . $designId . '_' . $location->name . '_' . '.svg');
    }
    
    $response = array('design' => array(
            'id' => $designId,
            'title' => $data["title"]
    ));
    
    echo json_encode($response);
    exit;
}

function wcla_load_designs() {
    global $wpdb;
    $email = $_REQUEST["email"];
    $designs = array();

    $results = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}wcla_designer_design WHERE email='" . $wpdb->escape($email) . "'");
    if ($results) {
        foreach ($results as $k => $design) {
            $designs[] = array(
                "id" => $design->design_id,
                "title" => $design->title,
                "date" => date("Y.m.d H:i", $design->updated)
            );
        }
    }
    echo json_encode(array("designs" => $designs));
    exit;
}

function wcla_load_design_data($design_id) {
    global $wpdb;
    $design = $wpdb->get_row("SELECT * FROM {$wpdb->prefix}wcla_designer_design WHERE design_id='" . $wpdb->escape($design_id) . "'");
    return $design;
}

function wcla_load_design() {
    $design_id = $_REQUEST["design_id"];
    $design = wcla_load_design_data($design_id);
    echo stripcslashes($design->data);
    exit;
}

function wcla_upload_image() {
    if ($_FILES['Filedata']['size'] || $_FILES['image']['size']) {
        $file = isset($_FILES['Filedata']) ? $_FILES['Filedata'] : $_FILES['image'];
        $path = DESIGNER_GALLERY_UPLOAD_DIR;
        if (!is_dir($path)) {
            mkdir($path);
        }
        $name = time() . '_' . $file['name'];
        move_uploaded_file($file['tmp_name'], $path . $name);
        echo DESIGNER_GALLERY_UPLOAD_URL . $name;
    }
    exit;
}

function wcla_plugin_path() {

    // gets the absolute path to this plugin directory

    return untrailingslashit(plugin_dir_path(__FILE__));
}

add_filter('woocommerce_locate_template', 'wcla_woocommerce_locate_template', 10, 3);

function wcla_woocommerce_locate_template($template, $template_name, $template_path) {

    global $woocommerce;

    $_template = $template;

    if (!$template_path)
        $template_path = $woocommerce->template_url;

    $plugin_path = wcla_plugin_path() . '/woocommerce/';

    // Look within passed path within the theme - this is priority

    $template = locate_template(
            array(
                $template_path . $template_name,
                $template_name
            )
    );

    // Modification: Get the template from this plugin, if it exists

    if (!$template && file_exists($plugin_path . $template_name))
        $template = $plugin_path . $template_name;

    // Use default template

    if (!$template)
        $template = $_template;

    // Return what we found

    return $template;
}

add_filter('woocommerce_add_cart_item_data', 'wcla_add_cart_item_data', 10, 2);

function wcla_add_cart_item_data($cart_item_meta, $product_id) {
    global $woocommerce;
    return $cart_item_meta;
}

add_filter('woocommerce_get_cart_item_from_session', 'wcla_get_cart_item_from_session', 10, 2);

function wcla_get_cart_item_from_session($cart_item, $values) {
    if (!empty($values['design_id'])) {
        $cart_item['design_id'] = $values['design_id'];
    }
    return $cart_item;
}

add_filter('woocommerce_add_cart_item', 'wcla_add_cart_item', 10, 1);

function wcla_add_cart_item($cart_item) {
    return $cart_item;
}

add_action('woocommerce_add_order_item_meta', 'wcla_add_order_item_meta', 10, 2);

function wcla_add_order_item_meta($item_id, $cart_item) {
    wc_add_order_item_meta($item_id, 'wcla_design_id', $cart_item["design_id"]);
    //woocommerce_add_order_item_meta($item_id, 'wcla_design_id', $cart_item["design_id"]);
}

add_filter('woocommerce_get_item_data', 'wcla_get_item_data', 10, 2);

function wcla_get_item_data($item_data, $cart_item) {
    return $item_data;
}

add_filter('woocommerce_in_cart_product_thumbnail', 'wcla_in_cart_product_thumbnail', 10, 3);

function wcla_in_cart_product_thumbnail($image, $values, $cart_item_key) {
    if (isset($values["design_id"])) {

        $design_data = wcla_load_design_data($values["design_id"]);
        $design = json_decode(stripslashes_deep($design_data->data));
//        var_dump($design->data->locations);
        $output = '';
        foreach ($design->data->locations as $location) {
            //$output.=$location->svg;
            //$output.='<img src="' . DESIGNER_DESIGNS_URL . 'image_' . $values["design_id"] . '_' . $location->name . '_.svg">';
            $output.='<embed style="width:50px;height:50px;max-width:587px;padding:0;margin:0;" src="' . DESIGNER_DESIGNS_URL . 'image_' . $values["design_id"] . '_' . $location->name . '_.svg" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/"></embed>';
        }
        return $output;
    }
    else
        return $image;
}


add_filter('woocommerce_designer_edit_link', 'wcla_designer_edit_link', 10, 3);

function wcla_designer_edit_link( $values, $cart_item_key) {
    $output='';
    if (isset($values["design_id"])){
        $output.='<a href="'.get_permalink(DESIGNER_PAGE).'?design_id='.$values["design_id"].'&cart_key='.$cart_item_key.'&time='.time().'">Edit</a>';
    }
    return $output;
}

add_filter('manage_wcla_colors_posts_columns', 'wcla_columns_head_colors', 10);
add_action('manage_wcla_colors_posts_custom_column', 'wcla_columns_content_colors', 10, 2);
add_filter('manage_wcla_font_colors_posts_columns', 'wcla_columns_head_colors', 10);
add_action('manage_wcla_font_colors_posts_custom_column', 'wcla_columns_content_colors', 10, 2);


// CREATE TWO FUNCTIONS TO HANDLE THE COLUMN
function wcla_columns_head_colors($defaults) {
	unset($defaults["date"]);
    $defaults['wcla_color'] = 'Value';
    return $defaults;
}
function wcla_columns_content_colors($column_name, $post_ID) {
    if ($column_name == 'wcla_color') {
         echo '<span style="float: left; width: 55px; text-transform: uppercase;">'.get_post_meta($post_ID, 'wcla_color_hex_value', true).'</span><div style="background:'.get_post_meta($post_ID, 'wcla_color_hex_value', true).'; float: left; width:15px; height: 15px; border: 1px solid black;"></div>';
    }
}

add_filter('manage_wcla_fonts_posts_columns', 'wcla_columns_head_fonts', 10);
add_action('manage_wcla_fonts_posts_custom_column', 'wcla_columns_content_fonts', 10, 2); 

// CREATE TWO FUNCTIONS TO HANDLE THE COLUMN
function wcla_columns_head_fonts($defaults) {
	unset($defaults["date"]);
    $defaults['wcla_file'] = 'File';
    return $defaults;
}
function wcla_columns_content_fonts($column_name, $post_ID) {
    if ($column_name == 'wcla_file') {
    	$file=get_post_meta($post_ID, 'wcla_font_file_path', true);
			echo  end(explode('/',$file));
	    }
}



add_filter('manage_wcla_graphics_posts_columns', 'wcla_columns_head_gallery', 10);
add_action('manage_wcla_graphics_posts_custom_column', 'wcla_columns_content_gallery', 10, 2); 

// CREATE TWO FUNCTIONS TO HANDLE THE COLUMN
function wcla_columns_head_gallery($defaults) {
	unset($defaults["date"]);
    $defaults['wcla_file'] = 'Image';
    $defaults['wcla_category'] = 'Category';
    return $defaults;
}
function wcla_columns_content_gallery($column_name, $post_ID) {
    if ($column_name == 'wcla_file') {
    	$file=get_post_meta($post_ID, 'wcla_graphics_thumb_file_url', true);
			echo  '<img src="'.get_post_meta($post_ID, 'wcla_graphics_thumb_file_url', true).'" width="40">';
	    }
	 if ($column_name == 'wcla_category') {
	 		$category=get_term_by('id', get_post_meta($post_ID, 'wcla_graphics_category_id', true), 'lagraphics_categories');
			echo $category->name;
	    }    
}




add_action( 'before_delete_post', 'wcla_before_delete' );

function wcla_before_delete( $post_id ){

    // We check if the global post type isn't ours and just return
    global $post_type;   

    if ( $post_type == 'wcla_fonts' ) {
		 if(get_post_meta($post_id, 'wcla_font_file_path', true)!=''){
		    unlink(get_post_meta($post_id, 'wcla_font_file_path', true));
         }
    }
	
	if ( $post_type == 'wcla_graphics' ) {
			if(get_post_meta($post_id, 'wcla_graphics_file_path', true)!=''){
                unlink(get_post_meta($post_id, 'wcla_graphics_file_path', true));
            }
 			if(get_post_meta($post_id, 'wcla_graphics_thumb_file_path', true)!=''){
                unlink(get_post_meta($post_id, 'wcla_graphics_thumb_file_path', true));
            }
    }
    // My custom stuff for deleting my custom post type here
}


?>
