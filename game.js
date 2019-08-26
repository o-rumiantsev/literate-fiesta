const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: GameScene,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);