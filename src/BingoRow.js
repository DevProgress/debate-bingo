import React from 'react';
import ReactDOM from 'react-dom';
import BingoTile from './BingoTile';

export default class BingoRow extends React.Component {
    render() {
        let bingoTiles = this.props.tiles.map(function(tile, i) {
            let onTileDaubed = function() {
                return this.props.onTileDaubed(i);
            }.bind(this);
            let key = `tile-${i}`;
            return (
                <BingoTile
                    colorClass={tile.colorClass}
                    isDaubed={this.props.daubs[i] === 1}
                    isHighlighted={this.props.daubs[i] === 2}
                    onTileDaubed={onTileDaubed}
                    key={key}>
                    {tile.text}
                </BingoTile>
            );
        }.bind(this));
        return (
            <tr>
                {bingoTiles}
            </tr>
        );
    }
}