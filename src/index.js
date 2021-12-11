import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';

const App = () => {
  return <Standard />;
};

const Standard = () => {
  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' };
  };

  const handleChangeStatus = ({ meta }, status) => {
    // console.log(status, meta);
  };

  const handleSubmit = (files) => {
    const f = files[0];
    console.log(f.file);
    f.remove();
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
