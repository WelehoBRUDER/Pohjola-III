/* I decided to create a skill tree instead of putting skills in perks */
const skills: SkillObject[] = [];

interface SkillObject {
  id: string;
  levels: any[];
  icon?: string;
  requirements?: any[];
  currentLevel?: number;
  upgrades?: SkillObject[];
  isOwned?: boolean;
  modifiers?: any;
  commands?: any;
}

class Skill {
  [work_around: string]: any;
  id: string;
  levels: any[];
  icon: string;
  currentLevel: number;
  requirements: any[];
  upgrades: SkillObject[];
  isOwned?: boolean;
  modifiers?: any;
  commands?: any;
  constructor(skill: SkillObject) {
    if (!skill.levels) {
      skill = { ...findSkillById(skill.id), ...skill };
    }
    this.id = skill.id;
    this.levels = skill.levels ? [...skill.levels] : [];
    this.currentLevel = skill.currentLevel || 0;
    this.icon = skill.icon || icons.placeholder;
    this.requirements = skill.requirements ? [...skill.requirements] : [];
    this.upgrades = skill.upgrades ? [...skill.upgrades] : [];
    this.isOwned = skill.isOwned ?? false;
    this.modifiers = skill.modifiers ? { ...skill.modifiers } : {};
    this.commands = skill.commands ? { ...skill.commands } : {};

    if (this.upgrades.length > 0) {
      this.upgrades = this.upgrades.map((upgrade: SkillObject) => new Skill(upgrade));
    }
  }

  getCurrentLevel(options?: { increment: boolean }): any {
    let mods = {};
    let lvl = this.isOwned ? this.currentLevel - 1 : getSkill(this.id)?.currentLevel;
    if (lvl === undefined) return null;
    if (lvl >= this.levels.length) lvl = this.levels.length;
    if (options?.increment) lvl++;
    for (let i = 0; i < lvl; i++) {
      mods = mergeObjects(mods, this.levels[i]);
    }
    if (lvl === 0) return this.levels[0];
    return mods;
  }

  getNextLevel(): any {
    let mods = {};
    let lvl = this.isOwned ? this.currentLevel - 1 : getSkill(this.id)?.currentLevel;
    if (!lvl) return this.levels[0];
    if (this.levels.length < 2 && lvl === 0) return this.levels[0];
    if (lvl > this.levels.length - 1) return null;
    for (let i = 0; i < lvl + 1; i++) {
      mods = mergeObjects(mods, this.levels[i]);
    }
    return mods;
  }

  available(): boolean {
    let available = true;
    if (player.skill_points <= 0) return false;
    if (this.requirements) {
      this.requirements.forEach((req: any) => {
        if (req.skill) {
          const skill = getSkill(req.skill);
          if (skill) {
            if (skill.currentLevel < req.level) return (available = false);
          } else {
            return (available = false);
          }
        } else if (req.skill_total) {
          const skillLevel = getSkillTotalLevel(req.skill_total);
          if (skillLevel < req.level) return (available = false);
        }
      });
    }
    return available;
  }

  assign(): void {
    if (!this.available()) return;
    const skill = getSkill(this.id);
    if (skill) {
      if (skill.currentLevel > this.levels.length - 1) return;
      skill.currentLevel++;
      player.skill_points--;
    } else {
      this.currentLevel++;
      player.skill_points--;
      player.skills?.push(new Skill({ ...this, isOwned: true, upgrades: [] }));
      if (this.levels[0]?.commands) {
        Object.entries(this.levels[0]?.commands).forEach(([key, value]: [string, any]) => {
          game.executeCommand(key, value);
        });
      }
    }
    createSkills();
  }

  tooltip(): string {
    let tooltip = "";
    tooltip += `<f>1.5rem<f><c>goldenrod<c>${game.getLocalizedString(this.id)}\n`;
    tooltip += "<f>1.2rem<f><c>white<c>";

    if (DEVTOOLS.ENABLED) {
      tooltip += `<c>white<c> [dev] <c>orange<c>${this.id}<c>white<c>\n`;
    }

    if (this.requirements.length > 0) {
      tooltip += "Requirements:\n";
      this.requirements.forEach((req: any) => {
        if (req.skill) {
          const skill = getSkill(req.skill);
          if (skill) {
            if (skill.currentLevel < req.level) {
              tooltip += `<c>red<c>${req.skill} lvl: ${req.level}\n`;
            } else {
              tooltip += `<c>green<c>${req.skill} lvl: ${req.level}\n`;
            }
          } else {
            tooltip += `<c>red<c>${req.skill} lvl: ${req.level}\n`;
          }
        }
        if (req.skill_total) {
          const skill = getSkillTotalLevel(req.skill_total);
          if (skill < req.level) {
            tooltip += `<c>red<c>${game.getLocalizedString(req.skill_total)} ${game
              .getLocalizedString("leveled_times")
              .replace("{times}", req.level)} \n`;
          } else {
            tooltip += `<c>green<c>${game.getLocalizedString(req.skill_total)} ${game
              .getLocalizedString("leveled_times")
              .replace("{times}", req.level)} \n`;
          }
        }
      });
    }

    const currentLevel = this.getCurrentLevel();
    const nextLevel = this.getNextLevel();

    if (currentLevel) {
      tooltip += `<c>white<c>${game.getLocalizedString("current_level")}\n`;
      if (currentLevel.commands) {
        Object.entries(currentLevel.commands).forEach(([key, value]: [string, any]) => {
          if (key === "add_ability") {
            const ability = new Ability({ ...value });
            tooltip += `<f>1.3rem<f>${game.getLocalizedString(key)}:\n`;
            tooltip += ability.tooltip({ container: true, owner: player });
            tooltip += "§<nct>-<nct><f>1.2rem<f><c>white<c>\n";
          }
        });
      }
      if (currentLevel.modifiers) {
        tooltip += "<f>1.2rem<f><c>silver<c>Effects:\n";
        Object.entries(currentLevel.modifiers).map(([key, value]) => {
          tooltip += " " + effectSyntax(key, value);
        });
      }
    }

    if (nextLevel) {
      tooltip += `<c>white<c>${game.getLocalizedString("next_level")}:\n`;
      if (nextLevel.commands) {
        Object.entries(nextLevel.commands).forEach(([key, value]: [string, any]) => {
          if (key === "add_ability") {
            const ability = new Ability({ ...value });
            tooltip += `<f>1.3rem<f>${game.getLocalizedString(key)}:\n`;
            tooltip += ability.tooltip({ container: true, owner: player });
            tooltip += "§<nct>-<nct><f>1.2rem<f><c>white<c>\n";
          }
        });
      }
      if (nextLevel.modifiers) {
        tooltip += "<f>1.2rem<f><c>silver<c>Effects:\n";
        Object.entries(nextLevel.modifiers).map(([key, value]) => {
          tooltip += " " + effectSyntax(key, value);
        });
      }
    }

    return tooltip;
  }
}

function getSkill(id: string) {
  return player.skills?.find((skill) => skill.id === id);
}

function getSkillTotalLevel(id: string) {
  let totalLevel = 0;
  player.skills?.forEach((skill) => {
    if (skill.id.startsWith(id)) {
      totalLevel += skill.currentLevel;
    }
  });
  return totalLevel;
}

// This has been made in a very stupid way :D
function createSkills() {
  player.updateAllModifiers();
  lobbyContent.innerHTML = "";
  sideBarDetails();
  const SkillTrees = document.createElement("div");
  SkillTrees.classList.add("skill-trees");
  SkillTrees.onscroll = () => {
    screens.skills.scroll = SkillTrees.scrollTop;
  };
  const _skills = skills.map((skill: SkillObject) => new Skill(skill));
  _skills.forEach((skill: Skill) => {
    const skillWrapper = document.createElement("div");
    const connectorTop = document.createElement("div");
    const connectorBottom = document.createElement("div");
    connectorTop.classList.add("connector-top");
    connectorBottom.classList.add("connector-bottom");
    skillWrapper.classList.add("skill-wrapper");
    skillWrapper.append(connectorTop, connectorBottom);
    const playerSkill = player.skills?.find((sk) => sk.id === skill.id);
    if (playerSkill) {
      skill.currentLevel = playerSkill.currentLevel;
    }
    const skillElement = createSkillElement(skill);
    if (skill.currentLevel >= skill.levels.length) {
      skillElement.classList.add("maxed");
    }
    tooltip(skillElement, skill.tooltip());
    if (!skill.available()) {
      skillElement.classList.add("unavailable");
    }
    skillElement.onclick = () => {
      skill.assign();
    };
    skillWrapper.append(skillElement);
    if (skill.upgrades) {
      const upgrades = skill.upgrades.map((skill: SkillObject) => new Skill(skill));
      const upgradesWrapper = document.createElement("div");
      upgradesWrapper.classList.add("upgrades");
      upgrades.forEach((upgrade: Skill) => {
        const playerUpgrade = player.skills?.find((sk) => sk.id === upgrade.id);
        if (playerUpgrade) {
          upgrade.currentLevel = playerUpgrade.currentLevel;
        }
        const upgradeElement = createSkillElement(upgrade);
        if (!upgrade.available()) {
          upgradeElement.classList.add("unavailable");
        }
        upgradeElement.classList.add("upgrade");
        upgradeElement.onclick = () => {
          upgrade.assign();
        };
        if (upgrade.currentLevel >= upgrade.levels.length) {
          upgradeElement.classList.add("maxed");
        }
        tooltip(upgradeElement, upgrade.tooltip());
        upgradesWrapper.append(upgradeElement);
      });
      skillWrapper.append(upgradesWrapper);
    }
    SkillTrees.append(skillWrapper);
  });
  lobbyContent.append(SkillTrees);
  addDragToScroll(SkillTrees);
  SkillTrees.scrollTo(0, screens.skills.scroll);
}

function createSkillElement(skill: Skill) {
  const skillElement = document.createElement("div");
  const skillImage = document.createElement("img");
  const skillLevel = document.createElement("p");
  skillElement.classList.add("skill");
  skillImage.src = skill.icon;
  skillLevel.innerText = `${skill.currentLevel}/${skill.levels.length}`;
  skillElement.append(skillImage, skillLevel);
  return skillElement;
}

function findSkillById(id: string) {
  let skill: SkillObject = skills.find((s) => s.id === id)!;
  if (!skill) {
    skills.map((s) => {
      if (s.upgrades) {
        const upgrade = s.upgrades.find((u) => u.id === id);
        if (upgrade) {
          skill = upgrade;
          return false;
        }
      }
    });
  }
  return skill;
}
