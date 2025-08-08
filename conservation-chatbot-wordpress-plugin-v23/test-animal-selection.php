<?php
/**
 * Test script to verify animal selection fix
 * This simulates the WordPress form submission process
 */

// Simulate the sanitization function
function test_sanitize_settings($input) {
    $sanitized = array();
    
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
        $existing_settings = array('selected_animals' => array('tiger', 'elephant', 'panda'));
        $sanitized['selected_animals'] = $existing_settings['selected_animals'] ?? array('tiger', 'elephant', 'panda');
    }
    
    return $sanitized;
}

// Test cases
echo "<h1>Animal Selection Fix Test Results</h1>\n";

// Test 1: All animals selected
echo "<h2>Test 1: All animals selected</h2>\n";
$input1 = array(
    'animal_selection_submitted' => '1',
    'selected_animals' => array('tiger', 'elephant', 'panda')
);
$result1 = test_sanitize_settings($input1);
echo "Input: " . json_encode($input1) . "<br>\n";
echo "Result: " . json_encode($result1) . "<br>\n";
echo "Status: " . (count($result1['selected_animals']) === 3 ? "✅ PASS" : "❌ FAIL") . "<br><br>\n";

// Test 2: Some animals selected
echo "<h2>Test 2: Some animals selected</h2>\n";
$input2 = array(
    'animal_selection_submitted' => '1',
    'selected_animals' => array('tiger', 'elephant')
);
$result2 = test_sanitize_settings($input2);
echo "Input: " . json_encode($input2) . "<br>\n";
echo "Result: " . json_encode($result2) . "<br>\n";
echo "Status: " . (count($result2['selected_animals']) === 2 ? "✅ PASS" : "❌ FAIL") . "<br><br>\n";

// Test 3: No animals selected (this was the bug)
echo "<h2>Test 3: No animals selected (was the bug)</h2>\n";
$input3 = array(
    'animal_selection_submitted' => '1'
    // Note: selected_animals is NOT set when no checkboxes are checked
);
$result3 = test_sanitize_settings($input3);
echo "Input: " . json_encode($input3) . "<br>\n";
echo "Result: " . json_encode($result3) . "<br>\n";
echo "Status: " . (count($result3['selected_animals']) === 0 ? "✅ PASS" : "❌ FAIL") . "<br><br>\n";

// Test 4: Form not submitted (should keep existing)
echo "<h2>Test 4: Form not submitted (should keep existing)</h2>\n";
$input4 = array(
    // Note: animal_selection_submitted is NOT set
);
$result4 = test_sanitize_settings($input4);
echo "Input: " . json_encode($input4) . "<br>\n";
echo "Result: " . json_encode($result4) . "<br>\n";
echo "Status: " . (count($result4['selected_animals']) === 3 ? "✅ PASS" : "❌ FAIL") . "<br><br>\n";

// Test 5: Empty array submitted
echo "<h2>Test 5: Empty array submitted</h2>\n";
$input5 = array(
    'animal_selection_submitted' => '1',
    'selected_animals' => array()
);
$result5 = test_sanitize_settings($input5);
echo "Input: " . json_encode($input5) . "<br>\n";
echo "Result: " . json_encode($result5) . "<br>\n";
echo "Status: " . (count($result5['selected_animals']) === 0 ? "✅ PASS" : "❌ FAIL") . "<br><br>\n";

echo "<h2>Summary</h2>\n";
echo "All tests should pass if the animal selection fix is working correctly.<br>\n";
echo "The key fix was adding the <code>animal_selection_submitted</code> hidden field to distinguish between 'form not submitted' and 'no animals selected'.<br>\n";
?> 