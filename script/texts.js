const texts = {
  health_text: `<bcss>line-height: 1.25<bcss><c>red<c> <f>30px<f> Your healthbar§
  Your health represents the amount of hits
  your character can take before keeling over.
  When your health reaches 0 points,
  you are §<c>crimson<c>defeated. §
  - Your maximum health is §<c>red<c><v>player.stats.FhpMax()<v>hp §
  - Your current health is §<c>red<c><v>player.stats.hp<v>hp §
  - Your remaining health is §<c>red<c><v>((player.stats.hp/player.stats.FhpMax())*100).toFixed(1)<v>%`,

  mana_text: `<bcss>line-height: 1.25<bcss><c>#4287f5<c> <f>30px<f> Your manabar§
  Your mana represents how many abilities
  that use it your character can cast before running out.
  You can replenish mana with potions.
  - Your maximum mana is §<c>#4287f5<c><v>player.stats.FmpMax()<v>mp §
  - Your current mana is §<c>#4287f5<c><v>player.stats.mp<v>mp §
  - Your remaining mana is §<c>#4287f5<c><v>((player.stats.mp/player.stats.FmpMax())*100).toFixed(1)<v>%`,

  action_text: `<bcss>line-height: 1.25<bcss><c>#59e04a<c> <f>30px<f> Your actionbar§
  Your action points represent your speed
  during combat. When the bar is filled,
  your turn will begin, pausing combat.
  - Your current fillrate is § <c>#59e04a<c><v>(player.actionFill()*60).toFixed(1)<v>%§/s`,

  regular_attack_text: `<bcss>line-height: 1.1<bcss><c>yellow<c><f>24px<f>[A]ttack§
  No special effects or modifiers.
  Just boring damage from
  your stats and weapon.
  Damage: §<c>orange<c><v>player.minDmg()<v>§ - §<c>orange<c><v>player.maxDmg()<v>`,

  open_inventory_text: `<bcss>line-height: 1.1<bcss><c>yellow<c><f>24px<f>[I]nventory§
  Open your inventory.
  You can use various items
  like gems during combat
  to heal or buff.`,

  defeat_text: `<bcss>line-height: 1.25; text-shadow: 0px 0px 4px black;<bcss><ff>RobotoBold<ff><f>26px<f><c>white<c>Unable to withstand the blows you've received, you collapse on the ground in a sweaty and bleeding mess.
  Your enemies have defeated you, and you are now left at their mercy.
  In the current circumstance, only one thing is certain.
  This will not end well for you.`,

  win_text: `<bcss>line-height: 1.25; text-shadow: 0px 0px 4px black;<bcss><ff>RobotoBold<ff><f>26px<f><c>white<c>As all of your foes collapse to the ground, beaten, you alone stand as the sole victor.
  You feel a sense of accomplishment and relief at winning the gritty battle.
  Time to push on!`,

  warrior_perk_start: `Desc found!`
}

const loc = {
  "light_weapons": "Light Weapons",
  "heavy_weapons": "Heavy Weapons",
  "shield": "Shield",
  "armorer": "Armorer",
  "dodge": "Dodge",
  "barter": "Bartering",
  "str": "Strength",
  "vit": "Vitality",
  "agi": "Agility",
  "int": "Intelligence",
  "wis": "Wisdom",
  "hp": "Health",
  "mp": "Mana",
  "hpMax": "Max Health",
  "mpMax": "Max Mana",
  "physicalArmor": "Physical Armor",
  "magicalArmor": "Magical Armor",
  "elementalArmor": "Elemental Armor",
  "defense": "Defense",
  "attack": "Attack",
  "critChance": "Crit Chance",
  "critDmg": "Crit Damage",
  "barter": "Bartering",
  "dodge": "Dodge",
  "armorer": "Armorer",
  "shield": "Shield"
}