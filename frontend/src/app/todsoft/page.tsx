'use client'
import React, { useState } from 'react';

function App() {
  const [binaryData, setBinaryData] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // Ensure file is selected
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBinaryData(reader.result); // Set the binary data as ArrayBuffer
      };
      reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleImageChange} />
      {binaryData && (
        <div>
          <h2>Binary Data:</h2>
          <p>{JSON.stringify(Array.from(new Uint8Array(binaryData)))}</p>
        </div>
      )}
    </div>
  );
}

export default App;
