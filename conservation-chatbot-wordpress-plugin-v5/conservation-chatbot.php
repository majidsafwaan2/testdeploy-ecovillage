<?php
/**
 * Plugin Name: Conservation Chatbot
 * Plugin URI: https://github.com/majidsafwaan2/conservation-chatbot
 * Description: An interactive AI chatbot featuring elephants from Save the Elephants organization. Includes comprehensive customization options, glass-morphism design, and AI-powered conversations.
 * Version: 2.0.0
 * Author: Conservation Chatbot Team
 * Author URI: https://github.com/majidsafwaan2/conservation-chatbot
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 * Text Domain: conservation-chatbot
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * Network: false
 * 
 * @package ConservationChatbot
 * @version 2.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('CC_PLUGIN_VERSION', '2.0.0');
define('CC_PLUGIN_URL', plugin_dir_url(__FILE__));
define('CC_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('CC_PLUGIN_BASENAME', plugin_basename(__FILE__));
define('CC_PLUGIN_FILE', __FILE__);

/**
 * Main plugin class
 */
class ConservationChatbot {
    
    /**
     * Plugin instance
     */
    private static $instance = null;
    
    /**
     * Get plugin instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        $this->init_hooks();
    }
    
    /**
     * Initialize hooks
     */
    private function init_hooks() {
        add_action('init', array($this, 'init'));
        add_action('plugins_loaded', array($this, 'load_textdomain'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_footer', array($this, 'render_chatbot'));
        add_shortcode('conservation_chatbot', array($this, 'shortcode'));
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
        
        // Initialize AJAX handler
        require_once CC_PLUGIN_PATH . 'includes/class-cc-ajax.php';
        $this->ajax = new CC_Ajax();
        $this->ajax->init();
        
        // Initialize admin interface
        if (is_admin()) {
            require_once CC_PLUGIN_PATH . 'includes/class-cc-admin.php';
            $this->admin = new CC_Admin();
            $this->admin->init();
        }
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        // Plugin initialization
    }
    
    /**
     * Load text domain
     */
    public function load_textdomain() {
        load_plugin_textdomain(
            'conservation-chatbot',
            false,
            dirname(plugin_basename(__FILE__)) . '/languages'
        );
    }
    
    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts() {
        if (!$this->should_show_chatbot()) {
            return;
        }
        
        // Enqueue the main chatbot script
        wp_enqueue_script(
            'conservation-chatbot',
            CC_PLUGIN_URL . 'assets/js/chatbot.js',
            array('jquery'),
            CC_PLUGIN_VERSION,
            true
        );
        
        // Localize script with settings
        wp_localize_script('conservation-chatbot', 'cc_settings', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('cc_nonce'),
            'api_key' => $this->get_api_key(),
            'organization' => $this->get_organization_name(),
            'organization_type' => $this->get_organization_type(),
            'animals' => $this->get_selected_animals(),
            'customization' => $this->get_customization_settings(),
            'strings' => array(
                'typing' => __('Animal is typing...', 'conservation-chatbot'),
                'error' => __('Sorry, I encountered an error. Please try again.', 'conservation-chatbot'),
                'no_response' => __('No response received. Please check your connection.', 'conservation-chatbot'),
                'placeholder' => __('Ask me anything...', 'conservation-chatbot'),
                'send' => __('Send', 'conservation-chatbot')
            )
        ));
    }
    
    /**
     * Check if chatbot should be shown
     */
    private function should_show_chatbot() {
        if ($this->get_option('enable_chatbot', '1') !== '1') {
            return false;
        }
        
        $show_on_pages = $this->get_option('show_on_pages', array('all'));
        
        if (in_array('all', $show_on_pages)) {
            return true;
        }
        
        if (is_page() && in_array(get_the_ID(), $show_on_pages)) {
            return true;
        }
        
        return false;
    }
    
    /**
     * Get API key
     */
    private function get_api_key() {
        return $this->get_option('api_key', '');
    }
    
    /**
     * Get organization name
     */
    private function get_organization_name() {
        return $this->get_option('organization_name', 'Conservation Organization');
    }
    
    /**
     * Get organization type
     */
    private function get_organization_type() {
        return $this->get_option('organization_type', 'wildlife');
    }
    
    /**
     * Get selected animals
     */
    private function get_selected_animals() {
        $animals = $this->get_option('selected_animals', array());
        if (empty($animals)) {
            // Default animals
            return array('tiger', 'elephant', 'panda');
        }
        return $animals;
    }
    
    /**
     * Get customization settings
     */
    private function get_customization_settings() {
        return array(
            'position' => $this->get_option('position', 'bottom-right'),
            'theme' => $this->get_option('theme', 'nature'),
            'colors' => array(
                'primary' => $this->get_option('color_primary', '#2d5016'),
                'secondary' => $this->get_option('color_secondary', '#4a7c59'),
                'accent' => $this->get_option('color_accent', '#8bc34a'),
                'background' => $this->get_option('color_background', 'rgba(255, 255, 255, 0.2)'),
                'text' => $this->get_option('color_text', '#333333'),
                'text_light' => $this->get_option('color_text_light', '#ffffff')
            ),
            'fonts' => array(
                'family' => $this->get_option('font_family', 'Arial, sans-serif'),
                'size_small' => $this->get_option('font_size_small', '12px'),
                'size_medium' => $this->get_option('font_size_medium', '14px'),
                'size_large' => $this->get_option('font_size_large', '16px')
            ),
            'sizes' => array(
                'chat_window_width' => $this->get_option('chat_window_width', '320'),
                'chat_window_height' => $this->get_option('chat_window_height', '450'),
                'launcher_size' => $this->get_option('launcher_size', '60'),
                'avatar_size' => $this->get_option('avatar_size', '40'),
                'close_button_size' => $this->get_option('close_button_size', '24')
            ),
            'border_radius' => array(
                'chat_window' => $this->get_option('border_radius_chat_window', '12'),
                'chat_bubbles' => $this->get_option('border_radius_chat_bubbles', '18'),
                'launcher' => $this->get_option('border_radius_launcher', '50'),
                'input_field' => $this->get_option('border_radius_input_field', '20'),
                'prompt_buttons' => $this->get_option('border_radius_prompt_buttons', '15')
            ),
            'prompts' => array(
                'prompt_1_text' => $this->get_option('prompt_1_text', 'Fun Fact'),
                'prompt_1_message' => $this->get_option('prompt_1_message', 'Tell me a fun fact!'),
                'prompt_2_text' => $this->get_option('prompt_2_text', 'Threats'),
                'prompt_2_message' => $this->get_option('prompt_2_message', "What's your biggest threat?"),
                'prompt_3_text' => $this->get_option('prompt_3_text', 'Help'),
                'prompt_3_message' => $this->get_option('prompt_3_message', 'How can I help protect you?')
            ),
            'features' => array(
                'enable_heart' => $this->get_option('enable_heart', '1') === '1',
                'enable_animal_selector' => $this->get_option('enable_animal_selector', '1') === '1',
                'enable_quick_prompts' => $this->get_option('enable_quick_prompts', '1') === '1'
            )
        );
    }
    
    /**
     * Get option
     */
    private function get_option($key, $default = '') {
        return get_option('cc_' . $key, $default);
    }
    
    /**
     * Render chatbot HTML
     */
    public function render_chatbot() {
        if (!$this->should_show_chatbot()) {
            return;
        }
        
        // The chatbot will be rendered by JavaScript
        echo '<!-- Conservation Chatbot will be loaded here -->';
    }
    
    /**
     * Shortcode handler
     */
    public function shortcode($atts) {
        $atts = shortcode_atts(array(
            'animals' => '',
            'theme' => '',
            'position' => '',
            'organization' => '',
            'organization_type' => ''
        ), $atts);
        
        // Override settings for shortcode
        if (!empty($atts['animals'])) {
            add_filter('cc_animals_override', function() use ($atts) {
                return explode(',', $atts['animals']);
            });
        }
        
        if (!empty($atts['theme'])) {
            add_filter('cc_theme_override', function() use ($atts) {
                return $atts['theme'];
            });
        }
        
        if (!empty($atts['position'])) {
            add_filter('cc_position_override', function() use ($atts) {
                return $atts['position'];
            });
        }
        
        if (!empty($atts['organization'])) {
            add_filter('cc_organization_override', function() use ($atts) {
                return $atts['organization'];
            });
        }
        
        if (!empty($atts['organization_type'])) {
            add_filter('cc_organization_type_override', function() use ($atts) {
                return $atts['organization_type'];
            });
        }
        
        // Render chatbot
        ob_start();
        $this->render_chatbot();
        return ob_get_clean();
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Set default options
        $this->set_default_options();
        
        // Create upload directory
        $upload_dir = wp_upload_dir();
        $cc_upload_dir = $upload_dir['basedir'] . '/conservation-chatbot';
        if (!file_exists($cc_upload_dir)) {
            wp_mkdir_p($cc_upload_dir);
        }
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Set default options - exact match to original chatbot
     */
    private function set_default_options() {
        $defaults = array(
            'cc_enable_chatbot' => '1',
            'cc_organization_name' => 'Conservation Organization',
            'cc_organization_type' => 'wildlife',
            'cc_api_key' => '',
            'cc_selected_animals' => array('tiger', 'elephant', 'panda'),
            'cc_position' => 'bottom-right',
            'cc_theme' => 'nature',
            'cc_enable_heart' => '1',
            'cc_enable_animal_selector' => '1',
            'cc_enable_quick_prompts' => '1',
            'cc_show_on_pages' => array('all'),
            
            // Colors - exact match to original frontend defaults
            'cc_color_primary' => '#2d5016',
            'cc_color_secondary' => '#4a7c59',
            'cc_color_accent' => '#8bc34a',
            'cc_color_background' => 'rgba(255, 255, 255, 0.2)',
            'cc_color_text' => '#333333',
            'cc_color_text_light' => '#ffffff',
            
            // Fonts - exact match to original
            'cc_font_family' => 'Arial, sans-serif',
            'cc_font_size_small' => '12px',
            'cc_font_size_medium' => '14px',
            'cc_font_size_large' => '16px',
            
            // Sizes - exact match to original
            'cc_chat_window_width' => '320',
            'cc_chat_window_height' => '450',
            'cc_launcher_size' => '60',
            'cc_avatar_size' => '40',
            'cc_close_button_size' => '24',
            
            // Border radius - exact match to original
            'cc_border_radius_chat_window' => '12',
            'cc_border_radius_chat_bubbles' => '18',
            'cc_border_radius_launcher' => '50',
            'cc_border_radius_input_field' => '20',
            'cc_border_radius_prompt_buttons' => '15',
            
            // Prompts - exact match to original
            'cc_prompt_1_text' => 'Fun Fact',
            'cc_prompt_1_message' => 'Tell me a fun fact!',
            'cc_prompt_2_text' => 'Threats',
            'cc_prompt_2_message' => "What's your biggest threat?",
            'cc_prompt_3_text' => 'Help',
            'cc_prompt_3_message' => 'How can I help protect you?'
        );
        
        foreach ($defaults as $key => $value) {
            if (get_option($key) === false) {
                add_option($key, $value);
            }
        }
    }
}

// Initialize plugin
function cc_init() {
    return ConservationChatbot::get_instance();
}

// Start the plugin
cc_init(); 