<?php
/**
 * Admin functionality for Conservation Chatbot
 *
 * @package ConservationChatbot
 */

if (!defined('ABSPATH')) {
    exit;
}

class CC_Admin {
    
    /**
     * Initialize admin
     */
    public function init() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('wp_ajax_cc_reset_settings', array($this, 'reset_settings'));
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            'Conservation Chatbot',
            'Conservation Chatbot',
            'manage_options',
            'conservation-chatbot',
            array($this, 'admin_page'),
            'dashicons-format-chat',
            30
        );
    }
    
    /**
     * Enqueue admin scripts
     */
    public function enqueue_admin_scripts($hook) {
        if ($hook !== 'toplevel_page_conservation-chatbot') {
            return;
        }
        
        wp_enqueue_script('jquery');
        wp_enqueue_script('wp-color-picker');
        wp_enqueue_style('wp-color-picker');
        wp_enqueue_media();
        
        wp_enqueue_script(
            'cc-admin',
            CC_PLUGIN_URL . 'assets/js/admin.js',
            array('jquery', 'wp-color-picker'),
            CC_PLUGIN_VERSION,
            true
        );
    }
    
    /**
     * Register settings
     */
    public function register_settings() {
        // All settings in one group to avoid conflicts
        register_setting('cc_chatbot_settings', 'cc_enable_chatbot');
        register_setting('cc_chatbot_settings', 'cc_organization_name');
        register_setting('cc_chatbot_settings', 'cc_organization_type');
        register_setting('cc_chatbot_settings', 'cc_api_key');
        register_setting('cc_chatbot_settings', 'cc_show_on_pages');
        register_setting('cc_chatbot_settings', 'cc_position');
        register_setting('cc_chatbot_settings', 'cc_theme');
        register_setting('cc_chatbot_settings', 'cc_color_primary');
        register_setting('cc_chatbot_settings', 'cc_color_secondary');
        register_setting('cc_chatbot_settings', 'cc_color_accent');
        register_setting('cc_chatbot_settings', 'cc_color_background');
        register_setting('cc_chatbot_settings', 'cc_color_text');
        register_setting('cc_chatbot_settings', 'cc_color_text_light');
        register_setting('cc_chatbot_settings', 'cc_font_family');
        register_setting('cc_chatbot_settings', 'cc_font_size_small');
        register_setting('cc_chatbot_settings', 'cc_font_size_medium');
        register_setting('cc_chatbot_settings', 'cc_font_size_large');
        register_setting('cc_chatbot_settings', 'cc_chat_window_width');
        register_setting('cc_chatbot_settings', 'cc_chat_window_height');
        register_setting('cc_chatbot_settings', 'cc_launcher_size');
        register_setting('cc_chatbot_settings', 'cc_avatar_size');
        register_setting('cc_chatbot_settings', 'cc_close_button_size');
        register_setting('cc_chatbot_settings', 'cc_border_radius_chat_window');
        register_setting('cc_chatbot_settings', 'cc_border_radius_chat_bubbles');
        register_setting('cc_chatbot_settings', 'cc_border_radius_launcher');
        register_setting('cc_chatbot_settings', 'cc_border_radius_input_field');
        register_setting('cc_chatbot_settings', 'cc_border_radius_prompt_buttons');
        register_setting('cc_chatbot_settings', 'cc_enable_quick_prompts');
        register_setting('cc_chatbot_settings', 'cc_prompt_1_text');
        register_setting('cc_chatbot_settings', 'cc_prompt_1_message');
        register_setting('cc_chatbot_settings', 'cc_prompt_2_text');
        register_setting('cc_chatbot_settings', 'cc_prompt_2_message');
        register_setting('cc_chatbot_settings', 'cc_prompt_3_text');
        register_setting('cc_chatbot_settings', 'cc_prompt_3_message');
        register_setting('cc_chatbot_settings', 'cc_enable_heart');
        register_setting('cc_chatbot_settings', 'cc_enable_animal_selector');
        register_setting('cc_chatbot_settings', 'cc_selected_animals');
        register_setting('cc_chatbot_settings', 'cc_custom_animals');
    }
    
    /**
     * Admin page callback
     */
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>Conservation Chatbot Settings</h1>
            
            <h2 class="nav-tab-wrapper">
                <a href="#general" class="nav-tab nav-tab-active">General</a>
                <a href="#appearance" class="nav-tab">Appearance</a>
                <a href="#typography" class="nav-tab">Typography</a>
                <a href="#sizes" class="nav-tab">Sizes</a>
                <a href="#borders" class="nav-tab">Borders</a>
                <a href="#prompts" class="nav-tab">Prompts</a>
                <a href="#features" class="nav-tab">Features</a>
                <a href="#animals" class="nav-tab">Animals</a>
            </h2>
            
            <form method="post" action="options.php">
                <?php settings_fields('cc_chatbot_settings'); ?>
                
                <!-- General Settings -->
                <div id="general" class="tab-content">
                    <h2>General Settings</h2>
                    
                    <table class="form-table">
                        <tr>
                            <th scope="row">Enable Chatbot</th>
                            <td>
                                <input type="checkbox" name="cc_enable_chatbot" value="1" <?php checked('1', get_option('cc_enable_chatbot', '1')); ?> />
                                <span class="description">Enable the conservation chatbot on your website</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Organization Name</th>
                            <td>
                                <input type="text" name="cc_organization_name" value="<?php echo esc_attr(get_option('cc_organization_name', 'Save the Elephants')); ?>" class="regular-text" />
                                <span class="description">The name of your conservation organization</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Organization Type</th>
                            <td>
                                <select name="cc_organization_type">
                                    <?php
                                    $types = array(
                                        'wildlife' => 'Wildlife Conservation',
                                        'marine' => 'Marine Conservation',
                                        'forest' => 'Forest Conservation',
                                        'climate' => 'Climate Conservation',
                                        'general' => 'General Environmental'
                                    );
                                    $current_type = get_option('cc_organization_type', 'wildlife');
                                    foreach ($types as $key => $label) : ?>
                                        <option value="<?php echo esc_attr($key); ?>" <?php selected($key, $current_type); ?>>
                                            <?php echo esc_html($label); ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Gemini API Key</th>
                            <td>
                                <input type="text" name="cc_api_key" id="cc_api_key" value="<?php echo esc_attr(get_option('cc_api_key', '')); ?>" class="regular-text" style="font-family: monospace;" />
                                <button type="button" id="toggle_api_key" class="button">Hide</button>
                                <span class="description">Your Gemini API key from Google AI Studio</span>
                                <p class="description">
                                    <a href="https://aistudio.google.com/app/apikey" target="_blank">Get your API key here</a>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Selected Animals</th>
                            <td>
                                <?php
                                $default_animals = array('tiger', 'elephant', 'panda');
                                $selected_animals = get_option('cc_selected_animals', $default_animals);
                                $available_animals = array(
                                    'tiger' => 'Bengal Tiger',
                                    'elephant' => 'African Elephant', 
                                    'panda' => 'Giant Panda'
                                );
                                foreach ($available_animals as $key => $label) : ?>
                                    <label style="display: block; margin-bottom: 5px;">
                                        <input type="checkbox" name="cc_selected_animals[]" value="<?php echo esc_attr($key); ?>" 
                                               <?php checked(in_array($key, $selected_animals)); ?> />
                                        <?php echo esc_html($label); ?>
                                    </label>
                                <?php endforeach; ?>
                                <span class="description">Select which animals to include in the chatbot</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Show On Pages</th>
                            <td>
                                <select name="cc_show_on_pages[]" multiple>
                                    <option value="all" <?php selected(in_array('all', get_option('cc_show_on_pages', array('all')))); ?>>All Pages</option>
                                    <?php
                                    $pages = get_pages();
                                    $selected_pages = get_option('cc_show_on_pages', array('all'));
                                    foreach ($pages as $page) : ?>
                                        <option value="<?php echo $page->ID; ?>" <?php selected(in_array($page->ID, $selected_pages)); ?>>
                                            <?php echo esc_html($page->post_title); ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                                <span class="description">Select which pages to show the chatbot on</span>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- Appearance Settings -->
                <div id="appearance" class="tab-content" style="display: none;">
                    <h2>Appearance Settings</h2>
                    
                    <table class="form-table">
                        <tr>
                            <th scope="row">Position</th>
                            <td>
                                <select name="cc_position">
                                    <?php
                                    $positions = array(
                                        'bottom-right' => 'Bottom Right',
                                        'bottom-left' => 'Bottom Left',
                                        'top-right' => 'Top Right',
                                        'top-left' => 'Top Left'
                                    );
                                    $current_position = get_option('cc_position', 'bottom-right');
                                    foreach ($positions as $key => $label) : ?>
                                        <option value="<?php echo esc_attr($key); ?>" <?php selected($key, $current_position); ?>>
                                            <?php echo esc_html($label); ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Primary Color</th>
                            <td>
                                <input type="text" name="cc_color_primary" value="<?php echo esc_attr(get_option('cc_color_primary', '#222')); ?>" class="color-picker" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Secondary Color</th>
                            <td>
                                <input type="text" name="cc_color_secondary" value="<?php echo esc_attr(get_option('cc_color_secondary', '#444')); ?>" class="color-picker" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Accent Color</th>
                            <td>
                                <input type="text" name="cc_color_accent" value="<?php echo esc_attr(get_option('cc_color_accent', '#222')); ?>" class="color-picker" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Background Color</th>
                            <td>
                                <input type="text" name="cc_color_background" value="<?php echo esc_attr(get_option('cc_color_background', 'rgba(255, 255, 255, 0.2)')); ?>" class="color-picker" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Text Color</th>
                            <td>
                                <input type="text" name="cc_color_text" value="<?php echo esc_attr(get_option('cc_color_text', '#ffffff')); ?>" class="color-picker" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Light Text Color</th>
                            <td>
                                <input type="text" name="cc_color_text_light" value="<?php echo esc_attr(get_option('cc_color_text_light', '#ffffff')); ?>" class="color-picker" />
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- Typography Settings -->
                <div id="typography" class="tab-content" style="display: none;">
                    <h2>Typography Settings</h2>
                    
                    <table class="form-table">
                        <tr>
                            <th scope="row">Font Family</th>
                            <td>
                                <select name="cc_font_family">
                                    <?php
                                    $fonts = array(
                                        'Arial, sans-serif' => 'Arial',
                                        'Helvetica, sans-serif' => 'Helvetica',
                                        'Georgia, serif' => 'Georgia',
                                        'Times New Roman, serif' => 'Times New Roman',
                                        'Verdana, sans-serif' => 'Verdana',
                                        'Tahoma, sans-serif' => 'Tahoma'
                                    );
                                    $current_font = get_option('cc_font_family', 'Arial, sans-serif');
                                    foreach ($fonts as $key => $label) : ?>
                                        <option value="<?php echo esc_attr($key); ?>" <?php selected($key, $current_font); ?>>
                                            <?php echo esc_html($label); ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Small Font Size</th>
                            <td>
                                <input type="text" name="cc_font_size_small" value="<?php echo esc_attr(get_option('cc_font_size_small', '12px')); ?>" class="small-text" />
                                <span class="description">e.g., 12px, 0.75rem</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Medium Font Size</th>
                            <td>
                                <input type="text" name="cc_font_size_medium" value="<?php echo esc_attr(get_option('cc_font_size_medium', '14px')); ?>" class="small-text" />
                                <span class="description">e.g., 14px, 0.875rem</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Large Font Size</th>
                            <td>
                                <input type="text" name="cc_font_size_large" value="<?php echo esc_attr(get_option('cc_font_size_large', '16px')); ?>" class="small-text" />
                                <span class="description">e.g., 16px, 1rem</span>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- Size Settings -->
                <div id="sizes" class="tab-content" style="display: none;">
                    <h2>Size Settings</h2>
                    
                    <table class="form-table">
                        <tr>
                            <th scope="row">Chat Window Width (px)</th>
                            <td>
                                <input type="number" name="cc_chat_window_width" value="<?php echo esc_attr(get_option('cc_chat_window_width', '320')); ?>" class="small-text" min="200" max="600" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Chat Window Height (px)</th>
                            <td>
                                <input type="number" name="cc_chat_window_height" value="<?php echo esc_attr(get_option('cc_chat_window_height', '450')); ?>" class="small-text" min="300" max="800" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Launcher Size (px)</th>
                            <td>
                                <input type="number" name="cc_launcher_size" value="<?php echo esc_attr(get_option('cc_launcher_size', '60')); ?>" class="small-text" min="40" max="100" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Avatar Size (px)</th>
                            <td>
                                <input type="number" name="cc_avatar_size" value="<?php echo esc_attr(get_option('cc_avatar_size', '40')); ?>" class="small-text" min="20" max="80" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Close Button Size (px)</th>
                            <td>
                                <input type="number" name="cc_close_button_size" value="<?php echo esc_attr(get_option('cc_close_button_size', '24')); ?>" class="small-text" min="16" max="48" />
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- Border Settings -->
                <div id="borders" class="tab-content" style="display: none;">
                    <h2>Border Radius Settings</h2>
                    
                    <table class="form-table">
                        <tr>
                            <th scope="row">Chat Window Border Radius (px)</th>
                            <td>
                                <input type="number" name="cc_border_radius_chat_window" value="<?php echo esc_attr(get_option('cc_border_radius_chat_window', '12')); ?>" class="small-text" min="0" max="50" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Chat Bubbles Border Radius (px)</th>
                            <td>
                                <input type="number" name="cc_border_radius_chat_bubbles" value="<?php echo esc_attr(get_option('cc_border_radius_chat_bubbles', '18')); ?>" class="small-text" min="0" max="50" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Launcher Border Radius (px)</th>
                            <td>
                                <input type="number" name="cc_border_radius_launcher" value="<?php echo esc_attr(get_option('cc_border_radius_launcher', '50')); ?>" class="small-text" min="0" max="50" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Input Field Border Radius (px)</th>
                            <td>
                                <input type="number" name="cc_border_radius_input_field" value="<?php echo esc_attr(get_option('cc_border_radius_input_field', '20')); ?>" class="small-text" min="0" max="50" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt Buttons Border Radius (px)</th>
                            <td>
                                <input type="number" name="cc_border_radius_prompt_buttons" value="<?php echo esc_attr(get_option('cc_border_radius_prompt_buttons', '15')); ?>" class="small-text" min="0" max="50" />
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- Prompt Settings -->
                <div id="prompts" class="tab-content" style="display: none;">
                    <h2>Quick Prompt Settings</h2>
                    
                    <table class="form-table">
                        <tr>
                            <th scope="row">Enable Quick Prompts</th>
                            <td>
                                <input type="checkbox" name="cc_enable_quick_prompts" value="1" <?php checked('1', get_option('cc_enable_quick_prompts', '1')); ?> />
                                <span class="description">Enable quick prompt buttons</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt 1 - Button Text</th>
                            <td>
                                <input type="text" name="cc_prompt_1_text" value="<?php echo esc_attr(get_option('cc_prompt_1_text', 'Fun Fact')); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt 1 - Message</th>
                            <td>
                                <input type="text" name="cc_prompt_1_message" value="<?php echo esc_attr(get_option('cc_prompt_1_message', 'Tell me a fun fact!')); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt 2 - Button Text</th>
                            <td>
                                <input type="text" name="cc_prompt_2_text" value="<?php echo esc_attr(get_option('cc_prompt_2_text', 'Threats')); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt 2 - Message</th>
                            <td>
                                <input type="text" name="cc_prompt_2_message" value="<?php echo esc_attr(get_option('cc_prompt_2_message', "What's your biggest threat?")); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt 3 - Button Text</th>
                            <td>
                                <input type="text" name="cc_prompt_3_text" value="<?php echo esc_attr(get_option('cc_prompt_3_text', 'Help')); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt 3 - Message</th>
                            <td>
                                <input type="text" name="cc_prompt_3_message" value="<?php echo esc_attr(get_option('cc_prompt_3_message', 'How can I help protect you?')); ?>" class="regular-text" />
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- Feature Settings -->
                <div id="features" class="tab-content" style="display: none;">
                    <h2>Feature Settings</h2>
                    
                    <table class="form-table">
                        <tr>
                            <th scope="row">Enable Heart Feature</th>
                            <td>
                                <input type="checkbox" name="cc_enable_heart" value="1" <?php checked('1', get_option('cc_enable_heart', '1')); ?> />
                                <span class="description">Enable the heart/like feature in the chatbot</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Enable Animal Selector</th>
                            <td>
                                <input type="checkbox" name="cc_enable_animal_selector" value="1" <?php checked('1', get_option('cc_enable_animal_selector', '1')); ?> />
                                <span class="description">Enable the animal selector dropdown in the chatbot</span>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- Animal Settings -->
                <div id="animals" class="tab-content" style="display: none;">
                    <h2>Animal Settings</h2>
                    
                    <table class="form-table">
                        <tr>
                            <th scope="row">Selected Animals</th>
                            <td>
                                <fieldset>
                                    <?php
                                                                         $default_animals = array(
                                         'tiger' => 'Raja (Bengal Tiger)',
                                         'elephant' => 'Nuru (African Elephant)',
                                         'panda' => 'Mei (Giant Panda)'
                                     );
                                     $selected_animals = get_option('cc_selected_animals', array('tiger', 'elephant', 'panda'));
                                                                         foreach ($default_animals as $key => $label) : ?>
                                        <label>
                                            <input type="checkbox" name="cc_selected_animals[]" value="<?php echo esc_attr($key); ?>" 
                                                   <?php checked(in_array($key, $selected_animals)); ?> />
                                            <?php echo esc_html($label); ?>
                                        </label><br>
                                    <?php endforeach; ?>
                                </fieldset>
                                                                 <span class="description">Select which animals to include in the chatbot</span>
                            </td>
                        </tr>
                    </table>
                    
                    <h3>Custom Animals</h3>
                    <p>Add your own custom animals with images and stories.</p>
                    <div id="custom-animals-container">
                        <!-- Custom animals will be added here via JavaScript -->
                    </div>
                    <button type="button" id="add-custom-animal" class="button">Add Custom Animal</button>
                </div>
                
                <?php submit_button(); ?>
            </form>
            
            <hr style="margin: 30px 0;">
            
            <h2>Reset Settings</h2>
            <p>Click the button below to reset all settings to their default values (exact original black theme appearance).</p>
            <button type="button" id="reset-settings" class="button button-secondary" style="background: #dc3232; border-color: #dc3232; color: white;">
                Reset All Settings to Default
            </button>
            <p class="description">This will reset all customization options to match the original black theme design.</p>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            // Tab functionality
            $('.nav-tab').click(function(e) {
                e.preventDefault();
                $('.nav-tab').removeClass('nav-tab-active');
                $(this).addClass('nav-tab-active');
                $('.tab-content').hide();
                $($(this).attr('href')).show();
            });
            
            // Color picker
            $('.color-picker').wpColorPicker();
            
            // Reset settings
            $('#reset-settings').click(function() {
                if (confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
                    $(this).prop('disabled', true).text('Resetting...');
                    
                    $.ajax({
                        url: ajaxurl,
                        type: 'POST',
                        data: {
                            action: 'cc_reset_settings',
                            nonce: '<?php echo wp_create_nonce('cc_reset_nonce'); ?>'
                        },
                        success: function(response) {
                            if (response.success) {
                                alert('Settings have been reset to default!');
                                location.reload();
                            } else {
                                alert('Error resetting settings: ' + response.data);
                            }
                        },
                        error: function() {
                            alert('Error resetting settings. Please try again.');
                        },
                        complete: function() {
                            $('#reset-settings').prop('disabled', false).text('Reset All Settings to Default');
                        }
                    });
                }
            });
        });
        </script>
        
        <style>
        .tab-content { margin-top: 20px; }
        .color-picker { width: 100px; }
        </style>
        <?php
    }
    
    /**
     * Reset all settings to default
     */
    public function reset_settings() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'cc_reset_nonce')) {
            wp_die('Security check failed');
        }
        
        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_die('Insufficient permissions');
        }
        
        // Default settings - black theme
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
            
            // Colors - exact match to hardcoded CSS
            'cc_color_primary' => '#222',
            'cc_color_secondary' => '#444',
            'cc_color_accent' => '#222',
            'cc_color_background' => 'rgba(255, 255, 255, 0.2)',
            'cc_color_text' => '#ffffff',
            'cc_color_text_light' => '#ffffff',
            
            // Fonts
            'cc_font_family' => 'Arial, sans-serif',
            'cc_font_size_small' => '12px',
            'cc_font_size_medium' => '14px',
            'cc_font_size_large' => '16px',
            
            // Sizes
            'cc_chat_window_width' => '320',
            'cc_chat_window_height' => '450',
            'cc_launcher_size' => '60',
            'cc_avatar_size' => '40',
            'cc_close_button_size' => '24',
            
            // Border radius
            'cc_border_radius_chat_window' => '12',
            'cc_border_radius_chat_bubbles' => '18',
            'cc_border_radius_launcher' => '50',
            'cc_border_radius_input_field' => '20',
            'cc_border_radius_prompt_buttons' => '15',
            
            // Prompts
            'cc_prompt_1_text' => 'Fun Fact',
            'cc_prompt_1_message' => 'Tell me a fun fact!',
            'cc_prompt_2_text' => 'Threats',
            'cc_prompt_2_message' => "What's your biggest threat?",
            'cc_prompt_3_text' => 'Help',
            'cc_prompt_3_message' => 'How can I help protect you?',
            
            // Clear custom animals
            'cc_custom_animals' => array()
        );
        
        // Reset all settings
        foreach ($defaults as $key => $value) {
            update_option($key, $value);
        }
        
        wp_send_json_success('Settings reset successfully');
    }
} 