import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';

export default class WelcomePage extends React.Component {
    constructor() {
        super();
        autoBind(this);
    }
    render() {
        return (
            <div>
                <h1>2016</h1>
                <h1>Debate Bingo</h1>
                <h2>Select a card</h2>
                <h3>(You can only play one card at a time)</h3>
                <ul>
                    <li className="democrat">
                        <a href="#" onClick={this.selectCard} id="hillary">
                            <img src="images/hillary.png" alt="Image of Hillary Clinton" />
                            Hillary Clinton
                        </a>
                    </li>
                    <li className="republican">
                        <a href="#" onClick={this.selectCard} id="trump">
                            <img src="images/trump.png" alt="Image of Donald Trump" />
                            Donald Trump
                        </a>
                    </li>
                    <li className="mixed">
                        <a href="#" onClick={this.selectCard} id="mixed">
                            <img src="images/mixed.png" alt="Image of Hillary Clinton and Donald Trump" />
                            Hillary &amp; Donald Mix
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
    selectCard(evt) {
        let cardType = evt.target.tagName === "IMG" ? evt.target.parentNode.id : evt.target.id;
        this.props.onCardTypeSelected(cardType);
    }
}