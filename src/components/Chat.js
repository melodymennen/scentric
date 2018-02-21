import React, { Component } from 'react'
import io from 'socket.io-client'

const socket = io()

class Chat extends Component {
  constructor(props){
    super(props)

    this.state = {
      body: '',
      messagesList: [],
      typers: []
    }

    this.typing = false
    this.lastTyping = 0

    this.send = this.send.bind(this)
    this.isTyping = this.isTyping.bind(this)
    this.isNotTyping = this.isNotTyping.bind(this)
    this.updateTyping = this.updateTyping.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount(){
    // Gets the messages on connection
    socket.emit('join')
    // Everyone including the sender
    socket.on('getMessage', messages => {
      this.setState({
        messagesList: messages
      })
    })

    // Everyone but the sender
    socket.on('newTyper', name => {
        let newTypers = this.state.typers
        newTypers.push(name)
        this.setState({
          typers: newTypers
        })
    })

    socket.on('oldTyper', name => {
      var newerTypers = this.state.typers
      newerTypers.forEach((e, i, a) => {
        if(e === name){
          a.splice(i,1)
        }
      })
      this.setState({
        typers: newerTypers
      })
    })
  }

  send(){
    // Everyone including the sender
    socket.emit('sendMessage', {
      name: this.props.name,
      body: this.state.body
    })

    this.setState({
      body: ''
    })
  }

  isTyping(){
    this.typing = true
    socket.emit('typing', this.props.name)
  }

  isNotTyping(){
    this.typing = false
    socket.emit('stopTyping', this.props.name)
  }

  updateTyping(){
    if(!this.typing){
      this.isTyping()
    }
    this.lastTyping = (new Date()).getTime()
    setTimeout(() => {
      var newTyping = (new Date()).getTime()
      var timeDiff = newTyping - this.lastTyping
      if(timeDiff >= 500 && this.typing){
        this.isNotTyping()
      }
    }, 500)
  }

  handleKeyPress(target) {
    if(target.charCode === 13){
        this.send()
    }
}


  render() {
    const messageList = this.state.messagesList.map((e,i) => {
        return(
          <div key={i} className="messageholder">
            <div className="messagename">{e.name}:</div>
            <div className="messagebody">{e.body}</div>
          </div>
        )
    })

    const typersList = this.state.typers.map((e, i) => {
      return(
        <div className="typer" key={i}>{e} is typing...</div>
      )
    })


    return(
        <div className="papa">
            <div className="chatholder">
                {messageList}
            </div>
            <div className="typersholder">
                {typersList}
             </div>
             <div className="inputsholder" >
                <input className="inputbody" placeholder="Message" onKeyUp={this.updateTyping} value={this.state.body} onChange={e => this.setState({body: e.target.value})} onKeyPress={this.handleKeyPress}/>
                <button className="button" onClick={this.send}>SEND</button>
            </div>
        </div>
    )
  }
}

export default Chat