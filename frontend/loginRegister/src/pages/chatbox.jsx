import React, { Component } from 'react';
import '../styles/Chatbox.css'; // Make sure this path is correct

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputMsg: ''
        };
    }

    // Example handler function for message submission
    handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to send message
        console.log(this.state.inputMsg);
        this.setState({ inputMsg: '' }); // Reset input after sending
    }

    render() {
        return (
            <div className="chatbox-container">
                <div className="messages-section">
                    {/* Messages display area */}
                    {/* This is a placeholder. You should populate this based on your application's state */}
                </div>
                <form className="message-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.inputMsg}
                        onChange={(e) => this.setState({ inputMsg: e.target.value })}
                        className="message-input"
                        placeholder="Type a message..."
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        );
    }
}

export default ChatBox;
