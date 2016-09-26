import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import Footer from './components/Footer';

export default class WelcomePage extends React.Component {
    constructor() {
        super();
        autoBind(this);
    }
    render() {
        return (
            <div>
                <h1 className="blue-header"><span>2016</span></h1>
                <h1 className="blue-header"><span>Debate Bingo</span></h1>
                <div className="instructions">
                    <span><strong>Select a card</strong></span><br/>
                </div>
                <ul className="homepage-button-wrapper">
                    <li>
                        <a href="#" onClick={this.selectCard} id="hillary">
                            <img src="https://devprogress.us/debate-bingo/images/hillary-2x.png" alt="Image of Hillary Clinton" />
                            <span>Hillary Clinton</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={this.selectCard} id="trump">
                            <img src="https://devprogress.us/debate-bingo/images/trump-2x.png" alt="Image of Donald Trump" />
                            <span>Donald Trump</span>
                        </a>
                    </li>
                </ul>
                <Footer heading="Share Debate Bingo!" title="Make watching the presidential debate more fun! Play bingo with the common phrases Hillary and Trump will say during the debate and tweet along with #2016debatebingo" shortTitle="Have fun watching the debate! Play bingo with what Hillary &amp; Trump say! Tweet along with #2016debatebingo"/>
            </div>
        );
    }
    selectCard(evt) {
        let cardType = (evt.target.tagName === "IMG" || evt.target.tagName === 'SPAN') ? evt.target.parentNode.id : evt.target.id;
        ga('send', 'event', 'bingoCard', 'create', cardType);
        this.props.onCardTypeSelected(cardType);
    }
}
