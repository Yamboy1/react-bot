import React, { Component } from 'react'
import Emoji from './Emoji';

class GameBoard extends Component {
    render() {
        return this.props.matrix.map((row, rowIndex) => 
            row.map((item,itemIndex) => 
                <Emoji name={"c4_"+item} key={rowIndex+" "+itemIndex} />).concat("\n"));
    }
}

export default GameBoard