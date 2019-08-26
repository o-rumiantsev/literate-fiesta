const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
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

function preload() {
  applyAssets(this);
  applyObstacles(this);
  applyCheckPoints(this);

  applyPlayerSetUp(this);
  applyCameraSetUp(this);

  applyReset(this);
  applyLevels(this);
  applyCursorsProcessor(this);

  this.load.path = 'assets/';
  this.loadAssets();
}

function create() {
  this.physics.world.setBounds(0, 0, 2304, 4000);

  this.loadObstacles();

  this.add.image(0, 0, 'bg').setOrigin(0, 0);

  this.player = this.physics.add.sprite(0, 0, 'man', 18);

  this.setUpPlayer();
  this.setUpCamera();

  this.cursors = this.input.keyboard.createCursorKeys();
  this.resetKey = this.input.keyboard.addKeys('R').R;
}

function update() {
  this.processReset();
  this.processLevel();
  this.processCursors();
}
