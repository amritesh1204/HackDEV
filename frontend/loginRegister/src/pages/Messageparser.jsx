// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.toLowerCase().includes('hello')) {
      actions.handleHello();
    }else if (message.toLowerCase().includes('what is this about')) {
        actions.sendMessage('This is a chatbot. How can I assist you?');
  } else if (message.toLowerCase().includes('team')) {
    actions.sendMessage("My creators are Chandan,Amritesh,Saakshi, Vrinda. It is a project for our Hack36 Entry")
  }
    else if (message.toLowerCase().includes('help'))
     {
      actions.sendMessage("You can refer to our readme in the github.")
    }


  else if (message.toLowerCase().includes('daddy')) {
    actions.sendMessage("Chandan 😜😂")
}
else if (message.toLowerCase().includes('features')){
  actions.sendMessage("P2p messaging, password is hashed,message broadcast,Board for scribble,Role based login,and yeah myself-the bot.You can download your signature in canvas. More features will be added soon.")


}
}
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;