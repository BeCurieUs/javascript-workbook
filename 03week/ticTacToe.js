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

const verticalWin = () => {
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
    // I don't like the way I sloved this, likely to refactor
  }
}

const diagonalWin = () => {
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

const checkForWin = () => {

  return verticalWin() || horizontalWin() || diagonalWin();
}


const whatIsAtPosition = (row, column)=>{
  return board[row][column];


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

const validInput = (numToValidate) => {
  return numToValidate >= 0 && numToValidate < 3;
  //catches anything out of bounds. Previous parceInt already eliminated decimals
}


const ticTacToe = (row, column) => {
  const formatedRow = parseInt(row);
  const formatedColumn = parseInt(column);
  // parceInt removes leading 0s just to clean up the input a bit
  // will be used to test for special chars and other invalid selections in validInput
  if (validInput(formatedRow)&&validInput(formatedColumn)){
    if (whatIsAtPosition(formatedRow,formatedColumn) == " "){
      // simplified logic a lot by having a validator, check to see if blank, then move along
      board[formatedRow][formatedColumn] = playerTurn;
      if (checkForWin()){
        printBoard();
        // added per request :D
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
    }else{
      console.log("Spot contains an " + whatIsAtPosition(formatedRow,formatedColumn) + ", please try again" );
    }
  }else{
    console.log("Invalid Selection, please choose 0-2");
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


const getPrompt = () => {
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
