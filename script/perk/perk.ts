interface Position {
  x: number;
  y: number;
}

interface PerkObject {
  id: string;
  desc: string;
  pos: Position;
  icon: string;
  cost: number;
  level: number;
  levels: PerkLevel[];
  relative_to?: string;
  requires?: string[];
  class?: string;
  modifiers?: any;
  commands?: any;
}

interface PerkLevel {
  modifiers?: any;
  commands?: any;
}

class Perk {
  [work_around: string]: any;
  id: string;
  desc: string;
  pos: Position;
  icon: string;
  cost: number;
  level: number;
  levels: PerkLevel[];
  relative_to?: string;
  requires?: string[];
  class?: string;
  modifiers?: any;
  commands?: any;
  constructor(perk: PerkObject) {
    this.id = perk.id;
    this.desc = perk.desc;
    this.pos = perk.pos;
    this.icon = perk.icon;
    this.cost = perk.cost;
    this.level = perk.level || 0;
    this.levels = perk.levels || [];
    this.relative_to = perk.relative_to;
    this.requires = perk.requires;
    this.class = perk.class;
    this.modifiers = perk.modifiers;
    this.commands = perk.commands;
  }

  maxLevel(): number {
    return this.levels.length;
  }

  available(): boolean {
    if (DEVTOOLS.IGNORE_REQUIREMENTS) return true;
    if (player.perk_points < this.cost) return false;
    if (player.hasPerk(this.id, this.maxLevel())) return false;
    if (!this.requires) return true;
    let required = this.requires.length;
    this.requires.forEach((perk) => {
      // @ts-ignore
      if (player.perks.findIndex((p: any) => p.id === perk) > -1) {
        required--;
      }
    });
    return required === 0;
  }

  owned(): boolean {
    // @ts-ignore
    return player.hasPerk(this.id);
  }

  assign(): void {
    if (!this.available()) return;
    hideHover();
    if (player.perk_points >= this.cost) {
      player.perk_points -= this.cost;
      if (!player.hasPerk(this.id)) {
        this.level = 1;
        player.perks?.push({ ...this });
      } else {
        const prk = player.getPerk(this.id);
        if (prk) {
          prk.level += 1;
        }
      }
      let level = player.getPerk(this.id)?.level || 1;
      if (this.levels[level - 1]?.commands) {
        Object.entries(this.levels[level - 1].commands).forEach(([key, value]: [string, any]) => {
          game.executeCommand(key, value);
        });
      }
      player.restore();
      createPerks();
    }
  }

  tooltip(): string {
    let tooltip: string = `<f>1.5rem<f><c>gold<c>${game.getLocalizedString(this.id)}\n`;
    tooltip += "<f>1.2rem<f>";

    if (DEVTOOLS.ENABLED) {
      tooltip += `<c>white<c> [dev] <c>orange<c>${this.id}<c>white<c>\n`;
    }

    // Perk description
    tooltip += `<c>silver<c>${game.getLocalizedString(this.desc)}<c>white<c>\n`;

    if (this.requires) {
      const length: number = this.requires.length;
      tooltip += `<f>1.2rem<f>${game.getLocalizedString("requires")}: `;
      this.requires.forEach((perk_id: string, index: number) => {
        const perk = new Perk(perks.find((p: PerkObject) => p.id === perk_id) as PerkObject);
        tooltip += `<c>${perk.owned() ? "lime" : "red"}<c>${game.getLocalizedString(perk_id)}`;
        if (index < length - 1) {
          tooltip += ", ";
        }
      });
      tooltip += "<c>white<c>\n";
    }

    if (this.commands) {
      Object.entries(this.commands).forEach(([key, value]: [string, any]) => {
        if (key === "add_ability") {
          const ability = new Ability({ ...value });
          tooltip += `<f>1.3rem<f>${game.getLocalizedString(key)}:\n`;
          tooltip += ability.tooltip({ container: true, owner: player });
          tooltip += "§<nct>-<nct><f>1.2rem<f><c>white<c>\n";
        }
      });
    }

    if (this.levels) {
      const level = player.getPerk(this.id)?.level || 0;
      const maxLevel = this.maxLevel();
      tooltip += `<f>1.2rem<f><c>silver<c>${game.getLocalizedString("level")}: ${level}/${maxLevel}\n`;
      if (level > 0) {
        tooltip += "\n<f>1.2rem<f><c>silver<c>Current Effects:\n";
        let total: any = {};
        this.levels.forEach((lvl: PerkLevel, index: number) => {
          if (index >= level) return;
          Object.entries(lvl.modifiers).map(([key, value]) => {
            total[key] = total?.[key] + value || value;
          });
        });
        Object.entries(total).map(([key, value]) => {
          tooltip += " " + effectSyntax(key, value);
        });
      }
      if (level < maxLevel) {
        tooltip += "\n<f>1.2rem<f><c>silver<c>Next Level Effects:\n";
        let total: any = {};
        this.levels.forEach((lvl: PerkLevel, index: number) => {
          if (index > level) return;
          Object.entries(lvl.modifiers).map(([key, value]) => {
            total[key] = total?.[key] + value || value;
          });
        });
        Object.entries(total).map(([key, value]) => {
          tooltip += " " + effectSyntax(key, value);
        });
      }
      // tooltip += "\n<f>1.2rem<f><c>silver<c>Effects:\n";
      // Object.entries(this.modifiers).map(([key, value]) => {
      //   tooltip += " " + effectSyntax(key, value);
      // });
    }

    if (this.cost > 0) {
      const col = player.perk_points >= this.cost ? "lime" : "red";
      tooltip += `\n<f>1.2rem<f><c>silver<c>${game.getLocalizedString("cost")}: <c>${col}<c>${
        this.cost
      } <c>silver<c>${game.getLocalizedString("perk_points")}`;
    }

    return tooltip;
  }
}

const perkZoomValues: number[] = [0.33, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2];
let perkZoom: number = 7;

function zoomPerks(e: WheelEvent, container: HTMLDivElement) {
  const delta = Math.sign(e.deltaY);
  if (delta === 1) {
    if (perkZoom > 0) {
      perkZoom--;
    }
  } else if (delta === -1) {
    if (perkZoom < perkZoomValues.length - 1) {
      perkZoom++;
    }
  }
  container.style.transform = `scale(${perkZoomValues[perkZoom]})`;
}

function createPerks() {
  lobbyContent.innerHTML = "";
  const perkContainer = document.createElement("div");
  perkContainer.classList.add("perk-container");
  const baseSize: number = 64;
  const lineSize: number = 32;
  const lineWidth: number = 6;
  lobbyContent.onwheel = (e: WheelEvent) => {
    e.preventDefault();
    zoomPerks(e, perkContainer);
  };
  lobbyContent.append(perkContainer);
  perkContainer.style.transform = `scale(${perkZoomValues[perkZoom]})`;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  sideBarDetails();
  const FullPerks: Perk[] = perks.map((p: any) => new Perk(p));
  // Create perk elements and place them on the screen
  FullPerks.forEach((perk: Perk | any) => {
    const perkDiv = document.createElement("div"); // this is a wrapper..
    const properPerkDiv = document.createElement("div");
    const perkLevelDiv = document.createElement("div");
    const img = document.createElement("img");
    img.src = perk.icon;
    perkDiv.setAttribute("perk-id", perk.id);
    properPerkDiv.classList.add("perk-bg");
    perkLevelDiv.classList.add("perk-level-wheel");
    // Set level wheel
    const currentLevel = player.getPerk(perk.id)?.level || 0;
    const maxLevel = perk.maxLevel();
    perkLevelDiv.style.setProperty("--value", `${(1 - currentLevel / maxLevel) * 100}%`);
    perkDiv.style.width = `${baseSize}px`;
    perkDiv.style.height = `${baseSize}px`;
    perkDiv.classList.add("perk");
    perkDiv.classList.add(perk.class || "adventure");
    if (perk.owned()) perkDiv.classList.add("owned");
    else if (!perk.available()) perkDiv.classList.add("unavailable");
    perkDiv.onclick = () => perk.assign();
    tooltip(perkDiv, perk.tooltip());
    if (perk.relative_to) {
      const found: HTMLDivElement = perkContainer.querySelector(`.perk[perk-id="${perk.relative_to}"]`)!;
      perkDiv.style.left = `${Math.round(perk.pos.x * baseSize + found.offsetLeft)}px`;
      perkDiv.style.top = `${Math.round(perk.pos.y * baseSize + found.offsetTop)}px`;
    } else {
      perkDiv.style.left = `${Math.round(perk.pos.x * baseSize)}px`;
      perkDiv.style.top = `${Math.round(perk.pos.y * baseSize)}px`;
    }
    if (perk.requires) {
      perkDiv.addEventListener("mouseover", () => {
        perk.requires.forEach((req: string) => {
          let found: HTMLDivElement = perkContainer.querySelector(`.perk[perk-id="${req}"]`)!;
          found.classList.add("highlighted");
        });
      });
      perkDiv.addEventListener("mouseleave", () => {
        perk.requires.forEach((req: string) => {
          let found: HTMLDivElement = perkContainer.querySelector(`.perk[perk-id="${req}"]`)!;
          found.classList.remove("highlighted");
        });
      });
    }
    properPerkDiv.append(perkLevelDiv, img);
    perkDiv.append(properPerkDiv);
    perkContainer.append(perkDiv);
  });

  // Draw lines between perks
  FullPerks.forEach((_perk: Perk) => {
    let perk: HTMLDivElement = perkContainer.querySelector(`.perk[perk-id="${_perk.id}"]`)!;
    if (_perk.requires) {
      _perk.requires.forEach((req: string) => {
        let found: HTMLDivElement = perkContainer.querySelector(`.perk[perk-id="${req}"]`)!;
        let color = "rgb(65, 65, 65)";
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        if (_perk.owned()) color = "gold";
        else if (!_perk.available()) color = "rgb(40, 40, 40)";
        line.setAttribute("x1", `${+perk.style.left.replace(/\D/g, "") + lineSize}px`);
        line.setAttribute("y1", `${+perk.style.top.replace(/\D/g, "") + lineSize}px`);
        line.setAttribute("x2", `${+found.style.left.replace(/\D/g, "") + lineSize}px`);
        line.setAttribute("y2", `${+found.style.top.replace(/\D/g, "") + lineSize}px`);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", `${lineWidth}px`);
        svg.appendChild(line);
      });
    }
  });
  svg.setAttribute("width", "4000");
  svg.setAttribute("height", "4000");

  perkContainer.append(svg);
  if (drag_details.bgPosX === 0 && drag_details.bgPosY === 0) {
    // Center the background on "foundations_of_power", the first perk
    const found: HTMLDivElement = perkContainer.querySelector(`.perk[perk-id="0_foundation_of_power"]`)!;
    drag_details.bgPosX = found.offsetLeft - window.innerWidth / 2 + found.offsetWidth * 3;
    drag_details.bgPosY = found.offsetTop - window.innerHeight / 2 + found.offsetHeight;
  }
  lobbyContent.scrollTo(drag_details.bgPosX, drag_details.bgPosY);
}

const drag_details = {
  lastX: 0,
  lastY: 0,
  dragging: false,
  bgPosX: 0,
  bgPosY: 0,
};

/* Scroll by dragging */
function dragPerks(e: MouseEvent) {
  const offsetX = e.clientX - drag_details.lastX;
  const offsetY = e.clientY - drag_details.lastY;
  if (drag_details.dragging) {
    lobbyContent.scrollTo(drag_details.bgPosX - offsetX, drag_details.bgPosY - offsetY);
  }
}
try {
  if (lobbyContent) {
    lobbyContent.onmousedown = (e: MouseEvent) => {
      drag_details.dragging = true;
      drag_details.lastX = e.clientX;
      drag_details.lastY = e.clientY;
      drag_details.bgPosX = lobbyContent.scrollLeft;
      drag_details.bgPosY = lobbyContent.scrollTop;
      lobbyContent.onmouseup = () => {
        drag_details.dragging = false;
        lobbyContent.onmouseup = null;
        lobbyContent.onmousemove = null;
      };
      lobbyContent.onmousemove = (e) => dragPerks(e);
    };
  }
} catch {
  console.log("Could not find lobbyContent, this must be the editor.");
}
