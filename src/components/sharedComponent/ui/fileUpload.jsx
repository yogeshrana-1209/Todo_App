import PropTypes from "prop-types";
import { useState } from "react";

const FileUpload = ({ onSubmit, status = "idle", error = null }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!file) {
            console.error("No file selected");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        onSubmit(formData);
        setFile(null);
        setFileName("");
    };

    return (
        <form onSubmit={submitHandler} className="space-y-4">
            <div>
                <label className="block text-gray-700 font-medium">Upload File</label>
                <input
                    type="file"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    onChange={handleFileChange}
                />
                {fileName && <p className="text-green-600 text-sm mt-1">Selected File: {fileName}</p>}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium transition duration-200 hover:bg-blue-700 disabled:bg-gray-400"
                disabled={status === "loading"}
            >
                {status === "loading" ? "Uploading..." : "Upload"}
            </button>

            {error && <p className="text-red-500 mt-2 text-center font-medium">Error: {error}</p>}
        </form>
    );
};

FileUpload.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    status: PropTypes.oneOf(["idle", "loading", "succeeded", "failed"]),
    error: PropTypes.string,
};

export default FileUpload;