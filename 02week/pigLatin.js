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
  mainString = mainString.join("") + firstConsonants + "ay"
  
  return mainString;
  
}

const checkValidString = (word,validString)=>{
  for(let i = 0 ; i<word.length;i++){
    let letterIsValid = 0
    for(let j = 0; j < validString.length;j++){
      if(word[i]==validString[j]){
        letterIsValid = 1;
      }
    }
    if (!letterIsValid){
      return 0;
    }
  }
  return 1;
}
const findFirstVowelPosition = (word)=>{
  const allVowels = ["a","e","i","o","u"]
  for(let i = 0 ; i<word.length;i++){
    for(let j = 0; j < allVowels.length;j++){
      if(word[i]==allVowels[j]){
        return i;
      }
    }
  }
  return -1;
}

function pigLatin(word) {

// Your code here
// Check to see if input in valid
// Find the position of the first vowel
// String manipulation of the pig latin stuff with position
const trimmedLowerWord = word.trim().toLowerCase();
const listOfValidLetters = "qwertyuiopasdfghjklzxcvbnm";
// I decided to make a more general case for the validation where we have a set of established
// things we know we want to be valid. It is like a DIY regular expression :D
if (checkValidString(trimmedLowerWord,listOfValidLetters)){
  const myFirstVowelLocation = findFirstVowelPosition(trimmedLowerWord);
  // wasting memory for processos cycles, I don't want to do array compaires mutiple times
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
