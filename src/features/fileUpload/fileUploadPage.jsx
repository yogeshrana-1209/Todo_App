import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from './store/fileSlice';
import FileUpload from '../../components/sharedComponent/ui/fileUpload';

const FileUploadPage = () => {
  const dispatch = useDispatch();
  const { uploading, uploadedData, error } = useSelector((state) => state.file);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadFile(selectedFile));
      console.log('File upload initiated:', selectedFile);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">File Upload</h2>
      <FileUpload onFileSelect={handleFileSelect} />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>

      {uploadedData && (
        <p className="mt-4 text-green-600">File uploaded successfully: {uploadedData.fileName}</p>
      )}
      {error && <p className="mt-4 text-red-600">Error: {error.message || error}</p>}
    </div>
  );
};

export default FileUploadPage;
