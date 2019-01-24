import React, { Component } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { htmlDecode } from '../utils'
import { client } from '../client';

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null
        }
    }
    render() {
        return "";
    }
    async componentDidMount() {
        if (this.props.channel) {
            const content = renderToStaticMarkup(<>
                {React.Children.toArray(this.props.children)}
            </>);

            this.setState({
                message: await this.props.channel.send(htmlDecode(content))
            });

        }

        if (this.state.message) {
            if (this.props.reactions) {
                this.props.reactions.forEach(async reaction => {
                    await this.state.message.react(reaction);
                });
            }

            if (this.props.onReactionCollect || this.props.onReactionRemove) {
                const collector = this.state.message.createReactionCollector((_, user) => user !== client.user, { dispose: true });
            
                if (this.props.onReactionCollect) {
                    collector.on("collect", this.props.onReactionCollect);
                    console.log("creating.")
                }
                
                if (this.props.onReactionRemove) {
                    collector.on("remove", this.props.onReactionRemove);
                    console.log("creating..")
                }
            }
        }
    }
    async componentDidUpdate() {
        if (this.state.message) {
            const content = htmlDecode(renderToStaticMarkup(<>
                {React.Children.toArray(this.props.children)}
            </>));

            if (content !== this.state.message.content) {
                await this.state.message.edit(content);
            }
        }
    }
}

export default Message