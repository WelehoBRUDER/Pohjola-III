/*
  ### GUIDE TO EFFECTS & PERKS ###

  Effects can modify any stats the target/player have and use.
  Effects are split between percentages (p) and flat values (v).

  For example, modifying strength by 3 would be strV: 3
  If you want to make it a percentage; strP: 3
  List of modifiable stats:
  
  str
  agi
  vit
  int
  wis
  critChance (only flat values apply)
  critDmg (only flat values apply)
  hp
  mp
  physicalDamage
  physicalArmor
  magicalDamage
  magicalArmor
  elementalDamage
  elementalArmor
  attack (modifies all damage done by target)
  defense (modifies all damage taken by target)
  actionFill (this is the battle speed)
  armorer
  light_weapons
  heavy_weapons
  dodge
  barter
  shield
  blockChance

  Perks have levels to them, even if you make the maximum only 1.
  Perks must be formatted like this:
  my_perk: {
    id: "my_perk",
    title: "My Perk Title",
    effects: [ # This will contain your levels and effects
      {
        # This is level 1, and the one below it is level 2, and so on.
        effects: { # Two effects nested together because of syntaxing :D
          # Put whatever effects you want your perk to have here
          strV: 50
          vitP: 25
        }
      },
      {
        # New levels don't necessarily have to be upgrades, they can also modify the perk.
        strV: 75,
        vitP: 15
      }
    ]
    level: 0, # All perks MUST start at level 0
    category: "perk" # Tell the game this is a perk
  }
*/

function statusEffectText(status) {
  let text = `\n <f>12px<f><c>orange<c>${status.name}§\n`;
  text += `<f>11px<f>${statusSyntax(status, 11)}`;
  text += `<f>11px<f>\tLasts for: ${status.lastFor}s`;
  return text;
}

function statusEffectTextTiny(status) {
  let text = `\n<f>14px<f><c>orange<c>${status.name}§\n`;
  text += `<f>12px<f>${statusSyntax(status, 12)}`;
  text += `<f>12px<f>\tLasts for: ${status.lastFor}s`;
  return text;
}

const effectsList = [
 "str",
 "agi",
 "vit",
 "int",
 "wis",
 "critChance",
 "critDmg",
 "hp",
 "mp",
 "physicalDamage",
 "physicalArmor",
 "magicalDamage",
 "magicalArmor",
 "elementalDamage",
 "elementalArmor",
 "attack",
 "defense",
 "actionFill",
 "armorer",
 "light_weapons",
 "heavy_weapons",
 "dodge",
 "barter",
 "shield",
 "blockChance",
 "dodgeChance"
]