
import King from './King.jsx';

import Pawn from './Pawn.jsx';


export default function initialiseChessBoard(){
    const squares = Array(81).fill(null);


      const arrayBlack=[3,4,5,13,27,35,36,37,43,44,45,53,67,75,76,77]
    for(let i=0;i<arrayBlack.length;i++){
            squares[arrayBlack[i]]=new Pawn(2)
    }
    const arrayWhite=[22,31,38,39,41,42,49,58]
    for(let i=0;i<arrayWhite.length;i++){
        squares[arrayWhite[i]]=new Pawn(1)
    }


    squares[40] = new King(1);

    return squares;
}