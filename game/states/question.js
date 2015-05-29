'use strict';

function Question() {}
Question.prototype = {
	preload: function () {

	},
	create: function() {
		var styly = { font: '20px Arial', fill: '#ffffff', align: 'center'};
		/*this.picture = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'sample');
		this.picture.anchor.setTo(0.5, 0.5);
		this.picture.alpha = 0.3;*/

		// console.log("outside: "+this.samplejson);
		//holding variables
		this.questions = 'A box without treasure, key, or lid, yet golden treasure inside is hid. What am I?';
		this.choices = ["Egg", "Cheese", "Honey", "Lemon"];
		this.answers = 'Egg';

		// hardcode: outputs the choices onto screen
		this.questText = this.game.add.text(this.game.world.centerX, 100, this.questions, styly);
    	this.questText.anchor.setTo(0.5, 0.5);
    	for (var i = 0; i < this.choices.length; i++){
    		this.addChoice(i, styly);
    	}

    	/*for (var num = 0; num < this.choices.length; i++) {
		  this.textArray[num] = this.game.add.text(100, 250 + (50 * num), (num+1) + '. ' + this.choices[num], styly);
		  this.textArray[num].name = this.choices;
		  this.textArray[num].inputEnabled = true;
		  this.textArray[num].events.onInputDown.add(this.dialogueNext, this);
		}*/
	},
	update: function() {
		/*if(this.game.input.activePointer.justPressed()) {
      		this.nextSpin();
    	}*/
	},
	addChoice: function(num, style) {
		this.answ = this.game.add.text(100, 250 + (50 * num), (num+1) + '. ' + this.choices[num], style);
    	this.answ.inputEnabled = true;
    	if (this.choices[num] === this.answers)
    		this.answ.events.onInputDown.add(this.rightListener, this);
    	else
    		this.answ.events.onInputDown.add(this.wrongListener, this);
    	
	},
	rightListener: function() {
		console.log('rightlistener went off');
		this.dsplyRight();
	},
	wrongListener: function() {
		this.dsplyWrong();
	},
	dsplyRight: function() {
		var resultStyle = { font: '32px Arial', fill: '#ffffff', align: 'center'};
		this.results = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Correct!', resultStyle);
		console.log('correct');
		this.results.anchor.setTo(0.5, 0.5);
	},
	dsplyWrong: function() {
		var resultStyle = { font: '32px Arial', fill: '#ffffff', align: 'center'};
		this.results = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Incorrect...', resultStyle);
		console.log('incorrect');
		this.results.anchor.setTo(0.5, 0.5);
	},
	/*dialogueNext: function(text, pointer) {
		var resultStyle = { font: '32px Arial', fill: '#ffffff', align: 'center'};
 		if (text.name === this.answers) { 
 			this.results = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Correct!', resultStyle);
			console.log('correct');

 		}
 		else{
 			this.results = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Incorrect...', resultStyle);
			console.log('incorrect');
 		}
 		this.results.anchor.setTo(0.5, 0.5);
	},*/
	nextSpin: function() {
		this.game.state.start('play');
	}
};

module.exports = Question;