'use strict';

var Spinner = function(game, x, y, frame) {
	this.center = Phaser.Sprite.call(this, game, x, y, 'centerBut', frame);
	this.center.anchor.setTo(0.5, 0.5);
	this.center.body.static = true;

  this.wheel = Phaser.Sprite.call(this, game, x, y, 'wheel', frame);

  // initialize your prefab here
  this.wheel.anchor.setTo(0.5, 0.5);
  // this.body.
  this.game.physics.p2.enable(wheel);

  // this.game.physics.p2.distanceConstraint(this, this.center, this.wheel, 0);
  
};

Spinner.prototype = Object.create(Phaser.Sprite.prototype);
Spinner.prototype.constructor = Spinner;

Spinner.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Spinner;
