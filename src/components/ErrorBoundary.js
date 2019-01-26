import React, { Component } from 'react'
import Message from './Message'
import { DiscordAPIError } from 'discord.js'
import util from 'util'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            info: null
        }
    }
    componentDidCatch(error, info) {
        this.setState({
            error,
            info
        })
    }
    render() {
        const { channel } = this.props;
        const { error, info } = this.state;

        if (error) {
            return (
                <Message channel={channel}>
                    {"```\n"}
                    {error instanceof DiscordAPIError ? Object.values(error).join("\n") : error.toString()}
                    {info.componentStack}
                    {"```"}
                </Message>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary