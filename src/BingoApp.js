import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import BingoCard from './BingoCard';
import WelcomePage from './WelcomePage';

export default class BingoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            playing: false,
            cardType: null
        };
        autoBind(this);
    }
    render() {
        if(this.state.playing) {
            return (
                <BingoCard type={this.state.cardType} onPlayAgainRequested={this.playAgain} />
            );
        }
        return (
            <WelcomePage onCardTypeSelected={this.selectCardType} />
        );
    }
    selectCardType(type) {
        this.setState({cardType: type, playing: true});
    }
    playAgain() {
        this.setState({playing: false});
    }
}