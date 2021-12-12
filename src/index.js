import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import axios from 'axios';

const App = () => {
  return <Standard />;
};

const Standard = () => {
  const API_ENDPOINT =
    'https://3mgeysntek.execute-api.us-east-2.amazonaws.com/default/getPresignedURL';

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' };
  };

  const handleChangeStatus = ({ meta }, status) => {
    // console.log(status, meta);
  };

  const handleSubmit = async (files) => {
    const f = files[0];
    console.log(f.file);
    // f.remove();

    // * GET request: presigned URL
    const response = await axios({
      method: 'GET',
      url: API_ENDPOINT,
    });

    console.log('Response', response);

    // * PUT request: upload file to S3
    const result = await fetch(response.data.uploadURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/zip',
      },
      body: f.file,
    });
    console.log('Result: ', result);
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      accept="application/zip"
      inputContent="Click to select Zip File or Drop Zip File"
      styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
    />
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
