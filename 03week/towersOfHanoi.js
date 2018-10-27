'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece() {
  // Your code here

}

function isLegal() {


}




function checkForWin() {
  // Your code here

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

  if(isLegal(startStack, endStack)){
    movePiece(startStack, endStack)
    if(checkForWin()){
      resetGame();
    }
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

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('Should disallow invalid inputs', () => {
      assert.equal(isLegal('dog', 'b'), false);
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
    });
  });

} else {

  getPrompt();

}
