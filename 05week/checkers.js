'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Checker {
  constructor(team,direction,id,king){
    this.symbol=team;
    this.direction=direction;
    this.id = id;
    this.kingSymbol=king;
  }
}



class Board {
  constructor() {
    this.grid = []
    this.checkers = [];
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }

  movePiece(fromWhere,toWhere){
    this.grid[toWhere[0]][toWhere[1]] = this.grid[fromWhere[0]][fromWhere[1]];
    this.grid[fromWhere[0]][fromWhere[1]]=null;
    if (Math.abs(Number(fromWhere[0])-Number(toWhere[0])) == 2){
      const theInbwteenPlace = ((Number(fromWhere)+Number(toWhere))/2).toString()
      this.deleteThisChecker(this.grid[theInbwteenPlace[0]][theInbwteenPlace[1]],theInbwteenPlace)
    }
  }
  isValid (num1){
    const rowNumber = Number(num1[0]);
    const colNumber = Number(num1[1]);
    return  num1.length==2 && rowNumber>=0 && rowNumber<8 && colNumber>=0 && colNumber<8;
  }

  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          if(this.grid[row][column].direction==0){
            rowOfCheckers.push(this.grid[row][column].kingSymbol);
          } else {
            rowOfCheckers.push(this.grid[row][column].symbol);
          }
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }
  placeStartPieces(){
    for(let pieceMaker = 0 ; pieceMaker < 24 ; pieceMaker++){
      if(pieceMaker<12){
        const checker= new Checker("X",1,pieceMaker+1,"Ж")
        // this is the 1 one
        this.checkers.push(checker)
      }else{
        const checker = new Checker("O",-1,pieceMaker+1,"Ö")
        // this is the -1 one
        this.checkers.push(checker)
      }
    }
    let firstPieceRow = 0;
    let firstPieceColumn = 1;
    this.checkers.forEach((checkerPeice)=>{
      this.grid[firstPieceRow][firstPieceColumn] = checkerPeice;
      firstPieceColumn+=2;
      if(firstPieceColumn > 7 && firstPieceRow % 2 == 0){
        firstPieceColumn=0;
        firstPieceRow++;
      }else if (firstPieceColumn > 7 && firstPieceRow % 2 == 1){
        firstPieceColumn=1;
        firstPieceRow++;
      }
      if(firstPieceRow == 3) firstPieceRow=5
    })
  }

  deleteThisChecker(checkerObject,positionInGrid){
    delete this.grid[positionInGrid[0]][positionInGrid[1]];
    this.grid[positionInGrid[0]][positionInGrid[1]] = null;
    this.checkers.forEach( (checker,index)=>{
      if(checkerObject.id==checker.id){
        this.checkers.splice(index,1);
      }
    });
  }

  lookNorthEast(fromWhere){
    if(this.isValid(fromWhere)){
      return this.grid[Number(fromWhere[0])-1][Number(fromWhere[1])+1]
    }
  }
  
  lookNorthWest(fromWhere){
    if(this.isValid(fromWhere)){
      return this.grid[Number(fromWhere[0])-1][Number(fromWhere[1])-1]
    }
  }
  
  lookSouthEast(fromWhere){
    if(this.isValid(fromWhere)){
      return this.grid[Number(fromWhere[0])+1][Number(fromWhere[1])+1]
    }
  }

  lookSouthWest(fromWhere){
    if(this.isValid(fromWhere)){
      return this.grid[Number(fromWhere[0])+1][Number(fromWhere[1])-1]
    }
  }

  arrayOfValidMoves(fromWhere){
    const currentRowNumber = Number(fromWhere[0]);
    const currentColumnNumber = Number(fromWhere[1]);
    const currentChecker = this.grid[currentRowNumber][currentColumnNumber];
    if(!currentChecker){
      // if where we are coming from is null or undefined, go ahead and return empty array
      return [];
    }
    const myDirection = this.grid[fromWhere[0]][fromWhere[1]].direction

    const validMoveList = [];

    if(myDirection==1||myDirection==0&&currentRowNumber<7){
      // direction 1 means you can only travel up the board, 0 is a king piece, can travel any direction
      // only 7 rows, so stopping this comparison before we go out of bounds stops some things from blowing up
      if(this.lookSouthWest(fromWhere)===null){
        //look down and to the left, is it empty, if so, add it to the list of valid jumpable spots
        validMoveList.push((currentRowNumber+1).toString()+(currentColumnNumber-1).toString())
      } else if (this.lookSouthWest(fromWhere) && currentChecker.symbol){
        // look down and to the left, is there something there?
        // look at current position, does it have a symbol...not sure what this logic is here, have to test if it is neccisary, seems
        // redudant. 
        if(currentChecker.symbol != this.lookSouthWest(fromWhere).symbol &&
        !this.lookSouthWest((currentRowNumber+1).toString() + (currentColumnNumber-1).toString())){
          //look at where we are's symbol, look down and to the left's symbol. If they are opposite and if you look
          //down and to the left twice and there is nothing there, go ahead and add it to the list of allowable moves
          validMoveList.push((currentRowNumber+2).toString()+(currentColumnNumber-2).toString());
          //look down and to the left, take this and send it to the glue factory, also send its current possition
        }
      }
      if (this.lookSouthEast(fromWhere)===null){
        // look down and to the right, if there is nothing there, go ahead and add it to the list of moves
        validMoveList.push((currentRowNumber+1).toString()+(currentColumnNumber+1).toString())
      } else if (this.lookSouthEast(fromWhere) && currentChecker.symbol){
        if(currentChecker.symbol != this.lookSouthEast(fromWhere).symbol &&
        !this.lookSouthEast((currentRowNumber+1 ).toString() + (currentColumnNumber+1).toString())){
          console.log("Sumbols there, comparing now")
          validMoveList.push((currentRowNumber+2).toString()+(currentColumnNumber+2).toString());
        }
      }
    }
    if (myDirection == -1||myDirection==0&&currentRowNumber>0){
      if(this.lookNorthWest(fromWhere)===null){
        validMoveList.push((currentRowNumber-1).toString()+(currentColumnNumber-1).toString())
      } else if (this.lookNorthWest(fromWhere) && currentChecker.symbol){
        if(currentChecker.symbol != this.lookNorthWest(fromWhere).symbol &&
        !this.lookSouthEast((currentRowNumber-1 ).toString() + (currentColumnNumber-1).toString())){
          validMoveList.push((currentRowNumber-2).toString()+(currentColumnNumber-2).toString());
        }
      }
      if (this.lookNorthEast(fromWhere)===null){
        validMoveList.push((currentRowNumber-1).toString()+(currentColumnNumber+1).toString())
      } else if (this.lookNorthEast(fromWhere) && currentChecker.symbol){
        if(currentChecker.symbol != this.lookNorthEast(fromWhere).symbol &&
        !this.lookSouthEast((currentRowNumber-1 ).toString() + (currentColumnNumber+1).toString())){
          validMoveList.push((currentRowNumber-2).toString()+(currentColumnNumber+2).toString());
        }
      }
    }
    console.log(validMoveList)
    return validMoveList
  }

}

class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.placeStartPieces();
  }
  moveChecker(fromWhere,toWhere){
    if(this.board.isValid(fromWhere) && this.board.isValid(toWhere)){
      if(this.board.arrayOfValidMoves(fromWhere).indexOf(toWhere)!=-1){
        this.board.movePiece(fromWhere,toWhere)
        if(this.board.grid[toWhere[0]][toWhere[1]].direction==1 && Number(toWhere[0])==7){
          this.board.grid[toWhere[0]][toWhere[1]].direction = 0
        }
        if(this.board.grid[toWhere[0]][toWhere[1]].direction==-1 && Number(toWhere[0])==0){
          this.board.grid[toWhere[0]][toWhere[1]].direction = 0
        }
        if(this.board.checkers.length==1){
          console.log("Player " + this.board.checkers[0].symbol + " wins!")
          this.board.viewGrid();
          this.board.deleteThisChecker(this.board.grid[toWhere[0]][toWhere[1]],toWhere)
          this.board.placeStartPieces()
        }
      }
    } else{
      console.log("Invlaid Move")
    }
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();

// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and murder another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
