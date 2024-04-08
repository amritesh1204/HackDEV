import React, { Component } from 'react';
import '../styles/p2p.css'; // Import CSS file
import ChatBox from './chatbox.jsx';
import Peer from 'peerjs';

class P2PMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatLog: [],
      peer: null,
      ownPeerId: '',
      remotePeerId: ''
    };
  }

  componentDidMount() {
    const peer = new Peer();

    peer.on('open', (ownPeerId) => {
      console.log('My peer ID is: ' + ownPeerId);
      this.setState({ ownPeerId });
    });

    peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        this.addChat('Peer', data);
      });
    });

    this.setState({ peer });
  }

  addChat = (name, message, alert = false) => {
    this.setState(prevState => ({
      chatLog: [...prevState.chatLog, {
        name,
        message,
        timestamp: Date.now(),
        alert
      }]
    }));
  }

  handleSend = (msg) => {
    const { peer, remotePeerId } = this.state;
    if (peer && remotePeerId) {
      const conn = peer.connect(remotePeerId);
      conn.on('open', () => {
        conn.send(msg);
        this.addChat('Me', msg);
      });
    }
  }

  handleRemotePeerIdChange = (event) => {
    this.setState({ remotePeerId: event.target.value });
  }

  render() {
    const { chatLog, ownPeerId, remotePeerId } = this.state;
    return (
      <div className="p2pmessage-container">
        <h1 className="p2pmessage-title">P2P Chat Example</h1>
        <div className="peer-id-container">
          <p>Your Peer ID: {ownPeerId}</p>
          <input
            type="text"
            placeholder="Enter remote peer ID"
            value={remotePeerId}
            onChange={this.handleRemotePeerIdChange}
          />
        </div>
        <ChatBox
          chatLog={chatLog}
          onSend={this.handleSend}
        />
      </div>
    );
  }
}

export default P2PMessage;
