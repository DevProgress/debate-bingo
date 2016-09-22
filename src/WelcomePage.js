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
                    <span>(You can only play one card at a time)</span>
                </div>
                <ul className="homepage-button-wrapper">
                    <li>
                        <a href="#" onClick={this.selectCard} id="hillary">
                            <img src="images/hillary.png" alt="Image of Hillary Clinton" />
                            <span>Hillary Clinton</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={this.selectCard} id="trump">
                            <img src="images/trump.png" alt="Image of Donald Trump" />
                            <span>Donald Trump</span>
                        </a>
                    </li>
                </ul>
                <Footer heading="Share Debate Bingo!" title="Debate Bingo!"/>
            </div>
        );
    }
    selectCard(evt) {
        let cardType = (evt.target.tagName === "IMG" || evt.target.tagName === 'SPAN') ? evt.target.parentNode.id : evt.target.id;
        this.props.onCardTypeSelected(cardType);
    }
}
