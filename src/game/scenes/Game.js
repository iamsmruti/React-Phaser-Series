import Phaser from "phaser";

export class Game extends Phaser.Scene {
  platforms
  player
  cursor
  stars
  score = 0
  scoreText

  preload() {
    this.load.image('sky', 'assets/sky.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.image('platform', 'assets/platform.png')
    this.load.image('star', 'assets/star.png')

    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create() {
    this.add.image(400, 300, 'sky')

    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(400, 568, 'platform').setScale(3).refreshBody()

    this.platforms.create(600, 400, 'platform')
    this.platforms.create(50, 250, 'platform')
    this.platforms.create(750, 220, 'platform')

    this.player = this.physics.add.sprite(100, 200, 'dude')
    this.player.setBounce(0.2)

    this.player.setCollideWorldBounds(true)


    this.anims.create({
      key: 'right', 
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8}),
      frameRate: 10, 
      repeat: -1
    })

    this.anims.create({
      key: 'left', 
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3}),
      frameRate: 10, 
      repeat: -1
    })

    this.anims.create({
      key: 'turn', 
      frames: [ {key: 'dude', frame: 4}],
      frameRate: 30, 
    })

    this.physics.add.collider(this.platforms, this.player)

    this.cursor = this.input.keyboard.createCursorKeys()

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 15,
      setXY: {x: 12, y: 0, stepX: 60}
    })

    this.stars.children.iterate((child) => {
      child.setBounce(Phaser.Math.FloatBetween(0.2, 0.8))
    })

    this.physics.add.collider(this.stars, this.platforms)

    this.physics.add.overlap(this.player, this.stars, this.collectStars, null, this)

    this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, {
      fontSize: '40px',
      fill: '#000000'
    })
  }

  collectStars(player, star) {
    star.disableBody(true, true)

    this.score += 10

    this.scoreText.setText(`Score: ${this.score}`)
  }

  update() {
    if(this.cursor.left.isDown) {
      this.player.setVelocityX(-160)
      this.player.anims.play('left', true)
    } else if(this.cursor.right.isDown) {
      this.player.setVelocityX(160)
      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('turn', true)
    }

    if(this.cursor.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-300)
    }
  }
}