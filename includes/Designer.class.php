<?php

class Designer {

    public function __construct() {

        $this->setActionFilter();
    }

    public function setActionFilter() {
        // add_action('init', array($this, 'init'));
        $this->init();
        add_action('wp', array($this, 'localize_script'));

        // config json function
        add_action('wp_ajax_nopriv_wcla_config_json', array($this, 'config_json'), 100);
        add_action('wp_ajax_wcla_config_json', array($this, 'config_json'), 100);

        //products json function
        add_action('wp_ajax_nopriv_wcla_products_json', array($this, 'products_json'), 100);
        add_action('wp_ajax_wcla_products_json', array($this, 'products_json'), 100);

        //graphics json function
        add_action('wp_ajax_nopriv_wcla_graphics_json', array($this, 'graphics_json'), 100);
        add_action('wp_ajax_wcla_graphics_json', array($this, 'graphics_json'), 100);

        //colors json function 
        add_action('wp_ajax_nopriv_wcla_colors_json', array($this, 'colors_json'), 100);
        add_action('wp_ajax_wcla_colors_json', array($this, 'colors_json'), 100);

        //fonts json function
        add_action('wp_ajax_nopriv_wcla_fonts_json', array($this, 'fonts_json'), 100);
        add_action('wp_ajax_wcla_fonts_json', array($this, 'fonts_json'), 100);

        //upload image function
        add_action('wp_ajax_nopriv_wcla_upload_image', array($this, 'upload_image'), 100);
        add_action('wp_ajax_wcla_upload_image', array($this, 'upload_image'), 100);


        //quote json function
        add_action('wp_ajax_nopriv_wcla_quote_json', array($this, 'quote_json'), 100);
        add_action('wp_ajax_wcla_quote_json', array($this, 'quote_json'), 100);

        //load designs ajax funtion
        add_action('wp_ajax_nopriv_wcla_load_designs', array($this, 'load_designs'), 100);
        add_action('wp_ajax_wcla_load_designs', array($this, 'load_designs'), 100);

        //load design ajax function
        add_action('wp_ajax_nopriv_wcla_load_design', array($this, 'load_design'), 100);
        add_action('wp_ajax_wcla_load_design', array($this, 'load_design'), 100);

        //save design ajax function
        add_action('wp_ajax_nopriv_wcla_save_design', array($this, 'save_design'), 100);
        add_action('wp_ajax_wcla_save_design', array($this, 'save_design'), 100);

        //add to cart function
        add_action('wp_ajax_nopriv_wcla_add_to_cart', array($this, 'add_to_cart'), 100);
        add_action('wp_ajax_wcla_add_to_cart', array($this, 'add_to_cart'), 100);

        //locate plugin woocommerce template
        add_filter('woocommerce_locate_template', array($this, 'wcla_woocommerce_locate_template'), 10, 3);

        //woocommerce in cart thumbnail
        add_filter('woocommerce_cart_item_thumbnail', array($this, 'wcla_in_cart_product_thumbnail'), 10, 3);

        //woocommerce cart designer edit link filter
        add_filter('woocommerce_designer_edit_link', array($this, 'wcla_designer_edit_link'), 10, 3);

        //woocommerce cart filters
        add_filter('woocommerce_add_cart_item_data', array($this, 'add_cart_item_data'), 10, 2);
        add_filter('woocommerce_get_cart_item_from_session', array($this, 'get_cart_item_from_session'), 10, 2);
        add_filter('woocommerce_add_cart_item', array($this, 'add_cart_item'), 10, 1);
        add_action('woocommerce_add_order_item_meta', array($this, 'add_order_item_meta'), 10, 2);
        add_filter('woocommerce_get_item_data', array($this, 'get_item_data'), 10, 2);
    }

    public function init() {
        new WCLA_Color_Post_Type();
        new WCLA_Font_Color_Post_Type();
        new WCLA_Font_Post_Type();
        new WCLA_LAGraphics_Post_Type();
    }

    public function load_styles() {
        global $wp_styles;
        $wp_styles->queue = array();

        wp_enqueue_style('designer_bootstrap', DESIGNER_URL . 'assets/bootstrap/css/bootstrap.css');
    //   wp_enqueue_style('designer_bootstrap_responsive', DESIGNER_URL . 'assets/bootstrap/css/bootstrap-responsive.css');
       wp_enqueue_style('designer_nouislider_css', DESIGNER_URL . 'assets/css/jquery.nouislider.min.css');
       wp_enqueue_style('designer_color_picker', DESIGNER_URL . 'assets/css/colorPicker.css');

       wp_enqueue_style('designer_farbtastic', DESIGNER_URL . 'assets/css/farbtastic.css');
       wp_enqueue_style('designer_tooltipster', DESIGNER_URL . 'assets/css/tooltipster.css');
       wp_enqueue_style('designer_tooltipster_noir', DESIGNER_URL . 'assets/css/tooltipster-noir.css');

       wp_enqueue_style('designer_styles', DESIGNER_URL . 'assets/css/style.css');
      wp_enqueue_style('designer_style_fix', DESIGNER_URL . 'styles/fix.css');

     //  wp_enqueue_style('designer_fonts', DESIGNER_URL . 'fonts/fonts.css');
       wp_enqueue_style('designer_css_fonts', DESIGNER_FONTS_CSS_URL);
    }

    public function load_scripts() {
        global $wp_scripts;
        $wp_scripts->queue = array();
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

    //wp_register_script("designer_design_libs", DESIGNER_URL . "DesignerJS.js", array('jquery'), '2.2.2', false);

    //-----
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
    //-----


    wp_register_script("designer_nouislider", DESIGNER_URL . "assets/js/jquery.nouislider.min.js", array('jquery'), '2.2.1', false);
    wp_register_script("designer_printarea", DESIGNER_URL . "assets/js/jquery.PrintArea.js", array('jquery'), '2.2.1', false);
    
    wp_register_script("designer_farbtastic", DESIGNER_URL . "assets/js/farbtastic.js", array('jquery'), '2.2.1', false);
    wp_register_script("designer_tooltipster", DESIGNER_URL . "assets/js/jquery.tooltipster.min.js", array('jquery'), '2.2.1', false);
    
    
    

    wp_register_script("designer_ui", DESIGNER_URL . "assets/js/designer-ui-components.js", array('jquery'), '2.2.1', true);
    wp_register_script("designer", DESIGNER_URL . "UI.js", array('jquery'), '2.2.2', true);

    wp_enqueue_script('designer_knockout');
    wp_enqueue_script('designer_bootstrap');

    wp_enqueue_script('designer_nouislider');
    
    wp_enqueue_script('designer_farbtastic');
    wp_enqueue_script('designer_tooltipster');
    
    wp_enqueue_script('designer_colorpicker');

    wp_enqueue_script('designer_printarea');

    
    //wp_enqueue_script('knockout');
    wp_enqueue_script('lieveart_libs');
    wp_enqueue_script('designer_design_libs');

    wp_enqueue_script('designer_ui');
    wp_enqueue_script('designer');
    wp_localize_script('designer', 'AjaxRequest', array('ajaxurl' => admin_url('admin-ajax.php'), 'pluginurl' => DESIGNER_URL,'productid'=> (int)$_GET["productid"]==0?(int) WCLA_Utilities::get_option('wcla_product_id'):(int)$_GET["productid"],'design_id'=> (int)$_GET["design_id"]==0?0:(string)$_GET["design_id"],'cart_key'=> (int)$_GET["cart_key"]==0?0:(string)$_GET["cart_key"]));
    }

    public function localize_script() {
        if (is_page(array(DESIGNER_IFRAME_PAGE_ID, 'live-art'))) {
            add_action('wp_print_scripts', array($this, 'load_scripts'), 100);
            add_action('wp_print_styles', array($this, 'load_styles'), 100);
        }
    }

    function config_json() {
        $config = array(
            "productsList" => array(
                "url" => DESIGNER_PRODUCTS_URL_JSON,
            ),
            "defaultProductId" => (int) $_GET["productid"] == 0 ? (string) WCLA_Utilities::get_option('wcla_product_id')  : (string) $_GET["productid"],
            "defaultNameObjectText" => __("NAMES HERE", 'designer'),
            "defaultNumberObjectText" => "00",
            "defaultProductSize_" => array(32, 16),
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
            "options" => array(
                "deleteOnDoubleClick" => (boolean) WCLA_Utilities::get_option('delete_on_dbl_click'),
                "fontsCSSUrl" => DESIGNER_FONTS_CSS_URL,
                "includePrintingAreaInDesign" => true,
                "includeProductInDesign" => true,
                "includeMaskInDesign" => true,
                "maxZoom" => (int) WCLA_Utilities::get_option('wcla_max_zoom'),
                "minZoom" => (int) WCLA_Utilities::get_option('wcla_min_zoom'),
                "zoomEnabled" => (boolean) WCLA_Utilities::get_option('wcla_zoom_enabled'),
                "checkeredBackground" => false,
                "unit" => WCLA_Utilities::get_option('wcla_unit'),
                "unit2" => WCLA_Utilities::get_option('wcla_unit2'),
                "unitConversionMult" => (int) WCLA_Utilities::get_option('wcla_unit_multiplier'),
                "showProductSelector" => (boolean) WCLA_Utilities::get_option('wcla_show_product_selector'),
                "checkTextFXThrottle" => 400,
                "minDPU" => (int) WCLA_Utilities::get_option('wcla_min_dpu'),
            ),
            "textEffects" => array(
                "config" => DESIGNER_URL . "textEffects.json",
                // "url" => "http://hive.designerdesigner.com/mmjs/services/getTextZ.php"
                "url" => DESIGNER_GET_TEXT_Z_URL
            ),
            "assetsUrl" => DESIGNER_URL . "assets/",
            // "dpi" => 72,
            "getQuoteUrl" => DESIGNER_QUOTE_URL_JSON,
            "getDesignsUrl" => DESIGNER_LOAD_DESIGNS_URL,
            "saveDesignUrl" => DESIGNER_SAVE_DESIGN_URL,
            "loadDesignUrl" => DESIGNER_LOAD_DESIGN_URL,
            "redirectUrl" => DESIGNER_ADD_TO_CART_URL,
            "galleryBaseUrl" => "",
            "uploadImageUrl" => DESIGNER_UPLOAD_IMAGE_URL,
            "shareLinkUrl" => get_permalink(DESIGNER_DESIGNER_PAGE_ID) . '?design_id=${design_id}',
            "redirectWindow" => "parent"
        );
        echo json_encode($config);

        exit();
    }

    public function graphics_json() {

        $categories = get_terms('lagraphics_categories', array('hide_empty' => false, 'hierarchical' => true));

        $categoryHierarchy = array();
        $this->sort_terms_hierarchicaly($categories, $categoryHierarchy);


        $galleryList = array();
        $images = array();
        $gallery = new WP_Query();
        $gallery->query(
                array('post_type' => 'wcla_graphics', 'nopaging' => true));
        foreach ($gallery->posts as $image) {
            if (isset($categoryHierarchy[(string) get_post_meta($image->ID, 'wcla_graphics_category_id', true)])) {
                $jsonCatID = $categoryID = $categoryHierarchy[(string) get_post_meta($image->ID, 'wcla_graphics_category_id', true)]->slug;
            } else {
                $categoryID = (string) get_post_meta($image->ID, 'wcla_graphics_category_id', true);
                $jsonCatID = (int) get_post_meta($image->ID, 'wcla_graphics_category_id', true);
            }


            $imgdata = array(
                "id" => (string) $image->ID,
                "categoryId" => $categoryID,
                "name" => $image->post_title,
                "description" => get_post_meta($image->ID, 'wcla_graphics_desc', true),
                "thumb" => DESIGNER_GALLERY_UPLOAD_URL . get_post_meta($image->ID, 'wcla_graphics_thumb_file', true),
                "image" => DESIGNER_GALLERY_UPLOAD_URL . get_post_meta($image->ID, 'wcla_graphics_file', true),
            );
            if (get_post_meta($image->ID, 'wcla_graphics_colorizable', true)) {
                $imgdata["colorize"] = true;
            }
            $colorizableElements = get_post_meta($image->ID, 'wcla_graphic_colorizable_elements', true);
            if ($colorizableElements) {
                $imgdata["multicolor"] = true;
                $colElements = array();
                foreach ($colorizableElements as $idx => $cel) {

                    if (!$cel["colors"])
                        unset($cel["colors"]);
                    else {
                        $cecols = array();
                        foreach ($cel["colors"] as $color) {
                            $cecols[] = $color;
                        }
                        $cel["colors"] = $cecols;
                    }
                    $colElements[] = $cel;
                }
                $imgdata["colorizableElements"] = $colElements;
            } else {
                $imgdata["colors"] = "-1";
            }

            $images[$jsonCatID][] = $imgdata;
        }



        foreach ($categoryHierarchy as $catid => $Category) {
            $term_meta = get_option("taxonomy_$catid");

            $thumbnail_id = $term_meta["thumbnail_id"];

            if ($thumbnail_id) {
                $image = wp_get_attachment_thumb_url($thumbnail_id);
            } else {
                $image = wc_placeholder_img_src();
            }

            $image = str_replace(' ', '%20', $image);
            $catData = array(
                "id" => $catid,
                "name" => $Category->name,
                "thumb" => $image,
            );
            if (count($Category->children) > 0) {

                $catData["categories"] = $this->getGraphicsCategoryChildrenData($Category->children, $images);
            }
            $catData["graphicsList"] = isset($images[$Category->slug]) ? $images[$Category->slug] : array();

            $galleryList["graphicsCategoriesList"][] = $catData;
        }
        echo json_encode($galleryList);
        exit;
    }

    public function getGraphicsCategoryChildrenData($children, $images, $catData = array()) {
        $result = array();
        foreach ($children as $catid => $category) {
            $term_meta = get_option("taxonomy_$catid");
            $thumbnail_id = absint($term_meta["thumbnail_id"]);

            if ($thumbnail_id) {
                $image = wp_get_attachment_thumb_url($thumbnail_id);
            } else {
                $image = wc_placeholder_img_src();
            }
            $catData = array(
                "id" => $category->term_id,
                "name" => $category->name,
                "thumb" => $image,
            );
            if (count($category->children) > 0) {
                $catData["categories"] = $this->getGraphicsCategoryChildrenData($category->children, $images, $catData);
            } else {
                // $catData["graphicsList"]=isset($images[$category->term_id])?$images[$category->term_id]:array();
            }
            $catData["graphicsList"] = isset($images[$category->term_id]) ? $images[$category->term_id] : array();
            $result[] = $catData;
        }



        return $result;
    }

    public function sort_terms_hierarchicaly(Array &$cats, Array &$into, $parentId = 0) {
        foreach ($cats as $i => $cat) {
            if ($cat->parent == $parentId) {
                $into[$cat->term_id] = $cat;
                unset($cats[$i]);
            }
        }

        foreach ($into as $topCat) {
            $topCat->children = array();
            $this->sort_terms_hierarchicaly($cats, $topCat->children, $topCat->term_id);
        }
    }

    public function colors_json() {

        $output = array();

        $colors = new WP_Query();
        $colors->query(
                array('post_type' => 'wcla_colors', 'nopaging' => true));
        foreach ($colors->posts as $color) {
            $output["colors"][] = array("name" => $color->post_title, "value" => get_post_meta($color->ID, 'wcla_color_hex_value', true));
        }

        echo json_encode($output);

        exit;
    }

    public function fonts_json() {

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
            $output["fonts"][] = array(
                "name" => $font->post_title,
                "fontFamily" => get_post_meta($font->ID, 'wcla_font_system_name', true)==''?get_post_meta($font->ID, 'wcla_font_family', true):get_post_meta($font->ID, 'wcla_font_system_name', true),
                "ascent" => (int) get_post_meta($font->ID, 'wcla_font_ascent', true),
                "vector" => DESIGNER_FONTS_UPLOAD_URL . get_post_meta($font->ID, 'wcla_font_vector_file', true));
        }

        echo json_encode($output);
        exit;
    }

    public function get_pruduct_categories($parent = 0) {
        $args = array(
            'orderby' => 'name',
            'order' => 'ASC',
            'hide_empty' => true,
            'number' => '',
            'fields' => 'all',
            'hierarchical' => true,
            'child_of' => $parent,
        );

        $categories = get_terms('product_cat', $args);

        $categoryHierarchy = array();
        $this->sort_terms_hierarchicaly($categories, $categoryHierarchy);

        return $categoryHierarchy;
    }

    public function get_product_list() {
        $standardColors = array();
        $colorsquery = new WP_Query();
        $colorsquery->query(
                array('post_type' => 'wcla_colors', 'nopaging' => true));
        foreach ($colorsquery->posts as $colorq) {
            $standardColors[] = array("name" => $colorq->post_title, "value" => get_post_meta($colorq->ID, 'wcla_color_hex_value', true));
        }

        $catlist = array();
        $cats = $this->get_pruduct_categories();
        $catData = array();
        foreach ($cats as $catid => $category) {
            $thumbnail_id = get_woocommerce_term_meta($category->term_id, 'thumbnail_id', true);
            $img = wp_get_attachment_url($thumbnail_id);
            $catData = array(
                'id' => $category->term_id,
                'name' => $category->name,
                'thumbUrl' => $img,
            );
            if (count($category->children) > 0) {
                $catData["categories"] = $this->getProductCategoryChildreData($category->children, $standardColors, $catData);
            } else {
                $catData["products"] = $this->getCategoryProducts($category, $standardColors);
            }
            $catlist["productCategoriesList"][] = $catData;
        }

        return $catlist;
    }

    public function products_json() {
        echo json_encode($this->get_product_list());
        exit;
    }

    public function getCategoryProducts($category, $standardColors) {
        global $product;

        $products = array();
        $args = array('post_type' => 'product', 'posts_per_page' => -1, 'product_cat' => $category->slug, 'meta_query' => array(
                array(
                    'key' => 'wcla_able_for_design',
                    'value' => 'yes',
                )
        ));
        $loop = new WP_Query($args);
        if ($loop->have_posts()) {

            while ($loop->have_posts()):
                $sizes = array();
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
                        if ($img_id != 0) {
                            $img = wp_get_attachment_url($img_id);
                            $loc["image"] = $img;
                            $clocations[] = $loc;
                        }
                    }

                    $lcolor = array(
                        "name" => $color["color_name"],
                        "value" => $color["color_value"],
                    );
                    if (count($clocations) > 0) {
                        $lcolor["location"] = $clocations;
                    }
                    $colors[] = $lcolor;
                }

                //if($post->ID==299) var_dump ($colors);
                $resizable = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_resizeable', true));
                $plocations = array();
                foreach ($prodLocations as $k => $location) {
                    $img_id = $location["image"];
                    $img = wp_get_attachment_url($img_id);
                    $currLocation = array(
                        "name" => $location["name"],
                        "image" => $img,
                    );
                    if (isset($location["editable_area"]) && $location["editable_area"] != "") {
                        $currLocation["editableArea"] = array_map('floatval', explode(',', $location["editable_area"]));
                    }
                    if (isset($location["editable_area_cliprect"]) && $location["editable_area_cliprect"] != "") {
                        $currLocation["clipRect"] = array_map('floatval', explode(',', $location["editable_area_cliprect"]));
                    }

                    if (isset($location["editable_area_width"]) && $location["editable_area_width"] != "" && isset($location["editable_area_height"]) && $location["editable_area_height"] != "") {
                        $currLocation["editableAreaUnits"] = array_map('floatval', explode(',', $location["editable_area_width"] . ',' . $location["editable_area_height"]));
                    }

                    if ($resizable == "yes") {
                        if (isset($location["editable_area_min_range_width"])&& $location["editable_area_min_range_width"] != "" &&
                        isset($location["editable_area_max_range_width"])&& $location["editable_area_max_range_width"] != "" &&
                        isset($location["editable_area_min_range_height"])&& $location["editable_area_min_range_height"] != "" &&
                        isset($location["editable_area_max_range_height"])&& $location["editable_area_max_range_height"] != "")

                         {
                            $currLocation["editableAreaUnitsRange"] = array(
                                array_map('floatval', explode(',', $location["editable_area_min_range_width"] . ',' . $location["editable_area_max_range_width"] . ($location["editable_area_range_width_step"] == '' ? '' : ','.$location["editable_area_range_width_step"]))),
                                array_map('floatval', explode(',', $location["editable_area_min_range_height"] . ',' . $location["editable_area_max_range_height"] . ($location["editable_area_range_height_step"] == '' ? '' : ','.$location["editable_area_range_height_step"])))
                            );
                        }
                    }

                    if (isset($location["mask"]) && $location["mask"] != 0) {
                        $img_id = $location["mask"];
                        $img = wp_get_attachment_url($img_id);
                        $currLocation["mask"] = $img;
                    }


                    $plocations[] = $currLocation;
                }

                $prodSizes = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_sizes', true));
                $colorizable_elements = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_colorizable_elements', array()));
//                var_dump($colorizable_elements);

                foreach ($prodSizes as $k => $size)
                    $sizes[] = $size;

                // foreach ($colorizable_elements[0] as $k => $element) {

                //     if (count($element["colors"]) > 0) {
                //         $elcolors = array();
                //         foreach ($element["colors"] as $_k => $kcolor) {
                //             $elcolors[] = $kcolor;
                //         }
                //         $colorizable_elements[0][$k]["colors"] = $elcolors;
                //     }
                // }

                //$colorizable_elements[0][0]["colors"]=$col_el_colors;
                $multicolor = count($colorizable_elements[0]) > 0 ? true : false;


                $wcproduct = get_product($post->ID);

                $product = array(
                    "id" => $post->ID,
                    "categoryId" => $category->term_id,
                    "name" => $post->post_title,
                    "thumbUrl" => $thumb_image,
                    "locations" => $plocations,                    
                    "description" => $post->post_excerpt,
                    "multicolor" => $multicolor,
                    "colorizableElements" => $colorizable_elements[0],
                    "data" => array(
                        "price" => $wcproduct->get_price()
                    )
                );
                if(count($sizes)){
                    $product["sizes"] = $sizes;
                }
                if (count($colors) > 0) {
                    $product["colors"] = $colors;
                }



                $show_ruler = maybe_unserialize(get_post_meta($post->ID, 'wcla_product_show_ruler', true));
                $wcla_hide_editable_area_border = maybe_unserialize(get_post_meta($post->ID, 'wcla_hide_editable_area_border', true));
                $namesNumbersEnabled = maybe_unserialize(get_post_meta($post->ID, 'wcla_name_numbers', true));
                //var_dump($resizable);
                if ($wcla_hide_editable_area_border == "yes") {
                    $product["hideEditableAreaBorder"] = true;
                } else {
                    $product["hideEditableAreaBorder"] = false;
                }
                if ($resizable == "yes") {
                    $product["resizable"] = true;
                } else {
                    $product["resizable"] = false;
                }

                if ($show_ruler == "yes") {
                    $product["showRuler"] = true;
                } else {
                    $product["showRuler"] = false;
                }

                if ($namesNumbersEnabled == "yes") {
                    $product["namesNumbersEnabled"] = true;
                } else {
                    $product["namesNumbersEnabled"] = false;
                }

                $editableAreaSizes = maybe_unserialize(get_post_meta($post->ID, 'wcla_editable_area_sizes', true));
                if (count($editableAreaSizes) > 0) {
                    $product["editableAreaSizes"] = $editableAreaSizes;
                }

                $products[] = $product;

            endwhile;
            //$catlist["productCategoriesList"][] = $catdata;
            wp_reset_query();
        }

        return $products;
    }

    public function getProductCategoryChildreData($children, $standardColors, $catData = array()) {

        $result = array();
        foreach ($children as $catid => $category) {
            $thumbnail_id = get_woocommerce_term_meta($category->term_id, 'thumbnail_id', true);
            $img = wp_get_attachment_url($thumbnail_id);
            $catData["id"] = $category->term_id;
            $catData["name"] = $category->name;
            $catData["thumbUrl"] = $img;

            if (count($category->children) > 0) {
                $catData["categories"] = $this->getProductCategoryChildreData($category->children, $catData);
            } else {
                $catData["products"] = $this->getCategoryProducts($category, $standardColors);
            }
            $result[] = $catData;
        }
        return $result;
    }

    public function upload_image() {
        if ($_FILES['Filedata']['size'] || $_FILES['image']['size']) {
            $file = isset($_FILES['Filedata']) ? $_FILES['Filedata'] : $_FILES['image'];
            $path = DESIGNER_GALLERY_UPLOAD_DIR;
            if (!is_dir($path)) {
                mkdir($path);
            }
            $name = time() . '_' . $file['name'];
            move_uploaded_file($file['tmp_name'], $path . $name);
            //echo json_encode(array("url" => DESIGNER_GALLERY_UPLOAD_URL . $name));
            echo DESIGNER_GALLERY_UPLOAD_URL . $name;
        }
        exit;
    }

    /*
     * getQuote Designer Function
     */

    public function quote_json() {
        global $product;
        // get and process data
        $data = json_decode(stripslashes($_POST['data']));
        //var_dump($data);
        //  get_product($data->product->id);
        if ($data->product->id)
            $product = get_product($data->product->id);
        else
            $product = get_product(WCLA_Utilities::get_option('wcla_product_id'));

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

    public function load_designs() {
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

    public function load_design() {
        $design_id = $_REQUEST["design_id"];
        $design = $this->load_design_data($design_id);
        echo stripcslashes($design->data);
        exit;
    }

    public function save_design() {
        global $wpdb;
        $data['email'] = isset($_POST["email"]) ? $_POST["email"] : '';
        $data["data"] = isset($_POST["data"]) ? $_POST["data"] : '';
        //echo $_POST["data"];
        $data["title"] = isset($_POST["title"]) ? $_POST["title"] : NULL;
        $data["updated"] = time();

        $designId = isset($_POST["id"]) ? $_POST["id"] : uniqid();
        $data["design_id"] = $designId;
        $id = $wpdb->get_var($wpdb->prepare("SELECT id
		FROM {$wpdb->prefix}wcla_designer_design
		WHERE design_id = %s", $designId
        ));


        $saveData = json_decode(stripslashes_deep($data["data"]));
        $locations = $saveData->data->locations;

        $images = $this->generateImages($designId, $locations);

        $data["info"] = serialize(array("images" => $images));
        if ($id) {
            $wpdb->update($wpdb->prefix . "wcla_designer_design", $data, array('id' => $id));
        } else {
            $wpdb->insert($wpdb->prefix . "wcla_designer_design", $data);
        }

        $response = array('design' => array(
                'id' => $designId,
                'title' => $data["title"]
        ));

        echo json_encode($response);
        exit;
    }

    public function generateImages($designId, $locations) {
        $image = array();
        foreach ($locations as $location) {
            $baseSvg = $location->svg;
            $svg = $baseSvg;
            //$baseSvg = str_replace('NS1:', 'xlink:', $baseSvg);
           
                if (!is_array($images[$location->name])) {
                    $images[$location->name] = array();
                }

                $basePath = DESIGNER_DESIGNS_DIR . $designId . '/';
                if (!file_exists($basePath)) {
                    mkdir($basePath, 0777, true);
                }

                $baseSvgForConvert = $baseSvg;

                preg_match_all('|xlink:href="(.*)"|U', $baseSvgForConvert, $matches);
                if (isset($matches[1][0])) {
                    $textImageIndex = 0;
                    foreach ($matches[1] as $url) {
                        if (strpos($url, DESIGNER_UPLOAD_URL) !== false) {
                            $imagePath = str_replace(DESIGNER_UPLOAD_URL, DESIGNER_UPLOAD_DIR, $url);
                            $imageFilename = pathinfo($imagePath, PATHINFO_BASENAME);
                            copy($imagePath, $basePath . $imageFilename);
                            $baseSvgForConvert = str_replace($url, $imageFilename, $baseSvgForConvert);
                        }
                    }
                }

                // Gallery images
                preg_match_all('|la-source-url="(.*)"|U', $baseSvgForConvert, $matches);
                if (isset($matches[1][0])) {
                    foreach ($matches[1] as $url) {
                        if (strpos($url, DESIGNER_UPLOAD_URL) !== false) {
                            $imagePath = str_replace(DESIGNER_UPLOAD_URL, DESIGNER_UPLOAD_DIR, $url);
                            $imageFilename = pathinfo($imagePath, PATHINFO_BASENAME);
                            copy($imagePath, $basePath . $imageFilename);
                            $baseSvgForConvert = str_replace($url, $imageFilename, $baseSvgForConvert);
                        }
                    }
                }

                // Replace fonts name to system fonts names (need for convertion)            

                $fonts = new WP_Query();
                $fonts->query(
                        array('post_type' => 'wcla_fonts', 'nopaging' => true));

                foreach ($fonts->posts as $font) {

                    if (!get_post_meta($font->ID, 'wcla_font_system_name', true))
                        continue;
                    $baseSvgForConvert = str_replace('"' . get_post_meta($font->ID, 'wcla_font_family', true) . '"', '"' . get_post_meta($font->ID, 'wcla_font_system_name', true) . '"', $baseSvgForConvert);
                    $baseSvgForConvert = preg_replace('|font-family: [\']*' . get_post_meta($font->ID, 'wcla_font_family', true) . '[\']*;|U', 'font-family: ' . get_post_meta($font->ID, 'wcla_font_system_name', true) . ';', $baseSvgForConvert);
                }


                $imagePathSvg = $basePath . $designId . '_' . $location->name . '.svg';

                $svgForConvert = $baseSvgForConvert;


                file_put_contents($imagePathSvg, $svgForConvert);



                $filename = $designId . '_' . $location->name;
                $convertMethod = WCLA_Utilities::get_option('wcla_convert_method');
                //var_dump($convertMethod);die;
            if (WCLA_Utilities::get_option('wcla_enable_convert')) {
                switch ($convertMethod) {
                    case 'imagick':
                        //exec('convert ' . $imagePathSvg . ' -resize ' . $imageWidth . 'x' . $imageHeight . ' ' . $basePath . $filename . '.jpg', $output);
                        exec('/usr/local/bin/convert ' . $imagePathSvg . ' ' . $basePath . $filename . '.jpg', $output);
                        //echo 'inkscape --export-png=' . $basePath . $filename . '.png' . ' --export-background-opacity=0 --without-gui ' . $imagePathSvg;
                        break;
                    case 'inkscape':
                        exec('inkscape --export-png=' . $basePath . $filename . '.png' . ' --export-background-opacity=0 --without-gui ' . $imagePathSvg, $output);
                        exec('/usr/local/bin/convert ' . $basePath . $filename . '.png' . ' ' . $basePath . $filename . '.jpg', $output);
                        break;
                }

                
            }
            unlink($imagePathSvg);
            // ************************
            // Save svg
            file_put_contents($imagePathSvg, $svg);

            $images[$location->name]['svg'] = $filename . '.svg';
            if (file_exists($basePath . $filename . '.jpg')) {
                $images[$location->name]['jpg'] = $filename . '.jpg';
            }
            if (file_exists($basePath . $filename . '.png')) {
                $images[$location->name]['png'] = $filename . '.jpg';
            }
        }
        return $images;
    }

    public function load_design_data($design_id) {
        global $wpdb;
        $design = $wpdb->get_row("SELECT * FROM {$wpdb->prefix}wcla_designer_design WHERE design_id='" . $wpdb->escape($design_id) . "'");
        return $design;
    }

    public function wcla_woocommerce_locate_template($template, $template_name, $template_path) {

        global $woocommerce;

        $_template = $template;

        if (!$template_path)
            $template_path = $woocommerce->template_url;

        $plugin_path = DESIGNER_DIR . 'woocommerce/';

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

    public function wcla_in_cart_product_thumbnail($image, $values, $cart_item_key) {

        if (isset($values["design_id"])) {

            $design_data = $this->load_design_data($values["design_id"]);
            $design = json_decode(stripslashes_deep($design_data->data));
            //var_dump($design->data->locations);
            $output = '';
            foreach ($design->data->locations as $location) {
                //$output.=$location->svg;
                //$output.='<img src="' . DESIGNER_DESIGNS_URL . 'image_' . $values["design_id"] . '_' . $location->name . '_.svg">';
                $output.='<embed style="width:50px;height:50px;max-width:587px;padding:0;margin:0;" src="' . DESIGNER_DESIGNS_URL . $values["design_id"].'/' . $values["design_id"] . '_' . $location->name . '.svg" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/"></embed>';
            }
            return $output;
        } else
            return $image;
    }

    public function wcla_designer_edit_link($values, $cart_item_key) {
        $output = '';
        if (isset($values["design_id"])) {
            $output.='<a href="' . get_permalink(DESIGNER_DESIGNER_PAGE_ID) . '?design_id=' . $values["design_id"] . '&cart_key=' . $cart_item_key . '&time=' . time() . '">Edit</a>';
        }
        return $output;
    }

    public function add_to_cart() {
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

        wp_safe_redirect($woocommerce->cart->get_cart_url());
        exit;
    }

    public function add_cart_item_data($cart_item_meta, $product_id) {
        global $woocommerce;
        return $cart_item_meta;
    }

    public function get_cart_item_from_session($cart_item, $values) {

        if (!empty($values['design_id'])) {
            $cart_item['design_id'] = $values['design_id'];
        }
        return $cart_item;
    }

    public function add_cart_item($cart_item) {
        return $cart_item;
    }

    public function add_order_item_meta($item_id, $cart_item) {
        woocommerce_add_order_item_meta($item_id, 'wcla_design_id', $cart_item["design_id"]);
    }

    public function get_item_data($item_data, $cart_item) {
        return $item_data;
    }

}
