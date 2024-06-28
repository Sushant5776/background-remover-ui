import React, { useState } from 'react';
import axios from 'axios';
// import { saveAs } from 'file-saver';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [imageURL, setImageURL] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event) => {
    setImageURL('')
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setLoading(true)
    
    try {
      const response = await axios.post('https://bg-remover-api-djvzob3udq-el.a.run.app/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
      });
      console.log(response)
      const img_url = URL.createObjectURL(response.data)
      setImageURL(img_url)
      // saveAs(response.data, 'output.png')
      setUploadStatus('Done!')
      // setUploadStatus(`File uploaded successfully: ${response.data.filename}`);
    } catch (error) {
      setUploadStatus(`File upload failed: ${error.message}`);
    }
    setLoading(false)
  };

  return (
    <div style={{width: 'fit-content', margin: 'auto'}}>
      <h1>Background Remover AI (Just name)</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <p>{uploadStatus}</p>
      {selectedFile && <img width={256} style={{objectFit: 'contain'}} src={URL.createObjectURL(selectedFile)} alt='' />}
      {
        loading ? <p>Loading...</p> :
       imageURL ? <img width={256} style={{objectFit: 'contain'}} src={imageURL} alt='Upload Image to See Output' /> : <span>Upload Image and See Output.</span>}
    </div>
  );
};

export default ImageUpload;
