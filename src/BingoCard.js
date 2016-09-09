import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import BingoRow from './BingoRow';

const CARD_DATA_API = "api/getCardData";
const EMPTY_BOARD = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, -1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

export default class BingoCard extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            daubs: BingoCard.clone2DArray(EMPTY_BOARD),
            isBingo: false
        };
        autoBind(this);
    }
    componentDidMount() {
        this.loadCard(function(data) {
            this.setState({data: data});
        }.bind(this));
    }
    loadCard(onSuccess) {
        let getCardDataUrl = `${CARD_DATA_API}/${this.props.type}`;
        $.ajax({
            url: getCardDataUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                data.splice(12, 0, {text: 'Free space!', colorClass: ''});
                onSuccess(data);
            },
            error: function(xhr, status, err) {
                console.error(getCardDataUrl, status, err.toString());
            }.bind(this)
        });
    }
    render() {
        let bingoOverlay = !this.state.isBingo ? null : (
            <div className="bingoOverlay">
                <h2>Bingo!</h2>
                <p>
                    <a href="#" onClick={this.props.onPlayAgainRequested}>Play again</a>
                </p>
            </div>
        );
        let rows = BingoCard.generateRowsFromArray(this.state.data);
        let bingoRows = rows.map(function(row, i) {
            let key = `row-${i}`;
            return (
                <BingoRow tiles={row} rowIndex={i} daubs={this.state.daubs} onTileDaubed={this.handleTileDaubed.bind(this, i)} key={key} />
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
        let newDaubs = BingoCard.clone2DArray(this.state.daubs);
        newDaubs[row][col] = newDaubs[row][col] === 0 ? 1 : 0;
        this.setState({daubs: newDaubs});
        setTimeout(function() { this.checkBingo(row, col) }.bind(this), 0);
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
            return val === 1 || val === -1;
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
        let newDaubs = BingoCard.clone2DArray(this.state.daubs);
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
    static clone2DArray(arr) {
        return arr.map(function(row) {
            return row.slice();
        });
    }
    static generateRowsFromArray(arr) {
        let ret = [];
        for(let i=0; i<5; i++) {
            ret.push(arr.slice(i*5, (i*5)+5));
        }
        return ret;
    }
}
