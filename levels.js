const levels = [
  3840,
  3680,
].reverse();

const currentLevel = sprite => levels.find(level =>
  sprite.body.position.y < level
);

const processLevel = scene => {
  const level = currentLevel(scene.player);

  if (level) {
    scene.cameras.main.setFollowOffset(
      0,
      scene.player.body.position.y - level + 95
    );
  } else {
    scene.cameras.main.setLerp(0.2,0.2);
    scene.cameras.main.setFollowOffset(0, 0);
  }
};

const applyLevels = scene => {
  scene.processLevel = () => processLevel(scene);
};