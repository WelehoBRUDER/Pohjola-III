skills.push({
  id: "haste_enchant",
  icon: "gfx/icons/running-ninja.png",
  hiddenUntilOwned: true,
  levels: [
    {
      modifiers: {
        ability_haste_enchant: {
          cooldownP: -4,
          effect_haste_1: {
            modifiers: {
              dodgePV: 2,
            },
          },
        },
      },
    },
  ],
  requirements: [],
  upgrades: [
    {
      id: "haste_enchant_upgrade_1",
      requirements: [{ skill: "haste_enchant", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_haste_enchant: {
              effect_haste_1: {
                modifiers: {
                  speedPV: 3,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_haste_enchant: {
              effect_haste_1: {
                modifiers: {
                  speedPV: 3,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_haste_enchant: {
              effect_haste_1: {
                modifiers: {
                  speedPV: 4,
                },
              },
            },
          },
        },
      ],
    },
    {
      id: "haste_enchant_upgrade_2",
      requirements: [{ skill: "haste_enchant", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_haste_enchant: {
              effect_haste_1: {
                durationP: 5,
              },
            },
          },
        },
        {
          modifiers: {
            ability_haste_enchant: {
              effect_haste_1: {
                durationP: 5,
              },
            },
          },
        },
        {
          modifiers: {
            ability_haste_enchant: {
              effect_haste_1: {
                durationP: 5,
              },
            },
          },
        },
      ],
    },
    {
      id: "haste_enchant_upgrade_3",
      requirements: [{ skill: "haste_enchant", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_haste_enchant: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_haste_enchant: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_haste_enchant: {
              cooldownP: -5,
            },
          },
        },
      ],
    },
  ],
});
