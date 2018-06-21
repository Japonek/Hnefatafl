import Piece from './Piece.jsx';

export default class Pawn extends Piece {
    constructor(player){
        super(player, (player === 1?  "https://upload.wikimedia.org/wikipedia/commons/9/90/Draughts_mlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/0/0c/Draughts_mdt45.svg"));

    }
    isMovePossible(src, dest,isDestEnemyOccupied){
        let mod = src % 9;
        let diff = 9 - mod;
        return ((Math.abs(src - dest) % 9 === 0&& !isDestEnemyOccupied)|| ((dest >= (src - mod) && dest < (src + diff))&&!isDestEnemyOccupied));
    }

    getSrcToDestPath(src, dest){
        let path = [], pathStart, pathEnd, incrementBy;
        if(src > dest){
            pathStart = dest;
            pathEnd = src;
        }
        else{
            pathStart = src;
            pathEnd = dest;
        }
        if(Math.abs(src - dest) % 9 === 0){
            incrementBy = 9;
            pathStart += 9;
        }
        else{
            incrementBy = 1;
            pathStart += 1;
        }

        for(let i = pathStart; i < pathEnd; i+=incrementBy){
            path.push(i);
        }
        return path;
    }

}