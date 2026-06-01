// DOM Elements
const itemsGrid = document.getElementById('itemsGrid');
const itemSearchInput = document.getElementById('itemSearch');
const countInput = document.getElementById('count');
const searchEnchantInput = document.getElementById('searchEnchant');
const allEnchantsBtn = document.getElementById('allEnchantsBtn');
const enchantGrid = document.getElementById('enchantGrid');
const outputSection = document.getElementById('outputSection');
const commandText = document.getElementById('commandText');
const itemCountStat = document.getElementById('itemCount');
const enchantCountStat = document.getElementById('enchantCount');
const selectedEnchantsStat = document.getElementById('selectedEnchants');

// State
let selectedItem = null;
let selectedEnchants = new Set();

// Enchantment groups - enchants in same group are mutually exclusive
const ENCHANT_GROUPS = {
    damage: ['sharpness', 'smite', 'bane_of_arthropods'],
    protection: ['protection', 'fire_protection', 'blast_protection', 'projectile_protection'],
    depth: ['depth_strider', 'frost_walker'],
    bow_power: ['power'],
    bow_utility: ['punch', 'flame', 'infinity'],
    crossbow_shot: ['multishot', 'piercing'],
    crossbow_charge: ['quick_charge'],
    trident_return: ['loyalty', 'riptide'],
    rod_fishing: ['lure', 'luck_of_the_sea']
};

// Curse enchantments - don't include in "All Enchants"
const CURSES = ['curse_of_vanishing', 'curse_of_binding'];

// Initialize the application
function init() {
    populateItems();
    populateEnchantments();
    updateStats();
    setupEventListeners();
}

// Populate items grid with buttons
function populateItems() {
    const sortedItems = [...MINECRAFT_ITEMS].sort();
    sortedItems.forEach(item => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'item-btn';
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
    document.querySelectorAll('.item-btn.active').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Set new selection
    selectedItem = item;
    e.target.classList.add('active');
    
    // Reset enchantments when item changes
    selectedEnchants.clear();
    document.querySelectorAll('.enchant-btn.active').forEach(btn => {
        btn.classList.remove('active');
    });
    
    updateStats();
    generateCommand();
}

// Handle item search
function handleItemSearch(e) {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('#itemsGrid .item-btn').forEach(btn => {
        const itemName = btn.textContent.toLowerCase();
        if (itemName.includes(query)) {
            btn.style.display = '';
        } else {
            btn.style.display = 'none';
        }
    });
}

// Populate enchantments grid with buttons
function populateEnchantments() {
    Object.keys(MINECRAFT_ENCHANTMENTS).forEach(enchant => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'enchant-btn';
        button.textContent = formatEnchantName(enchant);
        button.dataset.enchant = enchant;
        button.addEventListener('click', handleEnchantSelect);
        enchantGrid.appendChild(button);
    });
}

// Handle enchant button click
function handleEnchantSelect(e) {
    e.preventDefault();
    
    const enchant = e.target.dataset.enchant;
    
    if (selectedEnchants.has(enchant)) {
        // Deselect
        selectedEnchants.delete(enchant);
        e.target.classList.remove('active');
    } else {
        // When selecting an enchantment, deselect conflicting ones in the same group
        const groupKey = Object.keys(ENCHANT_GROUPS).find(key => 
            ENCHANT_GROUPS[key].includes(enchant)
        );
        
        if (groupKey) {
            const groupEnchants = ENCHANT_GROUPS[groupKey];
            groupEnchants.forEach(groupEnchant => {
                if (groupEnchant !== enchant && selectedEnchants.has(groupEnchant)) {
                    selectedEnchants.delete(groupEnchant);
                    const btn = document.querySelector(`[data-enchant="${groupEnchant}"]`);
                    if (btn) btn.classList.remove('active');
                }
            });
        }
        
        // Select
        selectedEnchants.add(enchant);
        e.target.classList.add('active');
    }
    
    updateStats();
    generateCommand();
}

// Handle All Enchants button
function handleAllEnchants(e) {
    if (!selectedItem) {
        alert('Please select an item first');
        return;
    }

    // Get applicable enchants for the selected item
    const applicableEnchants = getApplicableEnchants(selectedItem);
    
    // Filter out curses and keep only one from each mutually exclusive group
    const selectedByGroup = {};
    selectedEnchants.clear();
    
    // Clear all active buttons
    document.querySelectorAll('.enchant-btn.active').forEach(btn => {
        btn.classList.remove('active');
    });
    
    applicableEnchants.forEach(enchant => {
        // Skip curses
        if (CURSES.includes(enchant)) return;
        
        // Find the group this enchant belongs to
        const groupKey = Object.keys(ENCHANT_GROUPS).find(key => 
            ENCHANT_GROUPS[key].includes(enchant)
        );
        
        // Only add if we haven't added another from this group yet
        if (!groupKey || !selectedByGroup[groupKey]) {
            selectedEnchants.add(enchant);
            if (groupKey) {
                selectedByGroup[groupKey] = enchant;
            }
            const btn = document.querySelector(`[data-enchant="${enchant}"]`);
            if (btn) btn.classList.add('active');
        }
    });
    
    updateStats();
    generateCommand();
}

// Handle enchantment search
function handleEnchantSearch(e) {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('#enchantGrid .enchant-btn').forEach(btn => {
        const label = btn.textContent.toLowerCase();
        if (label.includes(query)) {
            btn.style.display = '';
        } else {
            btn.style.display = 'none';
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

// Generate the give command with correct syntax - AUTO CALLED
function generateCommand() {
    if (!selectedItem) {
        outputSection.classList.remove('active');
        return;
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

    // Display the command
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

// Reset form
function resetForm() {
    selectedItem = null;
    selectedEnchants.clear();
    document.querySelectorAll('.item-btn.active').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.enchant-btn.active').forEach(btn => {
        btn.classList.remove('active');
    });
    itemSearchInput.value = '';
    searchEnchantInput.value = '';
    countInput.value = '1';
    document.querySelectorAll('#itemsGrid .item-btn').forEach(btn => {
        btn.style.display = '';
    });
    document.querySelectorAll('#enchantGrid .enchant-btn').forEach(btn => {
        btn.style.display = '';
    });
    outputSection.classList.remove('active');
    updateStats();
}

// Setup event listeners
function setupEventListeners() {
    allEnchantsBtn.addEventListener('click', handleAllEnchants);
    searchEnchantInput.addEventListener('input', handleEnchantSearch);
    itemSearchInput.addEventListener('input', handleItemSearch);
    countInput.addEventListener('change', generateCommand);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
