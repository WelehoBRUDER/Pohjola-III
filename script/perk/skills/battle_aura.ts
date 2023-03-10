skills.push({
  id: "battle_aura",
  icon: "gfx/abilities/battle-gear.png",
  levels: [
    {
      commands: {
        add_ability: { ...abilities.battle_aura },
      },
    },
  ],
  requirements: [],
  upgrades: [
    {
      id: "battle_aura_upgrade_1",
      requirements: [{ skill: "battle_aura", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_battle_aura: {
              effect_attack_1: {
                modifiers: {
                  damagePV: 3,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_battle_aura: {
              effect_attack_1: {
                modifiers: {
                  damagePV: 3,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_battle_aura: {
              effect_attack_1: {
                modifiers: {
                  damagePV: 4,
                },
              },
            },
          },
        },
      ],
    },
    {
      id: "battle_aura_upgrade_2",
      requirements: [{ skill: "battle_aura", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_battle_aura: {
              effect_attack_1: {
                durationP: 5,
              },
            },
          },
        },
        {
          modifiers: {
            ability_battle_aura: {
              effect_attack_1: {
                durationP: 5,
              },
            },
          },
        },
        {
          modifiers: {
            ability_battle_aura: {
              effect_attack_1: {
                durationP: 5,
              },
            },
          },
        },
      ],
    },
    {
      id: "battle_aura_upgrade_3",
      requirements: [{ skill: "battle_aura", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_battle_aura: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_battle_aura: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_battle_aura: {
              cooldownP: -5,
            },
          },
        },
      ],
    },
  ],
});
