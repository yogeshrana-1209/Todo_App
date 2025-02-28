import { useDispatch, useSelector } from "react-redux";
import { getError, getStatus, uploadFile } from "../store/fileSlice";
import FileUpload from "../../../components/sharedComponent/ui/fileUpload";

const FileUploadPage = () => {
    const dispatch = useDispatch();
    const status = useSelector(getStatus);
    const error = useSelector(getError);

    const handleFileUpload = (fileData) => {
        dispatch(uploadFile(fileData));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Upload File</h2>
                <FileUpload onSubmit={handleFileUpload} status={status} error={error} />
            </div>
        </div>
    );
};

export default FileUploadPage;