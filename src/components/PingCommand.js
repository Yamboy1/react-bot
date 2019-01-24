import React, { Component } from 'react'

import Command from './Command'
import Message from './Message'
import Emoji from './Emoji'

class PingCommand extends Component {
    render() {
        return (
            <Command>
                <Message channel={this.props.channel}>
                    <Emoji name="Untitled" /> Pong
                </Message>
            </Command>
        )
    }
}

export default PingCommand