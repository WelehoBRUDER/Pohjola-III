const craftScreen = {
  width: 0,
};
function createCrafting() {
  lobbyContent.innerHTML = "";
  hideHover();
  sideBarDetails();
  craftScreen.width;
  lobbyContent.append(buildInventoryScreen({ offsetPercent: 50, filter: "crafting", class: "craft" }));
  lobbyContent.append(buildCraftingScreen());
}

function buildCraftingScreen() {
  const craftScreen = document.createElement("div");
  const craftingContainer = document.createElement("div");
  craftScreen.classList.add("crafting");
  craftingContainer.classList.add("crafting-container");
  craftScreen.append(craftingContainer);
  const craftableItems: Item[] = Object.values(items)
    .filter((item: any) => item.toCraft)
    .sort((a, b) => a.tier.level - b.tier.level)
    .map((item: any) => {
      const _item: Item = new Item(item as ItemObject);
      return _item.updateClass();
    });
  craftableItems.forEach((item: Item) => {
    const craftable = document.createElement("div");
    const slot = createSlot(item, { craft: true });
    const materials = document.createElement("div");
    craftable.classList.add("crafting-slot");
    craftable.classList.add(`${item.canCraft() ? "enabled" : "disabled"}`);
    const materialList =
      item.toCraft?.map((itm: { item: string; amount: number }) => {
        // @ts-ignore
        const material = new Item({ ...items[itm.item], amount: itm.amount });
        return material.updateClass();
      }) || [];
    materials.classList.add("materials");
    materialList.forEach((material: Item) => {
      const materialSlot = createSlot(material, { material: true });
      materials.append(materialSlot);
    });
    craftable.append(slot, materials);
    craftingContainer.append(craftable);
  });
  return craftScreen;
}
