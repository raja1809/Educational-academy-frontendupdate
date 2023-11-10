import React, { useState } from 'react';
import "../index.css"

function DriveLinkConverter() {
  const [driveLink, setDriveLink] = useState('');
  const [convertedLink, setConvertedLink] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  const convertLink = () => {
    const match = driveLink.match(/\/d\/(.+?)(?:\/|\?|#|$)/);
    if (match && match[1]) {
      const imageId = match[1];
      const directLink = `https://drive.google.com/uc?export=view&id=${imageId}`;
      setConvertedLink(directLink);
      setShowOutput(true);
    } else {
      alert('Invalid Google Drive sharing link. Please enter a valid link.');
    }
  };

  const copyLink = () => {
    const convertedLinkField = document.getElementById('convertedLink');
    convertedLinkField.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
  };

  return (
    <div>
      <h1>Google Drive Link Converter</h1>
      <br/>
      <h2>Enter your Google Drive sharing link:</h2>
      <br/><div className='top'>
      <input
        type="text"
        value={driveLink}
        onChange={(e) => setDriveLink(e.target.value)}
        placeholder="https://drive.google.com/file/d/your-image-id/view?usp=sharing"
      />
      <button onClick={convertLink} className='add'>Convert</button>

      {showOutput && (
        <div className='top'>
          <h2>Converted link:</h2>
          <input
            type="text"
            id="convertedLink"
            value={convertedLink}
            readOnly
          />
          <button onClick={copyLink} className='add'>Copy</button>
        </div>
        
      )}</div>
    </div>
  );
}

export default DriveLinkConverter;
