const checkPoints = [
  { x: 50, y: 3630 },
  { x: 630, y: 3630 },
  { x: 1100, y: 3550 },
];

checkPoints.to = (checkPointId, sprite) => {
  const checkPoint = checkPoints[checkPointId];
  sprite.setPosition(checkPoint.x, checkPoint.y);
};

const applyCheckPoints = scene => scene.checkPoints = checkPoints;