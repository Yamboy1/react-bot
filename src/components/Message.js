import React, { Component } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { htmlDecode } from '../utils'
import { client } from '../client';

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null,
            rejections: []
        }

        this.throw = this.throw.bind(this);
    }
    render() {
        return null;
    }
    throw(err) {
        console.log("throwing error...");
        throw err;
    }
    async componentDidMount() {
        try {

            if (this.props.channel) {
                const content = htmlDecode(renderToStaticMarkup(<>
                    {React.Children.toArray(this.props.children)}
                </>)).trim();

                this.setState({
                    message: await this.props.channel.send(content)
                });

            }

            if (this.state.message) {
                if (this.props.reactions) {
                    this.props.reactions.forEach(async reaction => {
                        await this.state.message.react(reaction);
                    });
                }

                if (this.props.onReactionCollect || this.props.onReactionRemove) {
                    this.collector = this.state.message.createReactionCollector((_, user) => user !== client.user, { dispose: true });
                
                    if (this.props.onReactionCollect) {
                        this.collector.on("collect", async (...args) => {
                            await this.props.onReactionCollect(...args)
                        });
                    }
                    
                    if (this.props.onReactionRemove) {
                        this.collector.on("remove", this.props.onReactionRemove);
                    }
                }
            }
        } catch (e) {
            this.setState(prev => ({
                rejections: [...prev.rejections, e]
            }));
        }
    }
    componentDidUpdate() {
        if (this.state.rejections.length > 0) {
            const currentRejection = this.state.rejections[0]; 
            this.setState(prev => ({
                rejections: prev.rejections.slice(1)
            }));
            throw currentRejection;
        }
        if (this.state.message) {
            const content = htmlDecode(renderToStaticMarkup(<>
                {React.Children.toArray(this.props.children)}
            </>)).trim();

            if (content !== this.state.message.content) {
                this.state.message.edit(content);
            }
        }
    }
    componentWillUnmount() {
        if (this.collector) {
            this.collector.removeAllListeners();
        }
    }
}

export default Message