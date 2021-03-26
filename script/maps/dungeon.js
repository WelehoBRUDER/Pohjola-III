function createDungeon(dungeon) {
  const map = $(".mapContent");
  $(".mapTitle").textContent = dungeon.title;
  map.textContent = "";

  dungeon.rooms.forEach((room, index) => {
    map.append(generateDungeonTile(room, index));
  });

  dungeon.rooms.forEach(room => {
    generateConnection(room, $("." + room.id));
  });
  map.scrollTo(currentScroll.x, currentScroll.y);
  mapControls();
};

let currentScroll = {
  x: 0,
  y: 1000
}

function resetPlayer() {
  global.playerCurrentPos = 0;
  global.playerOldPos = 0;
  createDungeon(dungeons[global.currentDungeon]);
}

function generateDungeonTile(tile, index) {
  const tileBg = create("div");
  tileBg.classList = "Tile " + tile.id;
  if (tile.start === true) {
    tileBg.style.left = innerWidth / 2 - 64 + "px";
    tileBg.style.top = (innerHeight - 228) - tile.y * 64 + "px";
  } else {
    const parent = $("." + tile.parent);
    tileBg.style.left = `${tile.x * 64 + parent.offsetLeft}px`;
    tileBg.style.top = `${tile.y * 64 + parent.offsetTop}px`;
  }
  if (global.playerCurrentPos === index) {
    const mainImg = create("img");
    mainImg.classList = "mainImg " + player.charClass().id;
    mainImg.src = player.charClass().class.img;
    tileBg.append(mainImg);
    tileBg.style.border = "6px solid gold";
  }
  else {
    if(tile.has_key && !hasKey(tile.has_key)) {
      const mainImg = mainImage("gfx/icons/key.png");
      tileBg.append(mainImg);
    }
    else if(tile.enemies?.length > 0) {
      const mainImg = mainImage("gfx/icons/crossed-swords.png");
      tileBg.append(mainImg);
    }
    else if (isLocked(tile)) {
      const mainImg = mainImage("gfx/icons/closed-doors.png");
      tileBg.append(mainImg);
    }
    
    else if(tile.requires_key) {
      const mainImg = mainImage("gfx/icons/open-gate.png");
      tileBg.append(mainImg);
    }
  }
  return tileBg;
};

function mainImage(src) {
  const mainImg = create("img");
  mainImg.classList = "mainImg";
  mainImg.src = src;
  return mainImg;
}

function isLocked(tile) {
  if (!tile.requires_key) return false;
  return state?.dungeonKeys?.[tile.requires_key] == true ? false : true;
}

function hasKey(key) {
  return state?.dungeonKeys?.[key] == true ? true : false;
}

function generateConnection(tile, tileBg) {
  const bg = $(".mapContent");
  if (tile.parent) {
    let parent = $("." + tile.parent);
    const xConnecter = create("div");
    const yConnecter = create("div");
    xConnecter.classList = "connecter"
    yConnecter.classList = "connecter"
    xConnecter.style.zIndex = "-5";
    yConnecter.style.zIndex = "-5";
    if (tile.x !== 0 && tile.y == 0) {
      xConnecter.style.width = (tileBg.offsetLeft - parent.offsetLeft > 0 ? tileBg.offsetLeft - parent.offsetLeft : Math.abs(tileBg.offsetLeft - parent.offsetLeft)) + "px";
      xConnecter.style.height = "16px";
      xConnecter.style.left = (tileBg.offsetLeft - parent.offsetLeft) > 0 ? parent.offsetLeft + parent.offsetWidth / 2 - 8 + "px" : tileBg.offsetLeft + tileBg.offsetWidth / 2 + 8 + "px";
      xConnecter.style.top = parent.offsetTop + parent.offsetHeight / 2 - 8 + "px";
      bg.append(xConnecter);
    }
    else if (tile.y !== 0 && tile.x == 0) {
      yConnecter.style.width = "16px"
      yConnecter.style.height = (tileBg.offsetTop - parent.offsetTop > 0 ? tileBg.offsetTop - parent.offsetTop : Math.abs(tileBg.offsetTop - parent.offsetTop)) + "px";
      yConnecter.style.left = parent.offsetLeft + parent.offsetWidth / 2 - 8 + "px";
      yConnecter.style.top = (tile.y > 0 ? parent.offsetTop + parent.offsetHeight / 2 : tileBg.offsetTop + tileBg.offsetHeight / 2) - 8 + "px";
      bg.append(yConnecter);
    }
    else {
      yConnecter.style.width = "16px"
      yConnecter.style.height = (tileBg.offsetTop - parent.offsetTop > 0 ? tileBg.offsetTop - parent.offsetTop : Math.abs(tileBg.offsetTop - parent.offsetTop)) + "px";
      yConnecter.style.left = parent.offsetLeft + parent.offsetWidth / 2 - 8 + "px";
      yConnecter.style.top = (tile.y > 0 ? parent.offsetTop + parent.offsetHeight / 2 : tileBg.offsetTop + tileBg.offsetHeight / 2) + "px";
      bg.append(yConnecter);
      xConnecter.style.width = (tileBg.offsetLeft - parent.offsetLeft) > 0 ? tileBg.offsetLeft - parent.offsetLeft + "px" : Math.abs(tileBg.offsetLeft - parent.offsetLeft) + "px";
      xConnecter.style.height = "16px";
      xConnecter.style.left = (tileBg.offsetLeft - parent.offsetLeft) > 0 ? parent.offsetLeft + parent.offsetWidth / 2 - 8 + "px" : tileBg.offsetLeft + tileBg.offsetWidth / 2 + 8 + "px";
      xConnecter.style.top = (tile.y > 0 ? yConnecter.offsetHeight + yConnecter.offsetTop : tileBg.offsetTop + tileBg.offsetHeight / 2) - 8 + "px";
      bg.append(xConnecter);
    }
  };
  // * FINISH LATER - BOTCHED CONNECTION SYSTEM * //
  // Object.entries(tile.connections).forEach(connection=>{
  //   const key = connection[0];
  //   const value = connection[1];
  //   if(value == tile.parent || !tile.parent) return;
  //   console.log(value);
  //   const parentObject = findRoom(value);
  //   const parent = $("." + value);
  //   const xConnecter = create("div");
  //   const yConnecter = create("div");
  //   console.log(parentObject);
  //   xConnecter.classList = "connecter"
  //   yConnecter.classList = "connecter"
  //   xConnecter.style.zIndex = "-5";
  //   yConnecter.style.zIndex = "-5";
  //   if (tile.x !== 0 && tile.y == 0) {
  //     xConnecter.style.width = (tileBg.offsetLeft - parent.offsetLeft > 0 ? tileBg.offsetLeft - parent.offsetLeft : Math.abs(tileBg.offsetLeft - parent.offsetLeft)) + "px";
  //     xConnecter.style.height = "16px";
  //     xConnecter.style.left = (tileBg.offsetLeft - parent.offsetLeft) > 0 ? parent.offsetLeft + parent.offsetWidth / 2 - 8 + "px" : tileBg.offsetLeft + tileBg.offsetWidth / 2 + 8 + "px";
  //     xConnecter.style.top = parent.offsetTop + parent.offsetHeight / 2 - 8 + "px";
  //     bg.append(xConnecter);
  //   }
  //   else if (tile.y !== 0 && tile.x == 0) {
  //     yConnecter.style.width = "16px"
  //     yConnecter.style.height = (tileBg.offsetTop - parent.offsetTop > 0 ? tileBg.offsetTop - parent.offsetTop : Math.abs(tileBg.offsetTop - parent.offsetTop)) + "px";
  //     yConnecter.style.left = parent.offsetLeft + parent.offsetWidth / 2 - 8 + "px";
  //     yConnecter.style.top = (tile.y > 0 ? parent.offsetTop + parent.offsetHeight / 2 : tileBg.offsetTop + tileBg.offsetHeight / 2) - 8 + "px";
  //     bg.append(yConnecter);
  //   }
  //   else {
  //     yConnecter.style.width = "16px"
  //     yConnecter.style.height = (tileBg.offsetTop - parent.offsetTop > 0 ? tileBg.offsetTop - parent.offsetTop : Math.abs(tileBg.offsetTop - parent.offsetTop)) + "px";
  //     yConnecter.style.left = parent.offsetLeft + parent.offsetWidth / 2 - 8 + "px";
  //     yConnecter.style.top = (tile.y > 0 ? parent.offsetTop + parent.offsetHeight / 2 : tileBg.offsetTop + tileBg.offsetHeight / 2) + "px";
  //     bg.append(yConnecter);
  //     xConnecter.style.width = (tileBg.offsetLeft - parent.offsetLeft) > 0 ? tileBg.offsetLeft - parent.offsetLeft + "px" : Math.abs(tileBg.offsetLeft - parent.offsetLeft) + "px";
  //     xConnecter.style.height = "16px";
  //     xConnecter.style.left = (tileBg.offsetLeft - parent.offsetLeft) > 0 ? parent.offsetLeft + parent.offsetWidth / 2 - 8 + "px" : tileBg.offsetLeft + tileBg.offsetWidth / 2 + 8 + "px";
  //     xConnecter.style.top = (tile.y > 0 ? yConnecter.offsetHeight + yConnecter.offsetTop : tileBg.offsetTop + tileBg.offsetHeight / 2) - 8 + "px";
  //     bg.append(xConnecter);
  //   }
  // });
}

function mapControls() {
  const _tile = dungeons[global.currentDungeon].rooms[global.playerCurrentPos];
  $(".controlButtons").childNodes.forEach(button=>{
    if(button.nodeName == "#text") return;
    button.classList.add("unavailable");
  });
  Object.entries(_tile.connections).forEach(val=>{
    const key = val[0];
    const obj = val[1];
    const tile = findRoom(obj);
    if(isLocked(tile)) return;
    $(".controlButtons " + "." + key).classList.remove("unavailable");
  })
}

function dungeonMove(dir) {
  const _tile = dungeons[global.currentDungeon].rooms[global.playerCurrentPos];
  const tile = findRoom(_tile.connections[dir]);
  const index = dungeons[global.currentDungeon].rooms.findIndex(room=>room.id == tile.id);
  global.playerOldPos = global.playerCurrentPos;
  global.playerCurrentPos = index;
  if(dir == "up") currentScroll.y -= 256;
  else if(dir == "left") currentScroll.x -= 256;
  else if(dir == "right") currentScroll.x += 256;
  else currentScroll.y += 256;
  if(tile.has_key && !tile.enemies) {
    state.dungeonKeys[tile.has_key] = true;
  }
  createDungeon(dungeons[global.currentDungeon]);
}

function findRoom(id) {
  return dungeons[global.currentDungeon].rooms.find(room=>room.id == id) ?? false;
}