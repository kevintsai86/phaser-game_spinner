
'use strict';

function Boot() {
	var questionObj;
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
  	this.questionObj = {"question":"","choices":"","answer":""};
  	
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;
