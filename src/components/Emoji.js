import React, { Component } from 'react'
import { client } from '../client'

class Emoji extends Component {
    render() {
        const { name, unicode } = this.props;
        let emoji;
        if (name) {
            emoji = client.emojis.find(emoji => emoji.name === name);
        } else if (unicode) {
            emoji = unicode;
        }
        if (emoji) return emoji.toString();
        throw Error("Emoji not found");
    }
}

export default Emoji