'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [ 1],
  b: [],
  c: [4, 3, 2]
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
  console.log("When I move you move *just like that*")
  stacks[endStack].push(stacks[startStack].pop());
}

function isLegal(startStack, endStack) {
  const startLength = stacks[startStack].length;
  const endLength = stacks[endStack].length;
  const startLastElement = stacks[startStack][startLength-1]
  const endLastElement = stacks[endStack][endLength-1]
  // console.log("Start Length " + startLength + " and last value " + startLastElement);
  // console.log("End Length " + endLength + " and last value " + endLastElement);
  if(startLength > 0){
    // and we don't want to try and pop from an empty array so this is a stopgap measure
    if(endLength == 0 || endLastElement>=startLastElement){
      // now we do the normal tower of hanoi size comparison
      return true;
    } 
  }
}

const validLetter = (letterInput) =>{
  switch(letterInput.toLowerCase()){
    case "a":
    case "b":
    case "c":
      // console.log("valid letter");
      return true;
    default:
      return false;
  }
}

function checkForWin() {
  if(stacks["a"].length == 0 && stacks["b"].length == 0){
    return true;
  }
}

const resetGame = () => {
  while(stacks['c'].length>0){
    stacks['a'].push(stacks['c'].shift());
  }
}

  // let it begin!
  // We get user input from where they want to take from to where they want to put to (startStack, endStack)
  // We see if this is a legal move isLegal()T/F
  // if so we move the peiece movePiece() 
  // We see if this condition gives them a win (all stacked up properly on stack c) checkForWin()T/F
  // After they win reset the game
  // self challenge add harder difficulty by adding a disk after reset
  // add turn counter and give user feed back on what a perfect game is compared to theirs

function towersOfHanoi(startStack, endStack) {
  if(validLetter(startStack)&&validLetter(endStack)){
    if(isLegal(startStack, endStack)){
      if (startStack.toLowerCase() != endStack.toLowerCase()){
        movePiece(startStack, endStack)
        if(checkForWin()){
          console.log("You win, you rock at computer science!")
          resetGame();
        }
      }else{
        console.log("Dude, move the peice don't fondle it")
      }
    }else{
      console.log("Not valid move, can't move bigger numbers on top of smaller numbers and can't move empty rows at all!")
    }
  }else{
    console.log("Invalid letter")

  }
}



function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

// new

  describe('#validLetter()', () => {
    it('Should disallow invalid inputs', () => {
      assert.equal(isLegal('dog', 'b'), false);
      assert.equal(isLegal('a', 'even bigger dog'), false);
    });
  });

  describe('#resetGame()', () => {
    it('Should correctly reset stacks', () => {
      assert.deepEqual(stacks, { a: [4, 3, 2, 1], b: [], c: [] });
    });
  });


//new
  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });
  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [], c: [4, 3, 2] };
      assert.equal(checkForWin(), false);
      // I changed your victory condition to rod C
    });
  });

} else {

  getPrompt();

}
