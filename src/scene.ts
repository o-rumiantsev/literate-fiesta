import assets, { Asset } from './assets';
import obstacles, { Obstacle } from './obstacles';
import levels from './levels';
import checkPoints from './check-points';
import playerConfig from './player-config';

export default class GameScene extends Phaser.Scene {
    private bounds = {
        x: 0,
        y: 0,
        width: 2304,
        height: 4000,
    };

    constructor(
        private player: Phaser.Physics.Arcade.Sprite,
        private obstacles: Phaser.Physics.Arcade.StaticGroup,
        private cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        private resetKey: Phaser.Input.Keyboard.Key
    ) {
        super({ key: 'gameScene', active: true });
    }

    preload(): void {
        this.load.path = 'assets/';
        this.loadAssets();
    }

    create(): void {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        this.loadObstacles();

        this.setBounds();
        this.setUpPlayer();
        this.setUpCamera();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.resetKey = this.input.keyboard.addKey('R');
    }

    update() {
        this.processReset();
        this.processLevel();
        this.processCursors();
    }

    loadAssets(): void {
        const categories = Object.keys(assets);
        categories.forEach(category =>
            assets[category].forEach((asset: Asset) =>
                this.load[category](
                    asset.key,
                    asset.path,
                    asset.frames
                )
            )
        );
    }

    loadObstacles(): void {
        this.obstacles = this.physics.add.staticGroup();
        obstacles.forEach((obstacle: Obstacle) =>
            this.obstacles.create(obstacle.x, obstacle.y, obstacle.key)
        );
    }

    setBounds(): void {
        this.physics.world.setBounds(
            this.bounds.x,
            this.bounds.y,
            this.bounds.width,
            this.bounds.height
        );
        this.cameras.main.setBounds(
            this.bounds.x,
            this.bounds.y,
            this.bounds.width,
            this.bounds.height
        );
    }

    toCheckPoint(id: number): void {
        const checkPoint = checkPoints[id];
        this.player.setPosition(checkPoint.x, checkPoint.y);
    }

    setUpCamera(): void {
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setZoom(3.7);
    }

    setUpPlayer(): void {
        const startPoint = checkPoints[playerConfig.start.checkPoint];

        this.player = this.physics.add.sprite(
            startPoint.x,
            startPoint.y,
            playerConfig.key,
            playerConfig.start.frame
        );
        this.player.setScale(playerConfig.scale);
        this.player.setCollideWorldBounds(playerConfig.collideWorldBounds);

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
    }

    processCursors(): void {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-70);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(70);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-250);
        }
    }

    processReset(): void {
        if (this.input.keyboard.checkDown(this.resetKey, 1000)) {
            this.toCheckPoint(0);
        }
    }

    processLevel(): void {
        const level = levels.filter(level =>
            this.player.body.position.y < level
        ).pop();

        if (level) {
            this.cameras.main.setFollowOffset(
                0,
                this.player.body.position.y - level + 95
            );
        } else {
            this.cameras.main.setLerp(0.2, 0.2);
            this.cameras.main.setFollowOffset(0, 0);
        }
    }
}
