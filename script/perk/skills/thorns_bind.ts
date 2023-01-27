skills.push({
  id: "thorns_bind",
  icon: "gfx/abilities/light-thorny-triskelion.png",
  levels: [
    {
      commands: {
        add_ability: { ...abilities.thorns_bind },
      },
    },
  ],
  upgrades: [
    {
      id: "thorns_bind_upgrade_1",
      requirements: [{ skill: "thorns_bind", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_thorns_bind: {
              damageV: 4,
            },
          },
        },
        {
          modifiers: {
            ability_thorns_bind: {
              damageV: 4,
              mpCostV: 2,
            },
          },
        },
        {
          modifiers: {
            ability_thorns_bind: {
              damageV: 6,
              mpCostV: 3,
            },
          },
        },
      ],
    },
    {
      id: "thorns_bind_upgrade_2",
      requirements: [{ skill: "thorns_bind", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_thorns_bind: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_thorns_bind: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_thorns_bind: {
              cooldownP: -5,
            },
          },
        },
      ],
    },
  ],
});
