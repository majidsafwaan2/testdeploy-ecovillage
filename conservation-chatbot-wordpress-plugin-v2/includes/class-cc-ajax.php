<?php
/**
 * AJAX functionality for Conservation Chatbot
 *
 * @package ConservationChatbot
 */

if (!defined('ABSPATH')) {
    exit;
}

class CC_Ajax {
    
    /**
     * Initialize AJAX handlers
     */
    public function init() {
        add_action('wp_ajax_cc_chat_message', array($this, 'handle_chat_message'));
        add_action('wp_ajax_nopriv_cc_chat_message', array($this, 'handle_chat_message'));
    }
    
    /**
     * Handle chat message AJAX request
     */
    public function handle_chat_message() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'cc_nonce')) {
            wp_send_json_error('Invalid nonce');
            return;
        }
        
        // Sanitize input
        $user_message = sanitize_text_field($_POST['message']);
        $animal_data = $_POST['animal'];
        $prompt = sanitize_textarea_field($_POST['prompt']);
        
        if (empty($user_message)) {
            wp_send_json_error('Empty message');
            return;
        }
        
        // Get API key
        $api_key = get_option('cc_api_key', '');
        if (empty($api_key)) {
            wp_send_json_error('API key not configured');
            return;
        }
        
        // Send to Gemini API
        $response = $this->send_to_gemini($api_key, $prompt);
        
        if (is_wp_error($response)) {
            wp_send_json_error($response->get_error_message());
            return;
        }
        
        wp_send_json_success(array(
            'response' => $response
        ));
    }
    
    /**
     * Send request to Gemini API
     */
    private function send_to_gemini($api_key, $prompt) {
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
        
        $body = array(
            'contents' => array(
                array(
                    'parts' => array(
                        array(
                            'text' => $prompt
                        )
                    )
                )
            ),
            'generationConfig' => array(
                'temperature' => 0.7,
                'topK' => 40,
                'topP' => 0.95,
                'maxOutputTokens' => 300
            )
        );
        
        $args = array(
            'method' => 'POST',
            'headers' => array(
                'Content-Type' => 'application/json',
                'x-goog-api-key' => $api_key
            ),
            'body' => json_encode($body),
            'timeout' => 30
        );
        
        $response = wp_remote_post($url, $args);
        
        if (is_wp_error($response)) {
            return $response;
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if (empty($data) || !isset($data['candidates'][0]['content']['parts'][0]['text'])) {
            return new WP_Error('invalid_response', 'Invalid response from Gemini API');
        }
        
        return trim($data['candidates'][0]['content']['parts'][0]['text']);
    }
} 