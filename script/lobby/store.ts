function createStore(options?: { selling?: boolean }) {
  lobbyContent.innerHTML = "";
  hideHover();
  sideBarDetails();
  const storeScreen = document.createElement("div");
  const buyingSelling = document.createElement("div");
  storeScreen.classList.add("store");
  buyingSelling.classList.add("options");
  sellingOptions.forEach((option: { id: string; selling: boolean; onClick: any }) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("lobby-button");
    optionElement.innerText = game.getLocalizedString(option.id);
    optionElement.onclick = option.onClick;
    if ((option.selling && options?.selling) || (!option.selling && !options?.selling)) {
      optionElement.classList.add("selected");
    }
    buyingSelling.append(optionElement);
  });
  storeScreen.append(buyingSelling);
  storeScreen.append(
    inventoryController.buildInventoryScreen({
      inventory: options?.selling ? player.inventory : merchant.inventoryDefault,
      mode: options?.selling ? "sell" : "buy",
    })
  );
  lobbyContent.append(storeScreen);
}

const sellingOptions = [
  {
    id: "buying",
    selling: false,
    onClick: () => createStore({ selling: false }),
  },
  {
    id: "selling",
    selling: true,
    onClick: () => createStore({ selling: true }),
  },
];

function buyItem(item: Item, amount: number = 1) {
  if (item.price * amount > player.gold) {
    return;
  }
  player.removeGold(item.price * amount);
  player.addItem(item, amount);
  createStore({ selling: false });
}

function sellItem(item: Item, amount: number = 1) {
  player.addGold(item.price * amount);
  player.removeItem(item, amount);
  createStore({ selling: true });
}

const promptValues = {
  itemAmount: 1 as number,
  itemMax: 99 as number,
  mode: "buying" as string,
  item: null as Item | null,
};

function updateAmount(amount: number) {
  if (amount > promptValues.itemMax) amount = promptValues.itemMax;
  promptValues.itemAmount = amount;
  if (promptValues.itemAmount < 1) {
    promptValues.itemAmount = 1;
  }
  itemPromptAmount.innerText = promptValues.itemAmount.toString();
  itemPromptSlider.value = promptValues.itemAmount.toString();
  itemPromptPrice.innerText = compactNumber(promptValues.itemAmount * (promptValues?.item?.price || 0));
}

function increaseAmount() {
  updateAmount(promptValues.itemAmount + 1);
}

function decreaseAmount() {
  updateAmount(promptValues.itemAmount - 1);
}
function createAmountPrompt(item: Item, maxAmount: number, mode: string = "buying") {
  itemPrompt.classList.remove("disabled");
  promptValues.itemAmount = 1;
  itemPromptSlider.max = maxAmount.toString();
  promptValues.itemMax = maxAmount;
  promptValues.item = item;
  promptValues.mode = mode;
  itemPromptTitle.innerText = game.getLocalizedString(item.id);
  updateAmount(1);
}

function destroyAmountPrompt() {
  itemPrompt.classList.add("disabled");
  promptValues.itemAmount = 1;
}

function cancelAmount() {
  destroyAmountPrompt();
}

function confirmAmount() {
  if (promptValues.item) {
    if (promptValues.mode === "buying") {
      buyItem(promptValues.item, promptValues.itemAmount);
    } else {
      sellItem(promptValues.item, promptValues.itemAmount);
    }
  }
  destroyAmountPrompt();
}
