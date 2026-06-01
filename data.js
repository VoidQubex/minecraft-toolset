// Minecraft 26.1.2 Items Database
const MINECRAFT_ITEMS = [
    // Tools
    'wooden_pickaxe', 'stone_pickaxe', 'iron_pickaxe', 'diamond_pickaxe', 'netherite_pickaxe',
    'wooden_axe', 'stone_axe', 'iron_axe', 'diamond_axe', 'netherite_axe',
    'wooden_shovel', 'stone_shovel', 'iron_shovel', 'diamond_shovel', 'netherite_shovel',
    'wooden_hoe', 'stone_hoe', 'iron_hoe', 'diamond_hoe', 'netherite_hoe',
    'golden_pickaxe', 'golden_axe', 'golden_shovel', 'golden_hoe',

    // Weapons
    'wooden_sword', 'stone_sword', 'iron_sword', 'diamond_sword', 'netherite_sword', 'golden_sword',
    'bow', 'crossbow', 'trident',

    // Armor
    'leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots',
    'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots',
    'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots',
    'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots',
    'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots',
    'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots',

    // Books
    'book', 'enchanted_book',

    // Other enchantable items
    'shield', 'fishing_rod', 'carrot_on_a_stick', 'elytra', 'bell',
    'turtle_helmet', 'warped_fungus_on_a_stick', 'powered_rail', 'activator_rail', 'detector_rail', 'rail'
];

// Minecraft 26.1.2 Enchantments with max levels
const MINECRAFT_ENCHANTMENTS = {
    // Tool/Weapon Enchantments
    'sharpness': { max: 5, applicable: ['wooden_sword', 'stone_sword', 'iron_sword', 'diamond_sword', 'netherite_sword', 'golden_sword'] },
    'smite': { max: 5, applicable: ['wooden_sword', 'stone_sword', 'iron_sword', 'diamond_sword', 'netherite_sword', 'golden_sword'] },
    'bane_of_arthropods': { max: 5, applicable: ['wooden_sword', 'stone_sword', 'iron_sword', 'diamond_sword', 'netherite_sword', 'golden_sword'] },
    'knockback': { max: 2, applicable: ['wooden_sword', 'stone_sword', 'iron_sword', 'diamond_sword', 'netherite_sword', 'golden_sword'] },
    'fire_aspect': { max: 2, applicable: ['wooden_sword', 'stone_sword', 'iron_sword', 'diamond_sword', 'netherite_sword', 'golden_sword'] },
    'looting': { max: 3, applicable: ['wooden_sword', 'stone_sword', 'iron_sword', 'diamond_sword', 'netherite_sword', 'golden_sword'] },
    'sweeping_edge': { max: 3, applicable: ['wooden_sword', 'stone_sword', 'iron_sword', 'diamond_sword', 'netherite_sword', 'golden_sword'] },

    // Mining
    'efficiency': { max: 5, applicable: ['wooden_pickaxe', 'stone_pickaxe', 'iron_pickaxe', 'diamond_pickaxe', 'netherite_pickaxe', 'golden_pickaxe', 'wooden_axe', 'stone_axe', 'iron_axe', 'diamond_axe', 'netherite_axe', 'golden_axe', 'wooden_shovel', 'stone_shovel', 'iron_shovel', 'diamond_shovel', 'netherite_shovel', 'golden_shovel', 'wooden_hoe', 'stone_hoe', 'iron_hoe', 'diamond_hoe', 'netherite_hoe', 'golden_hoe'] },
    'fortune': { max: 3, applicable: ['wooden_pickaxe', 'stone_pickaxe', 'iron_pickaxe', 'diamond_pickaxe', 'netherite_pickaxe', 'golden_pickaxe', 'wooden_axe', 'stone_axe', 'iron_axe', 'diamond_axe', 'netherite_axe', 'golden_axe', 'wooden_shovel', 'stone_shovel', 'iron_shovel', 'diamond_shovel', 'netherite_shovel', 'golden_shovel'] },
    'silk_touch': { max: 1, applicable: ['wooden_pickaxe', 'stone_pickaxe', 'iron_pickaxe', 'diamond_pickaxe', 'netherite_pickaxe', 'golden_pickaxe', 'wooden_axe', 'stone_axe', 'iron_axe', 'diamond_axe', 'netherite_axe', 'golden_axe', 'wooden_shovel', 'stone_shovel', 'iron_shovel', 'diamond_shovel', 'netherite_shovel', 'golden_shovel'] },
    'unbreaking': { max: 3, applicable: ['wooden_pickaxe', 'stone_pickaxe', 'iron_pickaxe', 'diamond_pickaxe', 'netherite_pickaxe', 'golden_pickaxe', 'wooden_axe', 'stone_axe', 'iron_axe', 'diamond_axe', 'netherite_axe', 'golden_axe', 'wooden_shovel', 'stone_shovel', 'iron_shovel', 'diamond_shovel', 'netherite_shovel', 'golden_shovel', 'wooden_hoe', 'stone_hoe', 'iron_hoe', 'diamond_hoe', 'netherite_hoe', 'golden_hoe', 'wooden_sword', 'stone_sword', 'iron_sword', 'diamond_sword', 'netherite_sword', 'golden_sword', 'bow', 'crossbow', 'trident', 'leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots', 'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots', 'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots', 'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots', 'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots', 'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots', 'turtle_helmet', 'shield', 'fishing_rod', 'carrot_on_a_stick', 'elytra', 'bell', 'warped_fungus_on_a_stick'] },

    // Armor Enchantments
    'protection': { max: 4, applicable: ['leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots', 'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots', 'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots', 'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots', 'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots', 'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots', 'turtle_helmet'] },
    'fire_protection': { max: 4, applicable: ['leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots', 'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots', 'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots', 'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots', 'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots', 'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots', 'turtle_helmet'] },
    'feather_falling': { max: 4, applicable: ['leather_boots', 'iron_boots', 'golden_boots', 'diamond_boots', 'netherite_boots', 'chainmail_boots'] },
    'blast_protection': { max: 4, applicable: ['leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots', 'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots', 'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots', 'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots', 'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots', 'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots', 'turtle_helmet'] },
    'projectile_protection': { max: 4, applicable: ['leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots', 'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots', 'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots', 'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots', 'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots', 'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots', 'turtle_helmet'] },
    'thorns': { max: 3, applicable: ['leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots', 'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots', 'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots', 'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots', 'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots', 'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots', 'turtle_helmet'] },
    'respiration': { max: 3, applicable: ['leather_helmet', 'iron_helmet', 'golden_helmet', 'diamond_helmet', 'netherite_helmet', 'chainmail_helmet', 'turtle_helmet'] },
    'aqua_affinity': { max: 1, applicable: ['leather_helmet', 'iron_helmet', 'golden_helmet', 'diamond_helmet', 'netherite_helmet', 'chainmail_helmet', 'turtle_helmet'] },
    'depth_strider': { max: 3, applicable: ['leather_boots', 'iron_boots', 'golden_boots', 'diamond_boots', 'netherite_boots', 'chainmail_boots'] },
    'swift_sneak': { max: 3, applicable: ['leather_leggings', 'iron_leggings', 'golden_leggings', 'diamond_leggings', 'netherite_leggings', 'chainmail_leggings'] },

    // Bow/Crossbow Enchantments
    'power': { max: 5, applicable: ['bow'] },
    'punch': { max: 2, applicable: ['bow'] },
    'flame': { max: 1, applicable: ['bow'] },
    'infinity': { max: 1, applicable: ['bow'] },
    'multishot': { max: 1, applicable: ['crossbow'] },
    'piercing': { max: 4, applicable: ['crossbow'] },
    'quick_charge': { max: 3, applicable: ['crossbow'] },

    // Trident Enchantments
    'loyalty': { max: 3, applicable: ['trident'] },
    'impale': { max: 5, applicable: ['trident'] },
    'riptide': { max: 3, applicable: ['trident'] },
    'channeling': { max: 1, applicable: ['trident'] },

    // Fishing Rod Enchantments
    'lure': { max: 3, applicable: ['fishing_rod'] },
    'luck_of_the_sea': { max: 3, applicable: ['fishing_rod'] },

    // Other Enchantments
    'mending': { max: 1, applicable: ['wooden_pickaxe', 'stone_pickaxe', 'iron_pickaxe', 'diamond_pickaxe', 'netherite_pickaxe', 'golden_pickaxe', 'wooden_axe', 'stone_axe', 'iron_axe', 'diamond_axe', 'netherite_axe', 'golden_axe', 'wooden_shovel', 'stone_shovel', 'iron_shovel', 'diamond_shovel', 'netherite_shovel', 'golden_shovel', 'wooden_hoe', 'stone_hoe', 'iron_hoe', 'diamond_hoe', 'netherite_hoe', 'golden_hoe', 'wooden_sword', 'stone_sword', 'iron_sword', 'diamond_sword', 'netherite_sword', 'golden_sword', 'bow', 'crossbow', 'trident', 'leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots', 'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots', 'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots', 'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots', 'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots', 'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots', 'turtle_helmet', 'shield', 'fishing_rod', 'carrot_on_a_stick', 'elytra', 'bell', 'warped_fungus_on_a_stick'] },
    'curse_of_vanishing': { max: 1, applicable: ['wooden_pickaxe', 'stone_pickaxe', 'iron_pickaxe', 'diamond_pickaxe', 'netherite_pickaxe', 'golden_pickaxe', 'wooden_axe', 'stone_axe', 'iron_axe', 'diamond_axe', 'netherite_axe', 'golden_axe', 'wooden_shovel', 'stone_shovel', 'iron_shovel', 'diamond_shovel', 'netherite_shovel', 'golden_shovel', 'wooden_hoe', 'stone_hoe', 'iron_hoe', 'diamond_hoe', 'netherite_hoe', 'golden_hoe', 'wooden_sword', 'stone_sword', 'iron_sword', 'diamond_sword', 'netherite_sword', 'golden_sword', 'bow', 'crossbow', 'trident', 'leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots', 'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots', 'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots', 'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots', 'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots', 'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots', 'turtle_helmet', 'shield', 'fishing_rod', 'carrot_on_a_stick', 'elyra', 'bell', 'warped_fungus_on_a_stick'] },
    'curse_of_binding': { max: 1, applicable: ['leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots', 'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots', 'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots', 'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots', 'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots', 'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots', 'turtle_helmet', 'shield', 'carved_pumpkin', 'head'] },

    // Frost Walker (boots only)
    'frost_walker': { max: 2, applicable: ['leather_boots', 'iron_boots', 'golden_boots', 'diamond_boots', 'netherite_boots', 'chainmail_boots'] }
};
