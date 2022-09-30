class SaveController {
  [id: string]: any;
  saveSlots: SaveFile[];
  constructor() {
    this.saveSlots = this.getSaves();
  }

  getSaves() {
    const saves = localStorage.getItem("PohjolaIII_saved_games");
    if (!saves) return [];
    return JSON.parse(saves);
  }

  saveGame(name: string, id?: string) {
    // @ts-ignore
    const saveFile = new SaveFile({ id, name });
    console.log(JSON.stringify(saveFile).length);
    if (JSON.stringify(saveFile).length > 100000) {
      alert("Save file is too large. Please remove some items from your inventory.");
      return;
    }
    const index = this.saveSlots.findIndex((save) => save.id === id);
    if (index !== -1) {
      this.saveSlots[index] = saveFile;
    } else {
      this.saveSlots.push(saveFile);
    }
    localStorage.setItem("PohjolaIII_saved_games", JSON.stringify(this.saveSlots));
  }
}

class SaveFile {
  [id: string]: any;
  name: string;
  version: string;
  saveData: SaveData;
  lastSaved: Date;
  created: Date;
  constructor(saveFile: SaveFile) {
    if (saveFile?.id) {
      this.id = saveFile.id;
    } else {
      let id: string = this.createID();
      while (saveController.saveSlots.find((save) => save.id === id)) {
        id = this.createID();
      }
      this.id = id;
    }
    this.name = saveFile.name || "New Game";
    this.version = "1";
    this.saveData = new SaveData();
    this.lastSaved = new Date();
    if (!saveFile.created) {
      this.created = new Date();
    } else {
      this.created = saveFile.created;
    }
  }

  createID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

class SaveData {
  player: Player;
  stats: Statistics;
  constructor() {
    this.player = this.stripPlayer();
    this.stats = stats;
  }

  stripPlayer(): Player {
    const stripped = JSON.parse(JSON.stringify(player));
    stripped.inventory = stripped.inventory.map((item: Item) => ({
      id: item.id,
      type: item.type,
      amount: item.amount,
    }));
    stripped.equipment = Object.values(stripped.equipment).map((item: any) =>
      item
        ? {
            id: item.id,
            type: item.type,
            amount: item.amount,
          }
        : null
    );
    stripped.abilities = stripped.abilities.map((ability: Ability) => ({
      id: ability.id,
    }));
    stripped.abilities_total = stripped.abilities_total.map((ability: Ability) => ({
      id: ability.id,
    }));
    return stripped;
  }
}

const saveController = new SaveController();
