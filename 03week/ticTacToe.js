'use strict';





const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

const printBoard= () => {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}
const resetGame = () =>{
  playerTurn="X";
  board.forEach(element => {
    element.fill(" ");
  });
  // finally using forEach loops :D
}

const isArrayAllEqual = (arr) => {
  return arr.every(element => element === arr[0] && element != " ")
  // used as the center peice to testing. Once I knew this worked, I made everything an array
  // and passed it to this function. Even to the point of making strings arrays and passing them in
}

const horizontalWin = () => {

  for(let i = 0;i<board.length;i++){
    return (isArrayAllEqual(board[i]))
    // go through every row and take that array and send it to our array tester
    // easiest case since they are all in the same array
    // console.log("Horizontal Win")
    // return 1;
  }
}

function verticalWin() {
  for(let i =0;i<board.length;i++){
    let stringOfVerticleElements = "";
    // making a string to turn into an array cause I didn't want to push to a temp array
    // vestigial c++ methods shining through 
    for(let j =0;j<board.length;j++){
      stringOfVerticleElements+=board[j][i];
    }
    if(stringOfVerticleElements.trim() != "" && isArrayAllEqual(stringOfVerticleElements.split(""))){
      // funny big of logic, but prevents trying to make an array out of empty string.
      // I end up double testing for empty string a lot of places, need to clean that up
      // console.log("Vertial Win")
      // keeping around for testing, delete when I can
      return 1;
    }
    stringOfVerticleElements = ""
    // reset the string builder
  }
}

function diagonalWin() {
  //left to right diaginal
  let stringToArrayHolder = "";
  //another string to array builder
  for(let i =0;i<board.length;i++){
    stringToArrayHolder+=board[i][i]
  }
  if(stringToArrayHolder.trim() != "" && isArrayAllEqual(stringToArrayHolder.split(""))){
    console.log("Diginal Win left to right")
    return 1;
  }
  stringToArrayHolder="";
  //right to left diaginal
  for(let j =0;j<board.length;j++){
    stringToArrayHolder+=board[j][(board.length-1)-j]
  }
  if(stringToArrayHolder.trim() != "" && isArrayAllEqual(stringToArrayHolder.split(""))){
    console.log("Diginal Win right to left")
    return 1;
  }
}

function checkForWin() {

  return verticalWin() || horizontalWin() || diagonalWin();
}


const whatIsAtPosition = (row, column)=>{
  if (row >= 0 && row < 3 && column>=0 && column<3){
    return board[row][column];
  }
  return "err"

  // This is tricky, there are 3 values this returns that are needed, an X/O, a blank or an 
  // index out of bounds. To prevent things from blowing up, I had to use
  // some short circut logic
}

const freeSpots= () =>{
  return board[0].filter(boardSpot => boardSpot == " ").length + 
  board[1].filter(boardSpot => boardSpot == " ").length + 
  board[2].filter(boardSpot => boardSpot == " ").length;
}

const switchPlayer = (playerTurn) => {
  if(playerTurn == "X"){
    return "O"
  }
  return "X"
}


function ticTacToe(row, column) {
  const formatedRow = parseInt(row);
  const formatedColumn = parseInt(column);
  if (whatIsAtPosition(formatedRow,formatedColumn)!= "err" && !whatIsAtPosition(formatedRow,formatedColumn).trim()){
    // strange big of not logic. Basically, if you don't get an error code and
    // the spot is blank do this block. The trim is because our blanks are technically
    // spaces. 
    board[formatedRow][formatedColumn] = playerTurn;
    if (checkForWin()){
      console.log("Congratulations, Player " + playerTurn + " wins!")
      resetGame();
    } else {
      if(freeSpots()){
        // console.log(freeSpots() + " moves remain");
        playerTurn = switchPlayer(playerTurn);
      } else {
        console.log("Game is a tie");
        resetGame();
      }
    }
  }else if (whatIsAtPosition(row,column) != "err"){
    // if we get this far, then the logic says it already isn't an error, so it must be a blank
    // can tests again for error or test for blank, I decided to test for error
    console.log("Spot contains an " + whatIsAtPosition(row,column) + ", please try again" );
  }else{
    // we have our X/O and blank conditons, so only error remains
    console.log("Selection out of bounds");
  }
}
// player 1 enters selects a tile
// we check to see if that is a valid selection isEmpty() t/f
// we check to see if they have won the game checkForWin() t/f
// if no valid moves, then its a tie
// if neither of those things, change the player switchPlayer() t/f
// we check to see if that is a valid selection isEmpty() t/f
// we check to see if they have won the game checkForWin() t/f
// check for win checks all directions individually win checkForWin() t/f
// if no valid moves then tie game
// reset game


function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
