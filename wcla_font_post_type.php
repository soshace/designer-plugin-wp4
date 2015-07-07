<?php
/**
 * @category   Peexl
 * @package    Peexl
 * @copyright  Copyright (c) 2014 Peexl Web Development (http://www.peexl.com)
 * @license    http://framework.zend.com/license/new-bsd    New BSD License
 * @version    1.0
 */

class WCLA_Font_Post_Type {

    private $fontsBasePath;
    private $fontsBaseUrl;

    public function __construct() {
        $uploadsDir = wp_upload_dir();
        $this->fontsBasePath = $uploadsDir["basedir"] . '/wcla/fonts/';
        $this->fontsBaseUrl = $uploadsDir["baseurl"] . '/wcla/fonts/';
        // load_plugin_textdomain('mma', false, basename(dirname(__FILE__)) . '/languages');
        $this->register_post_type();
        $this->setActionFilters();
        $this->metaboxes();

        add_action('post_edit_form_tag', 'post_edit_form_tag');

        function post_edit_form_tag() {
            echo ' enctype="multipart/form-data"';
        }

    }

    private function setActionFilters() {
        add_filter('manage_wcla_fonts_posts_columns', array($this, 'wcla_columns_head_fonts'), 10);
        add_action('manage_wcla_fonts_posts_custom_column', array($this, 'wcla_columns_content_fonts'), 10, 2);
    }

    public function getFontsBaseUrl() {
        return $this->fontsBaseUrl;
    }

    public function getFontsBasePath() {
        return $this->fontsBasePath;
    }

    public function register_post_type() {
        $args = array(
            'labels' => array(
                'name' => __('Fonts', 'liveart'),
                'singular_name' => __('Font', 'liveart'),
                'add_new_item' => __('Add new Font', 'liveart'),
                'add_new' => __('Add new Font', 'liveart'),
                'edit_item' => __('Edit Item', 'liveart'),
                'view_item' => __('View item', 'liveart'),
                'not_found' => __('No Font Found', 'liveart'),
                'not_found_in_trash' => __('No Font found in trash', 'liveart')
            ),
            'query_var' => 'wcla_fonts',
            'rewrite' => array(
                'slug' => 'wcla_fonts',
            ),
            'public' => true,
            'menu_position' => 49,
            'supports' => array(
                'title',
            //'thumbnail',
            //'editor',
            //'custom-fields'		
            ),
            //'show_ui'=>false,
            'show_in_nav_menus' => false,
            'show_in_menu' => false,
        );
        register_post_type('wcla_fonts', $args);
    }

    public function metaboxes() {
        add_action('add_meta_boxes', function() {
            //css id,title,callback func,page,priority, callback func arguments            
            add_meta_box('wcla_font_file', __('Font Details', 'liveart'), 'wcla_font_file_cb', 'wcla_fonts');
        });

        add_action('add_meta_boxes', function() {
            //css id,title,callback func,page,priority, callback func arguments            
            add_meta_box('wcla_system_fonts', __('System Fonts', 'liveart'), 'wcla_system_fonts_cb', 'wcla_fonts');
        });

        function wcla_font_file_cb($post) {
            //wp_nonce_field(__FILE__, 'mma_nonce');
            $files = get_post_meta($post->ID, 'wcla_font_file', true);
            ?> 
            <p>          			
                <label for="wcla_font_family"><?php echo __('Font Family', 'liveart') ?>:</label>            
                <input type="text" id="wcla_font_family" name="wcla_font_family" value="<?php echo get_post_meta($post->ID, 'wcla_font_family', true) ?>" class="wide50pct" />                                                
            </p>
            <div class="note" ><?php echo __('The Font Family', 'liveart') ?>.</div>
            <p>          			
                <label for="wcla_font_system_name"><?php echo __('System Name', 'liveart') ?>:</label>            
                <input type="text" id="wcla_font_system_name" name="wcla_font_system_name" value="<?php echo get_post_meta($post->ID, 'wcla_font_system_name', true) ?>" class="wide50pct" />                       
            </p>
            <div class="note wide50pct" ><?php echo __('Need for converting. Use <b>bold</b> name from System Fonts below (font should appear there after saving)', 'liveart') ?>.</div>

            <p>
                <label for="wcla_font_file">
                    <?php echo __('File(Normal)', 'liveart') ?>:
                </label>
                <input type="file" id="wcla_font_file" name="wcla_font_file[normal_normal]" value="" />                
                <?php if (isset($files["normal_normal"])): ?>
                    <br>
                    <span class="font-filename"><?php echo $files["normal_normal"] ?></span>
                <?php endif; ?>

            </p>
            <p>
                <label for="wcla_font_file">
                    <?php echo __('File(Bold)', 'liveart') ?>:
                </label>
                <input type="file" id="wcla_font_file" name="wcla_font_file[bold_normal]" value="" />    
                <?php if (isset($files["bold_normal"])): ?>
                    <br>
                    <span class="font-filename"><?php echo $files["bold_normal"] ?></span>
                <?php endif; ?>
            </p>
            <p>
                <label for="wcla_font_file">
                    <?php echo __('File(Italic)', 'liveart') ?>:
                </label>
                <input type="file" id="wcla_font_file" name="wcla_font_file[normal_italic]" value="" />     
                <?php if (isset($files["normal_italic"])): ?>
                    <br>
                    <span class="font-filename"><?php echo $files["normal_italic"] ?></span>
                <?php endif; ?>
            </p>
            <p>
                <label for="wcla_font_file">
                    <?php echo __('File(Bold & Italic)', 'liveart') ?>:
                </label>
                <input type="file" id="wcla_font_file" name="wcla_font_file[bold_italic]" value="" />   
                <?php if (isset($files["bold_italic"])): ?>
                    <br>
                    <span class="font-filename"><?php echo $files["bold_italic"] ?></span>
                <?php endif; ?>
            </p>
            <p>          			
                <label for="wcla_font_ascent"><?php echo __('Ascent', 'liveart') ?>:</label>            
                <input type="text" id="wcla_font_ascent" name="wcla_font_ascent" value="<?php echo get_post_meta($post->ID, 'wcla_font_ascent', true) ?>" class="wide50pct" />                       
            </p>
            <p>
                <?php echo WCLA_Utilities::selectYesNo('wcla_font_bold_allowed', 'Bold Allowed', get_post_meta($post->ID, 'wcla_font_bold_allowed', true)) ?>
            </p>
            <p>
                <?php echo WCLA_Utilities::selectYesNo('wcla_font_italic_allowed', 'Italic Allowed', get_post_meta($post->ID, 'wcla_font_italic_allowed', true)) ?>
            </p>
            <p>
                <label for="wcla_font_vector_file">
                    <?php echo __('Vector File', 'liveart') ?>:
                </label>
                <input type="file" id="wcla_font_vector_file" name="wcla_font_vector_file" value="" /> 
                <?php if (get_post_meta($post->ID, 'wcla_font_vector_file', true)): ?>
                    <br>
                    <span class="font-filename"><?php echo get_post_meta($post->ID, 'wcla_font_vector_file', true) ?></span>
                <?php endif; ?>
            </p>

            <?php wp_nonce_field(plugin_basename(__FILE__), 'font_file_nonce'); ?>
            <?php
        }

        function wcla_system_fonts_cb($post) {
            ?>

            <div class="entry-edit">                
                <div class="fieldset" style="max-height: 500px; overflow: auto;padding: 0 10px;">
                    <?php foreach (WCLA_Font_Post_Type::getSystemFonts() as $i => $font): ?>
                        <ul style="background: #eee; margin-bottom: 10px; padding: 10px 15px;">
                            <li><?php echo $i + 1 ?>. <strong><?php echo trim(str_replace('family:', '', $font['family'])) ?></strong></li>
                            <?php foreach ($font as $fontParameter): ?>
                                <li><?php echo $fontParameter ?></li>
                            <?php endforeach ?>
                        </ul>
                    <?php endforeach ?>
                </div>
            </div>

            <?php
        }

        add_action('save_post', function($post_id) {
            if ($_POST /* && wp_verify_nonce($_POST["mma_nonce"], __FILE__) */) {

                if (user_can_save($post_id, plugin_basename(__FILE__), 'font_file_nonce')) {
                    //var_dump($_FILES);die(); 

                    update_post_meta($post_id, 'wcla_font_family', $_POST["wcla_font_family"]);
                    update_post_meta($post_id, 'wcla_font_system_name', $_POST["wcla_font_system_name"]);
                    update_post_meta($post_id, 'wcla_font_bold_allowed', $_POST["wcla_font_bold_allowed"]);
                    update_post_meta($post_id, 'wcla_font_italic_allowed', $_POST["wcla_font_italic_allowed"]);
                    update_post_meta($post_id, 'wcla_font_ascent', $_POST["wcla_font_ascent"]);




                    $fontFilesPaths = array();
                    $vectorFilePath = null;
                    $fontDir = sanitize_title($_POST["wcla_font_family"]);
                    if (has_files_to_upload('wcla_font_file')) {


                        if (is_array($_FILES['wcla_font_file']["name"])) {

                            foreach ($_FILES['wcla_font_file']['name'] as $inputName => $filename) {

                                if ($filename) {

                                    $file = wp_upload_bits($_FILES['wcla_font_file']['name'][$inputName], null, @file_get_contents($_FILES['wcla_font_file']['tmp_name'][$inputName]));

                                    if (FALSE === $file['error']) {
                                        $fontFilesPaths[$inputName] = $fontDir . '/' . pathinfo($file["file"], PATHINFO_FILENAME) . '.' . pathinfo($file["file"], PATHINFO_EXTENSION);
                                    }

                                    update_post_meta($post_id, 'wcla_font_file', $fontFilesPaths);
                                }
                            }
                        }
//                       
                    }

                    if (has_files_to_upload('wcla_font_vector_file')) {
                        if (isset($_FILES['wcla_font_vector_file'])) {

                            $file = wp_upload_bits($_FILES['wcla_font_vector_file']['name'], null, @file_get_contents($_FILES['wcla_font_vector_file']['tmp_name']));

                            if (FALSE === $file['error']) {
                                update_post_meta($post_id, 'wcla_font_vector_file', $fontDir . '/' . pathinfo($file["file"], PATHINFO_FILENAME) . '.' . pathinfo($file["file"], PATHINFO_EXTENSION));
                            }
                        }
                    }
                }

                self::buildFontCSS();
            }
        });
    }

    public static function getSystemFonts() {
        //exec ('fc-cache /home/zemsapparel/.fonts -v',$output);
       // var_dump($output);
        $fonts = array();
        exec('/usr/local/bin/convert -list font', $output);
     //   var_dump($output);
        

        for ($i = 2, $index = 0; $i < count($output); $i += 6, $index++) {
            if (strpos($output[$i], 'Font:') === false)
                $i++;
            $fonts[$index] = array(
                'font' => $output[$i + 0],
                'family' => $output[$i + 1],
                'style' => $output[$i + 2],
                'stretch' => $output[$i + 3],
                'weight' => $output[$i + 4],
                'glyphs' => $output[$i + 5]
            );
        }

        return $fonts;
    }

    public static function buildFontCSS() {
        $css = '';
        $fonts = new WP_Query();
        $fonts->query(array('post_type' => 'wcla_fonts', 'nopaging' => true));
        foreach ($fonts->posts as $font) {
            $fontFiles = get_post_meta($font->ID, 'wcla_font_file', true);
            if(count($fontFiles)>0){
                foreach ($fontFiles as $type => $fontFile) {
                    list($weight, $style) = explode('_', $type);
                    $css .="@font-face {\n";
                    $css .="    font-family: ";
                    $css .= get_post_meta($font->ID, 'wcla_font_system_name', true)==''?get_post_meta($font->ID, 'wcla_font_family', true):get_post_meta($font->ID, 'wcla_font_system_name', true) . ';' . "\n" .
                            '    src: url("' . DESIGNER_FONTS_UPLOAD_URL . $fontFile . '");' . "\n" .
                            '    font-weight: ' . $weight . ';' . "\n" .
                            '    font-style: ' . $style . ';' . "\n" .
                            '}' . "\n";
                }
            }
            
        }

        file_put_contents(DESIGNER_CSS_DIR . 'fonts.css', $css);
    }

// CREATE TWO FUNCTIONS TO HANDLE THE COLUMN
    function wcla_columns_head_fonts($defaults) {
        unset($defaults["date"]);
        $defaults['wcla_font_family'] = __('Font Family', 'liveart');
        $defaults['wcla_font_system_name'] = __('System Name', 'liveart');
        $defaults['wcla_font_example'] = __('Example', 'liveart');
        return $defaults;
    }

    function wcla_columns_content_fonts($column_name, $post_ID) {
        switch ($column_name) {
            case 'wcla_font_example':
                echo '<span style="font-family:' . get_post_meta($post_ID, 'wcla_font_family', true) . '; font-size: 15px">Grumpy wizards make toxic brew for the evil Queen and Jack.</span>';
                break;
            case 'wcla_font_system_name':
                echo get_post_meta($post_ID, 'wcla_font_system_name', true);
                break;
            case 'wcla_font_family':
                echo get_post_meta($post_ID, 'wcla_font_family', true);
                break;
        }
    }

}
?>