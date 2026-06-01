// DOM Elements
const itemSelect = document.getElementById('itemSelect');
const countInput = document.getElementById('count');
const allEnchantsCheck = document.getElementById('allEnchantsCheck');
const enchantGrid = document.getElementById('enchantGrid');
const commandForm = document.getElementById('commandForm');
const outputSection = document.getElementById('outputSection');
const commandText = document.getElementById('commandText');
const itemCountStat = document.getElementById('itemCount');
const enchantCountStat = document.getElementById('enchantCount');
const selectedEnchantsStat = document.getElementById('selectedEnchants');

// State
let selectedEnchants = new Set();

// Initialize the application
function init() {
    populateItems();
    populateEnchantments();
    updateStats();
    setupEventListeners();
}

// Populate items dropdown
function populateItems() {
    const sortedItems = [...MINECRAFT_ITEMS].sort();
    sortedItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = formatItemName(item);
        itemSelect.appendChild(option);
    });
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
    const selectedItem = itemSelect.value;
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

// Handle item selection change
function handleItemChange(e) {
    const selectedItem = e.target.value;
    
    // Reset enchantments when item changes
    selectedEnchants.clear();
    allEnchantsCheck.checked = false;
    document.querySelectorAll('#enchantGrid input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });

    if (selectedItem) {
        // Disable non-applicable enchants
        const applicableEnchants = getApplicableEnchants(selectedItem);
        document.querySelectorAll('#enchantGrid input[type="checkbox"]').forEach(checkbox => {
            checkbox.disabled = !applicableEnchants.includes(checkbox.value);
            if (checkbox.disabled) {
                checkbox.parentElement.style.opacity = '0.4';
            } else {
                checkbox.parentElement.style.opacity = '1';
            }
        });
    }
    
    updateStats();
}

// Generate the give command
function generateCommand() {
    const item = itemSelect.value;
    const count = parseInt(countInput.value) || 1;

    if (!item) {
        alert('Please select an item');
        return;
    }

    let command = `/give @s ${item}`;

    if (count > 1) {
        command += ` ${count}`;
    }

    // Build enchantments
    if (selectedEnchants.size > 0) {
        const enchantments = {};
        selectedEnchants.forEach(enchant => {
            const maxLevel = MINECRAFT_ENCHANTMENTS[enchant].max;
            enchantments[enchant] = maxLevel;
        });

        command += `[enchantments:{${Object.entries(enchantments)
            .map(([key, value]) => `${key}:${value}`)
            .join(',')}}]`;
    }

    return command;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const command = generateCommand();
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
    itemSelect.addEventListener('change', handleItemChange);
    allEnchantsCheck.addEventListener('change', handleAllEnchantsChange);
    
    // Reset form
    commandForm.addEventListener('reset', () => {
        selectedEnchants.clear();
        outputSection.classList.remove('active');
        updateStats();
        setTimeout(() => {
            document.querySelectorAll('#enchantGrid input[type="checkbox"]').forEach(checkbox => {
                checkbox.disabled = false;
                checkbox.parentElement.style.opacity = '1';
            });
        }, 0);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
