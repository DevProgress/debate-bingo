import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import BingoRow from './BingoRow';
import Footer from './components/Footer'

const CARD_DATA_API = "api/getCardData";
const EMPTY_BOARD = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, -1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const hillaryData = [
"Yes we can",
"Everyone",
"Human rights",
"Immigration reform",
"Unions",
"Equality",
"Obamacare",
"Proud",
"Leadership",
"Diplomacy",
"Secretary of State",
"Senator",
"Diverse",
"Fair share",
"Shared values",
"Clean energy",
"Tomorrow",
"The future",
"Work together",
"Working families",
"Pathway to citizenship",
"Debt free college",
"Better together",
"Fair wages",
"Living wage",
"Equal pay",
"Paid leave",
"Renewable energy",
"American dream",
"Climate change",
"Affordable medicine",
"Right to vote",
"Voting rights act",
"Supreme court",
"Across the aisle",
"Women's rights",
"Glass ceiling",
"Infrastructure",
"Workforce",
"Middle class",
"It takes a village",
"Defeat ISIS",
"Prosperity",
"Diplomacy",
"Reproductive health",
"Opportunity",
"Education",
"Small business",
"Black lives matter",
"LGBT",
"President Obama",
"Affordable health care",
"Social security",
"Quality"];

const trumpData = [
"Believe me",
"Tremendous",
"Yuge",
"Many people",
"Losers",
"Wall",
"Businessman",
"Disgrace",
"Catastrophe",
"Muslims",
"Big league",
"Crooks",
"We're getting screwed",
"Make America great again",
"The best",
"Trump university",
"Melania",
"Ivanka",
"My hands",
"Fraud",
"Abuse",
"The media",
"Winning",
"I'm (very) rich",
"We don't win anymore",
"You're disgusting",
"You'll never get bored",
"Ivy league",
"The woman card",
"Putin",
"Stupid",
"Law and order",
"Incompetence",
"Stupidity",
"The worst",
"Weak",
"Mexicans",
"Not our friend",
"Like a dog",
"Ego",
"No amnesty",
"Deport/deportation",
"Haters",
"You're fired",
"Failed policy(ies)",
"Politically correct",
"Bad deal",
"Morons",
"My hair",
"Rigged election",
"Mental breakdown",
"Stamina",
"Illegal immigrants",
"Bernie",
"Dangerous",
"Lightweight",
"Big crowds",
"Amazing",
"Terrific",
"Thoughts and prayers",
"Trump",
"Zero",
"Big problem",
"Out of control",
"Insiders",
"Sabotage",
"Wall St.",
"Classy",
"Ashamed",
"Only I can",
"Neurotic",
"Fed up",
"Brexit"];

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
        function getRandomSet(arr, len) {
            if(len > arr.length) {
                throw 'len cannot exceed length of arr';
            }
            var ret = [];
            var used = [];
            for(var i=0; i<len; i++) {
                var idx;
                do {
                    idx = Math.floor(Math.random() * arr.length);
                } while(used.indexOf(idx) !== -1);
                used.push(idx);
                ret.push(arr[idx]);
            }
            return ret;
        }
        var cardData = [];
        if ((this.props.type == 'hillary') || (this.props.type == 'mixed')) {
            var cardTerms = hillaryData;
            for(var i=0; i<cardTerms.length; i++) {
                if(cardTerms[i] && !cardTerms[i].match(/^[\s]*$/)) {
                    cardData.push({text: cardTerms[i], colorClass: 'democrat'});
                }
            }
        }
        if ((this.props.type == 'trump') || (this.props.type == 'mixed')){
            var cardTerms = trumpData;
            for(var i=0; i<cardTerms.length; i++) {
                if(cardTerms[i] && !cardTerms[i].match(/^[\s]*$/)) {
                    cardData.push({text: cardTerms[i], colorClass: 'republican'});
                }
            }
        }
        var chosenTerms = getRandomSet(cardData, 24);
        chosenTerms.splice(12, 0, {text: 'Free space!', colorClass: ''});
        onSuccess(chosenTerms);
    }
    render() {
        let bingoImagePath = `images/${this.props.type}_win_sq_600x600.png`;
        let bingoOverlay = !this.state.isBingo ? null : (
            <div className="bingoOverlay">
                <h2>Bingo!</h2>
                <p>
                    <a href="#" onClick={this.props.onPlayAgainRequested}>Play again</a>
                </p>
                <div className="bingoImageOverlay">
                    <img src={bingoImagePath} className="bingoImage" alt={"Image of " + this.props.type} />
                </div>
                <Footer heading="Share your victory!" title="I won at debate bingo! Make watching the presidential debate more fun! Play bingo with the common phrases Hillary and Trump will say during the debate and tweet along with #2016debatebingo www.presidentialdebatebingo.com" shortTitle="I won at debate bingo! Play bingo with what Hillary &amp; Trump say! Tweet along with #2016debatebingo www.presidentialdebatebingo.com"/>
            </div>
        );
        let rows = BingoCard.generateRowsFromArray(this.state.data);
        let bingoRows = rows.map(function(row, i) {
            let key = `row-${i}`;
            return (
                <BingoRow tiles={row} rowIndex={i} daubs={this.state.daubs} onTileDaubed={this.handleTileDaubed.bind(this, i)} key={key} />
            );
        }.bind(this));
        let imagePath = `images/${this.props.type}-2x.png`,
            cardName;
        if (this.props.type === 'hillary') {
            cardName = 'Hillary Clinton';
        } else if (this.props.type === 'trump') {
            cardName = 'Donald Trump';
        } else {
            cardName = 'Hillary & Donald Mix';
        }
        let header = (
            <div className="card-name">
                <img src={imagePath} alt={"Image of " + cardName} />
                <span>{cardName}</span>
            </div>
        );
        return (
            <div className="bingo-card-wrapper">
                <div className="bingo-card-header">
                    <a href="#" onClick={this.props.onPlayAgainRequested}>Play new card</a>
                </div>
                {header}
                <table>
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
        ga('send', 'event', 'bingoCard', 'bingo', this.props.type);
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
