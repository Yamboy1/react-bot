import React, { Component } from 'react'
import Command from './Command'
import GameBoard from './GameBoard'
import Message from './Message'

class Connect4Command extends Component {
    constructor(props) {
        super(props);

        const matrix = Array(6).fill(
            Array(7).fill(0)
        );

        this.state = {
            matrix
        };
    }
    render() {
        return (
            <Command>
                <Message channel={this.props.channel}>
                    <GameBoard matrix={this.state.matrix} />
                </Message>
            </Command>
        )
    }
}

export default Connect4Command