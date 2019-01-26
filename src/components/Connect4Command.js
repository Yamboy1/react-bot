import React, { Component } from 'react'
import Command from './Command'
import GameBoard from './GameBoard'
import Message from './Message'
import InfoText from './InfoText'

import { client } from '../client'

class Connect4Command extends Component {
    constructor(props) {
        super(props);

        this.infoText = {
            default: "Connect 4",
            p1_turn: "Player 1's turn",
            p2_turn: "Player 2's turn",
            reaction_load: "Loading Reactions"

        }

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
            inputs: new Map([["1⃣",0], ["2⃣",1], ["3⃣",2], ["4⃣",3], ["5⃣",4], ["6⃣",5]]),
            currentInfoText: "default",
            turn: 0,
            players: {
                1: client.users.find(user => user.tag === "Yamboy1#3959"),
                2: client.users.find(user => user.tag === "Yamboy1#3959")
            }
        };
        this.handleReactionCollect = this.handleReactionCollect.bind(this);
        this.handleReactionsLoaded = this.handleReactionsLoaded.bind(this);
        this.addCounter = this.addCounter.bind(this);
    }
    render() {
        
        return (
            <Command>
                <Message
                    reactions={[...this.state.inputs.keys()]}
                    onReactionsLoaded={this.handleReactionsLoaded}
                    onReactionCollect={this.handleReactionCollect}
                    channel={this.props.channel}>
                    <GameBoard matrix={this.state.matrix} />
                    <InfoText strings={this.infoText} current={this.state.currentInfoText} />
                </Message>
            </Command>
        )
    }
    async handleReactionCollect(reaction, user) {
        const { players, turn, inputs } = this.state;
        if (players[turn] && players[turn].id === user.id) {
            if (inputs.get(reaction.emoji.toString())) {
                this.addCounter(inputs.get(reaction.emoji.toString()), turn)
            }
        }
        await reaction.users.remove(user);
    }
    async handleReactionsLoaded() {
        this.setState({
            turn: 1
        });
    }
    addCounter(column, turn) {
        const { matrix } = this.state;

        for (let i = matrix.length-1; i > 0; i--) {
            if (matrix[column] === 0) {
                this.setState(prev => {
                    const newMatrix = [...prev.matrix];
                    newMatrix[i,column] = turn;
                    return {
                        matrix: newMatrix,
                        turn: turn === 1?2:1
                    };
                });
            }
        }
    }
}

export default Connect4Command