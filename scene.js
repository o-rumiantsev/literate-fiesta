const GameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'gameScene', active: true });

    this.player = null;
    this.obstacles = null;
    this.cursors = null;
    this.resetKey = null;

    this.bounds = [0, 0, 2304, 4000];
  },

  preload() {
    this.load.path = 'assets/';
    this.loadAssets();
  },

  create() {
    this.physics.world.setBounds(...this.bounds);

    this.add.image(0, 0, 'bg').setOrigin(0, 0);

    this.loadObstacles();
    this.setUpPlayer();
    this.setUpCamera();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.resetKey = this.input.keyboard.addKeys('R').R;
  },

  update() {
    this.processReset();
    this.processLevel();
    this.processCursors();
  },

  loadAssets() {
    //
    // `assets` is defined in assets.js
    //
    const types = Reflect.ownKeys(assets);
    types.forEach(type =>
      assets[type].forEach(asset => this.load[type](
        asset.key,
        asset.path,
        asset.frames
      ))
    );
  },

  loadObstacles() {
    this.obstacles = this.physics.add.staticGroup();
    //
    // `obstacles` is defined in obstacles.js
    //
    obstacles.forEach(obstacle =>
      this.obstacles.create(obstacle.x, obstacle.y, obstacle.key)
    );
  },

  toCheckPoint(id) {
    //
    // `checkPoints` is defined in check-points.js
    //
    const checkPoint = checkPoints[id];
    this.player.setPosition(checkPoint.x, checkPoint.y);
  },

  setUpCamera() {
    this.cameras.main.setBounds(...this.bounds);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(3.7);
  },

  setUpPlayer() {
    this.player = this.physics.add.sprite(0, 0, 'man', 18);

    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.45);

    this.toCheckPoint(0, this.player);

    this.physics.add.collider(this.player, this.obstacles);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('man', {
        start: 9,
        end: 17,
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'man', frame: 18 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('man', {
        start: 27,
        end: 35,
      }),
      frameRate: 10,
      repeat: -1
    });
  },

  processCursors() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-60);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(60);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-190);
    }
  },

  processReset() {
    if (this.input.keyboard.checkDown(this.resetKey, 1000)) {
      this.toCheckPoint(0);
    }
  },

  processLevel() {
    //
    // `levels` is defined in levels.js
    //
    const level = levels.find(level =>
      this.player.body.position.y < level
    );

    if (level) {
      this.cameras.main.setFollowOffset(
        0,
        this.player.body.position.y - level + 95
      );
    } else {
      this.cameras.main.setLerp(0.2, 0.2);
      this.cameras.main.setFollowOffset(0, 0);
    }
  },
});