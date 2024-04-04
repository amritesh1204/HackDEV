// Whistleblow.jsx
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SendMessage from './Sendmessage';
export default function Whistleblow() {
  const navigate = useNavigate();

  function createRoom() {
    const roomID = generateRoomID();

    // Navigate to the created room
    navigate(`/room/${roomID}`);
  }

  // Function to generate a unique room ID (example)
  function generateRoomID() {
    return Math.random().toString(36).substring(2, 7); // Example: "3kj9v4"
  }

  return (
    <Container>
      <h1>Whistleblow</h1>
      <Button variant="primary" onClick={createRoom}>Create Room</Button>
      <SendMessage></SendMessage>
    </Container>
  );
}
