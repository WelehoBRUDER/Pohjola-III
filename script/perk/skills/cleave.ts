skills.push({
  id: "cleave",
  icon: "gfx/abilities/axe-swing.png",
  levels: [
    {
      commands: {
        add_ability: { ...abilities.cleave },
      },
    },
  ],
  requirements: [],
  upgrades: [
    {
      id: "cleave_upgrade_1",
      requirements: [{ skill: "cleave", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_cleave: {
              powerV: 0.15,
            },
          },
        },
        {
          modifiers: {
            ability_cleave: {
              powerV: 0.15,
            },
          },
        },
      ],
    },
    {
      id: "cleave_upgrade_2",
      requirements: [{ skill: "cleave", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_cleave: {
              penetrationV: 0.04,
            },
          },
        },
        {
          modifiers: {
            ability_cleave: {
              penetrationV: 0.04,
            },
          },
        },
        {
          modifiers: {
            ability_cleave: {
              penetrationV: 0.04,
            },
          },
        },
        {
          modifiers: {
            ability_cleave: {
              penetrationV: 0.04,
            },
          },
        },
      ],
    },
    {
      id: "cleave_upgrade_3",
      requirements: [{ skill: "cleave", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_cleave: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_cleave: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_cleave: {
              cooldownP: -5,
            },
          },
        },
      ],
    },
  ],
});
