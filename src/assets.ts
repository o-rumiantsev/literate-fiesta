export type Asset = {
  key: string,
  path: string,
  frames: {
    frameWidth: number,
    frameHeight: number,
  },
};

export default {
  image: [
    { key: 'bg', path: 'map.png' },

    { key: 'platform1', path: 'platform1.png' },
    { key: 'platform2', path: 'platform2.png' },
    { key: 'platform3', path: 'platform3.png' },

    { key: 'wall1', path: 'wall1.png' },
    { key: 'block1', path: 'block1.png' },
    { key: 'plat1', path: 'plat1.png' },
    { key: 'vertical-block1', path: 'vertical-block1.png' },
    { key: 'vase1', path: 'vase1.png' },

    { key: 'stair', path: 'stair.png' },
  ],
  spritesheet: [
    {
      key: 'man',
      path: 'man.png',
      frames: {
        frameWidth: 32,
        frameHeight: 48,
      },
    }
  ]
};