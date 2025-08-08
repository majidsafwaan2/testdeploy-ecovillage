# Troubleshooting Guide

This comprehensive troubleshooting guide will help you resolve common issues with the Conservation Chatbot WordPress Plugin.

## Quick Diagnosis

### Step 1: Check Plugin Status
1. Go to **Plugins** → **Installed Plugins**
2. Verify "Conservation Chatbot" is **Active**
3. Check for any error messages

### Step 2: Check System Requirements
```php
// Add this to your theme's functions.php for testing
add_action('admin_notices', 'check_cc_requirements');
function check_cc_requirements() {
    $issues = [];
    
    // Check PHP version
    if (version_compare(PHP_VERSION, '7.4', '<')) {
        $issues[] = 'PHP version ' . PHP_VERSION . ' is below required 7.4';
    }
    
    // Check WordPress version
    if (version_compare(get_bloginfo('version'), '5.0', '<')) {
        $issues[] = 'WordPress version ' . get_bloginfo('version') . ' is below required 5.0';
    }
    
    // Check memory limit
    $memory_limit = ini_get('memory_limit');
    $memory_limit_bytes = wp_convert_hr_to_bytes($memory_limit);
    if ($memory_limit_bytes < 268435456) { // 256MB
        $issues[] = 'Memory limit ' . $memory_limit . ' is below recommended 256MB';
    }
    
    if (!empty($issues)) {
        echo '<div class="notice notice-error"><p><strong>Conservation Chatbot Requirements:</strong></p><ul>';
        foreach ($issues as $issue) {
            echo '<li>' . esc_html($issue) . '</li>';
        }
        echo '</ul></div>';
    }
}
```

### Step 3: Enable Debug Mode
```php
// Add to wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

## Common Issues

### Issue 1: Chatbot Not Appearing

#### Symptoms
- Chatbot launcher not visible on website
- No error messages in console
- Plugin is activated

#### Solutions

**Solution 1: Check Visibility Settings**
1. Go to **Conservation Chatbot** → **Settings**
2. Verify **Enable Chatbot** is checked
3. Check **Show on Pages** settings
4. Ensure current page is included

**Solution 2: Check JavaScript Loading**
```javascript
// Add this to browser console
console.log('CC Settings:', typeof cc_settings !== 'undefined' ? cc_settings : 'Not loaded');
console.log('CC Elements:', typeof window.cc_elements !== 'undefined' ? window.cc_elements : 'Not loaded');
```

**Solution 3: Check for JavaScript Conflicts**
1. Temporarily deactivate other plugins
2. Switch to default theme
3. Test if chatbot appears
4. Re-activate plugins one by one

**Solution 4: Check File Permissions**
```bash
# Set correct permissions
chmod -R 755 wp-content/plugins/conservation-chatbot/
find wp-content/plugins/conservation-chatbot -type f -exec chmod 644 {} \;
```

**Solution 5: Clear Cache**
1. Clear browser cache
2. Clear WordPress cache
3. Clear CDN cache (if using)
4. Clear server cache

### Issue 2: API Key Errors

#### Symptoms
- "API key not configured" error
- "Invalid API key" error
- Chatbot appears but doesn't respond

#### Solutions

**Solution 1: Verify API Key**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Check if API key is active
3. Copy the key again
4. Paste in WordPress settings

**Solution 2: Test API Key**
```php
// Add this to test API key
add_action('admin_notices', 'test_cc_api_key');
function test_cc_api_key() {
    $api_key = get_option('cc_chatbot_settings')['api_key'] ?? '';
    if (!empty($api_key)) {
        $test_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' . $api_key;
        $response = wp_remote_post($test_url, [
            'body' => json_encode([
                'contents' => [
                    ['parts' => [['text' => 'Hello']]]
                ]
            ]),
            'headers' => ['Content-Type' => 'application/json']
        ]);
        
        if (is_wp_error($response)) {
            echo '<div class="notice notice-error"><p>API Key Test Failed: ' . $response->get_error_message() . '</p></div>';
        } else {
            $body = wp_remote_retrieve_body($response);
            $data = json_decode($body, true);
            if (isset($data['error'])) {
                echo '<div class="notice notice-error"><p>API Key Error: ' . $data['error']['message'] . '</p></div>';
            } else {
                echo '<div class="notice notice-success"><p>API Key Test: Success!</p></div>';
            }
        }
    }
}
```

**Solution 3: Check API Key Format**
- API key should be 39 characters long
- Should start with "AI"
- No spaces or special characters

**Solution 4: Check Network Issues**
```php
// Test network connectivity
$test_url = 'https://generativelanguage.googleapis.com/';
$response = wp_remote_get($test_url);
if (is_wp_error($response)) {
    echo '<div class="notice notice-error"><p>Network Error: ' . $response->get_error_message() . '</p></div>';
}
```

### Issue 3: Custom Animals Not Saving

#### Symptoms
- Custom animals disappear after saving
- Animals not appearing in selection
- Error messages when adding animals

#### Solutions

**Solution 1: Check Database Permissions**
```sql
-- Check if WordPress can write to options table
SHOW GRANTS FOR 'wordpress_user'@'localhost';
```

**Solution 2: Verify JSON Encoding**
```php
// Test JSON encoding
$test_data = [
    'name' => 'Test Animal',
    'type' => 'Test Species',
    'story' => 'Test story',
    'enabled' => '1'
];
$json = json_encode($test_data);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo 'JSON Error: ' . json_last_error_msg();
}
```

**Solution 3: Check JavaScript Errors**
```javascript
// Add to browser console
console.log('Custom animals data:', document.querySelector('input[name="cc_chatbot_settings[custom_animals]"]').value);
```

**Solution 4: Increase Memory Limit**
```php
// Add to wp-config.php
define('WP_MEMORY_LIMIT', '512M');
```

### Issue 4: Features Not Updating

#### Symptoms
- Feature changes don't appear on frontend
- Heart button still visible when disabled
- Animal selector not hiding when disabled

#### Solutions

**Solution 1: Clear Browser Cache**
1. Hard refresh (Ctrl+F5 or Cmd+Shift+R)
2. Clear browser cache completely
3. Test in incognito/private mode

**Solution 2: Check Feature Settings**
```php
// Debug feature settings
$settings = get_option('cc_chatbot_settings');
$features = $settings['customization']['features'] ?? [];
error_log('CC Features: ' . print_r($features, true));
```

**Solution 3: Force Refresh**
```javascript
// Force refresh features
if (typeof window.refreshConservationChatbotFeatures === 'function') {
    window.refreshConservationChatbotFeatures();
}
```

**Solution 4: Check JavaScript Loading**
```javascript
// Check if features are loaded
console.log('Feature settings:', cc_settings?.customization?.features);
```

### Issue 5: Styling Issues

#### Symptoms
- Chatbot looks broken or unstyled
- Colors not applying correctly
- Layout issues on mobile

#### Solutions

**Solution 1: Check CSS Loading**
```php
// Verify CSS is loading
add_action('wp_head', 'check_cc_css');
function check_cc_css() {
    $css_url = plugin_dir_url(__FILE__) . 'assets/css/chatbot.css';
    echo '<link rel="stylesheet" href="' . esc_url($css_url) . '">';
}
```

**Solution 2: Check Theme Conflicts**
1. Switch to default theme
2. Test chatbot appearance
3. Check theme's CSS for conflicts

**Solution 3: Custom CSS Fixes**
```css
/* Add to theme's custom CSS */
#conservation-chatbot-container {
    z-index: 999999 !important;
}

.conservation-chatbot-header {
    background-color: #222 !important;
}

.conservation-chatbot-message {
    max-width: 75% !important;
}
```

**Solution 4: Mobile Responsiveness**
```css
/* Mobile-specific fixes */
@media (max-width: 768px) {
    #conservation-chatbot-container {
        width: 100% !important;
        height: 100% !important;
        border-radius: 0 !important;
    }
    
    .conservation-chatbot-input {
        font-size: 16px !important; /* Prevents zoom on iOS */
    }
}
```

### Issue 6: Performance Issues

#### Symptoms
- Slow loading times
- High memory usage
- Timeout errors

#### Solutions

**Solution 1: Optimize Images**
```php
// Add image optimization
add_filter('wp_handle_upload', 'optimize_cc_images');
function optimize_cc_images($file) {
    if (strpos($file['url'], 'conservation-chatbot') !== false) {
        // Optimize image
        $image = wp_get_image_editor($file['file']);
        if (!is_wp_error($image)) {
            $image->resize(800, 800, false);
            $image->save($file['file']);
        }
    }
    return $file;
}
```

**Solution 2: Enable Caching**
```php
// Add caching headers
add_action('wp_head', 'cc_cache_headers');
function cc_cache_headers() {
    if (strpos($_SERVER['REQUEST_URI'], 'conservation-chatbot') !== false) {
        header('Cache-Control: public, max-age=3600');
    }
}
```

**Solution 3: Optimize Database**
```sql
-- Optimize options table
OPTIMIZE TABLE wp_options;

-- Clean up old options
DELETE FROM wp_options WHERE option_name LIKE 'cc_%' AND option_value = '';
```

**Solution 4: Monitor Performance**
```php
// Add performance monitoring
add_action('wp_footer', 'cc_performance_monitor');
function cc_performance_monitor() {
    if (defined('WP_DEBUG') && WP_DEBUG) {
        $memory_usage = memory_get_usage(true);
        $peak_memory = memory_get_peak_usage(true);
        echo "<!-- CC Memory: " . size_format($memory_usage) . " Peak: " . size_format($peak_memory) . " -->";
    }
}
```

## Advanced Troubleshooting

### Debug Mode

#### Enable Full Debug
```php
// Add to wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('SAVEQUERIES', true);

// Add to functions.php
add_action('wp_footer', 'cc_debug_info');
function cc_debug_info() {
    if (current_user_can('administrator')) {
        echo '<!-- CC Debug Info:';
        echo ' Settings: ' . (get_option('cc_chatbot_settings') ? 'Loaded' : 'Not loaded');
        echo ' API Key: ' . (get_option('cc_chatbot_settings')['api_key'] ? 'Set' : 'Not set');
        echo ' -->';
    }
}
```

#### Check Error Logs
```bash
# Check WordPress error log
tail -f wp-content/debug.log

# Check server error log
tail -f /var/log/apache2/error.log
tail -f /var/log/nginx/error.log
```

### Database Issues

#### Check Database Integrity
```sql
-- Check for corrupted options
SELECT option_name, option_value 
FROM wp_options 
WHERE option_name LIKE 'cc_%' 
AND option_value IS NOT NULL;

-- Check for orphaned data
SELECT COUNT(*) as orphaned_options 
FROM wp_options 
WHERE option_name LIKE 'cc_%' 
AND option_value = '';
```

#### Reset Plugin Data
```php
// Reset all plugin data (use with caution)
add_action('admin_post_reset_cc_data', 'reset_cc_data');
function reset_cc_data() {
    if (current_user_can('manage_options')) {
        delete_option('cc_chatbot_settings');
        wp_redirect(admin_url('admin.php?page=conservation-chatbot&reset=success'));
        exit;
    }
}
```

### Network Issues

#### Test API Connectivity
```php
// Test API connectivity
function test_cc_api_connectivity() {
    $test_url = 'https://generativelanguage.googleapis.com/';
    $response = wp_remote_get($test_url, [
        'timeout' => 30,
        'sslverify' => false
    ]);
    
    if (is_wp_error($response)) {
        return 'Connection failed: ' . $response->get_error_message();
    }
    
    $status_code = wp_remote_retrieve_response_code($response);
    if ($status_code === 200) {
        return 'Connection successful';
    } else {
        return 'Connection failed: HTTP ' . $status_code;
    }
}
```

#### Check SSL Issues
```php
// Test SSL certificate
function test_cc_ssl() {
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);
    
    $result = file_get_contents('https://generativelanguage.googleapis.com/', false, $context);
    return $result !== false ? 'SSL working' : 'SSL failed';
}
```

## Performance Optimization

### Server Optimization

#### PHP Settings
```ini
; Recommended PHP settings for optimal performance
memory_limit = 512M
max_execution_time = 300
upload_max_filesize = 10M
post_max_size = 10M
max_input_vars = 3000
```

#### WordPress Settings
```php
// Add to wp-config.php
define('WP_MEMORY_LIMIT', '512M');
define('WP_MAX_MEMORY_LIMIT', '512M');
define('WP_CACHE', true);
```

### Plugin Optimization

#### Asset Optimization
```php
// Minify and combine assets
add_action('wp_enqueue_scripts', 'optimize_cc_assets');
function optimize_cc_assets() {
    // Only load on pages that need chatbot
    if (is_front_page() || is_page()) {
        wp_enqueue_script('conservation-chatbot', plugin_dir_url(__FILE__) . 'assets/js/chatbot.min.js', [], '1.0', true);
        wp_enqueue_style('conservation-chatbot', plugin_dir_url(__FILE__) . 'assets/css/chatbot.min.css', [], '1.0');
    }
}
```

#### Database Optimization
```php
// Clean up old data
add_action('wp_scheduled_delete', 'cleanup_cc_data');
function cleanup_cc_data() {
    // Clean up old chat logs (if any)
    $old_logs = get_option('cc_chatbot_logs', []);
    $cutoff = time() - (30 * 24 * 60 * 60); // 30 days
    
    foreach ($old_logs as $key => $log) {
        if ($log['timestamp'] < $cutoff) {
            unset($old_logs[$key]);
        }
    }
    
    update_option('cc_chatbot_logs', $old_logs);
}
```

## Security Issues

### API Key Security

#### Secure Storage
```php
// Encrypt API key in database
function encrypt_cc_api_key($api_key) {
    $encryption_key = wp_salt('auth');
    return openssl_encrypt($api_key, 'AES-256-CBC', $encryption_key, 0, substr(hash('sha256', $encryption_key), 0, 16));
}

function decrypt_cc_api_key($encrypted_key) {
    $encryption_key = wp_salt('auth');
    return openssl_decrypt($encrypted_key, 'AES-256-CBC', $encryption_key, 0, substr(hash('sha256', $encryption_key), 0, 16));
}
```

#### Access Control
```php
// Restrict access to plugin settings
add_action('admin_init', 'restrict_cc_access');
function restrict_cc_access() {
    if (isset($_GET['page']) && $_GET['page'] === 'conservation-chatbot') {
        if (!current_user_can('manage_options')) {
            wp_die('Access denied');
        }
    }
}
```

### XSS Prevention

#### Input Sanitization
```php
// Sanitize all inputs
function sanitize_cc_input($input) {
    if (is_array($input)) {
        return array_map('sanitize_cc_input', $input);
    }
    return sanitize_text_field($input);
}
```

#### Output Escaping
```php
// Escape all outputs
function escape_cc_output($output) {
    return esc_html($output);
}
```

## Getting Help

### Before Contacting Support

1. **Check Documentation**
   - Review this troubleshooting guide
   - Check [README.md](README.md)
   - Visit [Wiki](https://github.com/majidsafwaan2/conservation-chatbot-wp-version/wiki)

2. **Search Existing Issues**
   - Check [GitHub Issues](https://github.com/majidsafwaan2/conservation-chatbot-wp-version/issues)
   - Search for similar problems
   - Check if solution already exists

3. **Test with Default Settings**
   - Reset to default configuration
   - Test with default theme
   - Disable other plugins

### Contacting Support

#### Information to Include

1. **Environment Details**
   ```
   WordPress Version: 6.0
   PHP Version: 8.1
   Plugin Version: 46
   Theme: Twenty Twenty-Three
   Browser: Chrome 120
   Server: Apache 2.4
   ```

2. **Error Messages**
   - Full error text
   - Screenshots
   - Console errors
   - Server logs

3. **Steps to Reproduce**
   - Detailed steps
   - Expected behavior
   - Actual behavior
   - When issue occurs

#### Support Channels

1. **GitHub Issues**
   - [Create new issue](https://github.com/majidsafwaan2/conservation-chatbot-wp-version/issues/new)
   - Use issue template
   - Include all required information

2. **Email Support**
   - Email: support@conservation-chatbot.com
   - Response time: 24-48 hours
   - Include all relevant details

3. **Community Support**
   - [WordPress Support Forums](https://wordpress.org/support/)
   - [Discord Community](https://discord.gg/conservation-chatbot)

### Issue Templates

#### Bug Report Template
```markdown
**Environment**
- WordPress Version: [version]
- PHP Version: [version]
- Plugin Version: [version]
- Theme: [theme name]
- Browser: [browser and version]

**Issue Description**
[Detailed description of the problem]

**Steps to Reproduce**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior**
[What should happen]

**Actual Behavior**
[What actually happens]

**Screenshots**
[Add screenshots if applicable]

**Additional Information**
[Any other relevant details]
```

#### Feature Request Template
```markdown
**Feature Description**
[Detailed description of the requested feature]

**Use Case**
[How this feature would be used]

**Proposed Implementation**
[How you think this could be implemented]

**Additional Information**
[Any other relevant details]
```

---

**Need More Help?** Check our [Installation Guide](INSTALLATION.md) or [contact support](mailto:support@conservation-chatbot.com). 