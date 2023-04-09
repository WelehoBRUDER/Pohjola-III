# Version 0.2.1 ~ 2023.4.9

## New features & additions
- Added new stat ``accuracy``.
  - Accuracy is a stat that affects your chance to hit.
  - It works by decreasing the enemy's dodge chance.
- Added new skill ``Vile Strikes`` for all classes.
  - Vile Strikes is a skill that increases your accuracy and crit rate.
  - Min: 40% acc, 40% crit
  - Max: 100% acc, 100% crit
- Added easier difficulty settings.
  - Enemy damage can be set to 80%/60%/40%.
  - Enemy health can be set to 80%/60%/50%.
  - Healing effectiviness can be set to 125%/150%/175%.
  - Mana regeneration can be set to 120%/150%/200%.
  - These settings will lower score multiplier.
- Added new items:
  - "Blade of Hero" (epic sword)
  - "Signet of Precision" (epic ring)
  - "Signet of Power" (epic ring)
  - "Signet of Health" (epic ring)
- Added button to go back to main menu
  - Next to load from file button in saves screen.

## Changes
- "Battle Aura"
  - Increases accuracy by 15/20/25/30
  - Duration increased from 7.5 --> 10 seconds.
  - Cooldown increased from 12 --> 16 seconds.
  - Upgraded durations are now 11/12/13 seconds.
- Some debuff effects now also lower accuracy.
- Made escape more universal.
- Added exit buttons to menu screens.
- Changed some internal parameter names.

# Version 0.2.0 ~ 2023.4.1

## New features & additions
- Added new enemies:
  - Minotaur Sage
  - Minotaur Captain
  - Minotaur King (Oros, King of Minor)
- Added new dungeon: `Fortress of Minor`
  - Unlocked after defeating the orc chieftain.
  - Fight boss "Minotaur King" to complete.
- Added new items:
  - Minotaur armor set.
  - Ring of Bull Power.
  - New potion tiers.
  - Blessed Graves.
  - Five talismans, each increase a stat by 3.
- Added search & filter to all inventory screens (including store).
- Added command "lose" to the game.
- Playtime is finally tracked. (It no longer stays at 0)
- The game now tracks score, and challenges improve the multiplier.

## Changes
- Added highlight to perk tree when hovering over a perk.
  - Highlights perks that are required to unlock the hovered perk.
  - Will not highlight already owned perks.
- Dodge text is now silver instead of black.
- Added more clarity between dungeons and floors / stages.
- Slightly buffed Orc Chief Armor.
- Changed save slot font and some other minor UI changes.
- Reworked the statistics screen.
  - Added more statistics.
  - Statistics are divided into 7 categories.
- Scrollbar is now visible in more screens.
- Slightly improved ui scaling.

## Bug fixes
- Fixed enemies attacking after death.
- Fixed enemies attacking multiple times in a row.
- Fixed lock-on targeting not working properly.
- Fixed overwriting saves not working.
- Fixed save files acting weird when loading from a hardcore save.
- Fixed "most healing done" not being tracked.

# Version 0.1.4 ~ 2023.3.19

## New features & additions
- Added level 5 & 10 perks for each class. (24 new perks in total!)
- Added new skill "Poison cloud" for the rogue class.
- Added "ignore" command to the game.

## Bug fixes
- Fixed certain old saves breaking upon load.
- Fixed not getting hp & mp recovery during level up with "no recovery" challenge active.

# Version 0.1.3 ~ 2023.3.16

## New features & additions
- Added classes.
  - Currently there are 4 classes: warrior, rogue, mage and paladin.
- Added purchasable perks for each class.
  - Perks are unlocked at certain levels and cost money.
  - Perks can also require certain stats to be unlocked.

## Changes
- See breakdown of your modifiers in character screen (tooltip when hovering).
- Stun resistance now reduces the duration of stuns instead of resisting them.

# Version 0.1.2 ~ 2023.3.14

## New features & additions
- Added new dungeon: `Abandoned Fort`
  - Unlocked after defeating the troll.
  - Fight boss "Orc Chieftain" to complete.
- Added orc related items.
  - Orc chief armor set.
  - Orc berserker axes.
- Added "killall" command to the game.
- Added "enter" command to the game.
- Added "leave" command to the game.

## Bug fixes
- Fixed text overflowing from notifications.
- Fixed stun resistance doing nothing.

# Version 0.1.1 ~ 2023.3.12

## New features & additions
- Added target lock on mechanic to settings.
- Added "fight" command to the game.
- Added the "ranger" armor set. 
  - This armor set is a bit weaker than the "plate" armor set, but it has a chance to dodge attacks.
- Added some missing localization.
## Bug fixes
- Fixed being able to upgrade the first perk, despite it having no levels. 
  - This happened because the max level check was done after a requirement check  
  which the first perk passes by default.
- Fixed not being able to unequip armor.

# Version 0.1 ~ 2023.3.11
This is the first proper version of Pohjola III.  
The game is still in early development, so expect bugs and missing features.

## New features & additions
- Dungeons mechanics are mostly working.
  - The game currently has 1 dungeon.

### This version does not have any changes as there are no previous versions.
