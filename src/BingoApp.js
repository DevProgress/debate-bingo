import React from 'react';
import ReactDOM from 'react-dom';
import BingoCard from './BingoCard';

export default class BingoApp extends React.Component {
    render() {
        // TODO: make this more than just a loader for a static card
        return (
            <BingoCard type="hillary" />
        );
    }
}