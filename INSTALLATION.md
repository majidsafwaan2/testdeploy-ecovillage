# Installation Guide

## Prerequisites

Before installing the Conservation Chatbot WordPress Plugin, ensure your system meets the following requirements:

### System Requirements

- **WordPress**: 5.0 or higher
- **PHP**: 7.4 or higher (8.0+ recommended)
- **MySQL**: 5.6 or higher (8.0+ recommended)
- **Memory Limit**: 256MB minimum (512MB recommended)
- **Upload Limit**: 10MB minimum
- **SSL Certificate**: Required for production (recommended for development)

### Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

### Server Requirements

- **Apache**: 2.4+ with mod_rewrite enabled
- **Nginx**: 1.18+ (with proper rewrite rules)
- **PHP Extensions**: 
  - cURL
  - JSON
  - OpenSSL
  - mbstring
  - XML

## Installation Methods

### Method 1: WordPress Admin Installation (Recommended)

#### Step 1: Download the Plugin

1. **Download from GitHub**
   - Visit [https://github.com/majidsafwaan2/conservation-chatbot-wp-version](https://github.com/majidsafwaan2/conservation-chatbot-wp-version)
   - Click the green "Code" button
   - Select "Download ZIP"
   - Save the file to your computer

2. **Alternative Download**
   - Go to the [Releases](https://github.com/majidsafwaan2/conservation-chatbot-wp-version/releases) page
   - Download the latest release ZIP file
   - Example: `conservation-chatbot-wordpress-plugin-v46.zip`

#### Step 2: Install via WordPress Admin

1. **Access WordPress Admin**
   - Log in to your WordPress admin panel
   - Navigate to `your-site.com/wp-admin`

2. **Upload Plugin**
   - Go to **Plugins** → **Add New**
   - Click **Upload Plugin** button
   - Click **Choose File**
   - Select the downloaded ZIP file
   - Click **Install Now**

3. **Activate Plugin**
   - After successful installation, click **Activate Plugin**
   - The plugin will automatically:
     - Create necessary database tables
     - Set default options
     - Initialize the chatbot system

#### Step 3: Verify Installation

1. **Check Plugin Status**
   - Go to **Plugins** → **Installed Plugins**
   - Look for "Conservation Chatbot"
   - Status should show "Active"

2. **Check Admin Menu**
   - Look for "Conservation Chatbot" in the left sidebar
   - Click to access the settings page

### Method 2: FTP Installation

#### Step 1: Prepare Files

1. **Extract Plugin**
   ```bash
   # Extract the ZIP file
   unzip conservation-chatbot-wordpress-plugin-v46.zip
   
   # Verify contents
   ls -la conservation-chatbot-wordpress-plugin-v38/
   ```

2. **Rename Directory** (Optional)
   ```bash
   # Rename for cleaner installation
   mv conservation-chatbot-wordpress-plugin-v38 conservation-chatbot
   ```

#### Step 2: Upload via FTP

1. **Connect to Server**
   - Use FTP client (FileZilla, WinSCP, etc.)
   - Connect to your web server
   - Navigate to `/wp-content/plugins/`

2. **Upload Files**
   - Upload the `conservation-chatbot` folder
   - Ensure all files are transferred
   - Verify file permissions (755 for folders, 644 for files)

3. **Verify Upload**
   - Check that all files are present
   - Ensure no files are corrupted
   - Verify directory structure

#### Step 3: Activate Plugin

1. **Access WordPress Admin**
   - Go to your WordPress admin panel
   - Navigate to **Plugins** → **Installed Plugins**

2. **Activate Plugin**
   - Find "Conservation Chatbot"
   - Click **Activate**
   - Wait for activation to complete

### Method 3: Git Installation (Developers)

#### Step 1: Clone Repository

```bash
# Navigate to plugins directory
cd wp-content/plugins/

# Clone the repository
git clone https://github.com/majidsafwaan2/conservation-chatbot-wp-version.git conservation-chatbot

# Navigate to plugin directory
cd conservation-chatbot

# Check out latest release
git checkout v46
```

#### Step 2: Set Permissions

```bash
# Set proper permissions
chmod -R 755 .
find . -type f -exec chmod 644 {} \;

# Set ownership (if needed)
chown -R www-data:www-data .
```

#### Step 3: Activate Plugin

1. **Access WordPress Admin**
2. **Go to Plugins** → **Installed Plugins**
3. **Activate Conservation Chatbot**

## Post-Installation Setup

### Step 1: Initial Configuration

1. **Access Settings**
   - Go to **Conservation Chatbot** → **Settings**
   - You'll see the main configuration page

2. **Basic Setup**
   - **Organization Name**: Enter your organization's name
   - **Organization Type**: Select your conservation focus
   - **API Key**: Enter your Google Gemini API key (see next section)

3. **Save Settings**
   - Click **Save Changes**
   - Verify settings are saved

### Step 2: API Key Setup

#### Getting Google Gemini API Key

1. **Visit Google AI Studio**
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**
   - Click **Create API Key**
   - Select **Create API Key in new project** (recommended)
   - Copy the generated API key

3. **Configure in WordPress**
   - Go to **Conservation Chatbot** → **Settings**
   - Paste your API key in the **API Key** field
   - Click **Save Changes**

#### API Key Security

```php
// Recommended: Store API key in wp-config.php
define('CC_GEMINI_API_KEY', 'your-api-key-here');

// Alternative: Use environment variables
$api_key = getenv('CC_GEMINI_API_KEY');
```

### Step 3: Test Installation

1. **Check Frontend**
   - Visit any page on your website
   - Look for the chatbot launcher (bottom-right by default)
   - Click to open the chat

2. **Test Basic Functionality**
   - Try the quick prompts
   - Test animal switching
   - Verify AI responses

3. **Check Admin Panel**
   - Verify all settings pages load
   - Test feature toggles
   - Check custom animal creation

## Troubleshooting Installation

### Common Issues

#### Issue 1: Plugin Not Appearing

**Symptoms**: Plugin doesn't show in installed plugins list

**Solutions**:
1. **Check File Permissions**
   ```bash
   chmod -R 755 wp-content/plugins/conservation-chatbot/
   chmod 644 wp-content/plugins/conservation-chatbot/*.php
   ```

2. **Verify File Structure**
   ```
   conservation-chatbot/
   ├── conservation-chatbot.php
   ├── includes/
   ├── assets/
   ├── README.md
   └── LICENSE
   ```

3. **Check PHP Errors**
   - Enable debug mode in `wp-config.php`
   - Check error logs

#### Issue 2: Activation Fails

**Symptoms**: Plugin fails to activate or shows error

**Solutions**:
1. **Check PHP Version**
   ```php
   // Add to wp-config.php for testing
   error_reporting(E_ALL);
   ini_set('display_errors', 1);
   ```

2. **Check Memory Limit**
   ```php
   // Increase memory limit
   define('WP_MEMORY_LIMIT', '512M');
   ```

3. **Check Database Permissions**
   - Ensure WordPress can create tables
   - Check database user permissions

#### Issue 3: Files Not Uploading

**Symptoms**: FTP upload fails or files are corrupted

**Solutions**:
1. **Check FTP Settings**
   - Use binary transfer mode
   - Verify connection stability
   - Check server space

2. **Alternative Upload**
   - Use cPanel File Manager
   - Try different FTP client
   - Upload in smaller chunks

### Performance Optimization

#### Server Configuration

1. **PHP Settings**
   ```ini
   ; Recommended PHP settings
   memory_limit = 512M
   max_execution_time = 300
   upload_max_filesize = 10M
   post_max_size = 10M
   ```

2. **WordPress Settings**
   ```php
   // Add to wp-config.php
   define('WP_MEMORY_LIMIT', '512M');
   define('WP_MAX_MEMORY_LIMIT', '512M');
   ```

3. **Caching**
   - Enable object caching
   - Use page caching
   - Optimize database

#### Plugin Optimization

1. **Asset Optimization**
   - Minify CSS/JS
   - Enable gzip compression
   - Use CDN for assets

2. **Database Optimization**
   - Regular database cleanup
   - Optimize tables
   - Monitor query performance

## Security Considerations

### File Permissions

```bash
# Secure file permissions
find /path/to/wordpress/wp-content/plugins/conservation-chatbot -type d -exec chmod 755 {} \;
find /path/to/wordpress/wp-content/plugins/conservation-chatbot -type f -exec chmod 644 {} \;
```

### API Key Security

1. **Environment Variables**
   ```bash
   # Add to .env file
   CC_GEMINI_API_KEY=your-api-key-here
   ```

2. **Database Storage**
   - API keys are encrypted in database
   - Use WordPress nonces for security
   - Regular key rotation recommended

### Access Control

1. **Admin Access**
   - Limit admin access
   - Use strong passwords
   - Enable two-factor authentication

2. **Plugin Access**
   - Restrict plugin settings to admins
   - Use capability checks
   - Audit access logs

## Uninstallation

### Complete Removal

1. **Deactivate Plugin**
   - Go to **Plugins** → **Installed Plugins**
   - Click **Deactivate** for Conservation Chatbot

2. **Remove Files**
   ```bash
   # Remove plugin directory
   rm -rf wp-content/plugins/conservation-chatbot/
   ```

3. **Clean Database** (Optional)
   ```sql
   -- Remove plugin options
   DELETE FROM wp_options WHERE option_name LIKE 'cc_%';
   
   -- Remove plugin tables (if any)
   DROP TABLE IF EXISTS wp_cc_chatbot_logs;
   ```

### Backup Before Removal

1. **Export Settings**
   - Go to **Conservation Chatbot** → **Settings**
   - Note down important configurations
   - Export custom animals data

2. **Backup Database**
   ```bash
   # Create database backup
   mysqldump -u username -p database_name > backup.sql
   ```

3. **Backup Files**
   ```bash
   # Backup plugin directory
   cp -r wp-content/plugins/conservation-chatbot/ backup/
   ```

## Support

### Getting Help

1. **Documentation**
   - Check [README.md](README.md)
   - Review [Troubleshooting Guide](TROUBLESHOOTING.md)
   - Visit [Wiki](https://github.com/majidsafwaan2/conservation-chatbot-wp-version/wiki)

2. **Community Support**
   - [GitHub Issues](https://github.com/majidsafwaan2/conservation-chatbot-wp-version/issues)
   - [WordPress Support Forums](https://wordpress.org/support/)

3. **Professional Support**
   - Email: support@conservation-chatbot.com
   - Response time: 24-48 hours

### Reporting Issues

When reporting installation issues, please include:

1. **Environment Details**
   - WordPress version
   - PHP version
   - Server information
   - Browser details

2. **Error Messages**
   - Full error text
   - Screenshots
   - Log files

3. **Steps Taken**
   - Installation method used
   - Steps followed
   - Expected vs actual behavior

---

**Need Help?** Check our [Troubleshooting Guide](TROUBLESHOOTING.md) or [contact support](mailto:support@conservation-chatbot.com). 