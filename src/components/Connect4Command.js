import React, { Component } from 'react'
import Command from './Command'
import GameBoard from './GameBoard'
import Message from './Message'

class Connect4Command extends Component {
    constructor(props) {
        super(props);

        const matrix = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ]

        this.state = {
            matrix,
            inputs: { 0: "1⃣", 1: "2⃣", 2: "3⃣", 3: "4⃣", 4: "5⃣", 5: "6⃣" }
        };

        this.handleReactionCollect = this.handleReactionCollect.bind(this);
    }
    render() {
        return (
            <Command>
                <Message
                    reactions={Object.values(this.state.inputs)}
                    onReactionCollect={this.handleReactionCollect}
                    channel={this.props.channel}>
                    <GameBoard matrix={this.state.matrix} />
                </Message>
            </Command>
        )
    }
    async handleReactionCollect(reaction, user) {
            await reaction.message.reactions.removeAll();
    }
}

export default Connect4Command