// ChatBox.jsx
import React, { Component } from 'react';
import '../styles/Chatbox.css';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: '',
      minimized: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputMsg } = this.state;
    if (inputMsg.trim()) {
      this.props.onSend(inputMsg);
      this.setState({ inputMsg: '' });
    }
  };

  toggleMinimize = () => {
    this.setState((prev) => ({ minimized: !prev.minimized }));
  };

  render() {
    const { inputMsg, minimized } = this.state;

    if (minimized) {
      return (
        <div className="chatbox-minimized" onClick={this.toggleMinimize}>
          💬 Open Chat
        </div>
      );
    }

    return (
      <div className="chatbox-container">
        <div className="chatbox-header">
          <span className="chatbox-title">Chat with Helper</span>
          <button className="close-button" onClick={this.toggleMinimize}>×</button>
        </div>
        <div className="messages-section">
          {this.props.chatLog.map((message, index) => (
            <div
              key={index}
              className={`message-bubble ${
                message.name === 'You' ? 'own' : 'other'
              }`}
            >
              <strong>{message.name}:</strong> {message.message}
            </div>
          ))}
        </div>
        <form className="message-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => this.setState({ inputMsg: e.target.value })}
            className="message-input"
            placeholder="Write your message..."
          />
          <button type="submit" className="send-button">➤</button>
        </form>
      </div>
    );
  }
}

export default ChatBox;
