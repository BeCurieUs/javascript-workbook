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
    // direction 1 is going south, direction -1 goes north and direction 0 is a king piece
    this.id = id;
    this.kingSymbol=king;

    // a more complicated checkers object than orignially planned. Likely a smarter way to do direction, but
    // this will do. I leave symbol alone for kings becuse the symbol logic is essentual logic 
    // to the core of the movemement system. 
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

  clearBoard(){
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        this.grid[row][column]=null;
      }
    }
    this.checkers=[];
  }

  movePiece(fromWhere,toWhere){
    this.grid[toWhere[0]][toWhere[1]] = this.grid[fromWhere[0]][fromWhere[1]];
    this.grid[fromWhere[0]][fromWhere[1]]=null;
    if (Math.abs(Number(fromWhere[0])-Number(toWhere[0])) == 2){
      const theInbwteenPlace = ((Number(fromWhere)+Number(toWhere))/2).toString()
      this.deleteThisChecker(this.grid[theInbwteenPlace[0]][theInbwteenPlace[1]],theInbwteenPlace)
    }
    // move logic moves pieces and deletes any jumped places inbetween by taking the average of the 2 moves
  }
  isValid (num1){
    //used for strings
    const rowNumber = Number(num1[0]);
    const colNumber = Number(num1[1]);
    return  num1.length==2 && rowNumber>=0 && rowNumber<8 && colNumber>=0 && colNumber<8;
    // I should have just internally delt with row colum as individual numbers, I started to later
    // but vistigial functionality of the string version of row/col still remain.
  }

  isValidRowCol(rowNumber,colNumber){
    //used for disasembled numbers...I should have done this sooner, vistigial strings hard to read
    return  rowNumber>=0 && rowNumber<8 && colNumber>=0 && colNumber<8;
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
            // added catch for kings. now displays king symbol properly without interfearing with
            // normal symbol logic for movements
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
      // making 24 checker object pieces
      if(pieceMaker<12){
        // make 12 of them team X, moving south on the board with and idea equal to the piece number 
        // and give the king value a symbol
        const checker= new Checker("X",1,pieceMaker+1,"Ж")
        this.checkers.push(checker)
      }else{
        //see above but with team O and moving north, can make them all kings by making direction 0
        const checker = new Checker("O",-1,pieceMaker+1,"Ö")
        this.checkers.push(checker)
      }
    }
    let firstPieceRow = 0;
    let firstPieceColumn = 1;
    // postion for the first checker piece
    this.checkers.forEach((checkerPeice)=>{
      this.grid[firstPieceRow][firstPieceColumn] = checkerPeice;
      // asign the reference to same object in the checkers array piece holder
      firstPieceColumn+=2;
      // move 2 columns over, except...
      if(firstPieceColumn > 7 && firstPieceRow % 2 == 0){
      // if you hit the end of a row, cycle to the next row and reset to the beggining column if you came from
      // an even row. 
        firstPieceColumn=0;
        firstPieceRow++;
      }else if (firstPieceColumn > 7 && firstPieceRow % 2 == 1){
        // if you didn't come from an even row, you came from an odd row, to maintain the checker
        // pattern, go to the second column for the next placement
        firstPieceColumn=1;
        firstPieceRow++;
      }
      // and if you are at row 3, just skip to row 5
      if(firstPieceRow == 3) firstPieceRow=5
    })
    // this.deleteThisChecker(this.grid[5][0],"50")
    // this.deleteThisChecker(this.grid[6][1],"61")
    // this.deleteThisChecker(this.grid[7][0],"70")
    // this.deleteThisChecker(this.grid[1][6],"16")
    // this.deleteThisChecker(this.grid[0][7],"07")
    // this.deleteThisChecker(this.grid[2][7],"27")
    // clear side columns for easy king testing
  }

  deleteThisChecker(checkerObject,positionInGrid){
    delete this.grid[positionInGrid[0]][positionInGrid[1]];
    this.grid[positionInGrid[0]][positionInGrid[1]] = null;
    this.checkers.forEach( (checker,index)=>{
      if(checkerObject.id==checker.id){
        this.checkers.splice(index,1);
      }
    });

    // deletes from both checkers array and grid array. 
  }


  // list of helper functions to look the different checkers directions. This is where
  // I should have started doing numbers or for rows and columns rather than the
  // original strings. Will change over if I have time to update vistigial occurences.
  lookNorthEast(fromWhere){
    if(this.isValid(fromWhere)){
      // console.log("Looked North East, returning value")
      return this.grid[Number(fromWhere[0])-1][Number(fromWhere[1])+1]
    }
    // console.log("Looked North East, failed to find")
  }
  
  lookNorthWest(fromWhere){
    if(this.isValid(fromWhere)){
      // console.log("Looked North West, returning value")
      return this.grid[Number(fromWhere[0])-1][Number(fromWhere[1])-1]
    }
    // console.log("Looked North West, failed to find")

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
    // god I should have done this for all the code, will update to internal number use later
    // right now string literals are still heavily used. 

    const currentChecker = this.grid[currentRowNumber][currentColumnNumber];
    if(!currentChecker){
      // if where we are coming from is null or undefined, go ahead and return empty array
      return [];
    }
    const myDirection = this.grid[fromWhere[0]][fromWhere[1]].direction
    // our checkers piece current direction. 0 is king, 1 is south, -1 is north
    const validMoveList = [];
    // this will hold all our valid moves

    if(myDirection==1||myDirection==0&&currentRowNumber<7){
      // console.log("Attempting to head south")
      // direction 1 means you can only travel South, 0 is a king piece, can travel any direction
      // only 7 rows, so stopping this comparison before we go out of bounds stops some things from blowing up
      // 7 logic mighy now be redudant, needs testing
      if(this.lookSouthWest(fromWhere)===null){
        // console.log("Just checked it SouthWest Was Null")
        //look down and to the left, is it empty, if so, add it to the list of valid jumpable spots
        validMoveList.push((currentRowNumber+1).toString()+(currentColumnNumber-1).toString())
      } else if (this.lookSouthWest(fromWhere) && currentChecker.symbol && currentRowNumber <6){
        // look down and to the left, is there something there?
        // look at current position, does it have a symbol...not sure what this logic is here, have to test if it is neccisary, seems
        // redudant. I put it in with good cause at one point, that point seems to escape
        // console.log("Just did the elseif bellow check SouthWest Null")
        if(currentChecker.symbol != this.lookSouthWest(fromWhere).symbol &&
        !this.lookSouthWest((currentRowNumber+1).toString() + (currentColumnNumber-1).toString())){
          // console.log("Checked if symbols were different and there was a free spot")
          //look at where we are's symbol, look down and to the left's symbol. If they are opposite and if you look
          //down and to the left twice and there is nothing there, go ahead and add it to the list of allowable moves
          validMoveList.push((currentRowNumber+2).toString()+(currentColumnNumber-2).toString());
        }
      }

      // see comments above for enlightenment on the rest of the directions. 
      if (this.lookSouthEast(fromWhere)===null){
        // console.log("Just checked if SoutEast was null")
        validMoveList.push((currentRowNumber+1).toString()+(currentColumnNumber+1).toString())
      } else if (this.lookSouthEast(fromWhere) && currentChecker.symbol && currentRowNumber <6){
        // console.log("Just did else if bellow SouthEast Null")
        if(currentChecker.symbol != this.lookSouthEast(fromWhere).symbol &&
        !this.lookSouthEast((currentRowNumber+1 ).toString() + (currentColumnNumber+1).toString())){
          // console.log("Checked if symbols were different and there was a free spot")
          validMoveList.push((currentRowNumber+2).toString()+(currentColumnNumber+2).toString());
        }
      }
    }
    if (myDirection == -1||myDirection==0&&currentRowNumber>0){
      if(this.lookNorthWest(fromWhere)===null){
        // console.log("Just checked if NorthWest was null")
        validMoveList.push((currentRowNumber-1).toString()+(currentColumnNumber-1).toString())
      } else if (this.lookNorthWest(fromWhere) && currentChecker.symbol && currentRowNumber >1){
        if(currentChecker.symbol != this.lookNorthWest(fromWhere).symbol &&
        !this.lookNorthWest((currentRowNumber-1 ).toString() + (currentColumnNumber-1).toString())){
          validMoveList.push((currentRowNumber-2).toString()+(currentColumnNumber-2).toString());
        }
      }
      if (this.lookNorthEast(fromWhere)===null){
        // console.log("Just checked if NorthEast was null")
        validMoveList.push((currentRowNumber-1).toString()+(currentColumnNumber+1).toString())
      } else if (this.lookNorthEast(fromWhere) && currentChecker.symbol && currentRowNumber >1){
        if(currentChecker.symbol != this.lookNorthEast(fromWhere).symbol &&
        !this.lookNorthEast((currentRowNumber-1 ).toString() + (currentColumnNumber+1).toString())){
          validMoveList.push((currentRowNumber-2).toString()+(currentColumnNumber+2).toString());
        }
      }
    }
    // console.log(validMoveList)
    return validMoveList
  }

}

class Game {
  constructor() {
    this.board = new Board;
    this.playerTurn = 
  }
  start() {
    this.board.createGrid();
    this.board.placeStartPieces();
  }
  moveChecker(fromWhere,toWhere){
    if(this.board.isValid(fromWhere) && this.board.isValid(toWhere)){
      // no dumb stuff allowed
      if(this.board.arrayOfValidMoves(fromWhere).indexOf(toWhere)!=-1){
        // did you find toWhere in our list of valid moves? If so, proceed 
        this.board.movePiece(fromWhere,toWhere)
        // I like to move it move it.
        if(this.board.grid[toWhere[0]][toWhere[1]].direction==1 && Number(toWhere[0])==7){
          // if a southern moving piece gets to row 7, it is now a king, 0 direction is king
          this.board.grid[toWhere[0]][toWhere[1]].direction = 0
        }
        if(this.board.grid[toWhere[0]][toWhere[1]].direction==-1 && Number(toWhere[0])==0){
          // if a northern moving piece gets to row 0, king me. 
          this.board.grid[toWhere[0]][toWhere[1]].direction = 0
        }
        if(this.board.checkers.every( singleChecker => { return singleChecker.symbol == this.board.checkers[0].symbol } )){
          // look at all the remaining checkers pieces. if they all have the same symbol as the first
          // in the checkers array, then a player has been eliminated and the remaining player wins
          console.log("Player " + this.board.checkers[0].symbol + " wins!")
          this.board.viewGrid();
          this.board.clearBoard();
          this.board.placeStartPieces();
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
