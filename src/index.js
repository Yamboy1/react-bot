import React from 'react'
import { render } from './dom'
import { client } from './client'
import PingCommand from './components/PingCommand'
import ReactionCommand from './components/ReactionCommand'

client.on("ready", () => {
    console.log("Ready!");
});

client.on("message", async message => {
    if (message.content.toLowerCase() === "ping") {
        render(<PingCommand channel={message.channel} />, message.id);
    } else if (message.content.toLowerCase() === "reaction") {
        render(<ReactionCommand channel={message.channel}/>, message.id);
    }
});