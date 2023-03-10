const english = {
  language: "English",
  language_code: "en",

  // Stats
  str: "Strength",
  agi: "Agility",
  int: "Intelligence",
  vit: "Vitality",
  spi: "Spirit",
  atk: "Attack",
  spell_scale: "Spell Scaling",
  scaling: "Scales with",
  hp: "Health",
  mp: "Mana",
  atkV: "Attack buff",
  atkP: "Attack buff",
  strP: "Strength buff",
  agiP: "Agility buff",
  intP: "Intelligence buff",
  vitP: "Vitality buff",
  spiP: "Spirit buff",
  hpMax: "Max Health",
  mpMax: "Max Mana",
  ap: "Action Points",
  speed: "Speed",
  speedP: "Speed buff",
  speedV: "Speed buff",
  critRate: "Crit Rate",
  critPower: "Crit Power",
  damage: "Damage",
  damageP: "Damage buff",
  damageV: "Damage buff",
  physicalDamage: "Physical Damage",
  magicalDamage: "Magical Damage",
  elementalDamage: "Elemental Damage",
  physicalDefence: "Physical Defence",
  magicalDefence: "Magical Defence",
  elementalDefence: "Elemental Defence",
  mpRegen: "Mana Regen",
  mpRegenFromInt: "Intelligence as Mana Regen",
  mpRegenFromSpi: "Spirit as Mana Regen",

  // combat
  combat_defeat: "Defeat",
  combat_defeat_text: "You have been defeated in battle!",
  combat_victory: "Victory",
  defeated_enemies: "Defeated enemies",
  loot_gained: "Loot gained",
  continue: "Continue",

  // misc
  increases: "Increases",
  decreases: "Decreases",
  by: "by",
  stats: "Stats",
  defences: "Defences",
  resists: "Resistances",
  gold: "Gold",
  mp_cost: "Mana Cost",
  mpCost: "Mana Cost",
  duration: "Duration",
  cooldown: "Cooldown",
  expGain: "Experience Gain",
  goldGain: "Gold Gain",
  luck: "Luck",
  allCooldown: "All Cooldowns",
  perk_points: "Perk Points",
  skill_points: "Skill Points",
  gold_tt: "Gold is used to buy items and equipment.",
  perk_points_tt: "Perk Points are used to unlock Perks",
  skill_points_tt: "Skill Points are used to unlock and upgrade Skills",
  level_tt: "Your character's current level",
  xp_tt: "Your experience, when it reaches the limit, you will level up",
  power_level_tt: "Your approximate combat power based on your equipment and stats",
  shift_to_compare: "\n<c>yellow<c>Hold shift to compare to equipped item",
  effective_change: "Effective changes",
  leveled_times: "leveled {times} times.",
  power_level: "Power Level",
  total_danger: "Total Danger",
  next_level: "Next Level",
  add_ability: "Gain ability",
  effects_to_self: "Effects to user",
  effects_to_foe: "Effects to target",
  boss: "This stage is a boss fight!",
  pouch: "Potion Pouch",
  potion_pouch_tt: "Use a potion from your pouch",
  average_power: "Average Power",
  improve_stat: "Increases <i>{statIcon}<i> {stat} by {amount}",

  // Menu
  new_game: "New Game",
  load_game: "Load Game",
  settings: "Settings",
  credits: "Credits",

  // Saves
  save: "Save",
  load: "Load",
  delete: "Delete",
  save_name: "Save Name",
  save_to_file: "Save to file",
  load_from_file: "Load from file",
  back_to_menu: "Back to menu",
  last_saved: "Last saved",
  progress: "Progress",
  player_level: "Player Level",
  created_at: "Created at",
  version: "Version",
  id: "ID",
  hardcore_emphasis: "HARDCORE!",

  // effect strings
  damageFlat: "Damage per second",
  damagePercent: "Damage per second",
  healingFlat: "Healing per second",
  healingPercent: "Healing per second",
  damagePercent_first: "Deals",
  damagePercent_last: "<c>white<c>of the target's <c>gold<c>max health<c>white<c> in [TYPE] <c>crimson<c>damage<c>white<c> every second",
  damageFlat_first: "Deals",
  damageFlat_last: "[TYPE] <c>crimson<c>damage<c>white<c> every second",
  healingPercent_first: "<c>lime<c>Heals<c>white<c>",
  healingPercent_last: "<c>white<c>of the target's <c>gold<c>max health<c>white<c> every second",
  healingFlat_first: "<c>lime<c>Heals<c>white<c>",
  healingFlat_last: "<c>green<c>health<c>white<c> every second",

  // Stat tooltips
  str_tt: "Increases <i><v>icons.physical<v><i> physical damage by 2%\nand <i><v>icons.critPower<v><i> critical damage by 0.5%.§",
  agi_tt:
    "Increases <i><v>icons.speed<v><i> speed by 1, <i><v>icons.critRate<v><i> crit rate by 0.2%\nand <i><v>icons.dodge<v><i> dodge chance by <v>(player.allModifiers?.dodgeFromAgi || 0) + 0.5<v>§%.",
  int_tt:
    "Improves <i><v>icons.magical<v><i> magical damage and increases <i><v>icons.mpMax<v><i> mana by <v>player.allModifiers.mpMaxFromIntV<v>.§",
  vit_tt: "Increases <i><v>icons.hpMax<v><i> health by <v>player.allModifiers.hpMaxFromVitV<v>.§",
  spi_tt:
    "Improves <i><v>icons.elemental<v><i> elemental damage and increases <i><v>icons.mpMax<v><i> mana by <v>player.allModifiers.mpMaxFromSpiV<v>.§",
  atk_tt: "Determines base physical damage and slightly increases spell scaling.§",
  spell_scale_tt: "Multiplies the damage of spells by this amount as percentage.",
  hpMax_tt: "This is your <i><v>icons.hpMax<v><i> health.",
  mpMax_tt: "This is your <i><v>icons.mpMax<v><i> mana.",
  mpRegen_tt: "How much <i><v>icons.mpMax<v><i> mana you <i><v>icons.mpRegen<v><i> regenerate every second.",
  speed_tt: "Lowers the time it takes to get your turn in combat.\nHigher is better.",
  dodge_tt: "Increases the chance to dodge an attack.",
  critRate_tt: "Increases the chance of a <i><v>icons.critPower<v><i> critical hit.",
  critPower_tt: "Increases the damage multiplier of a <i><v>icons.critPower<v><i> critical hit.",
  // def
  physical_tt: "Reduces damage taken from <i><v>icons.physical<v><i> physical attacks.",
  magical_tt: "Reduces damage taken from <i><v>icons.magical<v><i> magical attacks.",
  elemental_tt: "Reduces damage taken from <i><v>icons.elemental <v><i> elemental attacks.",
  // res
  fire_tt: "Reduces damage taken from fire attacks.",
  ice_tt: "Reduces damage taken from ice attacks.",
  thunder_tt: "Reduces damage taken from thunder attacks.",
  curse_tt: "Reduces damage taken from curse attacks.",
  poison_tt: "Reduces damage taken from poison attacks.",
  bleed_tt: "Reduces damage taken from bleed attacks.",
  divine_tt: "Reduces damage taken from divine attacks.",
  stun_tt: "Reduces chance of getting stunned.",

  // Ability names //
  sharp_strike: "Sharp Strike",
  fierce_attack: "Fierce Attack",
  battle_aura: "Battle Aura",
  flame: "Flame",
  disorienting_blow: "Disorienting Blow",
  healing_light: "Healing Light",
  holy_grace: "Holy Grace",

  // Effect names //
  wounded: "Wounded",
  attack_1: "Attack I",
  regeneration_1: "Regeneration I",
  burning: "Burning",

  // Enemy names //
  skeleton: "Skeleton",
  skeleton_brute: "Skeleton Brute",
  skeleton_knight: "Skeleton Knight",
  skeleton_mage: "Skeleton Mage",
  goblin: "Goblin",
  orc: "Orc",
  orc_berserker: "Orc Berserker",
  troll: "Troll",

  // Skill names //
  skill_fierce_attack: "Fierce Attack",
  fierce_attack_upgrade_1: "Fierce Attack I",
  fierce_attack_upgrade_2: "Fierce Attack II",
  fierce_attack_upgrade_3: "Fierce Attack III",
  skill_sharp_strike: "Sharp Strike",
  sharp_strike_upgrade_1: "Sharp Strike I",
  sharp_strike_upgrade_2: "Sharp Strike II",
  sharp_strike_upgrade_3: "Sharp Strike III",
  skill_battle_aura: "Battle Aura",
  battle_aura_upgrade_1: "Battle Aura I",
  battle_aura_upgrade_2: "Battle Aura II",
  battle_aura_upgrade_3: "Battle Aura III",
  skill_flame: "Flame",
  flame_upgrade_1: "Flame I",
  flame_upgrade_2: "Flame II",
  flame_upgrade_3: "Flame III",
  skill_disorienting_blow: "Disorienting Blow",
  disorienting_blow_upgrade_1: "Disorienting Blow I",
  disorienting_blow_upgrade_2: "Disorienting Blow II",
  skill_healing_light: "Healing Light",
  healing_light_upgrade_1: "Healing Light I",
  healing_light_upgrade_2: "Healing Light II",
  skill_holy_grace: "Holy Grace",
  holy_grace_upgrade_1: "Holy Grace I",
  holy_grace_upgrade_2: "Holy Grace II",
  holy_grace_upgrade_3: "Holy Grace III",

  // Statistics
  most_damage: "Most Damage Dealt",
  most_damage_taken: "Most Damage Taken",
  total_damage: "Total Damage Dealt",
  total_damage_taken: "Total Damage Taken",
  most_healing: "Most Healing Done",
  total_healing: "Total Healing Done",
  total_kills: "Total Kills",
  total_deaths: "Total Deaths",
  total_xp_gained: "Total XP Gained",
  total_gold_gained: "Total Gold Gained",
  most_turns: "Most Turns In Battle",
  total_turns: "Total Turns In Battles",
  most_combat_time: "Longest Combat Time",
  total_combat_time: "Total Combat Time",
  time_played: "Time Played",

  // Floors
  floor_1: "Catacombs of Vithail",
  floor_1_desc: "A cold and decrepit place, \nlong abandoned by the living.",
  floor_2: "The Forgotten Woods",
  floor_2_desc: "A dark and gloomy forest, \noverrun by orcs and goblins.",
  floor_3: "Minorian Highway",
  floor_3_desc: "A long and winding road, \nleading to the ancient city of Minor.",

  // Stages
  tutorial: "Tutorial",
  graveyard_expedition: "Graveyard Expedition",
  undead_menace: "Undead Menace",
  stage_4: "Stage 4",
  stage_5: "Stage 5",
  stage_6: "Stage 6",
  stage_7: "Stage 7",
  stage_8: "Stage 8",
  stage_9: "Stage 9",
  tomb_of_the_mage: "Tomb of the Mage",
  stage_11: "Goblin Cave",
  stage_12: "Lone Orc",
  stage_13: "Stage 13",
  stage_14: "Stage 14",
  stage_15: "Stage 15",
  stage_16: "Stage 16",
  stage_17: "Stage 17",
  stage_18: "Stage 18",
  stage_19: "Stage 19",
  stage_20: "King of the Ancient Forest",
  stage_21: "Stage 21",
  stage_22: "Stage 22",

  // Menu text //

  name: "Name",
  starting_aspect: "Aspect",
  starting_challenges: "Challenges",
  start_game: "Start Game",
  starting_items: "Starting Items",
  no_items: "You get nothing! Good day, sir!",

  // Aspects //
  curiosity: "Curiosity",
  curiosity_desc: "Your thirst for knowledge is insatiable.",
  study: "Study",
  study_desc: "You are a student of the arcane.",
  strength: "Strength",
  strength_desc: "You have great trust in your body.",
  health: "Health",
  health_desc: "You are always prepared.",
  determination: "Determination",
  determination_desc: "You have naught but your stubborn will.",

  // Challenges //
  hardcore: "Hardcore",
  hardcore_desc: "<c>white<c>Your save will be <c>crimson<c>deleted<c>white<c> upon defeat.",
  no_after_combat_recovery: "No after combat recovery",
  no_after_combat_recovery_desc: "<c>white<c>You will not recover <c>crimson<c>HP<c>white<c> or <c>blue<c>MP<c>white<c> after combat.",
  no_grinding: "No grinding",
  no_grinding_desc: "<c>white<c>Each stage can only be beaten <c>crimson<c>once<c>white<c>.",
  real_time_combat: "Real time combat",
  real_time_combat_desc: "<c>white<c>The game will not pause during your turn.\n<c>orange<c>Better think fast!",
  enemy_damage: "Enemy damage",
  enemy_damage_desc: "<c>white<c>Enemies deal more damage.",
  enemy_health: "Enemy health",
  enemy_health_desc: "<c>white<c>Enemies have more health.",
  healing_weakness: "Healing effectiveness",
  healing_weakness_desc: "<c>white<c>Healing is less effective.",
  mana_regen_debuff: "Mana regeneration",
  mana_regen_debuff_desc: "<c>white<c>Passive mana regeneration is weaker.",

  // Dungeons
  enter_dungeon_1: "Are you sure you wish to enter",
  vithail_dungeon: "Vithail Crypts",

  // Perks //
  "0_foundation_of_power": "Foundation of Power",
  "0_foundation_of_power_desc": "",
  agility_1: "Agility I",
  agility_2: "Agility II",
  agility_3: "Agility III",
  agility_4: "Agility IV",
  agility_5: "Agility V",
  agility_6: "Agility VI",
  agility_7: "Agility VII",
  agility_8: "Agility VIII",
  power_1: "Power I",
  power_2: "Power II",
  power_3: "Power III",
  power_4: "Power IV",
  power_5: "Power V",
  power_6: "Power VI",
  power_raw_power: "Power Raw Power",
  smart_1: "Smart I",
  smart_2: "Smart II",
  smart_3: "Smart III",
  smart_4: "Smart IV",
  smart_5: "Smart V",
  smart_6: "Smart VI",
  smart_7: "Smart VII",
  smart_8: "Smart VIII",
  smart_9: "Smart IX",
  smart_caution: "Smart Caution",
  strength_1: "Strength I",
  strength_2: "Strength II",
  strength_3: "Strength III",
  strength_4: "Strength IV",
  strength_5: "Strength V",
  strength_6: "Strength VI",
  strength_7: "Strength VII",
  strength_8: "Strength VIII",
  strength_9: "Strength IX",
  tough_1: "Tough I",
  tough_2: "Tough II",
  tough_3: "Tough III",
  tough_4: "Tough IV",
  tough_5: "Tough V",
  tough_6: "Tough VI",
  tough_7: "Tough VII",
  tough_8: "Tough VIII",
  tough_9: "Tough IX",
  tough_defensive: "Tough Defensive",
  warrior: "Warrior",
  weak_points: "Weak Points",
  will_1: "Will I",
  will_2: "Will II",
  will_3: "Will III",
  will_4: "Will IV",
  will_5: "Will V",
  will_6: "Will VI",
  will_7: "Will VII",
  will_8: "Will VIII",
  will_enlightened: "Will Enlightened",

  // Log
  reached_level: "Reached level {0}!",
  gained_xp: "Gained {0} XP",
  gained_gold: "Gained {0} gold",
  lost_gold: "Lost {0} gold",
  recovered_health: "Recovered {0} health",
  recovered_mana: "Recovered {0} mana",
};
