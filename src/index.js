import React from 'react'
import { render } from './dom'
import { client } from './client'
import PingCommand from './components/PingCommand'
import ReactionCommand from './components/ReactionCommand'
import Connect4Command from './components/Connect4Command';
import ErrorBoundary from './components/ErrorBoundary';

client.on("ready", () => {
    console.log("Ready!");
});

client.on("message", async message => {
    const content = message.content.toLowerCase();
    const props = { channel: message.channel };

    const commands = new Map([["ping", PingCommand], ["reaction", ReactionCommand], ["c4", Connect4Command]]);

    const Command = commands.get(content);

    if (!Command) return;

    render(
        <ErrorBoundary channel={message.channel}>
            <Command {...props} />
        </ErrorBoundary>, message.id)
});