import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedTodo,
  setSelectedTodo,
  submitForm,
  updateForm,
} from "../store/TodoSlice";
import { useEffect } from "react";
// import { ToastContainer } from "react-toastify";
import moment from "moment";
import * as Yup from "yup"; // Import Yup
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import TodoStatus from "./TodoStatus";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

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
      // .min(20, 'Description must be at least 20 characters')
      .max(500, 'Description cannot exceed 500 characters'),

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
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Use Yup validation schema
    mode: "onChange", // Trigger validation on each change
  });

  const selectedStatus = watch("status");

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
      reset();
      dispatch(setSelectedTodo(null));
    }
  }, [selectedTodo, setValue, reset, trigger, today, dispatch]);

  const onSubmit = (data) => {
    if (selectedTodo) {
      const updatedTodo = { ...selectedTodo, ...data };
      dispatch(updateForm(updatedTodo)).then((response) => {
        // console.log("updated", response);
        if (response) {
          reset(); // Reset the form after successful update
          navigate("/todo-list"); // Redirect to the todo-list page after update
        }
      });
    } else {
      const requestedData = {
        id: Number(Date.now()),
        ...data,
      };
      dispatch(submitForm(requestedData)).then((response) => {
        if (response) {
          navigate("/todo-list");
        }
      });

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth", // Optional: for smooth scrolling
      });
      reset();
    }
  };

  const handleStatusChange = (status) => {
    setValue("status", status, { shouldValidate: true });
  };

  const handleBack = () => {
    navigate('/todo-list'); // Navigates to the previous page
  };

  return (
    <>
      <div className="flex justify-center text-left mt-[40px] p-5 items-center bg-gradient-to-r from-white-500 via-white-500 to-white-500">
        <div className="bg-white p-8 mt-8 rounded-xl shadow-lg w-full max-w-lg">

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" /> {/* Icon with spacing */}
            Back
          </button>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              {selectedTodo ? "Update Todo" : "Add Todo"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Name <span className="text-red-500">*</span>
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
                  Description <span className="text-red-500">*</span>
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
                  Due Date <span className="text-red-500">*</span>
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
                  Priority <span className="text-red-500">*</span>
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="high"
                      {...register("priority")}
                      className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <span className="ml-2 text-gray-700 cursor-pointer text-sm">
                      High
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="low"
                      {...register("priority")}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700 cursor-pointer text-sm">
                      Low
                    </span>
                  </label>
                </div>
                {errors.priority && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.priority.message}
                  </p>
                )}
              </div>

              {/* <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("status")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out bg-white shadow-sm text-gray-700 appearance-none"
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div> */}

              {/* Status Dropdown */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                {/* <Menu as="div" className="relative w-full">
                  <MenuButton className="w-full flex justify-between items-center px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">
                    {selectedStatus ? (
                      <TodoStatus status={selectedStatus} />
                    ) : (
                      "Select a Status"
                    )}
                    <ChevronDownIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      {["Done", "Pending"].map((status) => (
                        <MenuItem
                          key={status}
                          as="button"
                          onClick={() => handleStatusChange(status)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 text-gray-700"
                        >
                          {status}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu> */}
                <Menu as="div" className="relative w-full">
                  <MenuButton className="w-full flex justify-between items-center px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">
                    {selectedStatus ? (
                      <TodoStatus status={selectedStatus} />
                    ) : (
                      "Select a Status"
                    )}
                    <ChevronDownIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {/* Nested MenuItems - options inside the dropdown */}
                    <div className="py-1">
                      {["Done", "Pending"].map((status) => (
                        <MenuItem
                          key={status}
                          as="button"
                          onClick={() => handleStatusChange(status)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 text-gray-700"
                        >
                          {status}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>


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
                  I agree to the terms <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.agreed && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.agreed.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2 px-3 border-blue-800 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out font-semibold"
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
