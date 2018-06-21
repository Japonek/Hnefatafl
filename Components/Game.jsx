import React from 'react';
import '../css/style.css';
import Board from './Board.jsx';
import FallenSoldierBlock from './FallenSoldiersBlock.jsx';
import initialiseChessBoard from './InitialiseChessBoard.jsx';
import iconsAttribution from "./iconsAttribution.jsx"
export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: initialiseChessBoard(),
            whiteFallenSoldiers: [],
            blackFallenSoldiers: [],
            player: 1,
            sourceSelection: -1,
            status: '',
            turn: 'white',
            kingPosition: 40
        }
    }
    handleClick(i) {
        const squares = this.state.squares.slice();
        if (this.state.sourceSelection === -1) {
            if (!squares[i] || squares[i].player !== this.state.player) {
                this.setState({status: "Wrong selection. Choose player " + this.state.player + " pieces."});
                squares[i] ? delete squares[i].style.backgroundColor : null;
            }
            else {
                squares[i].style = {...squares[i].style, backgroundColor: "RGB(111,143,114)"};
                this.setState({
                    status: "Choose destination for the selected piece",
                    sourceSelection: i
                });
            }
        }
        else if (this.state.sourceSelection > -1) {

            delete squares[this.state.sourceSelection].style.backgroundColor;
            if (squares[i] && squares[i].player === this.state.player) {
                this.setState({
                    status: "Wrong selection. Choose valid source and destination again.",
                    sourceSelection: -1,
                });
            }

            else {
                const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice();
                const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
                const isDestEnemyOccupied = squares[i] ? true : false;
                const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
                const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
                const isMoveLegal = this.isMoveLegal(srcToDestPath);

                if (isMovePossible && isMoveLegal) {

                    console.log(i)
                    if
                    (i + 1 <= 80 &&
                        (squares[i + 1] !== null && squares [i + 1].constructor.name !== 'King') &&
                        (squares[i + 1] !== null && squares[i + 1].player !== this.state.player) &&
                        (squares[i + 2] !== null && squares[i + 2].player === this.state.player) &&
                        (i + 2) % 9 !== 0
                    ) {
                        this.state.player === 1 ? blackFallenSoldiers.push(squares[i + 1]) : whiteFallenSoldiers.push(squares[i + 1])
                        squares[i + 1] = null
                    } else if
                    (i - 1 > -1 &&
                        (squares[i - 1] !== null && squares [i - 1].constructor.name !== 'King') &&
                        (squares[i - 1] !== null && squares[i - 1].player !== this.state.player) &&
                        (squares[i - 2] !== null && squares[i - 2].player === this.state.player) &&
                        i % 9 !== 0) {
                        this.state.player === 1 ? blackFallenSoldiers.push(squares[i - 1]) : whiteFallenSoldiers.push(squares[i - 1])
                        squares[i - 1] = null
                    } else if
                    (i + 9 <= 81 && i + 18 <= 81 &&
                        (squares[i + 9] !== null && squares [i + 9].constructor.name !== 'King') &&
                        (squares[i + 9] !== null && squares[i + 9].player !== this.state.player) &&
                        (squares[i + 18] !== null && squares[i + 18].player === this.state.player)) {
                        this.state.player === 1 ? blackFallenSoldiers.push(squares[i + 9]) : whiteFallenSoldiers.push(squares[i + 9])
                        squares[i + 9] = null
                    } else if (i - 9 > -1 && i - 18 > -1 &&
                        (squares[i - 9] !== null && squares [i - 9].constructor.name !== 'King') &&
                        (squares[i - 9] !== null && squares[i - 9].player !== this.state.player) &&
                        (squares[i - 18] !== null && squares[i - 18].player === this.state.player)) {
                        this.state.player === 1 ? blackFallenSoldiers.push(squares[i - 9]) : whiteFallenSoldiers.push(squares[i - 9])
                        squares[i - 9] = null
                    }

                    squares[i] = squares[this.state.sourceSelection];
                    squares[this.state.sourceSelection] = null;
                    let player = this.state.player === 1 ? 2 : 1;
                    let turn = this.state.turn === 'white' ? 'black' : 'white';
                    this.setState({
                        sourceSelection: -1,
                        squares: squares,
                        whiteFallenSoldiers: whiteFallenSoldiers,
                        blackFallenSoldiers: blackFallenSoldiers,
                        player: player,
                        status: '',
                        turn: turn
                    });


                    for (let i = 0; i < squares.length; i++) {
                        if (squares[i] !== null && squares[i].constructor.name === "King" &&
                            squares[i] === (squares[0] || squares[8] || squares[72] || squares[80])) {
                            if (!alert('White player wins!')) {
                                window.location.reload();
                            }
                            return
                        }

                        if (squares[i] != null && squares[i].constructor.name === "King" &&
                            (squares[i - 1] !== null && squares[i - 1].player === 2) &&
                            (squares[i + 1] !== null && squares[i + 1].player === 2) &&
                            (squares[i - 9] !== null && squares[i - 9].player === 2) &&
                            (squares[i + 9] !== null && squares[i + 9].player === 2)) {
                            if (!alert('Black player wins!')) {
                                window.location.reload();
                            }
                            return
                        }


                    }
                }
            }
        }
        else {
            this.setState({
                status: "Wrong selection. Choose valid source and destination again.",
                sourceSelection: -1,
            });
        }
    }


    isMoveLegal(srcToDestPath) {
        let isLegal = true;
        for (let i = 0; i < srcToDestPath.length; i++) {
            if (this.state.squares[srcToDestPath[i]] !== null) {
                isLegal = false;
            }
        }
        return isLegal;
    }

    render() {

        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board className="Board"
                               squares={this.state.squares}
                               onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <h3>Turn</h3>
                        <div id="player-turn-box" style={{backgroundColor: this.state.turn}}>

                        </div>
                        <div className="game-status">{this.state.status}</div>

                        <div className="fallen-soldier-block">

                            {<FallenSoldierBlock
                                whiteFallenSoldiers={this.state.whiteFallenSoldiers}
                                blackFallenSoldiers={this.state.blackFallenSoldiers}
                            />
                            }
                        </div>

                    </div>
                </div>
                <iconsAttribution/>
            </div>


        );
    }
}