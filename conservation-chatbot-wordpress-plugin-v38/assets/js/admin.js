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
    
    // Custom animal management
    let customAnimalCounter = 0;
    
    // Load existing custom animals on page load
    function loadExistingCustomAnimals() {
        const customAnimalsField = $('input[name="cc_chatbot_settings[custom_animals]"]');
        const customAnimalsData = customAnimalsField.val();
        
        if (customAnimalsData) {
            try {
                const customAnimals = JSON.parse(customAnimalsData);
                customAnimals.forEach((animal, index) => {
                    // Ensure animal has a proper ID
                    if (!animal.id) {
                        animal.id = 'custom_animal_' + (index + 1);
                    }
                    customAnimalCounter = Math.max(customAnimalCounter, index + 1);
                    addCustomAnimalToUI(animal, index + 1);
                });
            } catch (e) {
                console.log('Error loading custom animals:', e);
            }
        }
    }
    
    // Add custom animal to UI
    function addCustomAnimalToUI(animalData, counter) {
        const animalId = animalData.id || 'custom_animal_' + counter;
        
        const animalHtml = `
            <div class="custom-animal" data-animal-id="${animalId}">
                <h4>Custom Animal ${counter}</h4>
                <table class="form-table">
                    <tr>
                        <th scope="row">Animal Name</th>
                        <td>
                            <input type="text" name="custom_animals[${animalId}][name]" value="${animalData.name || ''}" placeholder="e.g., Golden Eagle" class="regular-text" required />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Animal Type</th>
                        <td>
                            <input type="text" name="custom_animals[${animalId}][type]" value="${animalData.type || ''}" placeholder="e.g., Bird of Prey" class="regular-text" required />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Animal Story</th>
                        <td>
                            <textarea name="custom_animals[${animalId}][story]" rows="4" cols="50" placeholder="Tell the story of this animal..." class="large-text" required>${animalData.story || ''}</textarea>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Animal Image</th>
                        <td>
                            <input type="url" name="custom_animals[${animalId}][image]" value="${animalData.image || ''}" placeholder="https://example.com/image.jpg" class="regular-text animal-image-url" />
                            <button type="button" class="button upload-image-btn" data-target="${animalId}">Upload Image</button>
                            <button type="button" class="button remove-image-btn" data-target="${animalId}" style="display: ${animalData.image ? 'inline-block' : 'none'};">Remove Image</button>
                            <span class="description">Optional: Upload an image or enter an image URL</span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Include in Chatbot</th>
                        <td>
                            <label>
                                <input type="checkbox" name="custom_animals[${animalId}][enabled]" value="1" ${animalData.enabled === '1' ? 'checked' : ''} />
                                Show this animal in the chatbot
                            </label>
                        </td>
                    </tr>
                </table>
                <button type="button" class="remove-custom-animal button button-secondary">Remove Animal</button>
            </div>
        `;
        
        $('#custom-animals-container').append(animalHtml);
    }
    
    // Load existing custom animals when page loads
    $(document).ready(function() {
        loadExistingCustomAnimals();
        
        // Add existing enabled custom animals to selection (direct save section only)
        const customAnimalsField = $('input[name="cc_chatbot_settings[custom_animals]"]');
        const customAnimalsData = customAnimalsField.val();
        
        if (customAnimalsData) {
            try {
                const customAnimals = JSON.parse(customAnimalsData);
                customAnimals.forEach((animal) => {
                    if (animal.enabled === '1' && animal.name) {
                        addCustomAnimalToSelection(animal.id, animal.name);
                    }
                });
            } catch (e) {
                console.log('Error loading custom animals to selection:', e);
            }
        }
    });
    
    $('#add-custom-animal').click(function() {
        customAnimalCounter++;
        const animalId = 'custom_animal_' + customAnimalCounter;
        const newAnimal = {
            id: animalId,
            enabled: '1' // Automatically enable new custom animals
        };
        addCustomAnimalToUI(newAnimal, customAnimalCounter);
        
        // Add to selection immediately
        addCustomAnimalToSelection(animalId, 'Custom Animal ' + customAnimalCounter);
    });
    
    // Remove custom animal
    $(document).on('click', '.remove-custom-animal', function() {
        if (confirm('Are you sure you want to remove this custom animal?')) {
            $(this).closest('.custom-animal').remove();
        }
    });
    
    // Image upload functionality
    $(document).on('click', '.upload-image-btn', function() {
        const targetId = $(this).data('target');
        const imageUrlField = $(`input[name="custom_animals[${targetId}][image]"]`);
        
        // Create media frame
        const mediaFrame = wp.media({
            title: 'Select Animal Image',
            button: {
                text: 'Use this image'
            },
            multiple: false
        });
        
        // When image selected
        mediaFrame.on('select', function() {
            const attachment = mediaFrame.state().get('selection').first().toJSON();
            imageUrlField.val(attachment.url);
            
            // Show remove button
            $(`.remove-image-btn[data-target="${targetId}"]`).show();
        });
        
        // Open media frame
        mediaFrame.open();
    });
    
    // Remove image functionality
    $(document).on('click', '.remove-image-btn', function() {
        const targetId = $(this).data('target');
        const imageUrlField = $(`input[name="custom_animals[${targetId}][image]"]`);
        
        imageUrlField.val('');
        $(this).hide();
    });
    
    // Auto-check custom animals when enabled
    $(document).on('change', 'input[name*="[enabled]"]', function() {
        const animalId = $(this).closest('.custom-animal').data('animal-id');
        const isEnabled = $(this).is(':checked');
        
        // Find the corresponding checkbox in direct save section only
        const directSaveCheckbox = $(`input[name="selected_animals[]"][value="${animalId}"]`);
        
        if (isEnabled) {
            // Check the animal in direct save section
            directSaveCheckbox.prop('checked', true);
        } else {
            // Uncheck the animal in direct save section
            directSaveCheckbox.prop('checked', false);
        }
    });
    
    // Add custom animal to selection when created
    function addCustomAnimalToSelection(animalId, animalName) {
        // Add to direct save selection only (main form section was removed)
        const directSaveContainer = $('input[name="selected_animals[]"]').first().closest('td');
        
        // Check if this animal already exists to avoid duplication
        const existingCheckbox = $(`input[name="selected_animals[]"][value="${animalId}"]`);
        if (existingCheckbox.length === 0) {
            const newDirectCheckbox = $(`
                <label style="display: block; margin-bottom: 5px;">
                    <input type="checkbox" name="selected_animals[]" value="${animalId}" checked />
                    ${animalName} (Custom)
                </label>
            `);
            directSaveContainer.append(newDirectCheckbox);
        }
    }
    
    // Reset to defaults
    $('#reset-settings').click(function() {
        if (confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
            // This would trigger the reset AJAX call
            console.log('Reset settings clicked');
        }
    });
    
    // Collect and update custom animals data before form submission
    function updateCustomAnimalsField() {
        const customAnimals = [];
        
        $('.custom-animal').each(function() {
            const animalId = $(this).data('animal-id');
            const name = $(`input[name="custom_animals[${animalId}][name]"]`).val();
            const type = $(`input[name="custom_animals[${animalId}][type]"]`).val();
            const story = $(`textarea[name="custom_animals[${animalId}][story]"]`).val();
            const image = $(`input[name="custom_animals[${animalId}][image]"]`).val();
            const enabled = $(`input[name="custom_animals[${animalId}][enabled]"]`).is(':checked') ? '1' : '0';
            
            if (name && name.trim() !== '') {
                customAnimals.push({
                    id: animalId,
                    name: name.trim(),
                    type: type.trim(),
                    story: story.trim(),
                    image: image.trim(),
                    enabled: enabled
                });
            }
        });
        
        // Update the hidden field
        $('input[name="cc_chatbot_settings[custom_animals]"]').val(JSON.stringify(customAnimals));
        
        console.log('Custom animals updated:', customAnimals);
    }
    
    // Update custom animals data when any field changes
    $(document).on('input change', 'input[name*="custom_animals"], textarea[name*="custom_animals"]', function() {
        updateCustomAnimalsField();
        
        // Update the selection label if name field changed
        if (this.name && this.name.includes('[name]')) {
            const animalId = $(this).closest('.custom-animal').data('animal-id');
            const newName = $(this).val().trim();
            
            if (newName) {
                // Update direct save selection area only
                $(`input[name="selected_animals[]"][value="${animalId}"]`).closest('label').text(newName + ' (Custom)');
            }
        }
    });
    
    // Update custom animals data when custom animal is removed
    $(document).on('click', '.remove-custom-animal', function() {
        setTimeout(updateCustomAnimalsField, 100);
    });
    
    // Update custom animals data when new custom animal is added
    $('#add-custom-animal').click(function() {
        setTimeout(updateCustomAnimalsField, 100);
    });
    
    // Simple form validation for animal selection
    $('form').on('submit', function() {
        // Update custom animals data before submission
        updateCustomAnimalsField();
        
        const selectedAnimals = $('input[name="selected_animals[]"]:checked');
        if (selectedAnimals.length === 0) {
            if (!confirm('No animals selected. The chatbot will not show any animals. Continue?')) {
                return false;
            }
        }
        return true;
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