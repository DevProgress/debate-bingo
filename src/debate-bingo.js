import React from 'react';
import ReactDOM from 'react-dom';

let BingoCard = React.createClass({
    render: function() {
        let bingoRows = this.props.rows.map(function(row) {
            return (
                <BingoRow tiles="{row.tiles}" />
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
                    <BingoTile color="{tile.color}">
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

ReactDOM.render(
    <h1>Hello world!</h1>,
    document.getElementById("content")
);

// Next step: keep going from here https://medium.com/@viatsko/react-for-beginners-part-1-setting-up-repository-babel-express-web-server-webpack-a3a90cc05d1e#64be