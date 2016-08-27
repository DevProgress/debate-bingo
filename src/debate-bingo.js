import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles.scss';

const CARD_DATA_API = "api/getCardData";

let BingoCard = React.createClass({
    getInitialState: function() {
        return {
            rows: []
        };
    },
    componentDidMount: function() {
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
    },
    render: function() {
        let bingoRows = this.state.rows.map(function(row, i) {
            let key = `row-${i}`;
            return (
                <BingoRow tiles={row} key={key} />
            );
        });
        return (
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
        );
    }
});

let BingoRow = React.createClass({
    render: function() {
        let bingoTiles = this.props.tiles.map(function(tile, i) {
            let key = `tile-${i}`;
            return (
                <BingoTile colorClass={tile.colorClass} key={key}>
                    {tile.text}
                </BingoTile>
            );
        });
        return (
            <tr>
                {bingoTiles}
            </tr>
        );
    }
});

let BingoTile = React.createClass({
    render: function() {
        return (
            <td className={this.props.colorClass}>
                <a href="#">
                    {this.props.children}
                </a>
            </td>
        );
    }
});

ReactDOM.render(
    <BingoCard type="hillary" />,
    document.getElementById("content")
);