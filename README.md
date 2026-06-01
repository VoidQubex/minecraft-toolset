# Minecraft Give Command Generator

A modern, glassy dark-mode web application for generating Minecraft 26.1.2 give commands with enchantments.

## Features

✨ **Modern Design**
- Glassy dark mode interface with glassmorphism effects
- Smooth animations and transitions
- Responsive design that works on all devices
- Real-time statistics display

⚙️ **Functionality**
- Generate `/give` commands for any Minecraft item
- Apply custom enchantments with max levels
- "All Enchants" checkbox to quickly apply all applicable enchantments
- Individual enchantment selection
- Auto-disable non-applicable enchantments based on selected item
- Copy to clipboard functionality

📦 **Complete Database**
- All Minecraft items (tools, weapons, armor, etc.)
- All Minecraft enchantments with correct max levels
- Automatic applicability detection for each item
- Updated for Minecraft version 26.1.2

## Usage

1. Open `index.html` in your web browser
2. Select an item from the "Item" dropdown
3. Set the count (1-64 items)
4. Either:
   - Check "All Enchants" to apply all applicable enchantments at max level
   - Or select individual enchantments from the grid
5. Click "Generate Command"
6. Copy the generated command and paste it into Minecraft chat (with cheats enabled)

## Example Output

```
/give @s netherite_sword[enchantments:{sharpness:5,knockback:2,fire_aspect:2,looting:3}]
```

## Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript (no dependencies)
- **Data Structure**: Complete Minecraft items and enchantments database
- **Compatibility**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Performance**: Lightweight and fast

## Project Structure

```
minecraft-toolset/
├── index.html       # Main HTML structure and styles
├── data.js          # Minecraft items and enchantments database
├── app.js           # Application logic and event handlers
└── README.md        # This file
```

## Enchantment Categories

- **Tool/Weapon**: Sharpness, Smite, Bane of Arthropods, Knockback, Fire Aspect, Looting, Sweeping Edge
- **Mining**: Efficiency, Fortune, Silk Touch, Unbreaking
- **Armor**: Protection, Fire Protection, Feather Falling, Blast Protection, Projectile Protection, Thorns, Respiration, Aqua Affinity, Depth Strider, Swift Sneak
- **Bow**: Power, Punch, Flame, Infinity
- **Crossbow**: Multishot, Piercing, Quick Charge
- **Trident**: Loyalty, Impale, Riptide, Channeling
- **Fishing Rod**: Lure, Luck of the Sea
- **Other**: Mending, Curse of Vanishing, Curse of Binding, Frost Walker

## License

Open source - feel free to use and modify!
