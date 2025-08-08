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
        // Use a single settings array instead of individual options to prevent memory issues
        register_setting('cc_chatbot_settings', 'cc_chatbot_settings', array(
            'sanitize_callback' => array($this, 'sanitize_settings')
        ));
    }
    
    /**
     * Sanitize settings
     */
    public function sanitize_settings($input) {
        $sanitized = array();
        
        // General settings
        $sanitized['enable_chatbot'] = isset($input['enable_chatbot']) ? '1' : '0';
        $sanitized['organization_name'] = sanitize_text_field($input['organization_name'] ?? 'Save the Elephants');
        $sanitized['organization_type'] = sanitize_text_field($input['organization_type'] ?? 'wildlife');
        $sanitized['api_key'] = sanitize_text_field($input['api_key'] ?? '');
        
        // Limit pages to prevent memory issues
        $sanitized['show_on_pages'] = array('all'); // Default to all pages to avoid memory issues
        
        // Appearance settings
        $sanitized['position'] = sanitize_text_field($input['position'] ?? 'bottom-right');
        $sanitized['theme'] = sanitize_text_field($input['theme'] ?? 'nature');
        $sanitized['color_primary'] = sanitize_hex_color($input['color_primary'] ?? '#222');
        $sanitized['color_secondary'] = sanitize_hex_color($input['color_secondary'] ?? '#444');
        $sanitized['color_accent'] = sanitize_hex_color($input['color_accent'] ?? '#222');
        $sanitized['color_background'] = sanitize_text_field($input['color_background'] ?? 'rgba(255, 255, 255, 0.2)');
        $sanitized['color_text'] = sanitize_hex_color($input['color_text'] ?? '#333333');
        $sanitized['color_text_light'] = sanitize_hex_color($input['color_text_light'] ?? '#ffffff');
        
        // Typography settings
        $sanitized['font_family'] = sanitize_text_field($input['font_family'] ?? 'Arial, sans-serif');
        $sanitized['font_size_small'] = sanitize_text_field($input['font_size_small'] ?? '12px');
        $sanitized['font_size_medium'] = sanitize_text_field($input['font_size_medium'] ?? '14px');
        $sanitized['font_size_large'] = sanitize_text_field($input['font_size_large'] ?? '16px');
        
        // Size settings
        $sanitized['chat_window_width'] = absint($input['chat_window_width'] ?? 320);
        $sanitized['chat_window_height'] = absint($input['chat_window_height'] ?? 450);
        $sanitized['launcher_size'] = absint($input['launcher_size'] ?? 60);
        $sanitized['avatar_size'] = absint($input['avatar_size'] ?? 40);
        $sanitized['close_button_size'] = absint($input['close_button_size'] ?? 24);
        
        // Border radius settings
        $sanitized['border_radius_chat_window'] = absint($input['border_radius_chat_window'] ?? 12);
        $sanitized['border_radius_chat_bubbles'] = absint($input['border_radius_chat_bubbles'] ?? 18);
        $sanitized['border_radius_launcher'] = absint($input['border_radius_launcher'] ?? 50);
        $sanitized['border_radius_input_field'] = absint($input['border_radius_input_field'] ?? 20);
        $sanitized['border_radius_prompt_buttons'] = absint($input['border_radius_prompt_buttons'] ?? 15);
        
        // Prompt settings
        $sanitized['enable_quick_prompts'] = isset($input['enable_quick_prompts']) ? '1' : '0';
        $sanitized['prompt_1_text'] = sanitize_text_field($input['prompt_1_text'] ?? '');
        $sanitized['prompt_1_message'] = sanitize_textarea_field($input['prompt_1_message'] ?? '');
        $sanitized['prompt_2_text'] = sanitize_text_field($input['prompt_2_text'] ?? '');
        $sanitized['prompt_2_message'] = sanitize_textarea_field($input['prompt_2_message'] ?? '');
        $sanitized['prompt_3_text'] = sanitize_text_field($input['prompt_3_text'] ?? '');
        $sanitized['prompt_3_message'] = sanitize_textarea_field($input['prompt_3_message'] ?? '');
        
        // Feature settings
        $sanitized['enable_heart'] = isset($input['enable_heart']) ? '1' : '0';
        $sanitized['enable_animal_selector'] = isset($input['enable_animal_selector']) ? '1' : '0';
        
        // Animal settings - handle empty arrays properly
        $sanitized['selected_animals'] = array();
        
        // Check if the form was submitted (indicated by the hidden field)
        if (isset($input['animal_selection_submitted'])) {
            // If selected_animals is set and is an array, use it
            if (isset($input['selected_animals']) && is_array($input['selected_animals'])) {
                $sanitized['selected_animals'] = array_map('sanitize_text_field', $input['selected_animals']);
            }
            // If selected_animals is not set or empty, it means no animals were selected
            // This is handled by the default empty array above
        } else {
            // If form wasn't submitted, keep existing animals
            $existing_settings = get_option('cc_chatbot_settings', array());
            $sanitized['selected_animals'] = $existing_settings['selected_animals'] ?? array('tiger', 'elephant', 'panda');
        }
        
        // Custom animals - limit to prevent memory issues
        $sanitized['custom_animals'] = array();
        if (isset($input['custom_animals']) && is_array($input['custom_animals'])) {
            $custom_animals = array_slice($input['custom_animals'], 0, 10); // Limit to 10
            foreach ($custom_animals as $animal) {
                if (is_array($animal)) {
                    $sanitized['custom_animals'][] = array_map('sanitize_text_field', $animal);
                }
            }
        }
        
        return $sanitized;
    }
    
    /**
     * Admin page callback
     */
    public function admin_page() {
        // Get current settings with proper error handling
        $settings = get_option('cc_chatbot_settings', array());
        if (!is_array($settings)) {
            $settings = array();
        }
        
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
                                <input type="checkbox" name="cc_chatbot_settings[enable_chatbot]" value="1" <?php checked('1', $settings['enable_chatbot'] ?? '1'); ?> />
                                <span class="description">Enable the conservation chatbot on your website</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Organization Name</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[organization_name]" value="<?php echo esc_attr($settings['organization_name'] ?? 'Save the Elephants'); ?>" class="regular-text" />
                                <span class="description">The name of your conservation organization</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Organization Type</th>
                            <td>
                                <select name="cc_chatbot_settings[organization_type]">
                                    <?php
                                    $types = array(
                                        'wildlife' => 'Wildlife Conservation',
                                        'marine' => 'Marine Conservation',
                                        'forest' => 'Forest Conservation',
                                        'climate' => 'Climate Conservation',
                                        'general' => 'General Environmental'
                                    );
                                    $current_type = $settings['organization_type'] ?? 'wildlife';
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
                                <input type="text" name="cc_chatbot_settings[api_key]" id="cc_api_key" value="<?php echo esc_attr($settings['api_key'] ?? ''); ?>" class="regular-text" style="font-family: monospace;" />
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
                                $selected_animals = $settings['selected_animals'] ?? $default_animals;
                                
                                // Ensure selected_animals is an array
                                if (!is_array($selected_animals)) {
                                    $selected_animals = $default_animals;
                                }
                                
                                $available_animals = array(
                                    'tiger' => 'Bengal Tiger',
                                    'elephant' => 'African Elephant', 
                                    'panda' => 'Giant Panda'
                                );
                                foreach ($available_animals as $key => $label) : ?>
                                    <label style="display: block; margin-bottom: 5px;">
                                        <input type="checkbox" name="cc_chatbot_settings[selected_animals][]" value="<?php echo esc_attr($key); ?>" 
                                               <?php checked(in_array($key, $selected_animals)); ?> />
                                        <?php echo esc_html($label); ?>
                                    </label>
                                <?php endforeach; ?>
                                <span class="description">Select which animals to include in the chatbot</span>
                                <!-- Hidden field to indicate animal selection was submitted -->
                                <input type="hidden" name="cc_chatbot_settings[animal_selection_submitted]" value="1" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Show On Pages</th>
                            <td>
                                <select name="cc_chatbot_settings[show_on_pages][]" multiple>
                                    <option value="all" <?php selected(in_array('all', $settings['show_on_pages'] ?? array('all'))); ?>>All Pages</option>
                                    <?php
                                    // Limit pages to prevent memory issues
                                    $pages = get_pages(array('numberposts' => 50));
                                    $selected_pages = $settings['show_on_pages'] ?? array('all');
                                    foreach ($pages as $page) : ?>
                                        <option value="<?php echo $page->ID; ?>" <?php selected(in_array($page->ID, $selected_pages)); ?>>
                                            <?php echo esc_html($page->post_title); ?>
                                        </option>
                                    <?php endforeach; ?>
                                    <option disabled>... (showing first 50 pages only)</option>
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
                                <select name="cc_chatbot_settings[position]">
                                    <?php
                                    $positions = array(
                                        'bottom-right' => 'Bottom Right',
                                        'bottom-left' => 'Bottom Left',
                                        'top-right' => 'Top Right',
                                        'top-left' => 'Top Left'
                                    );
                                    $current_position = $settings['position'] ?? 'bottom-right';
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
                                <input type="text" name="cc_chatbot_settings[color_primary]" value="<?php echo esc_attr($settings['color_primary'] ?? '#222'); ?>" class="color-picker" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Secondary Color</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[color_secondary]" value="<?php echo esc_attr($settings['color_secondary'] ?? '#444'); ?>" class="color-picker" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Accent Color</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[color_accent]" value="<?php echo esc_attr($settings['color_accent'] ?? '#222'); ?>" class="color-picker" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Background Color</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[color_background]" value="<?php echo esc_attr($settings['color_background'] ?? 'rgba(255, 255, 255, 0.2)'); ?>" class="color-picker" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Text Color</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[color_text]" value="<?php echo esc_attr($settings['color_text'] ?? '#333333'); ?>" class="color-picker" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Light Text Color</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[color_text_light]" value="<?php echo esc_attr($settings['color_text_light'] ?? '#ffffff'); ?>" class="color-picker" />
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
                                <select name="cc_chatbot_settings[font_family]">
                                    <?php
                                    $fonts = array(
                                        'Arial, sans-serif' => 'Arial',
                                        'Helvetica, sans-serif' => 'Helvetica',
                                        'Georgia, serif' => 'Georgia',
                                        'Times New Roman, serif' => 'Times New Roman',
                                        'Verdana, sans-serif' => 'Verdana',
                                        'Tahoma, sans-serif' => 'Tahoma'
                                    );
                                    $current_font = $settings['font_family'] ?? 'Arial, sans-serif';
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
                                <input type="text" name="cc_chatbot_settings[font_size_small]" value="<?php echo esc_attr($settings['font_size_small'] ?? '12px'); ?>" class="small-text" />
                                <span class="description">e.g., 12px, 0.75rem</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Medium Font Size</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[font_size_medium]" value="<?php echo esc_attr($settings['font_size_medium'] ?? '14px'); ?>" class="small-text" />
                                <span class="description">e.g., 14px, 0.875rem</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Large Font Size</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[font_size_large]" value="<?php echo esc_attr($settings['font_size_large'] ?? '16px'); ?>" class="small-text" />
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
                                <input type="number" name="cc_chatbot_settings[chat_window_width]" value="<?php echo esc_attr($settings['chat_window_width'] ?? 320); ?>" class="small-text" min="200" max="600" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Chat Window Height (px)</th>
                            <td>
                                <input type="number" name="cc_chatbot_settings[chat_window_height]" value="<?php echo esc_attr($settings['chat_window_height'] ?? 450); ?>" class="small-text" min="300" max="800" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Launcher Size (px)</th>
                            <td>
                                <input type="number" name="cc_chatbot_settings[launcher_size]" value="<?php echo esc_attr($settings['launcher_size'] ?? 60); ?>" class="small-text" min="40" max="100" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Avatar Size (px)</th>
                            <td>
                                <input type="number" name="cc_chatbot_settings[avatar_size]" value="<?php echo esc_attr($settings['avatar_size'] ?? 40); ?>" class="small-text" min="20" max="80" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Close Button Size (px)</th>
                            <td>
                                <input type="number" name="cc_chatbot_settings[close_button_size]" value="<?php echo esc_attr($settings['close_button_size'] ?? 24); ?>" class="small-text" min="16" max="48" />
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
                                <input type="number" name="cc_chatbot_settings[border_radius_chat_window]" value="<?php echo esc_attr($settings['border_radius_chat_window'] ?? 12); ?>" class="small-text" min="0" max="50" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Chat Bubbles Border Radius (px)</th>
                            <td>
                                <input type="number" name="cc_chatbot_settings[border_radius_chat_bubbles]" value="<?php echo esc_attr($settings['border_radius_chat_bubbles'] ?? 18); ?>" class="small-text" min="0" max="50" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Launcher Border Radius (px)</th>
                            <td>
                                <input type="number" name="cc_chatbot_settings[border_radius_launcher]" value="<?php echo esc_attr($settings['border_radius_launcher'] ?? 50); ?>" class="small-text" min="0" max="50" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Input Field Border Radius (px)</th>
                            <td>
                                <input type="number" name="cc_chatbot_settings[border_radius_input_field]" value="<?php echo esc_attr($settings['border_radius_input_field'] ?? 20); ?>" class="small-text" min="0" max="50" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt Buttons Border Radius (px)</th>
                            <td>
                                <input type="number" name="cc_chatbot_settings[border_radius_prompt_buttons]" value="<?php echo esc_attr($settings['border_radius_prompt_buttons'] ?? 15); ?>" class="small-text" min="0" max="50" />
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
                                <input type="checkbox" name="cc_chatbot_settings[enable_quick_prompts]" value="1" <?php checked('1', $settings['enable_quick_prompts'] ?? '1'); ?> />
                                <span class="description">Enable quick prompt buttons</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt 1 - Button Text</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[prompt_1_text]" value="<?php echo esc_attr($settings['prompt_1_text'] ?? ''); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt 1 - Message</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[prompt_1_message]" value="<?php echo esc_attr($settings['prompt_1_message'] ?? ''); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt 2 - Button Text</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[prompt_2_text]" value="<?php echo esc_attr($settings['prompt_2_text'] ?? ''); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt 2 - Message</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[prompt_2_message]" value="<?php echo esc_attr($settings['prompt_2_message'] ?? ''); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt 3 - Button Text</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[prompt_3_text]" value="<?php echo esc_attr($settings['prompt_3_text'] ?? ''); ?>" class="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Prompt 3 - Message</th>
                            <td>
                                <input type="text" name="cc_chatbot_settings[prompt_3_message]" value="<?php echo esc_attr($settings['prompt_3_message'] ?? ''); ?>" class="regular-text" />
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
                                <input type="checkbox" name="cc_chatbot_settings[enable_heart]" value="1" <?php checked('1', $settings['enable_heart'] ?? '1'); ?> />
                                <span class="description">Enable the heart/like feature in the chatbot</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Enable Animal Selector</th>
                            <td>
                                <input type="checkbox" name="cc_chatbot_settings[enable_animal_selector]" value="1" <?php checked('1', $settings['enable_animal_selector'] ?? '1'); ?> />
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
                                    $selected_animals = $settings['selected_animals'] ?? array('tiger', 'elephant', 'panda');
                                    
                                    // Ensure selected_animals is an array
                                    if (!is_array($selected_animals)) {
                                        $selected_animals = array('tiger', 'elephant', 'panda');
                                    }
                                    
                                    foreach ($default_animals as $key => $label) : ?>
                                        <label>
                                            <input type="checkbox" name="cc_chatbot_settings[selected_animals][]" value="<?php echo esc_attr($key); ?>" 
                                                   <?php checked(in_array($key, $selected_animals)); ?> />
                                            <?php echo esc_html($label); ?>
                                        </label><br>
                                    <?php endforeach; ?>
                                </fieldset>
                                <span class="description">Select which animals to include in the chatbot</span>
                                <!-- Hidden field to indicate animal selection was submitted -->
                                <input type="hidden" name="cc_chatbot_settings[animal_selection_submitted]" value="1" />
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
                
                <!-- Hidden field for custom animals -->
                <input type="hidden" name="cc_chatbot_settings[custom_animals]" value="<?php 
                    $custom_animals = $settings['custom_animals'] ?? array();
                    // Limit custom animals to prevent memory issues
                    if (is_array($custom_animals) && count($custom_animals) > 10) {
                        $custom_animals = array_slice($custom_animals, 0, 10);
                    }
                    echo esc_attr(json_encode($custom_animals)); 
                ?>" />
                
                <!-- Hidden field for theme -->
                <input type="hidden" name="cc_chatbot_settings[theme]" value="<?php echo esc_attr($settings['theme'] ?? 'nature'); ?>" />
                
                <?php submit_button(); ?>
            </form>
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
        });
        </script>
        
        <style>
        .tab-content { margin-top: 20px; }
        .color-picker { width: 100px; }
        </style>
        
        <script>
        // Add refresh notification after settings save
        jQuery(document).ready(function($) {
            // Check if settings were just saved
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('settings-updated') === 'true') {
                // Show success message
                $('<div class="notice notice-success is-dismissible"><p>Settings saved successfully! The chatbot will update automatically on the frontend.</p></div>')
                    .insertAfter('.wrap h1');
            }
        });
        </script>
        <?php
    }
    

} 