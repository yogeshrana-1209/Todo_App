import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedTodo, submitForm, updateForm } from "../store/todoSlice";
import { useEffect } from "react";
import moment from "moment";

export default function TodoForm() {
  const dispatch = useDispatch();
  const selectedTodo = useSelector(getSelectedTodo);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm();

  // Get today's date formatted as 'YYYY-MM-DD'
  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    if (selectedTodo) {
      // Set individual field values with setValue
      setValue("id", selectedTodo.id);
      setValue("name", selectedTodo.name);
      setValue("description", selectedTodo.description);

      // Format the date to "yyyy-MM-dd" using moment
      const formattedDate = moment(selectedTodo.date).format("YYYY-MM-DD");
      setValue("date", formattedDate);
      setValue("agreed", selectedTodo.agreed);
      setValue("priority", selectedTodo.priority);
      setValue("status", selectedTodo.status || "");
      trigger();
    } else {
      setValue("date",today);
      reset();
    }
  }, [selectedTodo, setValue, reset, trigger,today]);

  const onSubmit = (data) => {
    if (selectedTodo) {
      const updatedTodo = { ...selectedTodo, ...data };
      dispatch(updateForm(updatedTodo)).then((response) => {
        console.log("updated",response);
        if (response) {
          reset();
        }
        
      }) // Update the Form Method
      // window.scrollTo({
      //   top: document.documentElement.scrollHeight,
      //   behavior: "smooth", // Optional: for smooth scrolling
      // });
      // reset();
    } else {
      const newTodo = {
        id: Date.now(),
        ...data,
      };
      dispatch(submitForm(newTodo)); // Submit the Form Method
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth", // Optional: for smooth scrolling
      });
      reset();
    }
  };

  return (
    <>
      <div className="flex justify-center text-left items-center bg-gradient-to-r from-white-500 via-white-500 to-white-500">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              {selectedTodo ? "Update Todo" : "Add Todo"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                  placeholder="Enter task name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out min-h-[100px]"
                  placeholder="Enter task description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Due Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("date", { 
                      required: "Date is required" ,
                      validate : {
                        notPast: (value) => 
                          value >= today || "You cannot select a past date",
                       },
                    })}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out appearance-none bg-white text-gray-700 text-sm leading-tight hover:border-indigo-500 active:border-indigo-500 touch-manipulation"
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Priority Radio Buttons */}
              <div>
                <p className="text-gray-700 text-sm font-semibold mb-2">
                  Priority
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="high"
                      {...register("priority", {
                        required: "Please select priority",
                      })}
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <span className="ml-2 text-gray-700 text-sm">High</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="low"
                      {...register("priority", {
                        required: "Please select priority",
                      })}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700 text-sm">Low</span>
                  </label>
                </div>
                {errors.priority && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.priority.message}
                  </p>
                )}
              </div>

              {/* Status Select Field */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Status
                </label>
                <select
                  {...register("status", {
                    required: "Please select a status",
                    validate: (value) =>
                      value !== "" || "Please select a status",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                >
                  <option value="">Select a Option</option>
                  <option value="Done">Done</option>
                  <option value="Pending">Pending</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("agreed", {
                    required: "You must agree to proceed",
                  })}
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-700 text-sm">
                  I agree to the terms
                </span>
                {errors.agreed && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.agreed.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4  border-blue-800 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out font-semibold"
              >
                {selectedTodo ? "Update Todo" : "Add Todo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
