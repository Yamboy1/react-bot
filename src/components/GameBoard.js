import React, { Component } from 'react'

class GameBoard extends Component {
    render() {
        return this.props.matrix.map(row => row.join(' ')).join('\n');
    }
}

export default GameBoard