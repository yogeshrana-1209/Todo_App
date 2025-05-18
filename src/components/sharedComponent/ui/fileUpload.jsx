import { useState } from "react";
import PropTypes from "prop-types";

const FileUpload = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <input type="file" onChange={handleChange} />
      {file && (
        <p className="mt-2 text-sm text-gray-600">Selected File: {file.name}</p>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
};

export default FileUpload;
