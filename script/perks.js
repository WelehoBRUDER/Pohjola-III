/*
  ### GUIDE TO MAKING PERKS ###

  Perk template:

  "my_perk": {
    id: "my_perk", # This is your perk's id, used to find it.
    title: "My Perk", # This text will be shown when hovering your perk.
    cost: 1, # not used,
    level: 0, # start at level 0 or perk won't work
    maxLevel: 3, # How many times you can buy this perk, no hard limit.
    effect: "my_perk", # This references the perk id in "effects.js", this is where you must code all modifiers you want for your perk.
    on_purchase: { # WIP, allows you to assign effects to purchasing the perk for the first time.
      grant_ability: "battle_stance" # Buying this perk gives you this ability
    },
    x: 1, # How many units (1 unit = 64px) to the left this perk is on screen. Recommended to use 3-4 units between perks.
    y: 6, # How many units from the top this perk is on screen.
    parent: "", # Which perk precedes this perk. Used to get relative position and link. Leave empty if this perk starts your tree.
    img: "gfx/icons/barbarian.png" # This is the image used for the perk.
  }

*/

$("#perkWindow .contentArea").addEventListener('mousedown', action1);
$("#perkWindow .contentArea").addEventListener('mousemove', action2);

let mouseX = 0;
let mouseY = 0;
let bgPosX = 0;
let bgPosY = 0;

function action1(e) {
  mouseX = e.x;
  mouseY = e.y;
  bgPosX = $("#perkWindow .contentArea").scrollLeft;
  bgPosY = $("#perkWindow .contentArea").scrollTop;
}

function action2(e) {
  if (e.buttons == 1) {
      let offsetX = e.x - mouseX;
      let offsetY = e.y - mouseY;
      scroll.x = offsetX;
      scroll.y = offsetY;
      $("#perkWindow .contentArea").scrollTo(bgPosX - offsetX, bgPosY - offsetY);
  }
}

let scroll = {
  x: 0,
  y: 0
}

function createPerks() {
  const bg = $("#perkWindow .contentArea");
  const tree = perkTrees[player.selectedPerks + "_tree"];
  bg.textContent = "";
  let color = "white";
  let shadow = "gray";
  for(let [key, perk] of Object.entries(tree)) {
    if(key == "color") {
      color = perk.c;
      shadow = perk.s;
      continue;
    }
    const perkBg = create("div");
    const perkImg = create("img");
    const perkLvl = create("p");
    perkBg.classList = "Perk " + key;
    perkBg.style.background = color;
    perkBg.style.boxShadow = `inset 0px 0px 6px 4px ${shadow}`;
    perkImg.src = perk.img;
    let hoverPerk = perk;
    if(!player.perks[key]?.id) perk.level = 0;
    if(player.perks[key]?.id) hoverPerk = player.perks[key];
    perkLvl.textContent = `${hoverPerk.level || "0"}/${perk.maxLevel}`;
    if(player.perks[key]?.id) {
      if(hoverPerk.level < perk.maxLevel) perkBg.classList.add("bought");
      else {
        perkBg.classList.add("maxed");
        perkLvl.style.color = "gold";
        perkLvl.style.textShadow = "-2px 2px 4px orange";
      } 
    }
    perkBg.append(perkImg, perkLvl);
    if((perk.parent && !player.perks[perk.parent]?.id) || player.level.perkPoints < 1) {
      perkBg.classList.add("unavailable");
    }
    // # GET THE PERK'S POSITION # //
    if(!perk.parent) {
      perkBg.style.left = perk.x*64 + "px";
      perkBg.style.top = perk.y*64 + "px";
    }
    else {
      let parent = $("." + perk.parent);
      perkBg.style.left = `${perk.x*64 + parent.offsetLeft}px`;
      perkBg.style.top = `${perk.y*64 + parent.offsetTop}px`;
    }
    bg.append(perkBg);
    let perkText = `<bcss>line-height: 1.1<bcss><c>yellow<c><f>24px<f>${hoverPerk.title}§`;
    perkText += `\n<c>silver<c><f>15px<f>Level: ${hoverPerk.level}/${perk.maxLevel}§`;
    if(!player.perks[perk.parent]?.id && perk.parent) perkText += `\n<c>red<c><f>15px<f>Requires '${tree[perk.parent].title}'§`;
    if(player.level.perkPoints < 1) perkText += `\n<c>red<c><f>15px<f>${player.perks[key]?.level == perk.maxLevel ? "<c>gold<c>Perk maxed!" : "Insufficient Perk Points"}§`;
    if(!player.perks[hoverPerk.id]?.id) {
      let perkEffect = permanentEffects[perk.effect];
      perkText += `\n<c>orange<c><f>15px<f>Next Level: §\n`;
      perkText += statusSyntax(perkEffect.effects[0], 12);
      if(perk.on_purchase?.grant_ability) {
        perkText += `\t<c>white<c><f>13<f>Grants ability '<c>yellow<c>${Abilities[perk.on_purchase.grant_ability].name}<c>white<c>'\n\n`;
        perkText += abilityHoverTiny(Abilities[perk.on_purchase.grant_ability]);
      }
    }
    else {
      let pPerk = player.perks[key];
      if(pPerk.level !== perk.maxLevel) {
        let perkEffect = permanentEffects[perk.effect];
        perkText += `\n<c>orange<c><f>15px<f>Current: §\n`;
        perkText += statusSyntax(perkEffect.effects[pPerk.level-1], 12);
        perkText += `\n§<c>orange<c><f>15px<f>Next Level: §\n`;
        perkText += statusSyntax(perkEffect.effects[pPerk.level], 12);
      } else {
        let perkEffect = permanentEffects[perk.effect];
        perkText += `\n<c>orange<c><f>15px<f>Effects: §\n`;
        perkText += statusSyntax(perkEffect.effects[pPerk.level-1], 12);
      }
    }
    addHoverBox(perkBg, perkText, "");
    perkBg.addEventListener("click", e=>purchasePerk(key));
    if(perk.parent) {
      let parent = $("." + perk.parent);
      const xConnecter = create("div");
      const yConnecter = create("div");
      xConnecter.classList = "connecter"
      yConnecter.classList = "connecter"
      if(perk.x !== 0 && perk.y == 0) {
        xConnecter.style.width = perkBg.offsetLeft - parent.offsetLeft + "px";
        xConnecter.style.height = "16px";
        xConnecter.style.left = parent.offsetLeft + parent.offsetWidth/2 - 8 + "px";
        xConnecter.style.top = parent.offsetTop + parent.offsetHeight/2 - 8 + "px";
        bg.append(xConnecter);
      }
      else if(perk.y !== 0 && perk.x == 0) {
        yConnecter.style.width = "16px"
        yConnecter.style.height = (perkBg.offsetTop - parent.offsetTop > 0 ? perkBg.offsetTop - parent.offsetTop : Math.abs(perkBg.offsetTop - parent.offsetTop)) + "px";
        yConnecter.style.left = parent.offsetLeft + parent.offsetWidth/2 - 8 + "px";
        yConnecter.style.top = (perk.y > 0 ? parent.offsetTop + parent.offsetHeight/2 : perkBg.offsetTop + perkBg.offsetHeight/2) - 8 + "px";
        bg.append(yConnecter);
      }
      else {
        yConnecter.style.width = "16px"
        yConnecter.style.height = (perkBg.offsetTop - parent.offsetTop > 0 ? perkBg.offsetTop - parent.offsetTop : Math.abs(perkBg.offsetTop - parent.offsetTop)) + "px";
        yConnecter.style.left = parent.offsetLeft + parent.offsetWidth/2 - 8 + "px";
        yConnecter.style.top = (perk.y > 0 ? parent.offsetTop + parent.offsetHeight/2 : perkBg.offsetTop + perkBg.offsetHeight/2) + "px";
        bg.append(yConnecter);
        xConnecter.style.width = (perkBg.offsetLeft - parent.offsetLeft) > 0 ? perkBg.offsetLeft - parent.offsetLeft + "px" : Math.abs(perkBg.offsetLeft - parent.offsetLeft) + "px";
        xConnecter.style.height = "16px";
        xConnecter.style.left = (perkBg.offsetLeft - parent.offsetLeft) > 0 ? parent.offsetLeft + parent.offsetWidth/2 - 8 + "px" : perkBg.offsetLeft + perkBg.offsetWidth/2 + 8 + "px";
        xConnecter.style.top = (perk.y > 0 ? yConnecter.offsetHeight + yConnecter.offsetTop : perkBg.offsetTop + perkBg.offsetHeight/2) - 8 + "px";
        bg.append(xConnecter);
      }
    }
    $("#perkWindow .contentArea").scrollTo(bgPosX - scroll.x, bgPosY - scroll.y);
  }

  function purchasePerk(id) {
    let perk_ = tree[id];
    if(player.level.perkPoints < 1 || (perk_.parent && !player.perks[perk_.parent]?.id)) return;
    if(player.perks[id]?.level == perk_.maxLevel) return;
    if(player.perks[id]?.id && player.perks[id].level !== perk_.maxLevel) {
      player.perks[id].level++;
      player.permanentStatuses[id] = new permanentStatus({...permanentEffects[perk_.effect], level: player.perks[id].level});
      player.restoreFull();
      player.level.perkPoints--;
    }
    else {
      player.perks[id] = new perk({...perk_, level: 1});
      player.permanentStatuses[id] = new permanentStatus({...permanentEffects[perk_.effect], level: 1});
      if(perk_.on_purchase?.grant_ability) player.totalAbilities.push(new Ability(Abilities[perk_.on_purchase.grant_ability]));
      player.restoreFull();
      player.level.perkPoints--;
    }
    createPerks();
  }
}