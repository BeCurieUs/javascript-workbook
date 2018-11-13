'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const pigLatinMyString = (word, vowelPosition)=>{
  if(vowelPosition == 0){
    return word + "yay"
  }
  return word.split("").slice(vowelPosition).join("") + word.split("").slice(0,vowelPosition).join("") + "ay"

  // REFACTORED
  // all the chaining! No more wasted memory, no more mutating. This is a much better solution, albit a little terce
}

const checkValidString = (word,validString)=>{

  return word.split("").every(primaryLetter => {
    // go through every letter in our Word Array and run this test, return ture if everything passes test
    return validString.split("").filter(validatorLetter => validatorLetter == primaryLetter).length>0
    // test creates new array with only matching letters, if you find at least one, we good.
  });

  // REFACTORED 
  // these 2 lines of code replace allll of this, channeling my inner Katie
  // Not only is this code shorter, but it is much easier to read. Every + fliter with some splits means you know you are
  // testing every position in one array to see if it is inside another array. You can see it in the symantic words!
  // I like this code much better
    
  // let letterIsValid = 0
  // for(let i = 0 ; i<word.length;i++){
  //   for(let j = 0; j < validString.length;j++){
  //     if(word[i]==validString[j]){
  //       letterIsValid = 1;
  //     }
  //   }
  //   if (!letterIsValid){
  //     return letterIsValid;
  //   }
  //   letterIsValid = 0
  // }
  // letterIsValid = 1;
  // return letterIsValid;

  // Keeping for now so I can show people :D
}

const findFirstVowelPosition = (word)=>{

  const allVowels = ["a","e","i","o","u"]

  // REFACTORED
  // using what I learned above, I have similar code to finding the first one.

  return  word.split("").map(primaryLetter => {
    // create new array of only valid vowel positions
    return allVowels.filter(validatorLetter => validatorLetter == primaryLetter).length>0
    // match a vowel in word to our allVowels array and throw true in an array
  }).indexOf(true) 
  // look for the first true and there you go
  // If this invovled HUGE strings we might reconsider this code as doubling up memory with duplicating it as an array
  // might be a poor choices. But for single words, the exchange in memory for readability is a win.


  // nuked codes, keeping to show others :D

  //for(let i = 0 ; i<word.length;i++){
    //     //go through every letter in word
    //     for(let j = 0; j < allVowels.length;j++){
    //       //go through every vowel 
    //       if(word[i]==allVowels[j]){
    //         //on the first vowel we find, return word index
    //         return i;
    //       }
    //     }
    //   }
    //   //if no vowels found, return an unresonable index 
    //   return -1;
    // }
}

//   

function pigLatin(word) {

  //plan
  // Check to see if input in valid
  // Find the position of the first vowel
  // String manipulation of the pig latin stuff with position

  //gonna use this over and over, might as well take up some memory! 
  const trimmedLowerWord = word.trim().toLowerCase();
  //debated on where to declare this, I decided to give control over the valid strigs to the logic controller
  //rather than the validation function
  const listOfValidLetters = "qwertyuiopasdfghjklzxcvbnm";
  if (checkValidString(trimmedLowerWord,listOfValidLetters)){
    // call this lots so decided to waste memory for processos cycles
    // I don't want to do array compaires mutiple times
    const myFirstVowelLocation = findFirstVowelPosition(trimmedLowerWord);
    if(myFirstVowelLocation == -1){
      return "No vowels in this string, please use normal English words";
    } else {
      return pigLatinMyString(trimmedLowerWord,myFirstVowelLocation);
    }
  } else {
    return "Has invalid characters";
  }

}




function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if(typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
