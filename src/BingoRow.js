import React from 'react';
import ReactDOM from 'react-dom';
import BingoTile from './BingoTile';

export default class BingoRow extends React.Component {
    render() {
        let rowDaubs = this.props.daubs[this.props.rowIndex];
        let bingoTiles = this.props.tiles.map(function(tile, i) {
            let onTileDaubed = function() {
                return this.props.onTileDaubed(i);
            }.bind(this);
            let key = `tile-${i}`,
                isFreeSquare = this.props.rowIndex === 2 && i === 2,
                tileText = isFreeSquare ? 'Free Square!': tile.text,
                isFirstRow = this.props.rowIndex === 0,
                colorClass = isFirstRow ? tile.colorClass: "";
            return (
                <BingoTile
                    colorClass={colorClass}
                    isDaubed={rowDaubs[i] === 1 || isFreeSquare}
                    isHighlighted={rowDaubs[i] === 2}
                    isFreeSquare={isFreeSquare}
                    onTileDaubed={onTileDaubed}
                    key={key}
                    tileText={tileText}>
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
