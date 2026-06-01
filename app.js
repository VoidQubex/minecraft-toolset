// DOM Elements
const itemsGrid = document.getElementById('itemsGrid');
const countInput = document.getElementById('count');
const searchEnchantInput = document.getElementById('searchEnchant');
const allEnchantsCheck = document.getElementById('allEnchantsCheck');
const enchantGrid = document.getElementById('enchantGrid');
const commandForm = document.getElementById('commandForm');
const outputSection = document.getElementById('outputSection');
const commandText = document.getElementById('commandText');
const itemCountStat = document.getElementById('itemCount');
const enchantCountStat = document.getElementById('enchantCount');
const selectedEnchantsStat = document.getElementById('selectedEnchants');

// State
let selectedItem = null;
let selectedEnchants = new Set();

// Initialize the application
function init() {
    populateItems();
    populateEnchantments();
    updateStats();
    setupEventListeners();
}

// Populate items grid
function populateItems() {
    const sortedItems = [...MINECRAFT_ITEMS].sort();
    sortedItems.forEach(item => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'item-button';
        button.textContent = formatItemName(item);
        button.dataset.item = item;
        button.addEventListener('click', handleItemSelect);
        itemsGrid.appendChild(button);
    });
}

// Handle item selection
function handleItemSelect(e) {
    e.preventDefault();
    
    const item = e.target.dataset.item;
    
    // Remove active class from previous selection
    document.querySelectorAll('.item-button.active').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Set new selection
    selectedItem = item;
    e.target.classList.add('active');
    
    // Reset enchantments when item changes
    selectedEnchants.clear();
    allEnchantsCheck.checked = false;
    document.querySelectorAll('#enchantGrid input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });

    // Disable non-applicable enchants
    const applicableEnchants = getApplicableEnchants(selectedItem);
    document.querySelectorAll('#enchantGrid input[type="checkbox"]').forEach(checkbox => {
        checkbox.disabled = !applicableEnchants.includes(checkbox.value);
        if (checkbox.disabled) {
            checkbox.parentElement.style.opacity = '0.4';
            checkbox.parentElement.style.pointerEvents = 'none';
        } else {
            checkbox.parentElement.style.opacity = '1';
            checkbox.parentElement.style.pointerEvents = 'auto';
        }
    });
    
    updateStats();
}

// Populate enchantments grid
function populateEnchantments() {
    Object.keys(MINECRAFT_ENCHANTMENTS).forEach(enchant => {
        const enchantData = MINECRAFT_ENCHANTMENTS[enchant];
        const container = document.createElement('div');
        container.className = 'enchant-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `enchant_${enchant}`;
        checkbox.value = enchant;
        checkbox.addEventListener('change', handleEnchantChange);
        
        const label = document.createElement('label');
        label.htmlFor = `enchant_${enchant}`;
        label.textContent = formatEnchantName(enchant);
        
        container.appendChild(checkbox);
        container.appendChild(label);
        enchantGrid.appendChild(container);
    });
}

// Handle enchant checkbox changes
function handleEnchantChange(e) {
    if (e.target.checked) {
        selectedEnchants.add(e.target.value);
    } else {
        selectedEnchants.delete(e.target.value);
    }
    updateStats();
    allEnchantsCheck.checked = false;
}

// Handle All Enchants checkbox
function handleAllEnchantsChange(e) {
    if (!selectedItem) return;

    if (e.target.checked) {
        // Get applicable enchants for the selected item
        const applicableEnchants = getApplicableEnchants(selectedItem);
        applicableEnchants.forEach(enchant => {
            selectedEnchants.add(enchant);
            document.getElementById(`enchant_${enchant}`).checked = true;
        });
    } else {
        // Clear all enchants
        selectedEnchants.forEach(enchant => {
            document.getElementById(`enchant_${enchant}`).checked = false;
        });
        selectedEnchants.clear();
    }
    updateStats();
}

// Handle enchantment search
function handleEnchantSearch(e) {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('#enchantGrid .enchant-item').forEach(item => {
        const label = item.querySelector('label').textContent.toLowerCase();
        if (label.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Get applicable enchantments for an item
function getApplicableEnchants(item) {
    const applicable = [];
    Object.keys(MINECRAFT_ENCHANTMENTS).forEach(enchant => {
        if (MINECRAFT_ENCHANTMENTS[enchant].applicable.includes(item)) {
            applicable.push(enchant);
        }
    });
    return applicable;
}

// Update stats display
function updateStats() {
    itemCountStat.textContent = MINECRAFT_ITEMS.length;
    enchantCountStat.textContent = Object.keys(MINECRAFT_ENCHANTMENTS).length;
    selectedEnchantsStat.textContent = selectedEnchants.size;
}

// Format item name for display
function formatItemName(item) {
    return item
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Format enchant name for display
function formatEnchantName(enchant) {
    return enchant
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Generate the give command with correct syntax
function generateCommand() {
    if (!selectedItem) {
        alert('Please select an item');
        return null;
    }

    const count = parseInt(countInput.value) || 1;
    let command = `/give @s ${selectedItem}`;

    if (count > 1) {
        command += ` ${count}`;
    }

    // Build enchantments with correct syntax: {id: value}
    if (selectedEnchants.size > 0) {
        const enchantments = [];
        selectedEnchants.forEach(enchant => {
            const maxLevel = MINECRAFT_ENCHANTMENTS[enchant].max;
            enchantments.push(`${enchant}: ${maxLevel}`);
        });

        command += `[enchantments={${enchantments.join(', ')}}]`;
    }

    return command;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const command = generateCommand();
    if (!command) return;
    
    commandText.textContent = command;
    outputSection.classList.add('active');
}

// Copy command to clipboard
function copyCommand() {
    const command = commandText.textContent;
    navigator.clipboard.writeText(command).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
    });
}

// Setup event listeners
function setupEventListeners() {
    commandForm.addEventListener('submit', handleFormSubmit);
    allEnchantsCheck.addEventListener('change', handleAllEnchantsChange);
    searchEnchantInput.addEventListener('input', handleEnchantSearch);
    
    // Reset form
    commandForm.addEventListener('reset', () => {
        selectedItem = null;
        selectedEnchants.clear();
        document.querySelectorAll('.item-button.active').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('#enchantGrid input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
            checkbox.disabled = false;
            checkbox.parentElement.style.opacity = '1';
            checkbox.parentElement.style.pointerEvents = 'auto';
        });
        searchEnchantInput.value = '';
        document.querySelectorAll('#enchantGrid .enchant-item').forEach(item => {
            item.style.display = '';
        });
        outputSection.classList.remove('active');
        updateStats();
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
