const setUpCamera = scene => {
  scene.cameras.main.setBounds(0, 0, 2304, 4000);
  scene.cameras.main.startFollow(scene.player, true, 0.05, 0.05);
  scene.cameras.main.setZoom(3.7);
};

const applyCameraSetUp = scene => scene.setUpCamera = () => setUpCamera(scene);