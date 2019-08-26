const processReset = scene => {
  if (scene.input.keyboard.checkDown(scene.resetKey, 1000)) {
    scene.checkPoints.to(0, scene.player);
  }
};

const applyReset = scene => {
  scene.processReset = () => processReset(scene);
};