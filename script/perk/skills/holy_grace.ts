skills.push({
  id: "holy_grace",
  icon: "gfx/status/holy-grace.png",
  hiddenUntilOwned: true,
  levels: [
    {
      commands: {
        add_ability: { ...abilities.holy_grace },
      },
    },
  ],
  upgrades: [
    {
      id: "holy_grace_upgrade_1",
      requirements: [{ skill: "holy_grace", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_holy_grace: {
              effect_holy_grace: {
                inflict: {
                  healingPercentV: 0.02,
                },
              },
              mpCostV: 5,
            },
          },
        },
        {
          modifiers: {
            ability_holy_grace: {
              effect_holy_grace: {
                inflict: {
                  healingPercentV: 0.02,
                },
              },
              mpCostV: 5,
            },
          },
        },
        {
          modifiers: {
            ability_holy_grace: {
              effect_holy_grace: {
                inflict: {
                  healingPercentV: 0.02,
                },
              },
              mpCostV: 10,
            },
          },
        },
      ],
    },
    {
      id: "holy_grace_upgrade_2",
      requirements: [{ skill: "holy_grace", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_holy_grace: {
              effect_holy_grace: {
                durationP: 10,
              },
            },
          },
        },
        {
          modifiers: {
            ability_holy_grace: {
              effect_holy_grace: {
                durationP: 10,
              },
            },
          },
        },
        {
          modifiers: {
            ability_holy_grace: {
              effect_holy_grace: {
                durationP: 20,
              },
            },
          },
        },
      ],
    },
    {
      id: "holy_grace_upgrade_3",
      requirements: [{ skill: "holy_grace", level: 1 }],
      levels: [
        {
          modifiers: {
            cooldownP: -10,
          },
        },
        {
          modifiers: {
            cooldownP: -10,
          },
        },
        {
          modifiers: {
            cooldownP: -10,
          },
        },
      ],
    },
  ],
});
