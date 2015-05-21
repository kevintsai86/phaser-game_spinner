
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.loadText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 25, 'Loading...', {font: '20px Arial', fill: 'white'});
    this.loadText.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('yeoman', 'assets/yeoman-logo.png');
    this.load.image('wheel', 'assets/wheel.png');
    this.load.image('centerB', 'assets/button.png');
    this.load.image('sample', 'assets/sample.png');
    this.load.image('continue', 'assets/continue.png');


  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
