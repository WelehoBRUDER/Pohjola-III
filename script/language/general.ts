const english = {
  language: "English",
  language_code: "en",

  // Menu
  continue_tt: "<c>white<c>Continue playing save <c>goldenrod<c><v>saveController.saveSlots[0].name<v>",

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
  hpMaxV: "Max Health",
  hpMaxP: "Max Health %",
  mpMax: "Max Mana",
  mpMaxV: "Max Mana",
  mpMaxP: "Max Mana %",
  manaRecover: "Mana Recover",
  ap: "Action Points",
  speed: "Speed",
  speedP: "Speed buff",
  speedV: "Speed buff",
  critRate: "Crit Rate",
  critRateV: "Crit Rate buff",
  critPower: "Crit Power",
  critPowerV: "Crit Power buff",
  accV: "Accuracy buff",
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
  dodge: "Dodge",
  accuracy: "Accuracy",
  acc: "Accuracy",
  heal: "Heal",
  meleeDamage: "Melee Damage",
  spellPower: "Spell Power",
  healPower: "Heal Power",
  healReceived: "Healing Received",

  // Resistances
  fireResistance: "Fire Resistance",
  iceResistance: "Ice Resistance",
  thunderResistance: "Thunder Resistance",
  curseResistance: "Curse Resistance",
  poisonResistance: "Poison Resistance",
  bleedResistance: "Bleed Resistance",
  divineResistance: "Divine Resistance",
  stunResistance: "Stun Resistance",

  // Classes
  warrior: "Warrior",
  warrior_desc: "Warriors fight close to the enemy, facing them head on.",
  rogue: "Rogue",
  rogue_desc: "Rogues fight in close combat using all kinds of tricks and speed.",
  mage: "Mage",
  mage_desc: "Mages wield the terrifying force of mana.",
  paladin: "Paladin",
  paladin_desc: "Paladins devote themselves to a god of their patronage.\nTheir worship grants them protection and strength.",

  // combat
  combat_defeat: "Defeat",
  combat_defeat_text: "You have been defeated in battle!",
  combat_victory: "Victory",
  defeated_enemies: "Defeated enemies",
  loot_gained: "Loot gained",
  score_received: "Got {score} <c>yellow<c>score<c>silver<c>!",
  continue: "Continue",

  // Settings
  animation_speed: "Animation speed",
  animation_speed_tt:
    "<f>0.85rem<f>How fast combat animations are played.\nValues deviating from default may cause weird animations.\n\n<f>0.85rem<f>Default: 1x",
  tick_speed: "Tick speed",
  tick_speed_tt:
    "<f>0.85rem<f>Controls the speed of the game's internal clock.\nHigher values will make the game run faster, but may cause lag.\nLower values will make the game run slower, but smoother.\n\n<f>0.85rem<f>Default: 1x (60 ticks per second)",
  lock_on_targeting: "Lock on targeting",
  lock_on_targeting_tt:
    "<f>0.85rem<f>When enabled, an enemy will always be the target during combat.\nWhen disabled, you must always choose your target when using a skill.",

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
  all_mpCost: "All Mana Costs",
  duration: "Duration",
  cooldown: "Cooldown",
  all_cooldown: "All Cooldowns",
  aoe: "<c>lime<c>This ability hits all foes!<c>white<c>",
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
  you_lost: "You lost",
  buy_item: "Buy item",
  buy_multiple_item: "Buy multiple items",
  sell_item: "Sell item",
  sell_multiple_item: "Sell multiple items",
  drink_potion: "Drink potion",
  equip_item: "Equip item",
  unequip_item: "Unequip item",
  level: "Level",
  confirm_perk_unlock: `Are you sure you want to unlock perk\n"{id}" ?`,
  class_perk_owned: "You have this perk!",
  class_perk_exclusive: "Exclusive with",
  xp: "Experience",
  class: "Class",

  // Special
  divine_desc: "Extra damage vs unholy enemies",
  poison_desc: "Deals poison damage",

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
  save_over: "Are you sure you want to overwrite",
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
  accuracy_tt: "Increases chance for attack to hit vs enemy dodge.\nFor example, 50 acc means (dodge) - 50%.",
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
  stun_tt: "Reduces length of stuns.",

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
  skeleton_lord: "Skeleton Lord",
  goblin: "Goblin",
  orc: "Orc",
  orc_berserker: "Orc Berserker",
  orc_chieftain: "Orc Chieftain",
  troll: "Troll",
  minotaur: "Minotaur",
  minotaur_warrior: "Minotaur Warrior",
  minotaur_sage: "Minotaur Sage",
  minotaur_captain: "Minotaur Captain",
  minotaur_king: "Oros, King of Minor",

  // Skill names //
  player_base_attack: "Normal attack",
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
  healing: "Healing",
  combat: "Combat",
  resources: "Resources",
  turns: "Turns",
  time: "Time",
  completion: "Completion",
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
  total_items_gained: "Total Items Gained",
  total_gold_spent: "Total Gold Spent",
  total_xp_lost: "Total XP Lost",
  most_turns: "Most Turns In Battle",
  total_turns: "Total Turns In Battles",
  most_combat_time: "Longest Combat Time",
  total_combat_time: "Total Combat Time",
  time_played: "Time Played",
  score: "Score",
  score_tt: "Score is gained from defeating enemies.\nScore multiplier: <v>scoreMultiplier().toFixed(2)<v>§x",
  progress_tt: "How many stages you have completed and key items gathered.",

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
  stage_23: "Stage 23",
  stage_24: "Stage 24",
  stage_25: "Stage 25",
  stage_26: "Stage 26",
  stage_27: "Stage 27",
  stage_28: "Stage 28",
  stage_29: "Stage 29",
  stage_30: "Captain of the Guard",

  // Menu text //

  name: "Name",
  starting_aspect: "Aspect",
  starting_challenges: "Challenges",
  SCORE_MULTIPLIER: "Score multiplier",
  SCORE_MULTIPLIER_tt: "Multiplies base score by this value.",
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
  beat_stage_to_unlock: "Complete stage to unlock",
  key_item_to_unlock: "You need this to enter",
  dungeon_warn: "<c>crimson<c>Your health and mana will not be restored after combat!\n<c>white<c>",
  enter_dungeon_1: "Are you sure you wish to enter",
  vithail_dungeon: "Vithail Crypts",
  vithail_dungeon_desc: "A cursed crypt, ruled by a powerful skeleton lord.\nHis aura prevents the curse from being lifted.",
  abandoned_fort: "Abandoned Fort",
  abandoned_fort_desc: "Fortress abandoned by its former lord.\nNow ruled by a powerful orc chief.",
  fortress_minor: "Fortress Minor",
  fortress_minor_desc: "The ancient fortress of Minor,\nits king long since corrupted.",

  // Dungeon events
  keys_found: "Found key item(s)",
  keys_needed: "Key item(s) needed",
  loot_found: "Found loot",
  restored: "Health and mana restored from the fountain.",
  restored_in_dungeon: "You feel the power of the fountain restore your health and mana.",
  vithail_dungeon_end:
    "<c>white<c>You've slain the Skeleton Lord and with him, the curse of the crypts. You can leave now, or continue exploring.\n<c>lime<c>Vithail Crypts cleared!",
  abandoned_fort_end:
    "<c>white<c>You've slain the Orc Chief and his minions. You can leave now, or continue exploring.\n<c>lime<c>Abandoned Fort cleared!",
  fortress_minor_end:
    "<c>white<c>You've slain the King of Minor and his minions. His corruption will no longer seep in to the land. You can leave now, or continue exploring.\n<c>lime<c>Fortress Minor cleared!",

  // Key items
  ruby_key_vithail: "Ruby Key",
  lord_key_vithail: "Vithail Lord Chamber's Key",
  vithail_lord_insignia: "Lord of Vithail Insignia",
  abandoned_fort_jail_key: "Jail Key (Abandoned Fort)",
  abandoned_fort_keep_key: "Key to the Keep (Abandoned Fort)",
  orc_chief_tusk: "Orc Chief Tusk",
  fortress_minor_gold_key: "Gold Key (Fortress Minor)",
  fortress_minor_jewelled_key: "Jewelled Key (Fortress Minor)",
  bull_king_crown: "Crown of the Bull King",

  // Puzzles & Riddles
  riddle: "A Riddle",
  start_riddle: "Start Riddle",
  decline: "Decline",
  riddle_damage: "<c>white<c>\n\n<c>silver<c>You take damage from the riddle! <c>crimson<c>-{damage} HP!",
  fortress_minor_q_puzzle_1_desc: "A magical door stands before you. It requires you to answer its riddles to see behind it.",
  fortress_minor_q_puzzle_1_1: `"I walk on four legs in the morning, two legs at noon, and three legs in the evening. What am I?"`,
  fortress_minor_q_puzzle_1_1_correct: `"That's right, you get to answer the next riddle!"`,
  fortress_minor_q_puzzle_1_1_incorrect: `"No, no, no. You are not worthy! Begone!"`,
  fortress_minor_q_puzzle_1_2: `"I destroy all, birds, beasts, kings and castles alike, the very mountains themselves. But a weapon I am not. What am I?"`,
  fortress_minor_q_puzzle_1_2_correct: `"Good. You're ready for the last question."`,
  fortress_minor_q_puzzle_1_2_incorrect: `"You tripped up I see. You are not worthy! Begone!"`,
  fortress_minor_q_puzzle_1_3: `"I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?"`,
  fortress_minor_q_puzzle_1_3_correct: `"Well, you've proven yourself. You may have my treasure."`,
  fortress_minor_q_puzzle_1_3_incorrect: `"Was it all mere luck? You are not worthy! Begone!"`,

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
  warrior_perk: "Warrior",
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

  // Class specific perks
  // WARRIOR
  warrior_vitality: "Warrior's Vitality",
  warrior_vitality_desc: "Close combat invigorates you.",
  warrior_power: "Combat Prowess",
  warrior_power_desc: "Your skill in melee improves.",
  warrior_strength: "Strength Training",
  warrior_strength_desc: "Those muscles won't build themselves.",
  warrior_toughness: "Tough as Nails",
  warrior_toughness_desc: "You're keeping it together.",
  warrior_battle_arts: "Arts of Battle",
  warrior_battle_arts_desc: "Some spells can really make a difference.",
  warrior_berserking: "Berserking",
  warrior_berserking_desc: "No time for magic - that's for pansies!",
  warrior_wider_arc: "Wider Arc",
  warrior_wider_arc_desc: "You're getting better at hitting multiple foes.",
  warrior_utility: "Utility",
  warrior_utility_desc: "You find new tricks to use on your enemies.",
  warrior_master_basics: "Master the Basics",
  warrior_master_basics_desc:
    "I fear not the man who has practiced 10k attacks once,\n but I fear the man who has practiced one attack 10k times.",
  // ROGUE
  rogue_make_haste: "Make Haste",
  rogue_make_haste_desc: "Keep moving or perish.",
  rogue_nimble: "Nimbler",
  rogue_nimble_desc: "Your foes are struggling to keep track of you.",
  rogue_agile: "Agility Training",
  rogue_agile_desc: "You're getting better at dodging.",
  rogue_critical_strike: "Critical Strike",
  rogue_critical_strike_desc: "You're getting better at hitting weak spots.",
  rogue_bob_and_weave: "Bob & Weave",
  rogue_bob_and_weave_desc: "Avoiding hits and ending fights is more your style.",
  rogue_parry_and_riposte: "Parry & Riposte",
  rogue_parry_and_riposte_desc: "'En garde!' you say to your enemies.",
  rogue_poison_cloud: "Poison Cloud",
  rogue_poison_cloud_desc: "Let's see how they fight while coughing to death!",
  rogue_dancer: "Death's Dancer",
  rogue_dancer_desc: "Your graceful motions emphasize your enemy's demise.",
  rogue_fencer: "Fair Fencer",
  rogue_fencer_desc: "It's not backstabbing if it comes from the front.",
  // MAGE
  mage_mana_regen: "Mana Regeneration",
  mage_mana_regen_desc: "Your mana regenerates faster.",
  mage_spell_mastery: "Spell Mastery",
  mage_spell_mastery_desc: "Your spells are more powerful.",
  mage_books: "Hitting the Books",
  mage_books_desc: "Book good.",
  mage_mana_reserves: "Mana Reserves",
  mage_mana_reserves_desc: "Your studies have improved your mana.",
  mage_blast_them: "Blast Them!",
  mage_blast_them_desc: "Must. Hit. Harder!",
  mage_conserve_mana: "Conserve Mana",
  mage_conserve_mana_desc: "Your spell casting is more efficient.",
  mage_meteor: "Cosmic Force",
  mage_meteor_desc: "Don't look up.",
  mage_magical_studies: "Magical Studies",
  mage_magical_studies_desc: "You are more comfortable with pure magic.",
  mage_elementalist: "Elementalist",
  mage_elementalist_desc: "You like to dabble in elemental powers.",
  // PALADIN
  paladin_smite: "Smite the Wicked",
  paladin_smite_desc: "Unholy beings will be destroyed before the divine.",
  paladin_vigour: "Vigour",
  paladin_vigour_desc: "Your flesh is blessed.",
  paladin_strength: "Strength Training",
  paladin_strength_desc: "Those muscles won't build themselves.",
  paladin_blessing: "Blessing",
  paladin_blessing_desc: "Your healing abilities are blessed by your Goddess.",
  paladin_divine_dedication: "Divine Dedication",
  paladin_divine_dedication_desc: "You seek strength through divinity.",
  paladin_sword_and_shield: "Sword & Shield",
  paladin_sword_and_shield_desc: "Your divine body shall smite the sinful.",
  paladin_grace_of_gods: "Grace of the Gods",
  paladin_grace_of_gods_desc: "Your healing power is blessed by the Gods.",
  paladin_offensive_stance: "Offensive Stance",
  paladin_offensive_stance_desc: "Those heretics must perish NOW!",
  paladin_defensive_stance: "Defensive Stance",
  paladin_defensive_stance_desc: "The heretics won't die if I do.",

  // Log
  reached_level: "Reached level {0}!",
  gained_xp: "Gained {0} XP",
  gained_gold: "Gained {0} gold",
  lost_gold: "Lost {0} gold",
  recovered_health: "Recovered {0} health",
  recovered_mana: "Recovered {0} mana",
  escape_success: "Escaped successfully!",
  escape_failure: "Failed to escape!",
  riddle_damage_log: "<c>white<c>You take damage from a riddle! <c>crimson<c>-{damage} HP!",
  too_weak_to_continue: "You are too weak to continue exploring the dungeon.",
};
