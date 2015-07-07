<?php
/**
 * @category   Peexl
 * @package    Peexl
 * @copyright  Copyright (c) 2014 Peexl Web Development (http://www.peexl.com)
 * @license    http://framework.zend.com/license/new-bsd    New BSD License
 * @version    1.0
 */
class WCLA_Utilities {

    const SETTINGS_NAMESPACE = 'designer_settings';
    
    public static function selectYesNo($name, $label, $selectedValue = 1) {
        ?>
        <label for="<?php echo $name ?>">
            <?php echo __($label, 'designer') ?>:
        </label>
        <select name="<?php echo $name ?>" id="<?php echo $name ?>" class="wide25pct">
            <option value="1" <?php echo ($selectedValue == 1 ? 'selected="selected"' : '') ?>><?php echo __('Yes', 'designer') ?>
            <option value="0" <?php echo ($selectedValue == 0 ? 'selected="selected"' : '') ?>><?php echo __('No', 'designer') ?>
        </select>    
        <?php
    }

    public static function get_fields() {
        $fields = array(
            'section_title' => array(
                'name' => __('Designer Settings', 'designer'),
                'type' => 'title',
                'desc' => '',
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_title'
            ),
            "wcla_product_id" =>
            array(
                'name' => __('Default product ID', 'designer'),
                'desc' => __('This controls the default product wich will be shown when designer loads.', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_product_id',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => '', // WooCommerce < 2.0
                'default' => '', // WooCommerce >= 2.0
                'type' => 'text',
                'desc_tip' => true,
            ),
            "wcla_iframe_width" =>
            array(
                'name' => __('Iframe width', 'designer'),
                'desc' => __('This controls the iframe width in wich designer loads.', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_iframe_width',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => '1200', // WooCommerce < 2.0
                'default' => '1200', // WooCommerce >= 2.0
                'type' => 'text',
                'desc_tip' => true,
            ),
            "wcla_iframe_height" =>
            array(
                'name' => __('Iframe height', 'designer'),
                'desc' => __('This controls the iframe height in wich designer loads.', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_iframe_height',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => '700', // WooCommerce < 2.0
                'default' => '700', // WooCommerce >= 2.0
                'type' => 'text',
                'desc_tip' => true,
            ),
            "wcla_enable_convert" =>
            array(
                'name' => __('Enable image convert', 'designer'),
                'desc' => __('defines whether to enable or not image convertion', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_enable_convert',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => '', // WooCommerce < 2.0
                'default' => 0, // WooCommerce >= 2.0
                'type' => 'select',
                'options' => array(
                    1 => __('Yes', 'designer'),
                    0 => __('No', 'designer'),
                ),
                'desc_tip' => true,
            ),
            "wcla_convert_method" =>
            array(
                'name' => __('Convert Method', 'designer'),
                'desc' => __('Default convert method used for converting lveart design to image format(jpg).', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_convert_method',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => '', // WooCommerce < 2.0
                'default' => '', // WooCommerce >= 2.0
                'type' => 'select',
                'options' => array(
                    'imagick' => __('ImageMagick', 'designer'),
                    'inkscape' => __('Inkscape', 'designer'),
                ),
                'desc_tip' => true,
                'default' => 'inkscape',
            ),
            "delete_on_dbl_click" =>
            array(
                'name' => __('Delete on DoubleClick', 'designer'),
                'desc' => __('defines whether user can remove any object from working area by simple double-click or double tap (for mobile devices)', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_delete_on_dbl_click',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => '', // WooCommerce < 2.0
                'default' => 0, // WooCommerce >= 2.0
                'type' => 'select',
                'options' => array(
                    1 => __('Yes', 'designer'),
                    0 => __('No', 'designer'),
                ),
                'desc_tip' => true,
            ),
            "wcla_zoom_enabled" =>
            array(
                'name' => __('Zoom Enabled', 'designer'),
                'desc' => __('boolean value, defines whether zoom tool will be enabled inside designer', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_zoom_enabled',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => '', // WooCommerce < 2.0
                'default' => 1, // WooCommerce >= 2.0
                'type' => 'select',
                'options' => array(
                    1 => __('Yes', 'designer'),
                    0 => __('No', 'designer'),
                ),
                'desc_tip' => true,
            ),
            "wcla_min_zoom" =>
            array(
                'name' => __('Min Zoom', 'designer'),
                'desc' => __(' defining min and value for the zoom control respectively, in percents.', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_min_zoom',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => '50', // WooCommerce < 2.0
                'default' => '50', // WooCommerce >= 2.0
                'type' => 'text',
                'desc_tip' => true,
            ),
            "wcla_max_zoom" =>
            array(
                'name' => __('Max Zoom', 'designer'),
                'desc' => __(' defining max and value for the zoom control respectively, in percents.', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_max_zoom',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => '150', // WooCommerce < 2.0
                'default' => '150', // WooCommerce >= 2.0
                'type' => 'text',
                'desc_tip' => true,
            ),
            
            "wcla_unit" =>
            array(
                'name' => __('Unit', 'designer'),
                'desc' => __('units, shown for custom sizes products. Possible values are "in" and "ft" or "cm" and "m" and so on. Use unitConversionMult to indicate respective multiplier for proper conversion of unit to unit2.', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_unit',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => 'in', // WooCommerce < 2.0
                'default' => 'in', // WooCommerce >= 2.0
                'type' => 'select',
                'options' => array(
                    "in" => __('in', 'designer'),
                    "ft" => __('ft', 'designer'),
                    "cm" => __('cm', 'designer'),
                    "m" => __('m', 'designer'),
                ),
                'desc_tip' => true,
            ),
            "wcla_unit2" =>
            array(
                'name' => __('Unit2', 'designer'),
                'desc' => __('units, shown for custom sizes products. Possible values are "in" and "ft" or "cm" and "m" and so on. Use unitConversionMult to indicate respective multiplier for proper conversion of unit to unit2.', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_unit2',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => 'ft', // WooCommerce < 2.0
                'default' => 'ft', // WooCommerce >= 2.0
                'type' => 'select',
                'options' => array(
                    "in" => __('in', 'designer'),
                    "ft" => __('ft', 'designer'),
                    "cm" => __('cm', 'designer'),
                    "m" => __('m', 'designer'),
                ),
                'desc_tip' => true,
            ),
            "wcla_unit_multiplier" =>
            array(
                'name' => __('Unit Convertion Multiplier', 'designer'),
                'desc' => __('indicate respective multiplier for proper conversion of unit to unit2.', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_unit_multiplier',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => '12', // WooCommerce < 2.0
                'default' => '12', // WooCommerce >= 2.0
                'type' => 'text',
                'desc_tip' => true,
            ),
            "wcla_min_dpu" =>
            array(
                'name' => __('Min DPU', 'designer'),
                'desc' => __('Set this property to show warning message if user will size raster image more than safe dimensions to meet suggested print quality standarts. ', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_min_dpu',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => '300', // WooCommerce < 2.0
                'default' => '300', // WooCommerce >= 2.0
                'type' => 'text',
                'desc_tip' => true,
            ),
            "wcla_show_product_selector" =>
            array(
                'name' => __('Show Product Selector', 'designer'),
                'desc' => __('Defines whether Select Product form is shown.', 'designer'),
                'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_wcla_show_product_selector',
                // 'css' => 'min-width:350px;min-height:150px',
                'std' => '1', // WooCommerce < 2.0
                'default' => 1, // WooCommerce >= 2.0
                'type' => 'select',
                'options' => array(
                    1 => __('Yes', 'designer'),
                    0 => __('No', 'designer'),
                ),
                'desc_tip' => true,
            ),
            "section_end" =>
            array('type' => 'sectionend', 'id' => 'wc_settings_' . self::SETTINGS_NAMESPACE . '_section_end'),
        );
        return apply_filters('wc_settings_tab_' . self::SETTINGS_NAMESPACE, $fields);
        //return $fields;
    }

    public static function get_option($key) {
        $fields = self::get_fields();

        return apply_filters('wc_option_' . $key, get_option('wc_settings_' . self::SETTINGS_NAMESPACE . '_' . $key, ( ( isset($fields[$key]) && isset($fields[$key]['default']) ) ? $fields[$key]['default'] : '')));
    }
    
    

}
