let player = new PlayerClass({
  id: "player_character",
  name: "Avanti!",
  stats: {
    str: 5,
    vit: 5,
    agi: 5,
    int: 5,
    wis: 5,
    ap: 0,
    hp: 40,
    mp: 30
  },
  skills: {
    armorer: 0,
    heavy_weapons: 0,
    light_weapons: 0,
    shield: 0,
    dodge: 0,
    dexterity: 0
  },
  inventory: [],
  equipment: {
    weapon: {},
    shield: {},
    head: {},
    body: {},
    legs: {},
    ring: {}
  },
  level: {
    lvl: 1,
    pointsPerLvl: 3,
    xp: 0,
    xpNeed: 50
  }
})

function PlayerClass(base) {
  this.id = base.id ?? "player_character";
  this.name = base.name ?? "Unknown Adventurer";
  this.stats = new Stats(base.stats);
  this.skills = new Skills(base.skills);
  this.inventory = base.inventory ?? [];
  this.equipment = new Equipments(base.equipment);
  this.level = base.level;

  function Stats(stat) {
    this.str = stat.str;
    this.vit = stat.vit;
    this.agi = stat.agi;
    this.int = stat.int;
    this.wis = stat.wis;
    this.hp = stat.hp;
    this.mp = stat.mp;
    this.ap = stat.ap;
  }

  function Skills(skill) {
    this.armorer = skill.armorer;
    this.heavy_weapons = skill.heavy_weapons;
    this.light_weapons = skill.light_weapons;
    this.shield = skill.shield;
    this.dodge = skill.dodge;
    this.dexterity = skill.dexterity;
  }

  function Equipments(equipment) {
    this.weapon = equipment.weapon ?? {};
    this.shield = equipment.shield ?? {};
    this.head = equipment.head ?? {};
    this.body = equipment.body ?? {};
    this.legs = equipment.legs ?? {};
    this.ring = equipment.ring ?? {};
  }

  this.actionFill = () => {
    return 0.3 + this.stats.agi/100;
  }

  this.stats.FhpMax = () => {
    //const {v: bonusValue, p: bonusPercentage} = calcValues("hp", this);
    return Math.floor(15 + 5 * this.stats.vit);
  };
  this.stats.FmpMax = () => {
    //const {v: bonusValue, p: bonusPercentage} = calcValues("hp", this);
    return Math.floor(5 + 5 * this.stats.int);
  };
}