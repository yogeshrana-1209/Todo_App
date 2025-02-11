import PropTypes from "prop-types";

const TodoStatus = ({ status }) => {
  // Determine the status style based on the value of 'status'
  let statusStyle = "";
  let statusLabel = "";

  switch (status) {
    case "Done":
      statusStyle = "text-green-600";
      statusLabel = "Done";
      break;
    case "Pending":
      statusStyle = "text-yellow-600";
      statusLabel = "Pending";
      break;
    default:
      statusStyle = "text-gray-600";
      statusLabel = "Not Set";
      break;
  }

  return (
    <span
      className={`inline-flex items-center bg-gray-100 px-3 py-1 rounded-full ${statusStyle}`}
    >
      <span className="mr-2">🔖</span>
      <span className="font-medium">{statusLabel}</span>
    </span>
  );
};

// PropTypes for TodoStatus Component
TodoStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default TodoStatus;
