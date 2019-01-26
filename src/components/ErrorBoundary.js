import React, { Component } from 'react'
import Message from './Message';
import { DiscordAPIError } from 'discord.js';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        }
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        const { channel } = this.props;
        const { error } = this.state;

        if (error) {
            return (
                <Message channel={channel}>
                    {"```\n"}
                    {error instanceof DiscordAPIError ? Object.values(error).join("\n") : error.toString()}
                    {"```"}
                </Message>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary