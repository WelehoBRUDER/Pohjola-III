skills.push({
  id: "sharp_strike",
  icon: "gfx/abilities/pointy-sword.png",
  levels: [
    {
      commands: {
        add_ability: { ...abilities.sharp_strike },
      },
    },
  ],
  requirements: [
    { skill: "fierce_attack", level: 1 },
    { skill: "fierce_attack_upgrade_1", level: 1 },
    { skill: "fierce_attack_upgrade_2", level: 1 },
    { skill: "fierce_attack_upgrade_3", level: 1 },
  ],
  upgrades: [
    {
      id: "sharp_strike_upgrade_1",
      requirements: [{ skill: "sharp_strike", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_sharp_strike: {
              powerV: 0.05,
              effect_wounded: {
                inflict: {
                  damagePercentV: 0.01,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_sharp_strike: {
              powerV: 0.05,
              effect_wounded: {
                inflict: {
                  damagePercentV: 0.01,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_sharp_strike: {
              powerV: 0.05,
              effect_wounded: {
                inflict: {
                  damagePercentV: 0.01,
                },
              },
            },
          },
        },
      ],
    },
    {
      id: "sharp_strike_upgrade_2",
      requirements: [{ skill: "sharp_strike", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_sharp_strike: {
              effect_wounded: {
                durationV: 0.5,
                modifiers: {
                  atkPV: -2,
                  strPV: -2,
                  agiPV: -2,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_sharp_strike: {
              effect_wounded: {
                durationV: 0.5,
                modifiers: {
                  atkPV: -2,
                  strPV: -2,
                  agiPV: -2,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_sharp_strike: {
              effect_wounded: {
                durationV: 0.5,
                modifiers: {
                  atkPV: -2,
                  strPV: -2,
                  agiPV: -2,
                },
              },
            },
          },
        },
      ],
    },
    {
      id: "sharp_strike_upgrade_3",
      requirements: [{ skill: "sharp_strike", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_sharp_strike: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_sharp_strike: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_sharp_strike: {
              cooldownP: -5,
            },
          },
        },
      ],
    },
  ],
});
