
  'use strict';
  //adding spinner prefab
  // var Spinner = require('../prefabs/spinner.js');
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.P2JS);

      //setting up the spinner assets
      this.spinner = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'wheel');
      this.spinner.anchor.setTo(0.5, 0.5);
      this.spinner.scale.x = 2;
      this.spinner.scale.y = 2;
      this.button = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'centerB')
      this.button.anchor.setTo(0.5, 0.5);
      this.button.scale.x = 2;
      this.button.scale.y = 2;
      this.button.inputEnabled = true;
      this.spinText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Spin');
      this.spinText.anchor.setTo(0.5, 0.5);
      //set up and apply physics to spinning portion
      this.game.physics.p2.enable(this.spinner);
      this.spinner.body.setCircle(100);
      this.spinner.body.angularDamping = 0.6;
      //removes pause on focus loss
      this.game.stage.disableVisibilityChange = true;

      //creates the spinner object
      // this.spinner = new Spinner(this.game.world.centerX, this.game.world.centerY);
      //and adds it to game
      // this.game.add.existing(this.spinner);

      this.button.events.onInputDown.add(this.clickListener, this);
      // this.spin();
    },
    update: function() {
      if(this.spinner.body.angularVelocity<0.2)
        this.spinner.body.angularVelocity = 0;
    },
    render: function(){
      this.game.debug.spriteInfo(this.spinner, 5, 16);
      this.game.debug.text("Angular Velocity: "+this.spinner.body.angularVelocity, 5, 80);
    },
    clickListener: function() {
      this.spin();
    },
    spin: function(){
      this.spinner.body.angularVelocity = Math.random()*10 + 15;
    }
  };
  
  module.exports = Play;