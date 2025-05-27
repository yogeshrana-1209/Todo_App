import { useState, useRef, useEffect } from "react";
import * as Yup from "yup";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { getStatus, getError, uploadFile } from "../../../features/files/store/fileSlice";

const fileSchema = Yup.object().shape({
    file: Yup.mixed()
        .required("File is required")
        .test("fileSize", "File size too large (Max: 200KB)", (value) =>
            value && value.size <= 200 * 1024
        )
        .test("fileType", "Unsupported file format", (value) =>
            value && ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
        ),
});

const FileUpload = () => {
    const dispatch = useDispatch();
    const status = useSelector(getStatus);
    const error = useSelector(getError);

    const [fileName, setFileName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [validationError, setValidationError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (file) => {
        if (file) {
            fileSchema
                .validate({ file })
                .then(() => {
                    setFileName(file.name);
                    setValidationError("");
                    setSelectedFile(file);
                })
                .catch((err) => {
                    setValidationError(err.message);
                    setFileName("");
                    setSelectedFile(null);
                });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileChange(droppedFile);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setValidationError("No file selected");
            return;
        }
        dispatch(uploadFile(selectedFile));
    };

    useEffect(() => {
        if (status === "succeeded") {
            setFileName("");
            setSelectedFile(null);
            setValidationError("");
        }
    }, [status]);

    return (
        <form onSubmit={submitHandler} className="space-y-4">
            <div
                className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 cursor-pointer transition ${isDragging ? "border-blue-500 bg-blue-100" : "border-gray-900/25"
                    }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="text-center">
                    <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                    <div className="mt-4 flex text-sm text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 focus:outline-none hover:text-blue-500"
                        >
                            <span>Upload a file</span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                ref={fileInputRef}
                                onChange={(e) => handleFileChange(e.target.files[0])}
                            />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-600">PNG, JPG, or JPEG up to 200KB</p>
                    {fileName && <p className="text-green-600 text-sm mt-1">Selected File: {fileName}</p>}
                </div>
            </div>

            {validationError && <p className="text-red-500 text-sm">{validationError}</p>}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium transition duration-200 hover:bg-blue-700 disabled:bg-gray-400"
                disabled={status === "loading"}
            >
                {status === "loading" ? "Uploading..." : "Upload"}
            </button>

            {status === "loading" && <p className="text-center text-blue-500">Uploading, please wait...</p>}

            {error && <p className="text-red-500 mt-2 text-center font-medium">Error: {error}</p>}
        </form>
    );
};

export default FileUpload;
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
