var state = new gameState({
  id: "game_state",
  statistics: {
    enemiesKilled: {},
  }
});

function gameState(base) {
  this.id = base.id;
  this.statistics = new StatisticsClass(base.statistics);

  function StatisticsClass(stats) {
    this.enemiesKilled = new KilledEnemies(stats.enemiesKilled);
  }

  function KilledEnemies(stats) {
    Object.keys(Enemies).forEach(enemy=>{
      this[enemy] = stats[enemy] || 0;
    })
  }
}