'use strict';


const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//hand 1 enters move already done for us
//hand 2 enters move already done for us
//check to see if moves are valid
//if the moves are invalid, redo moves
//check who won

function rockPaperScissors(hand1, hand2) {

  if (checkMove(hand1) && checkMove(hand2)){
    return checkWin(hand1, hand2);
  }else{
    return "Player has invalid move";
  }

}


const checkMove = (hand) =>{
  if (hand.toLowerCase().trim() == "scissors" 
  || hand.toLowerCase().trim() == "rock" 
  || hand.toLowerCase().trim() == "paper"){
    return true;
  }
}

const checkWin = (hand1,hand2) =>{
  let modulaHack = 0;

  if(hand1==hand2){
    return "It's a tie!";
  }
  const tempHand1 = moveToNumber(hand1);
  const tempHand2 = moveToNumber(hand2);
  //turning moves into values to do math on bellow

  modulaHack = (tempHand1 - tempHand2) % 3;
  if (modulaHack<0){
    modulaHack+=3;
  }
  //the way the math should work is anything that adds together and modulos with 3 to 1, the first player
  //wins. Sadly, modulo of negatives in javascript yields negative modulo, which is unlike how 
  //normal mathamatitians think of negative modulo. But if you just add back in the modulo number,
  //it yields the deseried value.
  //I learned this modulo trick back in computer science school for this game, sadly
  //the javascript implimentation for modulo of negative numbers makes it a bit more combersome to
  //pull off. Still, it beats a big ol long if statement! 

  if  (modulaHack==1) {
    return "Player 1 Wins!";
  }
  return "Player 2 Wins!";

}



const moveToNumber = (move) =>{
  switch(move.toLowerCase()) {
    case "rock":
        return 0;
    case "paper":
        return 1;
    case "scissors":
        return 2;
  }
}


function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
