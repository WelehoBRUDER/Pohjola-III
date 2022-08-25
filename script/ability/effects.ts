const effects: any = {
  wounded: {
    id: "wounded",
    icon: "gfx/status/blood.png",
    duration: 6,
    type: "bleed",
    effects: {
      agiV: 2,
      atkP: -10,
      strP: -10,
      agiP: -10,
      ability_sharp_strike: {
        // This is a nested object to demonstrate how abilities can be modified using effects
        powerV: 0.25,
        penetrationV: 0.05,
        cooldownP: -10,
        effect_wounded: {
          durationP: 10,
        },
      },
    },
  } as EffectObject,
};
