import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedTodo, submitForm, updateForm } from "../store/todoSlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import * as Yup from "yup"; // Import Yup
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver

export default function TodoForm() {
  const dispatch = useDispatch();
  const selectedTodo = useSelector(getSelectedTodo);
  const navigate = useNavigate();

  // Updated validationSchema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .trim() // This removes any extra spaces around the name
      .min(2, "Name must be at least 2 characters")
      .matches(/^(?!\s*$).+/, "Name cannot be empty or spaces")
      .matches(
        /^[A-Za-z]+( [A-Za-z]+)*$/, // Regex that allows no consecutive spaces
        "Name cannot contain special characters, numbers, or consecutive spaces"
      ),
    description: Yup.string()
      .required("Description is required")
      .trim() // This removes any extra spaces around the description
      .matches(/^(?!\s*$).+/, "Description cannot be empty or spaces")
      .matches(
        /^[A-Za-z]+( [A-Za-z]+)*$/, // Regex that allows no consecutive spaces
        "Name cannot contain special characters, numbers, or consecutive spaces"
      ),

    date: Yup.date()
      .required("Date is required")
      .min(
        moment().format("YYYY-MM-DD"),
        "You cannot select a past date as due date"
      )
      .max(
        moment().add(1, "year").format("YYYY-MM-DD"),
        "Date must be within a year from today"
      )
      .typeError("Please enter a valid date"),

    priority: Yup.string()
      .required("Please select priority")
      .notOneOf(["", " "], "Priority cannot be empty or just spaces"), // Check for empty or space-only selections

    status: Yup.string()
      .required("Please select a status")
      .notOneOf(["", " "], "Please select a status"), // Check for empty or space-only selections

    agreed: Yup.bool().oneOf([true], "You must agree to proceed"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Use Yup validation schema
    mode: "onChange", // Trigger validation on each change
  });

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
      setValue("date", today);
      reset();
    }
  }, [selectedTodo, setValue, reset, trigger, today]);

  const onSubmit = (data) => {
    if (selectedTodo) {
      const updatedTodo = { ...selectedTodo, ...data };
      dispatch(updateForm(updatedTodo)).then((response) => {
        console.log("updated", response);
        if (response) {
          reset(); // Reset the form after successful update
          navigate("/todo-list"); // Redirect to the todo-list page after update
        }
      });
    } else {
      const requestedData = {
        id: Date.now(),
        ...data,
      };
      dispatch(submitForm(requestedData)).then((response) => {
        if(response){
          navigate('/todo-list');
        }
      })
      
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth", // Optional: for smooth scrolling
      });
      reset();
    }
  };
  

  return (
    <>
      <ToastContainer />

      <div className="flex justify-center text-left mt-[40px] p-5 items-center bg-gradient-to-r from-white-500 via-white-500 to-white-500">
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
                  {...register("name")}
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
                  {...register("description")}
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
                    {...register("date")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out appearance-none bg-white text-gray-700 text-sm leading-tight hover:border-indigo-500 active:border-indigo-500 touch-manipulation"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-gray-700 text-sm font-semibold mb-2">
                  Priority
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="high"
                      {...register("priority")}
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <span className="ml-2 text-gray-700 text-sm">High</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="low"
                      {...register("priority")}
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

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out bg-white shadow-sm text-gray-700"
                >
                  <option
                    value=""
                    className="py-2 px-4 text-gray-600 bg-white hover:bg-gray-100"
                  >
                    Select an Option
                  </option>
                  <option
                    value="Done"
                    className="py-2 px-4 text-gray-700 bg-white hover:bg-gray-100"
                  >
                    Done
                  </option>
                  <option
                    value="Pending"
                    className="py-2 px-4 text-gray-700 bg-white hover:bg-gray-100"
                  >
                    Pending
                  </option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="agree"
                  type="checkbox"
                  {...register("agreed")}
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <label
                  htmlFor="agree"
                  className="ml-2 text-gray-700 text-sm cursor-pointer"
                >
                  I agree to the terms
                </label>
              </div>
              {errors.agreed && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.agreed.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 border-blue-800 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out font-semibold"
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
