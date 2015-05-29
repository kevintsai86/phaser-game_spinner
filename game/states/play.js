
  'use strict';
  //adding spinner prefab
  // var Spinner = require('../prefabs/spinner.js');
console.log(this);
  function Play() {
  }
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.P2JS);

      //setting up the spinner assets
      this.spinner = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, 'wheel');
      this.spinner.anchor.setTo(0.5, 0.5);
      this.spinner.scale.x = 2;
      this.spinner.scale.y = 2;
      this.button = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, 'centerB')
      this.button.anchor.setTo(0.5, 0.5);
      this.button.scale.x = 2;
      this.button.scale.y = 2;
      this.button.inputEnabled = true;
      this.spinText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 50, 'Spin');
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
      
      // display text
      this.dsplyText = this.game.add.text(100, 470, 'Spin the wheel!', {font: '20px Arial', fill: 'white'});
      this.dsplyText.inputEnabled = true;
      //listener for the spin button
      this.button.events.onInputDown.add(this.clickListener, this);
      // this.spin();
    },
    update: function() {
      if(this.spinner.body.angularVelocity > 0){
        //destroy button function
        //this.destroyContBtn();
        this.dsplyText.setText('Spinning...');
        if(this.spinner.body.angularVelocity<0.5){
        this.spinner.body.angularVelocity = 0;
        this.dsplyText.setText('The spinner has stopped at ' + this.spinner.body.angle);
        this.makeContBtn();
        // this.getQuestion();
        }
      }
    },
    render: function(){
      /*this.game.debug.spriteInfo(this.spinner, 5, 16);
      this.game.debug.text("Angular Velocity: "+this.spinner.body.angularVelocity, 5, 80);*/
    },
    clickListener: function() {
      this.spin();
    },
    spin: function(){
      this.spinner.body.angularVelocity = Math.random()*20 + 18;
    },
    destroyContBtn: function() {
      // asd
    },
    makeContBtn: function() {
      this.continueBtn = this.game.add.sprite(this.game.world.centerX, 520, 'continue');
      this.continueBtn.anchor.setTo(0.5, 0.5);
      this.continueBtn.inputEnabled = true;
      this.continueBtn.events.onInputDown.add(this.nextQuestion, this);
    },
    getQuestion: function() {
      $.getJSON("./assets/scripts/sample.json", function(result){
        console.log(this);
        Boot.questionObj.question = result.hello;
        console.log("result: "+result.hello);
        console.log("questionObj: "+questionObj.question);   
      });
    },
    nextQuestion: function() {
      this.game.state.start('question');
    }
  };
  
  module.exports = Play;