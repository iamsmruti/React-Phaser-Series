import Phaser from "phaser";

export class Game extends Phaser.Scene {
  platforms
  player
  stars
  score = 0
  scoreText = ''

  preload() {
    this.load.image('sky', 'assets/sky.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.image('star', 'assets/star.png')

    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0)

    this.platforms = this.physics.add.staticGroup()

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()

    this.platforms.create(600, 400, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')

    this.player = this.physics.add.sprite(100, 200, 'dude');

    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, stop: 3}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'turn',
      frames: [{key: 'dude', frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, stop: 8}),
      frameRate: 10,
      repeat: -1
    })

    this.physics.add.collider(this.player, this.platforms)

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    })

    this.physics.add.collider(this.stars, this.platforms)

    this.stars.children.iterate((child) => {
      child.setBounce(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    this.physics.add.overlap(this.player, this.stars, this.collectStars, null, this)

    this.scoreText = this.add.text(16, 16, 'Score : 0', {
      fontSize: '32px',
      fill: '#000'
    })
  }

  collectStars(player, star) {
    star.disableBody(true, true)

    this.score += 10
    this.scoreText.setText('Score ' + this.score)
  }

  update() {
    const cursor = this.input.keyboard.createCursorKeys()

    if(cursor.left.isDown) {
      this.player.setVelocityX(-160)
      this.player.anims.play('left', true)
    } else if(cursor.right.isDown) {
      this.player.setVelocityX(160)
      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('turn', true)
    }

    if(cursor.up.isDown && this.player.body.touching.down){
      this.player.setVelocityY(-330)
    }
  }
}