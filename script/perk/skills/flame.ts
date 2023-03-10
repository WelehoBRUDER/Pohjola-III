skills.push({
  id: "flame",
  icon: "gfx/abilities/fire-spell-cast.png",
  levels: [
    {
      commands: {
        add_ability: { ...abilities.flame },
      },
    },
  ],
  upgrades: [
    {
      id: "flame_upgrade_1",
      requirements: [{ skill: "flame", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_flame: {
              damageV: 3,
              effect_burning: {
                inflict: {
                  damageFlatP: 25,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_flame: {
              damageV: 3,
              effect_burning: {
                inflict: {
                  damageFlatP: 25,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_flame: {
              damageV: 3,
              effect_burning: {
                inflict: {
                  damageFlatP: 25,
                },
              },
            },
          },
        },
        {
          modifiers: {
            ability_flame: {
              damageV: 3,
              effect_burning: {
                inflict: {
                  damageFlatP: 25,
                },
              },
            },
          },
        },
      ],
    },
    {
      id: "flame_upgrade_2",
      requirements: [{ skill: "flame", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_flame: {
              damageV: 2,
              effect_burning: {
                inflict: {
                  damageFlatV: 2,
                },
                modifiers: {
                  atkPV: -5,
                  agiPV: -5,
                },
              },
            },
          },
        },
      ],
    },
    {
      id: "flame_upgrade_3",
      requirements: [{ skill: "flame", level: 1 }],
      levels: [
        {
          modifiers: {
            ability_flame: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_flame: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_flame: {
              cooldownP: -5,
            },
          },
        },
        {
          modifiers: {
            ability_flame: {
              cooldownP: -5,
            },
          },
        },
      ],
    },
  ],
});
