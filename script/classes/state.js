var state = new gameState({
  id: "game_state",
  statistics: {
    enemiesKilled: {},
  },
  dungeonKeys: {}
});

function gameState(base) {
  this.id = base.id;
  this.statistics = new StatisticsClass(base.statistics);
  this.dungeonKeys = base.dungeonKeys || {};

  function StatisticsClass(stats) {
    this.enemiesKilled = new KilledEnemies(stats.enemiesKilled);
  }

  function KilledEnemies(stats) {
    Object.keys(Enemies).forEach(enemy=>{
      this[enemy] = stats[enemy] || 0;
    })
  }
}

$(".controlButtons").childNodes.forEach(button=>{
  button.addEventListener("click", e=>dungeonMove(button.classList.value));
})

createDungeon(dungeons.cave_of_beginning);