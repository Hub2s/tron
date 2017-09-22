// 1)créer le constructeur
// 2)Créer un TronGame
// 3)Créer un TronSubgame
// 4)afficher la board dans la consoele

function TronGame (){
  this.player1 = new Player ();
  this.player2 = new Player ();
  this.subgame = null;
}

function Player(){
  this.i = 0;
  this.j = 0;
  this.direction = null;
}

function TronSubgame (player1, player2){
  this.player1 = player1;
  this.player2 = player2;
  this.board = [];
  for (var j = 0; j < 30; j++){
    var row = [];
    for (var i = 0; i < 30; i++){
      row.push(null);
    }
    this.board.push(row);
  }
  // this.board[0][0] = {
  //   owner: player1,
  //   vehicle: true
  // };
  // this.board[29][29] = {
  //   owner: player2,
  //   vehicle: true
  // };

  this.player1.direction = 'right';
  this.player2.direction = 'left';
  this.player1.i = 0;
  this.player1.j = 0;
  this.player2.i = 29;
  this.player2.j = 29;

  this.board[this.player1.i][this.player1.j] = 1;
  this.board[this.player2.i][this.player2.j] = 2;

}

// Move the players to the next step
// Returns a string ("draw"|"player1"|"player2") if someone died
// Returns nothing otherwise
TronSubgame.prototype.goToNextStep = function() {
  switch (this.player1.direction) {
    case 'right':
      this.player1.j++;
      break;
    case 'down':
      this.player1.i++;
      break;
    case 'left':
      this.player1.j--;
      break;
    case 'up':
      this.player1.i--;
  }
  switch (this.player2.direction) {
    case 'left':
      this.player2.j--;
      break;
    case 'up':
      this.player2.i--;
      break;
    case 'right':
      this.player2.j++;
      break;
    case 'down':
      this.player2.i++;
  }
  // TODO: check is not anymore in the grid
  // TODO: draw case
  if (this.board[this.player1.i][this.player1.j] !== null) {
    return "player1";
  }
  if (this.board[this.player2.i][this.player2.j] !== null) {
    return "player2";
  }
  this.board[this.player1.i][this.player1.j] = 1;
  this.board[this.player2.i][this.player2.j] = 2;
};


var game = new TronGame();
var subgame = new TronSubgame(game.player1, game.player2);

Player.prototype.goLeft = function() {
  if (this.direction === 'up' || this.direction === 'down'){
    this.direction = 'left';
  }
};

Player.prototype.goRight = function() {
  if (this.direction === 'up' || this.direction === 'down'){
    this.direction = 'right';
  }
};

Player.prototype.goUp = function() {
  if (this.direction === 'left' || this.direction === 'right'){
    this.direction = 'up';
  }
};

Player.prototype.goDown = function() {
  if (this.direction === 'left' || this.direction === 'right'){
    this.direction = 'down';
  }
};

// -------------------------
// jQuery
// -------------------------

$(document).ready(function() {
    // $("#imagePlayer1").css({'transform': 'rotate(90deg)'});
    // $("#imagePlayer2").css({'transform': 'rotate(270deg)'});
    var refreshIntervalId = setInterval(function() {
      var winner = subgame.goToNextStep();
      if (winner) {
        // TODO: change the result according to winner value
        $('#game-board').html("<div class='result'>Player 1 wins</div>");
        clearInterval(refreshIntervalId); // Stop the setInterval
      }
      renderBoard();
    }, 300);

    $(document).keydown(function(event) {
      event.preventDefault();
      console.log(event.keyCode);
      switch (event.keyCode) {
        case 38:
          subgame.player2.goUp();
          break;
        case 40:
          subgame.player2.goDown();
          break;
        case 37:
          subgame.player2.goLeft();
          break;
        case 39:
          subgame.player2.goRight();
        }
        switch (event.keyCode) {
          case 83:
            subgame.player1.goUp();
            break;
          case 88:
            subgame.player1.goDown();
            break;
          case 87:
            subgame.player1.goLeft();
            break;
          case 67:
            subgame.player1.goRight();
        }
  });
});

function renderBoard() {
  for (var i = 0; i < subgame.board.length; i++) {
    for (var j = 0; j < subgame.board[i].length; j++) {
      if (subgame.board[i][j])
        $('.row:nth('+i+') .cell:nth('+j+')').addClass('player'+subgame.board[i][j]);
    }
  }
}
