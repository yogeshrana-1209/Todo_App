import PropTypes from "prop-types";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white m-4 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold text-gray-700 text-left">
          Are you sure you want to delete this todo?
        </h3>
        <div className="mt-4 flex gap-2 justify-end">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Controls the visibility of the modal (required boolean)
  onClose: PropTypes.func.isRequired, // Callback function for when the user cancels (required function)
  onConfirm: PropTypes.func.isRequired, // Callback function for when the user confirms (required function)
};

export default ConfirmModal;
