import React, { Component } from 'react'
import Chat from './Chat'

class ChatBubble extends Component {
    constructor(){
        super()

        this.state = {
            name: '', 
            display: 'nameinput'
        }

        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    updateName (value){
        this.setState({name: value})
    }

    startChat(){
        this.setState({display: 'chat'})
    }

    handleKeyPress(target) {
        if(target.charCod === 13){
            this.startChat()    
        }
    }

    render() {
        return (
            <div className="chat_body" >
                {this.state.display === 'nameinput' && 
                    <div className="chatbubble_input" >
                        <div className="chatbubble_title">Live Chat</div>
                        <div className="chatbubble_how">How can we assist you today?</div>
                        <div>Enter your name to start. </div>
                        <input placeholder="Enter your name here" value={this.state.name} onChange={e => this.updateName(e.target.value)} onKeyPress={this.handleKeyPress}/>
                        <button className="button" onClick={() => this.startChat()}>Start Chat</button>
                    </div>
                }
                {this.state.display === 'chat' &&
                    <Chat name={this.state.name}/>
                }
            </div>
        )
    }
}

export default ChatBubble