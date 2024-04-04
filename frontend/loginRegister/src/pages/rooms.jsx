
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { io } from 'socket.io-client';

export default function Rooms() {
  const { roomID } = useParams();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const socket = io('http://localhost:3000');
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileData = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileContent: event.target.result,
      };
      socket.emit('fileUpload', { roomID, fileData });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>Room: {roomID}</h1>
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleFileUpload}>Upload File</Button>
    </div>
  );
}
