import React from 'react';
import ReactDOM from 'react-dom';

export default class BingoTile extends React.Component {
    render() {
        let className = this.props.colorClass,
            button = this.props.tileText;
        if(this.props.isDaubed) {
            className += ' daubed';
        }
        if(this.props.isHighlighted) {
            className += ' highlighted';
        }
        if(this.props.isFreeSquare) {
            className += ' free-square';
        }
        if (!this.props.isFreeSquare) {
            button = (
                <button className="bingoTile" onClick={this.props.onTileDaubed}>
                    {this.props.tileText}
                </button>
            );
        }
        return (
            <td className={className}>
                {button}
            </td>
        );
    }
}
