import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import BingoRow from './BingoRow';

const CARD_DATA_API = "api/getCardData";
const EMPTY_BOARD = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

export default class BingoCard extends React.Component {
    constructor() {
        super();
        this.state = {
            rows: [],
            daubs: EMPTY_BOARD.slice(),
            isBingo: false
        };
        autoBind(this);
    }
    componentDidMount() {
        let getCardDataUrl = `${CARD_DATA_API}/${this.props.type}`;
        $.ajax({
            url: getCardDataUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({rows: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getCardDataUrl, status, err.toString());
            }.bind(this)
        });
    }
    render() {
        let bingoOverlay = !this.state.isBingo ? null : (
            <div className="bingoOverlay">
                <h2>Bingo!</h2>
            </div>
        );
        let bingoRows = this.state.rows.map(function(row, i) {
            let key = `row-${i}`;
            return (
                <BingoRow tiles={row} daubs={this.state.daubs[i]} onTileDaubed={this.handleTileDaubed.bind(this, i)} key={key} />
            );
        }.bind(this));
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>B</th>
                            <th>I</th>
                            <th>N</th>
                            <th>G</th>
                            <th>O</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {bingoRows}
                    </tbody>
                </table>
                {bingoOverlay}
            </div>
        );
    }
    handleTileDaubed(row, col) {
        if(this.state.isBingo) {
            return;
        }
        let newDaubs = this.state.daubs.slice();
        newDaubs[row][col] = newDaubs[row][col] === 0 ? 1 : 0;
        this.setState({daubs: newDaubs});
        this.checkBingo(row, col);
    }
    checkBingo(row, col) {
        if(this.checkRow(row)) {
            this.bingo('row', row);
        } else if(this.checkCol(col)) {
            this.bingo('col', col);
        } else if(this.checkTLBRDiag(row, col)) {
            this.bingo('tlbr');
        } else if(this.checkTRBLDiag(row, col)) {
            this.bingo('trbl');
        }
    }
    checkRow(row) {
        return this.state.daubs[row].every(function(val) {
            return val === 1
        });
    }
    checkCol(col) {
        for(let i=0; i<5; i++) {
            if(this.state.daubs[i][col] === 0) {
                return false;
            }
        }
        return true;
    }
    checkTLBRDiag(row, col) {
        if(row !== col) {
            return false;
        }
        for(let i=0; i<5; i++) {
            if(this.state.daubs[i][i] === 0) {
                return false;
            }
        }
        return true;
    }
    checkTRBLDiag(row, col) {
        if(row + col !== 4) {
            return false;
        }
        for(let r=0, c=4; r<5; r++, c--) {
            if(this.state.daubs[r][c] === 0) {
                return false;
            }
        }
        return true;
    }
    bingo(type, idx) {
        let newDaubs = this.state.daubs.slice();
        if(type === 'row') {
            for(let i=0; i<5; i++) {
                newDaubs[idx][i] = 2;
            }
        } else if(type === 'col') {
            for(let i=0; i<5; i++) {
                newDaubs[i][idx] = 2;
            }
        } else if(type === 'tlbr') {
            for(let i=0; i<5; i++) {
                newDaubs[i][i] = 2;
            }
        } else if(type === 'trbl') {
            for(let r=0, c=4; r<5; r++, c--) {
                newDaubs[r][c] = 2;
            }
        }
        this.setState({daubs: newDaubs, isBingo: true});
    }
}