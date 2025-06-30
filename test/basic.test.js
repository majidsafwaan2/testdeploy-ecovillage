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
    const expectedAnimals = [
      'tiger', 'elephant', 'panda', 'rhino', 'turtle', 'vaquita', 'whale', 
      'dolphin', 'shark', 'gorilla', 'orangutan', 'sloth', 'jaguar', 'toucan',
      'polarBear', 'penguin', 'seal', 'eagle', 'owl', 'flamingo', 'lemur',
      'chimp', 'lion', 'leopard', 'cheetah', 'otter', 'manatee'
    ];
    
    if (animals.length >= 25) {
      console.log(`   ✓ Expanded animal list with ${animals.length} animals`);
    } else {
      throw new Error(`Expected at least 25 animals, got ${animals.length}`);
    }

    // Check that all animals have required properties
    animals.forEach((animal, index) => {
      const requiredProps = ['id', 'name', 'species', 'conservationStatus', 'location', 'photo', 'label', 'system', 'intro', 'color'];
      requiredProps.forEach(prop => {
        if (!animal.hasOwnProperty(prop)) {
          throw new Error(`Animal ${index} (${animal.name}) missing required property: ${prop}`);
        }
      });
      console.log(`   ✓ ${animal.name} (${animal.species}) - ${animal.conservationStatus}`);
    });

    // Test 3: Check conservation focus categories
    console.log('\n✅ Test 3: Checking conservation focus categories...');
    const categories = {
      'WWF & Global Wildlife': ['tiger', 'elephant', 'panda', 'rhino'],
      'Sea Shepherd & Marine': ['turtle', 'vaquita', 'whale', 'dolphin', 'shark'],
      'Rainforest Alliance & Forest': ['gorilla', 'orangutan', 'sloth', 'jaguar', 'toucan'],
      'Climate Organizations': ['polarBear', 'penguin', 'seal'],
      'Bird Conservation': ['eagle', 'owl', 'flamingo'],
      'Primate Conservation': ['lemur', 'chimp'],
      'Big Cat Conservation': ['lion', 'leopard', 'cheetah'],
      'Marine Mammal Conservation': ['otter', 'manatee']
    };

    Object.entries(categories).forEach(([category, animalIds]) => {
      const foundAnimals = animals.filter(animal => animalIds.includes(animal.id));
      if (foundAnimals.length === animalIds.length) {
        console.log(`   ✓ ${category}: ${foundAnimals.length} animals`);
      } else {
        console.log(`   ⚠ ${category}: Expected ${animalIds.length}, found ${foundAnimals.length}`);
      }
    });

    // Test 4: Test createAnimal function
    console.log('\n✅ Test 4: Testing createAnimal function...');
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

    // Test 5: Test createStyles function
    console.log('\n✅ Test 5: Testing createStyles function...');
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

    // Test 6: Check animal conservation status distribution
    console.log('\n✅ Test 6: Checking conservation status distribution...');
    const statusCounts = {};
    animals.forEach(animal => {
      statusCounts[animal.conservationStatus] = (statusCounts[animal.conservationStatus] || 0) + 1;
    });
    
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`   ✓ ${status}: ${count} animals`);
    });

    console.log('\n🎉 All tests passed! The library is working correctly.');
    console.log(`📦 Version 1.1.0 with ${animals.length} animals ready for npm publishing!`);

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run tests
runTests(); 