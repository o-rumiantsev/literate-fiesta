const processCursors = scene => {
  if (scene.cursors.left.isDown) {
    scene.player.setVelocityX(-60);
    scene.player.anims.play('left', true);
  } else if (scene.cursors.right.isDown) {
    scene.player.setVelocityX(60);
    scene.player.anims.play('right', true);
  } else {
    scene.player.setVelocityX(0);
    scene.player.anims.play('turn');
  }

  if (scene.cursors.up.isDown && scene.player.body.touching.down) {
    scene.player.setVelocityY(-190);
  }
};

const applyCursorsProcessor = scene => {
  scene.processCursors = () => processCursors(scene);
};