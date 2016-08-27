import React from 'react';
import ReactDOM from 'react-dom';

const CARD_DATA_API = "api/getCardData";

let BingoCard = React.createClass({
    getInitialState: function() {
        return {
            rows: []
        };
    },
    componentDidMount: function() {
        let getCardDataUrl = `${CARD_DATA_API}?type=${this.props.type}`;
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
        let bingoRows = this.state.rows.map(function(row) {
            return (
                <BingoRow tiles={row.tiles} />
            );
        });
        return (
            <table>
                {bingoRows}
            </table>
        );
    }
});

let BingoRow = React.createClass({
    render: function() {
        let bingoTiles = this.props.tiles.map(function(tile) {
            return (
                <td>
                    <BingoTile colorClass={tile.colorClass}>
                        {tile.text}
                    </BingoTile>
                </td>
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
            <a href="#" className={this.props.colorClass}>
                {this.props.children}
            </a>
        );
    }
});

ReactDOM.render(
    <BingoCard type="democrat" />,
    document.getElementById("content")
);