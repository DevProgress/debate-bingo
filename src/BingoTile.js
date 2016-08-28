import React from 'react';
import ReactDOM from 'react-dom';

export default class BingoTile extends React.Component {
    render() {
        let className = this.props.colorClass;
        if(this.props.isDaubed) {
            className += ' daubed';
        }
        if(this.props.isHighlighted) {
            className += ' highlighted';
        }
        return (
            <td className={className}>
                <button className="bingoTile" onClick={this.props.onTileDaubed}>
                    {this.props.children}
                </button>
            </td>
        );
    }
}