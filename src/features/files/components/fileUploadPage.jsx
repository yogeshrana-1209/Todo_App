import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getError, getStatus, uploadFile } from "../store/fileSlice";

const FileUploadPage = () => {
    const dispatch = useDispatch();
    const status = useSelector(getStatus);
    const error = useSelector(getError); // Now used correctly

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        trigger,
    } = useForm();

    const onSubmit = (data) => {
        dispatch(uploadFile(data.file[0])).then(() => {
            reset();
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 m-40 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Upload File</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700">File</label>
                    <input
                        type="file"
                        {...register("file")}
                        className="w-full px-3 py-2 border rounded-lg"
                        onChange={(e) => {
                            setValue("file", e.target.files);
                            trigger("file");
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg"
                    disabled={status === "loading"}
                >
                    {status === "loading" ? "Uploading..." : "Upload"}
                </button>
            </form>

            {/* ✅ Display error message if it exists */}
            {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        </div>
    );
};

export default FileUploadPage;
