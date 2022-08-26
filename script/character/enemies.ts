const enemies = {
  skeleton: {
    id: "skeleton",
    name: "Skeleton",
    stats: {
      str: 5,
      vit: 5,
      agi: 0,
      int: 0,
      spi: 0,
      atk: 5,
      hp: 0,
      mp: 0,
      hpMax: 5,
      mpMax: 5,
      ap: 0,
    },
    defences: {
      physical: 0,
      magical: 0,
      elemental: 0,
    },
    resistances: {
      fire: 0,
      ice: 0,
      thunder: 0,
      curse: 100,
      poison: 200,
      divine: -50,
    },
    critRate: 3,
    critPower: 50,
    sprite: "skeleton_type/skeleton_warrior.png",
    abilities: [new Ability(abilities.physical_attack)],
  } as EnemyBase,
  skeleton_brute: {
    id: "skeleton_brute",
    name: "Skeleton Brute",
    stats: {
      str: 10,
      vit: 10,
      agi: -5,
      int: 0,
      spi: 0,
      atk: 10,
      hp: 0,
      mp: 0,
      hpMax: 5,
      mpMax: 5,
      ap: 0,
    },
    defences: {
      physical: 15,
      magical: 10,
      elemental: 15,
    },
    resistances: {
      fire: 0,
      ice: 0,
      thunder: 0,
      curse: 100,
      poison: 200,
      divine: -50,
    },
    critRate: 3,
    critPower: 50,
    sprite: "skeleton_type/skeleton_brute.png",
    abilities: [
      new Ability(abilities.sharp_strike),
      new Ability(abilities.physical_attack),
    ],
  } as EnemyBase,
};
