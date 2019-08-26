const setUpPlayer = scene => {
  scene.player.setCollideWorldBounds(true);
  scene.player.setScale(0.45);

  scene.checkPoints.to(0, scene.player);

  scene.physics.add.collider(scene.player, scene.obstacles);

  scene.anims.create({
    key: 'left',
    frames: scene.anims.generateFrameNumbers('man', {
      start: 9,
      end: 17,
    }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'turn',
    frames: [ { key: 'man', frame: 18 } ],
    frameRate: 20
  });

  scene.anims.create({
    key: 'right',
    frames: scene.anims.generateFrameNumbers('man', {
      start: 27,
      end: 35,
    }),
    frameRate: 10,
    repeat: -1
  });
};

const applyPlayerSetUp = scene => {
  scene.setUpPlayer = () => setUpPlayer(scene);
};