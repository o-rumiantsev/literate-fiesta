export type Asset = {
    key: string,
    path: string,
    frames: {
        frameWidth: number,
        frameHeight: number,
    },
};

export type Obstacle = {
    x: number,
    y: number,
    key: string,
};