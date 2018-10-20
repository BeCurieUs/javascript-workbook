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
  let mainString = word.split("");
  const firstConsonants = mainString.splice(0,vowelPosition).join("");
  //not sure if there is a single line way to do this, settled on this. Still thinking about it
  mainString = mainString.join("") + firstConsonants + "ay"
  
  return mainString;
  
}

const checkValidString = (word,validString)=>{
  for(let i = 0 ; i<word.length;i++){
    //go through every letter in the word
    let letterIsValid = 0
    //assume the letter is invalid
    for(let j = 0; j < validString.length;j++){
      //go through every letter in validation string
      if(word[i]==validString[j]){
        //see if letter is a valid letter and override default
        letterIsValid = 1;
      }
    }
    if (!letterIsValid){
      //if letter is still invalid the entire string is invalid
      return 0;
    }
  }
  //if nothing is invalid, then everything is valid
  return 1;
}
const findFirstVowelPosition = (word)=>{
  const allVowels = ["a","e","i","o","u"]
  for(let i = 0 ; i<word.length;i++){
    //go through every letter in word
    for(let j = 0; j < allVowels.length;j++){
      //go through every vowel 
      if(word[i]==allVowels[j]){
        //on the first vowel we find, return word index
        return i;
      }
    }
  }
  //if no vowels found, return an unresonable index 
  return -1;
}

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
