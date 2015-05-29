
'use strict';

function Profile() {
}

Profile.prototype = {
  
  create: function() {
    this.playerName = '';
    this.playerAge = '';
    this.playerSex = '';
  }
};

module.exports = Profile;
