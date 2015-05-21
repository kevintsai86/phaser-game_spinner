(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'spinner');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  game.state.add('question', require('./states/question'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6,"./states/question":7}],2:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, 'Game', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Play', { font: '24px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);
    this.instructionsText.inputEnabled = true;
    this.instructionsText.events.onInputDown.add(this.startGame, this);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {

  },
  startGame: function() {
    this.game.state.start('play');
  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){

  'use strict';
  //adding spinner prefab
  // var Spinner = require('../prefabs/spinner.js');
  function Play() {}
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
        // this.dsplyText.events.onInputDown.add(this.nextQuestion, this);
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
    nextQuestion: function() {
      this.game.state.start('question');
    }
  };
  
  module.exports = Play;
},{}],6:[function(require,module,exports){

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

},{}],7:[function(require,module,exports){
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
},{}]},{},[1])