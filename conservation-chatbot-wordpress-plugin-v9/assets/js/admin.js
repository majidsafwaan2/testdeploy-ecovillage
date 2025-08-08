/**
 * Admin JavaScript for Conservation Chatbot
 * Handles customization interface and settings
 */

jQuery(document).ready(function($) {
    
    // Initialize color pickers
    $('.color-picker').wpColorPicker({
        change: function(event, ui) {
            // Update preview if needed
            updatePreview();
        }
    });
    
    // Tab functionality
    $('.nav-tab').click(function(e) {
        e.preventDefault();
        $('.nav-tab').removeClass('nav-tab-active');
        $(this).addClass('nav-tab-active');
        $('.tab-content').hide();
        $($(this).attr('href')).show();
    });
    
    // Custom animal management
    let customAnimalCounter = 0;
    
    $('#add-custom-animal').click(function() {
        addCustomAnimal();
    });
    
    function addCustomAnimal() {
        const container = $('#custom-animals-container');
        const animalId = 'custom_animal_' + customAnimalCounter++;
        
        const animalHtml = `
            <div class="custom-animal" data-animal-id="${animalId}">
                <h4>Custom Animal ${customAnimalCounter}</h4>
                <table class="form-table">
                    <tr>
                        <th scope="row">Animal ID</th>
                        <td>
                            <input type="text" name="cc_custom_animals[${animalId}][id]" value="${animalId}" class="regular-text" required />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Name</th>
                        <td>
                            <input type="text" name="cc_custom_animals[${animalId}][name]" class="regular-text" placeholder="Animal Name" required />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Species</th>
                        <td>
                            <input type="text" name="cc_custom_animals[${animalId}][species]" class="regular-text" placeholder="Species" required />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Conservation Status</th>
                        <td>
                            <select name="cc_custom_animals[${animalId}][conservationStatus]">
                                <option value="Endangered">Endangered</option>
                                <option value="Vulnerable">Vulnerable</option>
                                <option value="Near Threatened">Near Threatened</option>
                                <option value="Least Concern">Least Concern</option>
                                <option value="Critically Endangered">Critically Endangered</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Location</th>
                        <td>
                            <input type="text" name="cc_custom_animals[${animalId}][location]" class="regular-text" placeholder="Location" required />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Photo URL</th>
                        <td>
                            <input type="url" name="cc_custom_animals[${animalId}][photo]" class="regular-text" placeholder="https://example.com/image.jpg" required />
                            <button type="button" class="button upload-image-btn" data-target="${animalId}">Upload Image</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Introduction</th>
                        <td>
                            <textarea name="cc_custom_animals[${animalId}][intro]" class="large-text" rows="3" placeholder="Introduction message for this animal"></textarea>
                        </td>
                    </tr>
                </table>
                <button type="button" class="button remove-custom-animal" data-animal-id="${animalId}">Remove Animal</button>
                <hr>
            </div>
        `;
        
        container.append(animalHtml);
        
        // Initialize image upload for this animal
        initImageUpload(animalId);
    }
    
    // Remove custom animal
    $(document).on('click', '.remove-custom-animal', function() {
        const animalId = $(this).data('animal-id');
        $(`.custom-animal[data-animal-id="${animalId}"]`).remove();
    });
    
    // Image upload functionality
    function initImageUpload(animalId) {
        $(`.upload-image-btn[data-target="${animalId}"]`).click(function() {
            const button = $(this);
            const targetInput = $(`input[name="cc_custom_animals[${animalId}][photo]"]`);
            
            // Create media frame
            const frame = wp.media({
                title: 'Select Animal Image',
                button: {
                    text: 'Use this image'
                },
                multiple: false
            });
            
            frame.on('select', function() {
                const attachment = frame.state().get('selection').first().toJSON();
                targetInput.val(attachment.url);
            });
            
            frame.open();
        });
    }
    
    // Real-time preview updates
    function updatePreview() {
        // This would update a live preview if implemented
        // For now, just log the changes
        console.log('Settings updated');
    }
    
    // Form validation - only validate if custom animals are being added
    $('form').submit(function(e) {
        let isValid = true;
        
        // Only validate API key if it's not empty (allow saving other settings without API key)
        const apiKey = $('input[name="cc_api_key"]').val();
        if (apiKey.trim() === '') {
            // Show warning but don't prevent save
            if (!confirm('Warning: No API key entered. The chatbot will not function without a valid Gemini API key. Continue saving other settings?')) {
                e.preventDefault();
                return false;
            }
        }
        
        // Only validate custom animals if they exist and have incomplete data
        $('.custom-animal').each(function() {
            const requiredFields = $(this).find('input[required]');
            let hasData = false;
            let hasAllData = true;
            
            requiredFields.each(function() {
                if ($(this).val().trim() !== '') {
                    hasData = true;
                } else {
                    hasAllData = false;
                }
            });
            
            // If animal has some data but not all required fields, warn user
            if (hasData && !hasAllData) {
                alert('Please fill in all required fields for custom animals or remove incomplete entries');
                isValid = false;
                return false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
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
    
    // Auto-save functionality
    let autoSaveTimer;
    $('input, select, textarea').on('change', function() {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(function() {
            // Auto-save could be implemented here
            console.log('Auto-saving...');
        }, 2000);
    });
    
    // Reset to defaults
    $('#reset-to-defaults').click(function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
            // Reset functionality could be implemented here
            location.reload();
        }
    });
    
    // Export/Import settings
    $('#export-settings').click(function(e) {
        e.preventDefault();
        const settings = {};
        
        // Collect all form data
        $('form input, form select, form textarea').each(function() {
            const name = $(this).attr('name');
            const value = $(this).val();
            if (name && value) {
                settings[name] = value;
            }
        });
        
        // Create download link
        const dataStr = JSON.stringify(settings, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'conservation-chatbot-settings.json';
        link.click();
        
        URL.revokeObjectURL(url);
    });
    
    $('#import-settings').click(function(e) {
        e.preventDefault();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const settings = JSON.parse(e.target.result);
                        
                        // Apply settings to form
                        Object.keys(settings).forEach(function(key) {
                            const field = $(`[name="${key}"]`);
                            if (field.length) {
                                field.val(settings[key]);
                                
                                // Update color pickers
                                if (field.hasClass('color-picker')) {
                                    field.wpColorPicker('color', settings[key]);
                                }
                            }
                        });
                        
                        alert('Settings imported successfully!');
                    } catch (error) {
                        alert('Error importing settings: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
        };
        
        input.click();
    });
    
    // Help tooltips
    $('.help-tooltip').hover(
        function() {
            const helpText = $(this).data('help');
            if (helpText) {
                $('<div class="tooltip">' + helpText + '</div>')
                    .appendTo('body')
                    .css({
                        position: 'absolute',
                        left: $(this).offset().left + $(this).outerWidth() + 10,
                        top: $(this).offset().top,
                        background: '#333',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '3px',
                        fontSize: '12px',
                        zIndex: 1000
                    });
            }
        },
        function() {
            $('.tooltip').remove();
        }
    );
    
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
                background: #dc3545 !important;
                color: white !important;
                border-color: #dc3545 !important;
            }
            .remove-custom-animal:hover {
                background: #c82333 !important;
            }
            .upload-image-btn {
                margin-left: 10px;
            }
            .mobile-layout th {
                display: block;
                width: 100%;
                margin-bottom: 5px;
            }
            .mobile-layout td {
                display: block;
                width: 100%;
            }
            .tab-content {
                background: white;
                padding: 20px;
                border: 1px solid #ccc;
                border-top: none;
            }
        `)
        .appendTo('head');
}); 