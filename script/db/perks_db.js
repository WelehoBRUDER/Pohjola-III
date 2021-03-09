const perkTrees = {
  "warrior_tree": {
    color: {
      c: "#cf481b",
      s: "#9c2f0b"
    },
    "warrior_perk_start": {
      id: "warrior_perk_start",
      title: "Battle Experience",
      cost: 1,
      level: 0,
      maxLevel: 3,
      effect: "battle_exp",
      x: 0.5,
      y: 7,
      img: "gfx/icons/swords-power.png"
    },
    "warrior_perk_offense": {
      id: "warrior_perk_offense",
      title: "Art of Attack",
      cost: 1,
      level: 0,
      maxLevel: 2,
      effect: "atk_perk",
      x: 4,
      y: -3,
      parent: "warrior_perk_start",
      img: "gfx/abilities/pointy-sword.png"
    },
    "warrior_perk_speed": {
      id: "warrior_perk_speed",
      title: "Beast of Battle",
      cost: 1,
      level: 5,
      maxLevel: 2,
      effect: "speed_perk",
      x: -4,
      y: -4,
      parent: "warrior_perk_offense",
      img: "gfx/abilities/shield-bash.png"
    },
    "warrior_perk_adrenaline": {
      id: "warrior_perk_adrenaline",
      title: "Adrenaline in Battle",
      cost: 1,
      level: 0,
      maxLevel: 1,
      effect: "adrenaline_perk",
      on_purchase: {
        grant_ability: "adrenaline_strength",
      },
      x: 4,
      y: 2,
      parent: "warrior_perk_offense",
      img: "gfx/icons/totem-head.png"
    },
    "warrior_perk_defense": {
      id: "warrior_perk_defense",
      title: "Defensive Maneuvers",
      cost: 1,
      level: 0,
      maxLevel: 2,
      effect: "def_perk",
      x: 4,
      y: 3,
      parent: "warrior_perk_start",
      img: "gfx/icons/shield-reflect.png"
    },
  },
  "mage_tree": {
    color: {
      c: "#1d43de",
      s: "#12298a"
    },
    "mage_perk_start": {
      id: "mage_perk_start",
      title: "Path of Learning",
      cost: 1,
      level: 0,
      maxLevel: 3,
      effect: "path_learning",
      x: 0.5,
      y: 6,
      img: "gfx/icons/bookmarklet.png"
    },
    "mage_offense_perk": {
      id: "mage_offense_perk",
      title: "Path of Power",
      cost: 1,
      level: 0,
      maxLevel: 2,
      effect: "power_perk",
      x: 4,
      y: -3,
      parent: "mage_perk_start",
      img: "gfx/icons/magic-swirl.png"
    },
    "mage_reserve_perk": {
      id: "mage_reserve_perk",
      title: "Path of Knowledge",
      cost: 1,
      level: 0,
      maxLevel: 2,
      effect: "reserve_perk",
      x: 4,
      y: 3,
      parent: "mage_perk_start",
      img: "gfx/icons/book-aura.png"
    },
  }
}