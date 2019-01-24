import React, { Component } from 'react'
import Command from './Command';
import Message from './Message';

class ReactionCommand extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            initialReactions: ["🇦","🇧"]
        };

        this.handleReactionCollect = this.handleReactionCollect.bind(this);
        this.handleReactionRemove = this.handleReactionRemove.bind(this);
    }
    render() {
        return (
            <Command>
                <Message reactions={this.state.initialReactions}
                         onReactionCollect={this.handleReactionCollect}
                         onReactionRemove={this.handleReactionRemove}
                         channel={this.props.channel}>
                    {this.state.selected.length===0?"None":this.state.selected.map(element => element[0]).join()}
                </Message>
            </Command>
        );
    }
    handleReactionCollect(reaction, user) {
        const { selected } = this.state;
        if (reaction.me) {
            if (selected.findIndex(element => element[0].name === reaction.emoji.name) === -1) {
                this.setState(prev => {
                    return { selected: prev.selected.concat([[reaction.emoji, user]]) }
                });
            }
        }
        console.log(this.state);
    }
    handleReactionRemove(reaction, user) {
        const { selected } = this.state;
        if (reaction.me) {
            if (selected.findIndex(element => element[0].name === reaction.emoji.name && element[1].id === user.id) !== -1) {
                this.setState(prev => {
                    return { selected: prev.selected.filter(element => element[0].name !== reaction.emoji.name) }
                });
            }
        }
    }
}
export default ReactionCommand