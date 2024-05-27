import React, { Fragment, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddUrl({ onUrlSubmit }) {
  const [inputUrl, setInputUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUrlSubmit(inputUrl);
  };

  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  return (
    <Fragment>
      <h2>Enter URL to get a detailed report</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Url"
          variant="outlined"
          fullWidth
          margin="normal"
          value={inputUrl}
          onChange={handleInputChange}
        />
        <Button
          sx={{backgroundColor:"#8d46d5"}}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Fragment>
  );
}

export default AddUrl;
