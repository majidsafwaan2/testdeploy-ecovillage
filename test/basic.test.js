/**
 * Basic tests for the conservation chatbot library
 * Run with: node test/basic.test.js
 */

// Mock the DOM environment for testing
global.document = {
  createElement: () => ({
    id: '',
    textContent: '',
    appendChild: () => {},
    style: {},
    classList: {
      add: () => {},
      remove: () => {}
    }
  }),
  head: {
    appendChild: () => {}
  },
  querySelector: () => null,
  getElementById: () => null
};

global.window = {
  requestAnimationFrame: (cb) => setTimeout(cb, 0)
};

// Test the library exports
async function runTests() {
  console.log('🧪 Running Conservation Chatbot Library Tests...\n');

  try {
    // Test 1: Check if main exports exist
    console.log('✅ Test 1: Checking main exports...');
    const { initConservationChatbot, animals, createAnimal, createStyles } = await import('../src/index.js');
    
    if (typeof initConservationChatbot === 'function') {
      console.log('   ✓ initConservationChatbot function exists');
    } else {
      throw new Error('initConservationChatbot is not a function');
    }

    if (Array.isArray(animals)) {
      console.log(`   ✓ animals array exists with ${animals.length} animals`);
    } else {
      throw new Error('animals is not an array');
    }

    if (typeof createAnimal === 'function') {
      console.log('   ✓ createAnimal function exists');
    } else {
      throw new Error('createAnimal is not a function');
    }

    if (typeof createStyles === 'function') {
      console.log('   ✓ createStyles function exists');
    } else {
      throw new Error('createStyles is not a function');
    }

    // Test 2: Check animals data
    console.log('\n✅ Test 2: Checking animals data...');
    const expectedAnimals = ['tiger', 'turtle', 'gorilla', 'elephant', 'polarBear', 'orangutan', 'rhino', 'panda', 'vaquita'];
    
    animals.forEach((animal, index) => {
      if (animal.id === expectedAnimals[index]) {
        console.log(`   ✓ ${animal.name} (${animal.species}) - ${animal.conservationStatus}`);
      } else {
        throw new Error(`Animal ${index} has wrong ID: ${animal.id}`);
      }
    });

    // Test 3: Test createAnimal function
    console.log('\n✅ Test 3: Testing createAnimal function...');
    const testAnimal = createAnimal({
      id: 'test',
      name: 'Test',
      species: 'Test Species',
      conservationStatus: 'Test',
      location: 'Test Location',
      photo: 'test.jpg',
      label: 'Test',
      system: 'Test system prompt',
      intro: 'Test intro',
      color: 'bg-test'
    });

    if (testAnimal.id === 'test' && testAnimal.name === 'Test') {
      console.log('   ✓ createAnimal function works correctly');
    } else {
      throw new Error('createAnimal function not working correctly');
    }

    // Test 4: Test createStyles function
    console.log('\n✅ Test 4: Testing createStyles function...');
    const styles = createStyles({
      colors: {
        primary: '#ff0000'
      }
    });

    if (styles && typeof styles.remove === 'function') {
      console.log('   ✓ createStyles function works correctly');
    } else {
      throw new Error('createStyles function not working correctly');
    }

    console.log('\n🎉 All tests passed! The library is working correctly.');
    console.log('\n📦 Ready for npm publishing!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the tests
runTests(); 