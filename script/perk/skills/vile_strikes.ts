skills.push({
  id: "vile_strikes",
  icon: "gfx/abilities/vile_strikes.png",
  levels: [
    {
      commands: {
        add_ability: { ...abilities.vile_strikes },
      },
    },
  ],
  requirements: [],
  upgrades: [
    {
      id: "vile_strikes_upgrade_1",
      requirements: [{ skill: "vile_strikes", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_vile_strikes: {
              effect_vile_strikes_effect: {
                modifiers: {
                  critRateVV: 10,
                  accVV: 10,
                },
              },
              mpCostV: 5,
            },
          },
        },
        {
          modifiers: {
            ability_vile_strikes: {
              effect_vile_strikes_effect: {
                modifiers: {
                  critRateVV: 10,
                  accVV: 10,
                },
              },
              mpCostV: 5,
            },
          },
        },
        {
          modifiers: {
            ability_vile_strikes: {
              effect_vile_strikes_effect: {
                modifiers: {
                  critRateVV: 10,
                  accVV: 10,
                },
              },
              mpCostV: 5,
            },
          },
        },
      ],
    },
    {
      id: "vile_strikes_upgrade_2",
      requirements: [{ skill: "vile_strikes", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_vile_strikes: {
              effect_vile_strikes_effect: {
                durationP: 10,
                modifiers: {
                  critRateVV: 5,
                  accVV: 5,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_vile_strikes: {
              effect_vile_strikes_effect: {
                durationP: 12,
                modifiers: {
                  critRateVV: 5,
                  accVV: 5,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_vile_strikes: {
              effect_vile_strikes_effect: {
                durationP: 12,
                modifiers: {
                  critRateVV: 5,
                  accVV: 5,
                },
              },
            },
          },
        },
      ],
    },
    {
      id: "vile_strikes_upgrade_3",
      requirements: [{ skill: "vile_strikes", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_vile_strikes: {
              cooldownP: -5,
              effect_vile_strikes_effect: {
                modifiers: {
                  critRateVV: 5,
                  accVV: 5,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_vile_strikes: {
              cooldownP: -5,
              effect_vile_strikes_effect: {
                modifiers: {
                  critRateVV: 5,
                  accVV: 5,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_vile_strikes: {
              cooldownP: -5,
              effect_vile_strikes_effect: {
                modifiers: {
                  critRateVV: 5,
                  accVV: 5,
                },
              },
            },
          },
        },
      ],
    },
  ],
});
