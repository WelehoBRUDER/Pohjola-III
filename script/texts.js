const texts = {
  health_text: `<c>red<c> <f>30px<f> Your healthbar§
  Your health represents the amount of hits
  your character can take before keeling over.
  When your health reaches 0 points,
  you are § <c>crimson<c> defeated. §
  - Your maximum health is §<c>red<c><v>player.stats.FhpMax()<v>hp §
  - Your current health is §<c>red<c><v>player.stats.hp<v>hp §
  - Your remaining health is §<c>red<c><v>((player.stats.hp/player.stats.FhpMax())*100).toFixed(1)<v>%`,

  mana_text: `<c>#4287f5<c> <f>30px<f> Your manabar§
  Your mana represents how many abilities
  that use it your character can cast before running out.
  You can replenish mana with potions.
  - Your maximum mana is §<c>#4287f5<c><v>player.stats.FmpMax()<v>mp §
  - Your current mana is §<c>#4287f5<c><v>player.stats.mp<v>mp §
  - Your remaining mana is §<c>#4287f5<c><v>((player.stats.mp/player.stats.FmpMax())*100).toFixed(1)<v>%`,

  action_text: `<c>#59e04a<c> <f>30px<f> Your actionbar§
  Your action points represent your speed
  during combat. When the bar is filled,
  your turn will begin, pausing combat.
  - Your current fillrate is § <c>#59e04a<c><v>(player.actionFill()*60).toFixed(1)<v>%§/s`,

  regular_attack_text: `<c>yellow<c><f>24px<f>Attack§
  No special effects or modifiers.
  Just boring damage from
  your stats and weapon.`
}