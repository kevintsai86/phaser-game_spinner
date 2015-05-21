'use strict';

function Question() {}
Question.prototype = {
	preload: function () {
		/*this.load.json('json', 'game/questions.json');
		this.load.json('samplejson', 'game/sample.json');*/
	},
	create: function() {
		var style = { font: '20px Arial', fill: '#ffffff', align: 'center'};
		var resultStyle = { font: '32px Arial', fill: '#ffffff', align: 'center'};
		/*this.picture = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'sample');
		this.picture.anchor.setTo(0.5, 0.5);
		this.picture.alpha = 0.3;*/
		//next bit should parse the json file but it's not working...
		// this.thing = JSON.parse(game.cache.getText)
		/*game.cache._text['json'] = JSON.parse(game.cache.getText('json'));
		this.questjson = JSON.parse(game.cache.getText('json').sample[0].question);
		// var questions = game.cache.getText('json').sample[0].question;*/

		// this.hello = game.cache.getJSON('samplejson');
		/*$.getJSON("../assets/scripts/sample.json", function(result){
	            this.samplejson += JSON.parse(result);
	            console.log(this.samplejson);
	    });*/

		//holding variables
		this.questions = 'A box without treasure, key, or lid, yet golden treasure inside is hid. What am I?';
		this.choices =  ["Egg", "Cheese", "Honey", "Lemon"];
		this.answers = 'Egg';

		// hardcode: outputs the choices onto screen
		this.questText = this.game.add.text(this.game.world.centerX, 100, this.questions, style);
    	this.questText.anchor.setTo(0.5, 0.5);
    	for (var i = 0; i < this.choices.length; i++){
    		this.answ = this.game.add.text(100, 250 + (50 * i), i + '. ' + this.choices[i], style);
    		// this.answ.events.onInputDown.add(this.checkAnswer(i), this);
    	}
	},
	update: function() {
		if(this.game.input.activePointer.justPressed()) {
      		this.nextSpin();
    	}
	},
	checkAnswer: function(i) {
		if ( this.answ[i] === this.answers){
			this.results = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Correct!', resultStyle);
		}else{
			this.results = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Incorrect...', resultStyle);
		}
	},
	nextSpin: function() {
		this.game.state.start('play');
	}
};

module.exports = Question;