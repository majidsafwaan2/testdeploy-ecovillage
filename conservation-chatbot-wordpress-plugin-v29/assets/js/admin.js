/**
 * Admin JavaScript for Conservation Chatbot
 * Handles customization interface and settings
 */

jQuery(document).ready(function($) {
    
    // Initialize color pickers
    $('.color-picker').wpColorPicker();
    
    // Tab functionality
    $('.nav-tab').click(function(e) {
        e.preventDefault();
        $('.nav-tab').removeClass('nav-tab-active');
        $(this).addClass('nav-tab-active');
        $('.tab-content').hide();
        $($(this).attr('href')).show();
    });
    
    // Simple form validation - just warn about missing API key
    $('form').submit(function(e) {
        const apiKey = $('input[name="cc_api_key"]').val();
        if (apiKey.trim() === '') {
            if (!confirm('Warning: No API key entered. The chatbot will not function without a valid Gemini API key. Continue saving other settings?')) {
                e.preventDefault();
                return false;
            }
        }
        
            // Log animal selection for debugging
    const animalCheckboxes = $('input[name="cc_chatbot_settings[selected_animals][]"]:checked');
    console.log('Animal checkboxes checked:', animalCheckboxes.length);
    console.log('Form being submitted with animal selection');
    });
    
    // Size validation
    $('input[type="number"]').on('change', function() {
        const value = parseInt($(this).val());
        const min = parseInt($(this).attr('min'));
        const max = parseInt($(this).attr('max'));
        
        if (value < min) {
            $(this).val(min);
        } else if (value > max) {
            $(this).val(max);
        }
    });
    
    // Font size validation
    $('input[name*="font_size"]').on('change', function() {
        const value = $(this).val();
        const regex = /^\d+(px|rem|em)$/;
        
        if (!regex.test(value)) {
            alert('Please enter a valid font size (e.g., 14px, 1rem)');
            $(this).focus();
        }
    });
    
    // Color validation
    $('.color-picker').on('change', function() {
        const value = $(this).val();
        const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgba?\([^)]+\)$/;
        
        if (!regex.test(value)) {
            alert('Please enter a valid color (hex or rgba)');
            $(this).focus();
        }
    });
    
    // API Key show/hide toggle
    $('#toggle_api_key').click(function() {
        const apiKeyField = $('#cc_api_key');
        const currentType = apiKeyField.attr('type');
        
        if (currentType === 'password') {
            apiKeyField.attr('type', 'text');
            $(this).text('Hide');
        } else {
            apiKeyField.attr('type', 'password');
            $(this).text('Show');
        }
    });
    
    // Initialize API key field state
    $(document).ready(function() {
        const apiKeyField = $('#cc_api_key');
        const apiKeyValue = apiKeyField.val();
        
        // If there's a value, show it as text initially
        if (apiKeyValue) {
            apiKeyField.attr('type', 'text');
            $('#toggle_api_key').text('Hide');
        } else {
            apiKeyField.attr('type', 'password');
            $('#toggle_api_key').text('Show');
        }
    });
    
    // Simple custom animal management
    $('#add-custom-animal').click(function() {
        alert('Custom animal functionality is being simplified. Please use the default animals for now.');
    });
    
    // Remove custom animal
    $(document).on('click', '.remove-custom-animal', function() {
        $(this).closest('.custom-animal').remove();
    });
    
    // Reset to defaults
    $('#reset-settings').click(function() {
        if (confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
            // This would trigger the reset AJAX call
            console.log('Reset settings clicked');
        }
    });
    
    // AJAX animal selection save
    $('#save-animal-selection').on('click', function() {
        const button = $(this);
        const statusSpan = $('#animal-save-status');
        const nonce = $('#cc_animal_nonce').val();
        
        // Get selected animals
        const selectedAnimals = [];
        $('.animal-checkbox:checked').each(function() {
            selectedAnimals.push($(this).val());
        });
        
        console.log('Saving animal selection:', selectedAnimals);
        
        // Disable button and show loading
        button.prop('disabled', true).text('Saving...');
        statusSpan.html('<span style="color: blue;">Saving...</span>');
        
        // Make AJAX request
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'cc_save_animal_selection',
                nonce: nonce,
                selected_animals: selectedAnimals
            },
            success: function(response) {
                console.log('AJAX response:', response);
                if (response.success) {
                    statusSpan.html('<span style="color: green;">✓ ' + response.data.message + '</span>');
                    // Show success message at top of page
                    $('.wrap h1').after('<div class="notice notice-success is-dismissible"><p>' + response.data.message + '</p></div>');
                } else {
                    statusSpan.html('<span style="color: red;">✗ ' + response.data.message + '</span>');
                    // Show error message at top of page
                    $('.wrap h1').after('<div class="notice notice-error is-dismissible"><p>' + response.data.message + '</p></div>');
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX error:', error);
                statusSpan.html('<span style="color: red;">✗ Error: ' + error + '</span>');
                // Show error message at top of page
                $('.wrap h1').after('<div class="notice notice-error is-dismissible"><p>Error saving animal selection: ' + error + '</p></div>');
            },
            complete: function() {
                // Re-enable button
                button.prop('disabled', false).text('Save Animal Selection');
            }
        });
    });
    
    // Responsive design for admin
    function adjustAdminLayout() {
        if ($(window).width() < 768) {
            $('.form-table').addClass('mobile-layout');
        } else {
            $('.form-table').removeClass('mobile-layout');
        }
    }
    
    $(window).resize(adjustAdminLayout);
    adjustAdminLayout();
    
    // Add some helpful CSS
    $('<style>')
        .text(`
            .custom-animal {
                background: #f9f9f9;
                padding: 15px;
                margin: 10px 0;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            .custom-animal h4 {
                margin-top: 0;
                color: #333;
            }
            .remove-custom-animal {
                background: #dc3232;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 3px;
                cursor: pointer;
            }
            .remove-custom-animal:hover {
                background: #c92626;
            }
            .mobile-layout th {
                display: block;
                width: 100%;
                margin-bottom: 5px;
            }
            .mobile-layout td {
                display: block;
                width: 100%;
                margin-bottom: 15px;
            }
        `)
        .appendTo('head');
    
}); 