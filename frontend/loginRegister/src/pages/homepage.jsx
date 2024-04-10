// eslint-disable-next-line no-unused-vars
import React from 'react'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
// eslint-disable-next-line no-unused-vars
import Navbar from './navbar'
import Layout from './layout'
import '../styles/homepage.css'
import ActionProvider from './Actionprovider' 
import MessageParser from './Messageparser'
import config from './config';
export default function homepage() {
  return (
    <>
    <Layout>
      <div className='chatbot'>
    <Chatbot 
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
      </div>
      <div class="typewriter">
         <h1>For centuries, this secret society has silently watched over humanity, safeguarding it from the perilous machinations of power and corruption.

Founded in the ancient annals of history by visionary thinkers and mystics, The Guardians emerged as a response to the insatiable greed and lust for dominion that threatened to engulf civilizations. United by their unwavering commitment to justice and balance, they vowed to operate from the shadows, unseen and unheard, yet ever vigilant..</h1>
      </div>

    </Layout>
    </>
  )
}
