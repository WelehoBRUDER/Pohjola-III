skills.push({
  id: "healing_light",
  icon: "gfx/status/healing.png",
  levels: [
    {
      commands: {
        add_ability: { ...abilities.healing_light },
      },
    },
  ],
});
