import React, { useState } from 'react';
import axios from 'axios';

function Temp() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file);
    axios.post('/upload', formData)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
export default Temp;